// File 1: TourFilters.jsx
import React, { useState } from 'react';

const filterMockData = {
  durations: ["2-4 ngày", "5-6 ngày", "7-8 ngày", "9-10 ngày"],
  prices: ["< 11 triệu", "11 triệu - 18 triệu", "18 triệu - 21 triệu", "> 21 triệu"],
  shopping: ["Không Shopping", "Có Shopping"]
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const TourFilters = ({ onClose }) => {
  const [currentDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedShopping, setSelectedShopping] = useState([]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  
  const getFirstDayOfMonth = (year, month) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const isPrevDisabled = viewDate.getFullYear() === currentDate.getFullYear() && viewDate.getMonth() === currentDate.getMonth();

  const handlePrevMonth = () => {
    if (!isPrevDisabled) {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const emptyCells = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const toggleSelection = (setter, state, value) => {
    if (state.includes(value)) {
      setter(state.filter(item => item !== value));
    } else {
      setter([...state, value]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-5 bg-white lg:rounded-xl lg:border border-gray-200 overflow-y-auto">
      {onClose && (
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-xl font-bold text-gray-900">Arrange</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-lg text-gray-900">Departure date</h3>
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={handlePrevMonth}
              disabled={isPrevDisabled}
              className={`p-1.5 rounded-full transition-colors ${isPrevDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <span className="font-semibold text-gray-900 text-base">
              {monthNames[month]} {year}
            </span>
            <button 
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {emptyCells.map(cell => (
              <div key={`empty-${cell}`} className="p-2"></div>
            ))}
            {days.map(day => {
              const isSelected = selectedDate === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 text-sm rounded-lg transition-all ${isSelected ? 'bg-blue-600 text-white font-bold shadow-sm' : 'text-gray-700 hover:bg-gray-100 font-medium'}`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 w-full"></div>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-lg text-gray-900">Số ngày tour</h3>
        <div className="grid grid-cols-2 gap-3">
          {filterMockData.durations.map((duration, index) => {
            const isSelected = selectedDurations.includes(duration);
            return (
              <button
                key={index}
                onClick={() => toggleSelection(setSelectedDurations, selectedDurations, duration)}
                className={`py-2.5 px-3 text-sm rounded-lg border text-center transition-all ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-300 text-gray-700 hover:border-gray-400 font-medium'}`}
              >
                {duration}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-200 w-full"></div>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-lg text-gray-900">Giá tour/khách</h3>
        <div className="grid grid-cols-2 gap-3">
          {filterMockData.prices.map((price, index) => {
            const isSelected = selectedPrices.includes(price);
            return (
              <button
                key={index}
                onClick={() => toggleSelection(setSelectedPrices, selectedPrices, price)}
                className={`py-2.5 px-3 text-sm rounded-lg border text-center transition-all ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-300 text-gray-700 hover:border-gray-400 font-medium'}`}
              >
                {price}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-gray-200 w-full"></div>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-lg text-gray-900">Mua sắm trong tour</h3>
        <div className="grid grid-cols-2 gap-3">
          {filterMockData.shopping.map((option, index) => {
            const isSelected = selectedShopping.includes(option);
            return (
              <button
                key={index}
                onClick={() => toggleSelection(setSelectedShopping, selectedShopping, option)}
                className={`py-2.5 px-3 text-sm rounded-lg border text-center transition-all ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-300 text-gray-700 hover:border-gray-400 font-medium'}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TourFilters;