/**
 *
 * ProductCreate actions
 *
 */

import { ActionTypes } from './productCreate.types';

export function uploadGallery(payload) {
  return {
    type: ActionTypes.UPLOAD_GALLERY,
    payload,
  };
}

export function uploadGallerySuccess(payload) {
  return {
    type: ActionTypes.UPLOAD_GALLERY_SUCCESS,
    payload,
  };
}

export function createProduct(payload) {
  return {
    type: ActionTypes.CREATE_PRODUCT,
    payload,
  };
}

export function createProductSuccess(payload) {
  return {
    type: ActionTypes.CREATE_PRODUCT_SUCCESS,
    payload,
  };
}

export function updateProductGalleryOrder(payload) {
  return {
    type: ActionTypes.UPDATE_PRODUCT_GALLERY_ORDER,
    payload,
  };
}

export function updateProductGalleryOrderSuccess(payload) {
  return {
    type: ActionTypes.UPDATE_PRODUCT_GALLERY_ORDER_SUCCESS,
    payload,
  };
}

export function updateProductGallery(payload) {
  return {
    type: ActionTypes.UPDATE_PRODUCT_GALLERY,
    payload,
  };
}

export function updateProductGallerySuccess(payload) {
  return {
    type: ActionTypes.UPDATE_PRODUCT_GALLERY_SUCCESS,
    payload,
  };
}

export function resetProductData(payload) {
  return {
    type: ActionTypes.RESET_PRODUCT_DATA,
    payload,
  };
}

export function deleteProductImage(payload) {
  return {
    type: ActionTypes.DELETE_PRODUCT_IMAGE,
    payload,
  };
}

export function updateProduct(payload) {
  return {
    type: ActionTypes.UPDATE_PRODUCT,
    payload,
  };
}
