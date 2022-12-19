import { api } from "../../services/api";

const URL = {
  DETAILS: '/api/user',
  LOGIN: '/api/user/login',
  REGISTER: '/api/user/register',
  GET_VEHICLES: '/api/user/vehicles',
};

export const user = {
  details: () => api.get(URL.DETAILS),
  login: (username, password) => api.post(URL.LOGIN, { username, password }),
  register: (email, password) => api.post(URL.REGISTER, { email, password }, true),
  getVehicles: () => api.get(URL.GET_VEHICLES),
};