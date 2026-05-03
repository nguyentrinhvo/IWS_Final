import React from 'react';
import ActivityCard from './ActivityCard';
import { useGlobal } from '../../context/GlobalContext';

const AllActivities = ({ data }) => {
  const { t } = useGlobal();

  if (!data || data.length === 0) return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-2xl mx-auto max-w-[1200px]">
      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 className="text-xl font-bold text-gray-700 mb-2">{t('ttd_empty_title')}</h3>
      <p className="text-gray-500 text-center">{t('ttd_empty_desc')}</p>
    </div>
  );

  return (
    <div className="py-4 w-full max-w-[1200px] mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllActivities;
