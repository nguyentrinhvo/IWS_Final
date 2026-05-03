import React from 'react';

const SeatSummary = ({ selectedSeats }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#1a2b49]">Selected Seats</h3>
          <p className="text-xs text-gray-500 font-medium">{selectedSeats.length} ticket(s) selected</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedSeats.map(seat => (
          <span key={seat} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-bold text-gray-700 border border-gray-200">
            {seat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SeatSummary;
