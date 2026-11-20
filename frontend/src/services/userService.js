import api from './api';

// Admin functions
export const getAllUsers = async (params = {}) => {
  const response = await api.get('/admin/users', { params });
  return response.data;
};

export const toggleLockUser = async (id) => {
  const response = await api.put(`/admin/users/${id}/lock`);
  return response.data;
};

export const createUser = async (data) => {
  const response = await api.post('/admin/users', data);
  return response.data;
};

export const changeUserRole = async (id, role) => {
  const response = await api.put(`/admin/users/${id}/role?role=${role}`);
  return response.data;
};

// User functions
export const getMyProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

export const updateMyProfile = async (data) => {
  const response = await api.put('/users/me', data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.put('/users/me/password', data);
  return response.data;
};
