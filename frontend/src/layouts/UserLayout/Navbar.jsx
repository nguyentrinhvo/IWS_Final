import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { useAuth } from '../../context/AuthContext';
import Login from '../../pages/LoginRegister/Login';
import Register from '../../pages/LoginRegister/Register';
import ForgotPassword from '../../pages/LoginRegister/ForgotPassword';
import OtpVerification from '../../pages/LoginRegister/OtpVerification';
import RegisterOtp from '../../pages/LoginRegister/RegisterOtp';
import AdditionalInfo from '../../pages/LoginRegister/AdditionalInfo';

const formatDisplayName = (fullName) => {
  if (!fullName) return '';
  const withoutD = fullName.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  const normalized = withoutD.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const words = normalized.trim().split(/\s+/);
  return words.slice(-2).join(' ');
};

export default function Navbar() {
  const navigate = useNavigate();
  const { currency, language, t } = useGlobal();
  const { currentUser, login: authLogin, logout: authLogout } = useAuth();
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isSupportClosing, setIsSupportClosing] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLangClosing, setIsLangClosing] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isRegisterOtpOpen, setIsRegisterOtpOpen] = useState(false);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUserMenuClosing, setIsUserMenuClosing] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const [mobileSupportExpanded, setMobileSupportExpanded] = useState(false);
  const [mobileLangExpanded, setMobileLangExpanded] = useState(false);

  const [tempCurrency, setTempCurrency] = useState(currency);
  const [tempLanguage, setTempLanguage] = useState(language);

  const supportRef = useRef(null);
  const langRef = useRef(null);
  const userMenuRef = useRef(null);
  const mobileUserMenuRef = useRef(null);

  // AuthContext đã khởi tạo currentUser từ storage — không cần làm lại ở đây

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (supportRef.current && !supportRef.current.contains(event.target)) {
        if (isSupportOpen && !isSupportClosing) {
          closeSupportMenu();
        }
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        if (isLangOpen && !isLangClosing) {
          closeLangMenu();
        }
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        if (isUserMenuOpen && !isUserMenuClosing) {
          closeUserMenu();
        }
      }
      if (mobileUserMenuRef.current && !mobileUserMenuRef.current.contains(event.target)) {
        setIsMobileUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen, isUserMenuClosing, isSupportOpen, isSupportClosing, isLangOpen, isLangClosing]);

  const closeUserMenu = () => {
    setIsUserMenuClosing(true);
    setTimeout(() => {
      setIsUserMenuOpen(false);
      setIsUserMenuClosing(false);
    }, 300);
  };

  const closeSupportMenu = () => {
    setIsSupportClosing(true);
    setTimeout(() => {
      setIsSupportOpen(false);
      setIsSupportClosing(false);
    }, 300);
  };

  const closeLangMenu = () => {
    setIsLangClosing(true);
    setTempCurrency(currency);
    setTempLanguage(language);
    setTimeout(() => {
      setIsLangOpen(false);
      setIsLangClosing(false);
    }, 300);
  };

  const toggleUserMenu = () => {
    if (isUserMenuOpen && !isUserMenuClosing) {
      closeUserMenu();
    } else if (!isUserMenuOpen) {
      setIsUserMenuOpen(true);
    }
  };

  const toggleMobileUserMenu = () => {
    setIsMobileUserMenuOpen(!isMobileUserMenuOpen);
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
    // user đã được lưu bởi Login component → AuthContext tự đọc từ storage
    // Cần gọi lại authLogin để cập nhật state ngay lập tức
    authLogin(user, user._rememberMe);
    setIsLoginOpen(false);
  };

  const handleRegisterSuccess = (user) => {
    authLogin(user, false);
  };

  const handleLogout = () => {
    authLogout();
    setIsUserMenuOpen(false);
    setIsUserMenuClosing(false);
    setIsMobileUserMenuOpen(false);
    navigate('/');
  };

  const handleUserNavigation = (tabId) => {
    closeUserMenu();
    setIsMobileUserMenuOpen(false);
    if (tabId === 'admin') {
      navigate('/admin');
    } else {
      navigate(`/profile/${tabId}`);
    }
  };

  const handleTopNavNavigation = (tabId) => {
    setIsMobileMenuOpen(false);
    navigate(`/profile/${tabId}`);
  };

  const userMenuItems = [
    {
      key: 'editProfile',
      tabId: 'edit-profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[22px] h-[22px]" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
        </svg>
      )
    },
    {
      key: 'myCards',
      tabId: 'my-cards',
      icon: (
        <svg fill="currentColor" className="w-[22px] h-[22px]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M127.633,215.98h215.568c29.315,0,53.166,23.851,53.166,53.166v14.873h38.061c22.735,0,41.166-18.432,41.166-41.167 v-69.608H127.633V215.98z"></path>
          <path d="M434.428,74.2H168.799c-22.735,0-41.166,18.431-41.166,41.166v17.479h347.961v-17.479 C475.594,92.631,457.163,74.2,434.428,74.2z"></path>
          <path d="M343.201,227.98H77.572c-22.735,0-41.166,18.431-41.166,41.166v127.487c0,22.735,18.431,41.166,41.166,41.166h265.629 c22.736,0,41.166-18.431,41.166-41.166V269.146C384.367,246.412,365.938,227.98,343.201,227.98z M131.542,329.846 c0,4.92-3.989,8.909-8.909,8.909H75.289c-4.92,0-8.908-3.989-8.908-8.909v-29.098c0-4.921,3.988-8.909,8.908-8.909h47.344 c4.92,0,8.909,3.988,8.909,8.909V329.846z M300.961,413.039c-10.796,0-19.548-8.752-19.548-19.549s8.752-19.549,19.548-19.549 c10.797,0,19.549,8.752,19.549,19.549S311.758,413.039,300.961,413.039z M345.271,413.039c-10.797,0-19.549-8.752-19.549-19.549 s8.752-19.549,19.549-19.549c10.796,0,19.548,8.752,19.548,19.549S356.067,413.039,345.271,413.039z"></path>
        </svg>
      )
    },
    {
      key: 'purchaseList',
      tabId: 'purchase-list',
      icon: (
        <svg fill="currentColor" className="w-[22px] h-[22px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8zM7 9a2 2 0 1 1 .001-4.001A2 2 0 0 1 7 9z"></path>
        </svg>
      )
    },
    {
      key: 'transactionHistory',
      tabId: 'transaction-history',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      )
    },
    {
      key: 'myBookings',
      tabId: 'my-bookings',
      icon: (
        <svg className="w-[22px] h-[22px]" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path>
        </svg>
      )
    },
    {
      key: 'savedPassengers',
      tabId: 'saved-passengers',
      icon: (
        <svg fill="currentColor" className="w-[22px] h-[22px]" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
          <path d="M 38.7232 28.5490 C 43.1399 28.5490 46.9403 24.6047 46.9403 19.4690 C 46.9403 14.3949 43.1193 10.6356 38.7232 10.6356 C 34.3271 10.6356 30.5061 14.4771 30.5061 19.5101 C 30.5061 24.6047 34.3066 28.5490 38.7232 28.5490 Z M 15.0784 29.0215 C 18.8994 29.0215 22.2274 25.5703 22.2274 21.1125 C 22.2274 16.6958 18.8789 13.4294 15.0784 13.4294 C 11.2575 13.4294 7.8885 16.7779 7.9090 21.1536 C 7.9090 25.5703 11.2370 29.0215 15.0784 29.0215 Z M 3.6155 47.5717 L 19.2281 47.5717 C 17.0917 44.4697 19.7006 38.2247 24.1173 34.8146 C 21.8371 33.2944 18.8994 32.1645 15.0579 32.1645 C 5.7931 32.1645 0 39.0053 0 44.6957 C 0 46.5445 1.0271 47.5717 3.6155 47.5717 Z M 25.8018 47.5717 L 51.6241 47.5717 C 54.8493 47.5717 56 46.6472 56 44.8395 C 56 39.5394 49.3644 32.2261 38.7026 32.2261 C 28.0616 32.2261 21.4262 39.5394 21.4262 44.8395 C 21.4262 46.6472 22.5766 47.5717 25.8018 47.5717 Z"></path>
        </svg>
      )
    },
    {
      key: 'promotions',
      tabId: 'promotions',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      )
    },
    ...(currentUser?.role?.toUpperCase() === 'ADMIN' ? [{
      key: 'adminPanel',
      tabId: 'admin',
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    }] : []),
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
      <div className="w-full flex flex-col bg-[#7C4A4A] relative z-[100]">
        <nav className="w-full h-[80px] border-b border-white/20 flex justify-center relative z-[100]">
          <div className="w-full px-[16px] md:px-[24px] xl:px-4 xl:max-w-[1320px] mx-auto flex items-center justify-between h-full">
            <Link to="/" className="flex-shrink-0 cursor-pointer h-full flex items-center">
              <img src="/images/logo_web.png" alt="Logo" className="max-h-[60px] w-auto object-contain" />
            </Link>

            <ul className={`hidden xl:flex flex-1 justify-center items-center text-white font-medium text-[19px] whitespace-nowrap ${language === 'EN' ? 'space-x-10' : 'space-x-5'}`}>
              <li><Link to="/tours" className="cursor-pointer px-4 py-2 rounded-lg hover:bg-black/20 transition-all block">{t('tours')}</Link></li>
              <li><Link to="/hotels" className="cursor-pointer px-4 py-2 rounded-lg hover:bg-black/20 transition-all block">{t('hotels')}</Link></li>
              <li><Link to="/flights" className="cursor-pointer px-4 py-2 rounded-lg hover:bg-black/20 transition-all block">{t('flights')}</Link></li>
              <li><Link to="/transport" className="cursor-pointer px-4 py-2 rounded-lg hover:bg-black/20 transition-all block">{t('carsTrains')}</Link></li>
              <li><Link to="/things-to-do" className="cursor-pointer px-4 py-2 rounded-lg hover:bg-black/20 transition-all block">{t('thingsToDo')}</Link></li>
            </ul>

            <div className="hidden xl:flex flex-shrink-0 items-center space-x-4">
              {currentUser ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-4 px-4 py-2 rounded-lg hover:bg-black/20 transition-all cursor-pointer whitespace-nowrap"
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
                    <div className={`absolute top-full right-0 mt-3 min-w-[350px] w-max h-auto max-h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-[200] overflow-hidden flex flex-col ${isUserMenuClosing ? 'animate-dropdown-out' : 'animate-dropdown'}`}>
                      <div className="px-6 py-5 border-b border-gray-100 mb-2">
                        <p className="text-sm text-gray-400 font-medium whitespace-nowrap">{t('loggedInAs')}</p>
                        <p className="text-lg font-bold text-[#0B1E43] truncate mt-1">{currentUser.email}</p>
                      </div>

                      <div className="flex-1 overflow-y-auto">
                        {userMenuItems.map((item) => (
                          <button
                            key={item.key}
                            onClick={() => handleUserNavigation(item.tabId)}
                            className="w-full flex items-center space-x-4 px-6 py-4 hover:bg-orange-50 transition-colors cursor-pointer text-left whitespace-nowrap"
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
                          className="w-full flex items-center space-x-4 px-6 py-4 hover:bg-red-50 transition-colors cursor-pointer text-left whitespace-nowrap"
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
                    className="flex items-center space-x-2 bg-[#FADCD9] text-indigo-800 px-6 py-2.5 rounded-full font-semibold hover:bg-pink-100 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>{t('logIn')}</span>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.75 12L4 12M7.75072 8L11.748 11.9999L7.75072 16M9.75 5.76562V4.25C9.75 3.42157 10.4216 2.75 11.25 2.75H17.25C18.0784 2.75 18.75 3.42157 18.75 4.25V19.75C18.75 20.5784 18.0784 21.25 17.25 21.25H11.25C10.4216 21.25 9.75 20.5784 9.75 19.75V18.2383" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="bg-[#7978E9] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-500/20 cursor-pointer whitespace-nowrap"
                  >
                    {t('register')}
                  </button>
                </>
              )}
            </div>

            <div className="flex xl:hidden items-center space-x-5 text-white">
              <div className="relative" ref={mobileUserMenuRef}>
                <button onClick={toggleMobileUserMenu} className="focus:outline-none flex items-center justify-center">
                  {currentUser ? (
                    currentUser.avatar ? (
                      <img src={currentUser.avatar} alt="user" className="w-[30px] h-[30px] rounded-full object-cover border-2 border-white/40" />
                    ) : (
                      <div className="w-[30px] h-[30px] rounded-full bg-[#F57323] flex items-center justify-center border-2 border-white/40">
                        <span className="text-white font-bold text-xs">{formatDisplayName(currentUser.fullName).charAt(0).toUpperCase()}</span>
                      </div>
                    )
                  ) : (
                    <svg fill="currentColor" width="28px" height="28px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg">
                      <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-6.24-.064H6.81a2.528 2.528 0 0 0-2.692 2.303v1.51a.794.794 0 0 0 .792.792h7.166a.794.794 0 0 0 .792-.791V11.82a2.528 2.528 0 0 0-2.692-2.302zM6.14 6.374a2.353 2.353 0 1 0 2.353-2.353A2.353 2.353 0 0 0 6.14 6.374z"></path>
                    </svg>
                  )}
                </button>

                {isMobileUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-4 w-max min-w-[200px] bg-white rounded-xl shadow-2xl py-2 z-[200] border border-gray-100 flex flex-col text-black animate-dropdown">
                    {currentUser ? (
                      <>
                        {userMenuItems.map((item) => (
                          <button key={item.key} onClick={() => handleUserNavigation(item.tabId)} className="flex items-center space-x-3 px-4 py-3 hover:bg-orange-50 w-full text-left transition-colors">
                            <div className="text-[#F57323] w-5 h-5">{item.icon}</div>
                            <span className="text-[#0B1E43] font-medium text-sm">{t(item.key)}</span>
                          </button>
                        ))}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 w-full text-left transition-colors">
                            <div className="text-red-500 w-5 h-5">
                              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                              </svg>
                            </div>
                            <span className="text-red-500 font-medium text-sm">{t('logout')}</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col w-full p-2">
                        <button onClick={() => { setIsMobileUserMenuOpen(false); setIsLoginOpen(true); }} className="px-4 py-2.5 mx-1 mt-1 bg-[#FADCD9] text-indigo-800 rounded-full font-semibold hover:bg-pink-100 transition-colors text-center text-[15px]">{t('logIn')}</button>
                        <button onClick={() => { setIsMobileUserMenuOpen(false); setIsRegisterOpen(true); }} className="px-4 py-2.5 mx-1 my-2 bg-[#7978E9] text-white rounded-full font-semibold hover:bg-indigo-500 transition-colors text-center text-[15px]">{t('register')}</button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none flex items-center justify-center">
                {isMobileMenuOpen ? (
                  <svg fill="currentColor" width="28px" height="28px" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg">
                    <path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"></path>
                  </svg>
                ) : (
                  <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        <nav className="hidden xl:flex w-full h-[40px] justify-center relative z-40">
          <div className="w-full px-[16px] md:px-[24px] xl:px-4 xl:max-w-[1320px] mx-auto flex items-center justify-end h-full">
            <ul className="flex items-center space-x-4 text-white text-sm whitespace-nowrap">
              <li className="cursor-pointer px-3 py-1.5 rounded-lg hover:bg-black/20 transition-all">{t('partnership')}</li>
              <li className="relative" ref={supportRef}>
                <button
                  onClick={() => {
                    if (isSupportOpen && !isSupportClosing) {
                      closeSupportMenu();
                    } else if (!isSupportOpen) {
                      setIsSupportOpen(true);
                    }
                  }}
                  className="flex items-center space-x-1 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-black/20 transition-all whitespace-nowrap"
                >
                  <span>{t('support')}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {(isSupportOpen || isSupportClosing) && (
                  <div className={`absolute top-full left-0 mt-2 w-max min-w-[12rem] bg-white text-gray-800 rounded-xl shadow-xl py-2 z-50 border border-gray-100 flex flex-col ${isSupportClosing ? 'animate-dropdown-out' : 'animate-dropdown'}`}>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors font-medium whitespace-nowrap block cursor-pointer">{t('helpCenter')}</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors font-medium whitespace-nowrap block cursor-pointer">{t('contactUs')}</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors font-medium whitespace-nowrap block cursor-pointer">{t('myInbox')}</button>
                  </div>
                )}
              </li>
              <li onClick={() => handleTopNavNavigation('my-bookings')} className="cursor-pointer px-3 py-1.5 rounded-lg hover:bg-black/20 transition-all whitespace-nowrap">{t('myBookings')}</li>
              <li className="relative" ref={langRef}>
                <button
                  onClick={() => {
                    if (isLangOpen && !isLangClosing) {
                      closeLangMenu();
                    } else if (!isLangOpen) {
                      setIsLangOpen(true);
                      setTempCurrency(currency);
                      setTempLanguage(language);
                    }
                  }}
                  className="flex items-center space-x-2 cursor-pointer px-3 py-1.5 rounded-lg hover:bg-black/20 transition-all whitespace-nowrap"
                >
                  {currency === 'VND' ? (
                    <span className="text-lg leading-none rounded-sm bg-red-500 text-yellow-300 px-1 border border-white/30">★</span>
                  ) : (
                    <span className="flex items-center justify-center rounded-sm bg-blue-600 text-white px-1 py-[3.5px] border border-white/30">
                      <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" fill="currentColor" />
                        <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" fill="currentColor" />
                      </svg>
                    </span>
                  )}
                  <span>{currency} | {language}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {(isLangOpen || isLangClosing) && (
                  <div className={`absolute top-full right-0 mt-2 w-[550px] bg-white text-gray-800 rounded-xl shadow-2xl p-6 z-50 border border-gray-100 flex ${isLangClosing ? 'animate-dropdown-out' : 'animate-dropdown'}`}>
                    <div className="flex-1 border-r border-gray-200 pr-6">
                      <h3 className="font-bold text-gray-900 mb-4 text-base whitespace-nowrap">{t('selectCurrency')}</h3>
                      <div className="space-y-1">
                        <button
                          onClick={() => handleCurrencyChange('VND')}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition cursor-pointer ${tempCurrency === 'VND' ? 'bg-gray-100 border border-gray-200' : 'hover:bg-gray-50'}`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded">VND</span>
                            <span className="text-sm whitespace-nowrap">{t('vietnameseDong')}</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleCurrencyChange('USD')}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition cursor-pointer ${tempCurrency === 'USD' ? 'bg-gray-100 border border-gray-200' : 'hover:bg-gray-50'}`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded">USD</span>
                            <span className="text-sm whitespace-nowrap">{t('usDollar')}</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="flex-[0.8] pl-6 flex flex-col">
                      <h3 className="font-bold text-gray-900 mb-4 text-base whitespace-nowrap">{t('selectLanguage')}</h3>
                      <div className="space-y-1 flex-1 flex flex-col">
                        {tempCurrency === 'VND' && (
                          <button
                            onClick={() => setTempLanguage('VI')}
                            className={`block w-full text-left px-3 py-2 rounded-lg transition cursor-pointer ${tempLanguage === 'VI' ? 'bg-green-50/50 text-green-700 font-medium border border-green-200' : 'hover:bg-gray-100'}`}
                          >
                            Tiếng Việt
                          </button>
                        )}
                        <button
                          onClick={() => setTempLanguage('EN')}
                          className={`w-full text-left px-3 py-2 rounded-lg transition cursor-pointer ${tempLanguage === 'EN' ? 'bg-green-50/50 text-green-700 font-medium border border-green-200' : 'hover:bg-gray-100'}`}
                        >
                          English
                        </button>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button onClick={handleDone} className="bg-[#0095FF] hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium text-sm transition-colors whitespace-nowrap cursor-pointer">
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

      <div className={`fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300 xl:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)} />

      <div className={`fixed top-0 left-0 h-full w-[80vw] max-w-[320px] bg-white shadow-2xl z-[105] transition-transform duration-300 ease-in-out xl:hidden flex flex-col overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 pt-[80px] flex flex-col space-y-5 text-[#0B1E43]">
          <div onClick={() => { setIsMobileMenuOpen(false); navigate('/tours'); }} className="cursor-pointer font-medium text-[16px]">{t('tours')}</div>
          <div onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer font-medium text-[16px]">{t('hotels')}</div>
          <div onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer font-medium text-[16px]">{t('flights')}</div>
          <div onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer font-medium text-[16px]">{t('carsTrains')}</div>
          <div onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer font-medium text-[16px]">{t('thingsToDo')}</div>
          <div onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer font-medium text-[16px]">{t('partnership')}</div>

          <div className="flex flex-col border-b border-gray-100 pb-3">
            <div className="flex justify-between items-center cursor-pointer font-medium text-[16px]" onClick={() => setMobileSupportExpanded(!mobileSupportExpanded)}>
              <span>{t('support')}</span>
              <svg className={`w-4 h-4 transition-transform duration-300 ${mobileSupportExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
            </div>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 ${mobileSupportExpanded ? 'max-h-[200px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-4 pb-2 flex flex-col space-y-3">
                <div className="text-[15px] text-gray-600 cursor-pointer">{t('helpCenter')}</div>
                <div className="text-[15px] text-gray-600 cursor-pointer">{t('contactUs')}</div>
                <div className="text-[15px] text-gray-600 cursor-pointer">{t('myInbox')}</div>
              </div>
            </div>
          </div>

          <div onClick={() => handleTopNavNavigation('my-bookings')} className="cursor-pointer font-medium text-[16px]">{t('myBookings')}</div>

          <div className="flex flex-col border-b border-gray-100 pb-3">
            <div className="flex justify-between items-center cursor-pointer font-medium text-[16px]" onClick={() => setMobileLangExpanded(!mobileLangExpanded)}>
              <span>{currency} | {language}</span>
              <svg className={`w-4 h-4 transition-transform duration-300 ${mobileLangExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
            </div>
            <div className={`flex flex-col overflow-hidden transition-all duration-300 ${mobileLangExpanded ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-2 flex flex-col space-y-4 pb-2">
                <div>
                  <h4 className="font-bold text-gray-800 text-[14px] mb-2">{t('selectCurrency')}</h4>
                  <div className="flex flex-col space-y-2">
                    <button onClick={() => handleCurrencyChange('VND')} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${tempCurrency === 'VND' ? 'bg-gray-100 font-semibold' : 'text-gray-600'}`}>VND - {t('vietnameseDong')}</button>
                    <button onClick={() => handleCurrencyChange('USD')} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${tempCurrency === 'USD' ? 'bg-gray-100 font-semibold' : 'text-gray-600'}`}>USD - {t('usDollar')}</button>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-[14px] mb-2">{t('selectLanguage')}</h4>
                  <div className="flex flex-col space-y-2">
                    {tempCurrency === 'VND' && (
                      <button onClick={() => setTempLanguage('VI')} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${tempLanguage === 'VI' ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600'}`}>Tiếng Việt</button>
                    )}
                    <button onClick={() => setTempLanguage('EN')} className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${tempLanguage === 'EN' ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-600'}`}>English</button>
                  </div>
                </div>
                <button onClick={() => { handleDone(); setIsMobileMenuOpen(false); }} className="mt-2 w-full bg-[#0095FF] hover:bg-blue-600 text-white py-2.5 rounded-lg text-[15px] font-bold transition-colors">{t('done')}</button>
              </div>
            </div>
          </div>

        </div>
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