import React, { memo } from 'react';
import PropTypes from 'prop-types';
import AppConstants from 'app/app.constants.json';
import { IMG } from '../../home.dependencies';
import Card from '../../../../components/Card';
import './PerformanceFullView.scss';

const PerformanceFullView = props => {
  const { performanceData, performanceType } = props;
  return (
    <div className="row-content full-view" id={performanceType}>
      <div className="header-row">
        <span
          className="view-text"
          onClick={() => props.toggleToSliderView(performanceType)}
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
      {!!performanceData.length && (
        <div className="cards">
          {performanceData.map(
            performance =>
              performance.state !== 'draft' && (
                <Card // for timing being then will change again to live
                  key={performance.id}
                  performanceData={performance}
                  type={performanceType}
                />
              ),
          )}
        </div>
      )}
    </div>
  );
};

PerformanceFullView.propTypes = {
  performanceData: PropTypes.array,
  performanceType: PropTypes.string,
  toggleToSliderView: PropTypes.func,
};

export default memo(PerformanceFullView);
