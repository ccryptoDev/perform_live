import { createAction } from '@reduxjs/toolkit';

export const getPerformanceList = createAction('app/home/PERFORMANCE_LIST');
export const dataLoadedSuccess = createAction('app/home/GET_PERFORMANCE_LIST');
export const resetPerformanceData = createAction(
  'app/home/PERFORMANCE_LIST_RESET',
);
export const setClickedCard = createAction('app/home/SET_CLICKED_CARD');
