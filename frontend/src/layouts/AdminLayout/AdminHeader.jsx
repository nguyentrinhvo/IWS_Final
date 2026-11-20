import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, Check, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ onMenuClick }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const notiRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notiRef.current && !notiRef.current.contains(event.target)) {
        setIsNotiOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'New Booking', message: 'Tour "Hạ Long Bay" has a new booking.', time: '2 mins ago', type: 'info' },
    { id: 2, title: 'Payment Success', message: 'Payment for booking #BK-7829 was successful.', time: '1 hour ago', type: 'success' },
    { id: 3, title: 'System Update', message: 'The admin panel has been updated to v2.4.', time: '5 hours ago', type: 'info' },
  ];

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [
      { label: t('header.admin', 'Admin'), path: '/admin/dashboard' }
    ];

    if (path === '/admin/dashboard' || path === '/admin') {
      breadcrumbs.push({ label: t('dashboard.breadcrumb', 'Dashboard') });
    } else if (path.includes('/admin/users')) {
      breadcrumbs.push({ label: t('pages.users.title', 'User Management') });
    } else if (path.includes('/admin/tours')) {
      // Add Tours Management as intermediate if it's a sub-page
      if (path === '/admin/tours') {
        breadcrumbs.push({ label: t('pages.tours.title', 'Tours Management') });
      } else {
        breadcrumbs.push({ label: t('pages.tours.title', 'Tours Management'), path: '/admin/tours' });
        
        if (path === '/admin/tours/create') {
          breadcrumbs.push({ label: 'Create Tour' });
        } else if (path.includes('/admin/tours/edit/')) {
          breadcrumbs.push({ label: 'Edit Tour' });
        }
      }
    } else if (path.includes('/admin/payments')) {
      breadcrumbs.push({ label: t('pages.payments.title', 'Payment Management') });
    } else if (path.includes('/admin/flights')) {
      breadcrumbs.push({ label: t('pages.flights.title', 'Flights Management') });
    } else if (path.includes('/admin/hotels')) {
      breadcrumbs.push({ label: t('pages.hotels.title', 'Hotel Management') });
    } else if (path.includes('/admin/attractions')) {
      breadcrumbs.push({ label: t('pages.attractions.title', 'Attractions Management') });
    } else if (path.includes('/admin/categories')) {
      breadcrumbs.push({ label: t('pages.categories.title', 'Category Management') });
    } else if (path.includes('/admin/reviews')) {
      breadcrumbs.push({ label: t('pages.reviews.title', 'Reviews Management') });
    } else if (path.includes('/admin/chat')) {
      breadcrumbs.push({ label: t('pages.chat.title', 'Chat Management') });
    } else if (path.includes('/admin/bookings')) {
      breadcrumbs.push({ label: t('pages.bookings.title', 'Booking Management') });
    }

    return breadcrumbs;
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-[#fcfaf9] h-16 md:h-20 px-4 md:px-8 flex items-center justify-between border-b border-gray-100 shrink-0">
      {/* Left controls & Breadcrumb */}
      <div className="flex items-center gap-3 md:gap-4">
        <button 
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-[#7C4A4A] transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Breadcrumb */}
        <nav className="hidden sm:flex text-sm" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400 font-normal">{'>'}</span>}
              {crumb.path && index < breadcrumbs.length - 1 ? (
                <Link 
                  to={crumb.path} 
                  className="text-gray-500 hover:text-[#7C4A4A] transition-colors whitespace-nowrap"
                  title={`Back to ${crumb.label}`}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#3a2b8e] font-bold whitespace-nowrap truncate max-w-[150px] md:max-w-none">
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-3 md:space-x-6">
        {/* Search */}
        <div className="hidden md:block relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder={t('header.search', 'Search analytics or bookings...')} 
            className="pl-10 pr-4 py-2 w-48 lg:w-72 bg-[#faeceb] bg-opacity-70 rounded-md outline-none text-sm focus:ring-1 focus:ring-[#7c4a4a] text-gray-700 placeholder-gray-400 transition-all"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notiRef}>
          <button 
            onClick={() => setIsNotiOpen(!isNotiOpen)}
            className={`relative p-2 transition-colors rounded-full ${isNotiOpen ? 'bg-[#faeceb] text-[#7C4A4A]' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {isNotiOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-[200] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-[#fcfaf9]">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Notifications</h3>
                <span className="text-[10px] font-bold text-[#7C4A4A] bg-[#faeceb] px-2 py-0.5 rounded-full">3 NEW</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((noti) => (
                  <div key={noti.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 p-1.5 rounded-lg ${noti.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'}`}>
                        {noti.type === 'success' ? <Check size={14} /> : <Info size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate group-hover:text-[#7C4A4A] transition-colors">{noti.title}</p>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{noti.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{noti.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:bg-gray-50 hover:text-[#7C4A4A] transition-all border-t border-gray-50">
                View All Notifications
              </button>
            </div>
          )}
        </div>

        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center text-sm font-medium text-gray-600 md:border-l border-gray-200 md:pl-6 h-8 hover:text-[#7c4a4a] transition-colors"
        >
          {i18n.language === 'vi' ? 'VI' : 'EN'}
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-2">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-bold text-gray-800 leading-none">
              {currentUser?.fullName || 'Admin'}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              {currentUser?.role?.toUpperCase() === 'ADMIN' ? 'System Admin' : 'Staff'}
            </div>
          </div>
          {currentUser?.avatarUrl ? (
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.fullName} 
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#7C4A4A] flex items-center justify-center text-white font-bold border border-gray-200">
              {currentUser?.fullName?.charAt(0).toUpperCase() || 'A'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
