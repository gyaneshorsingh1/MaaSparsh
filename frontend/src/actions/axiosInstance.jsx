import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

export default axiosAPI;