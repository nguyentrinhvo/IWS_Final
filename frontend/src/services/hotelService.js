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
};
