import { useQuery } from 'react-query';
import { city } from './city';

export const useCities = () => useQuery(['cities'], () => city.getAll());