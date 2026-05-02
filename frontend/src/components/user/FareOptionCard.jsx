import React from 'react';

const FareOptionCard = ({ option, isSelected, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className={`group cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 relative overflow-hidden ${
        isSelected 
          ? 'border-[#7978E9] bg-[#7978E9]/5' 
          : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
      }`}
    >
      {option.isBestValue && (
        <div className="absolute top-0 right-0 bg-[#7978E9] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-tighter">
          Best Value
        </div>
      )}
      {option.isCheapest && (
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-tighter">
          Cheapest
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-[#1a2b49] text-lg">{option.name}</h4>
          <p className="text-xs text-gray-500 font-medium">{option.subtitle}</p>
        </div>
        <div className="text-right">
          <p className={`text-xl font-bold ${isSelected ? 'text-[#7978E9]' : 'text-gray-900'}`}>
            {option.price.toLocaleString()} VND
          </p>
        </div>
      </div>

      <ul className="space-y-3 mb-4">
        {option.features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-xs text-gray-600">
            <svg className={`w-4 h-4 mr-2 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={feature.included ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
            </svg>
            <span className={feature.included ? 'text-gray-800 font-medium' : 'text-gray-400 line-through'}>
              {feature.label}
            </span>
          </li>
        ))}
      </ul>

      <div className={`w-full py-2 rounded-xl text-center text-xs font-bold border transition-colors ${
        isSelected 
          ? 'bg-[#7978E9] text-white border-[#7978E9]' 
          : 'bg-white text-gray-600 border-gray-200 group-hover:bg-gray-50'
      }`}>
        {isSelected ? 'Selected' : 'Select'}
      </div>
    </div>
  );
};

export default FareOptionCard;
