import { useMemo } from 'react';
import { useQuery } from 'react-query';
import useApi from './api';

export const useProductPackages = () => {
  const { getPerformerProductPackages } = useApi('performer');
  const { data: options = [] } = useQuery(
    'productPackages',
    getPerformerProductPackages,
  );

  const dropdownOptions = useMemo(
    () =>
      options.map(el => ({
        label: el.name,
        value: el.id,
      })),
    [options],
  );

  return {
    options,
    dropdownOptions,
  };
};
