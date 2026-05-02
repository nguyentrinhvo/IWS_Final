import React from 'react';
import UserLayout from '../../layouts/UserLayout/UserLayout';
import ThingsToDoSearch from '../HomePage/ThingsToDoSearch';
import SuggestionThings from '../HomePage/SuggestionThings';
import { useGlobal } from '../../context/GlobalContext';

export default function ThingsToDoPage() {
  const { t, locale } = useGlobal();

  return (
    <div className="w-full flex flex-col mb-20">
      <div className="relative w-full h-[400px] flex flex-col items-center justify-center">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/searchbg_homepage.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <h1 className="text-white text-5xl md:text-6xl font-bold italic z-10 drop-shadow-lg text-center px-4">
          {t('thingsToDo')}
        </h1>
        
        <div className="w-full max-w-[1200px] px-4 z-10 mt-8">
           <ThingsToDoSearch t={t} locale={locale} />
        </div>
      </div>

      <div className="w-full max-w-[1320px] mx-auto px-4 mt-12 flex flex-col gap-16">
        <SuggestionThings />
      </div>
    </div>
  );
}
