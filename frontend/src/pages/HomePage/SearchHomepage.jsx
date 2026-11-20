import React, { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import MorePopup from './MorePopup';

export default function SearchHomepage() {
  const { t } = useGlobal();
  const [isMorePopupOpen, setIsMorePopupOpen] = useState(false);

  return (
    <div className="search_homepage_container relative w-full flex flex-col items-center min-h-[450px] mb-[50px]">
      <div
        className="absolute top-0 left-0 w-full h-full xl:h-[450px] bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/searchbg_homepage.jpg')" }}
      ></div>

      <h1 className="hero_title mt-10 xl:mt-[140px] text-white text-5xl md:text-7xl xl:text-[84px] font-bold italic [-webkit-text-stroke:2px_black] drop-shadow-md text-center relative z-10 px-4 xl:px-0">
        {t('yourTripStartsHere')}
      </h1>

      <MorePopup isOpen={isMorePopupOpen} onClose={() => setIsMorePopupOpen(false)} t={t} />
    </div>
  );
}
