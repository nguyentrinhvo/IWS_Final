import React, { useEffect } from 'react';
import BookingSuccessBanner from '../../../components/user/BookingSuccessBanner';
import BookingInfoCard from '../../../components/user/BookingInfoCard';
import BookingSummary from '../../../components/user/BookingSummary';
import GuestSummary from '../../../components/user/GuestSummary';
import BookingActions from '../../../components/user/BookingActions';

const MOCK_HOTEL = {
  id: 1,
  name: 'InterContinental Danang Sun Peninsula Resort',
  location: 'Son Tra Peninsula, Da Nang',
};

const MOCK_ROOM = {
  id: 'r1',
  name: 'Resort Classic Oceanview',
  price: 8500000,
};

const MOCK_GUEST = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+84 987 654 321'
};

const HotelBookingSuccess = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stayInfo = {
    checkIn: '02 Apr 2024',
    checkOut: '05 Apr 2024',
    nights: 3
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <BookingSuccessBanner />
        
        <BookingInfoCard 
          bookingCode="HTL-99283X"
          date="02 May 2026"
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
            <div className="md:w-32 h-20 rounded-xl overflow-hidden flex-shrink-0">
               <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
               <p className="font-bold text-[#1a2b49]">{MOCK_HOTEL.name}</p>
               <p className="text-xs text-gray-500 mb-2">{MOCK_HOTEL.location}</p>
               <div className="flex items-center gap-2">
                 <span className="text-xs font-bold text-[#7978E9] bg-[#7978E9]/10 px-2 py-0.5 rounded">{MOCK_ROOM.name}</span>
                 <span className="text-xs text-gray-400">•</span>
                 <span className="text-xs font-medium text-gray-500">{stayInfo.nights} night(s)</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Check-in</p>
              <p className="font-bold text-[#1a2b49]">{stayInfo.checkIn}</p>
              <p className="text-xs text-gray-500">From 15:00</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Check-out</p>
              <p className="font-bold text-[#1a2b49]">{stayInfo.checkOut}</p>
              <p className="text-xs text-gray-500">Before 12:00</p>
            </div>
          </div>
        </div>

        <GuestSummary guest={MOCK_GUEST} />

        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 mb-8 text-center">
          <p className="text-sm text-blue-800 font-medium mb-1">
            We've sent a confirmation email with your booking voucher to 
          </p>
          <p className="font-bold text-blue-900">{MOCK_GUEST.email}</p>
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
