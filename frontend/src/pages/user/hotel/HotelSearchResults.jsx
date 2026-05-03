import React, { useState, useEffect } from 'react';
import HotelSearchSummary from '../../../components/user/HotelSearchSummary';
import HotelFilters from '../../../components/user/HotelFilters';
import HotelSort from '../../../components/user/HotelSort';
import HotelCard from '../../../components/user/HotelCard';
import { hotelService } from '../../../services/hotelService';

const MOCK_SEARCH = {
  location: 'Da Nang',
  checkIn: '02 Apr 2024',
  checkOut: '05 Apr 2024',
  guests: '2 Adults, 1 Room'
};

const HotelSearchResults = () => {
  const [hotels, setHotels] = useState([]);
  const [sort, setSort] = useState('popularity');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      // For now fetching Da Nang as default city if user navigated directly
      const searchCity = MOCK_SEARCH.location;
      const data = await hotelService.searchHotels(searchCity);
      setHotels(data.content || []); // Spring Pageable returns 'content' array
    } catch (error) {
      console.error('Failed to fetch hotels:', error);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 -mx-4">
      {/* Compact Search Summary Bar */}
      <HotelSearchSummary search={MOCK_SEARCH} onEditSearch={() => {}} />

      <div className="max-w-[1200px] mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-lg font-bold text-[#1a2b49]">Filters</h2>
                 <button className="text-xs font-bold text-[#7978E9] hover:underline">Reset</button>
              </div>
              <HotelFilters />
            </div>
          </aside>

          {/* Results Area */}
          <main className="flex-1 min-w-0">
            {/* Sort & Stats Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div>
                <h1 className="text-xl font-bold text-[#1a2b49]">Hotels in Da Nang</h1>
                <p className="text-xs text-gray-500 font-medium">{hotels.length} accommodations found</p>
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
                <HotelSort currentSort={sort} onSortChange={setSort} />
              </div>
            </div>

            {/* Hotel Cards List */}
            <div className="space-y-4">
              {hotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-10 flex justify-center">
              <button className="bg-white border-2 border-[#7978E9] text-[#7978E9] font-bold py-3 px-10 rounded-xl hover:bg-[#7978E9]/5 transition-all active:scale-[0.98]">
                Load More Results
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal Placeholder */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-[1000] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterModalOpen(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] p-6 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#1a2b49]">Filters</h2>
              <button onClick={() => setIsFilterModalOpen(false)} className="text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <HotelFilters />
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
