import React, { useEffect, useMemo, memo } from 'react';
import moment from 'moment';
import Button from '../../../../../components/Common/Button';

const ConfirmFinishPerformanceModal = ({
  onConfirm,
  onCancel,
  endDatetime,
}) => {
  useEffect(() => {
    document.body.style = 'overflow: hidden;';
    return () => {
      document.body.style = '';
    };
  }, []);

  const timeLeft = useMemo(() => {
    const end = moment(endDatetime);

    const diff = end.diff(moment(), 'minutes');
    return diff < 1 ? 'Less than minute' : `${diff} min${diff > 1 ? 's' : ''}`;
  }, []);

  return (
    <div className="finish-performance-container" onClick={onCancel}>
      <div className="finish-performance-modal">
        <h2 className="h2">Are you sure you want to end the performance?</h2>
        <p>
          <b>{timeLeft}</b> of perfomance left
        </p>
        <div className="finish-performance-modal__controls">
          <Button
            border="gradient"
            background="transparent"
            size="large"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button size="large" onClick={onConfirm}>
            END
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmFinishPerformanceModal);
