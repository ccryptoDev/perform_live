import React, { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import reducer from './state/profile.reducer';
import saga from './state/profile.saga';
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
  deletePerformance,
  getFollowings,
  toggleFollow,
  getFollowers,
  uploadAvatar,
} from './state/profile.actions';
import { updatePerformer } from '../../../app/state/app.actions';
import { useDispatch, useSelector } from 'react-redux';
import AppConstants from 'app/app.constants.json';
import { ProfileConstants } from '../../components/Profile/profile.constants';
import '../../components/Profile/profile.scss';
import PerformanceInfo from './components/performance';
import Followers from './components/followers';
import Following from './components/following';
import ProfileInfo from './components/profileInfo';
import PerformanceFullView from './components/performanceFullView';
import DeleteModal from './components/DeleteModal/DeleteModal';
import EditModal from './components/EditModal/EditModal';
import UploadAvatarModal from './components/UploadAvatarModal/UploadAvatarModal';
import VerifyEmailCodeModal from '../signup/components/VerifyEmailCodeModal';
import VerifyPhoneCodeModal from '../signup/components/VerifyPhoneCodeModal';
import { getPastShareLink } from '../../utils/share';

// api services
import { useApi } from '../../hooks/api';
import SocialShareModal from '../../components/SociaShareModal/SocialShareModal';

const Profile = props => {
  // const {foo} = props.location.state;
  const dispatch = useDispatch();
  const { postPerformerEmail, postPerformerPhone } = useApi('performer');

  const { postEmailVerify, postPhoneVerify } = useApi('email');

  const [tab, setTab] = useState(0);
  const [activeState, setActiveState] = useState('all');
  const [userInfo, setUserInfo] = useState(props.userInfo);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showUploadAvatarModal, setShowUploadAvatarModal] = useState(false);
  const [deletePerformanceId, setDeletePerformanceId] = useState(null);
  const [showVerifyEmail, setShowVerifyEmail] = useState(null);
  const [showVerifyPhone, setShowVerifyPhone] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [convertImageUrl, setConvertImageUrl] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerfieid] = useState(false);

  const [errorCodeMessage, setErrorCodeMessage] = useState(null);
  const [errorPhoneCode, setErrorPhoneCode] = useState(null);

  useEffect(
    () => {
      setEmailVerified(userInfo.emailVerified);
    },
    [userInfo.emailVerified],
  );
  useEffect(
    () => {
      setPhoneVerfieid(userInfo.phoneVerified);
    },
    [userInfo.phoneVerified],
  );

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
    if (state === 'past' || state == 'draft') {
      order = 'DESC';
    }
    return {
      paramsToReplace: { state },
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
    props.getFirstPerformances(
      getPerformanceRequestPayload(AppConstants.PERFORMANCE_STATUS.DRAFT),
    );
    props.getFollowerCount();
    props.getFollowingCount();
    props.getPerformanceCount();
    props.getFollowers();
    props.getFollowings();
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

    if (state === AppConstants.PERFORMANCE_STATUS.DRAFT) {
      return (
        props.draftPerformances.length ===
        pageSize * paginationInfo.current[state].currentPage
      );
    }
    return false;
  };

  const handleDeletePerform = id => {
    setShowDeleteModal(true);
    setDeletePerformanceId(id);
  };

  const handleDeletePerformance = () => {
    if (props.deletePerformance && deletePerformanceId) {
      props.deletePerformance(deletePerformanceId);
    }
    setShowDeleteModal(false);
  };

  const handleShowEditProfile = () => {
    setShowEditProfileModal(true);
  };

  const handleEditProfile = async payload => {
    try {
      dispatch(updatePerformer(payload));

      setShowEditProfileModal(false);
    } catch (error) {
      console.log('error during confirm edit: ', error);
    }
  };

  const handleUploadAvatar = () => setShowUploadAvatarModal(true);

  const handleCancelUploadAvatar = () => {
    setShowUploadAvatarModal(false);
    setShowEditProfileModal(true);
  };

  const handleVerifyEmail = async email => {
    setErrorCodeMessage(null);
    setEmailVerified(!emailVerified);
    try {
      const result = await postPerformerEmail({ email });
      if (result.success) {
        setShowVerifyEmail(email);
      }
    } catch (error) {
      console.log('error during get the verify code: ', error.message);
    }
  };

  const verifyEmailWithCode = async code => {
    try {
      const result = await postEmailVerify({ code });
      if (result.success) {
        let payload = {
          email: showVerifyEmail,
          emailVerified: true,
        };
        dispatch(updatePerformer(payload));
        setShowVerifyEmail(null);
        setEmailVerified(true);
      }
    } catch (error) {
      setErrorCodeMessage('Please enter a valid code');
      console.log('error during confirm the code: ', error);
    }
  };

  const handleVerifyPhone = async phone => {
    setErrorPhoneCode(null);
    setPhoneVerfieid(!phoneVerified);
    try {
      const result = await postPerformerPhone({ phone });
      if (result.success) {
        setShowVerifyPhone(phone);
      }
    } catch (error) {
      console.log('error during get the verify code: ', error);
    }
  };

  const verifyPhoneWithCode = async code => {
    try {
      const result = await postPhoneVerify({ code });
      if (result.success) {
        let payload = {
          phone: showVerifyPhone,
          phoneVerified: true,
        };
        dispatch(updatePerformer(payload));
        setShowVerifyPhone(null);
        setPhoneVerfieid(true);
      }
    } catch (error) {
      setErrorPhoneCode('Please enter a valid code');
      console.log('error during confirm the code: ', result.message);
    }
  };

  const urlToBlob = url => {
    if (!url) setConvertImageUrl(null);
    else {
      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          let avatarUrl = URL.createObjectURL(blob);
          setConvertImageUrl(avatarUrl);
        });
    }
  };

  useEffect(
    () => {
      urlToBlob(userInfo.imageUrl);
    },
    [userInfo.imageUrl],
  );

  const handleUpload = () => {
    console.log('upload here!!!');
  };

  useEffect(
    () => {
      setUserInfo(props.userInfo);
    },
    [props.userInfo],
  );

  useEffect(
    () => {
      const handleOpenEditDialog = props.location.state;
      if (handleOpenEditDialog) {
        setShowEditProfileModal(true);
      }
    },
    [props.location.state],
  );

  const [sharePerformance, setSharePerformance] = useState(null);
  const onShare = (performance, performer) => {
    const share = {
      url: getPastShareLink(
        performance.id,
        performer.id,
        performance.state
      ),
      title:  `Check out my Live on PerformLive! Join me on PerformLive!`,
      hashtags: [
        'performlive',
        'iperformwithPL',
        'streamingonPL',
        'createandperform',
        'performlivePL',
        'performlivetalent',
      ],
    }
    setSharePerformance(share);
  }
  return (
    <div className="profile-page" id="profile-page">
      {activeState === 'all' ? (
        <div className="profile-container">
          <h3>Profile</h3>
          <ProfileInfo
            userInfo={userInfo}
            type="myProfile"
            handleEditProfile={handleShowEditProfile}
            type="myProfile"
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
              <span>{props.followers.length}</span> Followers
            </div>
            <div
              className={tab == 2 ? 'following active' : 'following'}
              onClick={() => setTab(2)}
            >
              <span>{props.followings.length}</span> Following
            </div>
          </div>
          {tab == 0 ? (
            <PerformanceInfo
              getPerformances={props.getPerformances}
              livePerformances={props.livePerformances}
              pastPerformances={props.pastPerformances}
              comingPerformances={props.comingPerformances}
              draftPerformances={props.draftPerformances}
              toggleActiveState={toggleActiveState}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              deletePerformance={handleDeletePerform}
              userInfo={userInfo}
              type="myProfile"
              onShare={onShare}
            />
          ) : null}
          {tab == 1 && (
            <Followers
              toggleFollowById={id => {
                props.toggleFollow(id);
              }}
              followers={props.followers}
              getFollowers={props.getFollowers}
              type="myProfile"
            />
          )}
          {tab == 2 && (
            <Following
              followings={props.followings}
              getFollowings={props.getFollowings}
              toggleFollowById={id => {
                props.toggleFollow(id);
              }}
              type="myProfile"
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
                : activeState === AppConstants.PERFORMANCE_STATUS.DRAFT
                  ? props.draftPerformances
                  : props.comingPerformances
          }
          performanceType={activeState}
          toggleToSliderView={toggleToSliderView}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          userInfo={userInfo}
          deletePerformance={handleDeletePerform}
          onShare={onShare}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          heading="Delete Performance?"
          description="This performance will be deleted with no possibility to restore it."
          confirmCallBack={handleDeletePerformance}
          cancelCallBack={() => setShowDeleteModal(false)}
          confirmText="DELETE"
          cancelText="KEEP"
        />
      )}
      {showEditProfileModal && (
        <EditModal
          heading="Edit Profile"
          userInfo={userInfo}
          confirmCallBack={handleEditProfile}
          cancelCallBack={() => setShowEditProfileModal(false)}
          uploadAvatar={handleUploadAvatar}
          verifyEmail={handleVerifyEmail}
          verifyPhone={handleVerifyPhone}
          emailVerified={emailVerified}
          phoneVerified={phoneVerified}
          selectedAvatar={selectedAvatar}
          confirmText="SAVE"
          cancelText="CANCEL"
        />
      )}
      {showUploadAvatarModal && (
        <UploadAvatarModal
          heading="Update profile photo"
          imageUrl={convertImageUrl}
          confirmCallBack={handleUpload}
          cancelCallBack={handleCancelUploadAvatar}
          onChange={url => {
            setSelectedAvatar(url);
            let payload = {
              imageUrl: url,
            };
            dispatch(updatePerformer(payload));
            setShowUploadAvatarModal(false);
          }}
          confirmText="SAVE"
          cancelText="CANCEL"
        />
      )}
      {sharePerformance && <SocialShareModal 
        onClose={() => setSharePerformance(null)}
        title="Share to"
        subtitle="Share this Performance with your friends!"
        share={sharePerformance}
      />}
      <VerifyEmailCodeModal
        email={showVerifyEmail}
        show={Boolean(showVerifyEmail)}
        Hide={() => setShowVerifyEmail(null)}
        resend={() => handleVerifyEmail(showVerifyEmail)}
        verifyEmailCode={verifyEmailWithCode}
        errorMessage={errorCodeMessage}
      />

      <VerifyPhoneCodeModal
        phone={showVerifyPhone}
        show={Boolean(showVerifyPhone)}
        Hide={() => setShowVerifyPhone(null)}
        resend={() => handleVerifyPhone(showVerifyPhone)}
        verifyPhoneCode={verifyPhoneWithCode}
        errorMessage={errorPhoneCode}
      />
    </div>
  );
};

Profile.propTypes = {
  userInfo: PropTypes.object,
  livePerformances: PropTypes.array,
  comingPerformances: PropTypes.array,
  pastPerformances: PropTypes.array,
  draftPerformances: PropTypes.array,
  performanceCount: PropTypes.number,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,
  deletePerformance: PropTypes.func,
  followings: PropTypes.array,
  getFollowings: PropTypes.func,
  followers: PropTypes.array,
  getFollowers: PropTypes.func,
  toggleFollow: PropTypes.func,
};

const mapStateToProps = state => ({
  userInfo: _get(state.global, 'userInfo', {}),
  livePerformances: _get(state.profile, 'live', []),
  comingPerformances: _get(state.profile, 'published', []),
  pastPerformances: _get(state.profile, 'past', []),
  draftPerformances: _get(state.profile, 'draft', []),
  followers: _get(state.profile, 'followers', []),
  followings: _get(state.profile, 'followings', []),
  followerCount: _get(state.profile, 'followerCount', 0),
  followingCount: _get(state.profile, 'followingCount', 0),
  performanceCount: _get(state.profile, 'performanceCount', 0),
  avatarUrl: _get(state.profile, 'avatarUrl', {}),
});

const mapDispatchToProps = dispatch => ({
  getPerformanceCount: () => dispatch(getPerformanceCount()),
  getFollowerCount: () => dispatch(getFollowerCount()),
  getFollowingCount: () => dispatch(getFollowingCount()),
  getPerformances: payload => dispatch(getOnePerformances(payload)),
  getFirstPerformances: payload => dispatch(getFirstPerformances(payload)),
  resetPerformances: payload => dispatch(resetPerformances(payload)),
  getFollowers: payload => dispatch(getFollowers(payload)),
  getFollowings: payload => dispatch(getFollowings(payload)),
  toggleFollow: payload => dispatch(toggleFollow(payload)),
  deletePerformance: payload => dispatch(deletePerformance(payload)),
  uploadAvatar: payload => dispatch(uploadAvatar(payload)),
  updatePerformer: payload => dispatch(updatePerformer(payload)),
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
)(Profile);
