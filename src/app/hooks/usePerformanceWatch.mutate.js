import { useEffect } from 'react';
import { useMutation } from 'react-query';
import useApi from './api';

export const usePerformanceWatch = id => {
  const { putPerformerPerformanceIdIdWatch } = useApi('performer');
  const watch = useMutation(putPerformerPerformanceIdIdWatch);

  useEffect(
    () => {
      if (id) watch.mutate(id);
    },
    [id],
  );
};
