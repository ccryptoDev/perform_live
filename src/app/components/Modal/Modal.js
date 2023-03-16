import PropTypes from 'prop-types';
import React from 'react';
import './Modal.scss';

export default function Modal(props) {
  const {
    isModalOpen,
    children,
    showCloseIcon = true,
    closeOnOuterClick = false,
    closeModal,
    customClass,
  } = props;
  return (
    isModalOpen && (
      <div
        className="modal"
        onClick={closeOnOuterClick ? closeModal : () => {}}
        role="presentation"
      >
        <div className={`modal-content app-container ${customClass}`}>
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
  isModalOpen: PropTypes.bool.isRequired,
  children: PropTypes.any,
  closeModal: PropTypes.func,
  showCloseIcon: PropTypes.bool,
  customClass: PropTypes.string,
  closeOnOuterClick: PropTypes.bool,
};
