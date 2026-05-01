import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ value, onChange, placeholder = 'Search...', className = '' }) => (
  <div className={`relative ${className}`}>
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-9 pr-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 placeholder-gray-400 outline-none focus:border-[#7C4A4A] transition-all"
    />
  </div>
);

export default SearchInput;
