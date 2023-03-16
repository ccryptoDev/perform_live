import { ActionTypes } from './actionTypes';

export const addActionToQueue = action => ({
  type: ActionTypes.ADD_ACTION_TO_QUEUE,
  payload: action,
});

export const removeActionFromQueue = action => ({
  type: ActionTypes.REMOVE_ACTION_FROM_QUEUE,
  payload: action,
});

export const setQueueProcessingStatus = () => ({
  type: ActionTypes.SET_QUEUE_PROCESSING_STATUS,
});

export const unsetQueueProcessingStatus = () => ({
  type: ActionTypes.UNSET_QUEUE_PROCESSING_STATUS,
});

export const setActionProcessingStatus = entry => ({
  type: ActionTypes.SET_ACTION_PROCESSING_STATUS,
  payload: entry,
});
