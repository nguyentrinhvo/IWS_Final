import React from 'react';

export const FilterLabel = ({ children }) => (
  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
    {children}
  </label>
);

export const AdminSelect = ({ children, value, onChange, className = '' }) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full bg-[#fafafa] border border-gray-100 text-sm font-semibold text-slate-700 py-2.5 px-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all appearance-none cursor-pointer ${className}`}
  >
    {children}
  </select>
);

const FilterBar = ({ children, gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' }) => (
  <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] p-5">
    <div className={`grid ${gridCols} gap-4 items-end`}>
      {children}
    </div>
  </div>
);

export default FilterBar;
