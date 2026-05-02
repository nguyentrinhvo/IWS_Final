import React, { useState, useMemo, useEffect } from 'react';
import TransportSearchSummary from '../../../components/user/TransportSearchSummary';
import TransportFilters from '../../../components/user/TransportFilters';
import TransportSortBar from '../../../components/user/TransportSortBar';
import TransportCard from '../../../components/user/TransportCard';

// ─── Mock Data ──────────────────────────────────────────────────────────────
const MOCK_ROUTES = [
  {
    id: 1,
    ten_nha_xe: 'Hoang Long Bus',
    loai_phuong_tien: 'Bus (Sleeper)',
    diem_di: 'Hanoi',
    diem_den: 'Da Nang',
    gio_di: '08:00',
    gio_den: '20:00',
    gia: 450000,
    tong_so_ghe: 40,
    so_ghe_con: 12,
  },
  {
    id: 2,
    ten_nha_xe: 'Phuong Trang (FUTA)',
    loai_phuong_tien: 'Bus (Sleeper)',
    diem_di: 'Hanoi',
    diem_den: 'Da Nang',
    gio_di: '10:30',
    gio_den: '22:45',
    gia: 480000,
    tong_so_ghe: 38,
    so_ghe_con: 5,
  },
  {
    id: 3,
    ten_nha_xe: 'Vietnam Railways',
    loai_phuong_tien: 'Train (Soft seat)',
    diem_di: 'Hanoi',
    diem_den: 'Da Nang',
    gio_di: '06:00',
    gio_den: '21:30',
    gia: 850000,
    tong_so_ghe: 64,
    so_ghe_con: 20,
  },
  {
    id: 4,
    ten_nha_xe: 'Thanh Binh Bus',
    loai_phuong_tien: 'Bus (Seat)',
    diem_di: 'Hanoi',
    diem_den: 'Da Nang',
    gio_di: '14:00',
    gio_den: '02:00',
    gia: 350000,
    tong_so_ghe: 45,
    so_ghe_con: 30,
  },
  {
    id: 5,
    ten_nha_xe: 'Vietnam Railways',
    loai_phuong_tien: 'Train (Hard seat)',
    diem_di: 'Hanoi',
    diem_den: 'Da Nang',
    gio_di: '19:00',
    gio_den: '11:00',
    gia: 600000,
    tong_so_ghe: 80,
    so_ghe_con: 45,
  },
];

const MOCK_SEARCH = {
  from: 'Hanoi',
  to: 'Da Nang',
  departDate: '02 May 2026',
  passengers: '1 Ticket',
  tripType: 'One-way',
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

const TransportSearchResults = () => {
  const [sort, setSort] = useState('cheapest');
  const [filters, setFilters] = useState({
    departureTimes: [],
    vehicleTypes: [],
    maxPrice: 2000000,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    return MOCK_ROUTES.filter(r => {
      if (!matchesDepartureTime(r.gio_di, filters.departureTimes)) return false;
      if (filters.vehicleTypes.length > 0) {
        const typeMatch = filters.vehicleTypes.some(t => {
            if (t === 'bus_sleeper') return r.loai_phuong_tien === 'Bus (Sleeper)';
            if (t === 'bus_seat') return r.loai_phuong_tien === 'Bus (Seat)';
            if (t === 'train_soft') return r.loai_phuong_tien === 'Train (Soft seat)';
            if (t === 'train_hard') return r.loai_phuong_tien === 'Train (Hard seat)';
            return false;
        });
        if (!typeMatch) return false;
      }
      if (r.gia > filters.maxPrice) return false;
      return true;
    });
  }, [filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'cheapest') return arr.sort((a, b) => a.gia - b.gia);
    if (sort === 'earliest') return arr.sort((a, b) => a.gio_di.localeCompare(b.gio_di));
    if (sort === 'fastest') {
        const getDur = (r) => {
            const [h1, m1] = r.gio_di.split(':').map(Number);
            const [h2, m2] = r.gio_den.split(':').map(Number);
            let d = (h2 * 60 + m2) - (h1 * 60 + m1);
            return d < 0 ? d + 1440 : d;
        };
        return arr.sort((a, b) => getDur(a) - getDur(b));
    }
    return arr;
  }, [filtered, sort]);

  const resetFilters = () => setFilters({
    departureTimes: [],
    vehicleTypes: [],
    maxPrice: 2000000,
  });

  return (
    <div className="flex flex-col -mx-4 min-h-screen bg-gray-50">
      {/* Search Summary Bar */}
      <TransportSearchSummary search={MOCK_SEARCH} onEditSearch={() => {}} />

      {/* Main content */}
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-6">
        
        {/* Mobile: Filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-[#1a2b49]">{sorted.length}</span> routes
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
            <TransportFilters filters={filters} onChange={setFilters} />
          </div>

          {/* Results column */}
          <div className="flex-1 min-w-0 space-y-4">
            <TransportSortBar
              activeSort={sort}
              onSortChange={setSort}
              totalResults={sorted.length}
            />

            {sorted.length > 0 ? (
              <div className="space-y-4">
                {sorted.map(route => (
                  <TransportCard key={route.id} route={route} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 px-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-5 text-4xl">
                  🚌
                </div>
                <h3 className="text-xl font-bold text-[#1a2b49] mb-2">No routes found</h3>
                <p className="text-gray-500 text-sm max-w-xs mb-6">
                  We couldn't find any routes matching your search criteria. Try adjusting your filters or stations.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-2.5 px-6 rounded-xl transition-colors"
                >
                  Reset Filters
                </button>
              </div>
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
            <TransportFilters filters={filters} onChange={setFilters} />
            <div className="sticky bottom-0 bg-white px-5 py-4 border-t border-gray-100">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-3 rounded-xl transition-colors"
              >
                Show {sorted.length} routes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportSearchResults;
