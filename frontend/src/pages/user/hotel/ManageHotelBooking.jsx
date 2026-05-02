import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingInfoCard from '../../../components/user/BookingInfoCard';
import GuestSummary from '../../../components/user/GuestSummary';
import CancelBookingModal from '../../../components/user/CancelBookingModal';

const MOCK_BOOKING = {
  bookingCode: 'HTL-99283X',
  date: '02 May 2026',
  status: 'Paid',
  bookingStatus: 'Confirmed',
  hotel: {
    name: 'InterContinental Danang Sun Peninsula Resort',
    location: 'Son Tra Peninsula, Da Nang',
    roomType: 'Resort Classic Oceanview',
    checkIn: '02 Apr 2024',
    checkOut: '05 Apr 2024',
    nights: 3,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  guest: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+84 987 654 321'
  },
  refundInfo: {
    originalAmount: 25500000,
    fee: 2500000,
    finalRefund: 23000000
  }
};

const ManageHotelBooking = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(MOCK_BOOKING);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConfirmCancel = () => {
    // In real app: API call to cancel
    setBooking(prev => ({ ...prev, bookingStatus: 'Cancelled' }));
    setIsCancelModalOpen(false);
  };

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
             <div className="md:w-64 h-40 rounded-3xl overflow-hidden shadow-md flex-shrink-0">
                <img src={booking.hotel.image} alt="" className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-[#1a2b49] mb-1">{booking.hotel.name}</h4>
                <p className="text-sm text-gray-500 mb-4">{booking.hotel.location}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-4 border-t border-gray-50">
                   <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Room Type</p>
                      <p className="text-sm font-bold text-gray-700">{booking.hotel.roomType}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Check-in</p>
                      <p className="text-sm font-bold text-gray-700">{booking.hotel.checkIn}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Check-out</p>
                      <p className="text-sm font-bold text-gray-700">{booking.hotel.checkOut}</p>
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
