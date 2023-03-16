/**
 * Gets the repositories of the user from Github
 */

import { put, call, select, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from '../utils/api/api.saga';
import { ActionTypes } from './app.types';
import AppConstants from '../app.constants.json';
import {
  resetAuthState,
  setUserToken,
  setCategoryList,
  setPerformerProducts,
  setSocialLoginUserInfo,
  setPerformanceInfo,
  setUserInfo,
  setPerformerInfo,
  setTwitterRequestToken,
  setServerCurrentTime,
  setPerformerFollowCount,
  setPerformerFollowerCount,
  setPerformerPerformanceCount,
  setTmpUserToken,
  setFollowStatus,
  postReportMessage,
  postReportPerformer,
  postReportUser,
  putBlockUser,
} from './app.actions';
import {
  clearData,
  saveData,
  saveProvider,
} from '../screens/signup/state/signup.actions';
import plToast from '../utils/toast';

export function* logoutUser() {
  try {
    // yield call(api, {
    //   endpoint: 'LOGOUT_USER',
    //   method: 'PUT',
    // });
    yield put(resetAuthState());
    // setTimeout(() => window.location.reload(), 1000);
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* sendToEventTruck(action) {
  try {
    yield call(
      api,
      {
        endpoint: 'EVENTS_PUBLISH',
        method: 'POST',
        data: action.payload,
        loader: false,
      },
      action,
    );
    if (action.toastrSuccessMessage) {
      setTimeout(() => {
        plToast.success(action.toastrSuccessMessage);
      }, AppConstants.API_WAIT_TIME);
    }
  } catch (error) {
    console.log('Error sending event call', error, action.payload);
  }
}

export function* socialLogin({ payload }) {
  const { requestData, confirm } = payload;
  if (confirm) {
    yield updatePerformer({ payload: requestData });
    const token = yield select(state => state.global.userInfo.tmpToken);
    yield put(setUserToken(token));
    yield put(setTmpUserToken(null));
    yield put(push('/signup'));
    return;
  }

  try {
    const result = yield call(api, {
      endpoint: 'SOCIAL_LOGIN',
      method: 'POST',
      data: requestData,
    });

    const { requireConfirm, token } = result.body;
    yield put(setTmpUserToken(token));

    if (requireConfirm) {
      yield put(clearData());
      yield put(saveData(requestData));
      yield put(
        saveProvider(
          requestData.type.charAt(0).toUpperCase() + requestData.type.slice(1),
        ),
      );

      yield put(push('/signup'));
    } else {
      yield put(setUserToken(token));
    }
  } catch (error) {
    console.log('Error sending social login call', error, payload);
  }
}

export function* getUserInfoApi(action) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_USER_INFO',
      method: 'GET',
    });
    yield put(setUserInfo(result.body));
    yield getUserAsPerformerApi();
  } catch (error) {
    console.log('Error sending social login call', error, action.payload);
  }
}

export function* getUserAsPerformerApi(action) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMER_INFO',
      method: 'GET',
    });
    yield put(setPerformerInfo(result.body));
  } catch (error) {
    console.log('Error sending social login call', error, action.payload);
  }
}

export function* getCategoryListApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'CATEGORY_LIST',
      method: 'GET',
      pathParam: payload || '',
    });
    yield put(setCategoryList(result.body));
  } catch (error) {
    console.log('Error sending social login call', error, action.payload);
  }
}

export function* getProductsListAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMER_PRODUCTS', // Add API mapping to module's `api.json` file
      method: 'GET',
      query: payload,
    });

    yield put(setPerformerProducts(result.body));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* getSocialLoginToken({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'SOCIAL_LOGIN_TOKEN',
      method: 'GET',
      paramsToReplace: payload.paramsToReplace,
      queryParams: payload.queryParams,
    });
    yield put(setSocialLoginUserInfo(result.body));
  } catch (error) {
    console.log('Error sending social login call', error, payload);
  }
}

export function* getTwitterRequestTokenApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'TWITTER_REQUEST_TOKEN',
      method: 'GET',
      queryParams: payload.queryParams,
    });
    yield put(setTwitterRequestToken(result.body));
  } catch (error) {
    console.log('Error sending social login call', error, payload);
  }
}

export function* createPerformer({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'CREATE_PERFORMER',
      method: 'POST',
      paramsToReplace: payload.paramsToReplace,
    });
    yield put(setPerformerInfo(result.body));
  } catch (error) {
    console.log('Error sending social login call', error, payload);
  }
}

export function* postContactUs({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'POST_CONTACTUS',
      method: 'POST',
      data: payload,
    });
  } catch (error) {
    console.log('Error during post the contactUs', error, payload);
  }
}

export function* putBlockUserApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'PUT_BLOCK_USER',
      method: 'PUT',
      paramsToReplace: payload.paramsToReplace,
    });
    if (result.body.success) {
      plToast.success(`${payload.data.username} was blocked`);
    }
  } catch (error) {
    console.log('Error during post the report user: ', error);
  }
}

export function* postReportUserApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'POST_REPORT_USER',
      method: 'POST',
      paramsToReplace: payload.paramsToReplace,
      data: payload.data,
    });
    if (result.body.success) {
      plToast.success('Report was sent');
    }
  } catch (error) {
    console.log('Error during post the report user: ', error);
  }
}

export function* postReportMessageApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'POST_REPORT_MESSAGE',
      method: 'POST',
      paramsToReplace: payload.paramsToReplace,
      data: payload.data,
    });
    if (result.body.success) {
      plToast.success('Report was sent');
    }
  } catch (error) {
    console.log('error during post the report message', error);
  }
}

export function* postReportPerformerApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'POST_REPORT_PERFORMER',
      method: 'POST',
      paramsToReplace: payload.paramsToReplace,
      data: payload.data,
    });
    if (result.body.success) {
      plToast.success('Report was sent');
    }
  } catch (error) {
    console.log('error during post the report performer', error);
  }
}

export function* updatePerformer({ payload }) {
  console.log('payload in app saga', payload);
  try {
    const result = yield call(api, {
      endpoint: 'UPDATE_PERFORMER',
      method: 'PUT',
      data: payload,
    });
    yield put(setPerformerInfo(result.body));
  } catch (error) {
    console.log('Error sending social login call', error, payload);
  }
}

export function* getServerCurrentTimeApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_SERVER_CURRENT_TIME',
      method: 'GET',
    });
    yield put(setServerCurrentTime(result.body));
  } catch (error) {
    console.log('Error sending social login call', error, payload);
  }
}

export function* getPerformerFollowCountApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMER_FOLLOW_COUNT',
      method: 'GET',
    });
    yield put(setPerformerFollowCount(result.body.count));
  } catch (error) {
    console.log('Error sending social login call', error, payload);
  }
}

export function* getPerformerFollowerCountApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMER_FOLLOWER_COUNT',
      method: 'GET',
    });
    yield put(setPerformerFollowerCount(result.body.count));
  } catch (error) {
    console.log('Error sending social login call', error, payload);
  }
}

export function* getPerformerPerformanceCountApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMER_PERFORMANCE_COUNT',
      method: 'GET',
    });
    yield put(setPerformerPerformanceCount(result.body.count));
  } catch (error) {
    console.log('Error sending social login call', error, payload);
  }
}

export function* updatePerformerFollowApi({ payload }) {
  try {
    const customError = true;
    const result = yield call(
      api,
      {
        endpoint: 'FOLLOW_UNFOLLOW',
        method: payload.method || 'POST',
        paramsToReplace: payload.paramsToReplace,
      },
      customError,
    );
    yield put(setFollowStatus(result.body.success));
  } catch (error) {
    console.log('Error sending social login call', error, payload);
  }
}

export function* setUserTokenSaga({ payload }) {
  localStorage.setItem('token', payload);
}

export function* resetAuthStateSaga() {
  yield put(push('/'));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  // By using takeLatest only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeEvery(ActionTypes.LOGOUT_USER, logoutUser);
  yield takeEvery(ActionTypes.RESET_AUTH_STATE, resetAuthStateSaga);
  yield takeEvery(ActionTypes.SEND_TO_EVENT_TRUCK, sendToEventTruck);
  yield takeEvery(ActionTypes.SOCIAL_LOGIN, socialLogin);
  yield takeEvery(ActionTypes.GET_CATEGORY_LIST, getCategoryListApi);
  yield takeEvery(ActionTypes.GET_PERFORMER_PRODUCTS, getProductsListAPI);
  yield takeEvery(ActionTypes.SOCIAL_LOGIN_USER_INFO, getSocialLoginToken);
  yield takeEvery(ActionTypes.GET_USER_INFO, getUserInfoApi);
  yield takeEvery(ActionTypes.GET_PERFORMER_INFO, getUserAsPerformerApi);
  yield takeEvery(ActionTypes.FOLLOW_UNFOLLOW, updatePerformerFollowApi);
  yield takeEvery(ActionTypes.TWITTER_REQUEST_TOKEN, getTwitterRequestTokenApi);
  yield takeEvery(ActionTypes.UPDATE_PERFORMER, updatePerformer);
  yield takeEvery(ActionTypes.GET_SERVER_CURRENT_TIME, getServerCurrentTimeApi);
  yield takeEvery(ActionTypes.SET_USER_TOKEN, setUserTokenSaga);
  yield takeEvery(ActionTypes.POST_CONTACTUS, postContactUs);

  yield takeEvery(ActionTypes.POST_REPORT_USER, postReportUserApi);
  yield takeEvery(ActionTypes.POST_REPORT_MESSAGE, postReportMessageApi);
  yield takeEvery(ActionTypes.POST_REPORT_PERFORMER, postReportPerformerApi);
  yield takeEvery(ActionTypes.PUT_BLOCK_USER, putBlockUserApi);

  yield takeEvery(
    ActionTypes.GET_PERFORMER_FOLLOW_COUNT,
    getPerformerFollowCountApi,
  );
  yield takeEvery(
    ActionTypes.GET_PERFORMER_FOLLOWER_COUNT,
    getPerformerFollowerCountApi,
  );
  yield takeEvery(
    ActionTypes.GET_PERFORMER_PERFORMANCE_COUNT,
    getPerformerPerformanceCountApi,
  );
}
