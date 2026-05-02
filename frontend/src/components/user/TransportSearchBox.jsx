import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Ticket, Search, User, Car } from 'lucide-react';

const TransportSearchBox = () => {
  const navigate = useNavigate();
  const [driverType, setDriverType] = useState('without'); // 'without' or 'with'
  const [isReturn, setIsReturn] = useState(false);

  const handleSearch = () => {
    navigate('/transport/search');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-[1200px] border border-gray-100">
      
      {/* 1. Driver Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setDriverType('without')}
          className={`flex items-center px-6 py-2 rounded-full font-bold text-[14px] transition-all ${
            driverType === 'without'
              ? 'bg-[#E8F2FF] text-blue-600 shadow-sm border border-blue-100'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Car className="w-4 h-4 mr-2" />
          Without Driver
        </button>
        <button
          onClick={() => setDriverType('with')}
          className={`flex items-center px-6 py-2 rounded-full font-bold text-[14px] transition-all ${
            driverType === 'with'
              ? 'bg-[#E8F2FF] text-blue-600 shadow-sm border border-blue-100'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <User className="w-4 h-4 mr-2" />
          With Driver
        </button>
      </div>

      {/* 2. Rental Section (UI ONLY) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {/* Rental Location */}
        <div className="flex flex-col border border-gray-200 rounded-xl px-4 py-2 hover:border-blue-400 transition-colors bg-gray-50/30">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Your Rental Location</span>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Where to pick up?" 
              className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent placeholder:text-gray-300" 
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="flex flex-col border border-gray-200 rounded-xl px-4 py-2 hover:border-blue-400 transition-colors bg-gray-50/30">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Rental Start Date</span>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" defaultValue="02 Apr 2024" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent" />
          </div>
        </div>

        {/* Start Time */}
        <div className="flex flex-col border border-gray-200 rounded-xl px-4 py-2 hover:border-blue-400 transition-colors bg-gray-50/30">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Start Time</span>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" defaultValue="09:00" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent" />
          </div>
        </div>

        {/* End Date */}
        <div className="flex flex-col border border-gray-200 rounded-xl px-4 py-2 hover:border-blue-400 transition-colors bg-gray-50/30">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Rental End Date</span>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" defaultValue="05 Apr 2024" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent" />
          </div>
        </div>

        {/* End Time */}
        <div className="flex flex-col border border-gray-200 rounded-xl px-4 py-2 hover:border-blue-400 transition-colors bg-gray-50/30">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">End Time</span>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" defaultValue="09:00" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent" />
          </div>
        </div>
      </div>

      {/* 3. Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[1px] flex-1 bg-gray-100"></div>
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px]">OR BUS & TRAIN</span>
        <div className="h-[1px] flex-1 bg-gray-100"></div>
      </div>

      {/* 4. Transport Section (MAIN PART) */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* From */}
        <div className="flex-[1.5] flex flex-col border border-gray-200 rounded-xl px-4 py-2 hover:border-orange-300 transition-colors group">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 group-hover:text-orange-500 transition-colors">From</span>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Train station of departure" 
              className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent placeholder:text-gray-300" 
            />
          </div>
        </div>

        {/* To */}
        <div className="flex-[1.5] flex flex-col border border-gray-200 rounded-xl px-4 py-2 hover:border-orange-300 transition-colors group">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 group-hover:text-orange-500 transition-colors">To</span>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Train station of arrival" 
              className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent placeholder:text-gray-300" 
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="flex-1 flex flex-col border border-gray-200 rounded-xl px-4 py-2 hover:border-orange-300 transition-colors group">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 group-hover:text-orange-500 transition-colors">Departure Date</span>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" defaultValue="02 Apr 2024" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent" />
          </div>
        </div>

        {/* Return Date (Optional) */}
        <div className={`flex-1 flex flex-col border border-gray-200 rounded-xl px-4 py-2 transition-all group ${!isReturn ? 'bg-gray-50/50' : 'hover:border-orange-300'}`}>
          <div className="flex justify-between items-center mb-0.5">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${!isReturn ? 'text-gray-400' : 'text-gray-500 group-hover:text-orange-500'}`}>Return Date</span>
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isReturn} 
                onChange={(e) => setIsReturn(e.target.checked)} 
                className="w-3 h-3 rounded text-orange-500 focus:ring-orange-500 border-gray-300"
              />
            </label>
          </div>
          <div className="flex items-center">
            <Calendar className={`w-4 h-4 mr-2 ${!isReturn ? 'text-gray-300' : 'text-gray-400'}`} />
            <input 
              type="text" 
              disabled={!isReturn}
              placeholder="Optional"
              defaultValue={isReturn ? "05 Apr 2024" : ""}
              className={`w-full focus:outline-none font-bold text-[15px] p-0 border-0 bg-transparent ${!isReturn ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900'}`} 
            />
          </div>
        </div>

        {/* Tickets */}
        <div className="flex-1 flex flex-col border border-gray-200 rounded-xl px-4 py-2 hover:border-orange-300 transition-colors group cursor-pointer">
          <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 group-hover:text-orange-500 transition-colors">Tickets</span>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Ticket className="w-4 h-4 text-gray-400 mr-2" />
              <span className="font-bold text-gray-900 text-[15px]">1 Ticket</span>
            </div>
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="bg-[#CD6F1E] hover:bg-[#b8631b] text-white px-8 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-bold flex-shrink-0 lg:h-auto h-[56px] mt-2 lg:mt-0"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default TransportSearchBox;
