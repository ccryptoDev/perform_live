/**
 *
 * FinishPerformance Sagas
 *
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from './finishPerformance.types';
import { api } from '../finishPerformance.dependencies';
import { setRecordingData } from './finishPerformance.actions';

export function* getRecordingmAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_FINISHED_PERFORMANCE', // Add API mapping to module's `api.json` file
      method: 'GET',
      paramsToReplace: payload.paramsToReplace,
    });

    yield put(setRecordingData(result.body));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  yield takeEvery(ActionTypes.GET_RECORDING, getRecordingmAPI);
}
