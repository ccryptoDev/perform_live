/**
 *
 * AgoraRecording actions
 *
 */

import { ActionTypes } from './agoraRecording.types';

export function getPerformanceInfo(payload) {
  return {
    type: ActionTypes.GET_PERFORMANCE_INFO,
    payload,
  };
}

export function setPerformanceInfo(payload) {
  return {
    type: ActionTypes.SET_PERFORMANCE_INFO,
    payload,
  };
}

export function getPerformanceJoinToken(payload) {
  return {
    type: ActionTypes.GET_PERFORMANCE_JOIN_TOKEN,
    payload,
  };
}

export function setPerformanceJoinToken(payload) {
  return {
    type: ActionTypes.SET_PERFORMANCE_JOIN_TOKEN,
    payload,
  };
}
