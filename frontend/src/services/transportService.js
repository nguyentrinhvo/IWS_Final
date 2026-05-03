import api from './api';

/**
 * Tìm kiếm chuyến xe/tàu
 * @param {object} params { departureCity, arrivalCity, vehicleType, travelDate }
 */
export const searchTransportRoutes = async (params) => {
  const response = await api.get('/bus-train-routes/search', { params });
  return response.data; // List<BusTrainRouteDTO>
};

/**
 * Lấy chi tiết chuyến xe/tàu
 * @param {string} id 
 */
export const getTransportRouteById = async (id) => {
  const response = await api.get(`/bus-train-routes/${id}`);
  return response.data;
};

/**
 * [Admin] Tạo chuyến xe/tàu mới
 */
export const createTransportRoute = async (data) => {
  const response = await api.post('/admin/bus-train-routes', data);
  return response.data;
};
