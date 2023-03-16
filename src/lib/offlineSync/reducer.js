import storage from 'redux-persist/lib/storage'; // default: localStorage if web, AsyncStorage if react-native
import {
  // createMigrate,
  createTransform,
  persistReducer,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import _cloneDeep from 'lodash/cloneDeep';
import _omit from 'lodash/omit';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

import { ActionTypes } from './actionTypes';

// The initial state of the App
const initialState = {
  offlineQueue: [],
  isQueueProcessing: false,
};

/* const migrations = {
  0: state => ({
    // migration clear out offlineQueue
    ...state,
    isQueueProcessing: null,
  }),
  // 1: state => ({
  //   // migration to change to another state
  //   ...state,
  //   isQueueProcessing: false,
  // }),
}; */

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_ACTION_TO_QUEUE: {
      const newState = _cloneDeep(state);
      newState.offlineQueue.push({
        isActionProcessing: false,
        ...action.payload,
      });
      return newState;
    }
    case ActionTypes.REMOVE_ACTION_FROM_QUEUE: {
      const newState = _cloneDeep(state);
      newState.offlineQueue.shift();
      return newState;
    }
    case ActionTypes.ACTION_EXEC_SUCCESS: {
      const newState = _cloneDeep(state);
      newState.offlineQueue.splice(
        _findIndex(newState.offlineQueue, {
          id: action.action.id,
        }),
        1,
      );
      return newState;
    }
    case ActionTypes.ACTION_EXEC_ERROR: {
      const newState = _cloneDeep(state);
      const actionEntry = _find(newState.offlineQueue, {
        id: action.action.id,
      });
      actionEntry.isActionProcessing = false;
      return newState;
    }
    case ActionTypes.SET_QUEUE_PROCESSING_STATUS:
      return { ...state, isQueueProcessing: true };
    case ActionTypes.UNSET_QUEUE_PROCESSING_STATUS:
      return { ...state, isQueueProcessing: false };
    case ActionTypes.RESET_QUEUE:
      return { ...state, offlineQueue: [] };
    case ActionTypes.SET_ACTION_PROCESSING_STATUS: {
      const newState = _cloneDeep(state);
      const actionEntry = _find(newState.offlineQueue, {
        id: action.payload.id,
      });
      actionEntry.isActionProcessing = true;
      return newState;
    }
    default:
      return state;
  }
}

export default persistReducer(
  {
    key: 'offline',
    storage,
    blacklist: ['isQueueProcessing'],
    stateReconciler: autoMergeLevel2,
    // version: 0,
    // migrate: createMigrate(migrations, { debug: true }),
    transforms: [
      createTransform((inboundState, key) => {
        if (key === 'offlineQueue') {
          const sanitizedQueue = _map(inboundState, obj =>
            _omit(obj, 'isActionProcessing'),
          );
          return sanitizedQueue;
        }
        return inboundState;
      }),
    ],
  },
  reducer,
);
