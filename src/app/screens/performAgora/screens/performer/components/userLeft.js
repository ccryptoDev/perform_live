import React from 'react';
import { useDispatch } from 'react-redux';
import '../../../../../styles/performerview/invite-audience.scss';
import { removeUser } from '../state/performer.actions';
import Button from '../../../../../components/Common/Button/Button';
import CloseIcon from '../../../../../../assets/svg/btns/close.svg';

export default function UserLeft({ user }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    const data = {
      state: '',
      userDetials: {},
    };
    dispatch(removeUser(data));
  };

  return (
    <div className="invite-audience">
      <div className="invite-modal">
        <h2 className="h2">Your Fan left the stage!</h2>
        <p>You can invite more Fans to join!</p>
        <Button
          size="default"
          background="glassy-white"
          className="circle-btn"
          onClick={handleClose}
          suffix={<img src={CloseIcon} alt="close icon" />}
        />
      </div>
    </div>
  );
}
