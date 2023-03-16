/**
 *
 * ForgotPasswordForms Sagas
 *
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from './forgotPasswordForms.types';
import { api } from '../forgotPasswordForms.dependencies';
import { forgetPasswordSuccess } from './forgotPasswordForms.actions';

export function* forgetPasswordAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'FORGET_PASSWORD', // Add API mapping to module's `api.json` file
      method: 'POST',
      data: payload,
    });

    yield put(forgetPasswordSuccess(true));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  yield takeEvery(ActionTypes.FORGET_PASSWORD, forgetPasswordAPI);
}
