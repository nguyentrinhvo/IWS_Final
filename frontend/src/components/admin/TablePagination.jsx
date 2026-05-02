import React from 'react';

const TablePagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange, noun = 'records' }) => {
  const from = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="px-6 py-4 border-t border-gray-100 bg-[#fefcfc] flex items-center justify-between">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        Showing {from}-{to} of {totalItems} {noun}
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-xs font-bold text-gray-400 border border-gray-100 rounded-md bg-white opacity-50 cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>
        <button className="px-3 py-1 text-xs font-bold text-white border border-[#7C4A4A] rounded-md bg-[#7C4A4A]">
          {currentPage}
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 text-xs font-bold text-gray-400 border border-gray-100 rounded-md bg-white opacity-50 cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
