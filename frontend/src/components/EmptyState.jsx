import React from 'react';

const dictionary = {
  en: {
    title: 'No Active Bookings Found',
    description: 'Anything you booked shows up here, but it seems like you haven not made any. Let is create one via homepage',
  },
  vi: {
    title: 'Không tìm thấy đặt chỗ',
    description: 'Mọi chỗ bạn đặt sẽ được hiển thị tại đây. Hiện bạn chưa có bất kỳ đặt chỗ nào, hãy đặt trên trang chủ ngay!',
  }
};

export default function EmptyState({ title, description, action, locale = 'en' }) {
  const t = dictionary[locale] || dictionary.en;
  const displayTitle = title || t.title;
  const displayDesc = description || t.description;

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-md border border-dashed border-[#D1D3DD]">
      <img 
        src="/icons/nobooking.svg" 
        alt="No data" 
        className="w-12 h-12 mb-4" 
      />
      <h3 className="text-lg font-medium text-black">{displayTitle}</h3>
      <p className="mt-1 text-sm text-black mb-4">{displayDesc}</p>
      {action && <div>{action}</div>}
    </div>
  );
}