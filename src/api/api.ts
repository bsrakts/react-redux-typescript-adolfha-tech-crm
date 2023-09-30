
import axios from 'axios';

const baseURL = 'https://dummyjson.com';

export const api = axios.create({
  baseURL
});

export const fetchUsers = () => api.get('/users');
