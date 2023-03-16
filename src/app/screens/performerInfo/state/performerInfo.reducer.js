/**
 * 
 * Profile reducer
 * 
 */

import { ActionTypes } from './performerInfo.types';

const initialState = {
}

let newState = {};

function reducer (state = initialState, action) {
  switch(action.type) {
    case ActionTypes.GET_ONE_PERFORMANCES_SUCCESS:
      return { ...state, [action.payload.type]: state[action.payload.type].concat(action.payload.performances) };
    case ActionTypes.GET_ONE_PERFORMANCES_FAILURE:
      return { ...state, [action.payload.type]: [] };
    default:
      return state;
  }
}

export default reducer;