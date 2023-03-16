import React from 'react';
import IMG from 'app/utils/images';

const Chat = ({ chat }) => {
  const chatClass = `chatting-user`;
  return (
    <>
      <div className={chatClass}>
        <div className="chat-avatar">
          <img
            className="user-avatar"
            src={chat.sender.profileImageUrl || IMG.USER}
            alt="user avatar"
          />
        </div>
        <div className="chat-history">
          <div className="chat-name">{chat.sender.displayName}</div>
          <div className="chat-text">{chat.messageText}</div>
        </div>
      </div>
    </>
  );
};

export default Chat;
