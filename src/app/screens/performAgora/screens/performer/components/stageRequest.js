import React from 'react';
import '../../../../../styles/performerview/invite-audience.scss';
import usePerformer from '../../../hooks/usePerformer';
import Button from '../../../../../components/Common/Button';
// import AudiencePhoto from '../../assets/image/audience-photo.png';

export default function StageRequest({ user }) {
  const performerHook = usePerformer();
  const handleDecline = userId => {
    performerHook.rejectStageJoinReq(userId);
  };

  const handleBringRequest = () => {
    performerHook.acceptStageJoinReq(user);
  };

  return (
    <div className="invite-audience">
      <div className="audience-photo">
        <img src={user.profileImageUrl || IMG.USER} alt="audience" />
      </div>
      <div className="invite-modal">
        <h2 className="h2">{user.displayName}</h2>
        <p>Wants to join stage!</p>
        <div className="invite-action">
          <Button
            onClick={() => handleDecline(user.id)}
            background="transparent"
            border="gradient"
            size="large"
          >
            Decline
          </Button>
          <Button onClick={() => handleBringRequest(user.id)} size="large">
            BRING ON STAGE
          </Button>
        </div>
      </div>
    </div>
  );
}
