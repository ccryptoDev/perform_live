import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../components/Common/Button';
import './AlertModal.scss';

const AlertModal = props => {
  const {
    heading,
    description,
    confirmBtn = true,
    confirmText,
    cancelText,
    confirmCallBack,
    cancelCallBack,
  } = props;
  return (
    <div className="alert-modal">
      <div className="modal-bg" />
      <div className="modal-body">
        <h3 className="h2 modal-title">{heading}</h3>
        <p className="modal-description">{description}</p>
        <div className="modal-action">
          <Button
            background={confirmBtn ? 'transparent' : 'gradient'}
            border={confirmBtn ? 'gradient' : ''}
            size="large"
            className="cancel-action"
            onClick={cancelCallBack}
            onKeyPress={cancelCallBack}
            tabIndex={0}
          >
            {cancelText || 'Cancel'}
          </Button>
          {confirmBtn && (
            <Button
              size="large"
              className="delete-action"
              onClick={confirmCallBack}
              onKeyPress={confirmCallBack}
              tabIndex={0}
            >
              {confirmText || 'Delete'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

AlertModal.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  confirmBtn: PropTypes.bool,
  confirmCallBack: PropTypes.func,
  cancelCallBack: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default AlertModal;
