/**
 *
 * PerformanceScheduler reducer
 *
 */

import { ActionTypes } from './performanceScheduler.types';

const initialState = {
  defaultState: null,
  showPlanModal: false,
  uploadPreviewUrl: '',
  performanceCoverUrl: '',
  performanceScheduleSuccess: false,
  activePerformance: {
    stageEnabled: true,
    giftEnabled: true,
    productList: [],
  },
  activePerformanceProducts: [],
  deletePFSuccess: false,
  performerTagOptions: [],
  isTagAvailable: true,
  saveAsDraftSuccess: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPLOAD_PREVIEW_SUCCESS: {
      if (!action.payload.length) {
        // Reset data
        return {
          ...state,
          uploadPreviewUrl: '',
          performanceCoverUrl: '',
        };
      }

      const videoUrl = action.payload.find(
        file => file.url.indexOf('.mp4') !== -1,
      );
      const coverUrl = action.payload.find(
        file => file.url.indexOf('.mp4') === -1,
      );
      return {
        ...state,
        uploadPreviewUrl: (videoUrl && videoUrl.url) || state.uploadPreviewUrl,
        performanceCoverUrl:
          (coverUrl && coverUrl.url) || state.performanceCoverUrl,
      };
    }

    case ActionTypes.CREATE_PERFORMANCE_SUCCESS:
      return { ...state, performanceScheduleSuccess: action.payload };

    case ActionTypes.SET_PERFORMANCE_DATA:
      return {
        ...state,
        activePerformance: { ...state.activePerformance, ...action.payload },
      };
    case ActionTypes.SET_PERFORMANCE_PRODUCT: {
      //  state.activePerformance.productList = [...action.payload];
      return {
        ...state,
        activePerformanceProducts: action.payload,
      };
    }
    case ActionTypes.DELETE_PERFORMANCE_SUCCESS:
      return {
        ...state,

        deletePFSuccess: true,
      };
    case ActionTypes.SET_PERFORMER_TAG_OPTIONS:
      return { ...state, performerTagOptions: action.payload };
    case ActionTypes.SET_PERFORMER_TAG:
      return { ...state, isTagAvailable: action.payload };
    case ActionTypes.SET_INITIAL_STATE:
      return { ...initialState };
    case ActionTypes.RESET_VIDEO_PREVIEW:
      return { ...state, uploadPreviewUrl: '' };
    case ActionTypes.RESET_COVER:
      return { ...state, performanceCoverUrl: '' };
    case ActionTypes.SAVE_AS_DRAFT_SUCCESS:
      return { ...state, saveAsDraftSuccess: action.payload };

    default:
      return state;
  }
}

export default reducer;
