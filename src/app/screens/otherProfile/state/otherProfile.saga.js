/**
 * 
 * Profile Sagas
 * 
 */

import {
  call,
  put,
  takeEvery
} from 'redux-saga/effects';
import { ActionTypes } from './otherProfile.types';
import { api } from '../../../components/Profile/profile.dependencies';
import {
  addOnePerformances,
  getOnePerformancesFailure,
  setFollowers,
  setFollowings,
  getFollowersFailure,
  getFollowingsFailure,
  setFollowingCount,
  setFollowerCount,
  setPerformanceCount,
  setFirstPerformances,
  setOtherUserInfo
} from './otherProfile.actions';

export function* getPerformances({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMANCE_USER',
      method: 'GET',
      paramsToReplace: payload.paramsToReplace,
      queryParams: payload.queryParams
    });

    yield put(addOnePerformances({
      performances: result.body,
      type: payload.paramsToReplace.state
    }));
  } catch(error) {
    console.log('error on api call', error);
    yield put(getOnePerformancesFailure({}));
  }
}

export function* getFirstPerformances({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMANCE_USER',
      method: 'GET',
      paramsToReplace: payload.paramsToReplace,
      queryParams: payload.queryParams
    });

    yield put(setFirstPerformances({
      performances: result.body,
      type: payload.paramsToReplace.state
    }));
  } catch(error) {
    console.log('error on api call', error);
    yield put(setFirstPerformances({
      performances: [],
      type: payload.paramsToReplace.state
    }));
  }
}

export function* getFollowersAsync({ payload }) {
  console.log("payload in getFollowersAsync", payload);
  try {
    const result = yield call(api, {
      endpoint: 'GET_FOLLOWERS_USER',
      method: 'GET',
      // query: payload,
      paramsToReplace: payload.paramsToReplace,
      queryParams: payload.queryParams
    });
    yield put(setFollowers(result.body));
  } catch(error) {
    console.log('error on api call', error);
    yield put(getFollowersFailure({}));
  }
}

export function* getFollowingsAsync({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_FOLLOWINGS_USER',
      method: 'GET',
      // query: payload,
      paramsToReplace: payload.paramsToReplace,
      queryParams: payload.queryParams
    });
    yield put(setFollowings(result.body));
  } catch(error) {
    console.log('error on api call', error);
    yield put(getFollowingsFailure({}));
  }
}

export function* getFollowingCount({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_FOLLOWING_COUNT_USER',
      method: 'GET',
      paramsToReplace: payload.paramsToReplace
    });
    yield put(setFollowingCount(result.body));
  } catch(error) {
    console.log('error on get following count', error);
  }
}

export function* getFollowerCount({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_FOLLOWER_COUNT_USER',
      method: 'GET',
      paramsToReplace: payload.paramsToReplace
    });
    yield put(setFollowerCount(result.body));
  } catch(error) {
    console.log('error on get follower count', error);
  }
}

export function* getPerformanceCount({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_USER_PERFORMANCE_COUNT_USER',
      method: 'GET',
      paramsToReplace: payload.paramsToReplace
    });
    yield put(setPerformanceCount(result.body));
  } catch(error) {
    console.log('error on get performance count', error);
  }
}

export function* getOtherUserInfo({payload}) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_OTHER_USER_INFO',
      method: 'GET',
      paramsToReplace: payload.paramsToReplace
    });
    yield put(setOtherUserInfo(result.body));
  } catch (error) {
    console.log('Error sending social login call', error, action.payload);
  }
}

export default function*() {
  yield takeEvery(ActionTypes.GET_ONE_PERFORMANCES_REQUEST, getPerformances);
  yield takeEvery(ActionTypes.GET_FIRST_PERFORMANCE_REQUEST, getFirstPerformances);
  yield takeEvery(ActionTypes.GET_FOLLOWERS_REQUEST, getFollowersAsync);
  yield takeEvery(ActionTypes.GET_FOLLOWINGS_REQUEST, getFollowingsAsync);
  yield takeEvery(ActionTypes.GET_FOLLOWER_COUNT_REQUEST, getFollowerCount);
  yield takeEvery(ActionTypes.GET_FOLLOWING_COUNT_REQUEST, getFollowingCount);
  yield takeEvery(ActionTypes.GET_PERFORMANCE_COUNT_REQUEST, getPerformanceCount);
  yield takeEvery(ActionTypes.GET_USER_OTHER_INFO, getOtherUserInfo);
}