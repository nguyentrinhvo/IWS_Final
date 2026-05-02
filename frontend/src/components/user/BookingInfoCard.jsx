import React from 'react';

const BookingInfoCard = ({ bookingCode, date, status = 'Paid', bookingStatus = 'Confirmed' }) => {
  const bookingStatusColors = {
    'Confirmed': 'bg-green-100 text-green-700 border-green-200',
    'Cancelled': 'bg-gray-100 text-gray-500 border-gray-200',
    'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div className="p-5 flex flex-col items-center justify-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Booking Code (PNR)</p>
          <p className="text-2xl font-black text-[#7978E9] tracking-tighter">{bookingCode}</p>
        </div>
        <div className="p-5 flex flex-col items-center justify-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Booking Date</p>
          <p className="font-bold text-gray-800">{date}</p>
        </div>
        <div className="p-5 flex flex-col items-center justify-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Payment Status</p>
          <div className="flex items-center gap-1.5 text-green-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-bold uppercase text-xs">{status}</span>
          </div>
        </div>
        <div className="p-5 flex flex-col items-center justify-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Booking Status</p>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${bookingStatusColors[bookingStatus] || bookingStatusColors['Pending']}`}>
            {bookingStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingInfoCard;
