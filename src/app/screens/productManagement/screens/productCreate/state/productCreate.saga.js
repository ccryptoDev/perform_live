/**
 *
 * ProductCreate Sagas
 *
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from './productCreate.types';
import { api } from '../productCreate.dependencies';
import {
  uploadGallerySuccess,
  createProductSuccess,
  resetProductData,
  updateProductGallerySuccess,
  updateProductGalleryOrderSuccess,
} from './productCreate.actions';
import { resetState } from '../../../state/productManagement.actions';
import plToast from '../../../../../utils/toast';

export function* uploadGalleryApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'UPLOAD_GALLERY', // Add API mapping to module's `api.json` file
      method: 'POST',
      data: payload,
      headers: {
        'Content-Type': null,
      },
    });

    yield put(uploadGallerySuccess(result.body));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* createProductApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'CREATE_PRODUCT', // Add API mapping to module's `api.json` file
      method: 'POST',
      data: payload,
    });

    yield put(createProductSuccess(result.body));
    yield put(resetState());
    plToast.success('Product has been created successfully');
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* updateProductApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'UPDATE_PRODUCT', // Add API mapping to module's `api.json` file
      method: 'PUT',
      data: payload.data,
      paramsToReplace: payload.paramsToReplace,
    });

    yield put(createProductSuccess(result.body));
    plToast.success('Product has been updated successfully');
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* updateProductGalleryApi({ payload }) {
  try {
    for (let i = 0; i < payload.galleryImages.length; i++) {
      const result = yield call(api, {
        endpoint: 'UPDATE_PRODUCT_GALLERY', // Add API mapping to module's `api.json` file
        method: 'POST',
        data: { imageUrl: payload.galleryImages[i].url },
        paramsToReplace: payload.paramsToReplace,
      });

      yield put(resetProductData({}));
      yield put(updateProductGallerySuccess(result.body));
    }
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* updateProductGalleryOrderApi({ payload }) {
  try {
    yield call(api, {
      endpoint: 'UPDATE_PRODUCT_GALLERY', // Add API mapping to module's `api.json` file
      method: 'PUT',
      data: payload.data,
      paramsToReplace: payload.paramsToReplace,
    });

    yield put(resetProductData({}));
    yield put(updateProductGalleryOrderSuccess(true));
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

export function* deleteProductImageApi({ payload }) {
  try {
    yield call(api, {
      endpoint: 'DELETE_PRODUCT_IMAGE', // Add API mapping to module's `api.json` file
      method: 'DELETE',
      paramsToReplace: payload.paramsToReplace,
    });

    yield put(resetProductData({}));
    yield put(updateProductGallerySuccess());
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  yield takeEvery(ActionTypes.UPLOAD_GALLERY, uploadGalleryApi);
  yield takeEvery(ActionTypes.CREATE_PRODUCT, createProductApi);
  yield takeEvery(ActionTypes.UPDATE_PRODUCT_GALLERY, updateProductGalleryApi);
  yield takeEvery(ActionTypes.DELETE_PRODUCT_IMAGE, deleteProductImageApi);
  yield takeEvery(ActionTypes.UPDATE_PRODUCT, updateProductApi);
  yield takeEvery(
    ActionTypes.UPDATE_PRODUCT_GALLERY_ORDER,
    updateProductGalleryOrderApi,
  );
}
