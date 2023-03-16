/**
 *
 * PerformanceScheduler Sagas
 *
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from './performanceScheduler.types';
import { api } from '../performanceScheduler.dependencies';
import {
  uploadPreviewSuccess,
  createPerformanceSuccess,
  setPerformanceData,
  deletePerformanceSuccess,
  setPerformerTagOptions,
  setPerformerTag,
  setPerformanceProducts,
  resetVideoPreview,
  saveAsDraftSuccess,
} from './performanceScheduler.actions';
import { getPerformanceInfoAPI } from '../../performAgora/state/performAgora.saga';
import { getPerformanceProductsAPI } from '../../productManagement/state/productManagement.saga';
import plToast from '../../../utils/toast';

export function* uploadPreviewApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'UPLOAD_PREVIEW', // Add API mapping to module's `api.json` file
      method: 'POST',
      data: payload,
      headers: {
        'Content-Type': null,
      },
    });

    yield put(uploadPreviewSuccess(result.body));
    plToast.success('Performance preview has been saved successfully');
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* createPerformanceApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'CREATE_PERFORMANCE', // Add API mapping to module's `api.json` file
      method: 'POST',
      data: payload.performanceData,
    });

    // payload.performancePreviewInfo.id = result.body.id;
    // if (payload.performancePreviewInfo.previewVideoUrl) {
    //   yield createPerformancePreviewApi(payload.performancePreviewInfo);
    // }
    // for (let i = 0; i < payload.performanceProducts.length; i++) {
    //   yield addPerformanceProductsApi({
    //     payload: {
    //       productId: payload.performanceProducts[i],
    //       performanceId: result.body.id,
    //     },
    //   });
    // }

    if (result.body.state === 'draft') {
      yield put(setPerformanceData(result.body));
      yield put(saveAsDraftSuccess(true));
    } else {
      yield put(createPerformanceSuccess(true));
    }

    // yield put(uploadPreviewSuccess([]));
    // plToast.success('Performance has been created successfully');
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* createPerformancePreviewApi(payload) {
  try {
    const result = yield call(api, {
      endpoint: 'CREATE_PERFORMANCE_PREVIEW', // Add API mapping to module's `api.json` file
      method: 'POST',
      data: {
        videoUrl: payload.previewVideoUrl,
        name: payload.name,
        details: payload.details,
      },
      paramsToReplace: { id: payload.id },
    });
  } catch (error) {
    console.error('Error during API call!', error);
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
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* updatePerformanceApi({ payload }) {
  try {
    yield put(saveAsDraftSuccess(false));
    let result;
    if (
      payload.step === 1 ||
      payload.step === 3 ||
      payload.performanceData.state === 'published'
    ) {
      result = yield call(api, {
        endpoint: 'UPDATE_PERFORMANCE', // Add API mapping to module's `api.json` file
        method: 'PUT',
        data: payload.performanceData,
        paramsToReplace: payload.paramsToReplace,
      });
    }

    payload.performancePreviewInfo.id = payload.paramsToReplace.id;
    if (payload.performancePreviewInfo.previewVideoUrl && payload.step === 3) {
      yield createPerformancePreviewApi(payload.performancePreviewInfo);
    }
    if (payload.step === 2) {
      // add performance products
      for (let i = 0; i < payload.newProductsToAdd.length; i++) {
        yield addPerformanceProductsApi({
          payload: {
            productId: payload.newProductsToAdd[i],
            performanceId: payload.paramsToReplace.id,
          },
        });
      }
      yield put(setPerformanceProducts(payload.performanceProducts));

      // Delete product if any
      for (let i = 0; i < payload.deletedProducts.length; i++) {
        yield deletePerformanceProductApi({
          payload: {
            paramsToReplace: {
              productId: payload.deletedProducts[i],
              id: payload.paramsToReplace.id,
            },
          },
        });
      }
    }

    if (
      payload.step === 1 ||
      payload.step === 3 ||
      payload.performanceData.state === 'published'
    ) {
      if (payload.step !== 4) {
        if (payload.step === 1) {
          result.body.categories = payload.performanceData.categories;
        }
        yield put(setPerformanceData(result.body));
      } else {
        yield put(createPerformanceSuccess(true));
      }
    }
    yield put(saveAsDraftSuccess(true));
    // yield put(uploadPreviewSuccess([]));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* deletePerformanceApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'DELETE_PERFORMANCE', // Add API mapping to module's `api.json` file
      method: 'DELETE',
      paramsToReplace: payload.paramsToReplace,
    });

    yield put(deletePerformanceSuccess());
    plToast.success('Performance has been deleted successfully');
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* deletePerformanceProductApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'DELETE_PERFORMANCE_PRODUCTS', // Add API mapping to module's `api.json` file
      method: 'DELETE',
      paramsToReplace: payload.paramsToReplace,
    });

    // yield put(deletePerformanceSuccess());
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* getPerformerTagOptionsApi() {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMER_TAG_OPTIONS', // Add API mapping to module's `api.json` file
      method: 'GET',
    });

    yield put(setPerformerTagOptions(result.body));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* getVerifyPerformerTagApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'VERIFY_PERFORMER_TAG', // Add API mapping to module's `api.json` file
      method: 'GET',
      paramsToReplace: payload.paramsToReplace,
    });

    yield put(setPerformerTag(result.body.success || false));
  } catch (error) {
    yield put(setPerformerTag(false));
    console.error(error.message);
  }
}

export function* getPerformanceInfos({ payload }) {
  try {
    // Get performance info along with it's performer & preview video info
    const result = yield call(getPerformanceInfoAPI, { payload });
    // Get performance categories
    const categories = yield call(getPerformanceCategoriesApi, {
      payload: { paramsToReplace: { id: result.id } },
    });
    result.categories = categories;
    // Get performance products info
    const performanceProducts = yield call(getPerformanceProductsAPI, {
      payload,
    });
    const productsIds = performanceProducts.map(product => product.id);
    yield put(setPerformanceProducts(productsIds));
    yield put(setPerformanceData(result));
    const previewInfo = [];
    if (result.videoUrl) {
      previewInfo.push({ url: result.videoUrl });
    }
    if (result.coverUrl) {
      previewInfo.push({ url: result.coverUrl });
    }
    yield put(uploadPreviewSuccess(previewInfo));
  } catch (error) {
    console.error(error.message);
  }
}

export function* getPerformanceCategoriesApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMANCE_CATEGORIES', // Add API mapping to module's `api.json` file
      method: 'GET',
      paramsToReplace: payload.paramsToReplace,
    });

    return result.body;
  } catch (error) {
    console.error(error.message);
  }
  return [];
}

export function* deletePerformancePreviewApi({ payload }) {
  try {
    const customError = true;
    const result = yield call(
      api,
      {
        endpoint: 'DELETE_PERFORMANCE_PREVIEW', // Add API mapping to module's `api.json` file
        method: 'DELETE',
        paramsToReplace: payload.paramsToReplace,
      },
      customError,
    );

    yield put(resetVideoPreview());
  } catch (error) {
    yield put(resetVideoPreview());
    console.error('Error during API call!', error);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  yield takeEvery(ActionTypes.UPLOAD_PREVIEW, uploadPreviewApi);
  yield takeEvery(ActionTypes.CREATE_PERFORMANCE, createPerformanceApi);
  yield takeEvery(ActionTypes.UPDATE_PERFORMANCE, updatePerformanceApi);
  yield takeEvery(ActionTypes.DELETE_PERFORMANCE, deletePerformanceApi);
  yield takeEvery(
    ActionTypes.GET_PERFORMER_TAG_OPTIONS,
    getPerformerTagOptionsApi,
  );
  yield takeEvery(ActionTypes.VERIFY_PERFORMER_TAG, getVerifyPerformerTagApi);
  yield takeEvery(ActionTypes.GET_PERFORMANCE_INFO, getPerformanceInfos);
  yield takeEvery(
    ActionTypes.DELETE_PERFORMANCE_PREVIEW,
    deletePerformancePreviewApi,
  );
}
