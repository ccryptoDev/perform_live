import React from 'react';
import propTypes from 'prop-types';

import Button from '../../../components/Common/Button';

const ErrorModal = ({ error, onClose }) => {
  return (
    <div className="modal-body">
      <div className="h2">Something went wrong</div>
      <div className="error-title">Fix one of the following and try again </div>
      <div className="modal-data__error">{error.data.message}</div>
      <div className="modal-error__action-btns">
        <Button onClick={onClose} size="large">
          Close
        </Button>
      </div>
    </div>
  );
};

ErrorModal.propTypes = {
  error: propTypes.object,
  onClose: propTypes.func,
};

export default ErrorModal;
