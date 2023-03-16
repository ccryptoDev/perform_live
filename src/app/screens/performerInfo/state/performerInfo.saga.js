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
import { ActionTypes } from './performerInfo.types';
import { api } from '../performerInfo.dependencies';
import {
  getOnePerformancesFailure,
} from './performerInfo.actions';

export function* getPerformances({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMANCE',
      method: 'GET',
      paramsToReplace: payload.paramsToReplace,
      queryParams: payload.queryParams
    });
  } catch(error) {
    console.log('error on api call', error);
    yield put(getOnePerformancesFailure({}));
  }
}

export default function*() {
  yield takeEvery(ActionTypes.GET_ONE_PERFORMANCES_REQUEST, getPerformances);
}