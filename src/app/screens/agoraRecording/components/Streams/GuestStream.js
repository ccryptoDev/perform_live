import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { firebaseClient } from '../../../../utils/firebase';
export default props => {
  const [guestInfo, setGuestInfo] = useState({});
  const guestInfoRef = useRef({});
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
    // get stage user info from firebase channel_users table
    const child = `channel_users/${window.perform.eventChannelName}/${id.id}`;
    firebaseClient.getDataSync(child, data => {
      if (data.value && shouldSetInfo) {
        setGuestInfo({ ...data.value });

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
    // setGuestJoinTime(timeStamp);
    // });

    return () => {
      shouldSetInfo = false;
    };
  }, []);

  return (
    <>
      <div className="connect-stage">
        <div className="guest">
          <div
            className="guest"
            id={playerId}
            // style={videoMuted ? { opacity: 0 } : { opacity: 1 }}
          />
          {/* <img src={IMG.AUDI_GUEST} className="guest" /> */}
        </div>
        <div className="connect-top">
          {guestInfo.displayName && (
            <div className="name-info">{guestInfo.displayName}</div>
          )}
        </div>
      </div>
    </>
  );
};
