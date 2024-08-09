import axios from 'axios';

// Create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // your base URL
  timeout: 5000 // request timeout
});

// Add a request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default service;
