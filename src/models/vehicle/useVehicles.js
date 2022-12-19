import { useQuery } from 'react-query';
import { vehicle } from './vehicle';

export const useVehicles = (cityId, lotId) => useQuery({
  queryKey: [`city-${cityId}-lot-${lotId}-vehicles`],
  queryFn: () => vehicle.getAll(cityId, lotId),
  enabled: cityId !== '' && lotId !== '',
});