import { useQuery } from 'react-query';
import useApi from './api';

export const usePerformanceProducts = performanceId => {
  const { getPerformanceIdIdProduct } = useApi('performer');
  const { data = [] } = useQuery('performanceProducts', () =>
    getPerformanceIdIdProduct(performanceId, { gallery: true }),
  );

  return {
    performanceProducts: data,
  };
};
