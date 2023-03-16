import React, { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import '../../../../styles/sidebar.scss';
import Chat from './Chat';
import { IMG } from '../../../../components/Profile/profile.dependencies';
import { useFirebaseChat } from '../../../../hooks/firebase';

const ChatList = () => {
  const [chats, setChats] = React.useState({});
  const channelName = useSelector(
    state => state.performagora.performanceData.channelName,
  );
  useFirebaseChat(channelName, setChats);

  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      new MutationObserver(() => {
        const chat = document.getElementsByClassName('chat-body');
        chat[0].scrollTop = chat[0].scrollHeight;
      }).observe(messageEl.current, { childList: true });
    }
  }, []);
  return (
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
  );
};

export default ChatList;
