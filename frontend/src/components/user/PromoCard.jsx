import React from 'react';

const PromoCard = ({ title, description, code, titleIcon }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col">
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-bold text-gray-900 text-sm flex items-center">
          {titleIcon}
          <span className="ml-1.5">{title}</span>
        </h3>
        {/* Info dot top right */}
        <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-800 font-bold cursor-pointer">
          i
        </div>
      </div>
      <p className="text-gray-500 text-xs mb-4">{description}</p>
      
      {/* Dashed separator */}
      <div className="w-full border-t border-dashed border-gray-200 my-2 relative">
        {/* Cutouts */}
        <div className="absolute -left-5 -top-[8px] w-4 h-4 rounded-full bg-gray-50 border-r border-gray-200"></div>
        <div className="absolute -right-5 -top-[8px] w-4 h-4 rounded-full bg-gray-50 border-l border-gray-200"></div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="flex items-center text-blue-600 font-bold text-xs bg-blue-50 px-2 py-1 rounded">
          <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          {code}
        </div>
        <button className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
          Copy
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
