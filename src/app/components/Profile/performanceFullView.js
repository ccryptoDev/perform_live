import React, { memo } from 'react';
import PropTypes from 'prop-types';
import AppConstants from 'app/app.constants.json';
import { IMG } from './profile.dependencies';
import Card from './performance/PerformanceCard';

const PerformanceFullView = props => {
  const {
    performanceData,
    toggleToSliderView,
    performanceType,
    userInfo,
    deletePerformance,
  } = props;

  return (
    <div className="row-content full-view" id={performanceType}>
      <div className="header-row">
        <span
          className="view-text"
          onClick={() => toggleToSliderView(performanceType)}
          role="none"
        >
          Back
        </span>
      </div>
      <div className="content-top">
        {performanceType === AppConstants.PERFORMANCE_STATUS.LIVE ? (
          <div className="title">
            <img src={IMG.LIVE_LOGO} className="live-logo" alt="live logo" />
            <span className="title-bold">Live</span>
            <span className="text">now</span>
          </div>
        ) : null}
        {performanceType === AppConstants.PERFORMANCE_STATUS.DRAFT ? (
          <div className="title">
            <span className="title-bold">Drafts</span>
          </div>
        ) : null}
        {performanceType === AppConstants.PERFORMANCE_STATUS.PUBLISHED ||
        performanceType === AppConstants.PERFORMANCE_STATUS.PAST ? (
          <div className="title">
            <span className="title-bold margin-0">
              {performanceType === 'published' ? 'Coming' : 'Past'}
            </span>
            <span className="text">
              {performanceType === 'published' ? 'soon' : 'popular'}
            </span>
          </div>
        ) : null}
      </div>
      {(performanceData.length && (
        <div className="cards">
          {performanceData.map(performance => (
            <Card // for timing being then will change again to live
              key={performance.id}
              performance={performance}
              userInfo={userInfo}
              deletePerformance={deletePerformance}
            />
          ))}
        </div>
      )) ||
        ''}
    </div>
  );
};

PerformanceFullView.propTypes = {
  performanceData: PropTypes.array,
  performanceType: PropTypes.string,
  toggleToSliderView: PropTypes.func,
  userInfo: PropTypes.object,
  deletePerformance: PropTypes.func,
};

export default memo(PerformanceFullView);
