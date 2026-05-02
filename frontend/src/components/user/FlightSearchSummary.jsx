import React, { useState } from 'react';

const FlightSearchSummary = ({ search, onEditSearch }) => {
  const { from, to, departDate, returnDate, passengers, cabinClass, tripType } = search;

  return (
    <div className="w-full bg-[#7C4A4A] py-4 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center gap-3">
        {/* Route + Date Info */}
        <div className="flex-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-white">
          {/* From → To */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-[11px] text-white/60 uppercase font-medium">From</span>
              <span className="font-bold text-lg leading-tight">{from.code}</span>
              <span className="text-[11px] text-white/70 truncate max-w-[120px]">{from.city}</span>
            </div>
            <div className="flex flex-col items-center px-3">
              <svg className="w-5 h-5 text-white/60 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="text-[10px] text-white/50">{tripType === 'Round-trip' ? '⇄' : '→'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-white/60 uppercase font-medium">To</span>
              <span className="font-bold text-lg leading-tight">{to.code}</span>
              <span className="text-[11px] text-white/70 truncate max-w-[120px]">{to.city}</span>
            </div>
          </div>

          <div className="h-10 w-px bg-white/20 hidden md:block"></div>

          {/* Departure Date */}
          <div className="flex flex-col">
            <span className="text-[11px] text-white/60 uppercase font-medium">Departure</span>
            <span className="font-semibold">{departDate}</span>
          </div>

          {tripType === 'Round-trip' && returnDate && (
            <>
              <div className="h-10 w-px bg-white/20 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-[11px] text-white/60 uppercase font-medium">Return</span>
                <span className="font-semibold">{returnDate}</span>
              </div>
            </>
          )}

          <div className="h-10 w-px bg-white/20 hidden md:block"></div>

          {/* Passengers */}
          <div className="flex flex-col">
            <span className="text-[11px] text-white/60 uppercase font-medium">Passengers</span>
            <span className="font-semibold">{passengers}</span>
          </div>

          <div className="h-10 w-px bg-white/20 hidden md:block"></div>

          {/* Cabin Class */}
          <div className="flex flex-col">
            <span className="text-[11px] text-white/60 uppercase font-medium">Class</span>
            <span className="font-semibold">{cabinClass}</span>
          </div>
        </div>

        {/* Edit Search Button */}
        <button
          onClick={onEditSearch}
          className="flex-shrink-0 flex items-center space-x-2 bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit Search</span>
        </button>
      </div>
    </div>
  );
};

export default FlightSearchSummary;
