/**
 *
 * ProductCreate reducer
 *
 */

import { ActionTypes } from './productCreate.types';

const initialState = {
  galleryImages: [],
  productGallery: [],
  productInfo: {},
  isProductCreated: false,
  galleryCounts: 0,
  swapImagesOrder: false,
  updateProduct: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPLOAD_GALLERY_SUCCESS:
      return { ...state, galleryImages: action.payload };
    case ActionTypes.CREATE_PRODUCT_SUCCESS:
      return { ...state, productInfo: action.payload };
    case ActionTypes.UPDATE_PRODUCT_GALLERY_SUCCESS: {
      const { productGallery } = state;
      productGallery.push(action.payload);
      return { ...state, productGallery: [...productGallery] };
    }
    case ActionTypes.UPDATE_PRODUCT_GALLERY_ORDER_SUCCESS:
      return { ...state, swapImagesOrder: action.payload };

    case ActionTypes.RESET_PRODUCT_DATA:
      return {
        ...state,
        isProductCreated: false,
        galleryImages: [],
        productInfo: {},
      };
    default:
      return state;
  }
}

export default reducer;
