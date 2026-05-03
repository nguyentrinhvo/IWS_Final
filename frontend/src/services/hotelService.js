import api from './api';

export const hotelService = {
  searchHotels: async (city, minPrice, maxPrice, minStar, page = 0, size = 10, sort = 'id,desc') => {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (minStar) params.append('minStar', minStar);
    params.append('page', page);
    params.append('size', size);
    params.append('sort', sort);
    
    const response = await api.get(`/hotels/search?${params.toString()}`);
    return response.data;
  },

  getHotelById: async (id) => {
    const response = await api.get(`/hotels/${id}`);
    return response.data;
  }
};
