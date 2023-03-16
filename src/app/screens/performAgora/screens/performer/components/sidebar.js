import React, { memo, useEffect, useRef } from 'react';
import uuid from 'react-uuid';
import '../../../../../styles/sidebar.scss';
// import ChatList from './chatlist';
import moment from 'moment';
import { trim } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import ChatList from '../../../components/ChatList';
import {
  removeUser,
  setActiveInvitedAudience,
  setActiveStageAudience,
  setStageRequest,
} from '../state/performer.actions';
import Audience from './audience';
import { IMG } from '../performer.dependencies';
import { firebaseClient } from '../../../../../utils/firebase';
import { PerformAgoraConstants } from '../../../performAgora.constants';
import { getFullName } from '../../../../../utils/common';
import EmojiPicker from '../../../components/EmojiPicker/EmojiPicker';
import usePerformer from '../../../hooks/usePerformer';

function SideBar() {
  const [isChat, setChat] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [audience, setAudience] = React.useState({});
  const inputCommentRef = useRef();
  const performanceData = useSelector(
    state => state.performagora.performanceData,
  );
  const activeInvitedAudience = useSelector(
    state => state.performer.activeInvitedAudience,
  );

  const activeStageAudience = useSelector(
    state => state.performer.activeStageAudience,
  );

  const prevStageRequest = useSelector(state => state.performer.stageRequest);
  const stageRequest = useRef(prevStageRequest);

  const performerHook = usePerformer();
  const child = `channel_users/${performanceData.channelName}`;
  const channelChatRef = `channel_chat/${performanceData.channelName}`;
  const currentTime = moment()
    .utc()
    .format();
  // const performerState = useSelector(state => state.performer);
  const userInfo = useSelector(state => state.global.userInfo);
  const type = `channel_events/${performanceData.channelName}/messageFromPeer/${
    performanceData.performer.id
  }`;

  const messageFromChannel = `channel_events/${
    performanceData.channelName
  }/channelMessage`;

  const dispatch = useDispatch();

  useEffect(
    () => {
      stageRequest.current = prevStageRequest;
    },
    [prevStageRequest.request],
  );
  useEffect(() => {
    let saveAudience = true;
    registerCallbacks();
    firebaseClient.getDataRef(type);
    firebaseClient.getDataRef(messageFromChannel);
    firebaseClient.getDataOnce(child, data => {
      if (data.value && saveAudience) {
        updateAudienceList(data.value);
      }
    });

    return () => {
      saveAudience = false;
      unregisterCallbacks();
    };
  }, []);

  const registerCallbacks = () => {
    firebaseClient._emitter.on('child_added', onChildAdded);
    firebaseClient._emitter.on('value', onValue);
  };

  const unregisterCallbacks = () => {
    if (!firebaseClient) {
      return;
    }
    firebaseClient._emitter.off('child_added', onChildAdded);
    firebaseClient._emitter.off('value', onValue);
  };

  const onValue = data => {
    if (data.type == child && data.value) {
      updateAudienceList(data.value);
    }
  };

  const updateAudienceList = audienceListFB => {
    // remove duplicate
    const audienceList = audience;
    Object.keys(audienceListFB).map(key => {
      if (
        audienceListFB[key].isCurrentlyWatching &&
        !audienceListFB[key].isUserBlockedFromPerformance
      ) {
        audienceList[audienceListFB[key].id] = audienceListFB[key];
      } else {
        delete audienceList[audienceListFB[key].id];
      }
    });

    setAudience({ ...audienceList });
  };

  const onChildAdded = data => {
    if (data.type === type) {
      const value = data.value;
      if (
        value.messageType ==
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.REQUEST_TO_JOIN_STAGE
      ) {
        if (value.timeStamp && value.timeStamp >= currentTime) {
          // ignore this request if already a request exist to be proceed or already stage user exist
          if (
            stageRequest.current.request ||
            window.perform.getBordCastRTCClient().getStreams().length > 1
          ) {
            // call reject request
            performerHook.rejectStageJoinReq(value.requester.id);
            return;
          }
          dispatch(
            setStageRequest({
              request: true,
              data: value.requester,
            }),
          );
        }
      }

      if (
        value.messageType ==
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES
          .CANCEL_REQUEST_TO_JOIN_STAGE
      ) {
        if (value.timeStamp && value.timeStamp >= currentTime) {
          dispatch(
            setStageRequest({
              request: false,
              data: value.requester,
            }),
          );
        }
      }

      if (
        value.messageType ===
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.AUDIENCE_LEFT_STAGE
      ) {
        if (value.timeStamp && value.timeStamp >= currentTime) {
          dispatch(
            removeUser({
              state: 'left',
              userDetials: value.user,
            }),
          );

          dispatch(
            setActiveStageAudience({
              id: value.user.id,
              action: 'delete',
            }),
          );
        }
      }
      if (
        value.messageType ===
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.INVITE_ACCEPTED_FOR_STAGE
      ) {
        if (value.timeStamp && value.timeStamp >= currentTime) {
          const userDetails = activeInvitedAudience[value.senderId] || {
            id: value.senderId,
          };

          dispatch(setActiveStageAudience(userDetails));
          // remove from invited array
          dispatch(
            setActiveInvitedAudience({
              id: value.senderId,
              action: 'delete',
            }),
          );
        }
      }
      if (
        value.messageType ===
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.INVITE_REJECTED_FOR_STAGE
      ) {
        if (value.timeStamp && value.timeStamp >= currentTime) {
          // remove from invited array
          dispatch(
            setActiveInvitedAudience({
              id: value.senderId,
              action: 'delete',
            }),
          );
        }
      }
    } else if (data.type === messageFromChannel) {
      const { value } = data;
      if (
        value.messageType ===
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.AUDIENCE_LEFT_STAGE
      ) {
        if (value.timeStamp && value.timeStamp >= currentTime) {
          dispatch(
            removeUser({
              state: 'left',
              userDetials: value.user,
            }),
          );

          dispatch(
            setActiveStageAudience({
              id: value.user && value.user.id,
              action: 'delete',
            }),
          );
          dispatch(
            setActiveInvitedAudience({
              id: value.user && value.user.id,
              action: 'delete',
            }),
          );
        }
      }
    }
  };
  // useEffect(() => {

  // }, []);
  const handleMessage = e => {
    setMessage(e.target.value);
  };
  const sendMessage = e => {
    e.preventDefault();
    if (trim(message)) {
      setShowEmoji(false);
      const data = {
        id: uuid(),
        messageText: message,
        sender: {
          id: userInfo.userId,
          performerId: userInfo.id,
          displayName: getFullName(userInfo.firstName, userInfo.lastName),
          profileImageUrl: userInfo.imageUrl || IMG.USER,
        },
        timeStamp: moment()
          .utc()
          .format(),
      };
      firebaseClient.pushData(channelChatRef, data);
      setMessage('');
    }
  };

  const [showEmoji, setShowEmoji] = React.useState(false);
  const onEmojiClick = emoji => {
    const updatedComment = message + emoji.native;
    setMessage(updatedComment);
    inputCommentRef.current.focus();
  };

  const handleEmojiShow = () => {
    setShowEmoji(prevState => !prevState);
  };

  return (
    <>
      <div className="performerview side-bar">
        <div className="performerview-top-sidebar">
          <div
            className={
              isChat ? 'menu-item chat-item active' : 'menu-item chat-item'
            }
            onClick={() => setChat(true)}
          >
            <img src={IMG.CHAT_ICON} alt="chat" />
            Chat
          </div>
          <div
            className={
              isChat
                ? 'menu-item audience-item'
                : 'menu-item audience-item active'
            }
            onClick={() => setChat(false)}
          >
            <img src={IMG.AUDIENCE_ICON} alt="audience" />
            Audience
            <span>・{Object.keys(audience).length}</span>
          </div>
        </div>
        <div className="bottom-sidebar">
          {isChat ? (
            <>
              <div className="chat-body">
                {/* {users.map(user => ( */}
                <ChatList />
                {/* ))} */}
              </div>
              <div className="chat-footer">
                <div className="footer-body">
                  <div className="chat-input">
                    <div className="chat-emotical" onClick={handleEmojiShow}>
                      <img
                        className="emotical"
                        src={IMG.SMILE}
                        alt="emotical"
                      />
                    </div>
                    <form className="chat-form" onSubmit={sendMessage}>
                      <div className="input-text">
                        <input
                          className="chatting-text"
                          size="33"
                          placeholder="Type a message"
                          value={message}
                          onChange={handleMessage}
                          ref={inputCommentRef}
                        />
                      </div>
                      <div className="chat-action">
                        <button className="chat-submit-btn">
                          <img
                            className="chat-send"
                            src={IMG.CHAT_SEND_ICON}
                            alt="send"
                          />
                        </button>
                      </div>
                      <EmojiPicker
                        showEmoji={showEmoji}
                        onEmojiClick={onEmojiClick}
                        onHide={() => setShowEmoji(false)}
                      />
                    </form>
                  </div>
                  <div className="border-line" />
                  <div className="chatting-users">
                    <div className="avatar-group">
                      {Object.values(audience).map(
                        (user, index) =>
                          index < 10 && (
                            <img
                              className="user-avatars margin-left-0"
                              src={user.profileImageUrl || IMG.USER}
                              alt="user1"
                              key={user.id}
                            />
                          ),
                      )}
                      {Object.keys(audience).length > 10 && (
                        <span className="user-avatars user-avatars-count margin-left-0">
                          +{Object.keys(audience).length - 10}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="audience-list">
              <p className="total-audience">
                <b>{Object.keys(audience).length}</b>{' '}
                <span> people joined</span>
              </p>
              <div className="search">
                <span className="icon" />
                <input
                  className="field"
                  type="text"
                  placeholder="Search audience members"
                  onChange={e => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
              <div className="audience-row">
                {Object.values(audience)
                  .filter(val => {
                    if (searchTerm == '') {
                      return val;
                    }
                    if (
                      val.displayName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map(user => (
                    <Audience
                      user={user}
                      key={user.id}
                      isStageUser={activeStageAudience[user.id]}
                      isInvitedUser={activeInvitedAudience[user.id]}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(SideBar);
