// RegisterOtp.jsx
import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';

export default function RegisterOtp({ isOpen, onClose, onBackToRegister, onSwitchToAdditionalInfo }) {
  const { t } = useGlobal();
  const [isClosing, setIsClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setVisible(true);
      setOtp(['', '', '', '', '', '']);
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

  const handleBackToRegister = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
      if (onBackToRegister) onBackToRegister();
    }, 300);
  };

  const handleSwitchToAdditionalInfo = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
      if (onSwitchToAdditionalInfo) onSwitchToAdditionalInfo();
    }, 300);
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
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

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
          onClick={handleClose}
        ></div>

        <div className={`relative w-full max-w-[480px] max-h-[calc(100vh-2rem)] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-2xl ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}>
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4 sm:mb-6 mt-2">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#F57323]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1E43] mb-2 sm:mb-3 text-center">{t('verifyAccount')}</h2>
          <p className="text-[#6B7280] text-center text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
            {t('verifySentDesc')}
          </p>

          <div className="w-full">
            <div className="flex justify-center gap-2 sm:justify-between sm:gap-3 mb-6 sm:mb-8">
              {otp.map((data, index) => {
                return (
                  <input
                    className="w-10 h-10 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold text-[#0B1E43] bg-[#F4F7FF] rounded-lg sm:rounded-2xl border border-transparent focus:border-[#F57323] focus:ring-2 focus:ring-[#F57323]/20 focus:bg-white outline-none transition-all"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onFocus={e => e.target.select()}
                  />
                );
              })}
            </div>

            <button 
              onClick={handleSwitchToAdditionalInfo}
              className="w-full bg-gradient-to-r from-[#9F4200] to-[#F57323] text-white font-bold py-3.5 sm:py-4 rounded-full shadow-lg shadow-orange-500/20 hover:opacity-90 transition-all cursor-pointer text-base sm:text-lg mb-6 sm:mb-8"
            >
              {t('verifyBtn')}
            </button>

            <div className="text-center text-xs sm:text-sm mb-4 sm:mb-6">
              <span className="text-[#6B7280] font-medium">{t('didNotReceive')} </span>
              <button className="font-bold text-[#0095FF] hover:underline cursor-pointer bg-transparent border-none">
                {t('resendCode')}
              </button>
            </div>

            <button 
              onClick={handleBackToRegister}
              className="flex items-center justify-center space-x-2 text-[#9F4200] font-bold hover:underline cursor-pointer mt-2 sm:mt-4 text-sm sm:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
