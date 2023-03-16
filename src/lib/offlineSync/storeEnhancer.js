import _includes from 'lodash/includes';
import _keys from 'lodash/keys';

import { processQueue } from './middleware';
import { registerConnectivityListener } from './detectNetwork';

export const offlineStoreEnhancer = createStore => (reducer, initialState) => {
  const store = createStore(reducer, initialState);

  let isNetworkListenerRegistered = false;
  let currentOfflineQueueLength = 0;
  let currentRegisteredReducersCount = 0;

  store.subscribe(() => {
    if (
      !isNetworkListenerRegistered &&
      _includes(_keys(store.getState(), 'offline'))
    ) {
      isNetworkListenerRegistered = true;
      registerConnectivityListener(isOnline => {
        console.log('Is Network Online', isOnline);
        if (isOnline && !store.getState().offline.isQueueProcessing) {
          // Process Queue if not processing already
          processQueue(store);
        }
      });
    }

    const prevRegisteredReducersCount = currentRegisteredReducersCount;
    currentRegisteredReducersCount = _keys(store.getState());
    if (
      prevRegisteredReducersCount !== 0 &&
      currentRegisteredReducersCount > prevRegisteredReducersCount
    ) {
      // Call Process Queue when store registered keys changes in length i.e. new reducers injected
      processQueue(store);
    }

    const prevOfflineQueueLength = currentOfflineQueueLength;
    currentOfflineQueueLength = store.getState().offline.offlineQueue.length;
    if (prevOfflineQueueLength > currentOfflineQueueLength) {
      processQueue(store);
    }
  });

  return store;
};
