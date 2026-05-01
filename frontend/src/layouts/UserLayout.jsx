import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 w-full bg-white">
        <Navbar />
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-[1320px] mx-auto px-4">
          <Outlet />
        </div>
      </main>

      <footer className="mt-auto pt-[150px] w-full">
        <Footer />
      </footer>
    </div>
  );
}