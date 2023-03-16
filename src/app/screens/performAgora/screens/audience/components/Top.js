import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import config from 'app/config/index.config';
import { get } from 'lodash';
import AppConstants from 'app/app.constants.json';
import { IMG } from '../audience.dependencies';
import '../../../../../styles/content.scss';
import {
  getServerCurrentTime,
  updateFollowUnfollow,
} from '../../../../../state/app.actions';
import { getFullName } from '../../../../../utils/common';
import { TimeCounter } from '../../../../../components/TimeCounter/TimeCounter';
import ShareBarSmall from '../../../../../components/ShareBarSmall/ShareBarSmall';
import SocialShareModal from '../../../../../components/SociaShareModal/SocialShareModal';
import useAudience from '../../../hooks/useAudience';
import Button from '../../../../../components/Common/Button';

const Top = ({ expandSidebar, setExpandSidebar }) => {
  const [open, setOpen] = React.useState(false);
  const performerFollowStatus = useSelector(
    state => state.global.performarFollowStatus,
  );
  const dispatch = useDispatch();
  const audienceHook = useAudience();
  const [socialModalOpen, setSocialModalOpen] = useState(false);

  const performanceData = useSelector(
    state => state.performagora.performanceData,
  );
  const history = useHistory();
  const client = window.perform.getBordCastRTCClient();

  const onLeavePerformance = (autoLeave = false) => {
    // check if performance is in not live then simply go back to dashboard
    if (performanceData.state !== AppConstants.PERFORMANCE_STATUS.LIVE) {
      audienceHook.leftPerformance(false);
      history.push('/');
      return;
    }
    if (autoLeave && client) {
      audienceHook.leftPerformance();
      setSocialModalOpen(true);
    } else {
      audienceHook.leftPerformance(false);
      setSocialModalOpen(true);
    }
  };

  useEffect(() => {
    dispatch(getServerCurrentTime());
  }, []);

  const fullName =
    get(performanceData.performer, 'stageName', null) ||
    getFullName(
      performanceData.performer.firstName,
      performanceData.performer.lastName,
    );

  const updateFollowStatus = () => {
    dispatch(
      updateFollowUnfollow({
        paramsToReplace: { id: performanceData.performer.id },
      }),
    );
  };

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
      <div className={expandSidebar ? 'perform-top active' : 'perform-top'}>
        <div className={open ? 'live-detail' : 'live-detail active'}>
          <div className="live-avatar">
            <img
              className="live-pic"
              src={performanceData.performer.imageUrl || IMG.USER}
              alt="live avatar"
            />
            <button className="live-status" type="button">
              {performanceData.state.toUpperCase()}
            </button>
          </div>
          <div className="live-info">
            <div className="review">{performanceData.name}</div>
            <div className="live-name">
              <span className="live-name-info">{fullName}</span>
              <Button
                type="secondary"
                className="follow"
                background={performerFollowStatus ? 'transparent' : 'gradient'}
                border={performerFollowStatus ? 'gradient' : ''}
                fontSize="10px"
                onClick={() => updateFollowStatus()}
              >
                {performerFollowStatus ? 'Unfollow' : 'Follow'}
              </Button>

              <ShareBarSmall
                title="Check out my Live on PerformLive! Join me on PerformLive!"
                hashtags={[
                  'performlive',
                  'iperformwithPL',
                  'streamingonPL',
                  'createandperform',
                  'performlivePL',
                  'performlivetalent',
                ]}
                url={`${config.CLIENT_URL}/performlive/${
                  performanceData.id
                }/performer/${performanceData.performer.id}`}
                performanceData={performanceData}
              />

              {/* {open ? <ShowProfile /> : null} */}
            </div>
          </div>
        </div>
        <Button
          background="transparent"
          border="gradient"
          onClick={() => onLeavePerformance(false)}
          className="leave-performance"
        >
          Leave Performance
        </Button>
        <div className="expand" onClick={() => setExpandSidebar(s => !s)}>
          <img
            src={expandSidebar ? IMG.INEXPAND : IMG.EXPAND}
            className="expand-icon"
            alt="expand icon"
          />
        </div>
        {performanceData.state === AppConstants.PERFORMANCE_STATUS.LIVE && (
          <div className="live-time">
            <div className="live-time-logo">
              <div className="timing">
                <img className="time-logo" src={IMG.TIMER} alt="timing" />
              </div>
              <div className="timing-info">
                <span className="time-now">
                  <TimeCounter
                    onTimeOver={() => {
                      onLeavePerformance(true);
                    }}
                    startTime={performanceData.endDatetime}
                    onTimeStart={() => {}}
                  />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {socialModalOpen && (
        <SocialShareModal
          onClose={() => history.push('/')}
          share={share}
          title="Thanks for going Live with your Performer!"
          subtitle="Keep supporting your Performer – share this channel with your friends!"
        />
      )}
    </>
  );
};

export default Top;
