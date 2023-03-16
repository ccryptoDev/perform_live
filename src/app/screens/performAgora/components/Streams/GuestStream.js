import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { TimeCounter } from '../../../../components/TimeCounter/TimeCounter';
import { firebaseClient } from '../../../../utils/firebase';
import { getServerCurrentTime } from '../../../../state/app.actions';
import usePerformer from '../../hooks/usePerformer';
import { setActiveStageAudience } from '../../screens/performer/state/performer.actions';

export default props => {
  const [guestInfo, setGuestInfo] = useState({});
  const [guestJoinTime, setGuestJoinTime] = useState(null);
  const [muteVideo, setMuteVideo] = useState(false);
  const guestInfoRef = useRef({});
  const dispatch = useDispatch();
  const performAgora = useSelector(state => state.performagora);
  const userInfo = useSelector(state => state.global.userInfo);
  const { performanceData } = performAgora;
  const performer = usePerformer();
  let user = {};
  let client = {};
  if (window.perform) {
    user = window.perform.getAuthUser();
    client = window.perform.getBordCastRTCClient();
  }

  const {
    playerId,
    id,
    videoMuted,
    isAudioOn,
    playHandler,
    playerClass,
    setLeaveModal,
  } = props;
  //   const client = window.perform.getBordCastRTCClient();
  const playStream = () => {
    playHandler();
  };

  useEffect(
    () => {
      setGuestInfo({ ...guestInfoRef.current });
    },
    [guestInfoRef.current],
  );
  useEffect(() => {
    let shouldSetInfo = true;
    // get server time
    dispatch(getServerCurrentTime());

    // get stage user info from firebase channel_users table
    const child = `channel_users/${window.perform.eventChannelName}/${id.id}`;
    firebaseClient.getDataSync(child, data => {
      if (data.value && shouldSetInfo) {
        setGuestInfo({ ...data.value });
        dispatch(setActiveStageAudience(data.value));
        guestInfoRef.current = data.value;
        playStream();
      }
    });

    // get stage user joinstage timestamp at very first time. Note: Here commented some code below which will be required in future

    // const channelStateRef = `channel_state/${
    //   firebaseClient._channel
    // }/stage_users`;
    // firebaseClient.getDataOnce(channelStateRef, data => {
    const timeStamp = moment()
      .add(5, 'minutes')
      .format();
    // if (data.value) {
    //   const stageUserInfo = data.value.find(user => user.id === id.id);
    //   if (stageUserInfo)
    //     timeStamp = moment(stageUserInfo.timeStamp)
    //       .add(5, 'minutes')
    //       .format();
    // }
    setGuestJoinTime(timeStamp);
    // });

    // update the performer count for agora analytics
    if (userInfo.id === performanceData.performer.id) {
      performer.saveAgoraAnalytics({
        id: performanceData.id,
        data: {
          performerCount:
            performAgora.agoraAnalytics[performanceData.id].performerCount + 1,
        },
      });
    }

    return () => {
      shouldSetInfo = false;
    };
  }, []);

  const handleRemove = () => {
    performer.removeUser(guestInfo);
  };

  return (
    <>
      <div className="connect-stage">
        <div className="guest">
          <div
            className="guest"
            id={playerId}
            style={videoMuted ? { opacity: 0 } : { opacity: 1 }}
          />
          {/* <img src={IMG.AUDI_GUEST} className="guest" /> */}
        </div>
        <div className="connect-top">
          {guestInfo.displayName && (
            <div className="name-info">
              {(userInfo.userId === id.id &&
                `${guestInfo.displayName} (You)`) ||
                guestInfo.displayName}
            </div>
          )}
          <div className="time">
            {guestJoinTime && (
              <TimeCounter
                onTimeOver={() => user.isPerformer && handleRemove()}
                startTime={guestJoinTime}
                onTimeStart={() => {}}
              />
            )}
          </div>
        </div>
        {user &&
          (user.isPerformer || user.userId === id.id) && (
            <button
              className="leave-stage"
              onClick={() => setLeaveModal(id)}
              type="button"
            >
              {user && user.isPerformer ? 'Remove' : ''}
              {user.userId === id.id ? 'Leave from stage' : ''}
            </button>
          )}
      </div>
    </>
  );
};
