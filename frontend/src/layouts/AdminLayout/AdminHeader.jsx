import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';

const AdminHeader = ({ onMenuClick }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

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
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

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
            <div className="text-sm font-bold text-gray-800 leading-none">Admin User</div>
            <div className="text-[11px] text-gray-500 mt-1">Super Admin</div>
          </div>
          <img 
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
            alt="Admin User" 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-200"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
