/**
 *
 * Login Sagas
 *
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { setUserToken } from 'app/state/app.actions';
import { ActionTypes } from './login.types';
import { api } from '../login.dependencies';
import { loggedInAction, logInFailedAction } from './login.actions';

export function* getUserLoggedIn({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'USER_LOGIN',
      method: 'POST',
      data: payload,
    });

    yield put(setUserToken(result.body.token));
  } catch (error) {
    console.error('Error during API call!', error);
    yield put(logInFailedAction({ error }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  yield takeEvery(ActionTypes.USER_LOGIN, getUserLoggedIn);
}
