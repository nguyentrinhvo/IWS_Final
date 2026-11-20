import api from './api';

/** Đặt vé Tour */
export const createTourBooking = async (bookingData) => {
  const response = await api.post('/bookings/tour', bookingData);
  return response.data;
};

/** Đặt vé máy bay */
export const createFlightBooking = async (bookingData) => {
  const response = await api.post('/bookings/flight', bookingData);
  return response.data;
};

/** Đặt xe bus/tàu */
export const createBusTrainBooking = async (bookingData) => {
  const response = await api.post('/bookings/bus-train', bookingData);
  return response.data;
};

/** Đặt phòng khách sạn */
export const createHotelBooking = async (bookingData) => {
  const response = await api.post('/bookings/hotel', bookingData);
  return response.data;
};

/** Lấy danh sách booking của user đang đăng nhập */
export const getMyBookings = async (page = 0, size = 10) => {
  const response = await api.get('/bookings/my', { params: { page, size } });
  return response.data; // Page<BookingDTO>
};

/** Lấy chi tiết một booking theo ID */
export const getBookingById = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data; // BookingDTO
};

/** Hủy booking */
export const cancelBooking = async (id) => {
  const response = await api.put(`/bookings/${id}/cancel`);
  return response.data;
};

// ── Admin endpoints ──────────────────────────────────────────

/** [Admin] Xác nhận booking */
export const confirmBooking = async (id) => {
  const response = await api.put(`/admin/bookings/${id}/confirm`);
  return response.data;
};
