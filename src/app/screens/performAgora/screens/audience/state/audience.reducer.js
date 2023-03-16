import { createReducer } from '@reduxjs/toolkit';
import {
  resetAudienceState,
  setAudienceState,
  setInviteStageStatus,
  setJoinStageStatus,
  setPerformancePresence,
  setSidebarView,
  setStagePresence,
} from './audience.actions';

const initialState = {
  audienceState: {
    joined: false,
    joinedAt: '',
  },
  joinStage: {
    status: '',
  },

  // left/removed/joined
  stagePresence: {
    state: '',
  },
  // invited
  inviteStageStatus: {
    state: '',
  },
  // removed
  performancePresence: {
    state: '',
  },
  sidebarView: 'main',
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(setAudienceState, (state, action) => {
      state.audienceState = action.payload;
    })
    .addCase(setJoinStageStatus, (state, action) => {
      state.joinStage = action.payload;
    })
    .addCase(setStagePresence, (state, action) => {
      state.stagePresence = action.payload;
    })
    .addCase(setInviteStageStatus, (state, action) => {
      state.inviteStageStatus = action.payload;
    })
    .addCase(setPerformancePresence, (state, action) => {
      state.performancePresence = action.payload;
    })
    .addCase(setSidebarView, (state, action) => {
      state.sidebarView = action.payload;
    })
    .addCase(resetAudienceState, () => initialState);
});

export default reducer;
