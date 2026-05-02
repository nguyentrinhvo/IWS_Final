import React from 'react';

const dictionary = {
  en: {
    message: 'Something went wrong',
    retry: 'Try Again',
  },
  vi: {
    message: 'Đã xảy ra lỗi',
    retry: 'Thử lại',
  }
};

export default function ErrorState({ message, onRetry, locale = 'en' }) {
  const t = dictionary[locale] || dictionary.en;
  const displayMessage = message || t.message;

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-md border border-red-100 text-center">
      <svg className="w-10 h-10 text-red-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p className="text-sm font-medium text-red-800 mb-4">{displayMessage}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium bg-[#765FDD] text-white rounded-md hover:bg-[#180B51] transition-colors cursor-pointer"
        >
          {t.retry}
        </button>
      )}
    </div>
  );
}