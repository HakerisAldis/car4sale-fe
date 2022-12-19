// import axiosInstance from "../utils/axios";

import axios from "axios";

const apiUrl = (url) => `https://localhost:8000${url}`;

const toError = async (error) =>
  error.response?.data;

const handleResponse = async (response) => {
  if (response) {
    return response.data;
  } else {
    throw await toError(response);
  }
};

export const api = {
  get: async (url, params) => {
    const response = await axios.get(apiUrl(url), {
      params,
    });

    return handleResponse(response);
  },
  post: async (url, data) => {
      const response = await axios.post(apiUrl(url), data);
      return handleResponse(response);
  },
  put: async (url, data) => {
    const response = await axios.put(apiUrl(url), data);

    return handleResponse(response);
  },
  delete: async (url) => {
    const response = await axios.delete(apiUrl(url));

    return handleResponse(response);
  }
}