/**
 *
 * ForgotPasswordForms actions
 *
 */

import { ActionTypes } from './forgotPasswordForms.types';

export function defaultAction(payload) {
  return {
    type: ActionTypes.DEFAULT_ACTION,
    payload,
  };
}

export function forgetPassword(payload) {
  return {
    type: ActionTypes.FORGET_PASSWORD,
    payload,
  };
}

export function forgetPasswordSuccess(payload) {
  return {
    type: ActionTypes.FORGET_PASSWORD_SUCCESS,
    payload,
  };
}
