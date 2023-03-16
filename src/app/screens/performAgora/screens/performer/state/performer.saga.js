/**
 *
 * Performer Sagas
 *
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from './performer.types';
import { api } from '../performer.dependencies';
import { setRecordingToken, startRecordingSuccess } from './performer.actions';
// import { dataLoadedSuccess } from './performer.actions';

export function* startRecordingAPI({ payload }) {
  try {
    const result = yield call(api, {
      // baseUrl: 'http://localhost:8082/api/',
      endpoint: 'START_RECORDING', // Add API mapping to module's `api.json` file
      method: 'POST',
      queryParams: payload.queryParams,
      loader: false,
    });

    yield put(startRecordingSuccess(result.body.data));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* stopRecordingAPI({ payload }) {
  try {
    const result = yield call(api, {
      // baseUrl: 'http://localhost:8082/api/',
      endpoint: 'STOP_RECORDING', // Add API mapping to module's `api.json` file
      method: 'POST',
      queryParams: payload.queryParams,
    });

    yield put(startRecordingSuccess({}));
    if (payload.callback) {
      payload.callback();
    }
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* queryRecordingAPI({ payload }) {
  try {
    const customError = true;
    const result = yield call(
      api,
      {
        // baseUrl: 'http://localhost:8082/api/',
        endpoint: 'QUERY_RECORDING', // Add API mapping to module's `api.json` file
        method: 'POST',
        queryParams: payload.queryParams,
        loader: false,
      },
      customError,
    );

    if (payload.callback) {
      payload.callback(true);
    }
  } catch (error) {
    console.error(
      'Error during API call!',
      'Something went wrong!! Restart recording',
    );
    if (payload.callback) {
      payload.callback(false);
    }
  }
}

export function* getRecordingTokenApi({ payload }) {
  try {
    const result = yield call(api, {
      // baseUrl: 'http://localhost:8082/api/',
      endpoint: 'GET_PERFORMANCE_JOIN_TOKEN', // Add API mapping to module's `api.json` file
      method: 'GET',
      queryParams: payload.queryParams,
    });

    yield put(setRecordingToken(result.body.token));
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return true;
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  yield takeEvery(ActionTypes.START_RECORDING, startRecordingAPI);
  yield takeEvery(ActionTypes.STOP_RECORDING, stopRecordingAPI);
  yield takeEvery(ActionTypes.QUERY_RECORDING, queryRecordingAPI);
  yield takeEvery(ActionTypes.RECORDING_TOKEN, getRecordingTokenApi);
}
