import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingResultCard from '../../../components/user/BookingResultCard';
import TransportCancelModal from '../../../components/user/TransportCancelModal';

const MOCK_BOOKING = {
  bookingCode: 'HV-TR-8293X',
  status: 'Confirmed',
  email: 'user@example.com',
  date: '02 May 2026, 14:20',
  trip: {
    ten_nha_xe: 'Hoang Long Bus',
    loai_phuong_tien: 'Bus (Sleeper)',
    diem_di: 'Hanoi',
    diem_den: 'Da Nang',
    gio_di: '08:00',
    gio_den: '20:00',
    departDate: '02 May 2026',
    totalPrice: 900000,
  },
  seats: ['A1', 'A3'],
  paymentMethod: 'VNPay',
  refundInfo: {
    originalAmount: 900000,
    fee: 100000,
    finalRefund: 800000
  }
};

const ManageTransportBooking = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(MOCK_BOOKING);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleCancelConfirm = () => {
    // In real app, API call to cancel
    setBooking({ ...booking, status: 'Cancelled' });
    setIsCancelModalOpen(false);
  };

  const formatVND = (price) => price?.toLocaleString('vi-VN') + ' VND';

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 -mx-4">
      {/* Top Banner */}
      <div className="bg-[#7C4A4A] h-32 md:h-40 w-full mb-[-80px] md:mb-[-100px]"></div>

      <div className="max-w-[850px] mx-auto px-4 relative z-10 pt-6">
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-white/80 hover:text-white font-semibold transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-xl font-bold text-white italic">Manage Transport Booking</h1>
        </div>

        {/* Booking Details */}
        {booking && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BookingResultCard booking={booking} />

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="text-lg font-bold text-[#1a2b49] mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Booking Details
              </h3>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl shadow-sm">
                        {booking.trip.loai_phuong_tien.includes('Train') ? '🚆' : '🚌'}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1a2b49]">{booking.trip.ten_nha_xe}</h4>
                        <p className="text-xs text-gray-500 font-medium">{booking.trip.loai_phuong_tien}</p>
                      </div>
                   </div>
                   <div className="flex gap-10">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Departure</p>
                        <p className="text-sm font-bold text-gray-800">{booking.trip.gio_di}</p>
                        <p className="text-xs text-gray-500 font-medium">{booking.trip.diem_di}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Arrival</p>
                        <p className="text-sm font-bold text-gray-800">{booking.trip.gio_den}</p>
                        <p className="text-xs text-gray-500 font-medium">{booking.trip.diem_den}</p>
                      </div>
                   </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Date</p>
                    <p className="text-sm font-bold text-gray-700">{booking.trip.departDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Seats</p>
                    <p className="text-sm font-bold text-gray-700">{booking.seats.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Payment</p>
                    <p className="text-sm font-bold text-gray-700">{booking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 text-right">Total</p>
                    <p className="text-sm font-black text-orange-500 text-right">{formatVND(booking.trip.totalPrice)}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-4 pt-4 border-t border-gray-100">
                {booking.status === 'Confirmed' ? (
                  <>
                    <button 
                      onClick={() => setIsCancelModalOpen(true)}
                      className="w-full max-w-sm bg-white border-2 border-red-100 text-red-500 font-bold py-4 rounded-2xl hover:bg-red-50 transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Cancel This Booking
                    </button>
                    <p className="text-[11px] text-gray-400 font-medium">Cancellation fee may apply based on carrier policy.</p>
                  </>
                ) : (
                  <div className="w-full max-w-sm bg-red-50 border border-red-100 text-red-600 font-bold py-4 rounded-2xl text-center">
                    This booking has been cancelled
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <TransportCancelModal 
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelConfirm}
        refundInfo={booking?.refundInfo || {}}
      />
    </div>
  );
};

export default ManageTransportBooking;
