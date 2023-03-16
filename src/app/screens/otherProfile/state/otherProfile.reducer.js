/**
 *
 * Profile reducer
 *
 */

import { ActionTypes } from './otherProfile.types';

const initialState = {
  live: [],
  published: [],
  past: [],
  draft: [],
  followers: [],
  followings: [],
  performanceCount: 0,
  followingCount: 0,
  followerCount: 0,
  avatarUrl: {},
  userOtherInfo: {},
};

let newState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ONE_PERFORMANCES_SUCCESS:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].concat(
          action.payload.performances,
        ),
      };
    case ActionTypes.GET_ONE_PERFORMANCES_FAILURE:
      return { ...state, [action.payload.type]: [] };
    case ActionTypes.GET_FIRST_PERFORMANCE_SUCCESS:
      return { ...state, [action.payload.type]: action.payload.performances };
    case ActionTypes.GET_FOLLOWERS_SUCCESS:
      return { ...state, followers: action.payload };
    case ActionTypes.GET_FOLLOWERS_FAILURE:
      return { ...state, followers: [] };
    case ActionTypes.GET_FOLLOWINGS_SUCCESS:
      return { ...state, followings: action.payload };
    case ActionTypes.GET_FOLLOWINGS_FAILURE:
      return { ...state, followings: [] };
    case ActionTypes.GET_PERFORMANCE_COUNT_SUCCESS:
      return { ...state, performanceCount: action.payload.count };
    case ActionTypes.GET_FOLLOWING_COUNT_SUCCESS:
      return { ...state, followingCount: action.payload.count };
    case ActionTypes.GET_FOLLOWER_COUNT_SUCCESS:
      return { ...state, followerCount: action.payload.count };
    case ActionTypes.RESET_PERFORMANCE:
      return { ...state, [action.payload]: [] };
    case ActionTypes.SET_USER_OTHER_INFO:
      return { ...state, userOtherInfo: action.payload };
    default:
      return state;
  }
}

export default reducer;
