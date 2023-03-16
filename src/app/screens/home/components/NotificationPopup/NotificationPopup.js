import React, { useCallback, memo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../../../../components/Common/Button';

import './NotificationPopup.scss';

const Modal = memo(({ content }) => {
  const history = useHistory();

  const onClose = useCallback(() => {
    history.replace('/');
  }, []);

  useEffect(() => {
    document.body.style = 'overflow: hidden;';
    return () => {
      document.body.style = '';
    };
  }, []);

  return (
    <div className="notification-container">
      <div className="notification-modal">
        <h3>{content}</h3>
        <Button
          background="gradient"
          size="large"
          onClick={onClose}
          className="mt-16"
        >
          CLOSE
        </Button>
      </div>
    </div>
  );
});

const NotificationPopup = () => {
  const location = useLocation();

  return location.state && location.state.popup ? (
    <Modal content={location.state.popup} />
  ) : null;
};

export default memo(NotificationPopup);
