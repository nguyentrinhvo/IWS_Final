import React from 'react';

const AppDownloadBanner = () => {
  return (
    <div className="bg-[#00875A] rounded-xl overflow-hidden shadow-sm flex items-center justify-between p-4 relative group cursor-pointer hover:shadow-md transition-shadow">
      {/* Decorative background shapes */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/10 to-transparent"></div>
      <div className="absolute left-[10%] top-[-50%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      
      <div className="flex items-center z-10 space-x-6">
        <div className="flex items-center space-x-4">
          <div className="text-4xl font-bold text-[#006040] opacity-80 flex items-center">
             <span className="text-5xl">%</span>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">Deal xịn chỉ trên app</h2>
            <p className="text-white/90 text-sm md:text-base mt-0.5">
              Giảm đến <span className="font-bold text-[#FFD700]">690K</span> cho bạn mới
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center z-10 space-x-4">
        <div className="hidden md:block w-16 h-16 bg-white rounded-md p-1">
          <img src="/images/qr-code.png" alt="QR Code" className="w-full h-full object-cover" />
        </div>
        <button className="bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-colors text-sm whitespace-nowrap">
          Quét mã tải app
        </button>
      </div>
    </div>
  );
};

export default AppDownloadBanner;
