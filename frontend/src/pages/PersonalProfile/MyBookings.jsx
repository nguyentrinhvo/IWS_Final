// MyBookings.jsx
import React from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const { t } = useGlobal();
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{t('user_activeTickets')}</h2>
      </div>

      <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-10 flex flex-col items-center justify-center text-center mb-8">
        <svg width="48" height="48" viewBox="0 0 1024 1024" fill="currentColor" className="text-gray-300 mb-4"><path d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path></svg>
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{t('user_noActiveBookings')}</h3>
        <p className="text-xs md:text-sm text-gray-500 max-w-md">{t('user_noActiveBookingsDesc')}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">{t('user_purchaseList')}</h3>
      </div>
      <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-4 md:p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate('/profile/purchase-list')}>
        <span className="font-bold text-[#0194F3] text-sm md:text-base">{t('user_viewPurchaseHistory')}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </div>
    </div>
  );
}