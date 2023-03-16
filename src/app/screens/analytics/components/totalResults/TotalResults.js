import React, { useMemo } from 'react';
import propTypes from 'prop-types';

import './TotalResults.scss';
import views from '../../assets/views.svg';

const timeConvert = seconds => {
  const hours = Math.floor(seconds / 60 / 60);
  const minutes = Math.floor(seconds / 60) - hours * 60;

  return `${hours}h${minutes}min`;
};

const TotalResults = ({ data }) => {
  return (
    <div className="results-container">
      <div className="block-item">
        <img className="icon" alt="views" src={views} />
        <div>
          <div className="h2">{data.audienceCount}</div>
          <div className="block-item__caption">Total unique views</div>
        </div>
      </div>
      <div className="vertical-border" />
      <div className="block-item">
        <img className="icon" alt="views" src={views} />
        <div>
          <div className="h2">{timeConvert(data.videoSec)}</div>
          <div className="block-item__caption">Total performances time</div>
        </div>
      </div>
    </div>
  );
};

TotalResults.propTypes = {
  data: propTypes.object,
};

export default TotalResults;
