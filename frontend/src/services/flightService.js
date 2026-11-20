import api from './api';

const flightService = {
  searchFlights: async (params) => {
    const response = await api.get('/flights/search', { params });
    return response.data;
  },

  getLocations: async () => {
    try {
      const response = await api.get('/flights/locations');
      return response.data;
    } catch (error) {
      console.error('Error fetching flight locations:', error);
      throw error;
    }
  },
  
  getFeaturedFlights: async () => {
    try {
      const response = await api.get('/flights/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured flights:', error);
      throw error;
    }
  },

  getFlightById: async (id) => {
    const response = await api.get(`/flights/${id}`);
    return response.data;
  },

  // Admin Methods
  getAllFlightsAdmin: async (page = 0, size = 10) => {
    const response = await api.get('/admin/flights', { params: { page, size } });
    return response.data;
  },

  createFlight: async (data) => {
    const response = await api.post('/admin/flights', data);
    return response.data;
  },

  updateFlight: async (id, data) => {
    const response = await api.put(`/admin/flights/${id}`, data);
    return response.data;
  },

  deleteFlight: async (id) => {
    const response = await api.delete(`/admin/flights/${id}`);
    return response.data;
  },
};

export default flightService;
