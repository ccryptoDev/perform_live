import { ActionTypes } from './app.types';

export const getPerformerFollowCount = payload => ({
  type: ActionTypes.GET_PERFORMER_FOLLOW_COUNT,
  payload,
});

export const setPerformerFollowCount = token => ({
  type: ActionTypes.SET_PERFORMER_FOLLOW_COUNT,
  payload: token,
});

export const getPerformerFollowerCount = payload => ({
  type: ActionTypes.GET_PERFORMER_FOLLOWER_COUNT,
  payload,
});

export const setPerformerFollowerCount = token => ({
  type: ActionTypes.SET_PERFORMER_FOLLOWER_COUNT,
  payload: token,
});

export const getPerformerPerformanceCount = payload => ({
  type: ActionTypes.GET_PERFORMER_PERFORMANCE_COUNT,
  payload,
});

export const setPerformerPerformanceCount = token => ({
  type: ActionTypes.SET_PERFORMER_PERFORMANCE_COUNT,
  payload: token,
});

export const getServerCurrentTime = payload => ({
  type: ActionTypes.GET_SERVER_CURRENT_TIME,
  payload,
});

export const setServerCurrentTime = token => ({
  type: ActionTypes.SET_SERVER_CURRENT_TIME,
  payload: token,
});

export function getTwitterRequestToken(payload) {
  return {
    type: ActionTypes.TWITTER_REQUEST_TOKEN,
    payload,
  };
}

export function setTwitterRequestToken(payload) {
  return {
    type: ActionTypes.SET_TWITTER_REQUEST_TOKEN,
    payload,
  };
}

export function updateFollowUnfollow(payload) {
  return {
    type: ActionTypes.FOLLOW_UNFOLLOW,
    payload,
  };
}

export function setFollowStatus(payload) {
  return {
    type: ActionTypes.SET_FOLLOW_UNFOLLOW,
    payload,
  };
}

export function setHomeSideBarState(payload) {
  return {
    type: ActionTypes.SHOW_HOME_SIDEBAR_STATE,
    payload,
  };
}

export const getUserInfo = payload => ({
  type: ActionTypes.GET_USER_INFO,
  payload,
});

export const setUserInfo = payload => ({
  type: ActionTypes.SET_USER_INFO,
  payload,
});

export const updateUserInfo = payload => ({
  type: ActionTypes.UPDATE_USER_INFO,
  payload,
});

export const getPerformerInfo = payload => ({
  type: ActionTypes.GET_PERFORMER_INFO,
  payload,
});

export const setPerformerInfo = payload => ({
  type: ActionTypes.SET_PERFORMER_INFO,
  payload,
});

export function getPerformerProducts(payload) {
  return {
    type: ActionTypes.GET_PERFORMER_PRODUCTS,
    payload,
  };
}

export function setPerformerProducts(payload) {
  return {
    type: ActionTypes.SET_PERFORMER_PRODUCTS,
    payload,
  };
}

export function showPlanModal(payload) {
  return {
    type: ActionTypes.SHOW_PLAN_MODAL,
    payload,
  };
}

export function getCategoryList(payload) {
  return {
    type: ActionTypes.GET_CATEGORY_LIST,
    payload,
  };
}

export const socialLogin = payload => ({
  type: ActionTypes.SOCIAL_LOGIN,
  payload,
});

export const socialLoginUserInfo = payload => ({
  type: ActionTypes.SOCIAL_LOGIN_USER_INFO,
  payload,
});

export const setSocialLoginUserInfo = payload => ({
  type: ActionTypes.SET_SOCIAL_USER_INFO,
  payload,
});

export const setPerformanceInfo = payload => ({
  type: ActionTypes.SET_PERFORMANCE_INFO,
  payload,
});

export const setCategoryList = payload => ({
  type: ActionTypes.SET_CATEGORY_LIST,
  payload,
});

export const showLoadingSpinner = () => ({
  type: ActionTypes.SHOW_LOADER,
});

export const hideLoadingSpinner = () => ({
  type: ActionTypes.HIDE_LOADER,
});

export const setFirebaseDeviceToken = token => ({
  type: ActionTypes.SET_FIREBASE_DEVICE_TOKEN,
  payload: token,
});

export const subscribeTokenToTopic = (token, topic) => ({
  type: ActionTypes.SUBSCRIBE_TOKEN_TO_TOPIC,
  token,
  topic,
});

export const toggleSideDrawer = () => ({
  type: ActionTypes.TOGGLE_SIDE_DRAWER,
});

export const getDeviceToken = payload => ({
  type: ActionTypes.GET_DEVICE_TOKEN,
  payload,
});

export const setUserToken = token => ({
  type: ActionTypes.SET_USER_TOKEN,
  payload: token,
});

export const setTmpUserToken = token => ({
  type: ActionTypes.SET_TMP_USER_TOKEN,
  payload: token,
});

export const setAuthState = payload => ({
  type: ActionTypes.SET_AUTH_STATE,
  payload,
});

export const resetAuthState = () => ({
  type: ActionTypes.RESET_AUTH_STATE,
});

export const logoutUser = () => ({
  type: ActionTypes.LOGOUT_USER,
});

export const createPerformer = () => ({
  type: ActionTypes.CREATE_PERFORMER,
});

export const updatePerformer = payload => ({
  type: ActionTypes.UPDATE_PERFORMER,
  payload,
});

export const postContactUs = payload => ({
  type: ActionTypes.POST_CONTACTUS,
  payload,
});

export const postReportUser = payload => ({
  type: ActionTypes.POST_REPORT_USER,
  payload
})

export const postReportMessage = payload => ({
  type: ActionTypes.POST_REPORT_MESSAGE,
  payload
})

export const postReportPerformer = payload => ({
  type: ActionTypes.POST_REPORT_PERFORMER,
  payload
})

export const openPerformReport = payload => ({
  type: ActionTypes.OPEN_REPORT_PERFORM,
  payload
})

export const putBlockUser = payload => ({
  type: ActionTypes.PUT_BLOCK_USER,
  payload
})

export const sendToEventTruck = (
  eventName,
  eventDesc,
  eventPayload,
  toastrSuccessMessage,
) => ({
  type: ActionTypes.SEND_TO_EVENT_TRUCK,
  payload: {
    name: eventName,
    details: eventDesc,
    payload: eventPayload,
  },
  toastrSuccessMessage,
});

export const setCookieConsentStatus = payload => ({
  type: ActionTypes.SET_COOKIE_CONSENT_STATUS,
  payload,
});
