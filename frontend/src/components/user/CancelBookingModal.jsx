import React from 'react';

const CancelBookingModal = ({ isOpen, onClose, onConfirm, refundInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-black text-[#1a2b49] text-center mb-2 italic">Cancel Booking?</h3>
          <p className="text-sm text-gray-500 text-center mb-8 px-4">
            Are you sure you want to cancel your stay? This action will follow the hotel's cancellation policy.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8 space-y-3 border border-gray-100">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-gray-400 uppercase tracking-widest">Original Amount</span>
              <span className="text-[#1a2b49]">{refundInfo.originalAmount.toLocaleString()} VND</span>
            </div>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-gray-400 uppercase tracking-widest">Cancellation Fee</span>
              <span className="text-red-500">-{refundInfo.fee.toLocaleString()} VND</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm font-black text-[#1a2b49]">Total Refund</span>
              <span className="text-xl font-black text-green-600">{refundInfo.finalRefund.toLocaleString()} VND</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={onConfirm}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98]"
            >
              Confirm Cancellation
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
            >
              Keep My Booking
            </button>
          </div>
        </div>
        
        <div className="bg-orange-50 py-3 text-center">
          <p className="text-[10px] text-orange-700 font-bold uppercase tracking-widest">
            Refunds usually process within 7-14 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
