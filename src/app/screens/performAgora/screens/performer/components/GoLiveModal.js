import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import AppConstants from 'app/app.constants.json';
import { IMG } from '../performer.dependencies';
// import SettingIcon from '../../assets/svg/review-setting.svg';
import '../../../../../styles/performerview/review-modal.scss';

import { updatePerformanceState } from '../../../state/performAgora.actions';
import { TimeCounter } from '../../../../../components/TimeCounter/TimeCounter';
import { PerformAgoraConstants } from '../../../performAgora.constants';
import { sendChannelMsg } from '../../../../../utils/common';

export default function GoLiveModal(props) {
  const [goLiveTime, setGoLiveTime] = useState(true);
  const [goLive, setGoLive] = useState(false);

  const dispatch = useDispatch();
  const performanceData = useSelector(
    state => state.performagora.performanceData,
  );
  const handleTimeOver = () => {
    setGoLive(true);
    setGoLiveTime(false);
  };

  const handleTimeStart = () => {
    setGoLiveTime(true);
  };

  const handleGoLive = () => {
    if (goLive || 1) {
      // update the performance state from publish to live
      dispatch(
        updatePerformanceState({
          paramsToReplace: { id: props.performanceId },
        }),
      );
    }
  };

  return (
    <div className="performer-review">
      {goLiveTime ? (
        <div className="review-top">
          <p className="time-span">
            <TimeCounter
              onTimeOver={handleTimeOver}
              startTime={props.performanceStartTime}
              onTimeStart={handleTimeStart}
            />
          </p>

          <p className="time-description">
            left before the start of the performance
          </p>
        </div>
      ) : (
        <div className="review-top">
          <p className="time-start">Time to start!</p>
        </div>
      )}
      <div
        className="go-live"
        role="button"
        onClick={handleGoLive}
        onKeyPress={handleGoLive}
        disabled={!goLive}
        tabIndex={0}
        type="button"
      >
        Go live
      </div>
      <div
        className="performer-settings"
        onClick={props.openSettingClick}
        onKeyPress={props.openSettingClick}
        role="button"
        tabIndex={0}
      >
        <img src={IMG.REVIEW_SETTING} alt="setting" />
        Open settings
      </div>
    </div>
  );
}

GoLiveModal.propTypes = {
  performanceStartTime: PropTypes.string,
  openSettingClick: PropTypes.func,
  performanceId: PropTypes.number,
};
