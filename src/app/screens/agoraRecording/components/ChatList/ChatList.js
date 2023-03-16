import React, { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import '../../../../styles/sidebar.scss';
import Chat from './Chat';
import { firebaseClient } from '../../../../utils/firebase';
import { IMG } from '../../../profile/profile.dependencies';
// import user1 from '../../assets/svg/performlive/user1.svg';

const ChatList = () => {
  const [chats, setChats] = React.useState({});
  const performanceData = useSelector(
    state => state.agorarecording.performanceData,
  );
  const child = `channel_chat/${performanceData.channelName}`;
  const dataRef = firebaseClient.getDataRef(child);
  const messageEl = useRef(null);
  let saveChat = true;
  useEffect(() => {
    registerCallbacks();
    if (saveChat) {
      firebaseClient.getDataOnce(child, data => {
        if (data.value && saveChat) {
          setChats(data.value);
        }
      });
    }

    return () => {
      saveChat = false;
      unregisterCallbacks();
    };
  }, []);

  useEffect(() => {
    if (messageEl) {
      new MutationObserver(() => {
        const chat = document.getElementsByClassName('chat-body');
        chat[0].scrollTop = chat[0].scrollHeight;
      }).observe(messageEl.current, { childList: true });

      // messageEl.current.addEventListener('DOMNodeInserted', event => {
      //   const chat = document.getElementsByClassName('chat-body');
      //   chat[0].scrollTop = chat[0].scrollHeight;
      // });
    }
  }, []);

  const registerCallbacks = () => {
    if (!firebaseClient) {
      return;
    }
    firebaseClient._emitter.on('value', updatechats);
  };

  const unregisterCallbacks = () => {
    if (!firebaseClient) {
      return;
    }
    firebaseClient._emitter.off('value', updatechats);
  };

  const updatechats = data => {
    if (data.type === child && saveChat) {
      setChats(data.value);
    }
  };

  return (
    <>
      <div className="chat-list" ref={messageEl}>
        {chats &&
          Object.values(chats).map((chat, index) => (
            <Chat chat={chat} key={index} />
          ))}
        {(!chats || !Object.values(chats).length) && (
          <div className="no-msg">
            <p>
              There are no messages posted in Chat Yet. You can be first one to{' '}
            </p>
            <p>
              {' '}
              <span>Post Message</span>
              <img src={IMG.CHAT_DOWN} alt="" />
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatList;
