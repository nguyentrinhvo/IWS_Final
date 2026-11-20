import React, { useState, useEffect, useRef } from 'react';
import {
  CalendarIcon,
  GuestIcon,
  AdultIcon,
  ChildIcon
} from './SearchIcons';
import { formatDate, getDaysInMonth, getFirstDayOfMonth, getMonthName, getWeekDays } from '../../utils/SearchUtils';
import { hotelService } from '../../services/hotelService';
import { useNavigate } from 'react-router-dom';

const HotelsSearch = ({ t, locale }) => {
  const navigate = useNavigate();
  const [activeHotelFilter, setActiveHotelFilter] = useState('all');
  const [hotelDestination, setHotelDestination] = useState('');
  const [isHotelDestOpen, setIsHotelDestOpen] = useState(false);
  const hotelDestRef = useRef(null);

  const [hotelCheckIn, setHotelCheckIn] = useState(null);
  const [hotelCheckOut, setHotelCheckOut] = useState(null);
  const [isHotelDateOpen, setIsHotelDateOpen] = useState(false);
  const [hotelDateStep, setHotelDateStep] = useState('checkin');
  const [hotelCalendarMonth, setHotelCalendarMonth] = useState(new Date());
  const hotelDateRef = useRef(null);

  const [hotelAdults, setHotelAdults] = useState(1);
  const [hotelChildren, setHotelChildren] = useState(0);
  const [hotelRooms, setHotelRooms] = useState(1);
  const [isHotelGuestsOpen, setIsHotelGuestsOpen] = useState(false);
  const [showHotelLimitMsg, setShowHotelLimitMsg] = useState('');
  const [hotelChildAges, setHotelChildAges] = useState(Array(6).fill(1));
  const [hotelOpenAgeIndex, setHotelOpenAgeIndex] = useState(null);
  const hotelGuestsRef = useRef(null);

  const [today, setToday] = useState(new Date());
  const [tomorrow, setTomorrow] = useState(new Date());

  const [dbSuggestions, setDbSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const hotelDestinationsMock = [
    { id: 'hoChiMinh', label: t('hoChiMinh'), count: 320, image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=150&h=100' },
    { id: 'haNoi', label: t('haNoi'), count: 280, image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=150&h=100' },
    { id: 'daNangDest', label: t('daNangDest'), count: 190, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=150&h=100' },
    { id: 'phuQuocDest', label: t('phuQuocDest'), count: 150, image: 'https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&w=150&h=100' },
    { id: 'nhaTrang', label: t('nhaTrang'), count: 210, image: 'https://images.unsplash.com/photo-1552993873-001108cc815e?auto=format&fit=crop&w=150&h=100' },
    { id: 'daLatDest', label: t('daLatDest'), count: 130, image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=150&h=100' },
    { id: 'singaporeDest', label: t('singaporeDest'), count: 85, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=150&h=100' },
    { id: 'bangkok', label: t('bangkok'), count: 170, image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=150&h=100' },
    { id: 'tokyo', label: t('tokyo'), count: 240, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=150&h=100' },
    { id: 'seoul', label: t('seoul'), count: 195, image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=150&h=100' },
  ];

  const hotelFilters = [
    { id: 'all', label: t('all'), icon: null },
    { id: 'hotels', label: t('hotels'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" /> },
    { id: 'villas', label: t('villas'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" /> },
    { id: 'apartments', label: t('apartments'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75V21" /> },
  ];

  const handleHotelCheckInSelect = (date) => {
    setHotelCheckIn(date);
    if (hotelCheckOut && date >= hotelCheckOut) {
      const next = new Date(date);
      next.setDate(next.getDate() + 1);
      setHotelCheckOut(next);
    }
    setHotelDateStep('checkout');
  };

  const handleHotelCheckOutSelect = (date) => {
    if (hotelCheckIn && date <= hotelCheckIn) return;
    setHotelCheckOut(date);
    setIsHotelDateOpen(false);
  };

  const calcNights = () => {
    if (!hotelCheckIn || !hotelCheckOut) return 1;
    const diff = Math.round((hotelCheckOut - hotelCheckIn) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const handleHotelGuest = (type, amount) => {
    if (type === 'adult') {
      if (amount < 0) {
        if (hotelAdults <= 1) return;
        const newAdults = hotelAdults + amount;
        if (newAdults < hotelRooms) {
          setShowHotelLimitMsg('roomAdultLimit');
          setTimeout(() => setShowHotelLimitMsg(''), 3000);
          return;
        }
        setShowHotelLimitMsg('');
        setHotelAdults(newAdults);
      } else {
        if (hotelAdults >= 30) return;
        setShowHotelLimitMsg('');
        setHotelAdults(prev => prev + 1);
      }
    } else if (type === 'child') {
      if (amount < 0 && hotelChildren <= 0) return;
      if (amount > 0 && hotelChildren >= 6) return;
      setHotelChildren(prev => prev + amount);
    } else if (type === 'room') {
      if (amount < 0 && hotelRooms <= 1) return;
      if (amount > 0) {
        if (hotelRooms >= 8) return;
        if (hotelRooms + 1 > hotelAdults) {
          setShowHotelLimitMsg('roomAdultLimit');
          setTimeout(() => setShowHotelLimitMsg(''), 3000);
          return;
        }
      }
      setShowHotelLimitMsg('');
      setHotelRooms(prev => prev + amount);
    }
  };

  const renderHotelCalendar = (dateObj, step) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const daysCount = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const weekDays = getWeekDays(locale);

    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);

    const blanks = Array.from({ length: firstDayIndex }).map((_, i) => <div key={`blank-${i}`} className="w-8 h-8"></div>);
    const days = Array.from({ length: daysCount }).map((_, i) => {
      const dayNum = i + 1;
      const currentDate = new Date(year, month, dayNum);
      const isPast = currentDate < todayAtMidnight;
      const isCheckIn = hotelCheckIn && currentDate.getTime() === hotelCheckIn.getTime();
      const isCheckOut = hotelCheckOut && currentDate.getTime() === hotelCheckOut.getTime();
      const isInRange = hotelCheckIn && hotelCheckOut && currentDate > hotelCheckIn && currentDate < hotelCheckOut;
      const isDisabled = isPast || (step === 'checkout' && hotelCheckIn && currentDate <= hotelCheckIn);

      let dayClass = 'text-[#180B51] hover:bg-[#765FDD]/20 cursor-pointer';
      if (isDisabled) dayClass = 'text-[#180B51]/30 cursor-not-allowed';
      else if (isCheckIn || isCheckOut) dayClass = 'bg-[#765FDD] text-white cursor-pointer';
      else if (isInRange) dayClass = 'bg-[#765FDD]/10 text-[#180B51] cursor-pointer';

      return (
        <div
          key={dayNum}
          onClick={() => {
            if (isDisabled) return;
            if (step === 'checkin') {
              handleHotelCheckInSelect(currentDate);
            } else {
              handleHotelCheckOutSelect(currentDate);
            }
          }}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${dayClass}`}
        >
          {dayNum}
        </div>
      );
    });

    return (
      <div className="flex flex-col flex-1 px-4">
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

  useEffect(() => {
    if (!hotelDestination.trim() || hotelDestination.length < 2) {
      setDbSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const data = await hotelService.searchHotels(hotelDestination, null, null, null, 0, 5);
        const results = (data.content || []).map(h => ({
          id: h.id,
          label: h.name,
          city: h.city,
          count: 'Price from ' + (h.roomTypes?.[0]?.pricePerNight || 'N/A'),
          image: h.thumbnailUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&h=100'
        }));
        setDbSuggestions(results);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [hotelDestination]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hotelDestRef.current && !hotelDestRef.current.contains(event.target)) setIsHotelDestOpen(false);
      if (hotelDateRef.current && !hotelDateRef.current.contains(event.target)) setIsHotelDateOpen(false);
      if (hotelGuestsRef.current && !hotelGuestsRef.current.contains(event.target)) {
        setIsHotelGuestsOpen(false);
        setHotelOpenAgeIndex(null);
        setShowHotelLimitMsg('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const current = new Date();
    const next = new Date(current);
    next.setDate(current.getDate() + 1);
    setToday(current);
    setTomorrow(next);
    setHotelCalendarMonth(new Date(current.getFullYear(), current.getMonth(), 1));
  }, []);

  return (
    <>
      <div className="hotel_filters_wrapper absolute top-[65px] left-[16px] right-[16px] md:left-[48px] md:right-auto flex flex-wrap md:flex-nowrap items-center gap-1 z-20 overflow-x-visible md:overflow-x-auto max-w-full md:max-w-[calc(100%-96px)] scrollbar-hide">
        {hotelFilters.map((hf) => (
          <div
            key={hf.id}
            onClick={() => setActiveHotelFilter(hf.id)}
            className={`hotel_filter_item flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer transition-colors border border-transparent ${
              activeHotelFilter === hf.id
                ? 'bg-[#765FDD] text-white shadow-sm'
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

      <div className="w-full max-w-[1403px] mt-[134px] h-auto lg:h-[73px] px-3 lg:px-0 relative z-30">
        <div className="hotels_input_wrapper w-full h-full lg:border-[5px] lg:border-[#D9D9D9] lg:rounded-xl flex flex-col lg:flex-row relative bg-transparent lg:bg-white gap-[15px] lg:gap-0">
          
          <div
            ref={hotelDestRef}
            className={`w-full lg:flex-[1.1] h-[56px] md:h-[73px] lg:h-full bg-white border-[5px] border-[#D9D9D9] rounded-xl lg:border-0 lg:border-r-[5px] lg:rounded-none relative flex items-center px-4 gap-4 cursor-pointer shadow-lg lg:shadow-none shrink-0 lg:shrink ${isHotelDestOpen ? 'z-50' : 'z-10'}`}
            onClick={() => setIsHotelDestOpen(!isHotelDestOpen)}
          >
            <span className="hidden lg:block absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">
              {activeHotelFilter === 'villas'
                ? t('cityDestinationVilla')
                : activeHotelFilter === 'apartments'
                ? t('cityDestinationApartment')
                : t('cityDestinationHotel')}
            </span>
            <svg className="w-8 h-8 text-[#765FDD] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={hotelDestination}
              onChange={(e) => setHotelDestination(e.target.value)}
              placeholder={t('cityHotelPlace')}
              className="w-full h-full bg-transparent outline-none text-[#180B51] text-lg font-medium placeholder-[#180B51]/20 cursor-pointer truncate"
            />

            <div
              className={`hotel_dest_dropdown absolute top-[110%] left-0 w-full z-[999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${
                isHotelDestOpen ? 'max-h-[70vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
              } md:max-h-[400px]`}
            >
              <div className="p-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2 mb-4 text-[#765FDD]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <h4 className="font-bold text-sm uppercase">{t('hotDestinations')}</h4>
                </div>
                <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 custom_scrollbar">
                  {loadingSuggestions ? (
                    <div className="p-4 text-center text-gray-400 text-sm italic">Searching...</div>
                  ) : hotelDestination.length >= 2 ? (
                    dbSuggestions.length > 0 ? (
                      dbSuggestions.map((dest) => (
                        <div
                          key={dest.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHotelDestination(dest.label);
                            setIsHotelDestOpen(false);
                          }}
                        >
                          <img src={dest.image} alt={dest.label} className="w-12 h-12 rounded-md object-cover shrink-0" />
                          <div className="flex flex-col flex-1 truncate">
                            <span className="text-[#180B51] font-bold text-sm truncate">{dest.label}</span>
                            <span className="text-[#180B51]/60 text-[10px]">{dest.city}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-400 text-sm italic">No matching hotels found.</div>
                    )
                  ) : (
                    // Default popular destinations when no query
                    hotelDestinationsMock.map((dest) => (
                      <div
                        key={dest.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHotelDestination(dest.label);
                          setIsHotelDestOpen(false);
                        }}
                      >
                        <img src={dest.image} alt={dest.label} className="w-12 h-12 rounded-md object-cover shrink-0" />
                        <span className="text-[#180B51] font-bold text-sm flex-1 truncate">{dest.label}</span>
                        <span className="text-[#180B51]/60 text-xs shrink-0 whitespace-nowrap">{dest.count} {t('hotelsCount')} nearby</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            ref={hotelDateRef}
            className={`w-full lg:flex-[1.1] h-[56px] md:h-[73px] lg:h-full bg-white border-[5px] border-[#D9D9D9] rounded-xl lg:border-0 lg:border-r-[5px] lg:rounded-none relative flex items-center px-4 gap-2 cursor-pointer shadow-lg lg:shadow-none shrink-0 lg:shrink ${isHotelDateOpen ? 'z-50' : 'z-10'}`}
            onClick={() => { setIsHotelDateOpen(!isHotelDateOpen); setHotelDateStep('checkin'); }}
          >
            <span className="hidden lg:block absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">{t('checkInCheckOut')}</span>
            <CalendarIcon className="w-8 h-8 text-[#765FDD] shrink-0" />
            <div className="flex flex-1 justify-between items-center overflow-hidden">
              <div className="flex flex-col text-left">
                <span className="text-[#180B51]/60 text-[13px] leading-tight font-bold">{t('checkIn')}</span>
                <span className="text-[#180B51] text-base font-medium leading-tight whitespace-nowrap">
                  {hotelCheckIn ? formatDate(hotelCheckIn, locale) : formatDate(today, locale)}
                </span>
              </div>
              <span className="text-[#180B51]/60 text-[13px] font-bold mx-1 whitespace-nowrap shrink-0">
                {calcNights()} {calcNights() === 1 ? t('night') : t('nights')}
              </span>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-8 h-8 text-[#765FDD] shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="text-[#180B51]/60 text-[13px] leading-tight font-bold">{t('checkOut')}</span>
                  <span className="text-[#180B51] text-base font-medium leading-tight whitespace-nowrap">
                    {hotelCheckOut ? formatDate(hotelCheckOut, locale) : formatDate(tomorrow, locale)}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`hotel_date_dropdown absolute top-[110%] left-0 w-full lg:w-[640px] z-[999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${
                isHotelDateOpen ? 'max-h-[70vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
              } md:max-h-[500px]`}
            >
              <div className="p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between mb-3 px-4">
                  <div className="flex flex-col">
                    <span className="text-[#765FDD] text-xs font-bold uppercase">{t('checkIn')}</span>
                    <span className="text-[#180B51] font-bold text-sm">
                      {hotelCheckIn ? formatDate(hotelCheckIn, locale) : formatDate(today, locale)}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[#765FDD] text-xs font-bold uppercase">{t('checkOut')}</span>
                    <span className="text-[#180B51] font-bold text-sm">
                      {hotelCheckOut ? formatDate(hotelCheckOut, locale) : formatDate(tomorrow, locale)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4 px-4">
                  <button
                    className={`p-2 rounded-full transition-colors ${
                      hotelCalendarMonth.getFullYear() === new Date().getFullYear() &&
                      hotelCalendarMonth.getMonth() === new Date().getMonth()
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-[#180B51] hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      const curr = new Date();
                      if (hotelCalendarMonth.getFullYear() === curr.getFullYear() && hotelCalendarMonth.getMonth() === curr.getMonth()) return;
                      setHotelCalendarMonth(new Date(hotelCalendarMonth.getFullYear(), hotelCalendarMonth.getMonth() - 1, 1));
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  <div className="flex flex-1 justify-between px-6">
                    <span className="text-[#180B51] font-bold text-sm">{getMonthName(hotelCalendarMonth, locale)}</span>
                    <span className="text-[#180B51] font-bold text-sm hidden lg:block">
                      {getMonthName(new Date(hotelCalendarMonth.getFullYear(), hotelCalendarMonth.getMonth() + 1, 1), locale)}
                    </span>
                  </div>

                  <button
                    className="p-2 rounded-full text-[#180B51] hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setHotelCalendarMonth(new Date(hotelCalendarMonth.getFullYear(), hotelCalendarMonth.getMonth() + 1, 1))}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                <div className="flex w-full overflow-x-auto lg:overflow-hidden gap-2">
                  <div className="w-full lg:w-1/2 shrink-0">
                    {renderHotelCalendar(hotelCalendarMonth, hotelDateStep)}
                  </div>
                  <div className="hidden lg:block w-full lg:w-1/2 shrink-0">
                    {renderHotelCalendar(new Date(hotelCalendarMonth.getFullYear(), hotelCalendarMonth.getMonth() + 1, 1), hotelDateStep)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={hotelGuestsRef}
            className={`w-full lg:flex-[1.1] h-[56px] md:h-[73px] lg:h-full bg-white border-[5px] border-[#D9D9D9] rounded-xl lg:border-0 lg:rounded-none relative flex items-center px-4 gap-4 cursor-pointer shadow-lg lg:shadow-none shrink-0 lg:shrink ${isHotelGuestsOpen ? 'z-50' : 'z-10'}`}
            onClick={() => setIsHotelGuestsOpen(!isHotelGuestsOpen)}
          >
            <span className="hidden lg:block absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">{t('guestsAndRooms')}</span>
            <GuestIcon className="w-8 h-8 text-[#765FDD] shrink-0" />
            <span className="text-[#180B51] text-lg font-medium truncate">
              {hotelAdults} {t('adultsDisplay')}, {hotelChildren} {hotelChildren > 1 ? t('childDisplayPlural') : t('childDisplay')}, {hotelRooms} {t('room')}
            </span>

            <div
              className={`absolute top-0 left-[calc(100%+16px)] w-max max-w-[200px] bg-black text-white p-3 rounded-md shadow-md text-xs z-[999] transition-opacity duration-300 pointer-events-none break-words ${
                showHotelLimitMsg === 'roomAdultLimit' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {t('roomCannotExceedAdult')}
            </div>

            <div
              className={`hotel_guests_dropdown absolute top-[110%] left-0 w-full z-[999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top ${
                isHotelGuestsOpen
                  ? 'max-h-[70vh] opacity-100 overflow-y-auto'
                  : 'max-h-0 opacity-0 overflow-hidden'
              } md:max-h-[1000px]`}
            >
              <div className="p-4 flex flex-col gap-4 min-h-fit" onClick={(e) => e.stopPropagation()}>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AdultIcon className="w-5 h-5 text-[#765FDD] shrink-0" />
                    <span className="text-[#180B51] font-bold whitespace-nowrap">{t('adult')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0"
                      onClick={() => handleHotelGuest('adult', -1)}
                      disabled={hotelAdults <= 1}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="w-4 text-center font-bold text-[#180B51]">{hotelAdults}</span>
                    <button
                      className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0"
                      onClick={() => handleHotelGuest('adult', 1)}
                      disabled={hotelAdults >= 30}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ChildIcon className="w-5 h-5 text-[#765FDD] shrink-0" />
                    <span className="text-[#180B51] font-bold whitespace-nowrap">{t('child')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0"
                      onClick={() => handleHotelGuest('child', -1)}
                      disabled={hotelChildren <= 0}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="w-4 text-center font-bold text-[#180B51]">{hotelChildren}</span>
                    <button
                      className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0"
                      onClick={() => handleHotelGuest('child', 1)}
                      disabled={hotelChildren >= 6}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#765FDD] shrink-0" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9 0L3 2V14H1V16H15V14H13V2H11V14H9V0ZM6.75 9C7.16421 9 7.5 8.55229 7.5 8C7.5 7.44772 7.16421 7 6.75 7C6.33579 7 6 7.44772 6 8C6 8.55229 6.33579 9 6.75 9Z" />
                    </svg>
                    <span className="text-[#180B51] font-bold whitespace-nowrap">{t('room')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0"
                      onClick={() => handleHotelGuest('room', -1)}
                      disabled={hotelRooms <= 1}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="w-4 text-center font-bold text-[#180B51]">{hotelRooms}</span>
                    <button
                      className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0"
                      onClick={() => handleHotelGuest('room', 1)}
                      disabled={hotelRooms >= 8}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                </div>

                {hotelChildren > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-1 pt-4 border-t border-[#D9D9D9]">
                    {Array.from({ length: hotelChildren }).map((_, i) => (
                      <div key={i} className="flex flex-col gap-1 relative">
                        <span className="text-xs font-bold text-[#180B51] capitalize">Child {i + 1}</span>
                        <div
                          className="border border-[#D9D9D9] rounded-md px-2 py-1.5 flex justify-between items-center cursor-pointer text-sm font-medium text-[#180B51] hover:border-[#765FDD] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHotelOpenAgeIndex(hotelOpenAgeIndex === i ? null : i);
                          }}
                        >
                          <span className="truncate">{hotelChildAges[i]} {t('yearsOld')}</span>
                          <svg
                            className={`w-4 h-4 text-[#180B51] transition-transform shrink-0 ${
                              hotelOpenAgeIndex === i ? 'rotate-180' : ''
                            }`}
                            fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                        {hotelOpenAgeIndex === i && (
                          <div className="absolute top-[100%] left-0 w-full mt-1 bg-white border border-[#D9D9D9] rounded-md shadow-lg z-[999] max-h-[160px] overflow-y-auto custom_scrollbar">
                            {Array.from({ length: 17 }).map((_, ageIdx) => (
                              <div
                                key={ageIdx}
                                className="px-2 py-1.5 text-sm font-medium text-[#180B51] hover:bg-[#D9D9D9] cursor-pointer text-center transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newAges = [...hotelChildAges];
                                  newAges[i] = ageIdx + 1;
                                  setHotelChildAges(newAges);
                                  setHotelOpenAgeIndex(null);
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
            onClick={() => navigate('/hotels/search')}
            className="w-full h-[56px] md:h-[73px] lg:w-[65px] lg:h-full bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-xl lg:rounded-none lg:rounded-r-md shrink-0 transition-colors hover:bg-[#b57215] shadow-lg lg:shadow-none gap-2"
          >
            <svg className="w-7 h-7 text-white font-bold shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span className="lg:hidden text-white font-medium text-base">Search</span>
          </div>

        </div>
      </div>
    </>
  );
};

export default HotelsSearch;
