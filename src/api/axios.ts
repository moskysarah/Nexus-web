import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/auth/',
});

api.interceptors.request.use((config) => {
  // On utilise 'access_token' pour matcher avec ce qu'on stocke dans Auth.tsx
  const token = localStorage.getItem('access_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;