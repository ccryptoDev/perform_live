/**
 *
 * FinishPerformance actions
 *
 */

import { ActionTypes } from './finishPerformance.types';

export function getRecording(payload) {
  return {
    type: ActionTypes.GET_RECORDING,
    payload,
  };
}

export function setRecordingData(payload) {
  return {
    type: ActionTypes.SET_RECORDING_DATA,
    payload,
  };
}
