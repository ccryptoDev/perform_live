/**
 *
 * Home container
 *
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useApi } from 'app/hooks/api';
import { useHistory } from 'react-router';
import _get from 'lodash/get';
import { PERFORMANCE_STATUS } from 'app/app.constants.json';
import { getPerformanceList, resetPerformanceData } from './state/home.actions';
import reducer from './state/home.reducer';
import saga from './state/home.saga';
import { injectReducer, injectSaga } from './home.dependencies';
import './home.scss';
import {
  getServerCurrentTime,
  getUserInfo,
  openPerformReport,
} from '../../state/app.actions';
import AuthService from '../../utils/authService';
import {
  PerformanceFullView,
  PerformanceSliderView,
  NotificationPopup,
} from './components';
import { HomeConstants } from './home.constants';
import RegisterForPaidPerformanceModal from '../../composed-components/RegisterForPaidPerformanceModal';
import plToast from '../../utils/toast';
import PerformancePreviewPopup from '../../components/PerformancePreviewPopup';
import ReportDialog from '../../components/Block/Common/ReportDialog';
import SocialShareModal from '../../components/SociaShareModal/SocialShareModal';
import { getPastShareLink } from '../../utils/share';

export const Home = props => {
  AuthService.user = props.userInfo;
  const dispatch = useDispatch();
  const clickReportCard = useSelector(state => state.global.openPerformReport);
  const [activeState, setActiveState] = useState('home');
  const [registerForpaidPerformance, setRegisterForpaidPerformance] = useState(
    null,
  );
  const [sharePerformance, setSharePerformance] = useState(null);

  const history = useHistory();
  const [clickedPerfomanceData, setClickedPerfomanceData] = useState(null);
  const { getPerformerPerformanceRegister } = useApi('performer');
  const { data: performancesWithAccess } = useQuery(
    'performancesWithAccess',
    getPerformerPerformanceRegister,
  );

  const paginationInfo = useRef({
    [PERFORMANCE_STATUS.LIVE]: {
      currentPage: 0,
    },
    [PERFORMANCE_STATUS.PUBLISHED]: {
      currentPage: 0,
    },
    [PERFORMANCE_STATUS.PAST]: {
      currentPage: 0,
    },
  });

  const activeStateRef = useRef('home');

  const getPerformanceRequestPayload = state => {
    let order = 'ASC';
    if (state === 'past') {
      order = 'DESC';
    }
    return {
      paramsToReplace: { state },
      queryParams: {
        page: paginationInfo.current[state].currentPage,
        size:
          activeState === 'home'
            ? HomeConstants.SLIDE_VIEW_PAGE_SIZE
            : HomeConstants.FULL_VIEW_PAGE_SIZE,
        order,
        performer: true,
      },
    };
  };

  useEffect(() => {
    props.resetPerformanceData();
    if (!props.userInfo.userId && props.userInfo.accessToken) {
      props.getUserInfo();
    }

    getPerformanceData();
    // get current server time
    props.getServerCurrentTime();
    return () => {
      if (window.perform) {
        window.perform.leaveRTC();
      }
      window.perform = null;
      props.resetPerformanceData();
      //   document.removeEventListener('scroll', trackScrolling);
    };
  }, []);

  useEffect(
    () => {
      if (activeState !== 'home') {
        // reset the data of that type
        props.resetPerformanceData({ performanceType: activeState });
        // fetch performanceData
        getPerformanceData(activeState);
      }

      document.addEventListener('scroll', trackScrolling, { passive: true });
    },
    [activeState],
  );

  const getPerformanceData = (state = null) => {
    if (!state) {
      props.getPerformanceList(
        getPerformanceRequestPayload(PERFORMANCE_STATUS.LIVE),
      );
      props.getPerformanceList(
        getPerformanceRequestPayload(PERFORMANCE_STATUS.PUBLISHED),
      );
      props.getPerformanceList(
        getPerformanceRequestPayload(PERFORMANCE_STATUS.PAST),
      );
    } else {
      props.getPerformanceList(getPerformanceRequestPayload(state));
    }
  };

  const toggleToFullView = type => {
    setActiveState(type);
    activeStateRef.current = type;
    // let dataTypeKey = 'pastData';
    // if (type === 'live') {
    //   dataTypeKey = 'liveData';
    // } else if (type === 'published') {
    //   dataTypeKey = 'publishedData';
    // }

    paginationInfo.current[type].currentPage = 0;
  };

  const toggleToSliderView = () => {
    setActiveState('home');
    activeStateRef.current = 'home';
    paginationInfo.current.live.currentPage = 0;
    paginationInfo.current.published.currentPage = 0;
    paginationInfo.current.past.currentPage = 0;
  };

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('on-home');
    document.addEventListener('scroll', trackScrolling, { passive: true });
    return () => {
      body.classList.remove('on-home');
      document.removeEventListener('scroll', trackScrolling);
    };
  });

  const handleNextClick = state => {
    paginationInfo.current[state].currentPage += 1;
    const isAllowedToFech = checkNextPageCall(
      state,
      activeState === 'home'
        ? HomeConstants.SLIDE_VIEW_PAGE_SIZE
        : HomeConstants.FULL_VIEW_PAGE_SIZE,
    );
    if (isAllowedToFech) {
      getPerformanceData(state);
    } else {
      paginationInfo.current[state].currentPage -= 1;
    }
  };

  const handlePrevClick = state => {
    if (paginationInfo.current[state].currentPage > 0)
      paginationInfo.current[state].currentPage -= 1;
    // props.getPerformanceList(getPerformanceRequestPayload(state));
  };

  const checkNextPageCall = (state, pageSize) => {
    if (state === 'live') {
      return (
        props.liveData.length ===
        pageSize * paginationInfo.current[state].currentPage
      );
    }
    if (state === 'published') {
      return (
        props.publishedData.length ===
        pageSize * paginationInfo.current[state].currentPage
      );
    }
    if (state === 'past') {
      return (
        props.pastData.length ===
        pageSize * paginationInfo.current[state].currentPage
      );
    }
    return false;
  };

  const trackScrolling = () => {
    const wrappedElement = document.getElementById('home-container');
    if (isBottom(wrappedElement) && activeStateRef.current !== 'home') {
      handleNextClick(activeStateRef.current);
    }
  };

  const handleClosePaidPerformanceModal = () => {
    setRegisterForpaidPerformance(null);
  };

  const isBottom = el =>
    el.getBoundingClientRect().bottom <= window.innerHeight;

  const liveDataWithPaid = useMemo(
    () =>
      props.liveData.map(performance => {
        const isPaid = !!(performancesWithAccess || []).find(
          pwa => pwa.id === performance.id,
        );
        return { ...performance, isPaid };
      }),
    [props.liveData, performancesWithAccess],
  );

  const publishedDataWithPaid = useMemo(
    () =>
      props.publishedData.map(performance => {
        const isPaid = !!(performancesWithAccess || []).find(
          pwa => pwa.id === performance.id,
        );
        return { ...performance, isPaid };
      }),
    [props.publishedData, performancesWithAccess],
  );

  const { postPerformerPerformanceIdIdRegister } = useApi('performer');
  const registerToFreePerformance = useMutation(
    postPerformerPerformanceIdIdRegister,
  );

  const handleJoin = performanceData => {
    const { participationPaid, isPaid } = performanceData;

    if (!participationPaid || isPaid) {
      history.push(
        `/performlive/${performanceData.id}/performer/${
          performanceData.performer.id
        }`,
      );
    } else {
      setRegisterForpaidPerformance(performanceData);
    }
  };

  const handleRegister = performanceData => {
    if (!props.userInfo.accessToken) {
      history.push('/login');
      return;
    }
    const { participationPaid, registeredByMe, id } = performanceData;
    if (registeredByMe) return;
    if (!participationPaid) {
      registerToFreePerformance.mutate(id, {
        onSuccess: () => {
          getPerformanceData();
        },
        onError: res => plToast.error(res.data.message),
      });
    } else {
      setRegisterForpaidPerformance(performanceData);
    }
  };
  const closeDialog = () => {
    const data = {
      state: '',
      data: {},
    };
    dispatch(openPerformReport(data));
  };

  const share = sharePerformance && {
    url: getPastShareLink(
      sharePerformance.id,
      sharePerformance.performer.id,
      sharePerformance.state,
    ),
    title: `Check out my Live on PerformLive! Join me on PerformLive!`,
    hashtags: [
      'performlive',
      'iperformwithPL',
      'streamingonPL',
      'createandperform',
      'performlivePL',
      'performlivetalent',
    ],
  };
  return (
    <>
      <div
        className="home-container"
        id="home-container"
        onScroll={trackScrolling}
      >
        {activeState === 'home' && (
          <>
            {!!props.liveData.length && (
              <PerformanceSliderView
                performanceType={PERFORMANCE_STATUS.LIVE}
                performanceData={liveDataWithPaid}
                toggleToFullView={toggleToFullView}
                headerText={{ bold: 'Live', light: 'now' }}
                onNextClick={handleNextClick}
                onPrevClick={handlePrevClick}
                handleJoin={handleJoin}
                onShare={setSharePerformance}
              />
            )}
            {!!props.publishedData.length && (
              <PerformanceSliderView
                performanceType={PERFORMANCE_STATUS.PUBLISHED}
                performanceData={publishedDataWithPaid}
                toggleToFullView={toggleToFullView}
                headerText={{ bold: 'Coming', light: 'soon' }}
                onNextClick={handleNextClick}
                onPrevClick={handlePrevClick}
                handleRegister={handleRegister}
                onShare={setSharePerformance}
                handleCardClick={setClickedPerfomanceData}
              />
            )}
            {!!props.pastData.length && (
              <PerformanceSliderView
                performanceType={PERFORMANCE_STATUS.PAST}
                performanceData={props.pastData}
                toggleToFullView={toggleToFullView}
                headerText={{ bold: 'Past', light: 'popular' }}
                onNextClick={handleNextClick}
                onPrevClick={handlePrevClick}
                onShare={setSharePerformance}
              />
            )}
          </>
        )}

        {activeState === PERFORMANCE_STATUS.LIVE && (
          <PerformanceFullView
            performanceData={props.liveData}
            performanceType={PERFORMANCE_STATUS.LIVE}
            toggleToSliderView={toggleToSliderView}
          />
        )}
        {activeState === PERFORMANCE_STATUS.PUBLISHED && (
          <PerformanceFullView
            performanceData={props.publishedData}
            performanceType={PERFORMANCE_STATUS.PUBLISHED}
            toggleToSliderView={toggleToSliderView}
          />
        )}

        {activeState === PERFORMANCE_STATUS.PAST && (
          <PerformanceFullView
            performanceData={props.pastData}
            performanceType={PERFORMANCE_STATUS.PAST}
            toggleToSliderView={toggleToSliderView}
          />
        )}
        {/* {<RemovedFromPerformance />} */}

        {registerForpaidPerformance && (
          <RegisterForPaidPerformanceModal
            performance={registerForpaidPerformance}
            onClose={handleClosePaidPerformanceModal}
          />
        )}
        <NotificationPopup />
      </div>
      <div className="">
        {clickReportCard &&
          clickReportCard.state === 'opened' && (
            <ReportDialog
              heading="Report"
              performance
              userInfo={clickReportCard.data.performerId}
              performInfo={clickReportCard.data.performanceId}
              confirmCallBack={closeDialog}
              cancelCallBack={closeDialog}
            />
          )}
      </div>
      {clickedPerfomanceData && (
        <PerformancePreviewPopup
          performanceData={clickedPerfomanceData}
          onClose={() => setClickedPerfomanceData(null)}
        />
      )}
      {sharePerformance && (
        <SocialShareModal
          onClose={() => setSharePerformance(null)}
          title="Share to"
          subtitle="Share this Performance with your friends!"
          share={share}
        />
      )}
    </>
  );
};

Home.propTypes = {
  getPerformanceList: PropTypes.func,
  getUserInfo: PropTypes.func,
  userInfo: PropTypes.object,
  resetPerformanceData: PropTypes.func,
  liveData: PropTypes.array,
  publishedData: PropTypes.array,
  pastData: PropTypes.array,
  getServerCurrentTime: PropTypes.func,
  clickedCardInfo: PropTypes.object,
};

const mapStateToProps = state => ({
  performanceData: _get(state.home, 'performanceData', []),
  liveData: _get(state.home, 'live', []),
  publishedData: _get(state.home, 'published', []),
  pastData: _get(state.home, 'past', []),
  userInfo: _get(state.global, 'userInfo', {}),
  clickedCardInfo: _get(state.home, 'clickedCardInfo', null),
});

const mapDispatchToProps = dispatch => ({
  getPerformanceList: payload => dispatch(getPerformanceList(payload)),
  getUserInfo: payload => dispatch(getUserInfo(payload)),
  resetPerformanceData: payload => dispatch(resetPerformanceData(payload)),
  getServerCurrentTime: payload => dispatch(getServerCurrentTime(payload)),
});

const withReducer = injectReducer({
  key: 'home',
  reducer,
  blacklist: ['live', 'published', 'past', 'clickedCardInfo'],
});
const withSaga = injectSaga({ key: 'home', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Home);
