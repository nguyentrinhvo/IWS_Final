import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hotelService } from '../../services/hotelService';

const HotelSearchBox = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const destRef = useRef(null);
  
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  
  // Guests & Rooms state
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const guestsRef = useRef(null);

  // Fetch suggestions from DB
  useEffect(() => {
    if (!destination.trim() || destination.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await hotelService.searchHotels(destination, null, null, null, 0, 5);
        // Map hotels and unique cities
        const hotels = (data.content || []).map(h => ({
          id: h.id,
          name: h.name,
          region: h.city,
          type: 'hotel',
          image: h.thumbnailUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=100&h=100'
        }));
        setSuggestions(hotels);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [destination]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (destRef.current && !destRef.current.contains(event.target)) {
        setIsDestOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target)) {
        setIsGuestsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const city = destination.trim() || 'Hà Nội';
    setIsDestOpen(false);
    setIsGuestsOpen(false);
    navigate('/hotels/search', {
      state: {
        location: city,
        city: city,
        checkIn,
        checkOut,
        guests: `${guests.adults} Adults, ${guests.children} Children, ${guests.rooms} Room`,
      }
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const updateGuests = (type, delta) => {
    setGuests(prev => {
      const next = { ...prev, [type]: Math.max(type === 'adults' || type === 'rooms' ? 1 : 0, prev[type] + delta) };
      return next;
    });
  };

  return (
    <div
      className="relative w-full h-[500px] bg-cover bg-center flex flex-col justify-center items-center px-4 z-[40]"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        backgroundColor: "#2d5a8b"
      }}
    >
      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-[54px] font-bold text-white mb-8 text-center drop-shadow-lg italic">
          Your Perfect Stay Awaits
        </h1>


        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full relative z-50">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Destination */}
            <div 
              ref={destRef}
              className="flex-[2] flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors focus-within:border-blue-500 bg-white"
            >
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">City, hotel, or destination</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={destination}
                  onFocus={() => setIsDestOpen(true)}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setIsDestOpen(true);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent placeholder:text-gray-300"
                />
              </div>

              {/* Suggestions Dropdown */}
              {isDestOpen && (suggestions.length > 0 || loading) && (
                <div className="absolute top-[110%] left-0 w-full min-w-[350px] bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] overflow-hidden">
                  <div className="p-4">
                    <h4 className="text-[11px] font-bold text-[#007BFF] uppercase mb-3 tracking-wider">
                      {loading ? 'Searching...' : 'Database Suggestions'}
                    </h4>
                    <div className="flex flex-col gap-1">
                      {suggestions.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setDestination(item.name);
                            setIsDestOpen(false);
                          }}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 cursor-pointer transition-all group"
                        >
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-12 h-12 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-transform" 
                          />
                          <div className="flex flex-col">
                            <span className="text-[#180B51] font-bold text-sm">{item.name}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] text-gray-400 font-medium">{item.region}</span>
                              <span className="w-1 h-1 bg-gray-300 rounded-full" />
                              <span className="text-[11px] text-[#7978E9] font-bold capitalize">{item.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Check-in */}
            <div className="flex-1 flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors focus-within:border-blue-500 bg-white">
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">Check-in</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="flex-1 flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors focus-within:border-blue-500 bg-white">
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">Check-out</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full focus:outline-none font-bold text-gray-900 text-[15px] p-0 border-0 bg-transparent"
                />
              </div>
            </div>

            {/* Guests */}
            <div 
              ref={guestsRef}
              className="flex-[1.5] flex flex-col relative border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 transition-colors bg-white cursor-pointer"
              onClick={() => setIsGuestsOpen(!isGuestsOpen)}
            >
              <span className="text-[11px] text-gray-500 font-medium mb-0.5">Guests and Rooms</span>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="w-full font-bold text-gray-900 text-[15px] truncate">
                  {guests.adults} Adults, {guests.children} Children, {guests.rooms} Room
                </span>
              </div>

              {/* Guests Dropdown */}
              {isGuestsOpen && (
                <div 
                  className="absolute top-[110%] left-0 w-full min-w-[280px] bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">Adults</span>
                        <span className="text-[10px] text-gray-400">Age 13+</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateGuests('adults', -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">-</button>
                        <span className="font-bold text-sm w-4 text-center">{guests.adults}</span>
                        <button onClick={() => updateGuests('adults', 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">+</button>
                      </div>
                    </div>
                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">Children</span>
                        <span className="text-[10px] text-gray-400">Age 0-12</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateGuests('children', -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">-</button>
                        <span className="font-bold text-sm w-4 text-center">{guests.children}</span>
                        <button onClick={() => updateGuests('children', 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">+</button>
                      </div>
                    </div>
                    {/* Rooms */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">Rooms</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateGuests('rooms', -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">-</button>
                        <span className="font-bold text-sm w-4 text-center">{guests.rooms}</span>
                        <button onClick={() => updateGuests('rooms', 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">+</button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsGuestsOpen(false)}
                    className="w-full mt-4 bg-[#7978E9] text-white font-bold py-2 rounded-lg text-sm shadow-md"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-[#CD6F1E] hover:bg-[#b8631b] w-full lg:w-16 h-[60px] rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center flex-shrink-0"
            >
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
