import React from 'react';

const DestinationCard = ({ title, image, flightsCount, price }) => {
  return (
    <div className="group rounded-2xl overflow-hidden cursor-pointer relative h-[240px] shadow-sm hover:shadow-xl transition-all duration-300">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-300">{flightsCount} flights</p>
          <p className="font-semibold text-orange-400">From {price}</p>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
