import { useQuery } from 'react-query';

const useEntity = ({ id, queryKey, apiFn, config }) =>
  useQuery([queryKey, id], () => apiFn(id), config);

export default useEntity;
