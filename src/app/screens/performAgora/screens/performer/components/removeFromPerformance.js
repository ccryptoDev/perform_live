import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../../styles/performerview/invite-audience.scss';
import moment from 'moment';
import { firebaseClient } from '../../../../../utils/firebase';
import { IMG } from '../performer.dependencies';
import { setInviteAudience } from '../state/performer.actions';
import { PerformAgoraConstants } from '../../../performAgora.constants';
// import AudiencePhoto from '../../assets/image/audience-photo.png';

export default function removeFromPerformance({ user }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.global.userInfo);
  const performanceData = useSelector(
    state => state.performagora.performanceData,
  );
  const handleKeep = user => {
    const data = {
      state: '',
      userDetials: {},
    };
    dispatch(setInviteAudience(data));
  };

  const handleRemove = user => {
    const data = {
      state: '',
      userDetials: {},
    };
    dispatch(setInviteAudience(data));
    let messagedata = {
      messageType:
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES
          .AUDIENCE_KICKED_FROM_PERFORMANCE,
      messageData: {
        senderId: performanceData.performer.id,
        timeStamp: moment()
          .utc()
          .format(),
      },
    };
    firebaseClient.sendPeerMessage(user.id, messagedata);

    // Update user state in channel_users table
    const channelUsersRef = `channel_users/${firebaseClient._channel}/${
      user.id
    }`;
    messagedata = {
      isCurrentlyWatching: false,
      isUserBlockedFromPerformance: true,
      timeStamp: moment()
        .utc()
        .format(),
    };
    firebaseClient.updateData(channelUsersRef, messagedata);
  };

  return (
    <div className="invite-audience">
      <div className="invite-modal">
        <h3>Do you want to remove {user.displayName} from performance?</h3>
        <p>
          {user.displayName} will be removed from the performance without the
          possiblity to come back.
        </p>
        <div className="invite-action">
          <div>
            <div className="remove-button">
              <button
                type="button"
                className="button left-btn"
                role="button"
                onClick={() => handleRemove(user)}
              >
                <span className="button__border" />
                <span className="button__overlay" />
                <span className="button__label flex-center">REMOVE</span>
              </button>
            </div>
          </div>
          <div>
            <div className="invite-button">
              <button onClick={() => handleKeep(user)}>KEEP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
