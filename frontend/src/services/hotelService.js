import api from './api';

export const hotelService = {
  /**
   * Tìm kiếm khách sạn theo city và các bộ lọc.
   * city là optional — nếu không truyền, backend trả về tất cả hotel active.
   */
  searchHotels: async (city, minPrice, maxPrice, minStar, page = 0, size = 10, sort = 'id,desc') => {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (minPrice != null) params.append('minPrice', minPrice);
    if (maxPrice != null) params.append('maxPrice', maxPrice);
    if (minStar != null) params.append('minStar', minStar);
    params.append('page', page);
    params.append('size', size);
    params.append('sort', sort);

    const response = await api.get(`/hotels/search?${params.toString()}`);
    return response.data; // Page<HotelDTO>
  },

  /**
   * Lấy danh sách khách sạn nổi bật (public, không cần auth).
   */
  getFeaturedHotels: async (page = 0, size = 8) => {
    const response = await api.get(`/hotels/featured?page=${page}&size=${size}`);
    return response.data; // Page<HotelDTO>
  },

  /**
   * Lấy chi tiết một khách sạn theo ID.
   */
  getHotelById: async (id) => {
    const response = await api.get(`/hotels/${id}`);
    return response.data; // HotelDTO
  },
  /**
   * Lấy tất cả khách sạn (Admin - có phân trang và lọc).
   */
  getAllHotels: async (page = 0, size = 10, sort = 'id,desc', filters = {}) => {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('size', size);
    params.append('sort', sort);
    
    if (filters.name) params.append('name', filters.name);
    if (filters.city) params.append('city', filters.city);
    if (filters.starRating) params.append('starRating', filters.starRating);

    const response = await api.get(`/hotels?${params.toString()}`);
    return response.data; // Page<HotelDTO>
  },

  /**
   * Lấy thống kê khách sạn (Admin).
   */
  getHotelStats: async () => {
    const response = await api.get('/hotels/stats');
    return response.data;
  },

  /**
   * [Admin] Tạo khách sạn mới.
   */
  createHotel: async (data) => {
    const response = await api.post('/hotels', data);
    return response.data;
  },

  /**
   * [Admin] Cập nhật khách sạn.
   */
  updateHotel: async (id, data) => {
    const response = await api.put(`/hotels/${id}`, data);
    return response.data;
  },

  /**
   * [Admin] Xóa khách sạn.
   */
  deleteHotel: async (id) => {
    const response = await api.delete(`/hotels/${id}`);
    return response.data;
  },
};
