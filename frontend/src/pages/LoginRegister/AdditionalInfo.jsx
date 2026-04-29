import React, { useState, useEffect, useRef } from 'react';
import { useGlobal } from '../../context/GlobalContext';

export default function AdditionalInfo({ isOpen, onClose, onSkip }) {
  const { t } = useGlobal();
  const [isClosing, setIsClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);

  const dropdownRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setVisible(true);
      setDay('');
      setMonth('');
      setYear('');
      setGender('');
      setOpenDropdown(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleSkip = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
      if (onSkip) onSkip();
    }, 300);
  };

  const handleRegister = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
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

        <div className={`relative w-[512px] h-[732px] bg-white rounded-3xl p-8 flex flex-col shadow-2xl ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}>
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mt-2 mb-8">
            <h2 className="text-3xl font-bold text-[#0B1E43] mb-3">{t('additionalInfoTitle')}</h2>
            <p className="text-[#6B7280] text-sm leading-relaxed pr-4">
              {t('additionalInfoSubtitle')}
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div>
              <label className="block text-[#0B1E43] font-bold mb-3">{t('birthdate')}</label>
              <div className="flex gap-3" ref={dropdownRef}>
                <div className="relative flex-1">
                  <div onClick={() => toggleDropdown('day')} className="w-full bg-[#F4F7FF] rounded-2xl py-4 px-5 flex justify-between items-center cursor-pointer">
                    <span className={day ? "text-[#0B1E43] font-medium" : "text-gray-400"}>{day || t('day')}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === 'day' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  {openDropdown === 'day' && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 shadow-xl rounded-xl max-h-[220px] overflow-y-auto z-50">
                      {days.map(d => (
                        <div key={d} onClick={() => { setDay(d); setOpenDropdown(null); }} className="py-3 px-5 hover:bg-gray-50 cursor-pointer text-[#0B1E43] font-medium transition-colors">
                          {d}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative flex-1">
                  <div onClick={() => toggleDropdown('month')} className="w-full bg-[#F4F7FF] rounded-2xl py-4 px-5 flex justify-between items-center cursor-pointer">
                    <span className={month ? "text-[#0B1E43] font-medium" : "text-gray-400"}>{month || t('month')}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === 'month' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  {openDropdown === 'month' && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 shadow-xl rounded-xl max-h-[220px] overflow-y-auto z-50">
                      {months.map(m => (
                        <div key={m} onClick={() => { setMonth(m); setOpenDropdown(null); }} className="py-3 px-5 hover:bg-gray-50 cursor-pointer text-[#0B1E43] font-medium transition-colors">
                          {m}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative flex-1">
                  <div onClick={() => toggleDropdown('year')} className="w-full bg-[#F4F7FF] rounded-2xl py-4 px-5 flex justify-between items-center cursor-pointer">
                    <span className={year ? "text-[#0B1E43] font-medium" : "text-gray-400"}>{year || t('year')}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === 'year' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  {openDropdown === 'year' && (
                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 shadow-xl rounded-xl max-h-[220px] overflow-y-auto z-50">
                      {years.map(y => (
                        <div key={y} onClick={() => { setYear(y); setOpenDropdown(null); }} className="py-3 px-5 hover:bg-gray-50 cursor-pointer text-[#0B1E43] font-medium transition-colors">
                          {y}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-[#6B7280] mt-4 leading-relaxed p-4 bg-[#F4F7FF] rounded-xl border border-blue-50/50">
                {t('birthdateNotice')}
              </p>
            </div>

            <div>
              <label className="block text-[#0B1E43] font-bold mb-3">{t('genderOptional')}</label>
              <div className="flex gap-4">
                <button 
                  onClick={() => setGender('male')} 
                  className={`flex-1 py-4 rounded-2xl flex justify-center items-center gap-2 font-bold transition-all border-2 cursor-pointer ${gender === 'male' ? 'border-[#F57323] text-[#F57323] bg-orange-50/50' : 'border-transparent bg-[#F4F7FF] text-[#6B7280] hover:bg-gray-100'}`}
                >
                  {t('male')}
                </button>
                <button 
                  onClick={() => setGender('female')} 
                  className={`flex-1 py-4 rounded-2xl flex justify-center items-center gap-2 font-bold transition-all border-2 cursor-pointer ${gender === 'female' ? 'border-[#F57323] text-[#F57323] bg-orange-50/50' : 'border-transparent bg-[#F4F7FF] text-[#6B7280] hover:bg-gray-100'}`}
                >
                  {t('female')}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <button 
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-[#9F4200] to-[#F57323] text-white font-bold py-4 rounded-full shadow-lg shadow-orange-500/20 hover:opacity-90 transition-all cursor-pointer text-lg mb-4"
            >
              {t('registerBtn')}
            </button>
            <button 
              onClick={handleSkip}
              className="w-full text-center py-2 text-[#6B7280] font-medium hover:text-[#0B1E43] transition-colors cursor-pointer"
            >
              {t('skipStep')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}