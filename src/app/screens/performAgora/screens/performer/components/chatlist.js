import React from 'react';
import '../../../../../styles/sidebar.scss';
import { IMG } from '../performer.dependencies';
// import user1 from '../../assets/svg/performlive/user1.svg';

function ChatList() {
  return (
    <>
      <div className="chatting-user">
        <div className="chat-avatar">
          <img className="user-avatar" src={IMG.USER} alt="user avatar" />
        </div>
        <div className="chat-history">
          <div className="chat-name">Carine Li</div>
          <div className="chat-text">
            I’ve been following Kenny for years on YouTube! So glad he finally
            got a perform live stream going
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatList;
