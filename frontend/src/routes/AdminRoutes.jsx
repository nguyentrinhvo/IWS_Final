import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import CreateTour from '../pages/admin/Tours/CreateTour';
import UpdateTour from '../pages/admin/Tours/UpdateTour';
import UserManagement from '../pages/admin/Users/UserManagement';
import TourManagement from '../pages/admin/Tours/TourManagement';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="tours" element={<TourManagement />} />
        <Route path="tours/create" element={<CreateTour />} />
        <Route path="tours/edit/:id" element={<UpdateTour />} />
        {/* If hitting /admin, redirect to /admin/dashboard */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
