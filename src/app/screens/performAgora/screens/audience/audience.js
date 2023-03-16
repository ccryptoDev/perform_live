import React, { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import _get from 'lodash/get';
import moment from 'moment';
import IMG from 'app/utils/images';
import { useHistory, useParams } from 'react-router-dom';
import AppConstants from 'app/app.constants.json';
import {
  resetAudienceState,
  setAudienceState,
  setInviteStageStatus,
  setJoinStageStatus,
  setPerformancePresence,
  setStagePresence,
} from './state/audience.actions';
import reducer from './state/audience.reducer';
import saga from './state/audience.saga';
import { injectReducer, injectSaga } from './audience.dependencies';
import PerformanceSideBar from './components/sidebar/PerformanceSideBar';
import Content from './components/Content';
import { firebaseClient } from '../../../../utils/firebase';
import LeftModal from './components/LeftModal';
import RemoveFromPerformanceModal from './components/RemoveFromPerformanceModal';
import InviteStageResponse from './components/InviteStageResponse';

import './audience.scss';
import { getFullName } from '../../../../utils/common';
import { firebaseUtils } from '../../../../utils/firebaseUtils';
import {
  useChannelEvent,
  useMessageFromChannel,
  useMessageFromPeer,
} from '../../../../hooks/firebase';
import { PerformAgoraConstants } from '../../performAgora.constants';
import useAudience from '../../hooks/useAudience';
import { getPerformanceInfo } from '../../state/performAgora.actions';
import useSidebarViewController from './hooks/useSidebarViewController';
import useApi from '../../../../hooks/api';

const {
  FIREBASE_MESSAGE_TYPES: {
    PERFORMER_PROCESS_JOIN_REQUEST,
    PERFORMANCE_ENDED,
    PERFORMANCE_IS_LIVE,
    AUDIENCE_KICKED_FROM_PERFORMANCE,
    CANCEL_INVITE_TO_JOIN_STAGE,
    INVITE_AUDIENCE_TO_STAGE,
    AUDIENCE_KICKED_FROM_STAGE,
    FOCUS_UNFOCUS_PRODUCT,
    REFRESH_PRODUCT_LIST,
  },
} = PerformAgoraConstants;

export const Audience = ({ performanceData = null, userInfo = {} }) => {
  const [expandSidebar, setExpandSidebar] = React.useState(false);
  const dispatch = useDispatch();
  const audienceState = useSelector(state => state.audience);
  const history = useHistory();
  const focusedProductRef = useRef([]); // this is we had to take so that we have updated value in firebase callback
  const audienceHook = useAudience();
  const { id } = useParams();
  const [focusedProducts, setFocusedProducts] = React.useState([]);
  const { getPerformerPerformanceRegister } = useApi('performer');
  const { data: performancesWithAccess } = useQuery(
    'performancesWithAccess',
    getPerformerPerformanceRegister,
  );
  const [
    currentSidebarView,
    setCurrentSidebarView,
  ] = useSidebarViewController();
  const queryClient = useQueryClient();

  const isPaidByMe = (performancesWithAccess || []).find(
    el => el.id === performanceData.id,
  );

  useEffect(
    () => {
      if (performanceData.participationPaid && !isPaidByMe) {
        history.push('/');
      }
    },
    [isPaidByMe],
  );

  useMessageFromPeer(
    performanceData.channelName,
    userInfo.userId,
    PERFORMER_PROCESS_JOIN_REQUEST,
    async value => {
      if (value.messageData.isRequestApproved) {
        const client = window.perform.getBordCastRTCClient();
        client.createLocalStream(
          {
            attendeeMode: 'video',
            videoProfile: '480p_1',
          },
          () => {
            client.publishStream();
          },
        );

        await firebaseUtils.handleStageUser(userInfo, 'add');
        dispatch(setJoinStageStatus({ status: 'joined' }));
        setCurrentSidebarView('main');
      } else {
        dispatch(setJoinStageStatus({ status: 'rejected' }));
      }
    },
  );

  useMessageFromPeer(
    performanceData.channelName,
    userInfo.userId,
    AUDIENCE_KICKED_FROM_STAGE,
    () => {
      const client = window.perform.getBordCastRTCClient();
      client.unpublishStream();

      const data = {
        state: 'removed',
      };
      dispatch(setStagePresence(data));
      dispatch(setJoinStageStatus({ status: '' }));
    },
  );

  useMessageFromPeer(
    performanceData.channelName,
    userInfo.userId,
    INVITE_AUDIENCE_TO_STAGE,
    () => {
      const data = {
        state: 'invited',
      };
      dispatch(setInviteStageStatus(data));
    },
  );

  useMessageFromPeer(
    performanceData.channelName,
    userInfo.userId,
    CANCEL_INVITE_TO_JOIN_STAGE,
    () => {
      const data = {
        state: '',
      };
      dispatch(setInviteStageStatus(data));
    },
  );

  useMessageFromPeer(
    performanceData.channelName,
    userInfo.userId,
    AUDIENCE_KICKED_FROM_PERFORMANCE,
    () => {
      // when audience removed from performance by performer
      const client = window.perform.getBordCastRTCClient();
      client.unpublishStream();
      setTimeout(() => {
        client.leaveChannel();
      }, 500);

      dispatch(setPerformancePresence({ state: 'removed' }));
      return history.push('/');
    },
  );

  useMessageFromChannel(
    performanceData.channelName,
    userInfo.userId,
    FOCUS_UNFOCUS_PRODUCT,
    value => {
      const productIndex = focusedProductRef.current.indexOf(
        value.messageData.productId,
      );

      if (productIndex !== -1) {
        if (!value.messageData.isFocused) {
          focusedProductRef.current.splice(productIndex, 1);
        }
      } else {
        focusedProductRef.current.push(value.messageData.productId);
      }

      setFocusedProducts([...focusedProductRef.current]);
    },
  );

  useMessageFromChannel(
    performanceData.channelName,
    userInfo.userId,
    PERFORMANCE_IS_LIVE,
    () => {
      // When a performance goes live
      setTimeout(() => {
        dispatch(getPerformanceInfo({ paramsToReplace: { id } }));
      }, 1000);
    },
  );

  useMessageFromChannel(
    performanceData.channelName,
    userInfo.userId,
    REFRESH_PRODUCT_LIST,
    () => {
      queryClient.invalidateQueries('performanceProducts');
    },
  );

  useChannelEvent(PERFORMANCE_ENDED, () => {
    audienceHook.leftPerformance();
  });

  // getting already focused products from Firebase
  useEffect(() => {
    const channelStateRef = `channel_state/${
      firebaseClient._channel
    }/focused_products`;
    firebaseClient.getDataOnce(channelStateRef, data => {
      const products = (data.value && [...data.value]) || [];
      setFocusedProducts(products);
      focusedProductRef.current = products;
    });
  }, []);

  // Join audience in performance channel
  // update audience join state in application
  // add user to firebase in channel_users table
  useEffect(
    () => {
      if (performanceData) {
        // check no of active users in firebase those should not be more than 50
        firebaseUtils.checkAllowedToJoin(userInfo.userId, handleAudienceJoin);
      }
    },
    [performanceData.state],
  );

  const handleAudienceJoin = allowJoin => {
    if (allowJoin) {
      // check if performance is in live mode then allow audience to join the channel else only allow to join Firebase
      if (
        performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE &&
        window.perform
      ) {
        window.perform.joinHostEvent('attendee', [], () => {
          const currentTime = moment()
            .utc()
            .format();
          dispatch(setAudienceState({ joined: true, joinedAt: currentTime }));
          connectToRTM();
        });
      } else {
        connectToRTM();
      }
    } else {
      history.push('/');
    }
  };

  const connectToRTM = () => {
    const currentTime = moment()
      .utc()
      .format();
    // set user in the firebase
    const userData = {
      id: userInfo.userId,
      performerId: userInfo.id,
      displayName: getFullName(userInfo.firstName, userInfo.lastName),
      profileImageUrl: userInfo.imageUrl || IMG.USER,
      isCurrentlyWatching: true,
      isUserBlockedFromPerformance: false,
      timeStamp: currentTime,
    };
    const ref = `channel_users/${performanceData.channelName}/${
      userInfo.userId
    }`;
    firebaseClient.setData(ref, userData);
  };

  // When user leave performance, reset all his data from store
  useEffect(
    () => () => {
      // reset all the data
      dispatch(resetAudienceState());

      // remove all agora services by which the audience was connected
      if (window.perform) {
        window.perform.leaveRTC();
      }
      window.perform = null;
    },
    [],
  );

  const handleGiftClick = () => {
    setCurrentSidebarView('gift');
  };

  if (performanceData.participationPaid && !isPaidByMe) {
    return null;
  }

  return (
    <>
      <div className="content-wrapper">
        <Content
          setExpandSidebar={setExpandSidebar}
          expandSidebar={expandSidebar}
          onGiftClick={handleGiftClick}
        />
        <PerformanceSideBar
          focusedProducts={focusedProducts}
          setFocusedProducts={setFocusedProducts}
          isExpand={expandSidebar}
          setExpandSidebar={setExpandSidebar}
          performanceData={performanceData}
        />

        {audienceState.stagePresence.state === 'left' && <LeftModal />}
        {audienceState.stagePresence.state === 'removed' && (
          <RemoveFromPerformanceModal />
        )}
        {audienceState.inviteStageStatus.state === 'invited' && (
          <InviteStageResponse userInfo={userInfo} />
        )}
      </div>
    </>
  );
};

Audience.propTypes = {
  performanceData: PropTypes.object,
  userInfo: PropTypes.object,
};

const mapStateToProps = state => ({
  defaultState: _get(state.audience, 'defaultState', null),
  userInfo: _get(state.global, 'userInfo', {}),
});

const mapDispatchToProps = dispatch => ({
  resetAudienceState: payload => dispatch(resetAudienceState(payload)),
});

const withReducer = injectReducer({
  key: 'audience',
  reducer,
  blacklist: [
    'userState',
    'joinStage',
    'stagePresence',
    'inviteStageStatus',
    'performancePresence',
    'sidebarView',
  ],
});
const withSaga = injectSaga({ key: 'audience', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Audience);
