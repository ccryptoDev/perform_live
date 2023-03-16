/**
 *
 * ConfirmPassword Sagas
 *
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from './confirmPassword.types';
import { api } from '../confirmPassword.dependencies';
import { resetPasswordSuccess } from './confirmPassword.actions';

export function* resetPasswordAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'RESET_PASSWORD', // Add API mapping to module's `api.json` file
      method: 'POST',
      data: payload,
    });

    yield put(resetPasswordSuccess(true));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  yield takeEvery(ActionTypes.RESET_PASSWORD, resetPasswordAPI);
}
