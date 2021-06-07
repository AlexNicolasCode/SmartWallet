import axios from 'axios'
import { getToken } from "./auth";

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/users'
})

// api.interceptors.request.use(async config => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
