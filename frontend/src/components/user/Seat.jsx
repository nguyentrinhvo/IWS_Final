import React from 'react';

const Seat = ({ id, status, isSelected, onToggle }) => {
  const getStatusClasses = () => {
    if (status === 'booked') return 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300';
    if (isSelected) return 'bg-orange-500 text-white border-orange-600 shadow-inner';
    return 'bg-white text-gray-700 hover:bg-orange-50 border-gray-300 cursor-pointer';
  };

  return (
    <button
      disabled={status === 'booked'}
      onClick={() => onToggle(id)}
      className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all ${getStatusClasses()}`}
      title={`Seat ${id} - ${status}`}
    >
      {id}
    </button>
  );
};

export default Seat;
