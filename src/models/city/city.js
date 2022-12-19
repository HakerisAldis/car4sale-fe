import { api } from "../../services/api";
import { generatePath } from 'react-router';

const URL = {
  GETALL: '/api/city',
  ADD: '/api/city',
  UPDATE: '/api/city/:id',
  DELETE: '/api/city/:id',
};

export const city = {
  getAll: () => api.get(URL.GETALL),
  add: (data) => api.post(URL.ADD, data),
  update: (id, data) => api.put(generatePath(URL.UPDATE, { id }), data),
  delete: (id) => api.delete(generatePath(URL.DELETE, { id })),
};