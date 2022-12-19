import { useQuery } from 'react-query';
import { lot } from './lot';

export const useLots = (cityId) => useQuery({
  queryKey: [`city-${cityId}-lots`],
  queryFn: () => lot.getAll(cityId),
  enabled: cityId !== '',
});