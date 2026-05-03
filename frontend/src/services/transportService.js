import api from './api';

/**
 * Tìm kiếm chuyến xe/tàu (Public)
 */
export const searchTransportRoutes = async (params) => {
  const response = await api.get('/bus-train/search', { params });
  return response.data;
};

/**
 * Lấy chi tiết chuyến xe/tàu (Public)
 */
export const getTransportRouteById = async (id) => {
  const response = await api.get(`/bus-train/${id}`);
  return response.data;
};

/**
 * [Admin] Lấy tất cả chuyến (phân trang)
 */
export const getAllRoutesAdmin = async (page = 0, size = 10, sort = 'id,desc') => {
  const response = await api.get('/bus-train', {
    params: { page, size, sort }
  });
  return response.data;
};

/**
 * [Admin] Lấy thống kê
 */
export const getTransportStats = async () => {
  const response = await api.get('/bus-train/stats');
  return response.data;
};

/**
 * [Admin] Tạo mới
 */
export const createTransportRoute = async (data) => {
  const response = await api.post('/bus-train', data);
  return response.data;
};

/**
 * [Admin] Cập nhật
 */
export const updateTransportRoute = async (id, data) => {
  const response = await api.put(`/bus-train/${id}`, data);
  return response.data;
};

/**
 * [Admin] Xoá
 */
export const deleteTransportRoute = async (id) => {
  await api.delete(`/bus-train/${id}`);
};

// Provider APIs
export const getAllProviders = async () => {
  const response = await api.get('/providers');
  return response.data;
};

export const createProvider = async (data) => {
  const response = await api.post('/providers', data);
  return response.data;
};

export const updateProvider = async (id, data) => {
  const response = await api.put(`/providers/${id}`, data);
  return response.data;
};

export const deleteProvider = async (id) => {
  await api.delete(`/providers/${id}`);
};

// Cung cấp thêm object để tương thích với code mới ở Admin
export const transportService = {
  searchTransportRoutes,
  getTransportRouteById,
  getAllRoutesAdmin,
  getTransportStats,
  createTransportRoute,
  updateTransportRoute,
  deleteTransportRoute,
  // New provider methods
  getAllProviders,
  createProvider,
  updateProvider,
  deleteProvider
};
