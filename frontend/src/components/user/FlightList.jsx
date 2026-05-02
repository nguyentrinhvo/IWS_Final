import React from 'react';
import FlightCard from './FlightCard';

const FlightList = ({ flights, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/6"></div>
              </div>
              <div className="space-y-2 text-right">
                <div className="h-6 bg-gray-200 rounded w-28 ml-auto"></div>
                <div className="h-9 bg-gray-100 rounded w-20 ml-auto"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!flights || flights.length === 0) return null;

  const cheapestPrice = Math.min(...flights.map(f => f.price));
  const fastestDuration = Math.min(...flights.map(f => f.durationMinutes));

  return (
    <div className="space-y-4">
      {flights.map((flight, index) => (
        <FlightCard
          key={flight.id || index}
          flight={flight}
          isCheapest={flight.price === cheapestPrice}
          isFastest={flight.durationMinutes === fastestDuration}
        />
      ))}
    </div>
  );
};

export default FlightList;
