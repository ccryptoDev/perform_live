/**
 * Create the store with dynamic reducers
 */

import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose } from 'redux';
import {
  configureStore as configureStoreToolkit,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createReducer from 'app/utils/createReducer';
import {
  offlineMiddleware,
  offlineReducer,
  offlineStoreEnhancer,
} from 'lib/offlineSync';
import globalReducer from 'app/state/app.reducer';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with saga middleware
  const middlewares = [
    offlineMiddleware,
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [offlineStoreEnhancer, applyMiddleware(...middlewares)];

  const preLoadedReducers = {
    global: globalReducer,
    offline: offlineReducer,
    router: connectRouter(history),
  };

  const store = configureStoreToolkit({
    preloadedState: initialState,
    reducer: createReducer(preLoadedReducers),
    enhancers,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  const persistor = persistStore(store);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  store.persistor = persistor;
  store.preLoadedReducers = preLoadedReducers;

  // sagaMiddleware.run(sagas);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./app/utils/createReducer', () => {
      store.replaceReducer(
        createReducer(preLoadedReducers, store.injectedReducers),
      );
    });
  }

  return { persistor, store };
}
