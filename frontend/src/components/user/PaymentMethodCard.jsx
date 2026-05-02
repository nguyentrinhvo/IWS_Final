import React from 'react';

const PaymentMethodCard = ({ id, name, description, logo, isSelected, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(id)}
      className={`group cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 flex items-center justify-between ${
        isSelected 
          ? 'border-[#7978E9] bg-[#7978E9]/5' 
          : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center p-2 bg-white border ${isSelected ? 'border-[#7978E9]' : 'border-gray-100'}`}>
          <img src={logo} alt={name} className="w-full h-full object-contain" />
        </div>
        <div>
          <h4 className="font-bold text-[#1a2b49] text-sm">{name}</h4>
          <p className="text-[11px] text-gray-500 leading-tight">{description}</p>
        </div>
      </div>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
        isSelected ? 'bg-[#7978E9] border-[#7978E9]' : 'border-gray-300'
      }`}>
        {isSelected && (
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodCard;
