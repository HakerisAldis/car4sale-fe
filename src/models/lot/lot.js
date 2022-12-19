import { generatePath } from 'react-router';
import { api } from '../../services/api';

const URL = {
  GETALL: '/api/city/:id/lot',
  ADD: '/api/city/:id/lot',
  UPDATE: '/api/city/:id/lot/:lotId',
  DELETE: '/api/city/:id/lot/:lotId',
};

export const lot = {
  getAll: (cityId) => api.get(generatePath(URL.GETALL, {id: cityId})),
  add: (cityId, data) => api.post(generatePath(URL.ADD, {id: cityId}), data),
  update: (cityId, lotId, data) => api.put(generatePath(URL.UPDATE, {id: cityId, lotId}), data),
  delete: (cityId, lotId) => api.delete(generatePath(URL.DELETE, {id: cityId, lotId})),
};