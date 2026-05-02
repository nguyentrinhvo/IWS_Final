import api from './api';

/**
 * Đăng nhập — POST /api/auth/login
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token, type, id, email, fullName, role}>}
 */
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data; // { token, type, id, email, fullName, role }
};

/**
 * Đăng ký — POST /api/auth/register
 * @param {{fullName, email, phone, password}} data
 * @returns {Promise<{message}>}
 */
export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

/**
 * Quên mật khẩu — POST /api/auth/forgot-password
 * @param {string} email
 * @returns {Promise<{message}>}
 */
export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

/**
 * Đặt lại mật khẩu — POST /api/auth/reset-password
 * @param {string} token  — OTP / reset token từ email
 * @param {string} newPassword
 * @returns {Promise<{message}>}
 */
export const resetPassword = async (token, newPassword) => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

/**
 * Đăng nhập bằng Google
 * @param {string} token
 */
export const googleLogin = async (token) => {
  const response = await api.post('/auth/google', { token });
  return response.data;
};

/**
 * Đăng nhập bằng Facebook
 * @param {string} token
 */
export const facebookLogin = async (token) => {
  const response = await api.post('/auth/facebook', { token });
  return response.data;
};
