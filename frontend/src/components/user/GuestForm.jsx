import React from 'react';

const GuestForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#7978E9]/10 rounded-xl flex items-center justify-center text-[#7978E9]">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#1a2b49]">Guest Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 focus:border-[#7978E9] focus:bg-white outline-none transition-all font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 focus:border-[#7978E9] focus:bg-white outline-none transition-all font-medium"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
          <div className="flex gap-2">
            <div className="w-20 bg-gray-100 border-2 border-gray-100 rounded-2xl px-3 py-3.5 text-center font-bold text-gray-500 text-sm">
              +84
            </div>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="987 654 321"
              className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 focus:border-[#7978E9] focus:bg-white outline-none transition-all font-medium"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Special Requests (Optional)</label>
          <textarea 
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
            placeholder="e.g. Early check-in, late check-out, higher floor..."
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3.5 focus:border-[#7978E9] focus:bg-white outline-none transition-all font-medium resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default GuestForm;
