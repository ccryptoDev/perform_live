import storage from 'redux-persist/lib/storage'; // default: localStorage if web, AsyncStorage if react-native
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { ActionTypes } from './app.types';

// The initial state of the App
const initialState = {
  performarFollowStatus: false,
  productList: [],
  showPlanModal: false,
  isLoading: false,
  isSideDrawerOpen: false,
  displayCookiesConsent: false,
  categoryList: [],
  userInfo: {
    userId: null,
    accessToken: null,
    socialLoginAccessToken: null,
    createdAt: '',
    firstName: '',
    lastName: '',
    imageUrl: '',
    description: '',
    id: null,
    followCount: 0,
    followerCount: 0,
    performanceCount: 0,
  },
  twitterInfo: { oauthToken: '', oauthTokenSecret: '', oauthVerifier: '' },
  socialUserInfo: {},
  appFilters: {},
  clientList: [],
  homeSideBar: true,
  performanceInfo: {},
  serverCurrentTime: null,
  openPerformReport: {
    state: '',
    data: {},
  }
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_HOME_SIDEBAR_STATE:
      return { ...state, homeSideBar: action.payload };
    case ActionTypes.SET_PERFORMER_PRODUCTS:
      return { ...state, productList: action.payload };
    case ActionTypes.SHOW_PLAN_MODAL:
      return { ...state, showPlanModal: action.payload };
    case ActionTypes.SHOW_LOADER:
      return { ...state, isLoading: true };
    case ActionTypes.SET_APP_FILTERS:
      return { ...state, appFilters: action.payload };
    case ActionTypes.HIDE_LOADER:
      return { ...state, isLoading: false };
    case ActionTypes.SET_USER_TOKEN:
      return {
        ...state,
        userInfo: { ...state.userInfo, accessToken: action.payload },
      };
    case ActionTypes.SET_TMP_USER_TOKEN:
      return {
        ...state,
        userInfo: { ...state.userInfo, tmpToken: action.payload },
      };
    case ActionTypes.OPEN_REPORT_PERFORM:
      return { ...state, openPerformReport: action.payload };
    case ActionTypes.TOGGLE_SIDE_DRAWER:
      return { ...state, isSideDrawerOpen: !state.isSideDrawerOpen };
    // case ActionTypes.SET_AUTH_STATE:
    //   return { ...state, userInfo: userFromServer };
    case ActionTypes.RESET_AUTH_STATE:
      return {
        ...state,
        userInfo: {
          userId: null,
          accessToken: null,
          socialLoginAccessToken: null,
          createdAt: '',
          firstName: '',
          lastName: '',
          imageUrl: '',
          description: '',
        },
      };

    case ActionTypes.SET_CURRENT_SITE:
      return {
        ...state,
        userInfo: { ...state.userInfo, siteId: action.payload },
      };
    case ActionTypes.SET_COOKIE_CONSENT_STATUS:
      return { ...state, displayCookiesConsent: true };
    case ActionTypes.SET_CATEGORY_LIST:
      return { ...state, categoryList: action.payload };
    case ActionTypes.SET_SOCIAL_USER_INFO:
      return { ...state, socialUserInfo: action.payload };
    case ActionTypes.SET_PERFORMANCE_INFO:
      return {
        ...state,
        performanceInfo: { ...state.performanceInfo, ...action.payload },
      };
    case ActionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: { ...state.userInfo, userId: action.payload.id },
      };
    case ActionTypes.UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case ActionTypes.SET_PERFORMER_INFO:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };

    case ActionTypes.SET_TWITTER_REQUEST_TOKEN:
      return {
        ...state,
        twitterInfo: { ...state.twitterInfo, ...action.payload },
      };
    case ActionTypes.SET_SERVER_CURRENT_TIME:
      return {
        ...state,
        serverCurrentTime: action.payload.time,
      };

    case ActionTypes.SET_PERFORMER_FOLLOW_COUNT:
      return {
        ...state,
        serverCurrentTime: action.payload.time,
      };

    case ActionTypes.SET_PERFORMER_FOLLOWER_COUNT:
      return {
        ...state,
        serverCurrentTime: action.payload.time,
      };

    case ActionTypes.SET_PERFORMER_PERFORMANCE_COUNT:
      return {
        ...state,
        serverCurrentTime: action.payload.time,
      };
    case ActionTypes.SET_FOLLOW_UNFOLLOW:
      return {
        ...state,
        performarFollowStatus: action.payload,
      };
    default:
      return state;
  }
}

export default persistReducer(
  {
    key: 'global',
    storage,
    blacklist: [
      'isLoading',
      'isSideDrawerOpen',
      'socialUserInfo',
      'homeSideBar',
      'serverCurrentTime',
      'performarFollowStatus',
      'performanceInfo',
    ],
    stateReconciler: autoMergeLevel2,
  },
  reducer,
);
