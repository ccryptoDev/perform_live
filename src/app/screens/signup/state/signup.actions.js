/**
 *
 * Signup actions
 *
 */

import { ActionTypes } from './signup.types';

export function defaultAction(payload) {
  return {
    type: ActionTypes.DEFAULT_ACTION,
    payload,
  };
}

export function signupWithEmailAction(payload) {
  return {
    type: ActionTypes.SAVE_SIGNUP,
    payload,
  };
}

export function saveSuccess(payload) {
  return {
    type: ActionTypes.SIGNUP_RESPONSE_SUCCESS,
    payload,
  };
}
export function getAvailableEmail(payload) {
  return {
    type: ActionTypes.AVAILABLE_EMAIL,
    payload,
  };
}

export function saveProvider(payload) {
  return {
    type: ActionTypes.SAVE_PROVIDER,
    payload,
  };
}

export function saveData(payload) {
  return {
    type: ActionTypes.SAVE_DATA,
    payload,
  };
}

export function saveSocialData(payload) {
  return {
    type: ActionTypes.SAVE_SOCIAL_DATA,
    payload,
  };
}

export function clearData() {
  return {
    type: ActionTypes.CLEAR_DATA,
  };
}
