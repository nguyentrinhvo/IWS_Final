import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingActions = ({ mode = 'success', onCancel, onChange }) => {
  const navigate = useNavigate();

  if (mode === 'manage') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
        <button 
          onClick={onChange}
          className="flex items-center justify-center gap-2 bg-[#7978E9] hover:bg-[#6b6ae0] text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Change Flight
        </button>

        <button 
          onClick={onCancel}
          className="flex items-center justify-center gap-2 border-2 border-red-100 text-red-500 font-bold py-4 rounded-2xl hover:bg-red-50 transition-all active:scale-[0.98]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Cancel Flight
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[600px] mx-auto pt-6">
      <button 
        className="flex-1 bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download E-ticket
      </button>
      
      <button 
        onClick={() => navigate('/flights')}
        className="flex-1 border-2 border-[#7978E9] text-[#7978E9] font-bold py-4 rounded-xl hover:bg-[#7978E9]/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Back to Home
      </button>
    </div>
  );
};

export default BookingActions;
