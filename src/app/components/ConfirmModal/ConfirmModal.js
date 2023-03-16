/**
 *
 * ConfirmModal
 *
 */

import React from 'react';
import Button from '../Common/Button';
// import PropTypes from 'prop-types';
import './ConfirmModal.scss';

export const ConfirmModal = ({
  title,
  subtitle,
  leftButtonProps,
  rightButtonProps,
  children,
}) => (
  <div className="confirm-modal">
    <div className="confirm-modal__background">
      <div className="h3">{title}</div>
      <p>{subtitle}</p>
      <div className="confirm-modal__action-buttons">
        {!children ? (
          <>
            <Button {...leftButtonProps}>{leftButtonProps.label}</Button>
            <Button {...rightButtonProps}>{rightButtonProps.label}</Button>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  </div>
);

ConfirmModal.propTypes = {};

export default ConfirmModal;
