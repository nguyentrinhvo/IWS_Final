import React, { useState, useEffect, useRef } from 'react';
import {
  CalendarIcon,
  AdultIcon,
  ChildIcon,
  InfantIcon,
  FlightTakeoffIcon,
  FlightLandingIcon
} from './SearchIcons';
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getWeekDays,
  getMonthName,
  formatDate
} from '../../utils/SearchUtils';
import { useNavigate } from 'react-router-dom';

const FlightsSearch = ({ t, locale }) => {
  const navigate = useNavigate();
  const [activeFlightFilter, setActiveFlightFilter] = useState('oneWayRoundTrip');
  const [isReturnFlight, setIsReturnFlight] = useState(false);

  const [flightLocationFocus, setFlightLocationFocus] = useState(null);
  const [flightFrom, setFlightFrom] = useState(null);
  const [flightTo, setFlightTo] = useState(null);
  const [flightFromQuery, setFlightFromQuery] = useState('');
  const [flightToQuery, setFlightToQuery] = useState('');
  const flightLocationRef = useRef(null);

  const [flightDepartureDate, setFlightDepartureDate] = useState(null);
  const [flightReturnDate, setFlightReturnDate] = useState(null);
  const [isFlightDateOpen, setIsFlightDateOpen] = useState(false);
  const [flightDateFocus, setFlightDateFocus] = useState('departure');
  const [flightCalendarMonth, setFlightCalendarMonth] = useState(new Date());
  const flightDateRef = useRef(null);

  const [flightAdults, setFlightAdults] = useState(1);
  const [flightChildren, setFlightChildren] = useState(0);
  const [flightInfants, setFlightInfants] = useState(0);
  const [isFlightPassengersOpen, setIsFlightPassengersOpen] = useState(false);
  const [flightPassengersLimitMsg, setFlightPassengersLimitMsg] = useState('');
  const flightPassengersRef = useRef(null);

  const [flightCabinClass, setFlightCabinClass] = useState('economy');
  const [isFlightCabinOpen, setIsFlightCabinOpen] = useState(false);
  const flightCabinRef = useRef(null);

  const [multiCityFlights, setMultiCityFlights] = useState([
    { id: 1, from: null, to: null, fromQuery: '', toQuery: '', date: null },
    { id: 2, from: null, to: null, fromQuery: '', toQuery: '', date: null },
  ]);
  const [mcLocationFocus, setMcLocationFocus] = useState(null);
  const [mcDateOpen, setMcDateOpen] = useState(null);
  const [mcCalendarMonths, setMcCalendarMonths] = useState({});
  const mcLocationRefs = useRef({});
  const mcDateRefs = useRef({});

  const [today, setToday] = useState(new Date());
  const [tomorrow, setTomorrow] = useState(new Date());

  const mobileFromRef = useRef(null);
  const mobileToRef = useRef(null);
  const mobileDateRef = useRef(null);
  const mobilePassengersRef = useRef(null);
  const mobileCabinRef = useRef(null);

  const flightLocationCategories = [
    {
      titleKey: 'flightPopularCities',
      places: [
        { name: 'Hong Kong', airport: 'Hong Kong International Airport' },
        { name: 'Korea', airport: 'Incheon International Airport' },
        { name: 'China', airport: 'Beijing Capital International Airport' },
        { name: 'Japan', airport: 'Narita International Airport' },
        { name: 'Singapore', airport: 'Changi Airport' },
      ]
    },
    {
      titleKey: 'flightVietnam',
      places: [
        { name: 'Phu Quoc', airport: 'Phu Quoc International Airport' },
        { name: 'Ha Long', airport: 'Van Don International Airport' },
        { name: 'Da Nang', airport: 'Da Nang International Airport' },
        { name: 'Da Lat', airport: 'Lien Khuong Airport' },
      ]
    },
    {
      titleKey: 'flightEurope',
      places: [
        { name: 'America', airport: 'John F. Kennedy International Airport' },
        { name: 'Germany', airport: 'Frankfurt Airport' },
      ]
    },
    {
      titleKey: 'flightAsia',
      places: [
        { name: 'China', airport: 'Beijing Capital International Airport' },
        { name: 'Singapore', airport: 'Changi Airport' },
        { name: 'Australia', airport: 'Sydney Kingsford Smith Airport' },
        { name: 'Laos', airport: 'Wattay International Airport' },
        { name: 'Thai', airport: 'Suvarnabhumi Airport' },
        { name: 'Cambodia', airport: 'Phnom Penh International Airport' },
      ]
    },
  ];

  const flightAllPlaces = flightLocationCategories.flatMap(c => c.places);

  const flightFilters = [
    { id: 'oneWayRoundTrip', label: t('oneWayRoundTrip') },
    { id: 'multiCity', label: t('multiCity') }
  ];

  const flightCabinOptions = [
    { value: 'economy', labelKey: 'economy' },
    { value: 'premiumEconomy', labelKey: 'premiumEconomy' },
    { value: 'business', labelKey: 'flightBusiness' },
    { value: 'firstClass', labelKey: 'firstClass' },
  ];

  const handleFlightGuest = (type, amount) => {
    setFlightPassengersLimitMsg('');
    if (type === 'adult') {
      if (amount < 0 && flightAdults <= 1) return;
      if (amount > 0 && flightAdults + flightChildren >= 7) { setFlightPassengersLimitMsg('sevenLimit'); return; }
      const next = flightAdults + amount;
      if (amount < 0 && flightInfants > next) setFlightInfants(next);
      setFlightAdults(next);
    } else if (type === 'child') {
      if (amount < 0 && flightChildren <= 0) return;
      if (amount > 0 && flightAdults + flightChildren >= 7) { setFlightPassengersLimitMsg('sevenLimit'); return; }
      setFlightChildren(prev => prev + amount);
    } else if (type === 'infant') {
      if (amount < 0 && flightInfants <= 0) return;
      if (amount > 0 && flightInfants >= flightAdults) { setFlightPassengersLimitMsg('infantLimit'); return; }
      if (amount > 0 && flightInfants >= 4) { setFlightPassengersLimitMsg('fourLimit'); return; }
      setFlightInfants(prev => prev + amount);
    }
  };

  const renderFlightCalendarMonth = (dateObj) => {
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
      const isDep = flightDepartureDate && currentDate.getTime() === flightDepartureDate.getTime();
      const isRet = flightReturnDate && currentDate.getTime() === flightReturnDate.getTime();
      const isInRange = isReturnFlight && flightDepartureDate && flightReturnDate && currentDate > flightDepartureDate && currentDate < flightReturnDate;
      return (
        <div
          key={dayNum}
          onClick={() => {
            if (isPast) return;
            if (flightDateFocus === 'departure') {
              setFlightDepartureDate(currentDate);
              if (flightReturnDate && currentDate >= flightReturnDate) setFlightReturnDate(null);
              if (isReturnFlight) setFlightDateFocus('return');
              else setIsFlightDateOpen(false);
            } else {
              if (flightDepartureDate && currentDate <= flightDepartureDate) {
                setFlightDepartureDate(currentDate);
              } else {
                setFlightReturnDate(currentDate);
                setIsFlightDateOpen(false);
              }
            }
          }}
          className={`w-8 h-8 flex items-center justify-center text-sm font-medium transition-colors cursor-pointer
            ${isPast ? 'text-[#180B51]/30 cursor-not-allowed' :
              (isDep || isRet) ? 'bg-[#180B51] text-white rounded-full z-10' :
                isInRange ? 'bg-[#180B51]/10 text-[#180B51] rounded-none' :
                  'text-[#180B51] hover:bg-gray-100 rounded-full'}`}
        >
          {dayNum}
        </div>
      );
    });
    return (
      <div className="flex flex-col flex-1 px-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDays.map(wd => <div key={wd} className="text-[#D9D9D9] text-xs font-bold">{wd}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 place-items-center">
          {blanks}
          {days}
        </div>
      </div>
    );
  };

  const renderMcCalendarMonth = (dateObj, selectedDate, minDate, onSelect) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const daysCount = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    const weekDays = getWeekDays(locale);
    const todayAtMidnight = new Date(); todayAtMidnight.setHours(0, 0, 0, 0);
    const blanks = Array.from({ length: firstDayIndex }).map((_, i) => <div key={`blank-${i}`} className="w-8 h-8"></div>);
    const days = Array.from({ length: daysCount }).map((_, i) => {
      const dayNum = i + 1;
      const cur = new Date(year, month, dayNum);
      const isDisabled = cur < todayAtMidnight || (minDate && cur < minDate);
      const isSelected = selectedDate && cur.getTime() === selectedDate.getTime();
      return (
        <div
          key={dayNum}
          onClick={() => { if (isDisabled) return; onSelect(cur); }}
          className={`w-8 h-8 flex items-center justify-center text-sm font-medium transition-colors rounded-full
            ${isDisabled ? 'text-[#180B51]/30 cursor-not-allowed' :
              isSelected ? 'bg-[#180B51] text-white cursor-pointer' :
                'text-[#180B51] hover:bg-gray-100 cursor-pointer'}`}
        >
          {dayNum}
        </div>
      );
    });
    return (
      <div className="flex flex-col px-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDays.map(wd => <div key={wd} className="text-[#D9D9D9] text-xs font-bold">{wd}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 place-items-center">{blanks}{days}</div>
      </div>
    );
  };

  const handleAddFlight = () => {
    if (multiCityFlights.length < 5) {
      setMultiCityFlights([...multiCityFlights, { id: Date.now(), from: null, to: null, fromQuery: '', toQuery: '', date: null }]);
    }
  };

  const handleRemoveFlight = (idToRemove) => {
    setMultiCityFlights(prev => {
      const idx = prev.findIndex(f => f.id === idToRemove);
      if (idx === -1) return prev;
      const next = [...prev];
      for (let i = idx; i < next.length - 1; i++) {
        next[i] = { ...next[i + 1], id: next[i].id };
      }
      next.pop();
      return next;
    });
    if (mcLocationFocus?.rowId === idToRemove) setMcLocationFocus(null);
    if (mcDateOpen === idToRemove) setMcDateOpen(null);
  };

  const handleRemoveLastFlight = () => {
    if (multiCityFlights.length > 2) {
      const lastId = multiCityFlights[multiCityFlights.length - 1].id;
      handleRemoveFlight(lastId);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setToday(currentDate);
    setTomorrow(nextDate);
    setFlightCalendarMonth(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
    setFlightDepartureDate(currentDate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const inDesktopLoc = flightLocationRef.current?.contains(event.target);
      const inMobileFrom = mobileFromRef.current?.contains(event.target);
      const inMobileTo = mobileToRef.current?.contains(event.target);
      if (!inDesktopLoc && !inMobileFrom && !inMobileTo) setFlightLocationFocus(null);

      const inDesktopDate = flightDateRef.current?.contains(event.target);
      const inMobileDate = mobileDateRef.current?.contains(event.target);
      if (!inDesktopDate && !inMobileDate) setIsFlightDateOpen(false);

      const inDesktopPass = flightPassengersRef.current?.contains(event.target);
      const inMobilePass = mobilePassengersRef.current?.contains(event.target);
      if (!inDesktopPass && !inMobilePass) { setIsFlightPassengersOpen(false); setFlightPassengersLimitMsg(''); }

      const inDesktopCabin = flightCabinRef.current?.contains(event.target);
      const inMobileCabin = mobileCabinRef.current?.contains(event.target);
      if (!inDesktopCabin && !inMobileCabin) setIsFlightCabinOpen(false);

      const clickedInsideAnyMcLoc = Object.values(mcLocationRefs.current).some(ref => ref?.contains(event.target));
      if (!clickedInsideAnyMcLoc) setMcLocationFocus(null);
      const clickedInsideAnyMcDate = Object.values(mcDateRefs.current).some(ref => ref?.contains(event.target));
      if (!clickedInsideAnyMcDate) setMcDateOpen(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderLocationList = (focus, onSelect) => {
    const query = focus === 'from' ? flightFromQuery : flightToQuery;
    return (
      <div className="p-4">
        {query ? (
          <div className="flex flex-col gap-1 max-h-[380px] overflow-y-auto custom_scrollbar">
            {flightAllPlaces
              .filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.airport.toLowerCase().includes(query.toLowerCase()))
              .map((place, idx) => (
                <div key={idx} className="flex flex-col px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => onSelect(place)}
                >
                  <span className="text-[#180B51] font-bold text-sm">{place.name}</span>
                  <span className="text-[#180B51]/50 text-xs">{place.airport}</span>
                </div>
              ))}
          </div>
        ) : (
          <div className="max-h-[420px] overflow-y-auto custom_scrollbar">
            {flightLocationCategories.map((cat) => (
              <div key={cat.titleKey} className="mb-3">
                <div className="flex items-center gap-2 mb-2 text-[#007BFF]">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span className="font-bold text-xs uppercase">{t(cat.titleKey)}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {cat.places.map((place, idx) => (
                    <div key={idx} className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors text-left"
                      onClick={() => onSelect(place)}
                    >
                      <span className="text-[#180B51] font-medium text-sm">{place.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderPassengersContent = () => (
    <div className="p-4 flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AdultIcon className="w-5 h-5 text-[#007BFF] shrink-0" />
          <div className="flex flex-col">
            <span className="text-[#180B51] font-bold text-[14px] whitespace-nowrap">{t('adult')}</span>
            <span className="text-[#180B51]/50 text-[11px]">{t('ageOverTwelve')}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-7 h-7 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0" onClick={() => handleFlightGuest('adult', -1)} disabled={flightAdults <= 1}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
          </button>
          <span className="w-5 text-center font-bold text-[#180B51] text-[14px]">{flightAdults}</span>
          <button className="w-7 h-7 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0" onClick={() => handleFlightGuest('adult', 1)} disabled={flightAdults + flightChildren >= 7}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChildIcon className="w-5 h-5 text-[#007BFF] shrink-0" />
          <div className="flex flex-col">
            <span className="text-[#180B51] font-bold text-[14px] whitespace-nowrap">{t('child')}</span>
            <span className="text-[#180B51]/50 text-[11px]">{t('ageTwoToEleven')}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-7 h-7 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0" onClick={() => handleFlightGuest('child', -1)} disabled={flightChildren <= 0}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
          </button>
          <span className="w-5 text-center font-bold text-[#180B51] text-[14px]">{flightChildren}</span>
          <button className="w-7 h-7 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0" onClick={() => handleFlightGuest('child', 1)} disabled={flightAdults + flightChildren >= 7}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <InfantIcon className="w-5 h-5 text-[#007BFF] shrink-0" />
          <div className="flex flex-col">
            <span className="text-[#180B51] font-bold text-[14px] whitespace-nowrap">{t('infantOnLap')}</span>
            <span className="text-[#180B51]/50 text-[11px]">{t('ageBelowTwo')}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-7 h-7 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0" onClick={() => handleFlightGuest('infant', -1)} disabled={flightInfants <= 0}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
          </button>
          <span className="w-5 text-center font-bold text-[#180B51] text-[14px]">{flightInfants}</span>
          <button className="w-7 h-7 rounded-md border border-[#180B51] flex items-center justify-center text-[#180B51] hover:bg-gray-100 disabled:opacity-30 transition-colors shrink-0" onClick={() => handleFlightGuest('infant', 1)} disabled={flightInfants >= flightAdults || flightInfants >= 4}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </button>
        </div>
      </div>
      {(flightChildren > 0 || flightInfants > 0) && (
        <p className="text-[11px] text-[#180B51]/60 leading-tight pt-2 border-t border-[#D9D9D9]">
          {t('flightPriceVaryNotice')}
        </p>
      )}
      {flightPassengersLimitMsg && (
        <p className="text-[11px] text-red-500 font-medium leading-tight text-right">
          {flightPassengersLimitMsg === 'sevenLimit' ? t('onlySevenPassengersAllowed') :
            flightPassengersLimitMsg === 'infantLimit' ? t('infantExceedsAdult') :
              t('onlyFourInfantsAllowed')}
        </p>
      )}
    </div>
  );

  const renderCabinContent = () => (
    <div className="py-2 flex flex-col" onClick={(e) => e.stopPropagation()}>
      {flightCabinOptions.map((opt) => (
        <div key={opt.value}
          className={`px-4 py-2 cursor-pointer text-[14px] font-bold transition-colors whitespace-nowrap ${flightCabinClass === opt.value ? 'text-[#007BFF] bg-blue-50' : 'text-[#180B51] hover:bg-gray-100'}`}
          onClick={() => { setFlightCabinClass(opt.value); setIsFlightCabinOpen(false); }}
        >
          {t(opt.labelKey)}
        </div>
      ))}
    </div>
  );

  const renderMobileDateDropdown = () => (
    <div className="p-3 flex flex-col" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-3 px-2">
        <button
          className={`p-2 rounded-full transition-colors ${flightCalendarMonth.getFullYear() === new Date().getFullYear() && flightCalendarMonth.getMonth() === new Date().getMonth() ? 'text-gray-300 cursor-not-allowed' : 'text-[#180B51] hover:bg-gray-100'}`}
          onClick={() => {
            const curr = new Date();
            if (flightCalendarMonth.getFullYear() === curr.getFullYear() && flightCalendarMonth.getMonth() === curr.getMonth()) return;
            setFlightCalendarMonth(new Date(flightCalendarMonth.getFullYear(), flightCalendarMonth.getMonth() - 1, 1));
          }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        </button>
        <span className="text-[#180B51] font-bold text-sm">{getMonthName(flightCalendarMonth, locale)}</span>
        <button
          className="p-2 rounded-full text-[#180B51] hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => setFlightCalendarMonth(new Date(flightCalendarMonth.getFullYear(), flightCalendarMonth.getMonth() + 1, 1))}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </button>
      </div>
      {renderFlightCalendarMonth(flightCalendarMonth)}
    </div>
  );

  const renderMobileMultiCityDateDropdown = (flightId, currentDate, minDate, onSelect) => {
    const mcCal = mcCalendarMonths[flightId] || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    return (
      <div className="p-3 flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3 px-2">
          <button
            className={`p-2 rounded-full transition-colors ${mcCal.getFullYear() === new Date().getFullYear() && mcCal.getMonth() === new Date().getMonth() ? 'text-gray-300 cursor-not-allowed' : 'text-[#180B51] hover:bg-gray-100'}`}
            onClick={() => {
              const curr = new Date();
              if (mcCal.getFullYear() === curr.getFullYear() && mcCal.getMonth() === curr.getMonth()) return;
              setMcCalendarMonths(prev => ({ ...prev, [flightId]: new Date(mcCal.getFullYear(), mcCal.getMonth() - 1, 1) }));
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <span className="text-[#180B51] font-bold text-sm">{getMonthName(mcCal, locale)}</span>
          <button
            className="p-2 rounded-full text-[#180B51] hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setMcCalendarMonths(prev => ({ ...prev, [flightId]: new Date(mcCal.getFullYear(), mcCal.getMonth() + 1, 1) }))}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
        {renderMcCalendarMonth(mcCal, currentDate, minDate, onSelect)}
      </div>
    );
  };

  return (
    <>
      <div className="flights_filters_wrapper absolute top-[65px] left-[16px] right-[16px] md:left-[48px] md:right-[48px] flex items-center justify-between gap-2 z-20 flex-wrap xl:flex-nowrap">
        <div className="flights_filter_left flex items-center gap-1 overflow-x-auto scrollbar-hide shrink min-w-0">
          {flightFilters.map((ff) => (
            <div
              key={ff.id}
              onClick={() => setActiveFlightFilter(ff.id)}
              className={`flight_filter_item flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full cursor-pointer transition-colors border border-transparent shrink-0 ${
                activeFlightFilter === ff.id ? 'bg-[#7C70EB] text-white shadow-sm' : 'bg-[#D9D9D9] text-[#180B51]'
              }`}
            >
              <span className="text-[12px] md:text-[14px] font-bold whitespace-nowrap">{ff.label}</span>
            </div>
          ))}
        </div>
        <div className="flights_filter_right flex items-center gap-2 xl:gap-4 shrink-0">
          <label className="flights_direct_checkbox flex items-center gap-1.5 cursor-pointer text-[#180B51] font-bold whitespace-nowrap text-[11px] md:text-[13px] xl:text-[14px]">
            <input type="checkbox" className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#7C70EB] cursor-pointer shrink-0" />
            {t('directFlightsOnly')}
          </label>
          <div className="hidden xl:flex items-center gap-2">
            <div ref={flightPassengersRef} className="relative">
              <div
                className="flights_guest_selector border-[1px] border-black rounded-lg bg-transparent flex items-center justify-between px-4 py-1.5 w-auto min-w-max cursor-pointer gap-4"
                onClick={() => { setIsFlightPassengersOpen(prev => !prev); if (isFlightCabinOpen) setIsFlightCabinOpen(false); }}
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <AdultIcon className="w-5 h-5 text-[#007BFF]" />
                  <span className="text-[14px] text-[#180B51] font-bold">
                    {flightAdults} {t('adultsDisplay')}, {flightChildren} {t('childDisplay')}, {flightInfants} {t('infant')}
                  </span>
                </div>
                <svg className={`w-4 h-4 text-[#180B51] transition-transform duration-200 ${isFlightPassengersOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <div className={`absolute top-[calc(100%+6px)] right-0 z-[200] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top-right overflow-hidden ${isFlightPassengersOpen ? 'max-h-[400px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95 pointer-events-none'}`} style={{ minWidth: '320px' }}>
                {renderPassengersContent()}
              </div>
            </div>
            <div ref={flightCabinRef} className="relative">
              <div
                className="flights_class_selector border-[1px] border-black rounded-lg bg-transparent flex items-center justify-between px-4 py-1.5 w-auto min-w-max cursor-pointer gap-4"
                onClick={() => { setIsFlightCabinOpen(prev => !prev); if (isFlightPassengersOpen) setIsFlightPassengersOpen(false); }}
              >
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <svg className="w-5 h-5 text-[#007BFF]" fill="currentColor" viewBox="0 0 240.235 240.235" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
                    <path d="M211.744,6.089C208.081,2.163,203.03,0,197.52,0h-15.143c-11.16,0-21.811,8.942-23.74,19.934l-0.955,5.436 c-0.96,5.47,0.332,10.651,3.639,14.589c3.307,3.938,8.186,6.106,13.74,6.106h19.561c2.714,0,5.339-0.542,7.778-1.504l-2.079,17.761 c-2.001-0.841-4.198-1.289-6.507-1.289h-22.318c-9.561,0-18.952,7.609-20.936,16.961l-19.732,93.027l-93.099-6.69 c-5.031-0.36-9.231,1.345-11.835,4.693c-2.439,3.136-3.152,7.343-2.009,11.847l10.824,42.618 c2.345,9.233,12.004,16.746,21.53,16.746h78.049h1.191h39.729c9.653,0,18.336-7.811,19.354-17.411l15.272-143.981 c0.087-0.823,0.097-1.634,0.069-2.437l5.227-44.648c0.738-1.923,1.207-3.967,1.354-6.087l0.346-4.97 C217.214,15.205,215.407,10.016,211.744,6.089z" />
                  </svg>
                  <span className="text-[14px] text-[#180B51] font-bold">
                    {t(flightCabinOptions.find(c => c.value === flightCabinClass)?.labelKey || 'economy')}
                  </span>
                </div>
                <svg className={`w-4 h-4 text-[#180B51] transition-transform duration-200 ${isFlightCabinOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              <div className={`absolute top-[calc(100%+6px)] right-0 z-[200] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top-right overflow-hidden ${isFlightCabinOpen ? 'max-h-[300px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95 pointer-events-none'}`} style={{ minWidth: '100%' }}>
                {renderCabinContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full mt-[134px] max-w-[1403px] mx-auto px-3 xl:px-0 ${activeFlightFilter === 'multiCity' ? 'flex flex-col gap-8' : 'xl:h-[73px]'}`}>
        {activeFlightFilter === 'oneWayRoundTrip' && (
          <>
            <div className="hidden xl:flex flights_input_wrapper w-full h-[73px] md:gap-2 xl:gap-4">
              <div ref={flightLocationRef} className="flights_location_block flex-1 border-[5px] border-[#D9D9D9] rounded-xl flex relative bg-white h-full min-w-0">
                <div
                  className="flights_from_section w-1/2 h-full relative flex items-center md:px-2 xl:px-4 gap-2 xl:gap-4 cursor-pointer min-w-0"
                  onClick={(e) => { e.stopPropagation(); setFlightLocationFocus(flightLocationFocus === 'from' ? null : 'from'); if (isFlightDateOpen) setIsFlightDateOpen(false); }}
                >
                  <span className="flights_from_label absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">{t('from')}</span>
                  <FlightTakeoffIcon className="md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#007BFF] shrink-0" />
                  <div className="flex-1 flex flex-col min-w-0">
                    <input type="text" 
                      value={flightFrom ? flightFrom.name : flightFromQuery}
                      onChange={(e) => { 
                        setFlightFromQuery(e.target.value); 
                        if(flightFrom) setFlightFrom(null); 
                        setFlightLocationFocus('from'); 
                      }}
                      placeholder={t('emptyLocation')}
                      className="w-full bg-transparent outline-none text-[#180B51] md:text-sm xl:text-lg font-bold placeholder-[#180B51]/20 cursor-pointer truncate"
                    />
                    {flightFrom && (
                      <span className="text-[#180B51]/50 md:text-[10px] xl:text-[12px] truncate leading-tight hidden md:block">{flightFrom.airport}</span>
                    )}
                  </div>
                  {(flightFrom || flightFromQuery) && (
                    <button className="shrink-0 text-[#180B51]/40 hover:text-[#180B51] ml-1"
                      onClick={(e) => { e.stopPropagation(); setFlightFrom(null); setFlightFromQuery(''); setFlightLocationFocus('from'); }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
                <div className="flights_vertical_divider w-[5px] bg-[#D9D9D9] h-full relative shrink-0">
                  <div
                    className="flights_swap_btn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:w-7 md:h-7 xl:w-9 xl:h-9 bg-white border-[2px] border-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-gray-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      const tmp = flightFrom; setFlightFrom(flightTo); setFlightTo(tmp);
                      const tmpQ = flightFromQuery; setFlightFromQuery(flightToQuery); setFlightToQuery(tmpQ);
                      setFlightLocationFocus(null);
                    }}
                  >
                    <svg className="md:w-4 md:h-4 xl:w-5 xl:h-5 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                  </div>
                </div>
                <div
                  className="flights_to_section w-1/2 h-full relative flex items-center md:px-2 xl:px-4 gap-2 xl:gap-4 cursor-pointer min-w-0"
                  onClick={(e) => { e.stopPropagation(); setFlightLocationFocus(flightLocationFocus === 'to' ? null : 'to'); if (isFlightDateOpen) setIsFlightDateOpen(false); }}
                >
                  <span className="flights_to_label absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">{t('to')}</span>
                  <FlightLandingIcon className="md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#007BFF] shrink-0" />
                  <div className="flex-1 flex flex-col min-w-0">
                    <input type="text" 
                      value={flightTo ? flightTo.name : flightToQuery}
                      onChange={(e) => { 
                        setFlightToQuery(e.target.value); 
                        if(flightTo) setFlightTo(null); 
                        setFlightLocationFocus('to'); 
                      }}
                      placeholder={t('emptyLocation')}
                      className="w-full bg-transparent outline-none text-[#180B51] md:text-sm xl:text-lg font-bold placeholder-[#180B51]/20 cursor-pointer truncate"
                    />
                    {flightTo && (
                      <span className="text-[#180B51]/50 md:text-[10px] xl:text-[12px] truncate leading-tight hidden md:block">{flightTo.airport}</span>
                    )}
                  </div>
                  {(flightTo || flightToQuery) && (
                    <button className="shrink-0 text-[#180B51]/40 hover:text-[#180B51] ml-1"
                      onClick={(e) => { e.stopPropagation(); setFlightTo(null); setFlightToQuery(''); setFlightLocationFocus('to'); }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
                <div
                  className={`absolute top-[110%] left-0 w-full z-50 bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${flightLocationFocus ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {renderLocationList(flightLocationFocus, (place) => {
                    if (flightLocationFocus === 'from') { setFlightFrom(place); setFlightFromQuery(''); }
                    else { setFlightTo(place); setFlightToQuery(''); }
                    setFlightLocationFocus(null);
                  })}
                </div>
              </div>
              <div ref={flightDateRef} className="flights_date_block flex-1 border-[5px] border-[#D9D9D9] rounded-xl flex relative bg-white h-full min-w-0">
                <div
                  className="flights_departure_section w-1/2 h-full border-r-[5px] border-[#D9D9D9] relative flex items-center md:px-2 xl:px-4 gap-2 xl:gap-4 cursor-pointer min-w-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isFlightDateOpen && flightDateFocus === 'departure') { setIsFlightDateOpen(false); }
                    else { setIsFlightDateOpen(true); setFlightDateFocus('departure'); }
                    setFlightLocationFocus(null);
                  }}
                >
                  <span className="flights_departure_label absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">{t('departureDate')}</span>
                  <CalendarIcon className="md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#007BFF] shrink-0" />
                  <span className="text-[#180B51] md:text-sm xl:text-lg font-medium whitespace-nowrap truncate">
                    {flightDepartureDate ? formatDate(flightDepartureDate, locale) : formatDate(today, locale)}
                  </span>
                </div>
                <div
                  className={`flights_return_section w-1/2 h-full relative flex items-center md:px-2 xl:px-4 gap-2 xl:gap-4 transition-all cursor-pointer min-w-0 ${!isReturnFlight ? 'opacity-40 grayscale' : ''}`}
                  onClick={(e) => {
                    if (!isReturnFlight) return;
                    e.stopPropagation();
                    if (isFlightDateOpen && flightDateFocus === 'return') { setIsFlightDateOpen(false); }
                    else { setIsFlightDateOpen(true); setFlightDateFocus('return'); }
                    setFlightLocationFocus(null);
                  }}
                >
                  <label className="flights_return_label absolute -top-[30px] left-0 text-black font-bold text-[15px] flex items-center gap-1.5 cursor-pointer z-10 opacity-100 grayscale-0 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#7C70EB] cursor-pointer"
                      checked={isReturnFlight}
                      onChange={(e) => { e.stopPropagation(); setIsReturnFlight(e.target.checked); if (!e.target.checked) { setFlightReturnDate(null); setIsFlightDateOpen(false); } }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    {t('returnDate')}
                  </label>
                  <CalendarIcon className="md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#007BFF] shrink-0" />
                  <span className="text-[#180B51] md:text-sm xl:text-lg font-medium whitespace-nowrap truncate">
                    {flightReturnDate ? formatDate(flightReturnDate, locale) : formatDate(tomorrow, locale)}
                  </span>
                </div>
                <div
                  className={`absolute top-[110%] left-0 w-full z-50 bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isFlightDateOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4 px-4">
                      <button
                        className={`p-2 rounded-full transition-colors ${flightCalendarMonth.getFullYear() === new Date().getFullYear() && flightCalendarMonth.getMonth() === new Date().getMonth() ? 'text-gray-300 cursor-not-allowed' : 'text-[#180B51] hover:bg-gray-100'}`}
                        onClick={() => {
                          const curr = new Date();
                          if (flightCalendarMonth.getFullYear() === curr.getFullYear() && flightCalendarMonth.getMonth() === curr.getMonth()) return;
                          setFlightCalendarMonth(new Date(flightCalendarMonth.getFullYear(), flightCalendarMonth.getMonth() - 1, 1));
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                      </button>
                      <div className="flex flex-1 justify-between px-10">
                        <span className="text-[#180B51] font-bold text-sm">{getMonthName(flightCalendarMonth, locale)}</span>
                        <span className="text-[#180B51] font-bold text-sm">{getMonthName(new Date(flightCalendarMonth.getFullYear(), flightCalendarMonth.getMonth() + 1, 1), locale)}</span>
                      </div>
                      <button className="p-2 rounded-full text-[#180B51] hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => setFlightCalendarMonth(new Date(flightCalendarMonth.getFullYear(), flightCalendarMonth.getMonth() + 1, 1))}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                      </button>
                    </div>
                    <div className="flex w-full">
                      {renderFlightCalendarMonth(flightCalendarMonth)}
                      {renderFlightCalendarMonth(new Date(flightCalendarMonth.getFullYear(), flightCalendarMonth.getMonth() + 1, 1))}
                    </div>
                  </div>
                </div>
              </div>
              <div 
                onClick={() => navigate('/flights/search')}
                className="flights_search_btn md:w-[60px] xl:w-[73px] h-full bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-full shrink-0 transition-colors hover:bg-[#b57215]"
              >
                <svg className="md:w-5 md:h-5 xl:w-7 xl:h-7 text-white font-bold" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>

            <div className="flex xl:hidden flex-col gap-[15px]">
              <div ref={mobileFromRef} className="relative">
                <div
                  className="w-full h-[52px] md:h-[62px] bg-white border-[5px] border-[#D9D9D9] rounded-xl flex items-center px-3 md:px-4 gap-3 cursor-pointer shadow-lg"
                  onClick={() => { setFlightLocationFocus(flightLocationFocus === 'from' ? null : 'from'); setIsFlightDateOpen(false); }}
                >
                  <FlightTakeoffIcon className="w-6 h-6 md:w-7 md:h-7 text-[#007BFF] shrink-0" />
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <input
                      type="text"
                      value={flightFrom ? flightFrom.name : flightFromQuery}
                      onChange={(e) => { 
                        setFlightFromQuery(e.target.value); 
                        if(flightFrom) setFlightFrom(null); 
                        setFlightLocationFocus('from'); 
                      }}
                      placeholder={t('emptyLocation')}
                      className="w-full bg-transparent outline-none text-[#180B51] text-[13px] md:text-[15px] font-bold placeholder-[#180B51]/20 cursor-pointer"
                    />
                  </div>
                  {(flightFrom || flightFromQuery) && (
                    <button className="shrink-0 text-[#180B51]/40 hover:text-[#180B51]"
                      onClick={(e) => { e.stopPropagation(); setFlightFrom(null); setFlightFromQuery(''); setFlightLocationFocus('from'); }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
                <div
                  className={`absolute top-[calc(100%+4px)] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${flightLocationFocus === 'from' ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {renderLocationList('from', (place) => { setFlightFrom(place); setFlightFromQuery(''); setFlightLocationFocus(null); })}
                </div>
              </div>

              <div ref={mobileToRef} className="relative">
                <div
                  className="w-full h-[52px] md:h-[62px] bg-white border-[5px] border-[#D9D9D9] rounded-xl flex items-center px-3 md:px-4 gap-3 cursor-pointer shadow-lg"
                  onClick={() => { setFlightLocationFocus(flightLocationFocus === 'to' ? null : 'to'); setIsFlightDateOpen(false); }}
                >
                  <FlightLandingIcon className="w-6 h-6 md:w-7 md:h-7 text-[#007BFF] shrink-0" />
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <input
                      type="text"
                      value={flightTo ? flightTo.name : flightToQuery}
                      onChange={(e) => { 
                        setFlightToQuery(e.target.value); 
                        if(flightTo) setFlightTo(null); 
                        setFlightLocationFocus('to'); 
                      }}
                      placeholder={t('emptyLocation')}
                      className="w-full bg-transparent outline-none text-[#180B51] text-[13px] md:text-[15px] font-bold placeholder-[#180B51]/20 cursor-pointer"
                    />
                  </div>
                  {(flightTo || flightToQuery) && (
                    <button className="shrink-0 text-[#180B51]/40 hover:text-[#180B51]"
                      onClick={(e) => { e.stopPropagation(); setFlightTo(null); setFlightToQuery(''); setFlightLocationFocus('to'); }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
                <div
                  className={`absolute top-[calc(100%+4px)] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${flightLocationFocus === 'to' ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {renderLocationList('to', (place) => { setFlightTo(place); setFlightToQuery(''); setFlightLocationFocus(null); })}
                </div>
              </div>
              
              <div ref={mobileDateRef} className="flex flex-col gap-[15px]">
                <div className="relative">
                  <div
                    className="w-full h-[52px] md:h-[62px] bg-white border-[5px] border-[#D9D9D9] rounded-xl flex items-center px-3 md:px-4 gap-3 cursor-pointer shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFlightDateOpen && flightDateFocus === 'departure') setIsFlightDateOpen(false);
                      else { setIsFlightDateOpen(true); setFlightDateFocus('departure'); setFlightLocationFocus(null); }
                    }}
                  >
                    <CalendarIcon className="w-6 h-6 md:w-7 md:h-7 text-[#007BFF] shrink-0" />
                    <span className="text-[#180B51] text-[13px] md:text-[15px] font-medium truncate">
                      {flightDepartureDate ? formatDate(flightDepartureDate, locale) : formatDate(today, locale)}
                    </span>
                  </div>
                  <div
                    className={`absolute top-[calc(100%+4px)] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isFlightDateOpen && flightDateFocus === 'departure' ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {renderMobileDateDropdown()}
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-[52px] md:h-[62px] bg-white border-[5px] border-[#D9D9D9] rounded-xl flex items-center px-3 md:px-4 gap-3 shadow-lg">
                    <label
                      className="flex items-center gap-1.5 shrink-0 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#7C70EB] cursor-pointer"
                        checked={isReturnFlight}
                        onChange={(e) => {
                          setIsReturnFlight(e.target.checked);
                          if (!e.target.checked) { setFlightReturnDate(null); setIsFlightDateOpen(false); }
                        }}
                      />
                      <span className="text-[#180B51]/70 text-[11px] md:text-[13px] font-bold whitespace-nowrap">{t('returnDate')}</span>
                    </label>
                    <div
                      className={`flex-1 flex items-center gap-3 transition-all ${!isReturnFlight ? 'opacity-40 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={(e) => {
                        if (!isReturnFlight) return;
                        e.stopPropagation();
                        if (isFlightDateOpen && flightDateFocus === 'return') setIsFlightDateOpen(false);
                        else { setIsFlightDateOpen(true); setFlightDateFocus('return'); setFlightLocationFocus(null); }
                      }}
                    >
                      <CalendarIcon className="w-6 h-6 md:w-7 md:h-7 text-[#007BFF] shrink-0" />
                      <span className="text-[#180B51] text-[13px] md:text-[15px] font-medium truncate">
                        {flightReturnDate ? formatDate(flightReturnDate, locale) : formatDate(tomorrow, locale)}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`absolute top-[calc(100%+4px)] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isFlightDateOpen && flightDateFocus === 'return' && isReturnFlight ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {renderMobileDateDropdown()}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div ref={mobilePassengersRef} className="relative flex-1 min-w-0">
                  <div
                    className="w-full h-[52px] md:h-[62px] bg-white border-[5px] border-[#D9D9D9] rounded-xl flex items-center px-3 gap-2 cursor-pointer shadow-lg"
                    onClick={() => { setIsFlightPassengersOpen(prev => !prev); if (isFlightCabinOpen) setIsFlightCabinOpen(false); }}
                  >
                    <AdultIcon className="w-5 h-5 md:w-6 md:h-6 text-[#007BFF] shrink-0" />
                    <span className="flex-1 text-[11px] md:text-[13px] text-[#180B51] font-bold truncate min-w-0">
                      {flightAdults} {t('adultsDisplay')}, {flightChildren} {t('childDisplay')}, {flightInfants} {t('infant')}
                    </span>
                    <svg className={`w-4 h-4 text-[#180B51] transition-transform duration-200 shrink-0 ${isFlightPassengersOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  <div
                    className={`absolute top-[calc(100%+4px)] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isFlightPassengersOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                    style={{ minWidth: '280px' }}
                  >
                    {renderPassengersContent()}
                  </div>
                </div>
                <div ref={mobileCabinRef} className="relative flex-1 min-w-0">
                  <div
                    className="w-full h-[52px] md:h-[62px] bg-white border-[5px] border-[#D9D9D9] rounded-xl flex items-center px-3 gap-2 cursor-pointer shadow-lg"
                    onClick={() => { setIsFlightCabinOpen(prev => !prev); if (isFlightPassengersOpen) setIsFlightPassengersOpen(false); }}
                  >
                    <svg className="w-5 h-5 text-[#007BFF] shrink-0" fill="currentColor" viewBox="0 0 240.235 240.235" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
                      <path d="M211.744,6.089C208.081,2.163,203.03,0,197.52,0h-15.143c-11.16,0-21.811,8.942-23.74,19.934l-0.955,5.436 c-0.96,5.47,0.332,10.651,3.639,14.589c3.307,3.938,8.186,6.106,13.74,6.106h19.561c2.714,0,5.339-0.542,7.778-1.504l-2.079,17.761 c-2.001-0.841-4.198-1.289-6.507-1.289h-22.318c-9.561,0-18.952,7.609-20.936,16.961l-19.732,93.027l-93.099-6.69 c-5.031-0.36-9.231,1.345-11.835,4.693c-2.439,3.136-3.152,7.343-2.009,11.847l10.824,42.618 c2.345,9.233,12.004,16.746,21.53,16.746h78.049h1.191h39.729c9.653,0,18.336-7.811,19.354-17.411l15.272-143.981 c0.087-0.823,0.097-1.634,0.069-2.437l5.227-44.648c0.738-1.923,1.207-3.967,1.354-6.087l0.346-4.97 C217.214,15.205,215.407,10.016,211.744,6.089z" />
                    </svg>
                    <span className="flex-1 text-[11px] md:text-[13px] text-[#180B51] font-bold truncate min-w-0">
                      {t(flightCabinOptions.find(c => c.value === flightCabinClass)?.labelKey || 'economy')}
                    </span>
                    <svg className={`w-4 h-4 text-[#180B51] transition-transform duration-200 shrink-0 ${isFlightCabinOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  <div
                    className={`absolute top-[calc(100%+4px)] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isFlightCabinOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                    style={{ minWidth: '160px' }}
                  >
                    {renderCabinContent()}
                  </div>
                </div>
              </div>
              <div 
                onClick={() => navigate('/flights/search')}
                className="w-full h-[52px] md:h-[62px] bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-xl gap-2 hover:bg-[#b57215] transition-colors shadow-lg"
              >
                <svg className="w-6 h-6 text-white shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <span className="text-white font-bold text-[15px] md:text-base">{t('searchFlights')}</span>
              </div>
            </div>
          </>
        )}

        {activeFlightFilter === 'multiCity' && (
          <>
            <div className="hidden xl:block">
              {multiCityFlights.map((flight, index) => {
                const isMcLocFocused = mcLocationFocus?.rowId === flight.id;
                const isMcDateOpen = mcDateOpen === flight.id;
                const mcCal = mcCalendarMonths[flight.id] || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                const prevDate = index > 0 ? multiCityFlights[index - 1].date : null;
                const minDate = prevDate ? new Date(prevDate) : (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
                const activeQuery = isMcLocFocused ? (mcLocationFocus.field === 'from' ? flight.fromQuery : flight.toQuery) : '';
                const filteredPlaces = activeQuery ? flightAllPlaces.filter(p => p.name.toLowerCase().includes(activeQuery.toLowerCase()) || p.airport.toLowerCase().includes(activeQuery.toLowerCase())) : null;

                return (
                  <div key={flight.id} className="flights_multi_city_row w-full h-[73px] flex md:gap-2 xl:gap-4 items-center mb-4">
                    <div
                      ref={el => { mcLocationRefs.current[flight.id] = el; }}
                      className="flights_location_block flex-1 border-[5px] border-[#D9D9D9] rounded-xl flex relative bg-white h-full min-w-0"
                    >
                      <div
                        className="flights_from_section w-1/2 h-full relative flex items-center md:px-2 xl:px-4 gap-2 xl:gap-4 cursor-pointer min-w-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMcLocationFocus(isMcLocFocused && mcLocationFocus.field === 'from' ? null : { rowId: flight.id, field: 'from' });
                          if (isMcDateOpen) setMcDateOpen(null);
                        }}
                      >
                        <span className="absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">{t('from')}</span>
                        <FlightTakeoffIcon className="md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#007BFF] shrink-0" />
                        <div className="flex-1 flex flex-col min-w-0">
                          <input type="text" 
                            value={flight.from ? flight.from.name : flight.fromQuery}
                            onChange={(e) => { 
                              const val = e.target.value; 
                              setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, from: null, fromQuery: val } : f)); 
                              setMcLocationFocus({ rowId: flight.id, field: 'from' }); 
                            }}
                            placeholder={t('emptyLocation')}
                            className="w-full bg-transparent outline-none text-[#180B51] md:text-sm xl:text-lg font-bold placeholder-[#180B51]/20 cursor-pointer truncate"
                          />
                          {flight.from && (
                            <span className="text-[#180B51]/50 md:text-[10px] xl:text-[12px] truncate leading-tight hidden md:block">{flight.from.airport}</span>
                          )}
                        </div>
                        {(flight.from || flight.fromQuery) && (
                          <button className="shrink-0 text-[#180B51]/40 hover:text-[#180B51] ml-1"
                            onClick={(e) => { e.stopPropagation(); setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, from: null, fromQuery: '' } : f)); setMcLocationFocus({ rowId: flight.id, field: 'from' }); }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                      </div>
                      <div className="flights_vertical_divider w-[5px] bg-[#D9D9D9] h-full relative shrink-0">
                        <div
                          className="flights_swap_btn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:w-7 md:h-7 xl:w-9 xl:h-9 bg-white border-[2px] border-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-gray-50 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, from: f.to, to: f.from, fromQuery: f.toQuery, toQuery: f.fromQuery } : f));
                            setMcLocationFocus(null);
                          }}
                        >
                          <svg className="md:w-4 md:h-4 xl:w-5 xl:h-5 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="flights_to_section w-1/2 h-full relative flex items-center md:px-2 xl:px-4 gap-2 xl:gap-4 cursor-pointer min-w-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMcLocationFocus(isMcLocFocused && mcLocationFocus.field === 'to' ? null : { rowId: flight.id, field: 'to' });
                          if (isMcDateOpen) setMcDateOpen(null);
                        }}
                      >
                        <span className="absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">{t('to')}</span>
                        <FlightLandingIcon className="md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#007BFF] shrink-0" />
                        <div className="flex-1 flex flex-col min-w-0">
                          <input type="text" 
                            value={flight.to ? flight.to.name : flight.toQuery}
                            onChange={(e) => { 
                              const val = e.target.value; 
                              setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, to: null, toQuery: val } : f)); 
                              setMcLocationFocus({ rowId: flight.id, field: 'to' }); 
                            }}
                            placeholder={t('emptyLocation')}
                            className="w-full bg-transparent outline-none text-[#180B51] md:text-sm xl:text-lg font-bold placeholder-[#180B51]/20 cursor-pointer truncate"
                          />
                          {flight.to && (
                            <span className="text-[#180B51]/50 md:text-[10px] xl:text-[12px] truncate leading-tight hidden md:block">{flight.to.airport}</span>
                          )}
                        </div>
                        {(flight.to || flight.toQuery) && (
                          <button className="shrink-0 text-[#180B51]/40 hover:text-[#180B51] ml-1"
                            onClick={(e) => { e.stopPropagation(); setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, to: null, toQuery: '' } : f)); setMcLocationFocus({ rowId: flight.id, field: 'to' }); }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                      </div>
                      <div
                        className={`absolute top-[110%] left-0 w-full z-50 bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isMcLocFocused ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-4">
                          {filteredPlaces ? (
                            <div className="flex flex-col gap-1 max-h-[380px] overflow-y-auto custom_scrollbar">
                              {filteredPlaces.length > 0 ? filteredPlaces.map((place, idx) => (
                                <div key={idx} className="flex flex-col px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                                  onClick={() => {
                                    if (mcLocationFocus.field === 'from') { setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, from: place, fromQuery: '' } : f)); }
                                    else { setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, to: place, toQuery: '' } : f)); }
                                    setMcLocationFocus(null);
                                  }}
                                >
                                  <span className="text-[#180B51] font-bold text-sm">{place.name}</span>
                                  <span className="text-[#180B51]/50 text-xs">{place.airport}</span>
                                </div>
                              )) : (
                                <span className="text-[#180B51]/40 text-sm px-3 py-2">{t('noResults') || 'No results'}</span>
                              )}
                            </div>
                          ) : (
                            <div className="max-h-[420px] overflow-y-auto custom_scrollbar">
                              {flightLocationCategories.map((cat) => (
                                <div key={cat.titleKey} className="mb-3">
                                  <div className="flex items-center gap-2 mb-2 text-[#007BFF]">
                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <span className="font-bold text-xs uppercase">{t(cat.titleKey)}</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1">
                                    {cat.places.map((place, idx) => (
                                      <div key={idx} className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors text-left"
                                        onClick={() => {
                                          if (mcLocationFocus.field === 'from') { setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, from: place, fromQuery: '' } : f)); }
                                          else { setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, to: place, toQuery: '' } : f)); }
                                          setMcLocationFocus(null);
                                        }}
                                      >
                                        <span className="text-[#180B51] font-medium text-sm">{place.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      ref={el => { mcDateRefs.current[flight.id] = el; }}
                      className="flights_date_block flex-1 border-[5px] border-[#D9D9D9] rounded-xl flex relative bg-white h-full min-w-0"
                    >
                      <div
                        className="flights_departure_section w-full h-full relative flex items-center md:px-2 xl:px-4 gap-2 xl:gap-4 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMcDateOpen(isMcDateOpen ? null : flight.id);
                          setMcLocationFocus(null);
                          if (!mcCalendarMonths[flight.id]) {
                            const base = flight.date ? new Date(flight.date.getFullYear(), flight.date.getMonth(), 1) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                            setMcCalendarMonths(prev => ({ ...prev, [flight.id]: base }));
                          }
                        }}
                      >
                        <span className="absolute -top-[30px] left-0 text-black font-bold text-[15px] whitespace-nowrap">{t('departureDate')}</span>
                        <CalendarIcon className="md:w-6 md:h-6 xl:w-8 xl:h-8 text-[#007BFF] shrink-0" />
                        <span className="text-[#180B51] md:text-sm xl:text-lg font-medium whitespace-nowrap truncate">
                          {flight.date ? formatDate(flight.date, locale) : formatDate(today, locale)}
                        </span>
                      </div>
                      <div
                        className={`absolute top-[110%] left-0 w-full z-50 bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isMcDateOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-4 flex flex-col">
                          <div className="flex justify-between items-center mb-4 px-4">
                            <button
                              className={`p-2 rounded-full transition-colors ${mcCal.getFullYear() === new Date().getFullYear() && mcCal.getMonth() === new Date().getMonth() ? 'text-gray-300 cursor-not-allowed' : 'text-[#180B51] hover:bg-gray-100'}`}
                              onClick={() => {
                                const curr = new Date();
                                if (mcCal.getFullYear() === curr.getFullYear() && mcCal.getMonth() === curr.getMonth()) return;
                                setMcCalendarMonths(prev => ({ ...prev, [flight.id]: new Date(mcCal.getFullYear(), mcCal.getMonth() - 1, 1) }));
                              }}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                            </button>
                            <span className="text-[#180B51] font-bold text-sm">{getMonthName(mcCal, locale)}</span>
                            <button className="p-2 rounded-full text-[#180B51] hover:bg-gray-100 transition-colors cursor-pointer"
                              onClick={() => setMcCalendarMonths(prev => ({ ...prev, [flight.id]: new Date(mcCal.getFullYear(), mcCal.getMonth() + 1, 1) }))}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                            </button>
                          </div>
                          {renderMcCalendarMonth(mcCal, flight.date, minDate, (selectedDate) => {
                            setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, date: selectedDate } : f));
                            setMcDateOpen(null);
                          })}
                        </div>
                      </div>
                    </div>
                    {multiCityFlights.length >= 3 && (
                      <div
                        className="w-[45px] h-[45px] shrink-0 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 transition-colors border-[2px] border-transparent hover:border-[#D9D9D9]"
                        onClick={() => handleRemoveFlight(flight.id)}
                      >
                        <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="w-full h-[73px] flex md:gap-2 xl:gap-4 items-center">
                <div
                  className={`flex-1 h-full border-[2px] border-dashed border-[#180B51] rounded-xl flex items-center justify-center gap-2 transition-colors ${multiCityFlights.length >= 5 ? 'opacity-40 cursor-not-allowed bg-transparent' : 'cursor-pointer bg-white/50 hover:bg-white'}`}
                  onClick={handleAddFlight}
                >
                  <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="text-[#180B51] text-[16px] font-bold whitespace-nowrap">{t('addAnotherFlight')}</span>
                </div>
                <div 
                  onClick={() => navigate('/flights/search')}
                  className={`h-full bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-xl shrink-0 transition-colors hover:bg-[#b57215] px-6 gap-3 ${multiCityFlights.length >= 3 ? 'mr-[61px]' : ''}`}
                >
                  <svg className="w-6 h-6 text-white font-bold shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <span className="text-white font-bold text-[18px] whitespace-nowrap">{t('searchFlights')}</span>
                </div>
              </div>
            </div>

            <div className="block xl:hidden">
              {multiCityFlights.map((flight, index) => {
                const isMcLocFocused = mcLocationFocus?.rowId === flight.id;
                const isMcDateOpen = mcDateOpen === flight.id;
                const prevDate = index > 0 ? multiCityFlights[index - 1].date : null;
                const minDate = prevDate ? new Date(prevDate) : (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
                const activeQuery = isMcLocFocused ? (mcLocationFocus.field === 'from' ? flight.fromQuery : flight.toQuery) : '';
                const filteredPlaces = activeQuery ? flightAllPlaces.filter(p => p.name.toLowerCase().includes(activeQuery.toLowerCase()) || p.airport.toLowerCase().includes(activeQuery.toLowerCase())) : null;

                return (
                  <div key={flight.id} className="mb-6">
                    <div
                      ref={el => { mcLocationRefs.current[flight.id] = el; }}
                      className="w-full border-[5px] border-[#D9D9D9] rounded-xl flex relative bg-white h-[73px] mb-3"
                    >
                      <div
                        className="w-1/2 h-full relative flex items-center px-4 gap-4 cursor-pointer min-w-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMcLocationFocus(isMcLocFocused && mcLocationFocus.field === 'from' ? null : { rowId: flight.id, field: 'from' });
                          if (isMcDateOpen) setMcDateOpen(null);
                        }}
                      >
                        <FlightTakeoffIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
                        <div className="flex-1 flex flex-col min-w-0">
                          <input type="text" 
                            value={flight.from ? flight.from.name : flight.fromQuery}
                            onChange={(e) => { 
                              const val = e.target.value; 
                              setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, from: null, fromQuery: val } : f)); 
                              setMcLocationFocus({ rowId: flight.id, field: 'from' }); 
                            }}
                            placeholder={t('emptyLocation')}
                            className="w-full bg-transparent outline-none text-[#180B51] text-lg font-bold placeholder-[#180B51]/20 cursor-pointer truncate"
                          />
                        </div>
                        {(flight.from || flight.fromQuery) && (
                          <button className="shrink-0 text-[#180B51]/40 hover:text-[#180B51] ml-1"
                            onClick={(e) => { e.stopPropagation(); setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, from: null, fromQuery: '' } : f)); setMcLocationFocus({ rowId: flight.id, field: 'from' }); }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                      </div>
                      <div className="w-[5px] bg-[#D9D9D9] h-full relative shrink-0">
                        <div
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white border-[2px] border-[#D9D9D9] rounded-full flex items-center justify-center cursor-pointer z-10 hover:bg-gray-50 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, from: f.to, to: f.from, fromQuery: f.toQuery, toQuery: f.fromQuery } : f));
                            setMcLocationFocus(null);
                          }}
                        >
                          <svg className="w-5 h-5 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="w-1/2 h-full relative flex items-center px-4 gap-4 cursor-pointer min-w-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMcLocationFocus(isMcLocFocused && mcLocationFocus.field === 'to' ? null : { rowId: flight.id, field: 'to' });
                          if (isMcDateOpen) setMcDateOpen(null);
                        }}
                      >
                        <FlightLandingIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
                        <div className="flex-1 flex flex-col min-w-0">
                          <input type="text" 
                            value={flight.to ? flight.to.name : flight.toQuery}
                            onChange={(e) => { 
                              const val = e.target.value; 
                              setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, to: null, toQuery: val } : f)); 
                              setMcLocationFocus({ rowId: flight.id, field: 'to' }); 
                            }}
                            placeholder={t('emptyLocation')}
                            className="w-full bg-transparent outline-none text-[#180B51] text-lg font-bold placeholder-[#180B51]/20 cursor-pointer truncate"
                          />
                        </div>
                        {(flight.to || flight.toQuery) && (
                          <button className="shrink-0 text-[#180B51]/40 hover:text-[#180B51] ml-1"
                            onClick={(e) => { e.stopPropagation(); setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, to: null, toQuery: '' } : f)); setMcLocationFocus({ rowId: flight.id, field: 'to' }); }}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        )}
                      </div>
                      <div
                        className={`absolute top-[110%] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isMcLocFocused ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-4">
                          {filteredPlaces ? (
                            <div className="flex flex-col gap-1 max-h-[380px] overflow-y-auto custom_scrollbar">
                              {filteredPlaces.length > 0 ? filteredPlaces.map((place, idx) => (
                                <div key={idx} className="flex flex-col px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                                  onClick={() => {
                                    if (mcLocationFocus.field === 'from') { setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, from: place, fromQuery: '' } : f)); }
                                    else { setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, to: place, toQuery: '' } : f)); }
                                    setMcLocationFocus(null);
                                  }}
                                >
                                  <span className="text-[#180B51] font-bold text-sm">{place.name}</span>
                                  <span className="text-[#180B51]/50 text-xs">{place.airport}</span>
                                </div>
                              )) : (
                                <span className="text-[#180B51]/40 text-sm px-3 py-2">{t('noResults') || 'No results'}</span>
                              )}
                            </div>
                          ) : (
                            <div className="max-h-[420px] overflow-y-auto custom_scrollbar">
                              {flightLocationCategories.map((cat) => (
                                <div key={cat.titleKey} className="mb-3">
                                  <div className="flex items-center gap-2 mb-2 text-[#007BFF]">
                                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                    <span className="font-bold text-xs uppercase">{t(cat.titleKey)}</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1">
                                    {cat.places.map((place, idx) => (
                                      <div key={idx} className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors text-left"
                                        onClick={() => {
                                          if (mcLocationFocus.field === 'from') { setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, from: place, fromQuery: '' } : f)); }
                                          else { setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, to: place, toQuery: '' } : f)); }
                                          setMcLocationFocus(null);
                                        }}
                                      >
                                        <span className="text-[#180B51] font-medium text-sm">{place.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div
                      ref={el => { mcDateRefs.current[flight.id] = el; }}
                      className="w-full border-[5px] border-[#D9D9D9] rounded-xl flex relative bg-white h-[73px]"
                    >
                      <div
                        className="w-full h-full relative flex items-center px-4 gap-4 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMcDateOpen(isMcDateOpen ? null : flight.id);
                          setMcLocationFocus(null);
                          if (!mcCalendarMonths[flight.id]) {
                            const base = flight.date ? new Date(flight.date.getFullYear(), flight.date.getMonth(), 1) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                            setMcCalendarMonths(prev => ({ ...prev, [flight.id]: base }));
                          }
                        }}
                      >
                        <CalendarIcon className="w-8 h-8 text-[#007BFF] shrink-0" />
                        <span className="text-[#180B51] text-lg font-medium whitespace-nowrap truncate">
                          {flight.date ? formatDate(flight.date, locale) : formatDate(today, locale)}
                        </span>
                      </div>
                      <div
                        className={`absolute top-[110%] left-0 w-full z-[9999] bg-white border border-[#D9D9D9] rounded-xl shadow-xl transition-all duration-300 origin-top overflow-hidden ${isMcDateOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {renderMobileMultiCityDateDropdown(flight.id, flight.date, minDate, (selectedDate) => {
                          setMultiCityFlights(prev => prev.map(f => f.id === flight.id ? { ...f, date: selectedDate } : f));
                          setMcDateOpen(null);
                        })}
                      </div>
                    </div>
                    {multiCityFlights.length >= 3 && (
                      <div className="flex justify-end mt-2">
                        <div
                          className="w-[45px] h-[45px] flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100 transition-colors border-[2px] border-transparent hover:border-[#D9D9D9]"
                          onClick={() => handleRemoveFlight(flight.id)}
                        >
                          <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex-1 h-[52px] md:h-[62px] border-[2px] border-dashed border-[#180B51] rounded-xl flex items-center justify-center gap-2 transition-colors ${multiCityFlights.length >= 5 ? 'opacity-40 cursor-not-allowed bg-transparent' : 'cursor-pointer bg-white/50 hover:bg-white'}`}
                    onClick={handleAddFlight}
                  >
                    <svg className="w-5 h-5 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="text-[#180B51] text-[14px] md:text-[16px] font-bold whitespace-nowrap">{t('addAnotherFlight')}</span>
                  </div>
                </div>
                <div 
                  onClick={() => navigate('/flights/search')}
                  className="w-full h-[52px] md:h-[62px] bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-xl gap-2 hover:bg-[#b57215] transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6 text-white shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <span className="text-white font-bold text-[15px] md:text-base">{t('searchFlights')}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FlightsSearch;