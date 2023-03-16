/**
 *
 * Profile actions
 *
 */

import { ActionTypes } from './profile.types';

export function getOnePerformances(payload) {
  return {
    type: ActionTypes.GET_ONE_PERFORMANCES_REQUEST,
    payload,
  };
}

export function addOnePerformances(payload) {
  return {
    type: ActionTypes.GET_ONE_PERFORMANCES_SUCCESS,
    payload,
  };
}

export function getOnePerformancesFailure(payload) {
  return {
    type: ActionTypes.GET_ONE_PERFORMANCES_FAILURE,
    payload,
  };
}

export function getFollowers(payload) {
  return {
    type: ActionTypes.GET_FOLLOWERS_REQUEST,
    payload,
  };
}

export function setFollowers(payload) {
  return {
    type: ActionTypes.GET_FOLLOWERS_SUCCESS,
    payload,
  };
}

export function getFollowersFailure(payload) {
  return {
    type: ActionTypes.GET_FOLLOWERS_FAILURE,
    payload,
  };
}

export function getFollowings(payload) {
  return {
    type: ActionTypes.GET_FOLLOWINGS_REQUEST,
    payload,
  };
}

export function setFollowings(payload) {
  return {
    type: ActionTypes.GET_FOLLOWINGS_SUCCESS,
    payload,
  };
}

export function getFollowingsFailure(payload) {
  return {
    type: ActionTypes.GET_FOLLOWINGS_FAILURE,
    payload,
  };
}

export function getFollowerCount() {
  return {
    type: ActionTypes.GET_FOLLOWER_COUNT_REQUEST,
  };
}

export function setFollowerCount(payload) {
  return {
    type: ActionTypes.GET_FOLLOWER_COUNT_SUCCESS,
    payload,
  };
}

export function getFollowingCount() {
  return {
    type: ActionTypes.GET_FOLLOWING_COUNT_REQUEST,
  };
}

export function setFollowingCount(payload) {
  return {
    type: ActionTypes.GET_FOLLOWING_COUNT_SUCCESS,
    payload,
  };
}

export function getPerformanceCount() {
  return {
    type: ActionTypes.GET_PERFORMANCE_COUNT_REQUEST,
  };
}

export function setPerformanceCount(payload) {
  return {
    type: ActionTypes.GET_PERFORMANCE_COUNT_SUCCESS,
    payload,
  };
}

export function resetPerformances(payload) {
  return {
    type: ActionTypes.RESET_PERFORMANCE,
    payload,
  };
}

export function getFirstPerformances(payload) {
  return {
    type: ActionTypes.GET_FIRST_PERFORMANCE_REQUEST,
    payload,
  };
}

export function setFirstPerformances(payload) {
  return {
    type: ActionTypes.GET_FIRST_PERFORMANCE_SUCCESS,
    payload,
  };
}

export function deletePerformance(payload) {
  return {
    type: ActionTypes.DELETE_PERFORMANCE_REQUEST,
    payload,
  };
}

export function deletedPerformance(payload) {
  return {
    type: ActionTypes.DELETE_PERFORMANCE_SUCCESS,
    payload,
  };
}

export function toggleFollow(payload) {
  return {
    type: ActionTypes.TOGGLE_FOLLOW_REQUEST,
    payload,
  };
}

export function toggleFollowSuccess(payload) {
  return {
    type: ActionTypes.TOGGLE_FOLLOW_SUCCESS,
    payload,
  };
}

export function uploadAvatar(payload) {
  return {
    type: ActionTypes.POST_FILE_UPLOAD_REQUEST,
    payload,
  };
}

export function uploadAvatarSuccess(payload) {
  return {
    type: ActionTypes.POST_FILE_UPLOAD_SUCCESS,
    payload,
  };
}
