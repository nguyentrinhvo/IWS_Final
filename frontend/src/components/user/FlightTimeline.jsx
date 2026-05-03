import React from 'react';

const FlightTimeline = ({ flight }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-bold text-[#1a2b49] mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Flight Journey
      </h3>

      <div className="space-y-0 relative">
        {/* Timeline Line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gray-100"></div>

        {/* Departure */}
        <div className="relative pl-10 pb-8">
          <div className="absolute left-0 top-1.5 w-[24px] h-[24px] bg-white border-2 border-[#7978E9] rounded-full flex items-center justify-center z-10">
            <div className="w-2 h-2 bg-[#7978E9] rounded-full"></div>
          </div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
            <div>
              <p className="text-lg font-bold text-[#1a2b49]">{flight.departTime} • {flight.departDate}</p>
              <p className="text-sm font-bold text-gray-800">{flight.fromCity} ({flight.fromCode})</p>
              <p className="text-xs text-gray-500 mt-1">{flight.fromAirport}</p>
            </div>
          </div>
        </div>

        {/* Flight Segment Info */}
        <div className="relative pl-10 pb-8">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
             <img 
              src={flight.airlineLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png"} 
              alt={flight.airline} 
              className="w-8 h-8 object-contain"
            />
            <div className="text-xs text-gray-600 space-y-1">
              <p className="font-bold text-gray-800">{flight.airline} • {flight.flightNo}</p>
              <p>{flight.aircraft} • {flight.cabinClass}</p>
              <p>Flight duration: {flight.duration}</p>
            </div>
          </div>
        </div>

        {/* Arrival */}
        <div className="relative pl-10">
          <div className="absolute left-0 top-1.5 w-[24px] h-[24px] bg-white border-2 border-green-500 rounded-full flex items-center justify-center z-10">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
            <div>
              <p className="text-lg font-bold text-[#1a2b49]">{flight.arriveTime} • {flight.arriveDate}</p>
              <p className="text-sm font-bold text-gray-800">{flight.toCity} ({flight.toCode})</p>
              <p className="text-xs text-gray-500 mt-1">{flight.toAirport}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightTimeline;
