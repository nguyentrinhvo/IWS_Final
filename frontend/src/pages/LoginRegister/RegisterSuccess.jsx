// RegisterSuccess.jsx
import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';

export default function RegisterSuccess({ isOpen, onClose, onSwitchToLogin }) {
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

  const handleSwitchToLogin = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
      if (onSwitchToLogin) onSwitchToLogin();
    }, 300);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes modalFadeOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.95) translateY(10px); }
        }
        .animate-modal-in {
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-modal-out {
          animation: modalFadeOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
          onClick={handleClose}
        ></div>

        <div className={`relative w-full max-w-[440px] bg-white rounded-3xl p-8 sm:p-10 flex flex-col items-center shadow-2xl ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}>
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 mt-2">
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E43] mb-4 text-center">
            {t('registerSuccessTitle')}
          </h2>
          <p className="text-[#6B7280] text-center text-sm sm:text-base mb-8 leading-relaxed px-4">
            {t('registerSuccessDesc')}
          </p>

          <button 
            onClick={handleSwitchToLogin}
            className="w-full bg-gradient-to-r from-[#0B1E43] to-[#1E3A8A] text-white font-bold py-4 rounded-full shadow-xl shadow-blue-900/20 hover:opacity-90 transition-all cursor-pointer text-lg"
          >
            {t('backToLoginBtn')}
          </button>
        </div>
      </div>
    </>
  );
}
