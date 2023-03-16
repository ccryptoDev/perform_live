import React, { useState, useEffect } from 'react';
import moment from 'moment';
import UpIcon from '../../../assets/svg/timepicker/up.svg';
import DownIcon from '../../../assets/svg/timepicker/down.svg';
import './TimePicker.scss';
import { addZero } from '../../utils/timeConverter';
import {
  getTimeObjectFromDate,
  getDateFromTimeObject,
} from '../../utils/date-helper';

const TimePickerSection = ({ onTop, onBottom, number }) => {
  return (
    <div className="timepicker__selector">
      <img className="upper" src={UpIcon} onClick={onTop} role="none" alt="" />

      <p>{number}</p>

      <img
        className="down"
        src={DownIcon}
        onClick={onBottom}
        role="none"
        alt=""
      />
    </div>
  );
};

const TimePicker = props => {
  const timeInfo = getTimeObjectFromDate(props.date);

  const handleInputChange = (type, value) => {
    const date = getDateFromTimeObject(props.date, {
      ...timeInfo,
      [type]: value,
    });

    props.onTimeFieldChange(date);
  };

  return (
    <div className="timepicker" onMouseLeave={props.onHide}>
      <TimePickerSection
        number={timeInfo.hour}
        onTop={() =>
          handleInputChange(
            'hour',
            +timeInfo.hour === 11 ? '00' : +timeInfo.hour + 1,
          )
        }
        onBottom={() =>
          handleInputChange(
            'hour',
            +timeInfo.hour === 0 ? 11 : +timeInfo.hour - 1,
          )
        }
      />
      <div className="time-seperator">:</div>
      <TimePickerSection
        number={timeInfo.minute}
        onTop={() =>
          handleInputChange(
            'minute',
            +timeInfo.minute === 45 ? 0 : +timeInfo.minute + 15,
          )
        }
        onBottom={() =>
          handleInputChange(
            'minute',
            +timeInfo.minute === 0 ? 45 : +timeInfo.minute - 15,
          )
        }
      />

      <TimePickerSection
        number={timeInfo.ampm}
        onTop={() =>
          handleInputChange('ampm', timeInfo.ampm === 'AM' ? 'PM' : 'AM')
        }
        onBottom={() =>
          handleInputChange('ampm', timeInfo.ampm === 'AM' ? 'PM' : 'AM')
        }
      />
    </div>
  );
};

export default TimePicker;
