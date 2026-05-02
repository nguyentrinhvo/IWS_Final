import React, { useState } from 'react';

const BookingLookupForm = ({ onSearch, isLoading }) => {
  const [bookingCode, setBookingCode] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookingCode && contact) {
      onSearch({ bookingCode, contact });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h3 className="text-lg font-bold text-[#1a2b49] mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Find Your Booking
      </h3>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Booking Code (PNR)</label>
          <input 
            type="text" 
            placeholder="e.g. HV-TR-8293X"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none transition-all focus:border-[#7978E9]"
            value={bookingCode}
            onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email or Phone</label>
          <input 
            type="text" 
            placeholder="e.g. user@example.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none transition-all focus:border-[#7978E9]"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Searching...' : 'Search Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingLookupForm;
