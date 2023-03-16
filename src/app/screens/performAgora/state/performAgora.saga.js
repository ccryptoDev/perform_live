import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from '../performAgora.dependencies';
import {
  getPerformanceInfo,
  getPerformanceJoinToken,
  setPerformanceInfo,
  setPerformanceJoinToken,
  setPerformanceState,
  setPerformanceStateFinished,
  updatePerformanceState,
  saveAgoraAnalytics,
} from './performAgora.actions';

export function* getPerformanceInfoAPI({ payload }) {
  try {
    const result = yield call(api, {
      endpoint:
        payload.from === 'performanceEdit'
          ? 'GET_PERFORMANCE_INFO_PRIVATE'
          : 'GET_PERFORMANCE_INFO',
      method: 'GET',
      paramsToReplace: payload.paramsToReplace,
    });
    let performerInfo = {};
    if (!payload.from) {
      performerInfo = yield getPerformerInfoAPI(result.body.id);
    }

    const performancePreview = yield getPerformancePreviewAPI(
      result.body.id,
      payload.from,
    );
    const performancePayload = {
      ...result.body,
      ...{ performer: performerInfo },
      videoUrl: performancePreview && performancePreview.videoUrl,
    };
    if (payload.from) {
      return performancePayload;
    }
    yield put(setPerformanceInfo(performancePayload));
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return true;
}

export function* getPerformerInfoAPI(performanceId) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMANCE_PERFORMER_INFO', // Add API mapping to module's `api.json` file
      method: 'GET',
      paramsToReplace: { id: performanceId },
    });

    return result.body;
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return true;
}

export function* getPerformancePreviewAPI(performanceId, isPrivate = null) {
  try {
    const customError = true;
    const result = yield call(
      api,
      {
        endpoint: isPrivate
          ? 'GET_PERFORMANCE_PREVIEW_PRIVATE'
          : 'GET_PERFORMANCE_PREVIEW', // Add API mapping to module's `api.json` file
        method: 'GET',
        paramsToReplace: { id: performanceId },
      },
      customError,
    );

    return result.body;
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return false;
}

export function* getPerformanceJoinTokenApi({ payload }) {
  try {
    const result = yield call(api, {
      // baseUrl: 'http://localhost:8082/api/',
      endpoint: 'GET_PERFORMANCE_JOIN_TOKEN', // Add API mapping to module's `api.json` file
      method: 'GET',
      queryParams: payload.queryParams,
    });

    yield put(setPerformanceJoinToken(result.body));
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return true;
}

export function* updatePerformanceStateApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'UPDATE_PERFORMANCE_STATUS', // Add API mapping to module's `api.json` file
      method: 'PUT',
      paramsToReplace: payload.paramsToReplace,
    });

    yield put(setPerformanceState('live'));
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return true;
}

export function* setPerformanceStateFinishedApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'SET_PERFORMANCE_STATUS_FINISH',
      method: 'PUT',
      paramsToReplace: payload.paramsToReplace,
    });

    yield put(setPerformanceState('past'));
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return true;
}

export function* saveAgoraAnalyticsApi({ payload }) {
  try {
    yield call(api, {
      endpoint: 'SAVE_AGORA_ANALYTICS',
      method: 'POST',
      paramsToReplace: payload.paramsToReplace,
      data: payload.data,
    });
  } catch (error) {
    console.error('Error during API call!', error);
  }
  return true;
}

export default function*() {
  yield takeEvery(getPerformanceInfo, getPerformanceInfoAPI);
  yield takeEvery(getPerformanceJoinToken, getPerformanceJoinTokenApi);
  yield takeEvery(updatePerformanceState, updatePerformanceStateApi);
  yield takeEvery(setPerformanceStateFinished, setPerformanceStateFinishedApi);
  yield takeEvery(saveAgoraAnalytics, saveAgoraAnalyticsApi);
}
