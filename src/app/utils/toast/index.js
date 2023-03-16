import React from 'react';
import { toast } from 'react-toastify';
import ErrorIcon from './error-icon.svg';
import SuccessIcon from './success-icon.svg';
import CloseIcon from './close-icon.svg';
import './toast.scss';

const BaseToastComponent = ({ icon, message }) => {
  return (
    <div className="flex flex-row">
      {icon && <img className="toast-icon" src={icon} alt="toast icon" />}
      {message}
    </div>
  );
};

const baseOptions = options => ({
  ...options,
  closeButton: ({ closeToast }) => (
    <div
      onClick={closeToast}
      onKeyPress={closeToast}
      role="button"
      tabIndex="0"
      className="close-icon-container"
    >
      <img className="close-icon" src={CloseIcon} alt="close icon" />
    </div>
  ),
});

const plToast = {
  success: (message, options) =>
    toast.success(
      <BaseToastComponent icon={SuccessIcon} message={message} />,
      baseOptions(options),
    ),
  error: (message, options) =>
    toast.error(
      <BaseToastComponent icon={ErrorIcon} message={message} />,
      baseOptions(options),
    ),
};
export default plToast;
