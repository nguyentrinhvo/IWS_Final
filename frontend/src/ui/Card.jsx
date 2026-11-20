import React from 'react';

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-md shadow-sm border border-gray-100 p-6 ${className}`}>
      {children}
    </div>
  );
}
