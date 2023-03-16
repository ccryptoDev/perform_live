/**
 *
 * TimeCounter
 *
 */

import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getServerCurrentTime } from '../../state/app.actions';
import { addZero, getTimeDiff } from '../../utils/timeConverter';

export const TimeCounter = props => {
  const [timerCountDown, setTimerCountDown] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  const dispatch = useDispatch();
  const serverCurrentTime = useSelector(
    state => state.global.serverCurrentTime,
  );
  const intervalRef = useRef(null);

  const runTimer = () => {
    let intervalCount = 0;
    intervalRef.current = setInterval(() => {
      intervalCount += 1;
      setTimer(serverCurrentTime + 1000 * intervalCount);
    }, 1000);
  };

  const setTimer = currentTime => {
    const remainingTime = getTimeDiff(currentTime, props.startTime);
    const remainingTimeSplit = remainingTime.split(':');
    if (
      +remainingTimeSplit[0] === 0 &&
      +remainingTimeSplit[1] === 0 &&
      +remainingTimeSplit[2] === 0
    ) {
      clearInterval(intervalRef.current);
      props.onTimeOver();
    }
    setTimerCountDown({
      hours: addZero(+remainingTimeSplit[0]),
      minutes: addZero(+remainingTimeSplit[1]),
      seconds: addZero(+remainingTimeSplit[2]),
    });
  };

  // useEffect(() => {
  //   if (!serverCurrentTime) dispatch(getServerCurrentTime());
  //   // Can be treated as mount/unmount hook, or update hook if observable is passed in 2nd argument.
  // }, []); // Add observable in array if you want the hook to run on updating those values

  useEffect(
    () => {
      if (serverCurrentTime) {
        // check if performance starttime is greater than current time
        const isUpcomingPerformance = moment(serverCurrentTime).isBefore(
          props.startTime,
        );
        if (isUpcomingPerformance) {
          setTimer(serverCurrentTime);
          props.onTimeStart();
          runTimer();
        } else {
          props.onTimeOver();
        }
      }
      return () => {
        clearInterval(intervalRef.current);
        //reset timer
      };
    },
    [serverCurrentTime],
  );

  return (
    <>{`${timerCountDown.hours}:${timerCountDown.minutes}:${
      timerCountDown.seconds
    }`}</>
  );
};

TimeCounter.propTypes = {
  startTime: PropTypes.string,
  onTimeOver: PropTypes.func,
  onTimeStart: PropTypes.func,
};

export default memo(TimeCounter);
