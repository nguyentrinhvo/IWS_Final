import React from 'react';

const ContactForm = ({ data, onChange, errors }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#7978E9]/10 flex items-center justify-center text-[#7978E9]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#1a2b49]">Contact Information</h3>
          <p className="text-xs text-gray-500">Tickets and confirmation will be sent here</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
          <input 
            type="text" 
            placeholder="e.g. John Doe"
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
              errors?.fullName ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#7978E9]'
            }`}
            value={data.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
          />
          {errors?.fullName && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
          <input 
            type="email" 
            placeholder="e.g. john@example.com"
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
              errors?.email ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#7978E9]'
            }`}
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          {errors?.email && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone Number</label>
          <input 
            type="tel" 
            placeholder="e.g. +84 123 456 789"
            className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
              errors?.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#7978E9]'
            }`}
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
          {errors?.phone && <p className="text-[10px] text-red-500 mt-1 font-bold">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
