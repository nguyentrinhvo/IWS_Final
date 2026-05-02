import React, { useState } from 'react';

const AIRLINE_LOGOS = {
  'Vietnam Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png',
  'VietJet Air': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/VietJet_Air_logo.svg/200px-VietJet_Air_logo.svg.png',
  'Bamboo Airways': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Bamboo_Airways_Logo.svg/200px-Bamboo_Airways_Logo.svg.png',
  'Pacific Airlines': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Pacific_Airlines_Logo.svg/200px-Pacific_Airlines_Logo.svg.png',
};

const FlightCard = ({ flight, isCheapest, isFastest }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const formatVND = (price) => price.toLocaleString('vi-VN') + ' VND';

  return (
    <div className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md ${
      isCheapest ? 'border-orange-300' : isFastest ? 'border-[#7978E9]/50' : 'border-gray-100'
    }`}>
      {/* Badges */}
      {(isCheapest || isFastest) && (
        <div className="px-5 pt-3 flex gap-2">
          {isCheapest && (
            <span className="bg-orange-100 text-orange-600 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center">
              💰 Cheapest
            </span>
          )}
          {isFastest && (
            <span className="bg-[#7978E9]/10 text-[#7978E9] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center">
              ⚡ Fastest
            </span>
          )}
        </div>
      )}

      <div className="px-5 py-4 flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Airline Logo */}
        <div className="flex-shrink-0 flex items-center gap-3 lg:w-36">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-1">
            <img
              src={AIRLINE_LOGOS[flight.airline] || ''}
              alt={flight.airline}
              className="w-full h-full object-contain"
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 leading-tight">{flight.airline}</p>
            <p className="text-[11px] text-gray-500">{flight.flightNo}</p>
          </div>
        </div>

        {/* Flight Times */}
        <div className="flex-1 flex items-center gap-3">
          {/* Departure */}
          <div className="text-center min-w-[60px]">
            <p className="text-xl font-bold text-[#1a2b49]">{flight.departTime}</p>
            <p className="text-xs font-semibold text-gray-500">{flight.fromCode}</p>
            <p className="text-[11px] text-gray-400 truncate max-w-[80px]">{flight.fromCity}</p>
          </div>

          {/* Duration Line */}
          <div className="flex-1 flex flex-col items-center px-2">
            <p className="text-xs text-gray-500 font-medium mb-1">{formatDuration(flight.durationMinutes)}</p>
            <div className="relative w-full flex items-center">
              <div className="h-px flex-1 bg-gray-300"></div>
              <svg className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              {flight.stops === 0 ? (
                <span className="text-green-600 font-semibold">Non-stop</span>
              ) : (
                <span className="text-orange-500 font-semibold">{flight.stops} stop{flight.stops > 1 ? 's' : ''}</span>
              )}
            </p>
          </div>

          {/* Arrival */}
          <div className="text-center min-w-[60px]">
            <p className="text-xl font-bold text-[#1a2b49]">
              {flight.arriveTime}
              {flight.arrivalDayOffset > 0 && (
                <sup className="text-xs text-orange-500 font-normal ml-0.5">+{flight.arrivalDayOffset}</sup>
              )}
            </p>
            <p className="text-xs font-semibold text-gray-500">{flight.toCode}</p>
            <p className="text-[11px] text-gray-400 truncate max-w-[80px]">{flight.toCity}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-16 bg-gray-100 mx-2"></div>

        {/* Cabin + Seats */}
        <div className="hidden lg:flex flex-col items-center gap-1 min-w-[80px]">
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-medium">{flight.cabinClass}</span>
          <span className="text-[11px] text-gray-500">{flight.seatsLeft} seats left</span>
        </div>

        {/* Price + CTA */}
        <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 lg:ml-4">
          <div className="text-right">
            {flight.originalPrice && (
              <p className="text-xs text-gray-400 line-through">{formatVND(flight.originalPrice)}</p>
            )}
            <p className="text-2xl font-bold text-orange-500 leading-tight">
              {formatVND(flight.price)}
            </p>
            <p className="text-[11px] text-gray-500">per person</p>
          </div>
          <button className="bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-2.5 px-6 rounded-xl shadow-sm transition-colors whitespace-nowrap text-sm">
            Select
          </button>
        </div>
      </div>

      {/* Expand Row */}
      <div className="border-t border-gray-100 px-5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="lg:hidden font-medium bg-gray-100 px-2 py-0.5 rounded">{flight.cabinClass}</span>
          <span className="lg:hidden">{flight.seatsLeft} seats</span>
          <span>Baggage: {flight.baggage}</span>
          {flight.refundable && (
            <span className="text-green-600 font-semibold">✓ Refundable</span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-[#7978E9] text-xs font-semibold hover:underline"
        >
          <span>{isExpanded ? 'Hide details' : 'View details'}</span>
          <svg className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-dashed border-gray-100 px-5 py-4 bg-gray-50/50 rounded-b-2xl">
          <h4 className="text-sm font-bold text-gray-700 mb-3">Flight Details</h4>
          <div className="flex gap-8 text-sm text-gray-600">
            <div className="space-y-1.5">
              <p><span className="font-medium text-gray-800">Flight No:</span> {flight.flightNo}</p>
              <p><span className="font-medium text-gray-800">Aircraft:</span> {flight.aircraft || 'Boeing 737'}</p>
              <p><span className="font-medium text-gray-800">Duration:</span> {formatDuration(flight.durationMinutes)}</p>
            </div>
            <div className="space-y-1.5">
              <p><span className="font-medium text-gray-800">Baggage:</span> {flight.baggage}</p>
              <p><span className="font-medium text-gray-800">Meal:</span> {flight.meal || 'Included'}</p>
              <p><span className="font-medium text-gray-800">Refundable:</span> {flight.refundable ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard;
