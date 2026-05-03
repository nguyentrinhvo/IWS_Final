import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingStepper from '../../../components/user/BookingStepper';
import BookingSummary from '../../../components/user/BookingSummary';
import GuestForm from '../../../components/user/GuestForm';

const HotelBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { hotel, room, checkIn, checkOut, guests } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Stay dates from search state, or defaults
  const checkInDate = checkIn ? new Date(checkIn) : new Date();
  const checkOutDate = checkOut ? new Date(checkOut) : new Date(Date.now() + 2 * 86400000);

  const calculateNights = (start, end) => {
    const diffTime = Math.abs(end - start);
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const formatDateDisplay = (date) =>
    date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const stayInfo = {
    checkIn: formatDateDisplay(checkInDate),
    checkOut: formatDateDisplay(checkOutDate),
    nights: calculateNights(checkInDate, checkOutDate),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // If navigated directly without state, redirect back to hotels
    if (!hotel || !room) {
      navigate('/hotels');
    }
  }, [hotel, room, navigate]);

  const handleContinue = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all required guest information');
      return;
    }
    navigate('/hotels/payment', {
      state: {
        hotel,
        room,
        stayInfo,
        guest: formData,
        checkIn,
        checkOut,
        guests,
      }
    });
  };

  if (!hotel || !room) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <BookingStepper currentStep={3} mode="hotel" />

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Form Area */}
          <div className="flex-1">
            <GuestForm formData={formData} setFormData={setFormData} />

            {/* Room Confirmation Display */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-6">
              <h3 className="text-xl font-bold text-[#1a2b49] mb-6">Selected Room</h3>
              <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                {room.image && (
                  <div className="md:w-40 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-[#1a2b49] text-lg">{room.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{hotel.name}</p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="flex items-center text-xs font-bold text-green-600">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Free Cancellation
                    </span>
                    {room.amenities?.slice(0, 2).map((a, i) => (
                      <span key={i} className="flex items-center text-xs font-bold text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {a}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-[#1a2b49] font-black text-lg">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price)}
                    <span className="text-xs font-medium text-gray-400 ml-1">/ night</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-[380px]">
            <BookingSummary
              mode="hotel"
              data={hotel}
              subData={{ ...room, name: room.name, price: room.price }}
              stayInfo={stayInfo}
              onContinue={handleContinue}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
