import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import NoPerformance from './performance/NoPerformance';
import PerformanceGallery from './performance/PerformanceGallery';

const PerformanceInfo = props => {
  const {
    livePerformances,
    pastPerformances,
    comingPerformances,
    draftPerformances,
    deletePerformance,
    handleNextClick,
    handlePrevClick,
    toggleActiveState,
    userInfo,
  } = props;
  return (
    <>
      {livePerformances.length === 0 &&
      pastPerformances.length === 0 &&
      comingPerformances.length === 0 &&
      draftPerformances.length === 0 ? (
        <NoPerformance />
      ) : (
        <>
          {livePerformances.length > 0 && (
            <PerformanceGallery
              performances={livePerformances}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              toggleActiveState={toggleActiveState}
              userInfo={userInfo}
            />
          )}
          {comingPerformances.length > 0 && (
            <PerformanceGallery
              performances={comingPerformances}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              toggleActiveState={toggleActiveState}
              userInfo={userInfo}
            />
          )}
          {draftPerformances.length > 0 && (
            <PerformanceGallery
              performances={draftPerformances}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              toggleActiveState={toggleActiveState}
              deletePerformance={deletePerformance}
              userInfo={userInfo}
            />
          )}
          {pastPerformances.length > 0 && (
            <PerformanceGallery
              performances={pastPerformances}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              toggleActiveState={toggleActiveState}
              userInfo={userInfo}
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
  userInfo: PropTypes.object,
};

export default memo(PerformanceInfo);
