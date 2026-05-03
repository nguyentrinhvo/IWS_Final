import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TransportSearchSummary from '../../../components/user/TransportSearchSummary';
import TransportFilters from '../../../components/user/TransportFilters';
import TransportSortBar from '../../../components/user/TransportSortBar';
import TransportCard from '../../../components/user/TransportCard';
import { searchTransportRoutes } from '../../../services/transportService';

const TransportSearchResults = () => {
  const [searchParams] = useSearchParams();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('cheapest');
  const [filters, setFilters] = useState({
    departureTimes: [],
    vehicleTypes: [],
    maxPrice: 2000000,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const searchInfo = {
    from: searchParams.get('from') || 'Hanoi',
    to: searchParams.get('to') || 'Da Nang',
    departDate: searchParams.get('date') || '02 May 2026',
    passengers: '1 Ticket',
    tripType: 'One-way',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const data = await searchTransportRoutes({
          departureCity: searchInfo.from,
          arrivalCity: searchInfo.to
        });
        setRoutes(data);
      } catch (error) {
        console.error("Failed to fetch transport routes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, [searchParams]);

  const filtered = useMemo(() => {
    return routes.filter(r => {
      // Mapping backend field names to what UI expects or keeping them consistent
      const price = r.price || 0;
      const type = r.vehicleType; 
      
      if (r.price > filters.maxPrice) return false;
      return true;
    });
  }, [routes, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'cheapest') return arr.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sort === 'earliest') return arr.sort((a, b) => (a.departureTime || '').localeCompare(b.departureTime || ''));
    return arr;
  }, [filtered, sort]);

  const resetFilters = () => setFilters({
    departureTimes: [],
    vehicleTypes: [],
    maxPrice: 2000000,
  });

  if (loading) {
    return (
      <div className="flex flex-col -mx-4 min-h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col -mx-4 min-h-screen bg-gray-50">
      {/* Search Summary Bar */}
      <TransportSearchSummary search={searchInfo} onEditSearch={() => {}} />

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
