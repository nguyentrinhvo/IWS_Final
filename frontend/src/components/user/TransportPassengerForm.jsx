import React from 'react';

const TransportPassengerForm = ({ seatId, index, data, onChange, errors }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7978E9]/10 flex items-center justify-center text-[#7978E9]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1a2b49]">Seat {seatId}</h3>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Passenger {index + 1}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
          <input 
            type="text" 
            placeholder="e.g. John Doe"
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
              errors?.name ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#7978E9]'
            }`}
            value={data.name || ''}
            onChange={(e) => onChange(index, 'name', e.target.value)}
          />
          {errors?.name && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone Number</label>
          <input 
            type="text" 
            placeholder="e.g. 0912345678"
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
              errors?.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#7978E9]'
            }`}
            value={data.phone || ''}
            onChange={(e) => onChange(index, 'phone', e.target.value)}
          />
          {errors?.phone && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
};

export default TransportPassengerForm;
