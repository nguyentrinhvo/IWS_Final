import React from 'react';

const dictionary = {
  en: {
    text: 'Loading more options...',
  },
  vi: {
    text: 'Đang tải dữ liệu...',
  }
};

export default function Loading({ className = '', locale = 'en' }) {
  const t = dictionary[locale] || dictionary.en;

  return (
    <div className={`flex flex-col items-center justify-center p-8 space-y-4 ${className}`}>
      <svg className="animate-spin h-10 w-10 text-[#765FDD]" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <p className="text-[#765FDD] font-medium text-lg animate-pulse">
        {t.text}
      </p>
    </div>
  );
}
