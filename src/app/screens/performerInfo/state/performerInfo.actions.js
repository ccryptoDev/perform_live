/**
 * 
 * Profile actions
 * 
 */

import { ActionTypes } from './performerInfo.types';

export function getOnePerformances(payload) {
  return {
    type: ActionTypes.GET_ONE_PERFORMANCES_REQUEST,
    payload
  }
}