import React from 'react';
import { useDispatch } from 'react-redux';
import '../../../../../styles/performerview/invite-audience.scss';

import { removeUser } from '../state/performer.actions';
import usePerformer from '../../../hooks/usePerformer';
import Button from '../../../../../components/Common/Button';

export default function RemoveStage({ user }) {
  const dispatch = useDispatch();
  const performer = usePerformer();
  const handleStage = userId => {
    const data = {
      state: '',
      userDetials: {},
    };
    dispatch(removeUser(data));
  };

  const handleRemove = () => {
    performer.removeUser(user);
  };

  return (
    <div className="invite-audience">
      <div className="invite-modal">
        <h3>Do you want to remove {user.displayName} from stage?</h3>
        <p>
          {user.displayName}
          's paid time isn't over yet. if you remove {user.displayName} now you
          will be charged anyway.
        </p>
        <div className="invite-action">
          <Button
            background="transparent"
            border="gradient"
            onClick={handleRemove}
          >
            REMOVE
          </Button>
          <Button background="gradient" onClick={handleStage}>
            KEEP ON STAGE
          </Button>
        </div>
      </div>
    </div>
  );
}
