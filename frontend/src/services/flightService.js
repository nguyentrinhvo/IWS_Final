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
};

export default flightService;
