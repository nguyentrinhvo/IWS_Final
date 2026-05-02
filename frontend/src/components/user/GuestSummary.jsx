import React from 'react';

const GuestSummary = ({ guest }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-6">
      <h3 className="text-lg font-bold text-[#1a2b49] mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Guest Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Full Name</p>
          <p className="font-bold text-[#1a2b49]">{guest.fullName}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Email</p>
          <p className="font-bold text-[#1a2b49]">{guest.email}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Phone Number</p>
          <p className="font-bold text-[#1a2b49]">{guest.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default GuestSummary;
