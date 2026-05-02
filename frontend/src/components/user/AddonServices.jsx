import React from 'react';

const AddonServices = ({ addons, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-bold text-[#1a2b49] mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add-on Services
      </h3>

      <div className="space-y-4">
        {/* Extra Baggage */}
        <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${addons.extraBaggage ? 'border-[#7978E9] bg-[#7978E9]/5' : 'border-gray-50 hover:border-gray-100'}`}
          onClick={() => onToggle('extraBaggage')}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Extra Baggage (+15kg)</p>
              <p className="text-xs text-gray-500">Add more space for your trip</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#7978E9] text-sm">+250,000 VND</p>
            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${addons.extraBaggage ? 'bg-[#7978E9] border-[#7978E9]' : 'border-gray-300'}`}>
              {addons.extraBaggage && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
          </div>
        </div>

        {/* Insurance */}
        <div className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${addons.insurance ? 'border-[#7978E9] bg-[#7978E9]/5' : 'border-gray-50 hover:border-gray-100'}`}
          onClick={() => onToggle('insurance')}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Travel Insurance</p>
              <p className="text-xs text-gray-500">Comprehensive protection for your journey</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#7978E9] text-sm">+120,000 VND</p>
            <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${addons.insurance ? 'bg-[#7978E9] border-[#7978E9]' : 'border-gray-300'}`}>
              {addons.insurance && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddonServices;
