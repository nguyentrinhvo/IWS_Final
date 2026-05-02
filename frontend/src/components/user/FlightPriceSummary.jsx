import React from 'react';

const FlightPriceSummary = ({ price, passengers = 1, onContinue }) => {
  const totalPrice = price * passengers;

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-[#1a2b49]">Price Summary</h3>
          </div>
          
          <div className="p-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Adult (x{passengers})</span>
              <span className="font-bold text-gray-800">{(price * passengers).toLocaleString()} VND</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxes and Fees</span>
              <span className="text-green-600 font-bold uppercase text-[10px] bg-green-50 px-1.5 py-0.5 rounded">Included</span>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">Total Price</p>
              <p className="text-xl font-bold text-orange-500">{totalPrice.toLocaleString()} VND</p>
            </div>

            <button 
              onClick={onContinue}
              className="w-full bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-2"
            >
              Continue Booking
            </button>
            <p className="text-[10px] text-gray-400 text-center">By clicking Continue, you agree to the Terms and Conditions.</p>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-[100] flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Price</p>
          <p className="text-xl font-bold text-orange-500">{totalPrice.toLocaleString()} VND</p>
        </div>
        <button 
          onClick={onContinue}
          className="bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          Select
        </button>
      </div>
    </>
  );
};

export default FlightPriceSummary;
