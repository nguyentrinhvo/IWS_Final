import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Hook tiện lợi để truy cập AuthContext
 * Usage: const { user, isAuthenticated, loginCtx, logoutCtx } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);

export default useAuth;
