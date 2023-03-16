import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

export default function Modal(props) {
  const {
    title,
    children,
    className,
    isModalOpen,
    showCloseIcon = false,
    closeOnOuterClick = false,
    closeModal,
  } = props;

  return (
    isModalOpen && (
      <div
        className={className ? `general-modal ${className}` : 'general-modal'}
        onClick={closeOnOuterClick ? closeModal : () => {}}
      >
        <div className="modal__bg" />
        <div className="modal__body">
          {title && (
            <div className="modal__top">
              <span className="h2">{title}</span>
            </div>
          )}
          {children}
          {showCloseIcon && (
            <button
              type="button"
              tabIndex={0}
              className="close"
              onClick={closeModal}
              onKeyUp={closeModal}
            >
              &times;
            </button>
          )}
        </div>
      </div>
    )
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
  showCloseIcon: PropTypes.bool,
  closeOnOuterClick: PropTypes.bool,
};
