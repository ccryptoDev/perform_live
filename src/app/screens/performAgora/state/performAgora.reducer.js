import { createReducer } from '@reduxjs/toolkit';

import {
  resetPerformanceState,
  setAllowedToJoinStage,
  setPerformanceInfo,
  setPerformanceJoinToken,
  setPerformanceState,
  setTimeStamp,
  updateAgoraAnalytics,
} from './performAgora.actions';

const initialState = {
  defaultState: null,
  timeStamp: '',
  performanceData: null,
  channelToken: null,
  allowedToJoinStage: true,
  agoraAnalytics: {},
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setPerformanceInfo, (state, action) => {
      state.performanceData = { ...action.payload };
      state.performanceData.channelName = action.payload.id.toString();
      state.performanceData.orgChannelName = action.payload.channelName;
    })
    .addCase(setTimeStamp, (state, action) => {
      state.timeStamp = action.payload.timeStamp;
    })
    .addCase(setPerformanceJoinToken, (state, action) => {
      state.channelToken = action.payload.token;
    })
    .addCase(setPerformanceState, (state, action) => {
      state.performanceData.state = action.payload;
    })
    .addCase(resetPerformanceState, () => {
      return initialState;
    })
    .addCase(setAllowedToJoinStage, (state, action) => {
      state.allowedToJoinStage = action.payload;
    })
    .addCase(updateAgoraAnalytics, (state, action) => {
      const prevAnalytics = { ...state.agoraAnalytics };
      prevAnalytics[action.payload.id] =
        action.payload.action === 'delete'
          ? {}
          : {
              ...(prevAnalytics[action.payload.id] || {}),
              ...action.payload.data,
            };
      state.agoraAnalytics = prevAnalytics;
    });
});

export default reducer;
