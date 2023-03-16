/**
 *
 * ProductManagement Sagas
 *
 */

import {
  call,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects';
import { ActionTypes } from './productManagement.types';
import { api } from '../productManagement.dependencies';
import {
  resetState,
  setPerformanceProducts,
  setProductEarnPrice,
  setProductPriceFromEarn,
  // setPerformerProducts,
} from './productManagement.actions';

export function* getPerformerProductsAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMER_PRODUCTS', // Add API mapping to module's `api.json` file
      method: 'GET',
      query: payload,
    });

    // yield put(setPerformerProducts(result.body));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* getPerformanceProductsAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint:
        payload.from === 'performanceEdit'
          ? 'GET_PERFORMANCE_PRODUCTS_PRIVATE'
          : 'GET_PERFORMANCE_PRODUCTS', // Add API mapping to module's `api.json` file
      method: 'GET',
      query: payload.queryPrams,
      paramsToReplace: payload.paramsToReplace,
    });
    if (payload.from) {
      return result.body;
    }
    yield put(setPerformanceProducts(result.body));
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return [];
}

export function* getProductEarnPriceAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PRODUCT_EARN_PRICE', // Add API mapping to module's `api.json` file
      method: 'GET',
      query: payload.queryPrams,
    });

    yield put(setProductEarnPrice(result.body.price));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* getProductPriceFromEarnAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PRODUCT_PRICE_FROM_EARN', // Add API mapping to module's `api.json` file
      method: 'GET',
      query: payload.queryPrams,
    });

    yield put(setProductPriceFromEarn(result.body.price));
  } catch (error) {
    // console.error('Error during API call!', error);
  }
}

export function* addPerformanceProductsApi({ payload }) {
  try {
    const customError = true;
    const result = yield call(
      api,
      {
        endpoint: 'ADD_PERFORMANCE_PRODUCTS', // Add API mapping to module's `api.json` file
        method: 'POST',
        paramsToReplace: {
          id: payload.performanceId,
          productId: payload.productId,
        },
      },
      customError,
    );

    // yield put(resetState());
  } catch (error) {
    // console.error('Error during API call!', error);
  }
}

export function* deletePerformanceProductsApi({ payload }) {
  try {
    const customError = true;
    const result = yield call(
      api,
      {
        endpoint: 'DELETE_PERFORMANCE_PRODUCTS', // Add API mapping to module's `api.json` file
        method: 'DELETE',
        paramsToReplace: {
          id: payload.performanceId,
          productId: payload.productId,
        },
      },
      customError,
    );

    // yield put(createPerformanceSuccess(result.body));
  } catch (error) {
    // console.error('Error during API call!', error);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  // yield takeEvery(ActionTypes.GET_PERFORMER_PRODUCTS, getPerformerProductsAPI);
  yield takeEvery(
    ActionTypes.GET_PERFORMANCE_PRODUCTS,
    getPerformanceProductsAPI,
  );
  yield takeEvery(ActionTypes.GET_PRODUCT_EARN_PRICE, getProductEarnPriceAPI);
  yield takeEvery(
    ActionTypes.GET_PRODUCT_PRICE_FROM_EARN,
    getProductPriceFromEarnAPI,
  );
  yield takeLatest(
    ActionTypes.ADD_PERFORMANCE_PRODUCTS,
    addPerformanceProductsApi,
  );

  yield takeLatest(
    ActionTypes.DELETE_PERFORMANCE_PRODUCT,
    deletePerformanceProductsApi,
  );
}
