/**
 *
 * ProductManagement actions
 *
 */

import { ActionTypes } from './productManagement.types';

export function defaultAction(payload) {
  return {
    type: ActionTypes.DEFAULT_ACTION,
    payload,
  };
}

export function resetState(payload) {
  return {
    type: ActionTypes.RESET_STATE,
    payload,
  };
}

export function addPerformanceProduct(payload) {
  return {
    type: ActionTypes.ADD_PERFORMANCE_PRODUCTS,
    payload,
  };
}

export function deletePerformanceProduct(payload) {
  return {
    type: ActionTypes.DELETE_PERFORMANCE_PRODUCT,
    payload,
  };
}

export function getPerformanceProducts(payload) {
  return {
    type: ActionTypes.GET_PERFORMANCE_PRODUCTS,
    payload,
  };
}

export function setPerformanceProducts(payload) {
  return {
    type: ActionTypes.SET_PERFORMANCE_PRODUCTS,
    payload,
  };
}

export function getProductEarnPrice(payload) {
  return {
    type: ActionTypes.GET_PRODUCT_EARN_PRICE,
    payload,
  };
}

export function setProductEarnPrice(payload) {
  return {
    type: ActionTypes.SET_PRODUCT_EARN_PRICE,
    payload,
  };
}

export function getProductPriceFromEarn(payload) {
  return {
    type: ActionTypes.GET_PRODUCT_PRICE_FROM_EARN,
    payload,
  };
}

export function setProductPriceFromEarn(payload) {
  return {
    type: ActionTypes.SET_PRODUCT_PRICE_FROM_EARN,
    payload,
  };
}

// export function getPerformerProducts(payload) {
//   return {
//     type: ActionTypes.GET_PERFORMER_PRODUCTS,
//     payload,
//   };
// }

// export function setPerformerProducts(payload) {
//   return {
//     type: ActionTypes.SET_PERFORMER_PRODUCTS,
//     payload,
//   };
// }
