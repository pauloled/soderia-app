import axios from 'axios'

const API_URL = 'http://localhost:3000';

export const useAPI = () => {
  const get = (endpoint) => axios.get(`${API_URL}/${endpoint}`);
  const post = (endpoint, data) => axios.post(`${API_URL}/${endpoint}`, data);
  const put = (endpoint, data) => axios.put(`${API_URL}/${endpoint}`, data);
  const del = (endpoint) => axios.delete(`${API_URL}/${endpoint}`);

  return { get, post, put, del };
};