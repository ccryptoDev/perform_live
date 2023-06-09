/**
 *
 * PaymentShipping reducer
 *
 */

import { ActionTypes } from './paymentShipping.types';

const initialState = {
  defaultState: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.DEFAULT_ACTION:
      return { ...state, defaultState: action.payload };
    case ActionTypes.UPDATE_USER_DATA:
      return { ...state, defaultState: action.payload };
    default:
      return state;
  }
}

export default reducer;
