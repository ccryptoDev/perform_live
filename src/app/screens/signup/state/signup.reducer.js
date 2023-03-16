/**
 *
 * Signup reducer
 *
 */

import { ActionTypes } from './signup.types';

const initialState = {
  defaultState: null,
  signupSuccess: false,
  provider: null,
  data: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SIGNUP_RESPONSE_SUCCESS:
      return { ...state, signupSuccess: action.payload };
    case ActionTypes.SAVE_PROVIDER:
      return { ...state, provider: action.payload };
    case ActionTypes.SAVE_DATA:
      return { ...state, data: { ...state.data, ...action.payload } };
    case ActionTypes.CLEAR_DATA:
      return { ...state, provider: null, data: {} };
    default:
      return state;
  }
}

export default reducer;
