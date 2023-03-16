/**
 *
 * Login reducer
 *
 */

import { ActionTypes } from './login.types';

const initialState = {
  token: '',
  error: '',
  loggedIn: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USER_LOGGED_IN:
      return { ...state, ...action.payload };
    case ActionTypes.USER_LOGIN_FAILED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default reducer;
