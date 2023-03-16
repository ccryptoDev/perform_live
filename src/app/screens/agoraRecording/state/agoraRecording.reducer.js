/**
 *
 * AgoraRecording reducer
 *
 */

import { ActionTypes } from './agoraRecording.types';

const initialState = {
  defaultState: null,
  timeStamp: '',
  performanceData: null,
  channelToken: null,
  allowedToJoinStage: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_PERFORMANCE_INFO: {
      // manupulate the channel name
      const performanceData = action.payload;
      const orgChannelName = performanceData.channelName;
      // let channelName = performanceData.channelName.replace('#', '_');
      // channelName = channelName.replaceAll(' ', '_');
      performanceData.channelName = performanceData.id.toString(); // channelName;
      performanceData.orgChannelName = orgChannelName;
      return { ...state, performanceData };
    }
    case ActionTypes.SET_PERFORMANCE_JOIN_TOKEN:
      return { ...state, channelToken: action.payload.token };
    default:
      return state;
  }
}

export default reducer;
