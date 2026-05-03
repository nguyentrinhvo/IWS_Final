import api from './api';

export const attractionService = {
  /**
   * [Public/Admin] Tìm kiếm điểm tham quan.
   * Admin có thể dùng endpoint này hoặc /admin/all tùy nhu cầu.
   */
  searchAttractions: async (params) => {
    const response = await api.get('/attractions', { params });
    return response.data;
  },

  /**
   * [Admin] Lấy tất cả điểm tham quan (phân trang).
   */
  getAllAttractionsAdmin: async (page = 0, size = 10, sort = 'nameVi,asc') => {
    const response = await api.get('/attractions/admin/all', {
      params: { page, size, sort }
    });
    return response.data;
  },

  /**
   * [Admin] Lấy thống kê điểm tham quan.
   */
  getAttractionStats: async () => {
    const response = await api.get('/attractions/stats');
    return response.data;
  },

  /**
   * Lấy chi tiết điểm tham quan.
   */
  getAttractionById: async (id) => {
    const response = await api.get(`/attractions/${id}`);
    return response.data;
  },

  /**
   * [Admin] Tạo mới điểm tham quan.
   */
  createAttraction: async (data) => {
    const response = await api.post('/attractions', data);
    return response.data;
  },

  /**
   * [Admin] Cập nhật điểm tham quan.
   */
  updateAttraction: async (id, data) => {
    const response = await api.put(`/attractions/${id}`, data);
    return response.data;
  },

  /**
   * [Admin] Xoá điểm tham quan.
   */
  deleteAttraction: async (id) => {
    await api.delete(`/attractions/${id}`);
  }
};
