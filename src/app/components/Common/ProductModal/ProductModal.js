import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../../../../assets/svg/btns/close.svg';
import './ProductModal.scss';
import Button from '../Button';
export default function ProductModal({
  onClose,
  title,
  children,
  subtitle,
  currentStep,
  totalSteps = 3,
  className,
  steps = true,
}) {
  return (
    <div className={`gallery-modal ${className}`}>
      <div className="modal-bg" />
      <div className="modal-body">
        <div className="newproduct-top">
          <span className="new-product">{title}</span>
          <Button
            size="default"
            background="glassy-white"
            className="circle-btn"
            onClick={onClose}
            suffix={<img src={CloseIcon} alt="close icon" />}
          />
        </div>
        <div className="gallery-top">
          <span className="text">{subtitle}</span>
          {steps && (
            <span className="right-text">
              Step {currentStep}
              &nbsp;
              <span className="right-opacity">
                of&nbsp;
                {totalSteps}
              </span>
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

ProductModal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  subtitle: PropTypes.string,
  currentStep: PropTypes.number,
  totalSteps: PropTypes.number,
};
