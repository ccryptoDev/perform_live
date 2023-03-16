/**
 *
 * Performer actions
 *
 */

import { ActionTypes } from './performer.types';

export function defaultAction(payload) {
  return {
    type: ActionTypes.DEFAULT_ACTION,
    payload,
  };
}

export function updateToAllowDeviceStatus(payload) {
  return {
    payload,
    type: ActionTypes.ALLOW_TO_DEVICES_STATUS,
  };
}

export function updateCurrentSettingComponent(payload) {
  return {
    payload,
    type: ActionTypes.UPDATE_SETTING_COMPONENT,
  };
}

export function allowedForLive(payload) {
  return {
    payload,
    type: ActionTypes.ALLOW_LIVE_PERFORMACE,
  };
}

export function setStageRequest(payload) {
  return {
    payload,
    type: ActionTypes.STAGE_REQUEST,
  };
}

export function setActiveStageUser(payload) {
  return {
    payload,
    type: ActionTypes.SET_ACTIVE_STAGE_USER,
  };
}

export function setUserState(payload) {
  return {
    payload,
    type: ActionTypes.USER_STATE,
  };
}

export function removeUser(payload) {
  return {
    payload,
    type: ActionTypes.REMOVE_USER_PERFORMANCE,
  };
}

export function setInviteAudience(payload) {
  return {
    payload,
    type: ActionTypes.INVITE_AUDIENCE,
  };
}

export function resetPerformerState(payload) {
  return {
    payload,
    type: ActionTypes.RESET_PERFORMER_STATE,
  };
}

export function setActiveInvitedAudience(payload) {
  return {
    payload,
    type: ActionTypes.SET_ACTIVE_INVITED_AUDIENCE,
  };
}

export function setActiveStageAudience(payload) {
  return {
    payload,
    type: ActionTypes.SET_ACTIVE_STAGE_AUDIENCE,
  };
}

export function startRecording(payload) {
  return {
    payload,
    type: ActionTypes.START_RECORDING,
  };
}

export function startRecordingSuccess(payload) {
  return {
    payload,
    type: ActionTypes.START_RECORDING_SUCCESS,
  };
}

export function stopRecording(payload) {
  return {
    payload,
    type: ActionTypes.STOP_RECORDING,
  };
}

export function queryRecording(payload) {
  return {
    payload,
    type: ActionTypes.QUERY_RECORDING,
  };
}

export function setQueryRecordingStatus(payload) {
  return {
    payload,
    type: ActionTypes.QUERY_RECORDING_STATUS,
  };
}
export function getRecordingToken(payload) {
  return {
    payload,
    type: ActionTypes.RECORDING_TOKEN,
  };
}
export function setRecordingToken(payload) {
  return {
    payload,
    type: ActionTypes.SET_RECORDING_TOKEN,
  };
}
