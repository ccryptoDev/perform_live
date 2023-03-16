import React from 'react';
import moment from 'moment';
// import PropTypes from 'prop-types';
import './DateBadge.scss';

export const DateBadge = ({ date }) => {
  const dateM = moment(date);
  return (
    <div className="date-info">
      {dateM.format('MMM')}, {dateM.format('DD')}
    </div>
  );
};

DateBadge.propTypes = {};

export default DateBadge;
