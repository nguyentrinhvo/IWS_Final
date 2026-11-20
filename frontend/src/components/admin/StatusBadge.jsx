import React from 'react';

const StatusBadge = ({ status, isActive: isActiveProp }) => {
  const displayStatus = status || (isActiveProp ? 'Active' : 'Inactive');
  const isActive = displayStatus?.toLowerCase() === 'active' || displayStatus?.toLowerCase() === 'success';
  
  return (
    <span
      className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
        isActive ? 'bg-[#eefcf2] text-[#22a85a]' : 'bg-gray-100 text-gray-500'
      }`}
    >
      {displayStatus}
    </span>
  );
};

export default StatusBadge;
