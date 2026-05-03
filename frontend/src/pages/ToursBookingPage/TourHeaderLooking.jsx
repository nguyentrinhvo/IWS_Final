import React, { useState, useRef, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { sortOptions } from '../../data/mockData';

export const SortIcon = () => (
  <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.71,6.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-2,2A1,1,0,0,0,3.71,9.71L4,9.41V17a1,1,0,0,0,2,0V9.41l.29.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM11,8H21a1,1,0,0,0,0-2H11a1,1,0,0,0,0,2Zm10,8H11a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-5H11a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path>
  </svg>
);

const DownIcon = ({ className, fill = "#000000" }) => (
  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill={fill}></path>
  </svg>
);

const TourHeaderLooking = ({ totalResults = 0, onSortChange, currentSort, currentLocation }) => {
  const { t } = useGlobal();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (currentSort) {
      const found = sortOptions.find(opt => opt.id === currentSort);
      if (found) setSelectedSort(found);
    }
  }, [currentSort]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsSortOpen(false);
    if (onSortChange) onSortChange(option.id);
  };

  const getTitle = () => {
    if (!currentLocation || currentLocation === 'all') {
      return t('toursInVietnam') || 'Tours in Vietnam';
    }
    return `Tours in ${currentLocation}`;
  };

  const SortDropdown = ({ className = "" }) => (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-1">
        <SortIcon />
        <span className="font-medium text-gray-700">Sort by:</span>
      </div>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-1 cursor-pointer select-none"
          onClick={() => setIsSortOpen(!isSortOpen)}
        >
          <span className="font-semibold text-gray-900">{selectedSort.label}</span>
          <DownIcon className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
        </div>

        {isSortOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
            {sortOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSortSelect(option)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors ${selectedSort.id === option.id ? 'text-blue-500 font-medium' : 'text-gray-700'
                  }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4 lg:gap-6 py-4">
      {/* Title and total results row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 break-words">{getTitle()}</h1>
          <p className="text-gray-600 font-medium mt-1">
            {totalResults > 0 
              ? `There are ${totalResults} suitable tours.` 
              : 'No tours found for this selection.'}
          </p>
        </div>
        <SortDropdown className="self-end md:self-auto" />
      </div>
      <div className="h-px bg-gray-200 w-full"></div>
    </div>
  );
};

export default TourHeaderLooking;
