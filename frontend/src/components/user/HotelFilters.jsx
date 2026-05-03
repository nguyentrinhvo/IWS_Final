import React from 'react';

const HotelFilters = ({ filters, onFilterChange }) => {
  const stars = [5, 4, 3, 2, 1];
  const amenities = [
    { id: 'wifi', label: 'Free Wifi', icon: '📶' },
    { id: 'pool', label: 'Swimming Pool', icon: '🏊' },
    { id: 'breakfast', label: 'Breakfast Included', icon: '🍳' },
    { id: 'parking', label: 'Free Parking', icon: '🚗' },
    { id: 'ac', label: 'Air Conditioning', icon: '❄️' },
    { id: 'gym', label: 'Fitness Center', icon: '🏋️' }
  ];

  return (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold text-[#1a2b49] uppercase tracking-wider mb-4">Price Range</h3>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="10000000" 
            step="500000"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7978E9]"
          />
          <div className="flex justify-between text-xs font-bold text-gray-500">
            <span>0 VND</span>
            <span>10M+ VND</span>
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <h3 className="text-sm font-bold text-[#1a2b49] uppercase tracking-wider mb-4">Star Rating</h3>
        <div className="space-y-3">
          {stars.map((star) => (
            <label key={star} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 text-[#7978E9] focus:ring-[#7978E9] cursor-pointer"
                />
              </div>
              <span className="ml-3 flex items-center gap-1">
                {[...Array(star)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-sm font-bold text-[#1a2b49] uppercase tracking-wider mb-4">Amenities</h3>
        <div className="space-y-3">
          {amenities.map((item) => (
            <label key={item.id} className="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-[#7978E9] focus:ring-[#7978E9] cursor-pointer"
              />
              <span className="ml-3 text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelFilters;
