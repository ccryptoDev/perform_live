import React from 'react';
import propTypes from 'prop-types';
import './Statistics.scss';
import profViews from '../../assets/prof-views.png';
import countViews from '../../assets/count-views.png';

const Statistics = ({ name, views }) => {
  return (
    <div className="statistics-container">
      <div className="statistics__header">
        <div className="h2">{name} views</div>
        <div className="statistics__header-date">{views} Since last week</div>
      </div>
      <div className="views-value">4,003</div>
      <div className="statistics__body">
        <div className="statistics__body-soon soon">Coming soon</div>
        <div className="statistics__body-data">
          <img alt="count-views" src={countViews} />
          <img alt="prof-views" src={profViews} />
        </div>
        <div className="dates">
          <div className="date">Feb</div>
          <div className="date">Mar</div>
          <div className="date">Apr</div>
          <div className="date">May</div>
          <div className="date">Jun</div>
          <div className="date">Jul</div>
          <div className="date">Aug</div>
          <div className="date">Sept</div>
        </div>
      </div>
    </div>
  );
};

Statistics.propTypes = {
  name: propTypes.string,
  views: propTypes.number,
};

export default Statistics;
