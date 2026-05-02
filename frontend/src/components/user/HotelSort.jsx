import React from 'react';

const HotelSort = ({ currentSort, onSortChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Sort by:</span>
      <select 
        className="bg-white border-2 border-gray-100 rounded-xl px-4 py-2 text-sm font-bold text-[#1a2b49] focus:border-[#7978E9] outline-none transition-all cursor-pointer"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="popularity">Popularity</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
        <option value="rating">Guest Rating</option>
      </select>
    </div>
  );
};

export default HotelSort;
