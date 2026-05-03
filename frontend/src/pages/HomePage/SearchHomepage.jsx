import React, { useState, useRef, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import ToursSearch from './ToursSearch';
import HotelsSearch from './HotelsSearch';
import FlightsSearch from './FlightsSearch';
import CarsAndTrainsSearch from './CarsAndTrainsSearch';
import ThingsToDoSearch from './ThingsToDoSearch';
import MorePopup from './MorePopup';

export default function SearchHomepage() {
  const { t, locale } = useGlobal();
  const [activeCategory, setActiveCategory] = useState('tours');
  const [isMorePopupOpen, setIsMorePopupOpen] = useState(false);
  const tabsRef = useRef([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

  const categories = [
    {
      id: 'tours',
      label: t('tours'),
      icon: (
        <svg className="w-[1.2em] h-[1.2em]" fill="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.5,4c0-1.3-1-2.3-2.3-2.3c-1.3,0-2.3,1-2.3,2.3v5.1h4.7V4z M23.2,34.3c6.3,0,11.5-5.1,11.5-11.5c0-6.3-5.1-11.5-11.5-11.5c-6.3,0-11.5,5.1-11.5,11.5C11.7,29.2,16.8,34.3,23.2,34.3z M38.9,11.7c0.9-0.9,0.9-2.4,0-3.3c-0.9-0.9-2.4-0.9-3.3,0L32,12.1l3.3,3.3L38.9,11.7z M32,33.6l3.6,3.6c0.9,0.9,2.4,0.9,3.3,0c0.9-0.9,0.9-2.4,0-3.3l-3.6-3.6L32,33.6z M36.8,25.2h5.1c1.3,0,2.3-1,2.3-2.3c0-1.3-1-2.3-2.3-2.3h-5.1V25.2z M11,15.4l3.3-3.3l-3.6-3.6c-0.9-0.9-2.4-0.9-3.3,0c-0.9,0.9-0.9,2.4,0,3.3L11,15.4z M20.8,41.7c0,1.3,1,2.3,2.3,2.3c1.3,0,2.3-1,2.3-2.3v-5.1h-4.7V41.7z M4.3,25.2h5.1v-4.7H4.3c-1.3,0-2.3,1-2.3,2.3C2,24.1,3,25.2,4.3,25.2z M7.4,33.9c-0.9,0.9-0.9,2.4,0,3.3c0.9,0.9,2.4,0.9,3.3,0l3.6-3.6L11,30.3L7.4,33.9z M84.4,94.3c-10.4,0-13.6-6-22.4-6c-1,0-2.1,0.1-3.2,0.2l11.5-29.3c1.6-0.2,3.5,0.1,5.5,0.9c2.9,1.1,5,2.9,5.7,4.6c0.2,0.6,0.9,0.8,1.5,0.6c1.7-0.8,4.5-0.7,7.3,0.4c2.1,0.8,3.9,2,4.9,3.3c0.6,0.7,1.8,0.5,2-0.4c3.7-14.9-4.2-30.6-18.9-36.3C63.4,26.5,47,32.9,39.8,46.5c-0.4,0.8,0.3,1.8,1.2,1.7c1.6-0.3,3.7,0,5.8,0.8c2.8,1.1,4.9,2.9,5.6,4.6c0.2,0.6,0.9,0.8,1.5,0.6c1.7-0.8,4.5-0.7,7.3,0.4c2,0.8,3.7,1.9,4.7,3.1L53.4,89.4c-2,0.4-4,0.9-6.3,1.4v-7.7c0-1.1-0.4-2.1-1.2-2.8l3.5-3.5c0.8-0.8,0.8-2,0-2.8s-2-0.8-2.8,0L35.8,85H18.7c-2.8,0-5.1,2.3-5.1,5.1V94C6.3,94.9,2,96.5,2,98.3h96C98,98.3,94.8,94.3,84.4,94.3z M65,50.1c-0.2,0.4-0.5,0.6-0.9,0.6c-0.1,0-0.2,0-0.4-0.1c-0.5-0.2-0.8-0.8-0.6-1.3c0.1-0.4,3-7.9,10.5-11.4c-12.6-1.7-20.3,7-20.6,7.4c-0.2,0.2-0.5,0.3-0.8,0.3c-0.2,0-0.5-0.1-0.7-0.2c-0.4-0.4-0.5-1-0.1-1.4c0.1-0.1,10.2-11.6,26.1-7.3l0,0c0,0,0.1,0,0.1,0.1c0,0,0.1,0,0.1,0c0,0,0,0,0,0C92,45.5,90.1,60.8,90.1,60.9c-0.1,0.5-0.5,0.9-1,0.9c0,0-0.1,0-0.1,0c-0.5-0.1-0.9-0.6-0.9-1.1c0.1-0.5,1.4-12-8.4-20.1c2.5,7.9-1.3,15.2-1.5,15.6c-0.2,0.3-0.5,0.5-0.9,0.5c-0.2,0-0.3,0-0.5-0.1c-0.5-0.3-0.7-0.9-0.4-1.4c0-0.1,4.4-8.5,0.4-16.4C68.3,41.4,65,50,65,50.1z M43.2,91.7c-4.5,0.9-9.5,1.6-15.3,1.6c-3.8,0-7.2,0.1-10.3,0.4v-3.5c0-0.6,0.5-1.1,1.1-1.1h18.7l0.6-0.6c0,0,0,0,0,0l5.2-5.2V91.7z" />
        </svg>
      ),
    },
    {
      id: 'hotels',
      label: t('hotels'),
      icon: (
        <svg className="w-[1.2em] h-[1.2em]" fill="currentColor" viewBox="0 -32 576 576" xmlns="http://www.w3.org/2000/svg">
          <path d="M560 64c8.84 0 16-7.16 16-16V16c0-8.84-7.16-16-16-16H16C7.16 0 0 7.16 0 16v32c0 8.84 7.16 16 16 16h15.98v384H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h240v-80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v80h240c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16h-16V64h16zm-304 44.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm0 96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm-128-96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zM179.2 256h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8zM192 384c0-53.02 42.98-96 96-96s96 42.98 96 96H192zm256-140.8c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-96c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4z" />
        </svg>
      ),
    },
    {
      id: 'flights',
      label: t('flights'),
      icon: (
        <svg className="w-[1.2em] h-[1.2em]" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M490.7,0c-21.3,0-42.7,0-53.3,10.7l-85.3,96H21.3L0,138.7l234.7,74.7l-64,85.3h-96l-32,32l64,21.3v32c0.7,11.5,10.7,21.3,21.3,21.3h32l21.3,64l32-32v-96l85.3-64L373.3,512l32-21.3V160l96-85.3C512,64,512,42.7,512,21.3C512,10.7,501.3,0,490.7,0z" />
        </svg>
      ),
    },
    {
      id: 'carsTrains',
      label: t('carsTrains'),
      icon: (
        <svg className="w-[1.2em] h-[1.2em]" fill="currentColor" viewBox="0 -15.43 122.88 122.88" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.17,34.23c-10.98-5.58-9.72-11.8,1.31-11.15l2.47,4.63l5.09-15.83C21.04,5.65,24.37,0,30.9,0H96c6.53,0,10.29,5.54,11.87,11.87l3.82,15.35l2.2-4.14c11.34-0.66,12.35,5.93,0.35,11.62l1.95,2.99c7.89,8.11,7.15,22.45,5.92,42.48v8.14c0,2.04-1.67,3.71-3.71,3.71h-15.83c-2.04,0-3.71-1.67-3.71-3.71v-4.54H24.04v4.54c0,2.04-1.67,3.71-3.71,3.71H4.5c-2.04,0-3.71-1.67-3.71-3.71V78.2c0-0.2,0.02-0.39,0.04-0.58C-0.37,62.25-2.06,42.15,10.17,34.23L10.17,34.23z M30.38,58.7l-14.06-1.77c-3.32-0.37-4.21,1.03-3.08,3.89l1.52,3.69c0.49,0.95,1.14,1.64,1.9,2.12c0.89,0.55,1.96,0.82,3.15,0.87l12.54,0.1c3.03-0.01,4.34-1.22,3.39-4C34.96,60.99,33.18,59.35,30.38,58.7L30.38,58.7z M54.38,52.79h14.4c0.85,0,1.55,0.7,1.55,1.55l0,0c0,0.85-0.7,1.55-1.55,1.55h-14.4c-0.85,0-1.55-0.7-1.55-1.55l0,0C52.82,53.49,53.52,52.79,54.38,52.79L54.38,52.79z M89.96,73.15h14.4c0.85,0,1.55,0.7,1.55,1.55l0,0c0,0.85-0.7,1.55-1.55,1.55h-14.4c-0.85,0-1.55-0.7-1.55-1.55l0,0C88.41,73.85,89.1,73.15,89.96,73.15L89.96,73.15z M92.5,58.7l14.06-1.77c3.32-0.37,4.21,1.03,3.08,3.89l-1.52,3.69c-0.49,0.95-1.14,1.64-1.9,2.12c-0.89,0.55-1.96,0.82-3.15,0.87l-12.54,0.1c-3.03-0.01-4.34-1.22-3.39-4C87.92,60.99,89.7,59.35,92.5,58.7L92.5,58.7z M18.41,73.15h14.4c0.85,0,1.55,0.7,1.55,1.55l0,0c0,0.85-0.7,1.55-1.55,1.55h-14.4c-0.85,0-1.55-0.7-1.55-1.55l0,0C16.86,73.85,17.56,73.15,18.41,73.15L18.41,73.15z M19.23,31.2h86.82l-3.83-15.92c-1.05-4.85-4.07-9.05-9.05-9.05H33.06c-4.97,0-7.52,4.31-9.05,9.05L19.23,31.2v0.75V31.2L19.23,31.2z" />
        </svg>
      ),
    },
    {
      id: 'thingsToDo',
      label: t('thingsToDo'),
      icon: (
        <svg className="w-[1.2em] h-[1.2em]" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M493.138,216.296c-28.288-31.443-44.004-75.448-44.004-75.448s-15.717,44.005-44.014,75.448c0,0,12.965,6.675,20.044,3.135c0,0-7.079,27.124-38.906,62.885c28.288,7.849,49.506-5.116,49.506-5.116v38.906h10.224h6.282h10.233V277.2c0,0,21.209,12.965,49.497,5.116c-31.828-35.761-38.888-62.885-38.888-62.885C480.172,222.971,493.138,216.296,493.138,216.296z" />
          <path d="M324.611,316.666c-137.717-18.578-165.813-22.951-112.675-57.291c39.3-25.4,125.934-44.152,170.755-58.85h-51.138V14.144h-24.616v186.38h-16.583c-64.453,12.489-121.267,23.382-165.465,43.408c9.024,17.817,21.934,39.732,38.164,57.759l24.437,27.161l-31.8,16.376c2.238,3.86,4.97,8.152,7.95,12.626c73.741,18.679,138.542,25.546,82.718,56.374c-69.908,38.613-116.829,65.388-158.055,83.627H401.47c31.479-23.896,86.432-68.644,95.281-96.014C509.268,363.128,468.096,336.032,324.611,316.666z" />
          <path d="M101.369,401.511c0,0,28.206,17.24,65.819,6.805c-42.317-47.554-51.716-83.608-51.716-83.608c9.399,4.703,26.638-4.173,26.638-4.173c-37.613-41.804-58.51-100.315-58.51-100.315s-20.898,58.511-58.52,100.315c0,0,17.238,8.876,26.647,4.173c0,0-9.408,36.054-51.726,83.608c37.613,10.435,65.828-6.805,65.828-6.805v51.726h13.59h8.353h13.599V401.511z" />
          <path d="M462.677,104.171c0.756-1.394,0.673-3.136-0.22-4.475l-24.653-36.972c-0.962-1.458-0.962-3.365,0-4.833l24.653-36.962c0.894-1.348,0.976-3.072,0.22-4.484c-0.771-1.412-2.247-2.302-3.852-2.302H343.862v92.346h114.963C460.43,106.49,461.902,105.582,462.677,104.171z" />
        </svg>
      ),
    },
    {
      id: 'more',
      label: t('more'),
      icon: (
        <svg className="w-[1.2em] h-[1.2em]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM8 13C7.44 13 7 12.55 7 12C7 11.45 7.45 11 8 11C8.55 11 9 11.45 9 12C9 12.55 8.56 13 8 13ZM12 13C11.44 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12C13 12.55 12.56 13 12 13ZM16 13C15.44 13 15 12.55 15 12C15 11.45 15.45 11 16 11C16.55 11 17 11.45 17 12C17 12.55 16.56 13 16 13Z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const updatePillPosition = () => {
      const activeIndex = categories.findIndex((c) => c.id === activeCategory);
      const activeElement = tabsRef.current[activeIndex];

      if (activeElement && activeCategory !== 'more') {
        setPillStyle({
          left: activeElement.offsetLeft,
          top: activeElement.offsetTop,
          width: activeElement.offsetWidth,
          height: activeElement.offsetHeight,
          opacity: 1,
        });
      } else {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updatePillPosition();
    window.addEventListener('resize', updatePillPosition);
    return () => window.removeEventListener('resize', updatePillPosition);
  }, [activeCategory, t, locale]);

  return (
    <div className="search_homepage_container relative w-full flex flex-col items-center min-h-[647px] mb-[50px] md:overflow-visible">
      <div
        className="absolute top-0 left-0 w-full h-full xl:h-[647px] bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/searchbg_homepage.jpg')" }}
      ></div>

      <h1 className="hero_title mt-10 xl:mt-[85px] mb-10 xl:mb-[70px] text-white text-5xl md:text-7xl xl:text-[84px] font-bold italic [-webkit-text-stroke:2px_black] drop-shadow-md text-center relative z-10 px-4 xl:px-0">
        {t('yourTripStartsHere')}
      </h1>

      <div className="categories_bar_wrapper w-[95%] md:w-auto xl:w-fit xl:mx-auto h-auto xl:h-[56px] bg-[#D9D9D9] rounded-[24px] xl:rounded-full flex flex-nowrap items-center gap-1 px-2 py-3 xl:py-0 shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative z-20 xl:justify-center">
        <div
          className="absolute bg-white border-2 border-white rounded-full transition-all duration-300 ease-in-out z-0"
          style={{
            left: pillStyle.left,
            top: pillStyle.top,
            width: pillStyle.width,
            height: pillStyle.height,
            opacity: pillStyle.opacity,
          }}
        />

        {categories.map((cat, index) => {
          let visibility = '';
          if (cat.id === 'thingsToDo') {
            visibility = 'hidden md:flex';
          } else if (cat.id === 'more') {
            visibility = 'hidden xl:flex';
          } else {
            visibility = 'flex';
          }
          return (
            <div
              key={cat.id}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => {
                if (cat.id === 'more') {
                  setIsMorePopupOpen(true);
                } else {
                  setActiveCategory(cat.id);
                }
              }}
              className={`category_item relative z-10 items-center gap-2 px-2 sm:px-3 md:px-4 py-1 rounded-full border-2 transition-all cursor-pointer text-xs sm:text-sm md:text-base xl:text-lg ${visibility} ${activeCategory === cat.id && cat.id !== 'more'
                  ? 'border-transparent text-[#7C70EB] opacity-100'
                  : 'border-transparent text-black opacity-70 hover:opacity-100 hover:border-black'
                }`}
            >
              {cat.icon}
              <span className="font-semibold whitespace-nowrap">{cat.label}</span>
            </div>
          );
        })}
      </div>

      <div className="main_search_container w-[95%] xl:w-[1500px] max-w-[1500px] h-auto pb-[50px] px-4 md:px-6 xl:px-0 bg-white shadow-[0_10px_4px_rgba(0,0,0,0.25)] rounded-2xl -mt-[28px] flex flex-col items-center justify-start pt-[28px] relative z-10 overflow-visible">
        {activeCategory === 'tours' && <ToursSearch t={t} locale={locale} />}
        {activeCategory === 'hotels' && <HotelsSearch t={t} locale={locale} />}
        {activeCategory === 'flights' && <FlightsSearch t={t} locale={locale} />}
        {activeCategory === 'carsTrains' && <CarsAndTrainsSearch t={t} locale={locale} />}
        {activeCategory === 'thingsToDo' && <ThingsToDoSearch t={t} locale={locale} />}
      </div>

      <MorePopup isOpen={isMorePopupOpen} onClose={() => setIsMorePopupOpen(false)} t={t} />
    </div>
  );
}