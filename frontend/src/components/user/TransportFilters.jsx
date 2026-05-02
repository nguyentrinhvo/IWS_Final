import React from 'react';

const DEPARTURE_TIMES = [
  { label: 'Early Morning', sub: '00:00 – 06:00', icon: '🌙' },
  { label: 'Morning', sub: '06:00 – 12:00', icon: '🌅' },
  { label: 'Afternoon', sub: '12:00 – 18:00', icon: '☀️' },
  { label: 'Evening', sub: '18:00 – 24:00', icon: '🌆' },
];

const VEHICLE_TYPES = [
  { label: 'Bus (Sleeper)', value: 'bus_sleeper' },
  { label: 'Bus (Seat)', value: 'bus_seat' },
  { label: 'Train (Soft seat)', value: 'train_soft' },
  { label: 'Train (Hard seat)', value: 'train_hard' },
];

const TransportFilters = ({ filters, onChange }) => {

  const toggleFilter = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const handleReset = () => {
    onChange({ departureTimes: [], vehicleTypes: [], maxPrice: 2000000 });
  };

  const formatVND = (val) => (val / 1000).toFixed(0) + 'k';

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
        {/* Departure Time */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Departure Time</h4>
          <div className="grid grid-cols-2 gap-2">
            {DEPARTURE_TIMES.map(({ label, sub, icon }) => {
              const isActive = (filters.departureTimes || []).includes(label);
              return (
                <button
                  key={label}
                  onClick={() => toggleFilter('departureTimes', label)}
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

        {/* Vehicle Type */}
        <div className="px-5 py-4 border-b border-gray-100">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Vehicle Type</h4>
          <div className="space-y-2.5">
            {VEHICLE_TYPES.map(type => (
              <label key={type.value} className="flex items-center space-x-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  (filters.vehicleTypes || []).includes(type.value)
                    ? 'bg-[#7978E9] border-[#7978E9]'
                    : 'border-gray-300 group-hover:border-[#7978E9]'
                }`}
                  onClick={() => toggleFilter('vehicleTypes', type.value)}>
                  {(filters.vehicleTypes || []).includes(type.value) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="px-5 py-4">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Price Range</h4>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>0 VND</span>
            <span>{formatVND(filters.maxPrice || 2000000)} VND</span>
          </div>
          <input
            type="range"
            min={0}
            max={2000000}
            step={50000}
            value={filters.maxPrice || 2000000}
            onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#7978E9]"
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-[#7978E9] font-semibold">0 VND</span>
            <span className="text-xs text-[#7978E9] font-semibold">2M VND</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default TransportFilters;
