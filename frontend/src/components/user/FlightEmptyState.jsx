import React from 'react';

const FlightEmptyState = ({ onReset }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 px-6 flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-5">
        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-[#1a2b49] mb-2">No flights found</h3>
      <p className="text-gray-500 text-sm max-w-xs mb-6">
        We couldn't find any flights matching your search criteria. Try adjusting your filters or dates.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-2.5 px-6 rounded-xl transition-colors"
        >
          Reset Filters
        </button>
        <button className="border-2 border-[#7978E9] text-[#7978E9] font-bold py-2.5 px-6 rounded-xl hover:bg-[#7978E9]/10 transition-colors">
          Edit Search
        </button>
      </div>
    </div>
  );
};

export default FlightEmptyState;
