/**
 *
 * AgoraRecording Sagas
 *
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from './agoraRecording.types';
import { api } from '../agoraRecording.dependencies';
import {
  setPerformanceJoinToken,
  setPerformanceInfo,
} from './agoraRecording.actions';
export function* getPerformanceInfoAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint:
        payload.from === 'performanceEdit'
          ? 'GET_PERFORMANCE_INFO_PRIVATE'
          : 'GET_PERFORMANCE_INFO',
      method: 'GET',
      paramsToReplace: payload.paramsToReplace,
    });
    let performerInfo = {};
    performerInfo = yield getPerformerInfoAPI(result.body.id);
    const performancePayload = {
      ...result.body,
      ...{ performer: performerInfo },
    };
    yield put(setPerformanceInfo(performancePayload));
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return true;
}

export function* getPerformerInfoAPI(performanceId) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMANCE_PERFORMER_INFO', // Add API mapping to module's `api.json` file
      method: 'GET',
      paramsToReplace: { id: performanceId },
    });

    return result.body;
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return true;
}

export function* getPerformanceJoinToken({ payload }) {
  try {
    const result = yield call(api, {
      // baseUrl: 'http://localhost:8082/api/',
      endpoint: 'GET_PERFORMANCE_JOIN_TOKEN', // Add API mapping to module's `api.json` file
      method: 'GET',
      queryParams: payload.queryParams,
    });

    yield put(setPerformanceJoinToken(result.body));
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return true;
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  yield takeEvery(ActionTypes.GET_PERFORMANCE_INFO, getPerformanceInfoAPI);
  yield takeEvery(
    ActionTypes.GET_PERFORMANCE_JOIN_TOKEN,
    getPerformanceJoinToken,
  );
}
