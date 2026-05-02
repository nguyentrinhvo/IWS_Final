import React from 'react';

const HeroBanner = ({ title, backgroundImage, children }) => {
  return (
    <div className="relative w-full min-h-[500px] bg-cover bg-center flex flex-col justify-center items-center px-4" style={{ backgroundImage: `url('${backgroundImage}')`, backgroundColor: "#2d5a8b" }}>
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center py-12">
        <h1 className="text-4xl md:text-[54px] font-bold text-white mb-8 text-center drop-shadow-lg italic">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default HeroBanner;
