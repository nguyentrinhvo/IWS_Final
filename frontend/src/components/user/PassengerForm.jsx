import React from 'react';

const PassengerForm = ({ index, data, onChange, errors }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1a2b49]">Passenger {index + 1}</h3>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Adult</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">First Name (Given Name)</label>
          <input 
            type="text" 
            placeholder="e.g. John"
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
              errors?.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#7978E9]'
            }`}
            value={data.firstName}
            onChange={(e) => onChange(index, 'firstName', e.target.value)}
          />
          {errors?.firstName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Last Name (Family Name)</label>
          <input 
            type="text" 
            placeholder="e.g. Doe"
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
              errors?.lastName ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#7978E9]'
            }`}
            value={data.lastName}
            onChange={(e) => onChange(index, 'lastName', e.target.value)}
          />
          {errors?.lastName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Gender</label>
          <select 
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all appearance-none bg-white ${
              errors?.gender ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#7978E9]'
            }`}
            value={data.gender}
            onChange={(e) => onChange(index, 'gender', e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Date of Birth</label>
          <input 
            type="date" 
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
              errors?.dob ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#7978E9]'
            }`}
            value={data.dob}
            onChange={(e) => onChange(index, 'dob', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Nationality</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none transition-all appearance-none bg-white focus:border-[#7978E9]"
            value={data.nationality}
            onChange={(e) => onChange(index, 'nationality', e.target.value)}
          >
            <option value="Vietnam">Vietnam</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Passport / ID Number</label>
          <input 
            type="text" 
            placeholder="e.g. B1234567"
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
              errors?.idNumber ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#7978E9]'
            }`}
            value={data.idNumber}
            onChange={(e) => onChange(index, 'idNumber', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
