import React from 'react';

const FlightDetailSummary = ({ flight }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left: Airline and Route */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2">
            <img 
              src={flight.airlineLogo || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png"} 
              alt={flight.airline} 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1a2b49]">{flight.airline}</h2>
            <p className="text-sm text-gray-500 font-medium">{flight.flightNo} • {flight.aircraft}</p>
          </div>
        </div>

        {/* Center: Times and Duration */}
        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1a2b49]">{flight.departTime}</p>
            <p className="text-sm font-semibold text-gray-500">{flight.fromCode}</p>
          </div>

          <div className="flex flex-col items-center flex-1 md:w-32">
            <p className="text-xs text-gray-400 font-medium mb-1">{flight.duration}</p>
            <div className="relative w-full flex items-center">
              <div className="h-[2px] flex-1 bg-gray-200"></div>
              <svg className="w-4 h-4 text-gray-300 mx-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <div className="h-[2px] flex-1 bg-gray-200"></div>
            </div>
            <p className="text-[11px] text-green-600 font-bold mt-1 uppercase tracking-wider">
              {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop(s)`}
            </p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-[#1a2b49]">{flight.arriveTime}</p>
            <p className="text-sm font-semibold text-gray-500">{flight.toCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailSummary;
