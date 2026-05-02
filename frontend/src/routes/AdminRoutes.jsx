import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import CreateTour from '../pages/admin/Tours/CreateTour';
import UpdateTour from '../pages/admin/Tours/UpdateTour';
import UserManagement from '../pages/admin/Users/UserManagement';
import TourManagement from '../pages/admin/Tours/TourManagement';
import PaymentManagement from '../pages/admin/Payments/PaymentManagement';
import FlightManagement from '../pages/admin/Flights/FlightManagement';
import HotelManagement from '../pages/admin/Hotels/HotelManagement';
import AttractionsManagement from '../pages/admin/Attractions/AttractionsManagement';
import CategoriesManagement from '../pages/admin/Categories/CategoriesManagement';
import ReviewsManagement from '../pages/admin/Reviews/ReviewsManagement';
import ChatManagement from '../pages/admin/Chat/ChatManagement';
import BookingManagement from '../pages/admin/Bookings/BookingManagement';
import TransportManagement from '../pages/admin/transport/TransportManagement';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="tours" element={<TourManagement />} />
        <Route path="tours/create" element={<CreateTour />} />
        <Route path="tours/edit/:id" element={<UpdateTour />} />
        <Route path="payments" element={<PaymentManagement />} />
        <Route path="flights" element={<FlightManagement />} />
        <Route path="hotels" element={<HotelManagement />} />
        <Route path="attractions" element={<AttractionsManagement />} />
        <Route path="categories" element={<CategoriesManagement />} />
        <Route path="reviews" element={<ReviewsManagement />} />
        <Route path="chat" element={<ChatManagement />} />
        <Route path="bookings" element={<BookingManagement />} />
        <Route path="transport" element={<TransportManagement />} />
        {/* If hitting /admin, redirect to /admin/dashboard */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
