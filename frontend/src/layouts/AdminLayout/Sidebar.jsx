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
  CreditCard
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
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
    <aside className="w-64 min-h-screen bg-[#7C4A4A] text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 pb-8 flex justify-center items-center">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
             {/* Logo graphic */}
             <img src="/logo_web.png" alt="HANU vivu Logo" className="h-10 w-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto w-full px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path) || (item.path === '/admin/dashboard' && location.pathname === '/admin');
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group relative ${
                    isActive 
                      ? 'bg-white/10 text-white font-medium' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-400 rounded-r-full"></div>
                  )}
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                  <span className="text-sm tracking-wide">{item.label}</span>
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
