import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import BookingInfoCard from '../../../components/user/BookingInfoCard';
import GuestSummary from '../../../components/user/GuestSummary';
import CancelBookingModal from '../../../components/user/CancelBookingModal';
import { getBookingById, cancelBooking } from '../../../services/bookingService';

const ManageHotelBooking = () => {
  const navigate = useNavigate();
  const { id: paramId } = useParams();           // from /hotels/manage/:id
  const location = useLocation();
  const stateBookingId = location.state?.bookingId; // from navigate(state)

  const bookingId = paramId || stateBookingId;

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (bookingId) {
      fetchBooking(bookingId);
    } else {
      setError('Booking ID not found');
      setLoading(false);
    }
  }, [bookingId]);

  const fetchBooking = async (id) => {
    try {
      setLoading(true);
      const data = await getBookingById(id);
      setBooking(mapBookingDTO(data));
    } catch (err) {
      console.error('Failed to fetch booking:', err);
      setError('Không thể tải thông tin đặt phòng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Map backend BookingDTO -> component shape
  const mapBookingDTO = (dto) => {
    const bookingCode = dto.id ? `HTL-${dto.id.slice(-6).toUpperCase()}` : 'HTL-XXXXXX';
    const formatDate = (str) => str
      ? new Date(str).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : '—';

    return {
      bookingCode,
      id: dto.id,
      date: formatDate(dto.createdAt),
      status: dto.payment?.paymentStatus === 'success' ? 'Paid' : 'Pending',
      bookingStatus: dto.status === 'cancelled' ? 'Cancelled' : 'Confirmed',
      hotel: {
        name: dto.snapshotName || '—',
        location: '',
        roomType: dto.snapshotDetail || '—',
        checkIn: '—',
        checkOut: '—',
        nights: dto.quantity || 1,
        image: '',
      },
      guest: {
        fullName: dto.contactName || '—',
        email: dto.contactEmail || '—',
        phone: dto.contactPhone || '—',
      },
      refundInfo: {
        originalAmount: dto.totalPrice || 0,
        fee: Math.round((dto.totalPrice || 0) * 0.1),
        finalRefund: Math.round((dto.totalPrice || 0) * 0.9),
      },
    };
  };

  const handleConfirmCancel = async () => {
    try {
      await cancelBooking(booking.id);
      setBooking(prev => ({ ...prev, bookingStatus: 'Cancelled' }));
    } catch (err) {
      console.error('Cancel booking error:', err);
      alert(err?.response?.data?.message || 'Hủy đặt phòng thất bại. Vui lòng thử lại.');
    } finally {
      setIsCancelModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50/50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-[#7978E9]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500 font-medium">Đang tải thông tin đặt phòng...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="bg-gray-50/50 min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-500 font-bold text-lg mb-4">{error || 'Không tìm thấy đặt phòng'}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#7978E9] text-white rounded-xl font-bold hover:bg-[#6665d0] transition-all"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <div className="max-w-[1000px] mx-auto px-4 py-8">

        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-500 hover:text-[#7978E9] font-bold text-sm transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h2 className="text-xl font-black text-[#1a2b49] italic">Manage Booking</h2>
        </div>

        <BookingInfoCard
          bookingCode={booking.bookingCode}
          date={booking.date}
          status={booking.status}
          bookingStatus={booking.bookingStatus}
        />

        {/* Hotel Details Summary Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-bold text-[#1a2b49] mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Accommodation Summary
          </h3>

          <div className="flex flex-col md:flex-row gap-8">
            {booking.hotel.image && (
              <div className="md:w-64 h-40 rounded-3xl overflow-hidden shadow-md flex-shrink-0">
                <img src={booking.hotel.image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="text-xl font-bold text-[#1a2b49] mb-1">{booking.hotel.name}</h4>
              {booking.hotel.location && (
                <p className="text-sm text-gray-500 mb-4">{booking.hotel.location}</p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-4 border-t border-gray-50">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Room Type</p>
                  <p className="text-sm font-bold text-gray-700">{booking.hotel.roomType}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-sm font-bold text-gray-700">{booking.hotel.nights} night(s)</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Check-in</p>
                  <p className="text-sm font-bold text-gray-700">{booking.hotel.checkIn}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GuestSummary guest={booking.guest} />

        {/* Action Section */}
        <div className="mt-10 flex flex-col items-center gap-4">
          {booking.bookingStatus === 'Confirmed' ? (
            <>
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="w-full max-w-md bg-white border-2 border-red-100 text-red-500 font-bold py-4 rounded-2xl hover:bg-red-50 transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Cancel This Booking
              </button>
              <p className="text-xs text-gray-400 font-medium">Free cancellation until 24 hours before check-in</p>
            </>
          ) : (
            <div className="w-full max-w-md bg-gray-50 border-2 border-gray-200 text-gray-400 font-bold py-5 rounded-2xl text-center">
              This booking has been successfully cancelled
            </div>
          )}

          <button
            onClick={() => navigate('/hotels')}
            className="mt-4 text-sm font-bold text-[#7978E9] hover:underline flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Hotels Home
          </button>
        </div>

      </div>

      <CancelBookingModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        refundInfo={booking.refundInfo}
      />
    </div>
  );
};

export default ManageHotelBooking;
