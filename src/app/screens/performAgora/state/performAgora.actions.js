import { createAction } from '@reduxjs/toolkit';

export const setAllowedToJoinStage = createAction(
  'app/performagora/SET_ALLOWED_JOIN_STAGE',
);
export const getPerformanceInfo = createAction(
  'app/performagora/GET_PERFORMANCE_INFO',
);
export const setPerformanceInfo = createAction(
  'app/performagora/SET_PERFORMANCE_INFO',
);
export const setTimeStamp = createAction('app/performagora/TIME_STAMP');
export const getPerformanceJoinToken = createAction(
  'app/performagora/GET_PERFORMANCE_JOIN_TOKEN',
);
export const setPerformanceJoinToken = createAction(
  'app/performagora/SET_PERFORMANCE_JOIN_TOKEN',
);
export const updatePerformanceState = createAction(
  'app/performagora/UPDATE_PERFORMANCE_STATE',
);
export const setPerformanceStateFinished = createAction(
  'app/performagora/SET_PERFORMANCE_STATE_FINISHED',
);
export const setPerformanceState = createAction(
  'app/performagora/SET_PERFORMANCE_STATE',
);
export const resetPerformanceState = createAction(
  'app/performagora/RESET_PERFORMANCE_STATE',
);
export const updateAgoraAnalytics = createAction(
  'app/performagora/UPDATE_AGORA_ANALYTICS',
);
export const saveAgoraAnalytics = createAction(
  'app/performagora/SAVE_AGORA_ANALYTICS',
);
