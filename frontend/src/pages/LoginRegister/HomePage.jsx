import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';

export default function SearchHomepage() {
  const { t, locale } = useGlobal();
  const [activeCategory, setActiveCategory] = useState('tours');
  const [activeHotelFilter, setActiveHotelFilter] = useState('all');
  const [activeFlightFilter, setActiveFlightFilter] = useState('oneWayRoundTrip');
  const [isReturnFlight, setIsReturnFlight] = useState(false);
  const [today, setToday] = useState(new Date());
  const [tomorrow, setTomorrow] = useState(new Date());

  useEffect(() => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setToday(currentDate);
    setTomorrow(nextDate);
  }, []);

  const formatDate = (date, currentLocale) => {
    if (!date) return '';
    const day = date.getDate();
    const year = date.getFullYear();
    if (currentLocale === 'vi') {
      return `${day} thg ${date.getMonth() + 1} ${year}`;
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[date.getMonth()]} ${year}`;
  };

  const categories = [
    { id: 'tours', label: t('tours'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /> },
    { id: 'hotels', label: t('hotels'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" /> },
    { id: 'flights', label: t('flights'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /> },
    { id: 'carsTrains', label: t('carsTrains'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /> },
    { id: 'thingsToDo', label: t('thingsToDo'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-1.125 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" /> },
    { id: 'more', label: t('more'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /> }
  ];

  const hotelFilters = [
    { id: 'all', label: t('all'), icon: null },
    { id: 'hotels', label: t('hotels'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" /> },
    { id: 'villas', label: t('villas'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" /> },
    { id: 'apartments', label: t('apartments'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75V21" /> }
  ];

  const flightFilters = [
    { id: 'oneWayRoundTrip', label: t('oneWayRoundTrip') },
    { id: 'multiCity', label: t('multiCity') }
  ];

  return (
    <div className="search_homepage_container w-full h-[647px] bg-[url('/images/searchbg_homepage.jpg')] bg-cover bg-center flex flex-col items-center relative">
      <h1 className="hero_title mt-[85px] mb-[70px] text-white text-[84px] font-bold italic [-webkit-text-stroke:2px_black] drop-shadow-md">
        {t('yourTripStartsHere')}
      </h1>

      <div className="categories_bar_wrapper w-auto min-w-[1016px] h-[56px] bg-[#D9D9D9] rounded-full flex items-center justify-center gap-2 px-4 z-10 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`category_item flex items-center gap-2 px-6 py-2 rounded-full border-2 transition-all cursor-pointer text-lg ${
              activeCategory === cat.id
                ? 'bg-white border-white text-[#7C70EB] opacity-100'
                : 'bg-transparent border-transparent text-black opacity-70 hover:opacity-100 hover:border-black'
            }`}
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[1.2em] h-[1.2em]">
              {cat.icon}
            </svg>
            <span className="font-semibold whitespace-nowrap">{cat.label}</span>
          </div>
        ))}
      </div>

      <div className="main_search_container w-[1500px] h-[300px] bg-white shadow-[0_10px_4px_rgba(0,0,0,0.25)] rounded-2xl -mt-[28px] z-0 flex flex-col items-center justify-center pt-[28px] relative">
        
        {activeCategory === 'hotels' && (
          <div className="hotel_filters_wrapper absolute top-[65px] left-[48px] flex items-center gap-1">
            {hotelFilters.map((hf) => (
              <div
                key={hf.id}
                onClick={() => setActiveHotelFilter(hf.id)}
                className={`hotel_filter_item flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer transition-colors border border-transparent ${
                  activeHotelFilter === hf.id
                    ? 'bg-[#7C70EB] text-white shadow-sm'
                    : 'bg-[#D9D9D9] text-[#180B51]'
                }`}
              >
                {hf.icon && (
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[1.1em] h-[1.1em]">
                    {hf.icon}
                  </svg>
                )}
                <span className="text-[14px] font-bold">{hf.label}</span>
              </div>
            ))}
          </div>
        )}

        {activeCategory === 'flights' && (
          <div className="flights_filters_wrapper absolute top-[65px] left-[48px] right-[48px] flex items-center justify-between">
            <div className="flights_filter_left flex items-center gap-1">
              {flightFilters.map((ff) => (
                <div
                  key={ff.id}
                  onClick={() => setActiveFlightFilter(ff.id)}
                  className={`flight_filter_item flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer transition-colors border border-transparent ${
                    activeFlightFilter === ff.id
                      ? 'bg-[#7C70EB] text-white shadow-sm'
                      : 'bg-[#D9D9D9] text-[#180B51]'
                  }`}
                >
                  <span className="text-[14px] font-bold">{ff.label}</span>
                </div>
              ))}
            </div>
            
            <div className="flights_filter_right flex items-center gap-4">
              <label className="flights_direct_checkbox flex items-center gap-2 cursor-pointer text-[#180B51] font-bold text-[14px]">
                <input type="checkbox" className="w-4 h-4 accent-[#7C70EB] cursor-pointer" />
                {t('directFlightsOnly')}
              </label>
              
              <div className="flights_selectors_wrapper flex items-center gap-1">
                <div className="flights_guest_selector border-[1px] border-black rounded-lg bg-transparent flex items-center gap-8 px-3 py-1.5 w-auto min-w-[200px] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <span className="text-[14px] text-[#180B51] font-medium whitespace-nowrap">{t('flightGuests')}</span>
                  </div>
                  <svg className="w-4 h-4 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>

                <div className="flights_class_selector border-[1px] border-black rounded-lg bg-transparent flex items-center justify-between px-3 py-1.5 w-[160px] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.118v0H5.622v0c-1.085-.082-1.872-1.024-1.872-2.118v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.027-.392.05-.59.068m-14.736.03c-.198-.018-.396-.04-.59-.068m-4.5-8.006V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 10.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span className="text-[14px] text-[#180B51] font-medium">{t('economy')}</span>
                  </div>
                  <svg className="w-4 h-4 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="input_bar_section w-[1403px] h-[73px] mt-[40px]">
          {activeCategory === 'tours' && (
            <div className="tours_input_wrapper w-full h-full border-[5px] border-[#D9D9D9] rounded-xl flex relative">
              <div style={{ width: '29.3%' }} className="h-full border-r-[5px] border-[#D9D9D9] relative flex items-center px-4 gap-4">
                <span className="absolute -top-[30px] left-0 text-black font-bold text-[15px]">{t('whereToGo')}</span>
                <svg className="w-8 h-8 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input 
                  type="text" 
                  placeholder={t('cityOrRegion')} 
                  className="w-full h-full bg-transparent outline-none text-[#180B51] text-lg placeholder-[#180B51]/60"
                />
              </div>

              <div style={{ width: '19.2%' }} className="h-full border-r-[5px] border-[#D9D9D9] relative flex items-center px-4 gap-4">
                <span className="absolute -top-[30px] left-0 text-black font-bold text-[15px]">{t('startDate')}</span>
                <svg className="w-8 h-8 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <span className="text-[#180B51] text-lg">{t('flexible')}</span>
              </div>

              <div style={{ width: '19.0%' }} className="h-full border-r-[5px] border-[#D9D9D9] relative flex items-center px-4 gap-4">
                <span className="absolute -top-[30px] left-0 text-black font-bold text-[15px]">{t('departureFrom')}</span>
                <svg className="w-8 h-8 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                <span className="text-[#180B51] text-lg">{t('all')}</span>
              </div>

              <div style={{ width: '32.5%' }} className="h-full relative flex items-center px-4 gap-4">
                <span className="absolute -top-[30px] left-0 text-black font-bold text-[15px]">{t('guests')}</span>
                <svg className="w-8 h-8 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span className="text-[#180B51] text-lg">{t('adultChild')}</span>
              </div>

              <div className="w-[65px] h-full bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-r-md shrink-0 transition-colors hover:bg-[#b57215]">
                <svg className="w-7 h-7 text-white font-bold" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>
          )}

          {activeCategory === 'hotels' && (
            <div className="hotels_input_wrapper w-full h-full border-[5px] border-[#D9D9D9] rounded-xl flex relative">
              <div style={{ width: '34.4%' }} className="h-full border-r-[5px] border-[#D9D9D9] relative flex items-center px-4 gap-4">
                <span className="absolute -top-[30px] left-0 text-black font-bold text-[15px]">{t('cityDestinationHotel')}</span>
                <svg className="w-8 h-8 text-[#180B51] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input 
                  type="text" 
                  placeholder={t('cityHotelPlace')} 
                  className="w-full h-full bg-transparent outline-none text-[#180B51] text-lg placeholder-[#180B51]/60"
                />
              </div>

              <div style={{ width: '32.6%' }} className="h-full border-r-[5px] border-[#D9D9D9] relative flex items-center px-4 gap-4">
                <span className="absolute -top-[30px] left-0 text-black font-bold text-[15px]">{t('checkInCheckOut')}</span>
                <svg className="w-8 h-8 text-[#180B51] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <div className="flex w-full justify-between items-center pr-2">
                  <div className="flex flex-col text-left">
                    <span className="text-[#180B51]/60 text-[13px] leading-tight font-bold">{t('checkIn')}</span>
                    <span className="text-[#180B51] text-lg font-medium leading-tight">{formatDate(today, locale)}</span>
                  </div>
                  <span className="text-[#180B51]/60 text-[13px] font-bold">1 {t('night')}</span>
                  <div className="flex flex-col text-left">
                    <span className="text-[#180B51]/60 text-[13px] leading-tight font-bold">{t('checkOut')}</span>
                    <span className="text-[#180B51] text-lg font-medium leading-tight">{formatDate(tomorrow, locale)}</span>
                  </div>
                </div>
              </div>

              <div style={{ width: '33%' }} className="h-full relative flex items-center px-4 gap-4">
                <span className="absolute -top-[30px] left-0 text-black font-bold text-[15px]">{t('guestsAndRooms')}</span>
                <svg className="w-8 h-8 text-[#180B51] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span className="text-[#180B51] text-lg truncate">{t('adultChildRoom')}</span>
              </div>

              <div className="w-[65px] h-full bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-r-md shrink-0 transition-colors hover:bg-[#b57215]">
                <svg className="w-7 h-7 text-white font-bold" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>
          )}

          {activeCategory === 'flights' && (
            <div className="flights_input_wrapper w-full h-full flex gap-4">
              <div className="flights_location_block flex-1 border-[5px] border-[#D9D9D9] rounded-xl flex relative bg-transparent">
                <div className="flights_from_section w-1/2 h-full relative flex items-center px-4 gap-4">
                  <span className="flights_from_label absolute -top-[30px] left-0 text-black font-bold text-[15px]">{t('from')}</span>
                  <svg className="w-8 h-8 text-[#180B51] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                  <span className="text-[#180B51] text-lg">{t('emptyLocation')}</span>
                </div>

                <div className="flights_vertical_divider w-[5px] bg-[#D9D9D9] h-full relative">
                   <div className="flights_swap_btn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white border-[2px] border-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-gray-50">
                      <svg className="w-5 h-5 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                      </svg>
                   </div>
                </div>

                <div className="flights_to_section w-1/2 h-full relative flex items-center px-4 gap-4">
                  <span className="flights_to_label absolute -top-[30px] left-0 text-black font-bold text-[15px]">{t('to')}</span>
                  <svg className="w-8 h-8 text-[#180B51] shrink-0 transform rotate-45" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                  <span className="text-[#180B51] text-lg">{t('emptyLocation')}</span>
                </div>
              </div>

              <div className="flights_date_block flex-1 border-[5px] border-[#D9D9D9] rounded-xl flex relative bg-transparent">
                <div className="flights_departure_section w-1/2 h-full border-r-[5px] border-[#D9D9D9] relative flex items-center px-4 gap-4">
                  <span className="flights_departure_label absolute -top-[30px] left-0 text-black font-bold text-[15px]">{t('departureDate')}</span>
                  <svg className="w-8 h-8 text-[#180B51] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span className="text-[#180B51] text-lg font-medium">{formatDate(today, locale)}</span>
                </div>
                
                <div className={`flights_return_section w-1/2 h-full relative flex items-center px-4 gap-4 transition-all ${!isReturnFlight ? 'opacity-40 grayscale' : ''}`}>
                  <label className="flights_return_label absolute -top-[30px] left-0 text-black font-bold text-[15px] flex items-center gap-1.5 cursor-pointer z-10 opacity-100 grayscale-0">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-[#7C70EB] cursor-pointer" 
                      checked={isReturnFlight} 
                      onChange={(e) => setIsReturnFlight(e.target.checked)} 
                    />
                    {t('returnDate')}
                  </label>
                  <svg className="w-8 h-8 text-[#180B51] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  <span className="text-[#180B51] text-lg font-medium">{formatDate(tomorrow, locale)}</span>
                </div>
              </div>

              <div className="flights_search_btn w-[73px] h-full bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-xl border-[5px] border-[#D9D9D9] shrink-0 transition-colors hover:bg-[#b57215]">
                <svg className="w-7 h-7 text-white font-bold" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
