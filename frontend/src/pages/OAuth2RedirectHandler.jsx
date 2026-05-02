import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyProfile } from '../services/userService';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // Save token temporarily to make the getMyProfile call
            localStorage.setItem('token', token);
            
            // Fetch user profile
            getMyProfile()
                .then(user => {
                    // Log in the user with full data
                    login({ ...user, token });
                    navigate('/', { replace: true });
                })
                .catch(error => {
                    console.error('OAuth2 login error:', error);
                    localStorage.removeItem('token');
                    navigate('/', { replace: true });
                });
        } else {
            navigate('/', { replace: true });
        }
    }, [location, navigate, login]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );
};

export default OAuth2RedirectHandler;
