/**
 *
 * Signup Sagas
 *
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { setUserToken } from 'app/state/app.actions';
import {
  saveSuccess,
  saveData,
  saveProvider,
  clearData,
} from './signup.actions';
import { ActionTypes } from './signup.types';
import { api } from '../signup.dependencies';
import plToast from '../../../utils/toast';

export function* signupWithEmail(action) {
  try {
    yield call(api, {
      endpoint: 'USER_SIGNUP', // Add API mapping to module's `api.json` file
      method: 'POST',
      data: action.payload,
    });
    yield getUserLoggedIn(action);
    // yield put(saveSuccess(true));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* getUserAvailableEmail({ payload }) {
  try {
    const response = yield call(api, {
      endpoint: 'USER_AVAILABLE_EMAIL',
      method: 'GET',
      query: payload,
    });

    if (!response.body.success) {
      plToast.error('Email is already taken');
    } else {
      yield put(clearData());
      yield put(saveData(payload));
      yield put(saveProvider('Email'));
    }
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* saveSocialData({ payload }) {
  yield put(clearData());
  yield put(saveData(payload));
  yield put(
    saveProvider(payload.type.charAt(0).toUpperCase() + payload.type.slice(1)),
  );
}

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
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  yield takeEvery(ActionTypes.SAVE_SIGNUP, signupWithEmail);
  yield takeEvery(ActionTypes.AVAILABLE_EMAIL, getUserAvailableEmail);
  yield takeEvery(ActionTypes.SAVE_SOCIAL_DATA, saveSocialData);
}
