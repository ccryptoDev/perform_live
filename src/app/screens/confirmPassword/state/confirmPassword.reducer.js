/**
 *
 * ConfirmPassword reducer
 *
 */

import { ActionTypes } from './confirmPassword.types';

const initialState = {
  defaultState: null,
  passwordResetSuccess: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.RESET_PASSWORD_SUCCESS:
      return { ...state, passwordResetSuccess: action.payload };
    default:
      return state;
  }
}

export default reducer;
