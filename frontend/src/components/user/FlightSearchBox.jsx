import React, { useState } from 'react';

const FlightSearchBox = () => {
  const [tripType, setTripType] = useState('One-way');
  const [directFlights, setDirectFlights] = useState(false);

  const tabs = [
    { name: 'Tours', icon: (
      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { name: 'Hotels', icon: (
      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )},
    { name: 'Flights', icon: (
      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    )},
    { name: 'Cars & Trains', icon: (
      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )},
    { name: 'Things to Do', icon: (
      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { name: 'More', icon: (
      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    )}
  ];

  return (
    <div className="relative w-full h-[500px] bg-cover bg-center flex flex-col justify-center items-center px-4" style={{ backgroundImage: "url('/images/flight-hero-bg.jpg')", backgroundColor: "#2d5a8b" }}>
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-[54px] font-bold text-white mb-8 text-center drop-shadow-lg italic">
          Your Trip Starts Here
        </h1>

        {/* Tab Pills */}
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg p-1.5 mb-4 flex overflow-x-auto hide-scrollbar max-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center px-4 md:px-6 py-2 rounded-full font-semibold text-[15px] transition-colors whitespace-nowrap ${
                tab.name === 'Flights'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              <span className={tab.name === 'Flights' ? 'text-blue-600' : 'text-gray-500'}>
                {tab.icon}
              </span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full">
          {/* Top Options Row */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-5">
            <div className="flex bg-gray-100 p-1 rounded-full">
              <button 
                onClick={() => setTripType('One-way')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${tripType === 'One-way' ? 'bg-[#7978E9] text-white shadow' : 'text-gray-600 hover:text-gray-900'}`}
              >
                One-way
              </button>
              <button 
                onClick={() => setTripType('Round-trip')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${tripType === 'Round-trip' ? 'bg-[#7978E9] text-white shadow' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Round-trip
              </button>
            </div>
            
            <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={directFlights}
                onChange={(e) => setDirectFlights(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
              />
              <span>Direct flights only</span>
            </label>

            <div className="flex items-center space-x-4 ml-auto">
              <button className="flex items-center text-sm text-gray-700 font-medium hover:text-gray-900">
                <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                1 Adult(s), 0 Child(ren), 0 Infant(s)
                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <button className="flex items-center text-sm text-gray-700 font-medium hover:text-gray-900">
                <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Economy
                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          </div>

          {/* Input Fields Row */}
          <div className="flex flex-col lg:flex-row gap-3 relative">
            <div className="flex-1 flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors">
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">From</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <div className="flex flex-col w-full">
                  <input type="text" defaultValue="Hanoi (HAN)" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent" />
                  <span className="text-[11px] text-gray-500 truncate">Noi Bai International Airport</span>
                </div>
              </div>
            </div>

            <button className="absolute top-1/2 left-[25%] lg:left-1/4 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-sm p-1.5 rounded-full hover:bg-gray-50 hidden lg:flex">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>

            <div className="flex-1 flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors">
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">To</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <div className="flex flex-col w-full">
                  <input type="text" defaultValue="Ho Chi Minh City (SGN)" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent" />
                  <span className="text-[11px] text-gray-500 truncate">Tan Son Nhat Airport</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors">
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">Departure Date</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input type="text" defaultValue="02 Apr 2024" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent" />
              </div>
            </div>

            <div className="flex-1 flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 bg-gray-50 opacity-70">
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">Return Date</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input type="text" disabled defaultValue="05 Apr 2024" className="w-full focus:outline-none font-bold text-gray-500 text-[15px] p-0 border-0 bg-transparent cursor-not-allowed" />
              </div>
            </div>

            <button className="bg-[#CD6F1E] hover:bg-[#b8631b] w-full lg:w-16 h-[60px] rounded-xl shadow-md transition-colors flex items-center justify-center flex-shrink-0 mt-auto">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchBox;
