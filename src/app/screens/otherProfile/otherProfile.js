import React, { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';
import _get from 'lodash/get';
import reducer from './state/otherProfile.reducer';
import saga from './state/otherProfile.saga';
import {
  injectReducer,
  injectSaga,
} from '../../components/Profile/profile.dependencies';
import {
  getFollowerCount,
  getFollowingCount,
  getPerformanceCount,
  getOnePerformances,
  resetPerformances,
  getFirstPerformances,
  getFollowings,
  getFollowers,
  getOtherUserInfo,
} from './state/otherProfile.actions';
import { updateFollowUnfollow } from '../../state/app.actions';
import AppConstants from 'app/app.constants.json';
import { ProfileConstants } from '../../components/Profile/profile.constants';
import '../../components/Profile/profile.scss';
import PerformanceInfo from '../profile/components/performance';
import Followers from '../profile/components/followers';
import Following from '../profile/components/following';
import ProfileInfo from '../profile/components/profileInfo';
import PerformanceFullView from '../profile/components/performanceFullView';
import { checkUrl, useQuery as useLocationQuery } from '../../utils/common';

const OtherProfile = props => {
  const query = useLocationQuery(window.location.search);
  const userId = query.get('id');
  const generalState = {
    paramsToReplace: { id: userId },
  };

  const [tab, setTab] = useState(0);
  const [activeState, setActiveState] = useState('all');
  const [userInfo, setUserInfo] = useState(props.userInfo);
  const [followStatus, setFollowStatus] = useState(props.performarFollowStatus);

  const paginationInfo = useRef({
    [AppConstants.PERFORMANCE_STATUS.LIVE]: {
      currentPage: 0,
    },
    [AppConstants.PERFORMANCE_STATUS.PUBLISHED]: {
      currentPage: 0,
    },
    [AppConstants.PERFORMANCE_STATUS.PAST]: {
      currentPage: 0,
    },
    [AppConstants.PERFORMANCE_STATUS.DRAFT]: {
      currentPage: 0,
    },
  });

  const getPerformanceRequestPayload = state => {
    let order = 'ASC';
    if (state === 'past') {
      order = 'DESC';
    }
    return {
      paramsToReplace: { id: userId, state },
      queryParams: {
        page: paginationInfo.current[state].currentPage,
        size:
          activeState === 'all'
            ? ProfileConstants.SLIDE_VIEW_PAGE_SIZE
            : ProfileConstants.FULL_VIEW_PAGE_SIZE,
        order: order,
      },
    };
  };

  useEffect(() => {
    props.getFirstPerformances(
      getPerformanceRequestPayload(AppConstants.PERFORMANCE_STATUS.LIVE),
    );
    props.getFirstPerformances(
      getPerformanceRequestPayload(AppConstants.PERFORMANCE_STATUS.PAST),
    );
    props.getFirstPerformances(
      getPerformanceRequestPayload(AppConstants.PERFORMANCE_STATUS.PUBLISHED),
    );
    props.getFollowerCount(generalState);
    props.getFollowingCount(generalState);
    props.getPerformanceCount(generalState);
    props.getFollowers(generalState);
    props.getFollowings(generalState);
    props.getOtherUserInfo(generalState);
    props.updateFollowUnfollow({
      paramsToReplace: { id: userId },
      method: 'GET',
    });
  }, []);

  const trackScrolling = () => {
    const wrappedElement = document.getElementById('profile-page');
    if (isBottom(wrappedElement) && activeState !== 'all') {
      handleNextClick(activeState);
    }
  };

  const isBottom = el => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  useEffect(
    () => {
      if (activeState !== 'all') {
        props.resetPerformances(activeState);
        props.getFirstPerformances(getPerformanceRequestPayload(activeState));
      }
    },
    [activeState],
  );

  useEffect(
    () => {
      if (activeState !== 'all') {
        document.addEventListener('scroll', trackScrolling, { passive: true });
      }
      return () => {
        document.removeEventListener('scroll', trackScrolling);
      };
    },
    [activeState, trackScrolling],
  );

  const toggleToSliderView = () => {
    setActiveState('all');
    paginationInfo.current.live.currentPage = 0;
    paginationInfo.current.published.currentPage = 0;
    paginationInfo.current.past.currentPage = 0;
    paginationInfo.current.draft.currentPage = 0;
  };

  const toggleActiveState = type => {
    setActiveState(type);
    paginationInfo.current[type].currentPage = 0;
  };

  const handleNextClick = state => {
    paginationInfo.current[state].currentPage += 1;
    const isAllowedToFech = checkNextPageCall(
      state,
      activeState === 'all'
        ? ProfileConstants.SLIDE_VIEW_PAGE_SIZE
        : ProfileConstants.FULL_VIEW_PAGE_SIZE,
    );
    if (isAllowedToFech) {
      props.getPerformances(getPerformanceRequestPayload(state));
    } else {
      paginationInfo.current[state].currentPage -= 1;
    }
  };

  const handlePrevClick = state => {
    if (paginationInfo.current[state].currentPage > 0)
      paginationInfo.current[state].currentPage -= 1;
  };

  const checkNextPageCall = (state, pageSize) => {
    if (state === AppConstants.PERFORMANCE_STATUS.LIVE) {
      return (
        props.livePerformances.length ===
        pageSize * paginationInfo.current[state].currentPage
      );
    }
    if (state === AppConstants.PERFORMANCE_STATUS.PUBLISHED) {
      return (
        props.comingPerformances.length ===
        pageSize * paginationInfo.current[state].currentPage
      );
    }
    if (state === AppConstants.PERFORMANCE_STATUS.PAST) {
      return (
        props.pastPerformances.length ===
        pageSize * paginationInfo.current[state].currentPage
      );
    }

    return false;
  };

  useEffect(
    () => {
      setUserInfo(props.userOtherInfo);
    },
    [props.userOtherInfo],
  );

  useEffect(
    () => {
      setFollowStatus(props.performarFollowStatus);
    },
    [props.performarFollowStatus],
  );

  const handleFollow = async status => {
    await props.updateFollowUnfollow({
      paramsToReplace: { id: userId },
      method: 'POST',
    });
    await props.getFollowerCount(generalState);
    await props.getFollowingCount(generalState);
    setFollowStatus(status);
  };

  const [followerCount, setFollowerCount] = useState(props.followerCount);
  const [followingCount, setFollowingCount] = useState(props.followingCount);

  useEffect(
    () => {
      setFollowerCount(props.followerCount);
      setFollowingCount(props.followingCount);
    },
    [props.followerCount, props.followingCount],
  );

  return (
    <div className="profile-page" id="profile-page">
      {activeState === 'all' ? (
        <div className="profile-container">
          <h3>Profile</h3>
          <ProfileInfo
            userInfo={userInfo}
            type="otherProfile"
            handleFollow={handleFollow}
            followStatus={followStatus}
          />
          <div className="tabs mt-40">
            <div
              className={tab == 0 ? 'performance active' : 'performance'}
              onClick={() => setTab(0)}
            >
              <span>{props.performanceCount}</span> Performances
            </div>
            <div
              className={tab == 1 ? 'followers active' : 'followers'}
              onClick={() => setTab(1)}
            >
              <span>{followerCount}</span> Followers
            </div>
            <div
              className={tab == 2 ? 'following active' : 'following'}
              onClick={() => setTab(2)}
            >
              <span>{followingCount}</span> Following
            </div>
          </div>
          {tab == 0 ? (
            <PerformanceInfo
              getPerformances={props.getPerformances}
              livePerformances={props.livePerformances}
              pastPerformances={props.pastPerformances}
              comingPerformances={props.comingPerformances}
              toggleActiveState={toggleActiveState}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              userInfo={userInfo}
              type="otherProfile"
            />
          ) : null}
          {tab == 1 && (
            <Followers
              toggleFollowById={id => {
                props.toggleFollow(id);
              }}
              followers={props.followers}
              getFollowers={() => {
                props.getFollowers(generalState);
              }}
              type="otherProfile"
              performerId={userId}
            />
          )}
          {tab == 2 && (
            <Following
              followings={props.followings}
              getFollowings={() => {
                props.getFollowings(generalState);
              }}
              type="otherProfile"
              performerId={userId}
            />
          )}
        </div>
      ) : (
        <PerformanceFullView
          performanceData={
            activeState === AppConstants.PERFORMANCE_STATUS.LIVE
              ? props.livePerformances
              : activeState === AppConstants.PERFORMANCE_STATUS.PAST
                ? props.pastPerformances
                : props.comingPerformances
          }
          performanceType={activeState}
          toggleToSliderView={toggleToSliderView}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          userInfo={userInfo}
          deletePerformance={props.deletePerformance}
        />
      )}
    </div>
  );
};

OtherProfile.propTypes = {
  userInfo: PropTypes.object,
  livePerformances: PropTypes.array,
  comingPerformances: PropTypes.array,
  pastPerformances: PropTypes.array,
  performanceCount: PropTypes.number,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,
  followings: PropTypes.array,
  getFollowings: PropTypes.func,
  followers: PropTypes.array,
  getFollowers: PropTypes.func,
};

const mapStateToProps = state => ({
  userInfo: _get(state.global, 'userInfo', {}),
  performarFollowStatus: _get(state.global, 'performarFollowStatus', {}),
  userOtherInfo: _get(state.profile, 'userOtherInfo', {}),
  livePerformances: _get(state.profile, 'live', []),
  comingPerformances: _get(state.profile, 'published', []),
  pastPerformances: _get(state.profile, 'past', []),
  followers: _get(state.profile, 'followers', []),
  followings: _get(state.profile, 'followings', []),
  followerCount: _get(state.profile, 'followerCount', 0),
  followingCount: _get(state.profile, 'followingCount', 0),
  performanceCount: _get(state.profile, 'performanceCount', 0),
});

const mapDispatchToProps = dispatch => ({
  getPerformanceCount: payload => dispatch(getPerformanceCount(payload)),
  getFollowerCount: payload => dispatch(getFollowerCount(payload)),
  getFollowingCount: payload => dispatch(getFollowingCount(payload)),
  getPerformances: payload => dispatch(getOnePerformances(payload)),
  getFirstPerformances: payload => dispatch(getFirstPerformances(payload)),
  resetPerformances: payload => dispatch(resetPerformances(payload)),
  getFollowers: payload => dispatch(getFollowers(payload)),
  getFollowings: payload => dispatch(getFollowings(payload)),
  getOtherUserInfo: payload => dispatch(getOtherUserInfo(payload)),
  updateFollowUnfollow: payload => dispatch(updateFollowUnfollow(payload)),
});

const withReducer = injectReducer({
  key: 'profile',
  reducer,
});

const withSaga = injectSaga({ key: 'profile', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OtherProfile);
