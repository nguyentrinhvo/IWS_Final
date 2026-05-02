import React, { useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext';

export default function OtpVerification({ isOpen, onClose, onBackToLogin }) {
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

  const handleBackToLogin = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
      if (onBackToLogin) onBackToLogin();
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          animation: `${isClosing ? 'backdropOut' : 'backdropIn'} 0.3s ease-out forwards`
        }}
        onClick={handleClose}
      >
        <div 
          className="bg-white rounded-3xl w-[512px] h-[722px] overflow-hidden shadow-2xl relative flex flex-col justify-center px-10"
          style={{
            animation: `${isClosing ? 'modalOut' : 'modalIn'} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards`
          }}
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 cursor-pointer"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col items-center w-full">
            <div className="w-24 h-24 bg-[#F4F7FF] rounded-full flex items-center justify-center mb-8">
              <svg className="w-10 h-10 text-[#0095FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h2 className="text-[32px] font-bold text-[#0B1E43] mb-4">{t('verifyAccount')}</h2>
            <p className="text-[#6B7280] text-center text-sm font-medium leading-relaxed mb-10 w-[90%]">
              {t('verifySentDesc')}
            </p>

            <div className="flex justify-between w-full mb-10">
              {otp.map((data, index) => {
                return (
                  <input
                    className="w-14 h-14 bg-[#F4F7FF] rounded-xl text-center text-2xl font-bold text-[#0B1E43] outline-none focus:ring-2 focus:ring-[#F57323]/50 transition-all border border-transparent focus:border-[#F57323]"
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

            <button className="w-full bg-gradient-to-r from-[#9F4200] to-[#F57323] text-white font-bold py-4 rounded-full shadow-lg shadow-orange-500/20 hover:opacity-90 transition-all cursor-pointer text-lg mb-8">
              {t('verifyBtn')}
            </button>

            <div className="text-center text-sm mb-6">
              <span className="text-[#6B7280] font-medium">{t('didNotReceive')} </span>
              <button className="font-bold text-[#0095FF] hover:underline cursor-pointer bg-transparent border-none">
                {t('resendCode')}
              </button>
            </div>

            <button 
              onClick={handleBackToLogin}
              className="flex items-center justify-center space-x-2 text-[#9F4200] font-bold hover:underline cursor-pointer mt-4"
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