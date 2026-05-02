import React from 'react';

const HotelHeader = ({ hotel }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < hotel.stars ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded">Resort</span>
          </div>
          
          <h1 className="text-3xl font-black text-[#1a2b49] mb-2">{hotel.name}</h1>
          
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <svg className="w-4 h-4 mr-1 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {hotel.location}
          </div>

          <p className="text-gray-600 leading-relaxed max-w-3xl">
            {hotel.description}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="flex items-center gap-3">
             <div className="text-right">
                <p className="font-bold text-[#1a2b49] leading-tight">Excellent</p>
                <p className="text-xs text-gray-500">{hotel.reviewCount} reviews</p>
             </div>
             <div className="w-12 h-12 bg-[#7978E9] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#7978E9]/20">
                {hotel.rating}
             </div>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Prices from</p>
          <p className="text-2xl font-black text-orange-500 leading-none">{hotel.minPrice.toLocaleString()} VND</p>
        </div>
      </div>
    </div>
  );
};

export default HotelHeader;
