import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  GuestIcon,
  AdultIcon,
  ChildIcon,
  BookACarIcon,
  BookTrainIcon,
  TrainLocationIcon,
} from '../../pages/HomePage/SearchIcons';
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getWeekDays,
  getMonthName,
  formatDate,
} from '../../utils/SearchUtils';

const TransportSearchBox = () => {
  const navigate = useNavigate();
  const locale = 'en';

  const [activeTab, setActiveTab] = useState('bookACar');

  const [carLocation, setCarLocation] = useState('');
  const [isCarLocOpen, setIsCarLocOpen] = useState(false);
  const carLocRef = useRef(null);

  const [carDate, setCarDate] = useState(new Date());
  const [isCarDateOpen, setIsCarDateOpen] = useState(false);
  const [carCalendarMonth, setCarCalendarMonth] = useState(new Date());
  const carDateRef = useRef(null);

  const [carTime, setCarTime] = useState('');
  const [isCarTimeOpen, setIsCarTimeOpen] = useState(false);
  const carTimeRef = useRef(null);

  const [carAdults, setCarAdults] = useState(1);
  const [carChildren, setCarChildren] = useState(0);
  const [isCarSeatsOpen, setIsCarSeatsOpen] = useState(false);
  const [showCarSeatsLimitMsg, setShowCarSeatsLimitMsg] = useState(false);
  const carSeatsRef = useRef(null);

  const [trainFrom, setTrainFrom] = useState(null);
  const [trainTo, setTrainTo] = useState(null);
  const [trainLocFocus, setTrainLocFocus] = useState(null);
  const trainLocRef = useRef(null);

  const [trainDepDate, setTrainDepDate] = useState(null);
  const [trainRetDate, setTrainRetDate] = useState(null);
  const [isTrainDateOpen, setIsTrainDateOpen] = useState(false);
  const [trainDateFocus, setTrainDateFocus] = useState('departure');
  const [trainCalendarMonth, setTrainCalendarMonth] = useState(new Date());
  const trainDateRef = useRef(null);

  const [isReturn, setIsReturn] = useState(false);

  const carLocationsMock = [
    {
      titleKey: 'Popular Pick-up Locations',
      items: [
        { name: 'Tan Son Nhat International', type: 'Airport' },
        { name: 'Noi Bai International', type: 'Airport' },
        { name: 'Da Nang International', type: 'Airport' },
        { name: 'Phu Quoc International', type: 'Airport' },
      ],
    },
    {
      titleKey: 'Popular Cities',
      items: [
        { name: 'Ho Chi Minh', type: 'City' },
        { name: 'Ha Noi', type: 'City' },
        { name: 'Da Nang', type: 'City' },
        { name: 'Nha Trang', type: 'City' },
      ],
    },
  ];

  const trainStationsMock = [
    {
      country: 'Vietnam',
      stations: ['Hanoi Station', 'Saigon Station', 'Da Nang Station', 'Hue Station', 'Nha Trang Station'],
    },
    {
      country: 'China',
      stations: ['Beijing Railway Station', 'Shanghai Hongqiao', 'Guangzhou South'],
    },
    {
      country: 'South Korea',
      stations: ['Seoul Station', 'Busan Station', 'Dongdaegu Station'],
    },
  ];

  const handleCarGuest = (type, amount) => {
    const total = carAdults + carChildren;
    if (amount > 0 && total >= 7) {
      setShowCarSeatsLimitMsg(true);
      setTimeout(() => setShowCarSeatsLimitMsg(false), 3000);
      return;
    }
    setShowCarSeatsLimitMsg(false);
    if (type === 'adult') {
      if (amount < 0 && carAdults <= 1) return;
      setCarAdults((prev) => prev + amount);
    } else {
      if (amount < 0 && carChildren <= 0) return;
      setCarChildren((prev) => prev + amount);
    }
  };

  const handleSearch = () => {
    if (activeTab === 'bookACar') {
      navigate('/transport/search', {
        state: {
          type: 'car',
          location: carLocation,
          startDate: carDate,
          startTime: carTime,
          adults: carAdults,
          children: carChildren,
        },
      });
    } else {
      if (!trainFrom || !trainTo) {
        alert('Please select departure and arrival stations');
        return;
      }
      if (!trainDepDate) {
        alert('Please select departure date');
        return;
      }
      navigate('/transport/search', {
        state: {
          type: 'train',
          from: trainFrom,
          to: trainTo,
          departDate: trainDepDate,
          returnDate: isReturn ? trainRetDate : null,
        },
      });
    }
  };

  const renderCarCalendar = (dateObj) => {
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
      const isSelected = carDate && currentDate.getTime() === carDate.getTime();

      return (
        <div
          key={dayNum}
          onClick={() => {
            if (!isPast) {
              setCarDate(currentDate);
              setIsCarDateOpen(false);
            }
          }}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${isPast
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
      <div className="flex flex-col flex-1 px-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDays.map((wd) => (
            <div key={wd} className="text-[#D9D9D9] text-xs font-bold">
              {wd}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 place-items-center">
          {blanks}
          {days}
        </div>
      </div>
    );
  };

  const renderTrainCalendar = (dateObj) => {
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
      const isDep = trainDepDate && currentDate.getTime() === trainDepDate.getTime();
      const isRet = trainRetDate && currentDate.getTime() === trainRetDate.getTime();
      const isInRange =
        isReturn && trainDepDate && trainRetDate && currentDate > trainDepDate && currentDate < trainRetDate;

      return (
        <div
          key={dayNum}
          onClick={() => {
            if (isPast) return;
            if (trainDateFocus === 'departure') {
              setTrainDepDate(currentDate);
              if (trainRetDate && currentDate >= trainRetDate) setTrainRetDate(null);
              if (isReturn) setTrainDateFocus('return');
              else setIsTrainDateOpen(false);
            } else {
              if (trainDepDate && currentDate <= trainDepDate) {
                setTrainDepDate(currentDate);
              } else {
                setTrainRetDate(currentDate);
                setIsTrainDateOpen(false);
              }
            }
          }}
          className={`w-8 h-8 flex items-center justify-center text-sm font-medium transition-colors cursor-pointer
          ${isPast
              ? 'text-[#180B51]/30 cursor-not-allowed'
              : isDep || isRet
                ? 'bg-[#180B51] text-white rounded-full z-10'
                : isInRange
                  ? 'bg-[#180B51]/10 text-[#180B51] rounded-none'
                  : 'text-[#180B51] hover:bg-gray-100 rounded-full'
            }`}
        >
          {dayNum}
        </div>
      );
    });

    return (
      <div className="flex flex-col flex-1 px-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDays.map((wd) => (
            <div key={wd} className="text-[#D9D9D9] text-xs font-bold">
              {wd}
            </div>
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
    const now = new Date();
    let mins = now.getMinutes();
    let hrs = now.getHours();
    if (mins > 0 && mins <= 30) mins = 30;
    else if (mins > 30) {
      mins = 0;
      hrs += 1;
    }
    if (hrs >= 24) {
      hrs = 0;
      now.setDate(now.getDate() + 1);
    }
    now.setHours(hrs, mins, 0, 0);
    setCarDate(now);
    setCarTime(`${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
    setCarCalendarMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setTrainCalendarMonth(new Date());
    setTrainDepDate(new Date());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (carLocRef.current && !carLocRef.current.contains(event.target)) setIsCarLocOpen(false);
      if (carDateRef.current && !carDateRef.current.contains(event.target)) setIsCarDateOpen(false);
      if (carTimeRef.current && !carTimeRef.current.contains(event.target)) setIsCarTimeOpen(false);
      if (carSeatsRef.current && !carSeatsRef.current.contains(event.target)) {
        setIsCarSeatsOpen(false);
        setShowCarSeatsLimitMsg(false);
      }
      if (trainLocRef.current && !trainLocRef.current.contains(event.target)) setTrainLocFocus(null);
      if (trainDateRef.current && !trainDateRef.current.contains(event.target)) setIsTrainDateOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1474487056236-0529c99a78a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        }}
      ></div>

      <div className="relative z-30 w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center px-4 md:px-6 gap-6 py-6 md:py-0 md:min-h-[400px]">
        <h1 className="text-white text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold italic [-webkit-text-stroke:1px_black] drop-shadow-md whitespace-nowrap">
          Go: Cars & Trains
        </h1>

        <div className="w-full bg-white shadow-[0_10px_4px_rgba(0,0,0,0.25)] rounded-2xl flex flex-col p-6 xl:p-8 relative z-30 gap-8">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('bookACar')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer transition-colors whitespace-nowrap ${activeTab === 'bookACar' ? 'bg-[#7C70EB] text-white' : 'bg-[#D9D9D9] text-[#180B51]'
                }`}
            >
              <BookACarIcon className="w-5 h-5" />
              <span className="text-sm font-bold">Book a Car</span>
            </button>
            <button
              onClick={() => setActiveTab('bookTrainTickets')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer transition-colors whitespace-nowrap ${activeTab === 'bookTrainTickets' ? 'bg-[#7C70EB] text-white' : 'bg-[#D9D9D9] text-[#180B51]'
                }`}
            >
              <BookTrainIcon className="w-5 h-5" />
              <span className="text-sm font-bold">Book Train Tickets</span>
            </button>
          </div>

          {activeTab === 'bookACar' && (
            <div className="w-full xl:w-full h-auto xl:h-[73px]">
              <div className="w-full h-auto xl:h-full flex flex-col xl:flex-row gap-4 xl:gap-0 p-3 xl:p-0 xl:border-[5px] xl:border-[#D9D9D9] xl:rounded-xl relative bg-transparent xl:bg-white">
                <div ref={carLocRef} className="w-full xl:flex-[2] h-[56px] xl:h-full bg-white border-[5px] border-[#D9D9D9] xl:border-0 xl:border-r-[5px] rounded-xl xl:rounded-none relative flex items-center px-4 gap-4 cursor-pointer shadow-lg xl:shadow-none" onClick={() => setIsCarLocOpen(!isCarLocOpen)}>
                  <span className="hidden xl:block absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">Pick-up Location</span>
                  <svg className="w-8 h-8 text-[#007BFF] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <input
                    type="text"
                    value={carLocation}
                    onChange={(e) => setCarLocation(e.target.value)}
                    placeholder="Pick-up location (city, airport, hotel)"
                    className="w-full h-full bg-transparent outline-none text-[#180B51] text-lg font-medium placeholder-[#180B51]/20 cursor-pointer truncate"
                  />

                  <div className={`absolute top-[110%] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${isCarLocOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="p-4 overflow-y-auto max-h-[400px] custom_scrollbar" onClick={(e) => e.stopPropagation()}>
                      {carLocationsMock.map((group, gIdx) => (
                        <div key={gIdx} className="mb-4 last:mb-0">
                          <h4 className="font-bold text-sm uppercase text-[#007BFF] mb-2">{group.titleKey}</h4>
                          <div className="flex flex-col gap-1">
                            {group.items.map((item, iIdx) => (
                              <div
                                key={iIdx}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() => {
                                  setCarLocation(item.name);
                                  setIsCarLocOpen(false);
                                }}
                              >
                                <span className="text-[#180B51] font-bold text-sm truncate">{item.name}</span>
                                <span className="text-[#180B51]/60 text-xs shrink-0">({item.type})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div ref={carDateRef} className="w-full xl:flex-1 h-[56px] xl:h-full bg-white border-[5px] border-[#D9D9D9] xl:border-0 xl:border-r-[5px] rounded-xl xl:rounded-none relative flex items-center px-4 gap-4 cursor-pointer shadow-lg xl:shadow-none" onClick={() => setIsCarDateOpen(!isCarDateOpen)}>
                  <span className="hidden xl:block absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">Start Date</span>
                  <CalendarIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
                  <span className="text-[#180B51] text-lg font-medium whitespace-nowrap">{formatDate(carDate, locale)}</span>

                  <div className={`absolute top-[110%] left-0 w-full md:w-[600px] z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${isCarDateOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="p-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-between items-center mb-4 px-4">
                        <button
                          className={`p-2 rounded-full transition-colors ${carCalendarMonth.getFullYear() === new Date().getFullYear() && carCalendarMonth.getMonth() === new Date().getMonth()
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-[#180B51] hover:bg-gray-100'
                            }`}
                          onClick={() => {
                            const curr = new Date();
                            if (carCalendarMonth.getFullYear() === curr.getFullYear() && carCalendarMonth.getMonth() === curr.getMonth()) return;
                            setCarCalendarMonth(new Date(carCalendarMonth.getFullYear(), carCalendarMonth.getMonth() - 1, 1));
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </button>
                        <div className="flex flex-1 justify-between px-2 md:px-10">
                          <span className="text-[#180B51] font-bold">{getMonthName(carCalendarMonth, locale)}</span>
                          <span className="hidden md:block text-[#180B51] font-bold">{getMonthName(new Date(carCalendarMonth.getFullYear(), carCalendarMonth.getMonth() + 1, 1), locale)}</span>
                        </div>
                        <button
                          className="p-2 rounded-full text-[#180B51] hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => setCarCalendarMonth(new Date(carCalendarMonth.getFullYear(), carCalendarMonth.getMonth() + 1, 1))}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </button>
                      </div>
                      <div className="flex w-full overflow-x-auto md:overflow-hidden gap-2">
                        <div className="w-full md:w-1/2 shrink-0">
                          {renderCarCalendar(carCalendarMonth)}
                        </div>
                        <div className="hidden md:block w-full md:w-1/2 shrink-0">
                          {renderCarCalendar(new Date(carCalendarMonth.getFullYear(), carCalendarMonth.getMonth() + 1, 1))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div ref={carTimeRef} className="w-full xl:flex-1 h-[56px] xl:h-full bg-white border-[5px] border-[#D9D9D9] xl:border-0 xl:border-r-[5px] rounded-xl xl:rounded-none relative flex items-center px-4 gap-4 cursor-pointer shadow-lg xl:shadow-none" onClick={() => setIsCarTimeOpen(!isCarTimeOpen)}>
                  <span className="hidden xl:block absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">Start Time</span>
                  <svg className="w-8 h-8 text-[#007BFF] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span className="text-[#180B51] text-lg font-medium">{carTime}</span>

                  <div className={`absolute top-[110%] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top ${isCarTimeOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="flex w-full h-[250px]" onClick={(e) => e.stopPropagation()}>
                      <div className="flex-1 flex flex-col border-r border-[#D9D9D9]">
                        <div className="text-center py-2 font-bold text-sm text-[#007BFF] border-b border-[#D9D9D9]">Hour</div>
                        <div className="overflow-y-auto custom_scrollbar flex-1">
                          {Array.from({ length: 24 }).map((_, i) => {
                            const hr = i.toString().padStart(2, '0');
                            return (
                              <div key={hr} onClick={() => { setCarTime(`${hr}:${carTime.split(':')[1] || '00'}`); setIsCarTimeOpen(false); }} className="py-2 text-center text-[#180B51] font-medium hover:bg-gray-100 cursor-pointer">{hr}</div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="text-center py-2 font-bold text-sm text-[#007BFF] border-b border-[#D9D9D9]">Minute</div>
                        <div className="overflow-y-auto custom_scrollbar flex-1">
                          {['00', '30'].map((min) => (
                            <div key={min} onClick={() => { setCarTime(`${carTime.split(':')[0] || '12'}:${min}`); setIsCarTimeOpen(false); }} className="py-2 text-center text-[#180B51] font-medium hover:bg-gray-100 cursor-pointer">{min}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div ref={carSeatsRef} className="w-full xl:flex-1 h-[56px] xl:h-full bg-white border-[5px] border-[#D9D9D9] xl:border-0 rounded-xl xl:rounded-none relative flex items-center px-4 gap-4 cursor-pointer shadow-lg xl:shadow-none" onClick={() => setIsCarSeatsOpen(!isCarSeatsOpen)}>
                  <span className="hidden xl:block absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">Passengers</span>
                  <GuestIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
                  <span className="text-[#180B51] text-lg font-medium truncate">{carAdults + carChildren} Passengers</span>

                  <div className={`absolute -top-12 xl:top-0 left-0 xl:left-[calc(100%+16px)] w-[200px] bg-black text-white p-3 rounded-md shadow-md text-xs z-[9999] transition-opacity duration-300 pointer-events-none ${showCarSeatsLimitMsg ? 'opacity-100' : 'opacity-0'}`}>
                    Only 7 passengers allowed
                  </div>

                  <div className={`absolute top-[110%] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isCarSeatsOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="p-4 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AdultIcon className="w-5 h-5 text-[#007BFF]" />
                          <span className="text-[#180B51] font-bold">Adults</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors" onClick={() => handleCarGuest('adult', -1)} disabled={carAdults <= 1}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
                          </button>
                          <span className="w-4 text-center font-bold text-[#180B51]">{carAdults}</span>
                          <button className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 transition-colors" onClick={() => handleCarGuest('adult', 1)}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ChildIcon className="w-5 h-5 text-[#007BFF]" />
                          <span className="text-[#180B51] font-bold">Children</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors" onClick={() => handleCarGuest('child', -1)} disabled={carChildren <= 0}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
                          </button>
                          <span className="w-4 text-center font-bold text-[#180B51]">{carChildren}</span>
                          <button className="w-8 h-8 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 transition-colors" onClick={() => handleCarGuest('child', 1)}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={handleSearch}
                  className="w-full h-[56px] xl:w-[65px] xl:h-full bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-xl xl:rounded-none xl:rounded-r-md shrink-0 transition-colors hover:bg-[#b57215] shadow-lg xl:shadow-none gap-2"
                >
                  <svg className="w-7 h-7 text-white font-bold shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <span className="xl:hidden text-white font-medium text-base">Search</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookTrainTickets' && (
            <div className="w-full xl:w-full h-auto xl:h-[73px]">
              <div className="w-full h-auto xl:h-full flex flex-col xl:flex-row gap-4 p-3 xl:p-0 relative bg-transparent">
                <div ref={trainLocRef} className="flex flex-col xl:flex-row flex-1 xl:border-[5px] border-transparent xl:border-[#D9D9D9] xl:rounded-xl relative bg-transparent xl:bg-white gap-4 xl:gap-0">
                  <div className="xl:hidden absolute top-1/2 left-[85%] -translate-y-1/2 w-8 h-8 bg-white border-[2px] border-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-gray-50 shadow-md" onClick={(e) => { e.stopPropagation(); const tmp = trainFrom; setTrainFrom(trainTo); setTrainTo(tmp); setTrainLocFocus(null); }}>
                    <svg className="w-4 h-4 text-[#180B51] rotate-90" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                  </div>

                  <div className="w-full xl:w-1/2 h-[56px] xl:h-full bg-white border-[5px] border-[#D9D9D9] xl:border-0 rounded-xl xl:rounded-none relative flex items-center px-4 gap-4 cursor-pointer shadow-lg xl:shadow-none" onClick={(e) => { e.stopPropagation(); setTrainLocFocus(trainLocFocus === 'from' ? null : 'from'); if (isTrainDateOpen) setIsTrainDateOpen(false); }}>
                    <span className="hidden xl:block absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">Departure</span>
                    <TrainLocationIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
                    {trainFrom ? (
                      <span className="text-[#180B51] text-lg font-bold truncate">{trainFrom}</span>
                    ) : (
                      <input type="text" placeholder="Departure station" readOnly className="w-full h-full bg-transparent outline-none text-[#180B51] text-lg font-medium placeholder-[#180B51]/20 cursor-pointer" />
                    )}
                  </div>

                  <div className="hidden xl:block w-[5px] bg-[#D9D9D9] h-full relative shrink-0">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white border-[2px] border-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-gray-50" onClick={(e) => { e.stopPropagation(); const tmp = trainFrom; setTrainFrom(trainTo); setTrainTo(tmp); setTrainLocFocus(null); }}>
                      <svg className="w-5 h-5 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
                    </div>
                  </div>

                  <div className="w-full xl:w-1/2 h-[56px] xl:h-full bg-white border-[5px] border-[#D9D9D9] xl:border-0 rounded-xl xl:rounded-none relative flex items-center px-4 gap-4 cursor-pointer shadow-lg xl:shadow-none" onClick={(e) => { e.stopPropagation(); setTrainLocFocus(trainLocFocus === 'to' ? null : 'to'); if (isTrainDateOpen) setIsTrainDateOpen(false); }}>
                    <span className="hidden xl:block absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">Arrival</span>
                    <TrainLocationIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
                    {trainTo ? (
                      <span className="text-[#180B51] text-lg font-bold truncate">{trainTo}</span>
                    ) : (
                      <input type="text" placeholder="Arrival station" readOnly className="w-full h-full bg-transparent outline-none text-[#180B51] text-lg font-medium placeholder-[#180B51]/20 cursor-pointer" />
                    )}
                  </div>

                  <div className={`absolute top-[110%] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${trainLocFocus ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`} onClick={(e) => e.stopPropagation()}>
                    <div className="p-4 max-h-[420px] overflow-y-auto custom_scrollbar">
                      {trainStationsMock.map((group, gIdx) => (
                        <div key={gIdx} className="mb-4">
                          <div className="flex items-center gap-2 mb-2 text-[#007BFF]">
                            <TrainLocationIcon className="w-4 h-4 shrink-0" />
                            <span className="font-bold text-xs uppercase">{group.country}</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-2">
                            {group.stations.map((station, sIdx) => (
                              <div
                                key={sIdx}
                                className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors text-left text-[#180B51] font-medium text-sm truncate"
                                onClick={() => {
                                  if (trainLocFocus === 'from') setTrainFrom(station);
                                  else setTrainTo(station);
                                  setTrainLocFocus(null);
                                }}
                              >
                                {station}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div ref={trainDateRef} className="flex flex-col xl:flex-row flex-1 xl:border-[5px] border-transparent xl:border-[#D9D9D9] xl:rounded-xl relative bg-transparent xl:bg-white gap-4 xl:gap-0">
                  <div className="w-full xl:w-1/2 h-[56px] xl:h-full bg-white border-[5px] border-[#D9D9D9] xl:border-0 xl:border-r-[5px] rounded-xl xl:rounded-none relative flex items-center px-4 gap-4 cursor-pointer shadow-lg xl:shadow-none" onClick={(e) => { e.stopPropagation(); if (isTrainDateOpen && trainDateFocus === 'departure') { setIsTrainDateOpen(false) } else { setIsTrainDateOpen(true); setTrainDateFocus('departure'); } setTrainLocFocus(null); }}>
                    <span className="hidden xl:block absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">Depart</span>
                    <CalendarIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
                    <span className="text-[#180B51] text-lg font-medium">{trainDepDate ? formatDate(trainDepDate, locale) : formatDate(new Date(), locale)}</span>
                  </div>

                  <div className={`w-full xl:w-1/2 h-[56px] xl:h-full bg-white border-[5px] border-[#D9D9D9] xl:border-0 rounded-xl xl:rounded-none relative flex items-center px-4 gap-4 transition-all cursor-pointer shadow-lg xl:shadow-none ${!isReturn ? 'opacity-50 grayscale xl:opacity-40' : ''}`} onClick={(e) => { if (!isReturn) return; e.stopPropagation(); if (isTrainDateOpen && trainDateFocus === 'return') { setIsTrainDateOpen(false) } else { setIsTrainDateOpen(true); setTrainDateFocus('return'); } setTrainLocFocus(null); }}>
                    <label className="xl:absolute xl:-top-[30px] xl:left-0 flex items-center gap-1.5 text-[#180B51] xl:text-black font-bold text-[14px] xl:text-[15px] z-10 xl:opacity-100 whitespace-nowrap cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 accent-[#7C70EB] cursor-pointer shrink-0" checked={isReturn} onChange={(e) => { e.stopPropagation(); setIsReturn(e.target.checked); if (!e.target.checked) { setTrainRetDate(null); setIsTrainDateOpen(false); } }} onClick={(e) => e.stopPropagation()} />
                      <span className="xl:hidden">Return</span>
                      <span className="hidden xl:inline">Return</span>
                    </label>
                    <CalendarIcon className="hidden xl:block w-8 h-8 text-[#007BFF] shrink-0" />
                    {isReturn && (
                      <span className="text-[#180B51] text-lg font-medium whitespace-nowrap">{trainRetDate ? formatDate(trainRetDate, locale) : formatDate(new Date(), locale)}</span>
                    )}
                  </div>

                  <div className={`absolute top-[110%] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isTrainDateOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`} onClick={(e) => e.stopPropagation()}>
                    <div className="p-4 flex flex-col">
                      <div className="flex justify-between items-center mb-4 px-4">
                        <button
                          className={`p-2 rounded-full transition-colors ${trainCalendarMonth.getFullYear() === new Date().getFullYear() && trainCalendarMonth.getMonth() === new Date().getMonth() ? 'text-gray-300 cursor-not-allowed' : 'text-[#180B51] hover:bg-gray-100'}`}
                          onClick={() => { const curr = new Date(); if (trainCalendarMonth.getFullYear() === curr.getFullYear() && trainCalendarMonth.getMonth() === curr.getMonth()) return; setTrainCalendarMonth(new Date(trainCalendarMonth.getFullYear(), trainCalendarMonth.getMonth() - 1, 1)); }}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </button>
                        <div className="flex flex-1 justify-between px-2 md:px-10">
                          <span className="text-[#180B51] font-bold text-sm">{getMonthName(trainCalendarMonth, locale)}</span>
                          <span className="hidden md:block text-[#180B51] font-bold text-sm">{getMonthName(new Date(trainCalendarMonth.getFullYear(), trainCalendarMonth.getMonth() + 1, 1), locale)}</span>
                        </div>
                        <button className="p-2 rounded-full text-[#180B51] hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setTrainCalendarMonth(new Date(trainCalendarMonth.getFullYear(), trainCalendarMonth.getMonth() + 1, 1))}>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </button>
                      </div>
                      <div className="flex w-full overflow-x-auto md:overflow-hidden gap-2">
                        <div className="w-full md:w-1/2 shrink-0">
                          {renderTrainCalendar(trainCalendarMonth)}
                        </div>
                        <div className="hidden md:block w-full md:w-1/2 shrink-0">
                          {renderTrainCalendar(new Date(trainCalendarMonth.getFullYear(), trainCalendarMonth.getMonth() + 1, 1))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={handleSearch}
                  className="w-full h-[56px] xl:w-[73px] xl:h-full bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-xl xl:rounded-full shrink-0 transition-colors hover:bg-[#b57215] shadow-lg xl:shadow-none gap-2"
                >
                  <svg className="w-7 h-7 text-white font-bold shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <span className="xl:hidden text-white font-medium text-base">Search</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransportSearchBox;