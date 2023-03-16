import React from 'react';
import moment from 'moment';
// import PropTypes from 'prop-types';
import './TimeBadge.scss';

const format = 'hh:mm';

export const TimeBadge = ({ startDate, endDate }) => {
  const startM = moment(startDate);
  const endM = moment(endDate);
  return (
    <div className="time">
      {startM.format(format)} - {endM.format(format)}{' '}
      <span className="pm">{endM.format('A')}</span>
    </div>
  );
};

TimeBadge.propTypes = {};

export default TimeBadge;
