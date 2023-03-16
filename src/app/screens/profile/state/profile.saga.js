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
import { ActionTypes } from './profile.types';
import { api } from '../profile.dependencies';
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
  deletedPerformance,
  toggleFollowSuccess,
  getFollowers,
  getFollowings,
  uploadAvatarSuccess
} from './profile.actions';

export function* uploadAvatarApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'POST_FILE_UPLOAD',
      method: 'POST',
      data: payload,
      headers: {
        'Content-Type': null,
      }
    });
    yield put(uploadAvatarSuccess(result.body));
  } catch(error) {
    console.log("error during API call!", error);
  }
}

export function* getPerformances({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMANCE',
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
      endpoint: 'GET_PERFORMANCE',
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
  try {
    const result = yield call(api, {
      endpoint: 'GET_FOLLOWERS',
      method: 'GET',
      query: payload
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
      endpoint: 'GET_FOLLOWINGS',
      method: 'GET',
      query: payload
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
      endpoint: 'GET_FOLLOWING_COUNT',
      method: 'GET'
    });
    yield put(setFollowingCount(result.body));
  } catch(error) {
    console.log('error on get following count', error);
  }
}

export function* getFollowerCount({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_FOLLOWER_COUNT',
      method: 'GET'
    });
    yield put(setFollowerCount(result.body));
  } catch(error) {
    console.log('error on get follower count', error);
  }
}

export function* getPerformanceCount() {
  try {
    const result = yield call(api, {
      endpoint: 'GET_MY_PERFORMANCE_COUNT',
      method: 'GET'
    });
    yield put(setPerformanceCount(result.body));
  } catch(error) {
    console.log('error on get performance count', error);
  }
}

export function* deletePerformanceAsync({ payload }) {
  try {
    yield call(api, {
      endpoint: 'DELETE_PERFORMANCE',
      method: 'DELETE',
      paramsToReplace: { id: payload }
    });
    yield put(deletedPerformance(payload));
  } catch(error) {
    console.log('error on delete performance', error);
  }
}

export function* toggleFollowAsync({ payload }) {
  try {
    yield call(api, {
      endpoint: 'FOLLOW_UNFOLLOW',
      method: 'POST',
      paramsToReplace: { id: payload }
    });
    yield put(getFollowers());
    yield put(getFollowings());
    // yield put(toggleFollowSuccess(payload));
  } catch(error) {
    console.log('error on toggle follow', error);
  }
}

export default function*() {
  yield takeEvery(ActionTypes.POST_FILE_UPLOAD_REQUEST, uploadAvatarApi);
  yield takeEvery(ActionTypes.GET_ONE_PERFORMANCES_REQUEST, getPerformances);
  yield takeEvery(ActionTypes.GET_FIRST_PERFORMANCE_REQUEST, getFirstPerformances);
  yield takeEvery(ActionTypes.GET_FOLLOWERS_REQUEST, getFollowersAsync);
  yield takeEvery(ActionTypes.GET_FOLLOWINGS_REQUEST, getFollowingsAsync);
  yield takeEvery(ActionTypes.GET_FOLLOWER_COUNT_REQUEST, getFollowerCount);
  yield takeEvery(ActionTypes.GET_FOLLOWING_COUNT_REQUEST, getFollowingCount);
  yield takeEvery(ActionTypes.GET_PERFORMANCE_COUNT_REQUEST, getPerformanceCount);
  yield takeEvery(ActionTypes.DELETE_PERFORMANCE_REQUEST, deletePerformanceAsync);
  yield takeEvery(ActionTypes.TOGGLE_FOLLOW_REQUEST, toggleFollowAsync);
}