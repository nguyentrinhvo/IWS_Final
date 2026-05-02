import React, { useState } from 'react';

const HotelSearchBox = () => {
  const [guests, setGuests] = useState('2 Adults, 0 Children, 1 Room');

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
    <div className="relative w-full h-[500px] bg-cover bg-center flex flex-col justify-center items-center px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')", backgroundColor: "#2d5a8b" }}>
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-[54px] font-bold text-white mb-8 text-center drop-shadow-lg italic">
          Your Perfect Stay Awaits
        </h1>

        {/* Tab Pills */}
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg p-1.5 mb-4 flex overflow-x-auto hide-scrollbar max-w-full">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center px-4 md:px-6 py-2 rounded-full font-semibold text-[15px] transition-colors whitespace-nowrap ${
                tab.name === 'Hotels'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
              }`}
            >
              <span className={tab.name === 'Hotels' ? 'text-blue-600' : 'text-gray-500'}>
                {tab.icon}
              </span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Destination */}
            <div className="flex-[2] flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors">
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">City, hotel, or destination</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <input type="text" placeholder="Where are you going?" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent placeholder:text-gray-300" />
              </div>
            </div>

            {/* Dates */}
            <div className="flex-1 flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors">
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">Check-in</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input type="text" defaultValue="02 Apr 2024" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent" />
              </div>
            </div>

            <div className="flex-1 flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors">
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">Check-out</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input type="text" defaultValue="05 Apr 2024" className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent" />
              </div>
            </div>

            {/* Guests */}
            <div className="flex-[1.5] flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors">
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">Guests and Rooms</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="flex items-center justify-between w-full">
                  <input 
                    type="text" 
                    readOnly 
                    value={guests}
                    className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent cursor-pointer" 
                  />
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-[#CD6F1E] hover:bg-[#b8631b] w-full lg:w-16 h-[60px] rounded-xl shadow-md transition-colors flex items-center justify-center flex-shrink-0">
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

export default HotelSearchBox;
