import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';

const ActivityCard = ({ item }) => {
  const navigate = useNavigate();
  const { t } = useGlobal();

  // Get primary image
  const primaryImage = item.images && item.images.length > 0 
    ? item.images.find(img => img.isPrimary)?.url || item.images[0].url 
    : 'https://via.placeholder.com/400x300?text=No+Image';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full group"
      onClick={() => navigate(`/things-to-do/${item.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={primaryImage} 
          alt={item.nameVi || item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.isFeatured && (
          <div className="absolute top-3 left-3 bg-[#CC8118] text-white text-xs font-bold px-2 py-1 rounded">
            {t('ttd_featured_badge')}
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs font-semibold text-[#007BFF] uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md inline-block">
            {item.category || item.attractionType || 'Hoạt động'}
          </div>
          {item.avgRating && (
            <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded">
              <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-bold text-gray-700">{item.avgRating}</span>
              <span className="text-[10px] text-gray-400">({item.totalReviews || 0})</span>
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-[#007BFF] transition-colors">
          {item.nameVi || item.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3 gap-1">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{item.location}</span>
        </div>
        
        {item.duration && (
          <div className="flex items-center text-xs text-gray-500 mb-4 gap-1">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{item.duration}</span>
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">{t('ttd_from_price')}</span>
            <span className="text-lg font-bold text-red-500">
              {(item.minPrice === 0 || item.price === 0) ? t('ttd_free') : formatPrice(item.minPrice || item.price || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
