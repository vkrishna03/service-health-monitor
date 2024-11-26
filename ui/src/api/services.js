import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchServices = async () => {
  const response = await axios.get(`${API_BASE_URL}/services`);
  return response.data;
};

export const fetchIncidents = async () => {
  const response = await axios.get(`${API_BASE_URL}/incidents`);
  return response.data;
};

export const fetchLogs = async () => {
  const response = await axios.get(`${API_BASE_URL}/logs`);
  return response.data;
};