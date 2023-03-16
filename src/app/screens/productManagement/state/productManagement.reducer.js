/**
 *
 * ProductManagement reducer
 *
 */

import { ActionTypes } from './productManagement.types';

const initialState = {
  defaultState: null,
  performanceProducts: [],
  performerProducts: [],
  productEarnPrice: 0,
  productPriceFromEarn: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_PERFORMANCE_PRODUCTS:
      return { ...state, performanceProducts: action.payload };
    case ActionTypes.SET_PRODUCT_EARN_PRICE:
      return { ...state, productEarnPrice: action.payload };
    case ActionTypes.SET_PRODUCT_PRICE_FROM_EARN:
      return { ...state, productPriceFromEarn: action.payload };
    case ActionTypes.RESET_STATE:
      return { ...initialState };
    // case ActionTypes.SET_PERFORMER_PRODUCTS:
    //   return { ...state, performanceProducts: action.payload };
    default:
      return state;
  }
}

export default reducer;
