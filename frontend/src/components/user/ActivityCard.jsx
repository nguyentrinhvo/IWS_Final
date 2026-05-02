import React from 'react';

const ActivityCard = ({ title, location, image, price, originalPrice }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 group cursor-pointer flex flex-col h-full relative">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {/* Red Tag */}
        <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10">
          Nhanh chóng
        </div>
      </div>
      
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-[11px] text-orange-500 font-medium mb-2">{location}</p>
        
        <div className="mt-auto pt-2 flex items-end justify-end">
          <div className="text-right">
             <div className="flex items-center justify-end space-x-1">
              {originalPrice && (
                <span className="bg-orange-100 text-orange-600 text-[9px] font-bold px-1 py-0.5 rounded">SAVE 10%</span>
              )}
            </div>
            <p className="font-bold text-orange-500 text-sm mt-0.5">{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
