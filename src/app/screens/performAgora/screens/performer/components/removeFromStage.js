import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../../styles/performerview/invite-audience.scss';
import moment from 'moment';
import { firebaseClient } from '../../../../../utils/firebase';
import { IMG } from '../performer.dependencies';
import { setInviteAudience } from '../state/performer.actions';
import { PerformAgoraConstants } from '../../../performAgora.constants';
// import AudiencePhoto from '../../assets/image/audience-photo.png';

export default function removeFromStage({ user }) {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.global.userInfo);
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
    const messagedata = {
      messageType:
        PerformAgoraConstants.FIREBASE_MESSAGE_TYPES.AUDIENCE_KICKED_FROM_STAGE,
      timeStamp: moment()
        .utc()
        .format(),
    };
    firebaseClient.sendPeerMessage(user.userId, messagedata);
  };

  return (
    <div className="invite-audience">
      <div className="invite-modal">
        <h3>Do you want to remove {user.displayName} from stage?</h3>
        <p>
          {user.displayName} will be removed from the stage without the
          possiblity to come back.
        </p>
        <div className="invite-action">
          <div>
            <div className="remove-button">
              <button onClick={() => handleRemove(user)}>REMOVE</button>
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
