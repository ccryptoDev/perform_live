/**
 *
 * Audience actions
 *
 */

import { createAction } from '@reduxjs/toolkit';

export const defaultAction = createAction('app/audience/DEFAULT_ACTION');
export const setAudienceState = createAction('app/audience/SET_AUDIENCE_STATE');
export const setJoinStageStatus = createAction(
  'app/audience/JOIN_STATE_STATUS',
);
export const setStagePresence = createAction('app/audience/STAGE_PRESENCE');
export const setInviteStageStatus = createAction(
  'app/audience/INVITE_STAGE_STATUS',
);
export const setPerformancePresence = createAction(
  'app/audience/PERFORMANCE_PRESENCE',
);
export const resetAudienceState = createAction(
  'app/audience/RESET_AUDIENCE_STATE',
);
export const setSidebarView = createAction('app/audience/SET_SIDEBAR_VIEW');
