import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IMG } from '../../profile.dependencies';
import './DeleteModal.scss';
import Button from '../../../../components/Common/Button/Button';

const DeleteModal = props => (
  <div className="delete-modal">
    <div className="modal-bg" />
    <div className="modal-body">
      <h2 className="modal-title">{props.heading}</h2>
      <p className="modal-description">{props.description}</p>
      <div className="modal-action">
        <Button
          type="primary"
          size="large"
          background="transparent"
          border="gradient"
          onClick={props.confirmCallBack}
        >
          {props.confirmText || 'Delete'}
        </Button>
        <Button
          type="primary"
          size="large"
          background="gradient"
          onClick={props.cancelCallBack}
        >
          {props.cancelText || 'Cancel'}
        </Button>
      </div>
    </div>
  </div>
);

DeleteModal.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  confirmCallBack: PropTypes.func,
  cancelCallBack: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default DeleteModal;
