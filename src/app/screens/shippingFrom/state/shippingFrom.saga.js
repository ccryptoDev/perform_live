/**
 *
 * ShipingFrom Sagas
 *
 */

// import { call, put, takeEvery } from 'redux-saga/effects';
// import { ActionTypes } from './shippingFrom.types';
// import { api } from '../shippingFrom.dependencies';
// import { dataLoadedSuccess } from './shippingFrom.actions';

/* export function* getDataFromAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'API_NAME', // Add API mapping to module's `api.json` file
      method: 'GET',
      query: payload,
    });

    yield put(dataLoadedSuccess(result.body.data));
  } catch (error) {
    console.error('Error during API call!', error);
  }
} */

/**
 * Root saga manages watcher lifecycle
 */
export default function* () {
  // yield takeEvery(ActionTypes.GET_DATA_FROM_API, getDataFromAPI);
}
