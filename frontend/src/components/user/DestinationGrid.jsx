import React from 'react';

const DestinationCard = ({ title, image, flightsCount, isLarge, isTall }) => {
  return (
    <div className={`group rounded-xl overflow-hidden cursor-pointer relative shadow-sm hover:shadow-xl transition-all duration-300 w-full h-full min-h-[160px] ${isTall ? 'md:min-h-[340px]' : (isLarge ? 'md:min-h-[200px]' : 'md:min-h-[160px]')}`}>
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="text-lg md:text-xl font-bold leading-tight">{title}</h3>
        <p className="text-xs text-gray-300 mt-0.5">{flightsCount} flights</p>
      </div>
    </div>
  );
};

const DestinationGrid = ({ title, subtitle, destinations, layoutType = 'domestic', titleIcon }) => {
  return (
    <div className="py-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#1a2b49] flex items-center mb-1">
          {titleIcon}
          <span className="ml-2">{title}</span>
        </h2>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>

      {layoutType === 'domestic' && (
        <div className="flex flex-col gap-4">
          {/* Block 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
            {/* Phu Quoc (Wide) */}
            <div className="md:col-span-2 md:row-span-1">
              <DestinationCard {...destinations[0]} isLarge />
            </div>
            {/* Vung Tau (Tall) */}
            <div className="md:col-span-1 md:row-span-2 h-[340px] md:h-auto">
              <DestinationCard {...destinations[5]} isTall />
            </div>
            {/* Da Lat (Square) */}
            <div className="md:col-span-1 md:row-span-1">
              <DestinationCard {...destinations[1]} />
            </div>
            {/* Quy Nhon (Square) */}
            <div className="md:col-span-1 md:row-span-1">
              <DestinationCard {...destinations[4]} />
            </div>
          </div>

          {/* Block 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
             {/* Nha Trang (Tall) */}
             <div className="md:col-span-1 md:row-span-2 h-[340px] md:h-auto">
              <DestinationCard {...destinations[3]} isTall />
            </div>
            {/* Da Nang (Wide) */}
            <div className="md:col-span-2 md:row-span-1">
              <DestinationCard {...destinations[2]} isLarge />
            </div>
            {/* Phan Thiet (Square) */}
            <div className="md:col-span-1 md:row-span-1">
              <DestinationCard {...destinations[6]} />
            </div>
            {/* Phu Yen (Square) */}
            <div className="md:col-span-1 md:row-span-1">
              <DestinationCard {...destinations[7]} />
            </div>
          </div>
        </div>
      )}

      {layoutType === 'overseas' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {destinations.map((dest, index) => (
            <div key={index} className="h-[160px] md:h-[200px]">
              <DestinationCard {...dest} isLarge />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationGrid;
