import React from 'react';

const HotelSearchSummary = ({ search, onEditSearch }) => {
  const { location, checkIn, checkOut, guests } = search;

  return (
    <div className="w-full bg-[#7C4A4A] py-4 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center gap-6">
        {/* Info Area */}
        <div className="flex-1 flex flex-wrap items-center gap-x-8 gap-y-2 text-white">
          {/* Location */}
          <div className="flex flex-col">
            <span className="text-[11px] text-white/60 uppercase font-medium">Destination</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-bold text-lg leading-tight">{location}</span>
            </div>
          </div>

          <div className="h-10 w-px bg-white/20 hidden md:block"></div>

          {/* Check-in */}
          <div className="flex flex-col">
            <span className="text-[11px] text-white/60 uppercase font-medium">Check-in</span>
            <span className="font-semibold">{checkIn}</span>
          </div>

          {/* Check-out */}
          <div className="flex flex-col">
            <span className="text-[11px] text-white/60 uppercase font-medium">Check-out</span>
            <span className="font-semibold">{checkOut}</span>
          </div>

          <div className="h-10 w-px bg-white/20 hidden md:block"></div>

          {/* Guests */}
          <div className="flex flex-col">
            <span className="text-[11px] text-white/60 uppercase font-medium">Guests & Rooms</span>
            <span className="font-semibold">{guests}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onEditSearch}
          className="flex-shrink-0 flex items-center space-x-2 bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Change Search</span>
        </button>
      </div>
    </div>
  );
};

export default HotelSearchSummary;
