import React, { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';

const TourFilters = ({ filters, onFilterChange, locations, priceRange, onClose }) => {
  const { t, language } = useGlobal();

  const handleLocationChange = (loc) => {
    onFilterChange({ location: loc });
  };

  const handlePriceChange = (e) => {
    onFilterChange({ maxPrice: parseInt(e.target.value) });
  };

  const handleDurationChange = (min, max) => {
    onFilterChange({ minDuration: min, maxDuration: max });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat(language === 'VI' ? 'vi-VN' : 'en-US').format(price) + ' VND';
  };

  const durationOptions = [
    { label: t('allDurations') || 'All durations', min: 0, max: 100 },
    { label: '1-3 ' + t('days'), min: 1, max: 3 },
    { label: '4-7 ' + t('days'), min: 4, max: 7 },
    { label: '8-14 ' + t('days'), min: 8, max: 14 },
    { label: '14+ ' + t('days'), min: 15, max: 100 },
  ];

  return (
    <div className="w-full flex flex-col gap-6 p-5 bg-white lg:rounded-xl lg:border border-gray-200 overflow-y-auto max-h-screen custom_scrollbar">
      {/* Mobile Header */}
      {onClose && (
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-xl font-bold text-gray-900">{t('filters') || 'Filters'}</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Location Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-lg text-gray-900">{t('destination') || 'Destination'}</h3>
        <div className="flex flex-col gap-2">
          {locations.map((loc) => (
            <label key={loc} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="location"
                checked={filters.location === loc}
                onChange={() => handleLocationChange(loc)}
                className="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-base ${filters.location === loc ? 'text-blue-600 font-bold' : 'text-gray-700 group-hover:text-gray-900'}`}>
                {loc === 'all' ? (t('allDestinations') || 'All Destinations') : loc}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 w-full"></div>

      {/* Price Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-lg text-gray-900">{t('maxPrice') || 'Max Price'}</h3>
        <div className="flex flex-col gap-2">
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            step={500000}
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>{formatPrice(priceRange.min)}</span>
            <span className="text-blue-600 font-bold">{formatPrice(filters.maxPrice)}</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 w-full"></div>

      {/* Duration Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-lg text-gray-900">{t('duration') || 'Duration'}</h3>
        <div className="grid grid-cols-1 gap-2">
          {durationOptions.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleDurationChange(opt.min, opt.max)}
              className={`py-2.5 px-4 text-left text-sm rounded-lg border transition-all ${
                filters.minDuration === opt.min && filters.maxDuration === opt.max
                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white font-medium'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Apply Button */}
      {onClose && (
        <div className="mt-4 pt-4 border-t border-gray-200 lg:hidden">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
          >
            {t('applyFilters') || 'Apply Filters'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TourFilters;
