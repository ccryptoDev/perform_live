/**
 * 
 * Profile reducer
 * 
 */

import { ActionTypes } from './profile.types';

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
  avatarUrl: {}
}

let newState = {};

function reducer (state = initialState, action) {
  switch(action.type) {
    case ActionTypes.GET_ONE_PERFORMANCES_SUCCESS:
      return { ...state, [action.payload.type]: state[action.payload.type].concat(action.payload.performances) };
    case ActionTypes.GET_ONE_PERFORMANCES_FAILURE:
      return { ...state, [action.payload.type]: [] };
    case ActionTypes.GET_FIRST_PERFORMANCE_SUCCESS:
      return { ...state, [action.payload.type]: action.payload.performances };
    case ActionTypes.GET_FOLLOWERS_SUCCESS:
      return { ...state, followers: action.payload };
    case ActionTypes.GET_FOLLOWERS_FAILURE:
      return { ...state, followers: [] };

    case ActionTypes.POST_FILE_UPLOAD_SUCCESS:
      return { ...state, avatarUrl: action.payload};

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
      return { ...state, [action.payload]: []};
    case ActionTypes.DELETE_PERFORMANCE_SUCCESS:
      let { draft, performanceCount } = state;
      draft = draft.filter(x => x.id !== action.payload);
      performanceCount = performanceCount - 1;
      return { ...state, draft, performanceCount };
    case ActionTypes.TOGGLE_FOLLOW_SUCCESS:
      let { followings, followingCount, followers, followerCount } = state;
      followings = followings.filter(x => x.id !== action.payload);
      followingCount = followings.length;
      followers = followers.map(follower => {
        if(follower.performer.id === action.payload) {
          follower.followedByMe = !follower.followedByMe;
        }
        return follower;
      });
      followerCount = followers.length;
      return { ...state, followings, followingCount, followers, followerCount };
    default:
      return state;
  }
}

export default reducer;