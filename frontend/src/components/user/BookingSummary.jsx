import React from 'react';

const BookingSummary = ({ 
  mode = 'flight',
  data, // flight or hotel object
  subData, // passengers or room object
  addons = {},
  stayInfo, // { checkIn, checkOut, nights } for hotel
  onContinue 
}) => {
  let baseFare = 0;
  let taxes = 0;
  let total = 0;
  let addonTotal = 0;

  if (mode === 'flight') {
    baseFare = data.price * subData.length;
    taxes = baseFare * 0.1;
    addonTotal = (addons.extraBaggage ? 250000 : 0) + (addons.insurance ? 120000 : 0);
    total = baseFare + taxes + addonTotal;
  } else if (mode === 'hotel') {
    baseFare = subData.price * stayInfo.nights;
    taxes = baseFare * 0.1;
    total = baseFare + taxes;
  } else if (mode === 'transport') {
    baseFare = data.gia * subData.length;
    taxes = baseFare * 0.1;
    total = baseFare + taxes;
  }

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-[#7C4A4A] text-white">
            <h3 className="font-bold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Booking Summary
            </h3>
          </div>
          
          <div className="p-5">
            {/* Overview Section */}
            {mode === 'flight' ? (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <img src={data.airlineLogo} alt="" className="w-10 h-10 object-contain" />
                <div>
                  <p className="text-sm font-bold text-gray-800">{data.fromCode} → {data.toCode}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{data.airline} • {data.date}</p>
                </div>
              </div>
            ) : mode === 'transport' ? (
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl">
                  {data.loai_phuong_tien?.includes('Train') ? '🚆' : '🚌'}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{data.diem_di} → {data.diem_den}</p>
                  <p className="text-[10px] text-gray-500 font-medium">{data.ten_nha_xe} • {data.departDate}</p>
                </div>
              </div>
            ) : (
              <div className="mb-6 pb-6 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-800 mb-1">{data.name}</p>
                <p className="text-[10px] text-gray-500 font-medium mb-3">{data.location}</p>
                <div className="bg-blue-50 p-3 rounded-xl">
                  <p className="text-[11px] font-bold text-blue-700 uppercase mb-1">Your Stay</p>
                  <div className="flex justify-between text-xs font-bold text-blue-900">
                    <span>{stayInfo.checkIn} — {stayInfo.checkOut}</span>
                    <span>{stayInfo.nights} night(s)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">
                  {mode === 'flight' ? `Base Fare (${subData.length} Adult)` : mode === 'transport' ? `Total Fare (${subData.length} Ticket)` : `Room Price (${stayInfo.nights} night)`}
                </span>
                <span className="font-bold text-gray-800">{baseFare.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Taxes & Fees</span>
                <span className="font-bold text-gray-800">{taxes.toLocaleString()} VND</span>
              </div>
              {addonTotal > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Add-ons</span>
                  <span className="font-bold text-[#7978E9]">{addonTotal.toLocaleString()} VND</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between mb-6">
              <p className="text-sm font-bold text-gray-900">Total Amount</p>
              <p className="text-xl font-bold text-orange-500">{total.toLocaleString()} VND</p>
            </div>

            <button 
              onClick={onContinue}
              className="w-full bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-[100] flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Amount</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-orange-500">{total.toLocaleString()} VND</p>
            <button className="text-[10px] text-[#7978E9] font-bold underline">Details</button>
          </div>
        </div>
        <button 
          onClick={onContinue}
          className="bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-3 px-6 rounded-xl shadow-md"
        >
          Payment
        </button>
      </div>
    </>
  );
};

export default BookingSummary;
