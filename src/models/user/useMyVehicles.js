import { useQuery } from 'react-query';
import { user } from './user';

export const useMyVehicles = () => useQuery(['my-vehicles'], () => user.getVehicles());