import React, { useState } from 'react';

const HotelGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Image */}
        <div className="lg:col-span-3 rounded-3xl overflow-hidden h-[300px] md:h-[500px] shadow-lg relative group">
          <img 
            src={activeImage} 
            alt="Hotel main" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 lg:grid-cols-1 gap-4 lg:h-[500px]">
          {images.slice(0, 4).map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative rounded-2xl overflow-hidden h-20 md:h-28 lg:h-full border-2 transition-all ${activeImage === img ? 'border-[#7978E9] shadow-md scale-[1.02]' : 'border-transparent opacity-80 hover:opacity-100'}`}
            >
              <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              {idx === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                  +{images.length - 4}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelGallery;
