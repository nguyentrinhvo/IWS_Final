import React, { useState, useMemo } from 'react';
import FlightSearchSummary from '../../../components/user/FlightSearchSummary';
import FlightFiltersSidebar from '../../../components/user/FlightFiltersSidebar';
import FlightSortBar from '../../../components/user/FlightSortBar';
import FlightList from '../../../components/user/FlightList';
import FlightEmptyState from '../../../components/user/FlightEmptyState';

// ─── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_FLIGHTS = [
  {
    id: 1,
    airline: 'Vietnam Airlines',
    flightNo: 'VN-201',
    aircraft: 'Airbus A320',
    fromCode: 'HAN',
    fromCity: 'Hanoi',
    toCode: 'SGN',
    toCity: 'Ho Chi Minh City',
    departTime: '06:00',
    arriveTime: '08:05',
    arrivalDayOffset: 0,
    durationMinutes: 125,
    stops: 0,
    price: 1250000,
    originalPrice: 1500000,
    cabinClass: 'Economy',
    seatsLeft: 12,
    baggage: '23kg included',
    meal: 'Included',
    refundable: true,
  },
  {
    id: 2,
    airline: 'VietJet Air',
    flightNo: 'VJ-103',
    aircraft: 'Airbus A321',
    fromCode: 'HAN',
    fromCity: 'Hanoi',
    toCode: 'SGN',
    toCity: 'Ho Chi Minh City',
    departTime: '08:30',
    arriveTime: '10:40',
    arrivalDayOffset: 0,
    durationMinutes: 130,
    stops: 0,
    price: 850000,
    originalPrice: null,
    cabinClass: 'Economy',
    seatsLeft: 5,
    baggage: '7kg carry-on',
    meal: 'Not included',
    refundable: false,
  },
  {
    id: 3,
    airline: 'Bamboo Airways',
    flightNo: 'QH-301',
    aircraft: 'Boeing 737',
    fromCode: 'HAN',
    fromCity: 'Hanoi',
    toCode: 'SGN',
    toCity: 'Ho Chi Minh City',
    departTime: '10:15',
    arriveTime: '12:20',
    arrivalDayOffset: 0,
    durationMinutes: 125,
    stops: 0,
    price: 980000,
    originalPrice: 1100000,
    cabinClass: 'Economy',
    seatsLeft: 20,
    baggage: '20kg included',
    meal: 'Included',
    refundable: true,
  },
  {
    id: 4,
    airline: 'Vietnam Airlines',
    flightNo: 'VN-209',
    aircraft: 'Airbus A350',
    fromCode: 'HAN',
    fromCity: 'Hanoi',
    toCode: 'SGN',
    toCity: 'Ho Chi Minh City',
    departTime: '13:00',
    arriveTime: '15:05',
    arrivalDayOffset: 0,
    durationMinutes: 125,
    stops: 0,
    price: 1800000,
    originalPrice: null,
    cabinClass: 'Business',
    seatsLeft: 4,
    baggage: '30kg + carry-on',
    meal: 'Premium meal',
    refundable: true,
  },
  {
    id: 5,
    airline: 'VietJet Air',
    flightNo: 'VJ-115',
    aircraft: 'Airbus A321',
    fromCode: 'HAN',
    fromCity: 'Hanoi',
    toCode: 'SGN',
    toCity: 'Ho Chi Minh City',
    departTime: '16:45',
    arriveTime: '19:30',
    arrivalDayOffset: 0,
    durationMinutes: 165,
    stops: 1,
    price: 720000,
    originalPrice: null,
    cabinClass: 'Economy',
    seatsLeft: 30,
    baggage: '7kg carry-on',
    meal: 'Not included',
    refundable: false,
  },
  {
    id: 6,
    airline: 'Bamboo Airways',
    flightNo: 'QH-315',
    aircraft: 'Airbus A320',
    fromCode: 'HAN',
    fromCity: 'Hanoi',
    toCode: 'SGN',
    toCity: 'Ho Chi Minh City',
    departTime: '19:20',
    arriveTime: '21:30',
    arrivalDayOffset: 0,
    durationMinutes: 130,
    stops: 0,
    price: 1050000,
    originalPrice: 1200000,
    cabinClass: 'Economy',
    seatsLeft: 8,
    baggage: '20kg included',
    meal: 'Included',
    refundable: true,
  },
];

const MOCK_SEARCH = {
  from: { code: 'HAN', city: 'Hanoi' },
  to: { code: 'SGN', city: 'Ho Chi Minh City' },
  departDate: '02 May 2026',
  returnDate: '09 May 2026',
  passengers: '1 Adult',
  cabinClass: 'Economy',
  tripType: 'Round-trip',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getHour = (timeStr) => parseInt(timeStr.split(':')[0]);

const matchesDepartureTime = (timeStr, slots) => {
  if (!slots || slots.length === 0) return true;
  const h = getHour(timeStr);
  return slots.some(s => {
    if (s === 'Early Morning') return h >= 0 && h < 6;
    if (s === 'Morning') return h >= 6 && h < 12;
    if (s === 'Afternoon') return h >= 12 && h < 18;
    if (s === 'Evening') return h >= 18;
    return false;
  });
};

// ─── Page ────────────────────────────────────────────────────────────────────
const FlightSearchResults = () => {
  const [sort, setSort] = useState('cheapest');
  const [filters, setFilters] = useState({
    airlines: [],
    departureTimes: [],
    maxPrice: 5000000,
    cabinClass: 'All',
    seatsAvail: false,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_FLIGHTS.filter(f => {
      if (filters.airlines.length > 0 && !filters.airlines.includes(f.airline)) return false;
      if (!matchesDepartureTime(f.departTime, filters.departureTimes)) return false;
      if (f.price > filters.maxPrice) return false;
      if (filters.cabinClass !== 'All' && f.cabinClass !== filters.cabinClass) return false;
      if (filters.seatsAvail && f.seatsLeft === 0) return false;
      return true;
    });
  }, [filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'cheapest') return arr.sort((a, b) => a.price - b.price);
    if (sort === 'fastest') return arr.sort((a, b) => a.durationMinutes - b.durationMinutes);
    if (sort === 'earliest') return arr.sort((a, b) => a.departTime.localeCompare(b.departTime));
    // best = score by price + duration normalised
    return arr.sort((a, b) => (a.price / 1000000 + a.durationMinutes / 60) - (b.price / 1000000 + b.durationMinutes / 60));
  }, [filtered, sort]);

  const resetFilters = () => setFilters({
    airlines: [],
    departureTimes: [],
    maxPrice: 5000000,
    cabinClass: 'All',
    seatsAvail: false,
  });

  return (
    // NOTE: UserLayout wraps this; it supplies max-w-[1320px] and px-4.
    // We use negative margin trick (-mx-4) to break out for the summary bar,
    // then a fresh inner container for the two-column layout.
    <div className="flex flex-col -mx-4 min-h-screen bg-gray-50">

      {/* Search Summary Bar – full width */}
      <FlightSearchSummary search={MOCK_SEARCH} onEditSearch={() => {}} />

      {/* Main content */}
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-6">

        {/* Mobile: Filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-[#1a2b49]">{sorted.length}</span> flights
          </p>
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center space-x-2 border-2 border-[#7978E9] text-[#7978E9] font-semibold text-sm px-4 py-2 rounded-xl hover:bg-[#7978E9]/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Filters</span>
          </button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar – desktop only */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <FlightFiltersSidebar filters={filters} onChange={setFilters} />
          </div>

          {/* Results column */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Sort Bar */}
            <FlightSortBar
              activeSort={sort}
              onSortChange={setSort}
              totalResults={sorted.length}
            />

            {/* List or Empty */}
            {sorted.length > 0 ? (
              <FlightList flights={sorted} isLoading={false} />
            ) : (
              <FlightEmptyState onReset={resetFilters} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)}></div>
          <div className="relative ml-auto w-full max-w-sm bg-white h-full overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-bold text-[#1a2b49] text-lg">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FlightFiltersSidebar filters={filters} onChange={setFilters} />
            <div className="sticky bottom-0 bg-white px-5 py-4 border-t border-gray-100">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-3 rounded-xl transition-colors"
              >
                Show {sorted.length} flights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearchResults;
