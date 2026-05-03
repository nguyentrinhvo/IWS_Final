import api from './api';

/**
 * Lấy danh sách tours với phân trang & filter
 * @param {object} params - categoryId, tourType, destination, country, durationDays, maxPrice, keyword, page, size
 */
export const getTours = async (params = {}) => {
  const response = await api.get('/tours', { params });
  return response.data; // Page<TourDTO>
};

/** Lấy chi tiết 1 tour theo id */
export const getTourById = async (id) => {
  const response = await api.get(`/tours/${id}`);
  return response.data;
};

// ── Admin endpoints ──────────────────────────────────────────

/** [Admin] Tạo tour mới */
export const createTour = async (tourData) => {
  const response = await api.post('/admin/tours', tourData);
  return response.data;
};

/** [Admin] Cập nhật tour */
export const updateTour = async (id, tourData) => {
  const response = await api.put(`/admin/tours/${id}`, tourData);
  return response.data;
};

/** [Admin] Xóa tour */
export const deleteTour = async (id) => {
  const response = await api.delete(`/admin/tours/${id}`);
  return response.data;
};
