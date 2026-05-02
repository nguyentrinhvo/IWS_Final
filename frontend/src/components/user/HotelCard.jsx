import React from 'react';

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-shadow mb-4">
      {/* Thumbnail */}
      <div className="md:w-72 h-48 md:h-auto relative overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {hotel.isPromoted && (
          <div className="absolute top-3 left-3 bg-[#7978E9] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-xl font-bold text-[#1a2b49] group-hover:text-[#7978E9] transition-colors">{hotel.name}</h3>
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded-lg">
               <span className="text-blue-600 font-bold text-sm mr-1">{hotel.rating}</span>
               <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3 h-3 ${i < Math.floor(hotel.stars) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
               </div>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 flex items-center mb-4">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {hotel.location}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.map((item, idx) => (
              <span key={idx} className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase tracking-tighter">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-gray-50">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Price per night from</p>
            <p className="text-xl font-black text-orange-500">{hotel.price.toLocaleString()} VND</p>
          </div>
          <button className="bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-all active:scale-[0.98]">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
