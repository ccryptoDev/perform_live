/**
 *
 * PerformanceScheduler actions
 *
 */

import { ActionTypes } from './performanceScheduler.types';

export function saveAsDraftSuccess(payload) {
  return {
    type: ActionTypes.SAVE_AS_DRAFT_SUCCESS,
    payload,
  };
}

export function deletePerformancePreview(payload) {
  return {
    type: ActionTypes.DELETE_PERFORMANCE_PREVIEW,
    payload,
  };
}

export function resetVideoPreview(payload) {
  return {
    type: ActionTypes.RESET_VIDEO_PREVIEW,
    payload,
  };
}

export function resetCover(payload) {
  return {
    type: ActionTypes.RESET_COVER,
    payload,
  };
}

export function getPerformanceInfo(payload) {
  return {
    type: ActionTypes.GET_PERFORMANCE_INFO,
    payload,
  };
}

export function uploadPreview(payload) {
  return {
    type: ActionTypes.UPLOAD_PREVIEW,
    payload,
  };
}

export function uploadPreviewSuccess(payload) {
  return {
    type: ActionTypes.UPLOAD_PREVIEW_SUCCESS,
    payload,
  };
}

export function createPerformance(payload) {
  return {
    type: ActionTypes.CREATE_PERFORMANCE,
    payload,
  };
}

export function createPerformanceSuccess(payload) {
  return {
    type: ActionTypes.CREATE_PERFORMANCE_SUCCESS,
    payload,
  };
}

export function setPerformanceData(payload) {
  return {
    type: ActionTypes.SET_PERFORMANCE_DATA,
    payload,
  };
}

export function updatePerformance(payload) {
  return {
    type: ActionTypes.UPDATE_PERFORMANCE,
    payload,
  };
}

export function deletePerformance(payload) {
  return {
    type: ActionTypes.DELETE_PERFORMANCE,
    payload,
  };
}

export function deletePerformanceSuccess(payload) {
  return {
    type: ActionTypes.DELETE_PERFORMANCE_SUCCESS,
    payload,
  };
}

export function getPerformerTagOptions(payload) {
  return {
    type: ActionTypes.GET_PERFORMER_TAG_OPTIONS,
    payload,
  };
}

export function setPerformerTagOptions(payload) {
  return {
    type: ActionTypes.SET_PERFORMER_TAG_OPTIONS,
    payload,
  };
}

export function getVerifyPerformerTag(payload) {
  return {
    type: ActionTypes.VERIFY_PERFORMER_TAG,
    payload,
  };
}

export function setPerformerTag(payload) {
  return {
    type: ActionTypes.SET_PERFORMER_TAG,
    payload,
  };
}

export function setInitialState(payload) {
  return {
    type: ActionTypes.SET_INITIAL_STATE,
    payload,
  };
}

export function setPerformanceProducts(payload) {
  return {
    type: ActionTypes.SET_PERFORMANCE_PRODUCT,
    payload,
  };
}
