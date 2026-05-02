import React from 'react';

const BookingResultCard = ({ booking }) => {
  const statusColors = {
    'Confirmed': 'bg-green-100 text-green-700 border-green-200',
    'Cancelled': 'bg-red-100 text-red-700 border-red-200',
    'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200'
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7978E9]/10 flex items-center justify-center text-[#7978E9]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Booking Status</p>
            <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border inline-block ${statusColors[booking.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
              {booking.status}
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Booking Code</p>
            <p className="text-sm font-black text-[#1a2b49]">{booking.bookingCode}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Payment</p>
            <p className="text-sm font-bold text-green-600 uppercase italic">Paid</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingResultCard;
