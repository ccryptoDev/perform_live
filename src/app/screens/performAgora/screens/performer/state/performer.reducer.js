/**
 *
 * Performer reducer
 *
 */

import { ActionTypes } from './performer.types';

const initialState = {
  deviceStatus: false,
  settingComponent: null,
  allowedForLive: false,
  activeInvitedAudience: {},
  activeStageAudience: {},
  stageRequest: {
    request: false,
    data: {},
  },
  userState: {
    joined: false,
    joinedAt: '',
  },
  removeUser: {
    state: '',
    userDetials: {},
  },
  // status: 'invited/remove from performance'
  inviteAudience: {
    state: '',
    userDetials: {},
  },
  activeStageUser: {
    active: false,
    data: {},
  },
  recordingData: {},
  queryRecordingStatus: null,
  recordingToken: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.DEFAULT_ACTION:
      return { ...state, defaultState: action.payload };
    case ActionTypes.ALLOW_TO_DEVICES_STATUS:
      return { ...state, deviceStatus: action.payload.status };
    case ActionTypes.UPDATE_SETTING_COMPONENT:
      return { ...state, settingComponent: action.payload.component };
    case ActionTypes.ALLOW_LIVE_PERFORMACE:
      return { ...state, allowedForLive: action.payload.allowedForLive };
    case ActionTypes.STAGE_REQUEST: {
      if (state.stageRequest.request && action.payload.request) return state;
      return { ...state, stageRequest: { ...action.payload } };
    }
    case ActionTypes.USER_STATE:
      return { ...state, userState: action.payload };
    case ActionTypes.REMOVE_USER_PERFORMANCE:
      return { ...state, removeUser: action.payload };
    case ActionTypes.INVITE_AUDIENCE:
      return { ...state, inviteAudience: action.payload };
    case ActionTypes.SET_ACTIVE_STAGE_USER:
      return { ...state, activeStageUser: action.payload };
    case ActionTypes.SET_ACTIVE_INVITED_AUDIENCE: {
      const prevData = { ...state.activeInvitedAudience };
      if (action.payload.action === 'delete') {
        delete prevData[action.payload.id];
      } else {
        prevData[action.payload.id] = action.payload;
      }

      return {
        ...state,
        activeInvitedAudience: {
          ...prevData,
        },
      };
    }

    case ActionTypes.SET_ACTIVE_STAGE_AUDIENCE: {
      const prevData = { ...state.activeStageAudience };
      if (action.payload.action === 'delete') {
        delete prevData[action.payload.id];
      } else {
        prevData[action.payload.id] = action.payload;
      }

      return {
        ...state,
        activeStageAudience: {
          ...prevData,
        },
      };
    }
    case ActionTypes.START_RECORDING_SUCCESS:
      return { ...state, recordingData: action.payload };
    case ActionTypes.QUERY_RECORDING_STATUS:
      return { ...state, queryRecordingStatus: action.payload };
    case ActionTypes.SET_RECORDING_TOKEN:
      return { ...state, recordingToken: action.payload };
    case ActionTypes.RESET_PERFORMER_STATE:
      return { ...initialState };
    default:
      return state;
  }
}

export default reducer;
