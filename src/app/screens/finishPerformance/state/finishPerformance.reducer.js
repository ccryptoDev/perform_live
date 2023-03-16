/**
 *
 * FinishPerformance reducer
 *
 */

import { ActionTypes } from './finishPerformance.types';

const initialState = {
  recordingData: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_RECORDING_DATA:
      return { ...state, recordingData: action.payload };
    default:
      return state;
  }
}

export default reducer;
