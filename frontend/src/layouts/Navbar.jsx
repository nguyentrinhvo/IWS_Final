import React, { useState, useRef, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import OtpVerification from '../pages/OtpVerification';
import RegisterOtp from '../pages/RegisterOtp';
import AdditionalInfo from '../pages/AdditionalInfo';

const formatDisplayName = (fullName) => {
  if (!fullName) return '';
  const withoutD = fullName.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  const normalized = withoutD.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const words = normalized.trim().split(/\s+/);
  return words.slice(-2).join(' ');
};

export default function Navbar() {
  const { currency, language, t, currentUser, setCurrentUser } = useGlobal();
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isRegisterOtpOpen, setIsRegisterOtpOpen] = useState(false);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUserMenuClosing, setIsUserMenuClosing] = useState(false);

  const [tempCurrency, setTempCurrency] = useState(currency);
  const [tempLanguage, setTempLanguage] = useState(language);

  const supportRef = useRef(null);
  const langRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
    if (savedUser && !currentUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, [currentUser, setCurrentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (supportRef.current && !supportRef.current.contains(event.target)) {
        setIsSupportOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
        setTempCurrency(currency);
        setTempLanguage(language);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        if (isUserMenuOpen && !isUserMenuClosing) {
          closeUserMenu();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [currency, language, isUserMenuOpen, isUserMenuClosing]);

  const closeUserMenu = () => {
    setIsUserMenuClosing(true);
    setTimeout(() => {
      setIsUserMenuOpen(false);
      setIsUserMenuClosing(false);
    }, 300);
  };

  const toggleUserMenu = () => {
    if (isUserMenuOpen && !isUserMenuClosing) {
      closeUserMenu();
    } else if (!isUserMenuOpen) {
      setIsUserMenuOpen(true);
    }
  };

  const handleCurrencyChange = (newCurr) => {
    setTempCurrency(newCurr);
    if (newCurr === 'USD') {
      setTempLanguage('EN');
    }
  };

  const handleDone = () => {
    localStorage.setItem('currency', tempCurrency);
    localStorage.setItem('language', tempLanguage);
    window.location.reload();
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsLoginOpen(false);
  };

  const handleRegisterSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('authUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authUser');
    sessionStorage.removeItem('authUser');
    setIsUserMenuOpen(false);
    setIsUserMenuClosing(false);
  };

  const userMenuItems = [
    {
      key: 'editProfile',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    },
    {
      key: 'myCards',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
        </svg>
      )
    },
    {
      key: 'transactionHistory',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      )
    },
    {
      key: 'myBookings',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5v11.25a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V7.5m18 0A2.25 2.25 0 0 0 18.75 5.25h-15A2.25 2.25 0 0 0 1.5 7.5m18 0h-18" />
        </svg>
      )
    },
    {
      key: 'promotions',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      )
    },
  ];

  return (
    <>
      <style>{`
        @keyframes dropDownScale {
          0% { opacity: 0; transform: scaleY(0); }
          100% { opacity: 1; transform: scaleY(1); }
        }
        @keyframes dropDownScaleOut {
          0% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(0); }
        }
        .animate-dropdown {
          transform-origin: top center;
          animation: dropDownScale 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-dropdown-out {
          transform-origin: top center;
          animation: dropDownScaleOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div className="w-full flex flex-col bg-[#7C4A4A] relative z-50">
        <nav className="w-full h-[80px] border-b border-white/20 flex justify-center">
          <div className="w-full max-w-[1920px] px-4 lg:px-[300px] flex items-center justify-between h-full">
            <div className="flex-shrink-0 cursor-pointer h-full flex items-center">
              <img src="/logo_web.png" alt="Logo" className="max-h-[60px] w-auto object-contain" />
            </div>

            <ul className={`hidden md:flex flex-1 justify-center items-center text-white font-medium text-[19px] ${language === 'EN' ? 'space-x-10' : 'space-x-5'}`}>
              <li className="cursor-pointer px-4 py-2 rounded-lg hover:bg-black/20 transition-all">{t('tours')}</li>
              <li className="cursor-pointer px-4 py-2 rounded-lg hover:bg-black/20 transition-all">{t('hotels')}</li>
              <li className="cursor-pointer px-4 py-2 rounded-lg hover:bg-black/20 transition-all">{t('flights')}</li>
              <li className="cursor-pointer px-4 py-2 rounded-lg hover:bg-black/20 transition-all">{t('carsTrains')}</li>
              <li className="cursor-pointer px-4 py-2 rounded-lg hover:bg-black/20 transition-all">{t('thingsToDo')}</li>
            </ul>

            <div className="hidden md:flex flex-shrink-0 items-center space-x-4">
              {currentUser ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-black/20 transition-all cursor-pointer"
                  >
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.fullName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/40 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#F57323] flex items-center justify-center border-2 border-white/40 flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {formatDisplayName(currentUser.fullName).charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="text-white font-medium text-[19px]">
                      {formatDisplayName(currentUser.fullName)}
                    </span>
                    <svg
                      className={`w-5 h-5 text-white/80 transition-transform duration-200 ${(isUserMenuOpen && !isUserMenuClosing) ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {(isUserMenuOpen || isUserMenuClosing) && (
                    <div className={`absolute top-full right-0 mt-3 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-[200] overflow-hidden flex flex-col ${isUserMenuClosing ? 'animate-dropdown-out' : 'animate-dropdown'}`}>
                      <div className="px-6 py-5 border-b border-gray-100 mb-2">
                        <p className="text-sm text-gray-400 font-medium">{t('loggedInAs')}</p>
                        <p className="text-lg font-bold text-[#0B1E43] truncate mt-1">{currentUser.email}</p>
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        {userMenuItems.map((item) => (
                          <button
                            key={item.key}
                            className="w-full flex items-center space-x-4 px-6 py-4 hover:bg-orange-50 transition-colors cursor-pointer text-left"
                          >
                            <div className="text-[#F57323] flex-shrink-0">
                              {item.icon}
                            </div>
                            <span className="text-[#0B1E43] font-medium text-[17px]">{t(item.key)}</span>
                          </button>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-4 px-6 py-4 hover:bg-red-50 transition-colors cursor-pointer text-left"
                        >
                          <div className="text-red-500 flex-shrink-0">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>
                          </div>
                          <span className="text-red-500 font-medium text-[17px]">{t('logout')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center space-x-2 bg-[#FADCD9] text-indigo-800 px-6 py-2.5 rounded-full font-semibold hover:bg-pink-100 transition-colors cursor-pointer"
                  >
                    <span>{t('logIn')}</span>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.75 12L4 12M7.75072 8L11.748 11.9999L7.75072 16M9.75 5.76562V4.25C9.75 3.42157 10.4216 2.75 11.25 2.75H17.25C18.0784 2.75 18.75 3.42157 18.75 4.25V19.75C18.75 20.5784 18.0784 21.25 17.25 21.25H11.25C10.4216 21.25 9.75 20.5784 9.75 19.75V18.2383" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="bg-[#7978E9] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-500/20 cursor-pointer"
                  >
                    {t('register')}
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        <nav className="hidden md:flex w-full h-[40px] justify-center">
          <div className="w-full max-w-[1920px] px-4 lg:px-[300px] flex items-center justify-end h-full">
            <ul className="flex items-center space-x-4 text-white text-sm">
              <li className="cursor-pointer px-3 py-1.5 rounded-lg hover:bg-black/20 transition-all">{t('partnership')}</li>
              <li className="relative" ref={supportRef}>
                <button onClick={() => setIsSupportOpen(!isSupportOpen)} className="flex items-center space-x-1 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-black/20 transition-all">
                  <span>{t('support')}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isSupportOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors font-medium">{t('helpCenter')}</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors font-medium">{t('contactUs')}</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors font-medium">{t('myInbox')}</button>
                  </div>
                )}
              </li>
              <li className="cursor-pointer px-3 py-1.5 rounded-lg hover:bg-black/20 transition-all">{t('myBookings')}</li>
              <li className="relative" ref={langRef}>
                <button
                  onClick={() => {
                    setIsLangOpen(!isLangOpen);
                    setTempCurrency(currency);
                    setTempLanguage(language);
                  }}
                  className="flex items-center space-x-2 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-black/20 transition-all"
                >
                  {currency === 'VND' ? (
                    <span className="text-lg leading-none rounded-sm bg-red-500 text-yellow-300 px-1 border border-white/30">★</span>
                  ) : (
                    <span className="flex items-center justify-center rounded-sm bg-blue-600 text-white px-1 py-[3.5px] border border-white/30">
                      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.00312 12.1255C2.07025 17.59 6.52083 22.0001 12.0014 22.0001C17.5238 22.0001 22.0005 17.5224 22.0005 12.0002C22.0005 6.49245 17.5473 2.02384 12.0449 2.00038C12.0304 2.00013 12.0158 2 12.0012 2C11.9866 2 11.972 2.00013 11.9574 2.00038C6.49755 2.02389 2.07089 6.42415 2.00314 11.8733C2.00106 11.9151 2 11.9572 2 11.9996C2 12.0418 2.00105 12.0838 2.00312 12.1255ZM8.97906 8.97712C8.83291 9.91428 8.75196 10.9319 8.75196 11.9996C8.75196 13.0674 8.83291 14.0849 8.97906 15.0221C9.91569 15.168 10.9326 15.2489 11.9996 15.2489C13.0679 15.2489 14.086 15.1678 15.0235 15.0216C15.1696 14.0845 15.2505 13.0671 15.2505 11.9996C15.2505 10.932 15.1696 9.91466 15.0235 8.97764C14.086 8.83136 13.0679 8.75032 11.9996 8.75032C10.9326 8.75032 9.91568 8.83117 8.97906 8.97712ZM7.419 9.29819C7.30981 10.1594 7.25196 11.0661 7.25196 11.9996C7.25196 12.9331 7.30981 13.8398 7.419 14.701C6.8082 14.5418 6.25021 14.3524 5.75696 14.1391C4.976 13.8015 4.39155 13.4187 4.01306 13.0318C3.66763 12.6787 3.52335 12.3559 3.50265 12.072C3.50245 12.0481 3.50235 12.0242 3.50235 12.0002C3.50235 11.9758 3.50245 11.9514 3.50266 11.927C3.5234 11.6432 3.66769 11.3204 4.01306 10.9674C4.39155 10.5805 4.976 10.1978 5.75696 9.86009C6.25021 9.64683 6.8082 9.45746 7.419 9.29819ZM9.30032 7.4171C10.1609 7.30808 11.0669 7.25032 11.9996 7.25032C12.9336 7.25032 13.8407 7.30824 14.7023 7.41753C14.5431 6.8073 14.3538 6.24981 14.1407 5.75696C13.8031 4.976 13.4203 4.39155 13.0335 4.01306C12.6606 3.64825 12.3214 3.5078 12.0263 3.50032L12.0014 3.50028L11.9761 3.50032C11.6811 3.50781 11.3419 3.64827 10.969 4.01306C10.5821 4.39155 10.1994 4.976 9.86173 5.75696C9.64869 6.24969 9.45948 6.80704 9.30032 7.4171ZM16.5836 9.29907C16.6927 10.16 16.7505 11.0664 16.7505 11.9996C16.7505 12.9328 16.6927 13.8392 16.5836 14.7001C17.1931 14.5411 17.7499 14.352 18.2422 14.1391C19.0232 13.8015 19.6077 13.4187 19.9862 13.0318C20.3613 12.6483 20.4992 12.3005 20.4992 11.9996C20.4992 11.6987 20.3613 11.3509 19.9862 10.9674C19.6077 10.5805 19.0232 10.1978 18.2422 9.86009C17.7499 9.64723 17.1931 9.45816 16.5836 9.29907ZM14.7023 16.5817C13.8407 16.691 12.9336 16.7489 11.9996 16.7489C11.0669 16.7489 10.1609 16.6911 9.30032 16.5821C9.45948 17.1922 9.64869 17.7495 9.86173 18.2422C10.1994 19.0232 10.5821 19.6077 10.969 19.9862C11.3525 20.3613 11.7003 20.4992 12.0012 20.4992C12.3021 20.4992 12.65 20.3613 13.0335 19.9861C13.4203 19.6077 13.8031 19.0232 14.1407 18.2422C14.3538 17.7494 14.5431 17.1919 14.7023 16.5817ZM7.69311 16.3082C6.76016 16.1055 5.90633 15.8379 5.16168 15.5159C4.75227 15.3389 4.36866 15.1424 4.01951 14.9265C4.87777 17.2671 6.73603 19.1253 9.07661 19.9833C8.85983 19.6332 8.66253 19.2484 8.48491 18.8375C8.16319 18.0934 7.89575 17.2403 7.69311 16.3082ZM16.3095 16.3074C17.2411 16.1048 18.0938 15.8375 18.8375 15.5159C19.2488 15.3381 19.634 15.1406 19.9844 14.9236C19.1265 17.2657 17.2675 19.1252 14.9258 19.9835C15.1426 19.6333 15.3399 19.2484 15.5176 18.8375C15.8394 18.0932 16.1069 17.2399 16.3095 16.3074ZM19.9838 9.07529C19.6336 8.85838 19.2485 8.66098 18.8375 8.48327C18.0938 8.16171 17.2411 7.89437 16.3095 7.69177C16.1069 6.75934 15.8394 5.90596 15.5176 5.16168C15.3402 4.75137 15.1431 4.36698 14.9267 4.01722C17.2675 4.87548 19.1258 6.7342 19.9838 9.07529ZM7.69311 7.69102C6.76016 7.89372 5.90632 8.16132 5.16168 8.48327C4.75248 8.66019 4.36906 8.85663 4.02005 9.0724C4.87844 6.73282 6.73604 4.87536 9.0757 4.01737C8.85927 4.3671 8.66228 4.75144 8.48491 5.16168C8.16319 5.90577 7.89575 6.75888 7.69311 7.69102Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
                      </svg>
                    </span>
                  )}
                  <span>{currency} | {language}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-2 w-[550px] bg-white text-gray-800 rounded-xl shadow-2xl p-6 z-50 border border-gray-100 flex">
                    <div className="flex-1 border-r border-gray-200 pr-6">
                      <h3 className="font-bold text-gray-900 mb-4 text-base">{t('selectCurrency')}</h3>
                      <div className="space-y-1">
                        <button
                          onClick={() => handleCurrencyChange('VND')}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${tempCurrency === 'VND' ? 'bg-gray-100 border border-gray-200' : 'hover:bg-gray-50'}`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded">VND</span>
                            <span className="text-sm">{t('vietnameseDong')}</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleCurrencyChange('USD')}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${tempCurrency === 'USD' ? 'bg-gray-100 border border-gray-200' : 'hover:bg-gray-50'}`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded">USD</span>
                            <span className="text-sm">{t('usDollar')}</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="flex-[0.8] pl-6 flex flex-col">
                      <h3 className="font-bold text-gray-900 mb-4 text-base">{t('selectLanguage')}</h3>
                      <div className="space-y-1 flex-1">
                        {tempCurrency === 'VND' && (
                          <button
                            onClick={() => setTempLanguage('VI')}
                            className={`w-full text-left px-3 py-2 rounded-lg transition ${tempLanguage === 'VI' ? 'bg-green-50/50 text-green-700 font-medium border border-green-200' : 'hover:bg-gray-100'}`}
                          >
                            Tiếng Việt
                          </button>
                        )}
                        <button
                          onClick={() => setTempLanguage('EN')}
                          className={`w-full text-left px-3 py-2 rounded-lg transition ${tempLanguage === 'EN' ? 'bg-green-50/50 text-green-700 font-medium border border-green-200' : 'hover:bg-gray-100'}`}
                        >
                          English
                        </button>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button onClick={handleDone} className="bg-[#0095FF] hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium text-sm transition-colors">
                          {t('done')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
        onSwitchToForgotPassword={() => { setIsLoginOpen(false); setIsForgotPasswordOpen(true); }}
        onLoginSuccess={handleLoginSuccess}
      />
      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
        onSwitchToOtp={() => { setIsRegisterOpen(false); setIsRegisterOtpOpen(true); }}
        onRegisterSuccess={handleRegisterSuccess}
      />
      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onBackToLogin={() => { setIsForgotPasswordOpen(false); setIsLoginOpen(true); }}
        onSwitchToOtp={() => { setIsForgotPasswordOpen(false); setIsOtpOpen(true); }}
      />
      <OtpVerification
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onBackToLogin={() => { setIsOtpOpen(false); setIsLoginOpen(true); }}
      />
      <RegisterOtp
        isOpen={isRegisterOtpOpen}
        onClose={() => setIsRegisterOtpOpen(false)}
        onBackToRegister={() => { setIsRegisterOtpOpen(false); setIsRegisterOpen(true); }}
        onSwitchToAdditionalInfo={() => { setIsRegisterOtpOpen(false); setIsAdditionalInfoOpen(true); }}
      />
      <AdditionalInfo
        isOpen={isAdditionalInfoOpen}
        onClose={() => setIsAdditionalInfoOpen(false)}
        onSkip={() => setIsAdditionalInfoOpen(false)}
      />
    </>
  );
}