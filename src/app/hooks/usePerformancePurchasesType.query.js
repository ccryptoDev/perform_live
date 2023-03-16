import { useMemo } from 'react';
import { useQuery } from 'react-query';
import useApi from './api';

export const usePerformancePurchasesType = type => {
  const { getPerformancePurchasesType } = useApi('performer');
  const { data: options = [] } = useQuery(['performancePurchases', type], () =>
    getPerformancePurchasesType(type),
  );

  const dropdownOptions = useMemo(
    () =>
      options
        .map(el => ({ label: el.label, value: el.id }))
        .sort((el1, el2) => {
          if (el1.label.toLowerCase() === 'free') return -1;
          return 1;
        }),
    [options],
  );

  return {
    options,
    dropdownOptions,
  };
};
