// ForgotPassword.jsx
import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';

export default function ForgotPassword({ isOpen, onClose, onBackToLogin, onSwitchToOtp }) {
  const { t } = useGlobal();
  const [isClosing, setIsClosing] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setVisible(true);
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

  const handleBackToLogin = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
      if (onBackToLogin) onBackToLogin();
    }, 300);
  };

  const handleSwitchToOtp = (e) => {
    e.preventDefault();
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
      if (onSwitchToOtp) onSwitchToOtp();
    }, 300);
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
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes modalOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.95) translateY(10px); }
        }
      `}</style>

      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          animation: `${isClosing ? 'backdropOut' : 'backdropIn'} 0.3s ease-out forwards`
        }}
        onClick={handleClose}
      >
        <div 
          className="bg-white rounded-3xl w-full max-w-[480px] max-h-[calc(100vh-2rem)] overflow-y-auto shadow-2xl relative"
          style={{
            animation: `${isClosing ? 'modalOut' : 'modalIn'} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards`
          }}
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 cursor-pointer"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6 sm:p-10">
            <h2 className="text-2xl sm:text-[32px] font-bold text-[#0B1E43] mb-2 pr-8">Forgot password?</h2>
            <p className="text-[#6B7280] text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              Enter your email or phone number and we'll send you a link to reset your password.
            </p>

            <div className="mb-6">
              <label className="block text-[#0B1E43] text-sm font-bold mb-2 ml-1">
                Email or Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="youremail.com or 09xxxxxxxx"
                  className="w-full bg-[#F4F7FF] rounded-2xl py-3.5 sm:py-4 px-5 sm:px-6 text-sm outline-none focus:ring-2 focus:ring-[#F57323]/50 transition-all text-[#0B1E43]"
                />
                <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-gray-400">
                  <span className="text-xl font-medium">@</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSwitchToOtp}
              className="w-full bg-[#E67E22] text-white font-bold py-3.5 sm:py-4 rounded-full shadow-lg shadow-orange-500/20 hover:bg-[#D35400] transition-all cursor-pointer text-base sm:text-lg mt-2"
            >
              Continue
            </button>

            <button 
              onClick={handleBackToLogin}
              className="flex items-center justify-center space-x-2 text-[#9F4200] font-bold hover:underline cursor-pointer mt-4 mx-auto text-sm sm:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t('backToLogin')}</span>
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
