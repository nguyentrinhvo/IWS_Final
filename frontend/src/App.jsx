import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserLayout from './layouts/UserLayout';
import HomePage from './pages/HomePage/HomePage';
import { useGlobal } from './context/GlobalContext';
import ToursPage from './pages/ToursPage/ToursPage';
import UserAccount from './pages/PersonalProfile/UserAccount';
import Tour from './pages/ToursDetailPage/Tour';
import ToursBooking from './pages/ToursBookingPage/ToursBooking';
import TourPayments from './pages/TourPayments/TourPayments';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useGlobal();

  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="tours" element={<ToursPage />} />  
        <Route path="/tour/:id" element={<Tour />} />
        <Route path="/tours-booking" element={<ToursBooking />} />
        <Route path="/payment" element={<TourPayments />} />
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profile/:tab" element={<UserAccount />} />
        </Route>
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;