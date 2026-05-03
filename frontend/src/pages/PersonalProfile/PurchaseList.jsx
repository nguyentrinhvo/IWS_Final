import React, { useState, useEffect, useRef } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { getMyBookings } from '../../services/bookingService';

const FILTER_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 10.5A3.502 3.502 0 0 0 18.355 8H21a1 1 0 1 0 0-2h-2.645a3.502 3.502 0 0 0-6.71 0H3a1 1 0 0 0 0 2h8.645A3.502 3.502 0 0 0 15 10.5zM3 16a1 1 0 1 0 0 2h2.145a3.502 3.502 0 0 0 6.71 0H21a1 1 0 1 0 0-2h-9.145a3.502 3.502 0 0 0-6.71 0H3z"
      fill="currentColor"
    />
  </svg>
);

const CalendarPicker = ({ viewDate, setViewDate, selectedDate, onSelect, locale }) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(year, month + 1, 1));
  };

  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(2024, 0, i + 7);
    return date.toLocaleString(locale, { weekday: 'short' });
  });

  return (
    <div className="p-3 md:p-4 bg-white rounded-xl shadow-2xl border border-gray-100 w-full md:w-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="font-bold text-gray-800 text-xs md:text-sm whitespace-nowrap capitalize">
          {viewDate.toLocaleString(locale, { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
        {weekdays.map((d) => (
          <div key={d} className="capitalize">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs md:text-sm">
        {blanks.map((b) => (
          <div key={`blank-${b}`} />
        ))}
        {days.map((d) => {
          const isSelected =
            selectedDate.getDate() === d &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;

          return (
            <button
              key={d}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(new Date(year, month, d));
              }}
              className={`w-7 h-7 md:w-8 md:h-8 mx-auto flex items-center justify-center rounded-full transition-colors ${isSelected ? 'bg-[#0194F3] text-white font-bold' : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function PurchaseList() {
  const { t, language } = useGlobal();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('past90');

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);

  const [fromDate, setFromDate] = useState(new Date(2026, 3, 1));
  const [toDate, setToDate] = useState(new Date(2026, 3, 29));
  const [fromViewDate, setFromViewDate] = useState(new Date(2026, 3, 1));
  const [toViewDate, setToViewDate] = useState(new Date(2026, 3, 1));

  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  const filterRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const currentLocale = language === 'VI' ? 'vi-VN' : 'en-US';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setIsFromOpen(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setIsToOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await getMyBookings(0, 50);
        setBookings(res.content || []);
      } catch (err) {
        console.error('Failed to load bookings:', err);
        setError('Failed to load your purchase history.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getPreviousMonthName = (monthsAgo) => {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - monthsAgo);
    return date.toLocaleString(currentLocale, { month: 'long', year: 'numeric' });
  };

  const tabs = [
    { id: 'past90', label: t('user_past90Days') },
    { id: 'month1', label: getPreviousMonthName(1) },
    { id: 'month2', label: getPreviousMonthName(2) },
    { id: 'custom', label: t('user_customizeDate') },
  ];

  const productTypes = ['Flights', 'Hotels', 'Tours', 'Cars', 'Trains', 'Villas', 'Apartments', 'Transports', 'Bills', 'Activities'];
  const paymentMethods = ['Bank Transfer', 'Pay at Store', 'Credit Card'];

  const toggleProduct = (product) => {
    setSelectedProducts((prev) =>
      prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product]
    );
  };

  const togglePayment = (payment) => {
    setSelectedPayments((prev) =>
      prev.includes(payment) ? prev.filter((p) => p !== payment) : [...prev, payment]
    );
  };

  const resetFilters = () => {
    setSelectedProducts([]);
    setSelectedPayments([]);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(currentLocale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{t('user_purchaseList')}</h2>
        <div className="flex items-center gap-2 text-xs md:text-sm text-black font-medium">
          <svg width="18" height="18" viewBox="0 0 1024 1024" fill="currentColor">
            <path d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z" />
          </svg>
          <span className="whitespace-nowrap">
            {t('user_findTickets')}{' '}
            <span
              className="text-[#0194F3] cursor-pointer hover:underline"
              onClick={() => navigate('/profile/my-bookings')}
            >
              My Booking
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-max whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-semibold transition-colors capitalize ${activeTab === tab.id
                ? 'bg-[#0194F3] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
          >
            {tab.label}
          </button>
        ))}

        <div className="relative flex-1 min-w-[100px]" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full h-full min-h-[36px] md:min-h-[40px] flex items-center justify-center gap-2 rounded-md text-xs md:text-sm font-semibold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 whitespace-nowrap"
          >
            {FILTER_ICON} {t('user_filter')}
          </button>

          <div
            className={`absolute top-[calc(100%+8px)] right-0 w-[90vw] max-w-[400px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 transition-all duration-300 origin-top ${isFilterOpen ? 'opacity-100 translate-y-0 scale-y-100' : 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none'
              }`}
          >
            <div className="p-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-sm md:text-base">{t('user_showPurchases')}</h3>
              <span
                onClick={resetFilters}
                className="text-[#0194F3] text-xs md:text-sm font-semibold cursor-pointer select-none"
              >
                {t('user_resetAll')}
              </span>
            </div>
            <div className="px-4 py-2 border-t border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">{t('user_productType')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {productTypes.map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(item)}
                      onChange={() => toggleProduct(item)}
                      className="w-4 h-4 rounded text-[#0194F3] cursor-pointer"
                    />
                    <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="px-4 py-4 border-t border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">{t('user_paymentMethod')}</h4>
              <div className="flex flex-col gap-3">
                {paymentMethods.map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPayments.includes(item)}
                      onChange={() => togglePayment(item)}
                      className="w-4 h-4 rounded text-[#0194F3] cursor-pointer"
                    />
                    <span className="text-xs md:text-sm text-gray-600 whitespace-nowrap">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'custom' && (
        <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 mb-6 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">

          <div ref={fromRef} className="flex-1 relative">
            <div
              onClick={() => setIsFromOpen(!isFromOpen)}
              className="flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-4 cursor-pointer hover:bg-gray-50 rounded-t-xl md:rounded-l-xl md:rounded-tr-none transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M18 15.75C16.7574 15.75 15.75 16.7574 15.75 18C15.75 19.2426 16.7574 20.25 18 20.25C19.2426 20.25 20.25 19.2426 20.25 18C20.25 16.7574 19.2426 15.75 18 15.75ZM14.25 18C14.25 15.9289 15.9289 14.25 18 14.25C20.0711 14.25 21.75 15.9289 21.75 18C21.75 18.7643 21.5213 19.4752 21.1287 20.068L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L20.068 21.1287C19.4752 21.5213 18.7643 21.75 18 21.75C15.9289 21.75 14.25 20.0711 14.25 18Z" fill="#1C274C" />
                <path d="M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z" fill="#1C274C" />
                <path d="M22 12V14C22 14.2053 22 14.405 21.9998 14.5992C21.0368 13.4677 19.6022 12.75 18 12.75C15.1005 12.75 12.75 15.1005 12.75 18C12.75 19.6022 13.4677 21.0368 14.5992 21.9998C14.405 22 14.2053 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12Z" fill="#1C274C" />
              </svg>
              <div className="overflow-hidden">
                <p className="text-[10px] md:text-xs text-gray-500 font-semibold">{t('user_from')}</p>
                <p className="text-xs md:text-sm font-bold text-gray-800 whitespace-nowrap truncate capitalize">{formatDate(fromDate)}</p>
              </div>
            </div>

            <div className={`absolute top-[calc(100%+8px)] left-0 w-full z-50 transition-all duration-300 origin-top ${isFromOpen ? 'opacity-100 translate-y-0 scale-y-100' : 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none'
              }`}>
              <CalendarPicker
                viewDate={fromViewDate}
                setViewDate={setFromViewDate}
                selectedDate={fromDate}
                locale={currentLocale}
                onSelect={(date) => {
                  setFromDate(date);
                  setIsFromOpen(false);
                }}
              />
            </div>
          </div>

          <div ref={toRef} className="flex-1 relative">
            <div
              onClick={() => setIsToOpen(!isToOpen)}
              className="flex items-center gap-3 md:gap-4 px-3 md:px-4 py-3 md:py-4 cursor-pointer hover:bg-gray-50 rounded-b-xl md:rounded-r-xl md:rounded-bl-none transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                <path fillRule="evenodd" clipRule="evenodd" d="M18 15.75C16.7574 15.75 15.75 16.7574 15.75 18C15.75 19.2426 16.7574 20.25 18 20.25C19.2426 20.25 20.25 19.2426 20.25 18C20.25 16.7574 19.2426 15.75 18 15.75ZM14.25 18C14.25 15.9289 15.9289 14.25 18 14.25C20.0711 14.25 21.75 15.9289 21.75 18C21.75 18.7643 21.5213 19.4752 21.1287 20.068L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L20.068 21.1287C19.4752 21.5213 18.7643 21.75 18 21.75C15.9289 21.75 14.25 20.0711 14.25 18Z" fill="#1C274C" />
                <path d="M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z" fill="#1C274C" />
                <path d="M22 12V14C22 14.2053 22 14.405 21.9998 14.5992C21.0368 13.4677 19.6022 12.75 18 12.75C15.1005 12.75 12.75 15.1005 12.75 18C12.75 19.6022 13.4677 21.0368 14.5992 21.9998C14.405 22 14.2053 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12Z" fill="#1C274C" />
              </svg>
              <div className="overflow-hidden">
                <p className="text-[10px] md:text-xs text-gray-500 font-semibold">{t('user_to')}</p>
                <p className="text-xs md:text-sm font-bold text-gray-800 whitespace-nowrap truncate capitalize">{formatDate(toDate)}</p>
              </div>
            </div>

            <div className={`absolute top-[calc(100%+8px)] left-0 w-full z-50 transition-all duration-300 origin-top ${isToOpen ? 'opacity-100 translate-y-0 scale-y-100' : 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none'
              }`}>
              <CalendarPicker
                viewDate={toViewDate}
                setViewDate={setToViewDate}
                selectedDate={toDate}
                locale={currentLocale}
                onSelect={(date) => {
                  setToDate(date);
                  setIsToOpen(false);
                }}
              />
            </div>
          </div>

        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start justify-center md:justify-start">
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2017/11/06/1509969696508-63e4a83e52864cf123f6cc7a9ee356fd.png?tr=q-75,w-175"
            alt="Empty"
            className="w-[140px] md:w-[175px]"
          />
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{t('user_noPurchases')}</h3>
            <p className="text-xs md:text-sm text-gray-500 mb-4">{t('user_noPurchasesDesc')}</p>
            <span
              onClick={() => navigate('/')}
              className="text-[#0194F3] font-bold cursor-pointer hover:underline text-sm md:text-base"
            >
              {t('user_makeNewPurchase')}
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-md uppercase tracking-wider">{booking.serviceType}</span>
                  <span className={`px-2 py-1 text-xs font-bold rounded-md uppercase tracking-wider ${booking.status === 'confirmed' || booking.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{booking.status}</span>
                  <span className="text-xs text-gray-400">{new Date(booking.createdAt).toLocaleDateString(currentLocale)}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-800 mb-1">{booking.snapshotName || 'Booking Item'}</h4>
                <p className="text-xs text-gray-500">Booking ID: {booking.id}</p>
              </div>
              <div className="flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-4">
                <p className="font-bold text-[#0194F3]">{booking.totalPrice.toLocaleString(currentLocale)} VND</p>
                <button className="mt-2 text-xs text-[#0194F3] border border-[#0194F3] px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}