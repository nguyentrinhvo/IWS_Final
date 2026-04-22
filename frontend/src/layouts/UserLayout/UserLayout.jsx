import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import { useGlobal } from '../../context/GlobalContext';

const UserLayout = () => {
  const { t } = useGlobal();
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-cyan-500/30 flex flex-col">
      <Navbar /> 

      <main className="w-full">
        <Outlet />
      </main>

      <footer className="mt-auto py-8 border-t border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-[300px] text-center text-slate-500 text-sm">
          &copy; 2026 HANU vivu. {t('footerText')}.
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
