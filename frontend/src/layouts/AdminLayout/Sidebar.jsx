import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  CalendarCheck, 
  LogOut, 
  Plane,
  Building,
  Car,
  Tent,
  Grid,
  Star,
  MessageSquare,
  BarChart3,
  CreditCard,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { icon: LayoutDashboard, label: t('sidebar.dashboard', 'DASHBOARD'), path: '/admin/dashboard' },
    { icon: Users, label: t('sidebar.users', 'USERS'), path: '/admin/users' },
    { icon: Map, label: t('sidebar.tours', 'TOURS'), path: '/admin/tours' },
    { icon: CalendarCheck, label: t('sidebar.bookings', 'BOOKINGS'), path: '/admin/bookings' },
    { icon: CreditCard, label: t('sidebar.payments', 'PAYMENTS'), path: '/admin/payments' },
    { icon: Plane, label: t('sidebar.flights', 'FLIGHTS'), path: '/admin/flights' },
    { icon: Building, label: t('sidebar.hotels', 'HOTELS'), path: '/admin/hotels' },
    { icon: Car, label: t('sidebar.transport', 'TRANSPORT'), path: '/admin/transport' },
    { icon: Tent, label: t('sidebar.attractions', 'ATTRACTIONS'), path: '/admin/attractions' },
    { icon: Grid, label: t('sidebar.categories', 'CATEGORIES'), path: '/admin/categories' },
    { icon: Star, label: t('sidebar.reviews', 'REVIEWS'), path: '/admin/reviews' },
    { icon: MessageSquare, label: t('sidebar.chat', 'CHAT'), path: '/admin/chat' },
    { icon: BarChart3, label: t('sidebar.reports', 'REPORTS'), path: '/admin/reports' },
  ];

  return (
    <aside className={`fixed lg:relative z-50 min-h-screen bg-[#7C4A4A] text-white flex flex-col transition-all duration-300 ease-in-out shrink-0
      ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Logo */}
      <div className={`p-6 pb-8 flex justify-center items-center ${isCollapsed ? 'px-2' : ''}`}>
        <div className="text-center w-full flex items-center justify-between">
          {!isCollapsed && <img src="/logo_web.png" alt="HANU vivu Logo" className="h-10 w-auto object-contain" />}
          
          {/* Desktop Collapse Toggle */}
          <button 
            className="hidden lg:block p-1 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Close Button */}
          <button 
            className="lg:hidden p-1 text-white/70 hover:text-white absolute right-4 top-6"
            onClick={() => setIsMobileOpen(false)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto w-full px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path) || (item.path === '/admin/dashboard' && location.pathname === '/admin');
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-4'} py-3 rounded-lg transition-colors group relative ${
                    isActive 
                      ? 'bg-white/10 text-white font-medium' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-400 rounded-r-full"></div>
                  )}
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  {!isCollapsed && <span className="text-sm tracking-wide truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
    </aside>
  );
};

export default Sidebar;
