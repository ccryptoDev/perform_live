import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { firebaseClient } from '../../../../../utils/firebase';
import { PerformAgoraConstants } from '../../../performAgora.constants';
import { IMG } from '../performer.dependencies';
import {
  removeUser,
  setActiveInvitedAudience,
  setInviteAudience,
} from '../state/performer.actions';
import usePerformer from '../../../hooks/usePerformer';
import { getFullName } from '../../../../../utils/common';
import Block from '../../../../../components/Block/Block';
// import MoreIcon from '../../assets/svg/more.svg';
// import user1 from '../../assets/svg/performlive/user1.svg';

const values = ['Report user', 'Block user'];

export default function Audience({ user, isStageUser, isInvitedUser }) {
  const [showMoreAction, setShowMoreAction] = useState(false);
  const dispatch = useDispatch();
  const performanceData = useSelector(
    state => state.performagora.performanceData,
  );
  const activeInvitedAudience = useSelector(
    state => state.performer.activeInvitedAudience,
  );
  const performer = usePerformer();
  const inviteAudience = userDetails => {
    // check if user can be invited or not
    // First check if a user is already invited
    const isInvitedUserExist = Object.keys(activeInvitedAudience).length;
    const activeStreams = window.perform.getBordCastRTCClient().getStreams();
    if (activeStreams.length > 1 || isInvitedUserExist) return;
    const data = {
      state: 'invited',
      userDetials: {
        ...userDetails,
      },
    };
    dispatch(setInviteAudience(data));
  };

  const handleRemoveAction = () => {
    if (isStageUser) {
      const data = {
        state: 'remove',
        userDetials: {
          userId: user.id,
          displayName: getFullName(user.displayName),
        },
      };
      dispatch(removeUser(data));
    } else {
      const messageData = {
        messageType:
          PerformAgoraConstants.FIREBASE_MESSAGE_TYPES
            .CANCEL_INVITE_TO_JOIN_STAGE,
        timeStamp: moment()
          .utc()
          .format(),
      };
      firebaseClient.sendPeerMessage(user.id, messageData);
      dispatch(setActiveInvitedAudience({ id: user.id, action: 'delete' }));
    }
    setShowMoreAction(false);
  };
  console.log('user in audience: ', user);
  return (
    <div className="audience-item" id={user.id}>
      <div className="audience-info">
        <img
          src={user.profileImageUrl || IMG.USER}
          alt="user"
          onClick={() => inviteAudience(user)}
        />
        <span className="audience-name">{user.displayName}</span>
      </div>
      {performanceData.stageEnabled && (
        <div className="audience-feature">
          {((isStageUser || isInvitedUser) && (
            <>
              <span className="active-stage">
                {isStageUser ? 'On stage' : 'Invited'}
              </span>
              <span>
                <img
                  src={IMG.MORE_ICON}
                  alt="more"
                  onClick={() => setShowMoreAction(!showMoreAction)}
                />
                {showMoreAction && (
                  <div
                    className="performer-actions"
                    onMouseLeave={() => setShowMoreAction(false)}
                  >
                    <span onClick={handleRemoveAction}>
                      {isStageUser ? 'Remove from stage' : 'Cancel invitation'}
                    </span>
                  </div>
                )}
              </span>
            </>
          )) ||
            (performanceData.state === 'live' && (
              <span className="invite-btn" onClick={() => inviteAudience(user)}>
                Invite to stage
              </span>
            ))}
          <Block
            userInfo={user}
            values={values}
            direction="right"
            from="audience"
          />
        </div>
      )}
    </div>
  );
}
