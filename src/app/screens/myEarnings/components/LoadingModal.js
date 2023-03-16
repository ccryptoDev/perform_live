import React from 'react';
import CircularSpinner from '../../../components/CircularSpinner';

const LoadingModal = () => {
  return (
    <div className="modal-body-spinner">
      <CircularSpinner />
      <div className="success-title">Your redemption is being processed</div>
    </div>
  );
};

export default LoadingModal;
