import api from './api';

/**
 * Tạo URL thanh toán VNPay
 * @param {string} bookingId 
 */
export const createVnPayPayment = async (bookingId) => {
  const response = await api.post(`/payment/vnpay/create/${bookingId}`);
  return response.data; // { paymentUrl: '...', status: 'success' }
};

/**
 * Tạo URL thanh toán PayPal
 * @param {string} bookingId 
 */
export const createPayPalPayment = async (bookingId) => {
  const response = await api.post(`/payment/paypal/create/${bookingId}`);
  return response.data; // { paymentUrl: '...', paymentId: '...', status: 'success' }
};

/**
 * Lấy lịch sử thanh toán (Admin)
 */
export const getPaymentHistory = async () => {
  const response = await api.get('/payment/admin/history');
  return response.data;
};
