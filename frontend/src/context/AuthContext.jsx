import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * AuthContext — quản lý trạng thái xác thực toàn cục.
 * currentUser: object JWT đã decode { id, email, fullName, role, token, avatar }
 */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // ── Khởi tạo: đọc user từ storage ──────────────────────────
  useEffect(() => {
    const raw = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setCurrentUser(parsed);
      } catch {
        localStorage.removeItem('authUser');
        sessionStorage.removeItem('authUser');
      }
    }
    setAuthLoading(false);
  }, []);

  // ── Đăng nhập: lưu user + token ─────────────────────────────
  const login = useCallback((userData, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', userData.token);
    storage.setItem('authUser', JSON.stringify(userData));
    setCurrentUser(userData);
    setIsLoginModalOpen(false); // Close modal on success
  }, []);

  // ── Đăng xuất ───────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('authUser');
    setCurrentUser(null);
  }, []);

  // ── Cập nhật thông tin user (sau khi sửa profile) ───────────
  const updateUser = useCallback((updatedData) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updatedData };
      // Sync lại storage
      if (localStorage.getItem('authUser')) {
        localStorage.setItem('authUser', JSON.stringify(updated));
      } else {
        sessionStorage.setItem('authUser', JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  // ── Helpers ──────────────────────────────────────────────────
  const isAuthenticated = Boolean(currentUser);
  const isAdmin = currentUser?.role?.toUpperCase() === 'ADMIN';

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      authLoading,
      isAuthenticated,
      isAdmin,
      login,
      logout,
      updateUser,
      isLoginModalOpen,
      setIsLoginModalOpen,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
