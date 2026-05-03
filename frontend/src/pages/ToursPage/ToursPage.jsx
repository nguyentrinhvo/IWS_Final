// src/pages/ToursPage/ToursPage.jsx
import React from 'react';
import Navbar from '../../layouts/UserLayout/Navbar';
import Footer from '../../layouts/UserLayout/Footer';
import ToursForYou from './ToursForYou';
import BestTourDeals from './BestTourDeals';
import ToursDestination from './ToursDestination';
import ToursSearchPage from './ToursSearchPage';

export default function ToursPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <Navbar />
      </div>
      <div className="flex-grow flex flex-col w-full ">
        <ToursSearchPage />
        <ToursForYou />
        <BestTourDeals />
        <ToursDestination />
      </div>
      <Footer />
    </div>
  );
}