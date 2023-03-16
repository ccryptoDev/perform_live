import React, { useState } from 'react';
import moment from 'moment';
import { firebaseClient } from '../../../../utils/firebase';
import { PerformAgoraConstants } from '../../performAgora.constants';
import { IMG } from '../../screens/performer/performer.dependencies';
import GiftIcon from '../../../../../assets/svg/performlive/gift.svg';

export default function HeartReaction({ onGiftClick, giftEnabled }) {
  const doReact = () => {
    const message = {
      messageType:
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.LIKED_PERFORMANCE,
      timeStamp: moment()
        .utc()
        .format(),
    };
    firebaseClient.sendChannelMessage('', message);
  };

  return (
    <>
      <div className="emotical-group">
        {giftEnabled && (
          <div className="emotical-icons gift-icon">
            <img
              className="emotical-icon"
              src={GiftIcon}
              alt="heart icon"
              onClick={onGiftClick}
              role="none"
            />
          </div>
        )}
        <div className="emotical-icons" onClick={doReact}>
          <img
            className="emotical-icon"
            src={IMG.HEART_OUTLINE}
            alt="heart icon"
            role="none"
          />
        </div>
      </div>
    </>
  );
}
