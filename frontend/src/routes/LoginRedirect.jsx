import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginRedirect = () => {
  const { setIsLoginModalOpen } = useAuth();

  useEffect(() => {
    setIsLoginModalOpen(true);
  }, [setIsLoginModalOpen]);

  return <Navigate to="/" replace />;
};

export default LoginRedirect;
