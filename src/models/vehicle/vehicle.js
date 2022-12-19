import { generatePath } from 'react-router';
import { api } from '../../services/api';

const URL = {
  GETALL: '/api/city/:cityId/lot/:lotId/vehicle',
  ADD: '/api/city/:cityId/lot/:lotId/vehicle',
  DELETE: '/api/city/:cityId/lot/:lotId/vehicle/:vehicleId',
  UPDATE: '/api/city/:cityId/lot/:lotId/vehicle/:vehicleId',
};

export const vehicle = {
  getAll: (cityId, lotId) => api.get(generatePath(URL.GETALL, {cityId, lotId})),
  add: (cityId, lotId, vehicle) => api.post(generatePath(URL.ADD, {cityId, lotId}), vehicle),
  delete: (cityId, lotId, vehicleId) => api.delete(generatePath(URL.DELETE, {cityId, lotId, vehicleId})),
  update: (cityId, lotId, vehicleId, vehicle) => api.put(generatePath(URL.UPDATE, {cityId, lotId, vehicleId}), vehicle),
};