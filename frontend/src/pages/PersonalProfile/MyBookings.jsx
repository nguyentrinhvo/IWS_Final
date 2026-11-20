// MyBookings.jsx
import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { getMyBookings, cancelBooking } from '../../services/bookingService';
import { toast } from 'react-hot-toast';

const SERVICE_ICONS = {
  tour: '🗺️',
  flight: '✈️',
  hotel: '🏨',
  bus_train: '🚌',
  attraction: '🎡'
};

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  success: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

export default function MyBookings() {
  const { t, language } = useGlobal();
  const navigate = useNavigate();
  const currentLocale = language === 'VI' ? 'vi-VN' : 'en-US';

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = { page: 0, size: 50 };
      const serviceType = filterType !== 'all' ? filterType : undefined;
      const status = filterStatus !== 'all' ? filterStatus : undefined;

      const queryParams = new URLSearchParams();
      queryParams.set('page', params.page);
      queryParams.set('size', params.size);
      if (serviceType) queryParams.set('serviceType', serviceType);
      if (status) queryParams.set('status', status);

      const { default: api } = await import('../../services/api');
      const response = await api.get(`/bookings/my?${queryParams.toString()}`);
      setBookings(response.data.content || []);
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filterType, filterStatus]);

  const handleCancel = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn này?')) return;
    try {
      await cancelBooking(id);
      toast.success('Đã hủy đơn thành công');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Hủy đơn thất bại');
    }
  };

  const serviceTypes = ['all', 'tour', 'flight', 'hotel', 'bus_train', 'attraction'];
  const statusTypes = ['all', 'pending', 'confirmed', 'cancelled'];

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{t('user_activeTickets')}</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {serviceTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
              filterType === type
                ? 'bg-[#0194F3] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {type === 'all' ? 'All' : `${SERVICE_ICONS[type] || ''} ${type.replace('_', '/')}`}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {statusTypes.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
              filterStatus === status
                ? 'bg-[#0194F3] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-10 flex flex-col items-center justify-center text-center mb-8">
          <svg width="48" height="48" viewBox="0 0 1024 1024" fill="currentColor" className="text-gray-300 mb-4"><path d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path></svg>
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{t('user_noActiveBookings')}</h3>
          <p className="text-xs md:text-sm text-gray-500 max-w-md">{t('user_noActiveBookingsDesc')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-lg">{SERVICE_ICONS[booking.serviceType] || '📦'}</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-md uppercase tracking-wider">{booking.serviceType}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${STATUS_COLORS[booking.status] || 'bg-gray-100 text-gray-800'}`}>{booking.status}</span>
                    <span className="text-[10px] text-gray-400 ml-auto">{new Date(booking.createdAt).toLocaleDateString(currentLocale)}</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 mb-1">{booking.snapshotName || 'Booking'}</h4>
                  <p className="text-[10px] text-gray-400">ID: {booking.id}</p>
                  {booking.payment && (
                    <p className="text-[10px] text-gray-500 mt-1">
                      Payment: <span className="font-semibold uppercase">{booking.payment.provider}</span>
                      {booking.payment.paymentStatus && ` · ${booking.payment.paymentStatus}`}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-4 gap-2">
                  <p className="font-bold text-[#0194F3] text-lg">{booking.totalPrice?.toLocaleString(currentLocale)} VND</p>
                  <div className="flex gap-2 flex-wrap">
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="text-[10px] text-red-500 border border-red-300 px-3 py-1 rounded-md hover:bg-red-50 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => navigate('/profile/purchase-list')}
                      className="text-[10px] text-[#0194F3] border border-[#0194F3] px-3 py-1 rounded-md hover:bg-blue-50 transition-colors font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Link to Purchase History */}
      <div className="mt-6 mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">{t('user_purchaseList')}</h3>
      </div>
      <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-4 md:p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate('/profile/purchase-list')}>
        <span className="font-bold text-[#0194F3] text-sm md:text-base">{t('user_viewPurchaseHistory')}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </div>
    </div>
  );
}
