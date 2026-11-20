import api from './api';

/**
 * Lấy thống kê tổng quan cho Admin Dashboard
 */
export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard/stats');
  return response.data;
};

/**
 * Lấy danh sách tất cả các đơn hàng (cho Admin)
 * @param {object} params - serviceType, status, page, size
 */
export const getAllBookings = async (params = {}) => {
  const response = await api.get('/admin/bookings', { params });
  return response.data;
};
