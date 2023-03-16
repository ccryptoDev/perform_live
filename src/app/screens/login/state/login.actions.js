/**
 *
 * Login actions
 *
 */

import { ActionTypes } from './login.types';

export function defaultAction(payload) {
  return {
    type: ActionTypes.DEFAULT_ACTION,
    payload,
  };
}

export function loginAction(payload) {
  return {
    type: ActionTypes.USER_LOGIN,
    payload,
  };
}

export function loggedInAction(payload) {
  return {
    type: ActionTypes.USER_LOGGED_IN,
    payload,
  };
}

export function logInFailedAction(payload) {
  return {
    type: ActionTypes.USER_LOGIN_FAILED,
    payload,
  };
}
