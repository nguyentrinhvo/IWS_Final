import React from 'react';
import Seat from './Seat';

const SeatMap = ({ seats, selectedSeats, onToggleSeat }) => {
  // Group seats by row (A, B, C, D...)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const columns = [1, 2, 3, 4]; // 2-2 layout

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-[#1a2b49]">Select Seats</h3>
        <div className="flex gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border-2 border-gray-300 bg-white"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border-2 border-orange-600 bg-orange-500"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded border-2 border-gray-300 bg-gray-200"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      {/* Front of Vehicle Indicator */}
      <div className="w-full h-8 bg-gray-100 rounded-t-3xl mb-8 flex items-center justify-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Front / Driver</span>
      </div>

      {/* Seat Grid */}
      <div className="flex flex-col gap-4 max-w-[280px] mx-auto">
        {rows.map(row => (
          <div key={row} className="flex items-center justify-between gap-4">
            {/* Left side (A1, A2) */}
            <div className="flex gap-2">
              {[1, 2].map(col => {
                const seatId = `${row}${col}`;
                const seatData = seats.find(s => s.id === seatId) || { id: seatId, status: 'available' };
                return (
                  <Seat
                    key={seatId}
                    id={seatId}
                    status={seatData.status}
                    isSelected={selectedSeats.includes(seatId)}
                    onToggle={onToggleSeat}
                  />
                );
              })}
            </div>

            {/* Aisle */}
            <div className="w-8 h-10 flex items-center justify-center text-[10px] font-bold text-gray-300">
              {row}
            </div>

            {/* Right side (A3, A4) */}
            <div className="flex gap-2">
              {[3, 4].map(col => {
                const seatId = `${row}${col}`;
                const seatData = seats.find(s => s.id === seatId) || { id: seatId, status: 'available' };
                return (
                  <Seat
                    key={seatId}
                    id={seatId}
                    status={seatData.status}
                    isSelected={selectedSeats.includes(seatId)}
                    onToggle={onToggleSeat}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Rear of Vehicle */}
      <div className="mt-8 pt-4 border-t border-dashed border-gray-200 text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Exit / Rear</p>
      </div>
    </div>
  );
};

export default SeatMap;
