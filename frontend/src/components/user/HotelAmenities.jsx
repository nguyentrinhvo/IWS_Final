import React from 'react';

const HotelAmenities = ({ amenities }) => {
  const amenityIcons = {
    'Free Wifi': '📶',
    'Pool': '🏊',
    'Parking': '🚗',
    'Breakfast': '🍳',
    'Air conditioning': '❄️',
    'Gym': '🏋️',
    'Spa': '💆',
    'Beachfront': '🏖️',
    'Restaurant': '🍽️'
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-[#1a2b49] mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        Top Facilities & Amenities
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {amenities.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors group">
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              {amenityIcons[item] || '✨'}
            </span>
            <span className="text-xs font-bold text-gray-500 text-center uppercase tracking-tighter">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelAmenities;
