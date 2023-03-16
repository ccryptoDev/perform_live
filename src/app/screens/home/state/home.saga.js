import { call, put, takeEvery } from 'redux-saga/effects';
import { api } from '../home.dependencies';
import { dataLoadedSuccess, getPerformanceList } from './home.actions';

export function* getPerformanceDataApi({ payload }) {
  try {
    const result = yield call(api, {
      endpoint: 'GET_PERFORMANCE_LIST', // Add API mapping to module's `api.json` file
      method: 'GET',
      paramsToReplace: payload.paramsToReplace,
      queryParams: payload.queryParams,
    });

    if (result.body.length) {
      yield put(
        dataLoadedSuccess({
          state: result.body[0].state,
          data: result.body,
        }),
      );
    }
  } catch (error) {
    console.error('Error during API call!', error);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function*() {
  yield takeEvery(getPerformanceList, getPerformanceDataApi);
}
