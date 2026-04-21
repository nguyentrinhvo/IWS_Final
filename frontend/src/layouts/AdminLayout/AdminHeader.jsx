import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminHeader = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
  };

  return (
    <header className="bg-[#fcfaf9] h-20 px-8 flex items-center justify-between">
      {/* Breadcrumb */}
      <div className="text-sm">
        <span className="text-gray-500">{t('header.admin', 'Admin')}</span>
        <span className="mx-2 text-gray-400">{'>'}</span>
        <span className="text-[#3a2b8e] font-medium">{t('dashboard.breadcrumb', 'Dashboard')}</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder={t('header.search', 'Search analytics or bookings...')} 
            className="pl-10 pr-4 py-2 w-72 bg-[#faeceb] bg-opacity-70 rounded-md outline-none text-sm focus:ring-1 focus:ring-[#7c4a4a] text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center text-sm font-medium text-gray-600 border-l border-gray-200 pl-6 h-8 hover:text-[#7c4a4a] transition-colors"
        >
          {i18n.language === 'vi' ? 'VI' : 'EN'}
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-2">
          <div className="text-right">
            <div className="text-sm font-bold text-gray-800 leading-none">Admin User</div>
            <div className="text-[11px] text-gray-500 mt-1">Super Admin</div>
          </div>
          <img 
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
            alt="Admin User" 
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
