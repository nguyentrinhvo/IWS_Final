import React from 'react';
import ActivityCard from './ActivityCard';
import { useGlobal } from '../../context/GlobalContext';

const Essentials = ({ data }) => {
  const { t } = useGlobal();

  if (!data || data.length === 0) return null;

  return (
    <div className="py-8 w-full max-w-[1200px] mx-auto px-4 md:px-6">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('ttd_essentials_title')}</h2>
        <p className="text-gray-600 text-sm md:text-base">{t('ttd_essentials_desc')}</p>
        <div className="h-1 w-16 bg-green-500 mt-3 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Essentials;
