import { removeDuplicate } from '../../../utils/common';
// import { ActionTypes } from '../state/home.types';
import { createReducer } from '@reduxjs/toolkit';
import {
  dataLoadedSuccess,
  getPerformanceList,
  resetPerformanceData,
  setClickedCard,
} from './home.actions';

const initialState = {
  performanceData: [],
  live: [],
  published: [],
  past: [],
  clickedCardInfo: null,
};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase(dataLoadedSuccess, (state, action) => {
      const old = state[action.payload.state].reduce(
        (a, c) => ({ ...a, [c.id]: c }),
        {},
      );
      const newData = action.payload.data.reduce(
        (a, c) => ({ ...a, [c.id]: c }),
        old,
      );
      const sorted = Object.values(newData).sort((a, b) => {
        if (action.payload.state === 'past') {
          return Date.parse(a.startDatetime) < Date.parse(b.startDatetime)
            ? 1
            : -1;
        }
        return Date.parse(a.startDatetime) > Date.parse(b.startDatetime)
          ? 1
          : -1;
      });
      return {
        ...state,
        [action.payload.state]: sorted,
      };
    })
    .addCase(resetPerformanceData, (state, action) => {
      if (action.payload && action.payload.performanceType) {
        return {
          ...state,
          [action.payload.performanceType]: [],
        };
      }
      return { ...state, live: [], published: [], past: [] };
    })
    .addCase(setClickedCard, (state, action) => {
      state.clickedCardInfo = action.payload;
    });
});

export default reducer;
