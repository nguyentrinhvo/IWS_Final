import React from 'react';

const BookingSuccessBanner = () => {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm border-4 border-white">
        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-[#1a2b49] mb-2 italic">Booking Confirmed!</h2>
      <p className="text-gray-500 font-medium">Your e-ticket has been sent to your email.</p>
    </div>
  );
};

export default BookingSuccessBanner;
