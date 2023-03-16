import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { IMG } from '../../performanceScheduler.dependencies';
import Button from '../../../../components/Common/Button';

export const PerformanceFooter = ({
  onBack,
  onNext,
  nextButtonText,
  nextButtonDisabled,
  btnSuffix,
}) => {
  return (
    <div className="bottom">
      <Button
        size="large"
        fontSize="13px"
        onClick={onNext}
        disabled={nextButtonDisabled}
        className="bottom-btn"
      >
        {nextButtonText}
        {btnSuffix || (
          <img
            src={IMG.PLAN_NEXT_ARROW}
            className="next-arrow"
            alt="next arrow"
          />
        )}
      </Button>
      {onBack && (
        <Button
          background="transparent"
          border="gradient"
          onClick={onBack}
          size="large"
          fontSize="13px"
          className="bottom-btn"
        >
          <img src={IMG.PLAN_BACK_ARROW} alt="prev icon" />
          Back
        </Button>
      )}
    </div>
  );
};

PerformanceFooter.propTypes = {
  onSkip: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  nextButtonText: PropTypes.string,
  nextButtonDisabled: PropTypes.bool,
  btnSuffix: PropTypes.node,
};

export default memo(PerformanceFooter);
