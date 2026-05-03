import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingSuccessBanner from '../../../components/user/BookingSuccessBanner';
import BookingInfoCard from '../../../components/user/BookingInfoCard';
import BookingSummary from '../../../components/user/BookingSummary';
import GuestSummary from '../../../components/user/GuestSummary';
import BookingActions from '../../../components/user/BookingActions';

const HotelBookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Data from HotelPayment after successful booking
  const { booking, hotel, room, stayInfo, guest } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fallback if navigated directly without state
  if (!booking && !hotel) {
    return (
      <div className="bg-gray-50/50 min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-gray-500 font-medium mb-4">Không tìm thấy thông tin đặt phòng.</p>
          <button
            onClick={() => navigate('/hotels')}
            className="px-6 py-3 bg-[#7978E9] text-white rounded-xl font-bold hover:bg-[#6665d0] transition-all"
          >
            Quay về trang Hotels
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    if (dateStr.includes(' ')) return dateStr; // already formatted
    return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const displayStayInfo = stayInfo || { checkIn: '—', checkOut: '—', nights: 1 };
  const displayHotel = hotel || { name: booking?.snapshotName || '—', location: '' };
  const displayRoom = room || { name: booking?.snapshotDetail || '—', price: booking?.totalPrice || 0 };
  const displayGuest = guest || { fullName: '—', email: '—', phone: '—' };

  const bookingCode = booking?.id
    ? `HTL-${booking.id.slice(-6).toUpperCase()}`
    : 'HTL-XXXXXX';

  const bookingDate = booking?.createdAt
    ? formatDate(booking.createdAt)
    : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <BookingSuccessBanner />

        <BookingInfoCard
          bookingCode={bookingCode}
          date={bookingDate}
          status="Paid"
        />

        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-bold text-[#1a2b49] mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Accommodation Details
          </h3>

          <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
            {displayHotel.thumbnailUrl && (
              <div className="md:w-32 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img src={displayHotel.thumbnailUrl} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <p className="font-bold text-[#1a2b49]">{displayHotel.name}</p>
              <p className="text-xs text-gray-500 mb-2">{displayHotel.location}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#7978E9] bg-[#7978E9]/10 px-2 py-0.5 rounded">{displayRoom.name}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-medium text-gray-500">{displayStayInfo.nights} night(s)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Check-in</p>
              <p className="font-bold text-[#1a2b49]">{displayStayInfo.checkIn}</p>
              <p className="text-xs text-gray-500">From 15:00</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Check-out</p>
              <p className="font-bold text-[#1a2b49]">{displayStayInfo.checkOut}</p>
              <p className="text-xs text-gray-500">Before 12:00</p>
            </div>
          </div>
        </div>

        <GuestSummary guest={displayGuest} />

        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 mb-8 text-center">
          <p className="text-sm text-blue-800 font-medium mb-1">
            We've sent a confirmation email with your booking voucher to
          </p>
          <p className="font-bold text-blue-900">{displayGuest.email}</p>
          <button className="mt-3 text-xs font-bold text-[#7978E9] hover:underline uppercase tracking-wider">
            Resend Email
          </button>
        </div>

        <BookingActions />
      </div>
    </div>
  );
};

export default HotelBookingSuccess;
