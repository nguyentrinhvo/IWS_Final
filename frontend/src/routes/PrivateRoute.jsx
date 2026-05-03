import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute — bảo vệ route, yêu cầu đăng nhập.
 * Khi chưa đăng nhập: mở modal login ngay tại trang hiện tại (không redirect).
 * @param {string} requiredRole - nếu truyền vào, sẽ kiểm tra thêm role (ví dụ: 'ADMIN')
 */
export default function PrivateRoute({ children, requiredRole }) {
  const { isAuthenticated, currentUser, authLoading, setIsLoginModalOpen } = useAuth();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPrompt setIsLoginModalOpen={setIsLoginModalOpen} />;
  }

  if (requiredRole && currentUser?.role?.toUpperCase() !== requiredRole.toUpperCase()) {
    return <LoginPrompt setIsLoginModalOpen={setIsLoginModalOpen} />;
  }

  return children;
}

function LoginPrompt({ setIsLoginModalOpen }) {
  useEffect(() => {
    setIsLoginModalOpen(true);
  }, [setIsLoginModalOpen]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
        <svg className="w-10 h-10 text-[#007BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Yêu cầu đăng nhập</h2>
        <p className="text-gray-500 text-sm">Vui lòng đăng nhập để tiếp tục sử dụng tính năng này.</p>
      </div>
      <button
        onClick={() => setIsLoginModalOpen(true)}
        className="bg-[#007BFF] hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-xl transition-all"
      >
        Đăng nhập ngay
      </button>
    </div>
  );
}
