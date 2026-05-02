import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingStepper from '../../../components/user/BookingStepper';
import BookingSummary from '../../../components/user/BookingSummary';
import GuestForm from '../../../components/user/GuestForm';

const MOCK_HOTEL = {
  id: 1,
  name: 'InterContinental Danang Sun Peninsula Resort',
  location: 'Son Tra Peninsula, Da Nang',
};

const MOCK_ROOM = {
  id: 'r1',
  name: 'Resort Classic Oceanview',
  price: 8500000,
  benefits: ['Free Cancellation', 'Breakfast Included']
};

const HotelBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Stay dates (normally from state or search params)
  const checkIn = new Date('2024-04-02');
  const checkOut = new Date('2024-04-05');
  
  const calculateNights = (start, end) => {
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const stayInfo = {
    checkIn: '02 Apr 2024',
    checkOut: '05 Apr 2024',
    nights: calculateNights(checkIn, checkOut)
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContinue = () => {
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all required guest information');
      return;
    }
    navigate('/hotels/payment');
  };

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
                <div className="md:w-40 h-24 rounded-xl overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                   <p className="font-bold text-[#1a2b49] text-lg">{MOCK_ROOM.name}</p>
                   <div className="flex flex-wrap gap-3 mt-2">
                     {MOCK_ROOM.benefits.map((benefit, idx) => (
                       <span key={idx} className="flex items-center text-xs font-bold text-green-600">
                         <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                         </svg>
                         {benefit}
                       </span>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-[380px]">
            <BookingSummary 
              mode="hotel"
              data={MOCK_HOTEL}
              subData={MOCK_ROOM}
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
