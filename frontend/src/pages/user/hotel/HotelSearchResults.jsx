import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HotelSearchSummary from '../../../components/user/HotelSearchSummary';
import HotelFilters from '../../../components/user/HotelFilters';
import HotelSort from '../../../components/user/HotelSort';
import HotelCard from '../../../components/user/HotelCard';
import { hotelService } from '../../../services/hotelService';

const HotelSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy thông tin tìm kiếm từ state (truyền từ HotelSearchBox)
  const searchState = location.state || {};
  const searchCity = searchState.location || searchState.city || 'Da Nang';
  const checkIn = searchState.checkIn || '';
  const checkOut = searchState.checkOut || '';
  const guests = searchState.guests || '2 Adults, 1 Room';

  const searchSummary = {
    location: searchCity,
    checkIn: checkIn || '—',
    checkOut: checkOut || '—',
    guests,
  };

  const [hotels, setHotels] = useState([]);
  const [sort, setSort] = useState('id,desc');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    minStar: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(0);
    fetchHotels(0);
  }, [searchCity, sort, filters]);

  const fetchHotels = async (pageNum = 0) => {
    try {
      setLoading(true);
      const data = await hotelService.searchHotels(
        searchCity,
        filters.minPrice,
        filters.maxPrice,
        filters.minStar,
        pageNum,
        10,
        sort
      );
      if (pageNum === 0) {
        setHotels(data.content || []);
      } else {
        setHotels(prev => [...prev, ...(data.content || [])]);
      }
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
      if (pageNum === 0) setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchHotels(nextPage);
  };

  const handleCardClick = (hotelId) => {
    navigate(`/hotels/detail/${hotelId}`, {
      state: {
        checkIn,
        checkOut,
        guests
      }
    });
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 -mx-4">
      {/* Compact Search Summary Bar */}
      <HotelSearchSummary search={searchSummary} onEditSearch={() => navigate('/hotels')} />

      <div className="max-w-[1200px] mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#1a2b49]">Filters</h2>
                <button
                  onClick={() => setFilters({ minPrice: null, maxPrice: null, minStar: null })}
                  className="text-xs font-bold text-[#7978E9] hover:underline"
                >
                  Reset
                </button>
              </div>
              <HotelFilters filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Results Area */}
          <main className="flex-1 min-w-0">
            {/* Sort & Stats Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div>
                <h1 className="text-xl font-bold text-[#1a2b49]">Hotels in {searchCity}</h1>
                <p className="text-xs text-gray-500 font-medium">
                  {loading ? 'Đang tải...' : `${hotels.length} accommodations found`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="lg:hidden flex items-center gap-2 border-2 border-gray-100 px-4 py-2 rounded-xl text-sm font-bold text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </button>
                <HotelSort currentSort={sort} onSortChange={(s) => { setSort(s); }} />
              </div>
            </div>

            {/* Loading Skeletons */}
            {loading && hotels.length === 0 ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row animate-pulse">
                    <div className="md:w-72 h-48 bg-gray-200" />
                    <div className="flex-1 p-5 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="flex gap-2">
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="h-5 w-16 bg-gray-200 rounded" />
                        ))}
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-1/3 mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : hotels.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
                <svg className="w-16 h-16 mx-auto text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-gray-400 font-bold text-lg">Không tìm thấy khách sạn nào</p>
                <p className="text-gray-400 text-sm mt-1">tại {searchCity}</p>
              </div>
            ) : (
              <>
                {/* Hotel Cards List */}
                <div className="space-y-4">
                  {hotels.map(hotel => (
                    <div
                      key={hotel.id}
                      onClick={() => handleCardClick(hotel.id)}
                      className="cursor-pointer"
                    >
                      <HotelCard hotel={hotel} />
                    </div>
                  ))}
                </div>

                {/* Load More */}
                {page < totalPages - 1 && (
                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="bg-white border-2 border-[#7978E9] text-[#7978E9] font-bold py-3 px-10 rounded-xl hover:bg-[#7978E9]/5 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {loading ? 'Đang tải...' : 'Load More Results'}
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-[1000] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterModalOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#1a2b49]">Filters</h2>
              <button onClick={() => setIsFilterModalOpen(false)} className="text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <HotelFilters filters={filters} onFilterChange={setFilters} />
            <div className="sticky bottom-0 bg-white pt-6 mt-6 pb-2">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="w-full bg-[#7978E9] text-white font-bold py-4 rounded-2xl shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelSearchResults;
