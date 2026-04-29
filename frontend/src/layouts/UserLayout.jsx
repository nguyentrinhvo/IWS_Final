import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function UserLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 w-full bg-white">
        <Navbar />
      </header>

      <main className="flex-1 w-full mb-[150px]">
        <Outlet />
      </main>

      <footer className="mt-auto w-full">
        <Footer />
      </footer>
    </div>
  );
}