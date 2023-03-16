import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import NoPerformance from './performance/NoPerformance';
import PerformanceGallery from './performance/PerformanceGallery';

const PerformanceInfo = props => {
  return (
    <>
      {props.livePerformances.length === 0 &&
      props.pastPerformances.length === 0 &&
      props.comingPerformances.length === 0 &&
      (props.type != 'otherProfile' && props.draftPerformances.length === 0) ? (
        <NoPerformance type={props.type} />
      ) : (
        <>
          {props.livePerformances.length > 0 && (
            <PerformanceGallery
              performances={props.livePerformances}
              handleNextClick={props.handleNextClick}
              handlePrevClick={props.handlePrevClick}
              toggleActiveState={props.toggleActiveState}
              userInfo={props.userInfo}
              onShare={props.onShare}
            />
          )}
          {props.comingPerformances.length > 0 && (
            <PerformanceGallery
              performances={props.comingPerformances}
              handleNextClick={props.handleNextClick}
              handlePrevClick={props.handlePrevClick}
              toggleActiveState={props.toggleActiveState}
              userInfo={props.userInfo}
              onShare={props.onShare}
            />
          )}
          {props.type != 'otherProfile' &&
            props.draftPerformances.length > 0 && (
              <PerformanceGallery
                performances={props.draftPerformances}
                handleNextClick={props.handleNextClick}
                handlePrevClick={props.handlePrevClick}
                toggleActiveState={props.toggleActiveState}
                deletePerformance={props.deletePerformance}
                userInfo={props.userInfo}
                onShare={props.onShare}
              />
            )}
          {props.pastPerformances.length > 0 && (
            <PerformanceGallery
              performances={props.pastPerformances}
              handleNextClick={props.handleNextClick}
              handlePrevClick={props.handlePrevClick}
              toggleActiveState={props.toggleActiveState}
              userInfo={props.userInfo}
              onShare={props.onShare}
            />
          )}
        </>
      )}
    </>
  );
};

PerformanceInfo.propTypes = {
  livePerformances: PropTypes.array,
  comingPerformances: PropTypes.array,
  pastPerformances: PropTypes.array,
  draftPerformances: PropTypes.array,
  getPerformances: PropTypes.func,
  handleNextClick: PropTypes.func,
  handlePrevClick: PropTypes.func,
  toggleActiveState: PropTypes.func,
  deletePerformance: PropTypes.func,
  onShare: PropTypes.func,
  userInfo: PropTypes.object,
};

export default memo(PerformanceInfo);
