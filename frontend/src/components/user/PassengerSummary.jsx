import React from 'react';

const PassengerSummary = ({ passengers }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-bold text-[#1a2b49] mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Passenger Details
      </h3>
      <div className="space-y-4">
        {passengers.map((p, idx) => (
          <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                {idx + 1}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 uppercase">{p.lastName} / {p.firstName}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Adult • Seat: {p.seat || 'Any'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Ticket Number</p>
              <p className="text-xs font-mono font-bold text-gray-700">{p.ticketNumber || 'PENDING'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassengerSummary;
