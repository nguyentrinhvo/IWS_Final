import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingSuccessBanner from '../../../components/user/BookingSuccessBanner';
import BookingInfoCard from '../../../components/user/BookingInfoCard';
import BookingActions from '../../../components/user/BookingActions';

const TransportBookingSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ─── Mock Data ──────────────────────────────────────────────────────────────
  const mockBooking = {
    bookingCode: 'HV-TR-8293X',
    date: '02 May 2026, 14:20',
    status: 'Paid',
    email: 'user@example.com',
    paymentMethod: 'VNPay',
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
    seats: ['A1', 'A3']
  };

  const formatVND = (price) => price.toLocaleString('vi-VN') + ' VND';

  return (
    <div className="bg-gray-50/50 min-h-screen pb-16 -mx-4">
      {/* Decorative Top Background */}
      <div className="bg-[#7C4A4A] h-24 w-full"></div>

      <div className="max-w-[800px] mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
          
          <BookingSuccessBanner />

          <BookingInfoCard 
            bookingCode={mockBooking.bookingCode}
            date={mockBooking.date}
            status={mockBooking.status}
          />

          {/* Transport Trip Info */}
          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Trip Information</p>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-2xl shadow-sm">
                    {mockBooking.trip.loai_phuong_tien.includes('Train') ? '🚆' : '🚌'}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a2b49] text-lg">{mockBooking.trip.ten_nha_xe}</h4>
                    <p className="text-xs text-gray-500 font-medium">{mockBooking.trip.loai_phuong_tien}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 text-center md:text-left">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Departure</p>
                    <p className="text-base font-bold text-gray-800">{mockBooking.trip.gio_di}</p>
                    <p className="text-xs text-gray-500 font-medium">{mockBooking.trip.diem_di}</p>
                  </div>
                  <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Arrival</p>
                    <p className="text-base font-bold text-gray-800">{mockBooking.trip.gio_den}</p>
                    <p className="text-xs text-gray-500 font-medium">{mockBooking.trip.diem_den}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-x-12 gap-y-4">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Date</p>
                  <p className="text-sm font-bold text-gray-700">{mockBooking.trip.departDate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Selected Seats</p>
                  <div className="flex gap-1.5">
                    {mockBooking.seats.map(seat => (
                      <span key={seat} className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[11px] font-bold">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Payment Method</p>
                  <p className="text-sm font-bold text-gray-700">{mockBooking.paymentMethod}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Total Paid</p>
                  <p className="text-lg font-black text-orange-500">{formatVND(mockBooking.trip.totalPrice)}</p>
                </div>
              </div>
            </div>
          </div>

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
                <strong className="text-blue-900 font-bold ml-1">{mockBooking.email}</strong>
              </p>
              <button className="text-[10px] font-bold text-blue-600 uppercase mt-1 hover:underline">
                Resend Email
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <BookingActions 
              homePath="/" 
              managePath="/transport/manage"
            />
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

export default TransportBookingSuccess;
