/**
 *
 * ForgotPasswordForms reducer
 *
 */

import { ActionTypes } from './forgotPasswordForms.types';

const initialState = {
  defaultState: null,
  forgetSuccess: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FORGET_PASSWORD_SUCCESS:
      return { ...state, forgetSuccess: action.payload };
    default:
      return state;
  }
}

export default reducer;
