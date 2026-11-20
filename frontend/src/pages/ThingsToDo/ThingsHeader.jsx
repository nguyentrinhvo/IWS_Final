import React from 'react';
import { useGlobal } from '../../context/GlobalContext';

const ThingsHeader = () => {
  const { t } = useGlobal();

  return (
    <div className="things_header_container relative w-full h-[220px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://cdn-media.sforum.vn/storage/app/media/ctvseo_maihue/hinh-nen-nui-doi/hinh-nen-nui-doi-49.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1 className="hero_title text-white text-[36px] md:text-[52px] font-extrabold italic drop-shadow-lg tracking-tight"
          style={{ WebkitTextStroke: '1px rgba(0,0,0,0.5)' }}>
          {t('thingsToDo')}
        </h1>
        <p className="text-white/90 text-base md:text-lg mt-2 font-medium drop-shadow">
          {t('ttd_all_activities_desc')}
        </p>
      </div>
    </div>
  );
};

export default ThingsHeader;
