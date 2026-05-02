import React, { useState } from 'react';

const AIRLINES = ['Vietnam Airlines', 'VietJet Air', 'Bamboo Airways', 'Pacific Airlines', 'Vietravel Airlines'];
const DEPARTURE_TIMES = [
  { label: 'Early Morning', sub: '00:00 – 06:00', icon: '🌙' },
  { label: 'Morning', sub: '06:00 – 12:00', icon: '🌅' },
  { label: 'Afternoon', sub: '12:00 – 18:00', icon: '☀️' },
  { label: 'Evening', sub: '18:00 – 24:00', icon: '🌆' },
];

const FlightFiltersSidebar = ({ filters, onChange }) => {
  const [priceRange, setPriceRange] = useState([0, 5000000]);

  const toggleAirline = (airline) => {
    const current = filters.airlines || [];
    const updated = current.includes(airline)
      ? current.filter(a => a !== airline)
      : [...current, airline];
    onChange({ ...filters, airlines: updated });
  };

  const toggleDepTime = (label) => {
    const current = filters.departureTimes || [];
    const updated = current.includes(label)
      ? current.filter(t => t !== label)
      : [...current, label];
    onChange({ ...filters, departureTimes: updated });
  };

  const handleReset = () => {
    onChange({ airlines: [], departureTimes: [], cabinClass: 'all', seatsAvail: false });
    setPriceRange([0, 5000000]);
  };

  const formatVND = (val) => (val / 1000000).toFixed(1) + 'M';

  return (
    <aside className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-bold text-[#1a2b49] text-base flex items-center">
          <svg className="w-4 h-4 mr-2 text-[#7C4A4A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h3>
        <button onClick={handleReset} className="text-xs text-[#7978E9] font-semibold hover:underline">
          Reset all
        </button>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-160px)]">
        {/* Airlines */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Airlines</h4>
          <div className="space-y-2.5">
            {AIRLINES.map(airline => (
              <label key={airline} className="flex items-center space-x-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  (filters.airlines || []).includes(airline)
                    ? 'bg-[#7978E9] border-[#7978E9]'
                    : 'border-gray-300 group-hover:border-[#7978E9]'
                }`}
                  onClick={() => toggleAirline(airline)}>
                  {(filters.airlines || []).includes(airline) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{airline}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Departure Time */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Departure Time</h4>
          <div className="grid grid-cols-2 gap-2">
            {DEPARTURE_TIMES.map(({ label, sub, icon }) => {
              const isActive = (filters.departureTimes || []).includes(label);
              return (
                <button
                  key={label}
                  onClick={() => toggleDepTime(label)}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border-2 text-center transition-all ${
                    isActive
                      ? 'border-[#7978E9] bg-[#7978E9]/10 text-[#7978E9]'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-[11px] font-semibold mt-0.5">{label}</span>
                  <span className="text-[10px] text-gray-500">{sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Price Range</h4>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>{formatVND(priceRange[0])} VND</span>
            <span>{formatVND(priceRange[1])} VND</span>
          </div>
          <input
            type="range"
            min={0}
            max={5000000}
            step={50000}
            value={priceRange[1]}
            onChange={e => {
              const val = Number(e.target.value);
              setPriceRange([priceRange[0], val]);
              onChange({ ...filters, maxPrice: val });
            }}
            className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#7978E9]"
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-[#7978E9] font-semibold">0 VND</span>
            <span className="text-xs text-[#7978E9] font-semibold">5M VND</span>
          </div>
        </div>

        {/* Cabin Class */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Cabin Class</h4>
          <div className="space-y-2">
            {['All', 'Economy', 'Business', 'First Class'].map(cls => (
              <label key={cls} className="flex items-center space-x-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  (filters.cabinClass || 'All') === cls
                    ? 'border-[#7978E9]'
                    : 'border-gray-300 group-hover:border-[#7978E9]'
                }`}
                  onClick={() => onChange({ ...filters, cabinClass: cls })}>
                  {(filters.cabinClass || 'All') === cls && (
                    <div className="w-2 h-2 rounded-full bg-[#7978E9]"></div>
                  )}
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{cls}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Seats Available */}
        <div className="px-5 py-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <h4 className="text-sm font-bold text-gray-800">Seats Available</h4>
              <p className="text-xs text-gray-500">Show only flights with seats</p>
            </div>
            <div
              onClick={() => onChange({ ...filters, seatsAvail: !filters.seatsAvail })}
              className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${filters.seatsAvail ? 'bg-[#7978E9]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${filters.seatsAvail ? 'translate-x-5' : 'translate-x-1'}`}></div>
            </div>
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FlightFiltersSidebar;
