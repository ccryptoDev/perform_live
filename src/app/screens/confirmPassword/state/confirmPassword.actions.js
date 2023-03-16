/**
 *
 * ConfirmPassword actions
 *
 */

import { ActionTypes } from './confirmPassword.types';

export function saveResetPassword(payload) {
  return {
    type: ActionTypes.RESET_PASSWORD,
    payload,
  };
}

export function resetPasswordSuccess(payload) {
  return {
    type: ActionTypes.RESET_PASSWORD_SUCCESS,
    payload,
  };
}
