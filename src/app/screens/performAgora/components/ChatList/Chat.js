import React, { useState } from 'react';
import IMG from 'app/utils/images';
import { useDispatch, useSelector } from 'react-redux';
import Block from '../../../../components/Block/Block';
import { setInviteAudience } from '../../screens/performer/state/performer.actions';
import StarIcon from '../../../../../assets/svg/chat/star.svg';
import GiftIcon from '../../../../../assets/svg/chat/gift.svg';
import PurchaseIcon from '../../../../../assets/svg/chat/purchase.svg';

const values = ['Report comment', 'Report user', 'Block user'];

const ChatHistory = ({ messages, children }) => {
  if (messages.commentType === 'audienceJoin') {
    return (
      <div className="chat-history chat-notification audienceJoin">
        <img src={StarIcon} className="notification-icon" alt="star-icon" />
        <div className="notification-text f-body-14">
          {messages.messageText}
        </div>
        {children}
      </div>
    );
  }

  if (messages.commentType === 'audienceSendGift') {
    return (
      <div className="chat-history chat-notification audienceSendGift">
        <img src={GiftIcon} className="notification-icon" alt="star-icon" />
        <div className="notification-text f-body-14">
          {messages.messageText}
        </div>
        {children}
      </div>
    );
  }

  if (messages.commentType === 'placeOrder') {
    return (
      <div className="chat-history chat-notification placeOrder">
        <img
          src={PurchaseIcon}
          className="notification-icon"
          alt="purchase-icon"
        />
        <div className="notification-text f-body-14">
          {messages.messageText}
        </div>
        {children}
      </div>
    );
  }
  return (
    <div className="chat-history">
      <div className="chat-name f-body-12">{messages.sender.displayName}</div>
      <div className="chat-text f-body-14">{messages.messageText}</div>
      {children}
    </div>
  );
};

const Chat = ({ chat }) => {
  const chatClass = `chatting-user`;
  const [showBlock, setShowBlock] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.global.userInfo);
  const inviteAudience = userDetails => {
    const data = {
      state: 'invited',
      userDetials: {
        ...userDetails,
      },
    };
    dispatch(setInviteAudience(data));
  };
  console.log('chat sender info: ', chat.sender);

  return (
    <>
      <div
        className={chatClass}
        onMouseEnter={() => {
          if (userInfo.userId != chat.sender.id) {
            setShowBlock(true);
          }
        }}
        onMouseLeave={() => {
          setShowBlock(false);
        }}
      >
        <div
          className="chat-avatar"
          onClick={() => {
            if (userInfo.userId != chat.sender.id) {
              inviteAudience(chat.sender);
            }
          }}
        >
          <img
            className="user-avatar"
            src={chat.sender.profileImageUrl || IMG.USER}
            alt="user avatar"
          />
        </div>
        <ChatHistory messages={chat}>
          {showBlock && (
            <Block
              userInfo={chat.sender}
              direction="right"
              values={values}
              from="chat"
              message={chat.messageText}
            />
          )}
        </ChatHistory>
      </div>
    </>
  );
};

export default Chat;
