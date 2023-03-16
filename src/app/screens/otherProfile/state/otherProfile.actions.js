/**
 * 
 * Profile actions
 * 
 */

import { ActionTypes } from './otherProfile.types';

export function getOnePerformances(payload) {
  return {
    type: ActionTypes.GET_ONE_PERFORMANCES_REQUEST,
    payload
  }
}

export function addOnePerformances(payload) {
  return {
    type: ActionTypes.GET_ONE_PERFORMANCES_SUCCESS,
    payload
  }
}

export function getOnePerformancesFailure(payload) {
  return {
    type: ActionTypes.GET_ONE_PERFORMANCES_FAILURE,
    payload
  }
}

export function getFollowers(payload) {
  return {
    type: ActionTypes.GET_FOLLOWERS_REQUEST,
    payload
  }
}

export function setFollowers(payload) {
  return {
    type: ActionTypes.GET_FOLLOWERS_SUCCESS,
    payload
  }
}

export function getFollowersFailure(payload) {
  return {
    type: ActionTypes.GET_FOLLOWERS_FAILURE,
    payload
  }
}

export function getFollowings(payload) {
  return {
    type: ActionTypes.GET_FOLLOWINGS_REQUEST,
    payload
  }
}

export function setFollowings(payload) {
  return {
    type: ActionTypes.GET_FOLLOWINGS_SUCCESS,
    payload
  }
}

export function getFollowingsFailure(payload) {
  return {
    type: ActionTypes.GET_FOLLOWINGS_FAILURE,
    payload
  }
}

export function getFollowerCount(payload) {
  return {
    type: ActionTypes.GET_FOLLOWER_COUNT_REQUEST,
    payload
  }
}

export function setFollowerCount(payload) {
  return {
    type: ActionTypes.GET_FOLLOWER_COUNT_SUCCESS,
    payload
  }
}

export function getFollowingCount(payload) {
  return {
    type: ActionTypes.GET_FOLLOWING_COUNT_REQUEST,
    payload
  }
}

export function setFollowingCount(payload) {
  return {
    type: ActionTypes.GET_FOLLOWING_COUNT_SUCCESS,
    payload
  }
}

export function getPerformanceCount(payload) {
  return {
    type: ActionTypes.GET_PERFORMANCE_COUNT_REQUEST,
    payload
  }
}

export function setPerformanceCount(payload) {
  return {
    type: ActionTypes.GET_PERFORMANCE_COUNT_SUCCESS,
    payload
  }
}

export function resetPerformances(payload) {
  return {
    type: ActionTypes.RESET_PERFORMANCE,
    payload
  }
}

export function getFirstPerformances(payload) {
  return {
    type: ActionTypes.GET_FIRST_PERFORMANCE_REQUEST,
    payload
  }
}

export function setFirstPerformances(payload) {
  return {
    type: ActionTypes.GET_FIRST_PERFORMANCE_SUCCESS,
    payload
  }
}

export function getOtherUserInfo(payload) {
  return {
    type: ActionTypes.GET_USER_OTHER_INFO,
    payload
  }
}

export function setOtherUserInfo(payload){
  return {
    type: ActionTypes.SET_USER_OTHER_INFO,
    payload
  }
  
}