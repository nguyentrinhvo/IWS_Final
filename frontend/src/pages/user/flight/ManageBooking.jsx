import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingResultCard from '../../../components/user/BookingResultCard';
import FlightDetailSummary from '../../../components/user/FlightDetailSummary';
import PassengerSummary from '../../../components/user/PassengerSummary';
import BookingActions from '../../../components/user/BookingActions';
import CancelModal from '../../../components/user/CancelModal';

const MOCK_BOOKING_DATA = {
  bookingCode: 'HVV-10293X',
  status: 'Confirmed',
  email: 'john.doe@example.com',
  flight: {
    airline: 'Vietnam Airlines',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png',
    flightNo: 'VN-201',
    aircraft: 'Airbus A350-900',
    fromCode: 'HAN',
    fromCity: 'Hanoi',
    toCode: 'SGN',
    toCity: 'Ho Chi Minh City',
    departTime: '06:00',
    arriveTime: '08:05',
    duration: '2h 05m',
    stops: 0,
  },
  passengers: [
    { firstName: 'JOHN', lastName: 'DOE', seat: '12A', ticketNumber: 'VN-1029384756' }
  ],
  refund: {
    originalAmount: 1250000,
    fee: 350000,
    finalRefund: 900000
  }
};

const ManageBooking = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(MOCK_BOOKING_DATA);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCancelConfirm = () => {
    setIsCancelModalOpen(false);
    setBooking({ ...booking, status: 'Cancelled' });
    // In a real app, you would call an API here
  };

  const handleChangeFlight = () => {
    // Redirect to search results
    navigate('/flights/search');
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 -mx-4">
      {/* Top Banner */}
      <div className="bg-[#7C4A4A] h-32 md:h-40 w-full mb-[-80px] md:mb-[-100px]"></div>

      <div className="max-w-[800px] mx-auto px-4 relative z-10">
        <div className="mb-6 flex items-center justify-between">
           <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-white/80 hover:text-white font-semibold transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h2 className="text-xl font-bold text-white italic">My Booking</h2>
        </div>

        <BookingResultCard booking={booking} />
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="mb-8">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Flight Information</p>
            <FlightDetailSummary flight={booking.flight} />
          </div>

          <PassengerSummary passengers={booking.passengers} />

          {booking.status === 'Confirmed' && (
            <BookingActions 
              mode="manage"
              onCancel={() => setIsCancelModalOpen(true)}
              onChange={handleChangeFlight}
            />
          )}

          {booking.status === 'Cancelled' && (
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm font-bold text-red-500 bg-red-50 py-4 rounded-2xl border border-red-100">
                This booking has been cancelled.
              </p>
            </div>
          )}
        </div>
      </div>

      <CancelModal 
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelConfirm}
        refundInfo={booking.refund}
      />
    </div>
  );
};

export default ManageBooking;
