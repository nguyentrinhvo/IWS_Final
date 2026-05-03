import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import {
  CalendarIcon,
  GuestIcon,
  AdultIcon,
  ChildIcon,
  ToursDepartureIcon
} from '../HomePage/SearchIcons';
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getWeekDays,
  getMonthName,
  formatDate
} from '../../utils/SearchUtils';
import { getTourDestinations, getTourOrigins } from '../../data/mockData';

export default function SearchToursPage() {
  const navigate = useNavigate();
  const { t, locale } = useGlobal();

  const [tourDestination, setTourDestination] = useState('');
  const [isTourDestOpen, setIsTourDestOpen] = useState(false);
  const tourDestRef = useRef(null);

  const [tourDate, setTourDate] = useState(null);
  const [isTourDateOpen, setIsTourDateOpen] = useState(false);
  const [calendarCurrentMonth, setCalendarCurrentMonth] = useState(new Date());
  const tourDateRef = useRef(null);

  const [tourOrigin, setTourOrigin] = useState(t('all'));
  const [isTourOriginOpen, setIsTourOriginOpen] = useState(false);
  const tourOriginRef = useRef(null);

  const [tourAdults, setTourAdults] = useState(1);
  const [tourChildren, setTourChildren] = useState(0);
  const [isTourGuestsOpen, setIsTourGuestsOpen] = useState(false);
  const [showGuestLimitMsg, setShowGuestLimitMsg] = useState(false);
  const [childAges, setChildAges] = useState(Array(6).fill(1));
  const [openAgeIndex, setOpenAgeIndex] = useState(null);
  const tourGuestsRef = useRef(null);

  const tourDestinationsMock = getTourDestinations(t);
  const tourOriginsMock = getTourOrigins(t);

  const handleAddGuest = (type, amount) => {
    const total = tourAdults + tourChildren;
    if (amount > 0 && total >= 7) {
      setShowGuestLimitMsg(true);
      setTimeout(() => setShowGuestLimitMsg(false), 3000);
      return;
    }
    setShowGuestLimitMsg(false);
    if (type === 'adult') {
      if (amount < 0 && tourAdults <= 1) return;
      setTourAdults(prev => prev + amount);
    } else {
      if (amount < 0 && tourChildren <= 0) return;
      setTourChildren(prev => prev + amount);
    }
  };

  const handlePrevMonth = () => {
    const currentRealMonth = new Date();
    if (calendarCurrentMonth.getFullYear() === currentRealMonth.getFullYear() &&
        calendarCurrentMonth.getMonth() === currentRealMonth.getMonth()) {
      return;
    }
    setCalendarCurrentMonth(new Date(calendarCurrentMonth.getFullYear(), calendarCurrentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarCurrentMonth(new Date(calendarCurrentMonth.getFullYear(), calendarCurrentMonth.getMonth() + 1, 1));
  };

  const renderCalendarMonth = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const daysCount = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const weekDays = getWeekDays(locale);

    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);

    const blanks = Array.from({ length: firstDayIndex }).map((_, i) => (
      <div key={`blank-${i}`} className="w-8 h-8"></div>
    ));

    const days = Array.from({ length: daysCount }).map((_, i) => {
      const dayNum = i + 1;
      const currentDate = new Date(year, month, dayNum);
      const isPast = currentDate < todayAtMidnight;
      const isSelected = tourDate && currentDate.getTime() === tourDate.getTime();

      return (
        <div
          key={dayNum}
          onClick={() => {
            if (!isPast) {
              setTourDate(currentDate);
              setIsTourDateOpen(false);
            }
          }}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
            isPast
              ? 'text-[#180B51]/30 cursor-not-allowed'
              : isSelected
              ? 'bg-[#180B51] text-white cursor-pointer'
              : 'text-[#180B51] hover:bg-gray-100 cursor-pointer'
          }`}
        >
          {dayNum}
        </div>
      );
    });

    return (
      <div className="flex flex-col w-full px-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDays.map(wd => (
            <div key={wd} className="text-[#D9D9D9] text-xs font-bold">{wd}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 place-items-center">
          {blanks}
          {days}
        </div>
      </div>
    );
  };

  const handleSearch = () => {
    navigate('/tours-booking', { 
      state: { 
        tourDestination, 
        tourDate: tourDate ? tourDate.toISOString() : null, 
        tourOrigin, 
        tourAdults, 
        tourChildren, 
        childAges 
      } 
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tourDestRef.current && !tourDestRef.current.contains(event.target)) setIsTourDestOpen(false);
      if (tourDateRef.current && !tourDateRef.current.contains(event.target)) setIsTourDateOpen(false);
      if (tourOriginRef.current && !tourOriginRef.current.contains(event.target)) setIsTourOriginOpen(false);
      if (tourGuestsRef.current && !tourGuestsRef.current.contains(event.target)) {
        setIsTourGuestsOpen(false);
        setOpenAgeIndex(null);
        setShowGuestLimitMsg(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    setCalendarCurrentMonth(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  }, []);

  return (
    <div className="search_tourspage_container relative w-full flex flex-col items-center">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/searchbg_tourspage.jpg')" }}
      ></div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col justify-center px-4 md:px-6 gap-6 py-6 md:py-0 md:min-h-[400px]">
        
        <div className="hidden lg:flex flex-col items-start text-left w-full">
          <h1 className="hero_title text-white text-[36px] md:text-[48px] font-bold italic [-webkit-text-stroke:1.5px_black] drop-shadow-md">
            Over 1000+ Tours, Explore Now!
          </h1>
          <p className="text-white text-lg md:text-xl font-semibold mt-2 drop-shadow-lg bg-black/30 px-4 py-1.5 rounded-full w-fit">
            Discover must-see destinations and experiences.
          </p>
        </div>

        <div className="w-full flex flex-col gap-5">
          
          <div className="w-full">
            <div
              ref={tourDestRef}
              className="w-full h-[56px] md:h-[73px] border-[5px] border-[#D9D9D9] rounded-xl bg-white relative flex items-center px-4 gap-4 cursor-pointer shadow-lg"
              onClick={() => setIsTourDestOpen(!isTourDestOpen)}
            >
              <svg className="w-8 h-8 text-[#007BFF] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={tourDestination}
                onChange={(e) => setTourDestination(e.target.value)}
                placeholder={t('whereToGo') + "..."}
                className="w-full h-full bg-transparent outline-none text-[#180B51] text-lg font-medium placeholder-[#180B51]/40 cursor-pointer truncate"
              />

              <div
                className={`absolute top-[110%] left-0 w-full z-50 bg-white border border-[#D9D9D9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${
                  isTourDestOpen ? 'max-h-[350px] opacity-100 border-opacity-100' : 'max-h-0 opacity-0 border-opacity-0'
                }`}
              >
                <div className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2 mb-4 text-[#007BFF]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <h4 className="font-bold text-sm uppercase">{t('hotDestinations')}</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[250px] overflow-y-auto pr-2 custom_scrollbar">
                    {tourDestinationsMock.map((dest) => (
                      <div
                        key={dest.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTourDestination(dest.label);
                          setIsTourDestOpen(false);
                        }}
                      >
                        <img src={dest.image} alt={dest.label} className="w-12 h-12 rounded-md object-cover shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-[#180B51] font-bold text-sm truncate">{dest.label}</span>
                          <span className="text-[#180B51]/60 text-xs truncate">
                            {t('toursCount').replace('{{count}}', dest.count)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row w-full h-auto md:h-[73px] gap-4">
            
            <div
              ref={tourDateRef}
              className="w-full h-[56px] md:h-[73px] md:flex-[1.2] min-w-0 border-[5px] border-[#D9D9D9] rounded-xl bg-white relative flex items-center px-4 gap-4 cursor-pointer shadow-lg"
              onClick={() => setIsTourDateOpen(!isTourDateOpen)}
            >
              <CalendarIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
              <span className="text-[#180B51] text-lg font-medium whitespace-nowrap truncate">
                {tourDate ? formatDate(tourDate, locale) : t('flexible')}
              </span>

              <div
                className={`absolute top-[110%] left-0 w-full md:w-[600px] z-50 bg-white border border-[#D9D9D9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${
                  isTourDateOpen ? 'max-h-[400px] opacity-100 border-opacity-100' : 'max-h-0 opacity-0 border-opacity-0'
                }`}
              >
                <div className="p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-4 px-4">
                    <button
                      className={`p-2 rounded-full transition-colors ${
                        calendarCurrentMonth.getFullYear() === new Date().getFullYear() &&
                        calendarCurrentMonth.getMonth() === new Date().getMonth()
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-[#180B51] hover:bg-gray-100'
                      }`}
                      onClick={handlePrevMonth}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <div className="flex flex-1 justify-between px-2 md:px-10">
                      <span className="text-[#180B51] font-bold">{getMonthName(calendarCurrentMonth, locale)}</span>
                      <span className="text-[#180B51] font-bold hidden md:block">
                        {getMonthName(new Date(calendarCurrentMonth.getFullYear(), calendarCurrentMonth.getMonth() + 1, 1), locale)}
                      </span>
                    </div>
                    <button
                      className="p-2 rounded-full text-[#180B51] hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={handleNextMonth}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex w-full overflow-x-auto md:overflow-hidden gap-2">
                    <div className="w-full md:w-1/2 shrink-0">
                      {renderCalendarMonth(calendarCurrentMonth)}
                    </div>
                    <div className="hidden md:block w-full md:w-1/2 shrink-0">
                      {renderCalendarMonth(new Date(calendarCurrentMonth.getFullYear(), calendarCurrentMonth.getMonth() + 1, 1))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={tourOriginRef}
              className="w-full h-[56px] md:h-[73px] md:flex-1 min-w-0 border-[5px] border-[#D9D9D9] rounded-xl bg-white relative flex items-center px-4 gap-4 cursor-pointer shadow-lg"
              onClick={() => setIsTourOriginOpen(!isTourOriginOpen)}
            >
              <ToursDepartureIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
              <span className="text-[#180B51] text-lg font-medium truncate whitespace-nowrap">{tourOrigin}</span>

              <div
                className={`absolute top-[110%] left-0 w-full z-50 bg-white border border-[#D9D9D9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${
                  isTourOriginOpen ? 'max-h-[300px] opacity-100 border-opacity-100' : 'max-h-0 opacity-0 border-opacity-0'
                }`}
              >
                <div className="p-2 max-h-[264px] overflow-y-auto custom_scrollbar flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                  {tourOriginsMock.map((origin, idx) => (
                    <div
                      key={idx}
                      className="px-3 min-h-[40px] flex items-center text-[#180B51] font-medium text-sm rounded-lg hover:bg-[#D9D9D9] hover:shadow-md transition-all cursor-pointer truncate shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTourOrigin(origin);
                        setIsTourOriginOpen(false);
                      }}
                    >
                      {origin}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              ref={tourGuestsRef}
              className="w-full h-[56px] md:h-[73px] md:flex-[1.5] min-w-0 border-[5px] border-[#D9D9D9] rounded-xl bg-white relative flex items-center px-4 gap-4 cursor-pointer shadow-lg"
              onClick={() => setIsTourGuestsOpen(!isTourGuestsOpen)}
            >
              <GuestIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
              <span className="text-[#180B51] text-lg font-medium truncate whitespace-nowrap">
                {tourAdults} {t('adultsDisplay')}, {tourChildren} {tourChildren > 1 ? t('childDisplayPlural') : t('childDisplay')}
              </span>

              <div
                className={`absolute -top-12 left-0 w-[200px] bg-black text-white p-3 rounded-md shadow-md text-xs z-[60] transition-opacity duration-300 pointer-events-none ${
                  showGuestLimitMsg ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {t('onlySevenPassengersAllowed')}
              </div>

              <div
                className={`absolute top-[110%] right-0 md:left-0 w-full md:w-[320px] z-50 bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top ${
                  isTourGuestsOpen
                    ? 'max-h-[1000px] opacity-100 border-opacity-100 overflow-visible'
                    : 'max-h-0 opacity-0 border-opacity-0 overflow-hidden'
                }`}
              >
                <div className="p-4 flex flex-col gap-4 min-h-fit" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AdultIcon className="w-5 h-5 text-[#007BFF]" />
                      <span className="text-[#180B51] font-bold">{t('adult')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        onClick={() => handleAddGuest('adult', -1)}
                        disabled={tourAdults <= 1}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      </button>
                      <span className="w-4 text-center font-bold text-[#180B51]">{tourAdults}</span>
                      <button
                        className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 transition-colors"
                        onClick={() => handleAddGuest('adult', 1)}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ChildIcon className="w-5 h-5 text-[#007BFF]" />
                      <span className="text-[#180B51] font-bold">{t('child')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        onClick={() => handleAddGuest('child', -1)}
                        disabled={tourChildren <= 0}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      </button>
                      <span className="w-4 text-center font-bold text-[#180B51]">{tourChildren}</span>
                      <button
                        className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 transition-colors"
                        onClick={() => handleAddGuest('child', 1)}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {tourChildren > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-2 pt-4 border-t border-[#D9D9D9]">
                      {Array.from({ length: tourChildren }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1 relative">
                          <span className="text-xs font-bold text-[#180B51] capitalize">Child {i + 1}</span>
                          <div
                            className="border border-[#D9D9D9] rounded-md px-2 py-1.5 flex justify-between items-center cursor-pointer text-sm font-medium text-[#180B51] hover:border-[#007BFF] transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenAgeIndex(openAgeIndex === i ? null : i);
                            }}
                          >
                            <span className="truncate">{childAges[i]} {t('yearsOld')}</span>
                            <svg
                              className={`w-4 h-4 text-[#180B51] transition-transform shrink-0 ${
                                openAgeIndex === i ? 'rotate-180' : ''
                              }`}
                              fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                          </div>

                          {openAgeIndex === i && (
                            <div className="absolute top-[100%] left-0 w-full mt-1 bg-white border border-[#D9D9D9] rounded-md shadow-lg z-[70] max-h-[160px] overflow-y-auto custom_scrollbar">
                              {Array.from({ length: 17 }).map((_, ageIdx) => (
                                <div
                                  key={ageIdx}
                                  className="px-2 py-1.5 text-sm font-medium text-[#180B51] hover:bg-[#D9D9D9] cursor-pointer text-center transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newAges = [...childAges];
                                    newAges[i] = ageIdx + 1;
                                    setChildAges(newAges);
                                    setOpenAgeIndex(null);
                                  }}
                                >
                                  {ageIdx + 1}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="w-full md:w-[85px] h-[56px] md:h-[73px] bg-[#CC8118] rounded-xl flex items-center justify-center cursor-pointer shrink-0 transition-colors hover:bg-[#b57215] shadow-lg gap-2"
              onClick={handleSearch}
            >
              <svg className="w-8 h-8 text-white font-bold" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <span className="lg:hidden text-white font-medium text-base">Search</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
