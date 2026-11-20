import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookingSuccessBanner from '../../../components/user/BookingSuccessBanner';
import BookingInfoCard from '../../../components/user/BookingInfoCard';
import FlightDetailSummary from '../../../components/user/FlightDetailSummary';
import PassengerSummary from '../../../components/user/PassengerSummary';
import BookingActions from '../../../components/user/BookingActions';

const FlightBookingSuccess = () => {
  const location = useLocation();
  const { flight, contactInfo, passengers, totalAmount, paymentMethod } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const booking = {
    bookingCode: 'HVV-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    date: new Date().toLocaleString('en-GB'),
    status: 'Paid',
    email: contactInfo?.email || 'john.doe@example.com',
    flight: flight || {
      airline: 'Vietnam Airlines',
      airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png',
      flightNo: 'VN-201',
      aircraft: 'Airbus A350-900',
      fromCode: 'HAN',
      toCode: 'SGN',
      departTime: '06:00',
      arriveTime: '08:05',
      duration: '2h 05m',
      stops: 0,
    },
    passengers: passengers?.map(p => ({
      firstName: p.firstName.toUpperCase(),
      lastName: p.lastName.toUpperCase(),
      seat: 'Auto',
      ticketNumber: 'TK-' + Math.floor(Math.random() * 1000000000)
    })) || [
      { firstName: 'JOHN', lastName: 'DOE', seat: '12A', ticketNumber: 'VN-1029384756' }
    ]
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-16 -mx-4">
      {/* Decorative Top Background */}
      <div className="bg-[#7C4A4A] h-24 w-full"></div>

      <div className="max-w-[800px] mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
          
          <BookingSuccessBanner />

          <BookingInfoCard 
            bookingCode={booking.bookingCode}
            date={booking.date}
            status={booking.status}
          />

          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Flight Information</p>
            <FlightDetailSummary flight={booking.flight} />
          </div>

          <PassengerSummary passengers={booking.passengers} />

          {/* Email Notification Note */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-blue-800 leading-relaxed">
                E-ticket has been sent to your registered email: <br className="md:hidden" />
                <strong className="text-blue-900 font-bold ml-1">{booking.email}</strong>
              </p>
              <button className="text-[10px] font-bold text-blue-600 uppercase mt-1 hover:underline">
                Resend Email
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <BookingActions />
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Need help? Contact our 24/7 customer support at <br className="md:hidden" />
            <span className="text-[#7978E9] font-bold">1900 1234</span> or <span className="text-[#7978E9] font-bold">support@hanuvivu.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingSuccess;
