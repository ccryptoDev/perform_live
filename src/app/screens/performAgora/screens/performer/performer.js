/**
 *
 * Performer container
 *
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import _get from 'lodash/get';

import { useHistory } from 'react-router-dom';
import moment from 'moment';
import AppConstants from 'app/app.constants.json';
import config from 'app/config/index.config';
import {
  allowedForLive,
  defaultAction,
  resetPerformerState,
  setInviteAudience,
} from './state/performer.actions';
import reducer from './state/performer.reducer';
import saga from './state/performer.saga';
import { injectReducer, injectSaga } from './performer.dependencies';
import SideBar from './components/sidebar';
import Content from './components/content';
import ExpandSidebar from './components/expandSidebar';
import InviteAudience from './components/InviteAudience';
import Audience from './components/audience';
import GreenRoom from './views/GreenRoom';
import ArEffect from './views/ArEffect';
import Camera from './views/Camera';
import GettingStage from './views/GettingSatge';
import Interconnect from './views/Interconnect';
import Microphone from './views/Microphone';
import ProductDetails from './views/ProductDetails';
import { setUserState } from './state/performer.actions';
import StageRequest from './components/stageRequest';
import RemoveStage from './components/removeStage';
import UserLeft from './components/userLeft';
import RemoveFromPerformance from './components/removeFromPerformance';
import AuthService from '../../../../utils/authService';
import Perform from '../../../../utils/perform';
// import { firebaseClient } from '../../../../utils/firebase';

import './performer.scss';
import {
  saveAgoraAnalytics,
  setPerformanceStateFinished,
} from '../../state/performAgora.actions';
import { PerformAgoraConstants } from '../../performAgora.constants';
import { firebaseClient } from '../../../../utils/firebase';
import SocialShareModal from '../../../../components/SociaShareModal/SocialShareModal';
import usePerformer from '../../hooks/usePerformer';

export const Performer = ({ performanceData = null, userInfo = {} }) => {
  const [toggle, setToggle] = React.useState(false);
  const [showGreenRoom, setGreenRoom] = React.useState(false);
  const history = useHistory();
  const [socialShareModalOpen, setsocialShareModalOpen] = useState(false);
  const [isRecordingEnabled, setRecording] = useState(false);
  const performerState = useSelector(state => state.performer);
  const agoraAnalytics = useSelector(
    state => state.performagora.agoraAnalytics,
  );
  const dispatch = useDispatch();
  const performerHook = usePerformer();
  const createLocalStream = callback => {
    const client = window.perform.getBordCastRTCClient();
    client.createLocalStream(
      {
        attendeeMode: 'video',
        videoProfile: '480p_1',
      },
      () => {
        if (callback) {
          callback();
        }
      },
    );
  };

  useEffect(
    () => {
      if (performanceData.id && window.perform) {
        // first check if performance is in live or published state
        if (performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE) {
          window.perform.joinHostEvent('video', [], data => {
            const currentTime = moment()
              .utc()
              .format();

            const client = window.perform.getBordCastRTCClient();
            // Update the performance start time to agora analytics
            performerHook.saveAgoraAnalytics({
              id: performanceData.id,
              data: {
                startDatetime: moment().format(),
                performerCount: 1,
              },
            });
            if (client.localStream) {
              dispatch(setUserState({ joined: true, joinedAt: currentTime }));
            } else {
              createLocalStream(() => {
                dispatch(setUserState({ joined: true, joinedAt: currentTime }));
              });
            }
          });
        } else if (
          performanceData.state === AppConstants.PERFORMANCE_STATUS.PUBLISHED
        ) {
          createLocalStream();
        }
      }
    },
    [performanceData.channelName, performanceData.state],
  );

  useEffect(
    () => {
      if (performerState.userState.joined) {
        if (performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE) {
          dispatch(allowedForLive({ allowedForLive: true }));
        }
      }
    },
    [performerState.userState.joined],
  );

  useEffect(
    () => () => {
      // reset performer data
      dispatch(resetPerformerState());
    },
    [],
  );

  const onConfirmFinish = useCallback(
    () => {
      // check if recording is in progress, then stop recording first then finish performance
      if (performerState.recordingData.resourceId) {
        // stop recording first
        performerHook.stopRecording({
          ...performerState.recordingData,
          callback: handleRecordingStop,
        });
      } else {
        // collect the performance analytics before finishing performance
        performerHook.handleAnalytics(performanceData.id);
      }
    },
    [dispatch, performerState],
  );

  const handleRecordingStop = () => {
    setRecording(true);
  };

  const finishPerformance = () => {
    performerHook.saveAgoraAnalytics({
      id: performanceData.id,
      action: 'delete',
    });
    dispatch(
      setPerformanceStateFinished({
        paramsToReplace: { id: performanceData.id },
      }),
    );
  };
  const removeAllUsers = useCallback(
    () => {
      const data = {
        state: '',
        userDetials: {},
      };
      dispatch(setInviteAudience(data));
      const messagedata = {
        messageType:
          PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.PERFORMANCE_ENDED,
        timeStamp: moment()
          .utc()
          .format(),
        messageData: {
          senderId: performanceData.performer.id,
        },
      };
      const path = `channel_events/${
        performanceData.channelName
      }/channelMessage`;
      firebaseClient.pushData(path, messagedata);
    },
    [dispatch],
  );

  useEffect(
    () => {
      // save analytics to database and finish performance

      if (
        agoraAnalytics[performanceData.id] &&
        agoraAnalytics[performanceData.id].endDatetime
      ) {
        dispatch(
          saveAgoraAnalytics({
            paramsToReplace: { id: performanceData.id },
            data: agoraAnalytics[performanceData.id],
          }),
        );
        finishPerformance();
      }
    },
    [agoraAnalytics],
  );

  useEffect(
    () => {
      if (performanceData.state === 'past') {
        removeAllUsers();
        setsocialShareModalOpen(true);
        if (window.perform) {
          window.perform.leaveRTC();
        }
      }
    },
    [performanceData.state, removeAllUsers],
  );

  // useEffect(() => {
  //   if (!window.perform) {
  //     return history.push('/');
  //   }
  //   window.perform.joinHostEvent('test-live', 'video', [], data => {
  //     const videoStreams = window.perform.getBordCastRTCClient().getStreams();
  //     const currentTime = moment()
  //       .utc()
  //       .format();
  //     dispatch(setUserState({ joined: true, joinedAt: currentTime }));
  //   });
  // }, []);
  const share = {
    url: `${config.CLIENT_URL}/performlive/${performanceData.id}/performer/${
      performanceData.performer.id
    }`,
    title: `Check out my Live on PerformLive! Join me on PerformLive!`,
    hashtags: [
      'performlive',
      'iperformwithPL',
      'streamingonPL',
      'createandperform',
      'performlivePL',
      'performlivetalent',
    ],
  };
  return (
    <>
      <div className="content-wrapper">
        <Content
          handleToggle={setToggle}
          performanceData={performanceData}
          onSettingClick={() => {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
            setGreenRoom(!showGreenRoom);
          }}
          onConfirmFinish={onConfirmFinish}
        />
        <SideBar isExpand={toggle} />
        {toggle ? <ExpandSidebar /> : null}
        {performerState.inviteAudience.state == 'invited' && (
          <InviteAudience user={performerState.inviteAudience.userDetials} />
        )}
        {performerState.inviteAudience.state == 'remove' && (
          <RemoveFromPerformance
            user={performerState.inviteAudience.userDetials}
          />
        )}
        {performerState.stageRequest.request &&
          performerState.allowedForLive && (
            <StageRequest user={performerState.stageRequest.data} />
          )}
        {/* <Audience user={user} /> */}
        <GreenRoom
          performanceData={performanceData}
          isModal={
            showGreenRoom &&
            (!performerState.settingComponent ||
              performerState.settingComponent === 'greenroom')
          }
          onFinishSetting={() => setGreenRoom(false)}
        />
        {/* <ArEffect isModal={true} /> */}
        <Camera isModal={performerState.settingComponent == 'camera'} />
        {/* <GettingStage
          isModal={true}
        /> */}
        <Interconnect isModal={performerState.settingComponent == 'internet'} />
        <Microphone isModal={performerState.settingComponent == 'microphone'} />
        <ProductDetails
          isModal={performerState.settingComponent === 'productList'}
          performanceData={performanceData}
        />
        {performerState.removeUser.state == 'remove' && (
          <RemoveStage user={performerState.activeStageUser.data} />
        )}
        {performerState.removeUser.state === 'left' && (
          <UserLeft user={performerState.removeUser.userDetials} />
        )}
      </div>
      {socialShareModalOpen && (
        <SocialShareModal
          onClose={() => history.replace('/')}
          title={`Performance completed. ${
            isRecordingEnabled
              ? 'Recording will be avaiable in next 30 min!!'
              : ''
          }`}
          subtitle="Share this Performance with your friends!"
          share={share}
        />
      )}
    </>
  );
};

Performer.propTypes = {};

const mapStateToProps = state => ({
  defaultState: _get(state.performer, 'defaultState', null),
});

const mapDispatchToProps = dispatch => ({
  defaultAction: payload => dispatch(defaultAction(payload)),
});

const withReducer = injectReducer({
  key: 'performer',
  reducer,
  blacklist: [
    'settingComponent',
    'allowedForLive',
    'stageRequest',
    'removeUser',
    'inviteAudience',
    'userState',
    'activeInvitedAudience',
    'activeStageAudience',
    'queryRecordingStatus',
  ],
});
const withSaga = injectSaga({ key: 'performer', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Performer);
