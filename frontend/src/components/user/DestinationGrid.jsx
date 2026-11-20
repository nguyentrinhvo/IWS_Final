import React from 'react';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ title, image, flightsCount, isLarge, isTall, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`group rounded-xl overflow-hidden cursor-pointer relative shadow-sm hover:shadow-xl transition-all duration-300 w-full h-full min-h-[160px] ${
        isTall ? 'h-full' : (isLarge ? 'h-full' : 'h-full')
      }`}
    >
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://picsum.photos/seed/${title.replace(/\s+/g,'')}/800/600`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="text-lg md:text-xl font-bold leading-tight">{title}</h3>
        <p className="text-xs text-gray-300 mt-0.5">{flightsCount}</p>
      </div>
    </div>
  );
};

const DestinationGrid = ({ title, subtitle, destinations, layoutType = 'domestic', titleIcon }) => {
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    navigate('/hotels/search', {
      state: {
        location: city,
        checkIn: '',
        checkOut: '',
        guests: '2 Adults, 1 Room'
      }
    });
  };

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[340px]">
            {/* Phu Quoc (Wide - Top Left) */}
            <div className="md:col-span-2 md:row-span-1">
              <DestinationCard {...destinations[0]} isLarge onClick={() => handleCityClick(destinations[0].title)} />
            </div>
            {/* Vung Tau (Tall - Right side) */}
            <div className="md:col-span-1 md:row-span-2">
              <DestinationCard {...destinations[5]} isTall onClick={() => handleCityClick(destinations[5].title)} />
            </div>
            {/* Da Lat (Square - Bottom Left) */}
            <div className="md:col-span-1 md:row-span-1">
              <DestinationCard {...destinations[1]} onClick={() => handleCityClick(destinations[1].title)} />
            </div>
            {/* Hoi An (Square - Bottom Center) */}
            <div className="md:col-span-1 md:row-span-1">
              <DestinationCard {...destinations[4]} onClick={() => handleCityClick(destinations[4].title)} />
            </div>
          </div>

          {/* Block 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[340px]">
             {/* Nha Trang (Tall - Left side) */}
             <div className="md:col-span-1 md:row-span-2">
              <DestinationCard {...destinations[3]} isTall onClick={() => handleCityClick(destinations[3].title)} />
            </div>
            {/* Da Nang (Wide - Top Right) */}
            <div className="md:col-span-2 md:row-span-1">
              <DestinationCard {...destinations[2]} isLarge onClick={() => handleCityClick(destinations[2].title)} />
            </div>
            {/* Hue (Square - Bottom Center) */}
            <div className="md:col-span-1 md:row-span-1">
              <DestinationCard {...destinations[6]} onClick={() => handleCityClick(destinations[6].title)} />
            </div>
            {/* Sa Pa (Square - Bottom Right) */}
            <div className="md:col-span-1 md:row-span-1">
              <DestinationCard {...destinations[7]} onClick={() => handleCityClick(destinations[7].title)} />
            </div>
          </div>
        </div>
      )}

      {layoutType === 'overseas' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {destinations.map((dest, index) => (
            <div key={index} className="h-[180px]">
              <DestinationCard {...dest} isLarge onClick={() => handleCityClick(dest.title)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationGrid;
