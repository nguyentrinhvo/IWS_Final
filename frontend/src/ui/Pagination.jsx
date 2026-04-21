import React from 'react';

export default function Pagination({ page = 1, total = 1, onChange }) {
  const getPages = () => {
    const pages = [];
    const showMax = 5;

    if (total <= showMax + 2) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      } else if (page >= total - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = total - 4; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => page > 1 && onChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-full border border-transparent bg-[#D1D3DD] text-black hover:bg-[#B8BBD0] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="flex items-center space-x-2">
        {getPages().map((p, index) => (
          <button
            key={index}
            onClick={() => typeof p === 'number' && onChange(p)}
            disabled={p === '...'}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all cursor-pointer
              ${p === page 
                ? 'bg-[#765FDD] text-white shadow-md scale-110 hover:bg-[#180B51]' 
                : p === '...' 
                  ? 'cursor-default text-black bg-transparent' 
                  : 'bg-[#D1D3DD] text-black hover:bg-[#B8BBD0] border border-transparent'
              }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => page < total && onChange(page + 1)}
        disabled={page === total}
        className="p-2 rounded-full border border-transparent bg-[#D1D3DD] text-black hover:bg-[#B8BBD0] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}