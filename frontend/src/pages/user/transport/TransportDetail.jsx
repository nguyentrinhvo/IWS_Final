import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeatMap from '../../../components/user/SeatMap';

const MOCK_TRIP = {
  id: '1',
  ten_nha_xe: 'Hoang Long Bus',
  loai_phuong_tien: 'Bus (Sleeper)',
  diem_di: 'Hanoi',
  diem_den: 'Da Nang',
  gio_di: '08:00',
  gio_den: '20:00',
  gia: 450000,
  departDate: 'Thu, 02 May 2026',
  seats: [
    { id: 'A1', status: 'available' },
    { id: 'A2', status: 'booked' },
    { id: 'B3', status: 'booked' },
    { id: 'C1', status: 'booked' },
    { id: 'C2', status: 'booked' },
  ]
};

const TransportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [trip, setTrip] = useState(MOCK_TRIP);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch trip detail in real app
  }, [id]);

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(s => s !== seatId) 
        : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.length * trip.gia;

  const handleBookNow = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    // Navigate to payment/booking page
    navigate('/transport/booking');
  };

  const formatVND = (price) => price.toLocaleString('vi-VN') + ' VND';

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 lg:pb-10 -mx-4">
      {/* Top Background Bar */}
      <div className="bg-[#7C4A4A] h-32 md:h-40 w-full mb-[-80px] md:mb-[-100px]"></div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        
        {/* Navigation / Back Button */}
        <div className="mb-6 pt-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-white/80 hover:text-white font-semibold transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to results
          </button>
        </div>

        {/* Trip Info Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl">
              {trip.loai_phuong_tien.includes('Train') ? '🚆' : '🚌'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{trip.ten_nha_xe}</h1>
              <p className="text-sm text-gray-500 font-medium">{trip.loai_phuong_tien}</p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Departure</p>
              <p className="text-lg font-bold text-[#1a2b49] leading-none">{trip.gio_di}</p>
              <p className="text-sm font-semibold text-gray-500 mt-1">{trip.diem_di}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Arrival</p>
              <p className="text-lg font-bold text-[#1a2b49] leading-none">{trip.gio_den}</p>
              <p className="text-sm font-semibold text-gray-500 mt-1">{trip.diem_den}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Date</p>
              <p className="text-base font-bold text-gray-800 leading-none mt-0.5">{trip.departDate}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Price</p>
              <p className="text-base font-bold text-orange-500 leading-none mt-0.5">{formatVND(trip.gia)} / seat</p>
            </div>
          </div>
        </div>

        {/* Main Content: Seat Map + Summary */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Seat Map */}
          <div className="flex-1">
            <SeatMap 
              seats={trip.seats} 
              selectedSeats={selectedSeats} 
              onToggleSeat={toggleSeat} 
            />
          </div>

          {/* Right: Booking Summary */}
          <div className="lg:w-[380px]">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-[#1a2b49] mb-6">Booking Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-start pb-4 border-b border-gray-50">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{trip.diem_di} → {trip.diem_den}</p>
                    <p className="text-xs text-gray-500 font-medium">{trip.departDate}</p>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-bold">Confirmed</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Selected Seats:</span>
                  <span className="font-bold text-gray-900">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Price per seat:</span>
                  <span className="font-semibold text-gray-900">{formatVND(trip.gia)}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-base font-bold text-gray-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-orange-500">{formatVND(totalPrice)}</span>
                </div>
                
                <button
                  onClick={handleBookNow}
                  className="w-full bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Book Now
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <p className="text-[11px] text-gray-400 text-center mt-4">
                  By clicking "Book Now", you agree to our Terms & Conditions.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Summary */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total ({selectedSeats.length} seats)</p>
            <p className="text-xl font-bold text-orange-500 leading-tight">{formatVND(totalPrice)}</p>
          </div>
          <button
            onClick={handleBookNow}
            className="flex-1 bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm"
          >
            Book Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default TransportDetail;
