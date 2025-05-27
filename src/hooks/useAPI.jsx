import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL de tu JSON Server

export const useApi = () => {
  const get = async (endpoint) => await axios.get(`${API_URL}/${endpoint}`);
  const post = async (endpoint, data) => await axios.post(`${API_URL}/${endpoint}`, data);
  const put = async (endpoint, data) => await axios.put(`${API_URL}/${endpoint}`, data);
  const del = async (endpoint) => await axios.delete(`${API_URL}/${endpoint}`);

  return { get, post, put, del };
};