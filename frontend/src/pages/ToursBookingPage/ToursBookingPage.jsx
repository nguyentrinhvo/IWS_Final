// File 4: ToursBookingPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../../layouts/UserLayout/Navbar';
import Footer from '../../layouts/UserLayout/Footer';
import ToursSearching from './ToursSearching';
import TourBreadcrumb from '../ToursDetailPage/TourBreadcrumb';
import TourHeaderLooking, { SortIcon } from './TourHeaderLooking';
import TourFilters from './TourFilters';
import TourSearchResults from './TourSearchResults';

const sortOptionsMobile = [
  { id: 'suggested', label: 'Hanuvivu suggests' },
  { id: 'duration', label: 'Duration' },
  { id: 'departure', label: 'Departure Date' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' }
];

const ToursBookingPage = ({
  tours,
  loading,
  error,
  onRetry,
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  locations,
  priceRange,
  totalResults,
  breadcrumbData
}) => {
  const [isArrangeOpen, setIsArrangeOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    if (isArrangeOpen || isSortOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isArrangeOpen, isSortOpen]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col relative">
        <Navbar />
        <div className="sticky top-0 z-50">
          <ToursSearching />
        </div>
        <main className="w-full lg:max-w-[1320px] mx-auto px-4 md:px-6 lg:px-[15px] py-5 flex-1 pb-[80px] lg:pb-5">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col relative">
        <Navbar />
        <div className="sticky top-0 z-50">
          <ToursSearching />
        </div>
        <main className="w-full lg:max-w-[1320px] mx-auto px-4 md:px-6 lg:px-[15px] py-5 flex-1 pb-[80px] lg:pb-5">
          <div className="text-center py-8">
            <p className="text-red-600">Error: {error}</p>
            <button onClick={onRetry} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <Navbar />
      <div className="sticky top-0 z-50">
        <ToursSearching />
      </div>
      <main className="w-full lg:max-w-[1320px] mx-auto px-4 md:px-6 lg:px-[15px] py-5 flex-1 pb-[80px] lg:pb-5">
        <div className="mb-4 whitespace-nowrap overflow-hidden text-ellipsis w-full">
          <TourBreadcrumb data={breadcrumbData} />
        </div>

        <div className="mb-6">
          <TourHeaderLooking
            totalResults={totalResults}
            onSortChange={onSortChange}
            currentSort={sortBy}
            currentLocation={filters.location}
          />
        </div>

        <div className="flex gap-6 flex-wrap lg:flex-nowrap">
          <aside className="hidden lg:block w-[320px] flex-shrink-0">
            <TourFilters
              filters={filters}
              onFilterChange={onFilterChange}
              locations={locations}
              priceRange={priceRange}
            />
          </aside>
          <div className="flex-1 w-full lg:min-w-[300px]">
            <TourSearchResults tours={tours} />
          </div>
        </div>
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 w-full h-[60px] bg-white border-t border-gray-200 flex z-[100] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          className="flex-1 flex items-center justify-center gap-2 border-r border-gray-200"
          onClick={() => { setIsArrangeOpen(true); setIsSortOpen(false); }}
        >
          <svg width="24px" height="24px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6L19 42" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M7 17.8995L19 5.89949" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M29 42.1005L29 6.10051" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M29 42.1005L41 30.1005" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span className="font-bold text-gray-900">Arrange</span>
        </button>
        <button 
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => { setIsSortOpen(true); setIsArrangeOpen(false); }}
        >
          <SortIcon />
          <span className="font-bold text-gray-900">Sort by</span>
        </button>
      </div>

      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 z-[101] transition-opacity duration-300 ${isArrangeOpen || isSortOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => { setIsArrangeOpen(false); setIsSortOpen(false); }}
      />

      <div className={`lg:hidden fixed bottom-0 left-0 w-full bg-white z-[102] transition-transform duration-300 ease-in-out ${isArrangeOpen ? 'translate-y-0' : 'translate-y-full'} h-[85vh] rounded-t-2xl flex flex-col`}>
        <div className="flex-1 overflow-hidden flex flex-col">
          <TourFilters 
            filters={filters}
            onFilterChange={onFilterChange}
            locations={locations}
            priceRange={priceRange}
            onClose={() => setIsArrangeOpen(false)}
          />
        </div>
      </div>

      <div className={`lg:hidden fixed bottom-0 left-0 w-full bg-white z-[102] transition-transform duration-300 ease-in-out ${isSortOpen ? 'translate-y-0' : 'translate-y-full'} rounded-t-2xl pb-6`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Sort by</h2>
          <button onClick={() => setIsSortOpen(false)} className="p-2 bg-gray-100 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col pt-2">
          {sortOptionsMobile.map((option) => (
            <button
              key={option.id}
              className={`text-left px-6 py-4 border-b border-gray-100 last:border-0 ${sortBy === option.id ? 'text-blue-600 font-bold' : 'text-gray-700 font-medium'}`}
              onClick={() => {
                if(onSortChange) onSortChange(option.id);
                setIsSortOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ToursBookingPage;
