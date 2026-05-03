import React from 'react';

const SORT_OPTIONS = [
  { key: 'cheapest', label: 'Cheapest', icon: '💰' },
  { key: 'fastest', label: 'Fastest', icon: '⚡' },
  { key: 'earliest', label: 'Earliest', icon: '🌅' },
  { key: 'best', label: 'Best', icon: '⭐' },
];

const FlightSortBar = ({ activeSort, onSortChange, totalResults }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <p className="text-sm text-gray-500 font-medium flex-shrink-0">
        <span className="font-bold text-[#1a2b49] text-base">{totalResults}</span> flights found
      </p>
      <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-1 flex-wrap">
        {SORT_OPTIONS.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => onSortChange(key)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeSort === key
                ? 'bg-[#7978E9] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <span className="text-sm">{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlightSortBar;
