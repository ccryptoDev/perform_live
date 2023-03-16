import { call, put } from 'redux-saga/effects';

import AppConstants from 'app/app.constants.json';
import api from './api.saga';
import config from '../../config/index.config';
import { throwException } from '../common';
import plToast from '../toast';

export function* apiErrorHandler(
  response,
  apiConfig,
  customError = false,
  action = {},
) {
  const { status, body } = response;
  if (!apiConfig.intercept) {
    if (action && action.offline) {
      yield put({ type: 'offline/ACTION_EXEC_ERROR', action });
    }
    return yield call(throwException, response);
  }

  if (!customError) {
    switch (true) {
      case status >= 400 && status < 500:
        plToast.error(
          body.message || AppConstants.GLOBAL_ERRORS.MESSAGE.DATA_ERROR,
        );
        break;
      case status >= 500 && status < 600:
        plToast.error(AppConstants.GLOBAL_ERRORS.MESSAGE.SERVER_ERROR);
        break;
      default:
        plToast.error(AppConstants.GLOBAL_ERRORS.MESSAGE.ERROR);
    }
  }

  if (action && action.offline) {
    yield put({ type: 'offline/ACTION_EXEC_ERROR', action });
  }
  // yield call(retryApi, apiConfig, response); // Keep retrying until MAX_RETRIES is reached
  // return response;
  return yield call(throwException, response);
}

export function* retryApi(apiConfig, errorResponse) {
  const { retryCount } = apiConfig;
  const apiConfigToHit = { ...apiConfig, retryCount: retryCount + 1 };
  if (apiConfig.retryCount >= config.API_MAX_RETRIES) {
    return yield call(throwException, errorResponse); // return error instead, if you want the caller to get the response;
  }
  return yield call(api, apiConfigToHit);
}
