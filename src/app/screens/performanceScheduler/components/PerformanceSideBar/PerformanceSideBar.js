import React from 'react';
import PropTypes from 'prop-types';
import { IMG } from '../../performanceScheduler.dependencies';
import Button from '../../../../components/Common/Button';

const PerformanceSideBar = props => (
  <div className="creatingside-bar">
    <div className="page-status">Step {props.activeStep} / 4</div>
    <div className="schedule-option">
      <div className="option-list">
        <span className={`text ${props.activeStep === 1 ? 'active' : ''}`}>
          1. &nbsp;&nbsp;&nbsp;Performance details
        </span>
        {props.activeStep === 1 && (
          <img
            src={IMG.PLAN_NEXT_ARROW}
            className="next-icon"
            alt="Next Icon"
          />
        )}
      </div>
      <div className="option-list">
        <span className={`text ${props.activeStep === 2 ? 'active' : ''}`}>
          2. &nbsp;&nbsp;&nbsp;Add Products
        </span>
        {props.activeStep === 2 && (
          <img
            src={IMG.PLAN_NEXT_ARROW}
            className="next-icon"
            alt="Next Icon"
          />
        )}
      </div>
      <div className="option-list">
        <span className={`text ${props.activeStep === 3 ? 'active' : ''}`}>
          3. &nbsp;&nbsp;&nbsp;Add a promotional video
        </span>
        {props.activeStep === 3 && (
          <img
            src={IMG.PLAN_NEXT_ARROW}
            className="next-icon"
            alt="Next Icon"
          />
        )}
      </div>
      <div className="option-list">
        <span className={`text ${props.activeStep === 4 ? 'active' : ''}`}>
          4. &nbsp;&nbsp;&nbsp;Summary
        </span>
        {props.activeStep === 4 && (
          <img
            src={IMG.PLAN_NEXT_ARROW}
            className="next-icon"
            alt="Next Icon"
          />
        )}
      </div>
    </div>
  </div>
);

PerformanceSideBar.propTypes = {
  activeStep: PropTypes.number,
  onSaveAsDraft: PropTypes.func,
  onDeletePF: PropTypes.func,
  disableDelete: PropTypes.bool,
};

export default PerformanceSideBar;
