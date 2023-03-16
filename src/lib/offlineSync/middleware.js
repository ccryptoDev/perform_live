import _filter from 'lodash/filter';
import _keys from 'lodash/keys';
import _includes from 'lodash/includes';
import _forEach from 'lodash/forEach';
import _find from 'lodash/find';
import _get from 'lodash/get';

import {
  addActionToQueue,
  setQueueProcessingStatus,
  unsetQueueProcessingStatus,
  setActionProcessingStatus,
} from './actions';
import { isNetworkOnline } from './detectNetwork';

export const processQueue = store => {
  const fullQueueSnapshot = store.getState().offline.offlineQueue;
  console.log('Current Full Queue Snapshot', fullQueueSnapshot);

  if (fullQueueSnapshot.length > 0) {
    const reducersRegistered = _keys(store.getState());

    if (!store.getState().offline.isQueueProcessing) {
      // Set queue processing to true
      store.dispatch(setQueueProcessingStatus());
    }

    // Get all entries from Queue to be processed & can be processed in parallel.
    // Also check if the reducer/saga for that entry is injected or not.
    const toBeProcessed = _filter(
      fullQueueSnapshot,
      entry =>
        !entry.isActionProcessing &&
        entry.offline.parallel &&
        _includes(reducersRegistered, entry.offline.reducerName),
    );

    // Get the topmost entry with parallel false only if topmost non-parallel entry is not processing currently (sorted by ts ASC)
    const topSequentialEntryToProcess = _find(
      fullQueueSnapshot,
      entry =>
        !entry.offline.parallel &&
        _includes(reducersRegistered, entry.offline.reducerName),
    );
    if (
      topSequentialEntryToProcess &&
      !_get(topSequentialEntryToProcess, 'isActionProcessing', false)
    ) {
      toBeProcessed.push(topSequentialEntryToProcess);
    }

    console.log('Filtered queue entries', toBeProcessed);

    _forEach(toBeProcessed, entry => {
      // pass action to next middleware (saga)
      store.dispatch(entry);
      // set action processing status to true
      store.dispatch(setActionProcessingStatus(entry));
    });

    // Set queue processing status to false
    store.dispatch(unsetQueueProcessingStatus());
  }
};

export const offlineMiddleware = store => next => async action => {
  // Bypass middleware if no offline props set or if an existing action is being dispatched from queue
  if (!action.offline || (action.offline && action.ts)) {
    return next(action);
  }

  const ts = Date.now();
  const result = store.dispatch(
    addActionToQueue({
      ...action,
      // id: <custom_id>, currently timestamp
      id: ts,
      ts,
    }),
  );

  const isOnline = await isNetworkOnline();
  if (isOnline && !store.getState().offline.isQueueProcessing) {
    // Process Queue if not processing already
    processQueue(store);
  }

  return result;
};
