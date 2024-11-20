import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: import.meta.env.BACKEND_API_URL, // Base URL from env variables
});

export default axiosAPI;