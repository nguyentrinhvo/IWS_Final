import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import flightService from '../../../services/flightService';
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
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state?.searchParams || {};

  const searchSummary = useMemo(() => {
    const getCode = (loc) => {
      if (!loc) return null;
      if (loc.airport) {
        const match = loc.airport.match(/\(([A-Z]{3})\)/);
        if (match) return match[1];
      }
      if (loc.name) return loc.name.slice(0, 3).toUpperCase();
      return null;
    };

    if (searchParams.tripType === 'multicity') {
      const firstSegment = searchParams.segments?.[0];
      return {
        from: { 
          code: getCode(firstSegment?.from) || 'HAN', 
          city: firstSegment?.from?.name || 'Hanoi' 
        },
        to: { 
          code: getCode(firstSegment?.to) || 'SGN', 
          city: firstSegment?.to?.name || 'Ho Chi Minh City' 
        },
        departDate: firstSegment?.date ? new Date(firstSegment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '02 May 2026',
        returnDate: null,
        passengers: `${searchParams.adults || 1} Adult${searchParams.adults > 1 ? 's' : ''}`,
        cabinClass: searchParams.cabinClass === 'economy' ? 'Economy' : 
                    searchParams.cabinClass === 'business' ? 'Business' : 
                    searchParams.cabinClass === 'firstClass' ? 'First Class' : 'Economy',
        tripType: 'Multi-city',
      };
    } else {
      // one-way hoặc round-trip
      const fromName = searchParams.from?.name || 'Hanoi';
      const toName = searchParams.to?.name || 'Ho Chi Minh City';
      const departDateObj = searchParams.departureDate ? new Date(searchParams.departureDate) : new Date();
      const returnDateObj = searchParams.returnDate ? new Date(searchParams.returnDate) : null;
      
      return {
        from: { 
          code: getCode(searchParams.from) || fromName.slice(0, 3).toUpperCase(), 
          city: fromName 
        },
        to: { 
          code: getCode(searchParams.to) || toName.slice(0, 3).toUpperCase(), 
          city: toName 
        },
        departDate: departDateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        returnDate: returnDateObj ? returnDateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null,
        passengers: `${searchParams.adults || 1} Adult${searchParams.adults > 1 ? 's' : ''}`,
        cabinClass: searchParams.cabinClass === 'economy' ? 'Economy' : 
                    searchParams.cabinClass === 'business' ? 'Business' : 
                    searchParams.cabinClass === 'firstClass' ? 'First Class' : 'Economy',
        tripType: searchParams.returnDate ? 'Round-trip' : 'One-way',
      };
    }
  }, [searchParams]);

  const [flightsData, setFlightsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      setIsLoading(true);
      try {
        let fromCode = 'HAN';
        let toCode = 'SGN';
        let flightDateStr = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;

        const getCode = (loc) => {
          if (!loc) return null;
          if (loc.airport) {
            const match = loc.airport.match(/\(([A-Z]{3})\)/);
            if (match) return match[1];
          }
          if (loc.name) return loc.name.slice(0, 3).toUpperCase();
          return null;
        };

        if (searchParams.tripType === 'multicity') {
          const first = searchParams.segments?.[0];
          if (first?.from) fromCode = getCode(first.from) || fromCode;
          if (first?.to) toCode = getCode(first.to) || toCode;
          if (first?.date) {
            const d = new Date(first.date);
            flightDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          }
        } else {
          if (searchParams.from) fromCode = getCode(searchParams.from) || fromCode;
          if (searchParams.to) toCode = getCode(searchParams.to) || toCode;
          if (searchParams.departureDate) {
            const d = new Date(searchParams.departureDate);
            flightDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          }
        }

        const response = await flightService.searchFlights({
          departureAirport: fromCode,
          arrivalAirport: toCode,
          flightDate: flightDateStr
        });
        
        const mapped = response.map(flight => {
          const schedule = flight.schedules?.[0] || {};
          
          const formatTime = (timeStr, defaultTime) => {
            if (!timeStr) return defaultTime;
            try {
              const d = new Date(timeStr);
              if (isNaN(d.getTime())) return defaultTime;
              return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
            } catch (e) {
              return defaultTime;
            }
          };

          return {
            id: flight.id,
            airline: flight.airline,
            flightNo: flight.flightNumber,
            aircraft: 'Airbus A320', 
            fromCode: flight.departureAirport,
            fromCity: flight.departureCity || flight.departureAirport, 
            toCode: flight.arrivalAirport,
            toCity: flight.arrivalCity || flight.arrivalAirport,
            departTime: formatTime(schedule.departureTime, '06:00'),
            arriveTime: formatTime(schedule.arrivalTime, '08:00'),
            arrivalDayOffset: 0,
            durationMinutes: flight.durationMinutes || 120,
            stops: 0,
            price: flight.basePrice || 0,
            originalPrice: null,
            cabinClass: flight.cabinClass || 'Economy',
            seatsLeft: schedule.availableSeats || flight.totalSeats || 0,
            baggage: '20kg included',
            meal: 'Included',
            refundable: true,
          };
        });
        setFlightsData(mapped);
      } catch (error) {
        console.error("Failed to fetch flights:", error);
        setFlightsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams]);

  // State filters và sort
  const [sort, setSort] = useState('cheapest');
  const [filters, setFilters] = useState({
    airlines: [],
    departureTimes: [],
    maxPrice: 5000000,
    cabinClass: 'All',
    seatsAvail: false,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Áp dụng bộ lọc (airline, departure time, price, cabin, seats) lên flightsData
  const filtered = useMemo(() => {
    return flightsData.filter(f => {
      if (filters.airlines.length > 0 && !filters.airlines.includes(f.airline)) return false;
      if (!matchesDepartureTime(f.departTime, filters.departureTimes)) return false;
      if (f.price > filters.maxPrice) return false;
      if (filters.cabinClass !== 'All' && f.cabinClass !== filters.cabinClass) return false;
      if (filters.seatsAvail && f.seatsLeft === 0) return false;
      return true;
    });
  }, [flightsData, filters]);

  // Sắp xếp
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'cheapest') return arr.sort((a, b) => a.price - b.price);
    if (sort === 'fastest') return arr.sort((a, b) => a.durationMinutes - b.durationMinutes);
    if (sort === 'earliest') return arr.sort((a, b) => a.departTime.localeCompare(b.departTime));
    // best = score based on price and duration
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
    <div className="flex flex-col -mx-4 min-h-screen bg-gray-50">
      {/* Search Summary Bar – hiển thị thông tin tìm kiếm thực tế */}
      <FlightSearchSummary search={searchSummary} onEditSearch={() => navigate('/flights')} />

      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-6">
        {/* Mobile filter toggle */}
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
          {/* Sidebar desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <FlightFiltersSidebar filters={filters} onChange={setFilters} />
          </div>

          {/* Results column */}
          <div className="flex-1 min-w-0 space-y-4">
            <FlightSortBar
              activeSort={sort}
              onSortChange={setSort}
              totalResults={sorted.length}
            />
            {isLoading ? (
              <div className="flex justify-center p-8"><p>Loading flights...</p></div>
            ) : sorted.length > 0 ? (
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
