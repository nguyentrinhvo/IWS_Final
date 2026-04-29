import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { mockData } from '../../data/mockData';

export default function Login({ isOpen, onClose, onSwitchToRegister, onSwitchToForgotPassword, onLoginSuccess }) {
  const { t } = useGlobal();
  const [showPassword, setShowPassword] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setVisible(true);
      setEmail('');
      setPassword('');
      setLoginError('');
      setRememberMe(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleSwitchToRegister = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onSwitchToRegister();
    }, 300);
  };

  const handleSwitchToForgotPassword = (e) => {
    e.preventDefault();
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onSwitchToForgotPassword();
    }, 300);
  };

  const handleLogin = () => {
    const user = mockData.users.find(
      (u) => (u.email === email || u.phone === email) && u.password === password
    );
    if (user) {
      setLoginError('');
      if (rememberMe) {
        localStorage.setItem('authUser', JSON.stringify(user));
      } else {
        sessionStorage.setItem('authUser', JSON.stringify(user));
      }
      if (onLoginSuccess) onLoginSuccess(user);
      setIsClosing(true);
      setTimeout(() => {
        setVisible(false);
        setIsClosing(false);
        onClose();
      }, 300);
    } else {
      setLoginError(t('loginError'));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes backdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes backdropOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.85) translateY(24px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes modalOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.85) translateY(24px); }
        }
        .backdrop-in { animation: backdropIn 0.3s ease forwards; }
        .backdrop-out { animation: backdropOut 0.3s ease forwards; }
        .modal-in { animation: modalIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .modal-out { animation: modalOut 0.3s ease forwards; }
      `}</style>

      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm ${isClosing ? 'backdrop-out' : 'backdrop-in'}`}
        onClick={handleClose}
      >
        <div
          className={`w-[448px] h-[737px] bg-white rounded-3xl relative flex flex-col px-8 py-10 shadow-2xl ${isClosing ? 'modal-out' : 'modal-in'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mt-6">
            <h2 className="text-[28px] font-extrabold text-[#0B1E43] tracking-tight">{t('welcomeBack')}</h2>
            <div className="mt-2 text-[#6B7280] text-[15px] leading-relaxed">
              <p>{t('loginSubtitle1')}</p>
              <p>{t('loginSubtitle2')}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col space-y-5 flex-1">
            <div>
              <label className="block text-[#0B1E43] text-sm font-bold mb-2">
                {t('emailOrMobile')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <span className="font-semibold text-lg">@</span>
                </div>
                <input
                  type="text"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-[#F4F7FF] rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#F57323]/50 transition-all text-[#0B1E43]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#0B1E43] text-sm font-bold mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="........"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-[#F4F7FF] rounded-xl py-3.5 pl-12 pr-12 text-sm outline-none focus:ring-2 focus:ring-[#F57323]/50 transition-all text-[#0B1E43]"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {loginError && (
              <p className="text-red-500 text-sm font-medium -mt-2">{loginError}</p>
            )}

            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#F57323] focus:ring-[#F57323]" 
                />
                <span className="text-sm text-gray-600 font-medium">{t('rememberMe')}</span>
              </label>
              <button
                onClick={handleSwitchToForgotPassword}
                className="text-sm font-bold text-[#D05615] hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                {t('forgotPassword')}
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-[#9F4200] to-[#F57323] text-white font-bold py-4 rounded-full mt-4 shadow-lg shadow-orange-500/30 hover:opacity-90 transition-opacity cursor-pointer"
            >
              {t('loginBtn')}
            </button>

            <div className="flex items-center space-x-3 my-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-[#A0AEC0] text-xs font-bold tracking-wider">{t('orLoginWith')}</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex-1 border border-gray-200 rounded-full py-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors cursor-pointer">
                <img src="/Logo/google.svg" alt="Google" className="w-5 h-5" />
                <span className="font-bold text-[#0B1E43] text-sm">Google</span>
              </button>
              <button className="flex-1 bg-[#1877F2] rounded-full py-3 flex items-center justify-center space-x-2 hover:bg-[#166FE5] transition-colors cursor-pointer">
                <img src="/Logo/facebook.svg" alt="Facebook" className="w-5 h-5" />
                <span className="font-bold text-white text-sm">Facebook</span>
              </button>
            </div>

            <div className="mt-8 text-center text-sm">
              <span className="text-[#6B7280] font-medium">{t('notMember')} </span>
              <button onClick={handleSwitchToRegister} className="font-bold text-[#D05615] hover:underline cursor-pointer bg-transparent border-none p-0">
                {t('registerNow')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}