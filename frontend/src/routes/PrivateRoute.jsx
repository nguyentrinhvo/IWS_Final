import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute — bảo vệ route, yêu cầu đăng nhập.
 * @param {string} requiredRole - nếu truyền vào, sẽ kiểm tra thêm role (ví dụ: 'ADMIN')
 */
export default function PrivateRoute({ children, requiredRole }) {
  const { isAuthenticated, currentUser, authLoading } = useAuth();
  const location = useLocation();

  // Đang khởi tạo auth state từ storage → hiển thị loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Chưa đăng nhập → redirect về trang chủ với state để có thể quay lại
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location, requireLogin: true }} replace />;
  }

  // Kiểm tra role nếu cần
  if (requiredRole && currentUser?.role?.toUpperCase() !== requiredRole.toUpperCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
