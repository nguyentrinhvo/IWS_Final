import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useGlobal } from '../context/GlobalContext';

export default function UserLayout() {
  const { t } = useGlobal();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-cyan-500/30 flex flex-col">
      <Navbar /> 

      <main className="w-full flex-1">
        <div className="max-w-[1320px] w-full mx-auto px-4">
          <Outlet />
        </div>
      </main>

      <footer className="mt-auto py-8 border-t border-gray-200 w-full">
        <div className="max-w-[1320px] w-full mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; 2026 HANU vivu. {t('footerText')}.
        </div>
      </footer>
    </div>
  );
}