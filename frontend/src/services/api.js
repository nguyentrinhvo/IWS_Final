import axios from 'axios';

// Base URL — vite proxy sẽ chuyển /api -> http://localhost:8080/api
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// ── Request Interceptor: đính kèm JWT token ──────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor: xử lý lỗi 401 (hết hạn token) ─────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn → xóa và reload
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      // Không navigate ở đây để tránh vòng lặp; component tự xử lý
    }
    return Promise.reject(error);
  }
);

export default api;
