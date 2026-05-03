import React, { useState, useEffect, useRef } from 'react';
import {
  AttractionsIcon,
  SpaRelaxationIcon,
  RecreationalSportsIcon,
  GamesActivitiesIcon,
  TransportsIcon,
  CulinaryExperiencesIcon,
  PlaygroundIcon,
  EventsIcon,
  HotelsIcon,
  FlightsIcon,
  ToursIcon
} from './SearchIcons';
import { attractionService } from '../../services/attractionService';
import { useNavigate } from 'react-router-dom';

const ThingsToDoSearch = ({ t, locale }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [dbSuggestions, setDbSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const suggestRef = useRef(null);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setDbSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await attractionService.searchAttractions({ keyword: query, page: 0, size: 5 });
        const results = (data.content || []).map(a => ({
          id: a.id,
          label: a.nameVi || a.nameEn,
          location: a.city,
          image: a.thumbnailUrl || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=100&h=100'
        }));
        setDbSuggestions(results);
      } catch (error) {
        console.error('Failed to fetch attractions:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestRef.current && !suggestRef.current.contains(event.target)) {
        setIsSuggestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const thingsToDoSuggestions = [
    { id: 'attractions', label: t('attractions'), icon: 'attractions' },
    { id: 'spaRelaxation', label: t('spaRelaxation'), icon: 'spaRelaxation' },
    { id: 'hotels', label: t('hotels'), icon: 'hotels' },
    { id: 'flights', label: t('flights'), icon: 'flights' },
    { id: 'tours', label: t('tours'), icon: 'tours' },
    { id: 'recreationalSports', label: t('recreationalSports'), icon: 'recreationalSports' },
    { id: 'gamesActivities', label: t('gamesActivities'), icon: 'gamesActivities' },
    { id: 'transports', label: t('transports'), icon: 'transports' },
    { id: 'travelEssential', label: t('travelEssential'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /> },
    { id: 'culinaryExperiences', label: t('culinaryExperiences'), icon: 'culinaryExperiences' },
  ];

  const renderSuggestionIcon = (icon) => {
    if (typeof icon === 'string') {
      switch (icon) {
        case 'attractions': return <AttractionsIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        case 'spaRelaxation': return <SpaRelaxationIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        case 'recreationalSports': return <RecreationalSportsIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        case 'gamesActivities': return <GamesActivitiesIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        case 'transports': return <TransportsIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        case 'culinaryExperiences': return <CulinaryExperiencesIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        case 'playground': return <PlaygroundIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        case 'events': return <EventsIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        case 'hotels': return <HotelsIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        case 'flights': return <FlightsIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        case 'tours': return <ToursIcon className="w-[1.2em] h-[1.2em] text-[#CC8118]" />;
        default: return null;
      }
    }
    return (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-[1.2em] h-[1.2em] text-[#CC8118]">
        {icon}
      </svg>
    );
  };

  return (
    <div className="w-full xl:w-[1403px] xl:mx-auto mt-[67px] flex flex-col relative z-10">
      <div className="flex w-full gap-4 h-[73px]">
        <div ref={suggestRef} className="things_to_do_input_wrapper flex-1 border-[5px] border-[#D9D9D9] rounded-xl flex relative bg-white">
          <div className="flex-1 h-full flex items-center px-4 gap-4 relative">
            <svg className="w-8 h-8 text-[#180B51] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={query}
              onFocus={() => setIsSuggestOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsSuggestOpen(true);
              }}
              placeholder={t('thingsToDoPlaceholder')}
              className="w-full h-full bg-transparent outline-none text-[#180B51] text-lg font-medium placeholder-[#180B51]/20"
            />
          </div>

          {/* Suggestions Dropdown */}
          {isSuggestOpen && (dbSuggestions.length > 0 || loading) && (
            <div className="absolute top-[110%] left-0 w-full z-50 bg-white border border-[#D9D9D9] rounded-xl shadow-xl overflow-hidden transition-all duration-300">
              <div className="p-4">
                <h4 className="text-[11px] font-bold text-[#CC8118] uppercase mb-3 tracking-wider">
                  {loading ? 'Searching...' : 'Attractions & Places'}
                </h4>
                <div className="flex flex-col gap-1">
                  {dbSuggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setQuery(item.label);
                        setIsSuggestOpen(false);
                      }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-orange-50 cursor-pointer transition-all group"
                    >
                      <img 
                        src={item.image} 
                        alt={item.label} 
                        className="w-12 h-12 rounded-lg object-cover shadow-sm group-hover:scale-105 transition-transform" 
                      />
                      <div className="flex flex-col">
                        <span className="text-[#180B51] font-bold text-sm">{item.label}</span>
                        <span className="text-[11px] text-gray-400 font-medium">{item.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div 
            onClick={() => navigate('/things-to-do')}
            className="w-[65px] h-full bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-r-lg shrink-0 transition-colors hover:bg-[#b57215]"
          >
            <svg className="w-7 h-7 text-white font-bold" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>

        <div className="discover_ideas_btn h-[73px] bg-white border-[1px] border-black rounded-full flex items-center px-6 cursor-pointer shrink-0 min-w-fit gap-2 hover:bg-gray-50 transition-colors">
          <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <span className="text-[#180B51] font-bold whitespace-nowrap text-[16px]">{t('discoverIdeas')}</span>
          <svg className="w-5 h-5 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>

      <div className="things_to_do_suggestions mt-[30px] flex flex-col items-center w-full">
        <h3 className="text-[#180B51] text-[16px] font-bold mb-4">{t('unlockExperienceTitle')}</h3>
        <div className="flex flex-wrap justify-center gap-2.5 max-w-full md:max-w-[1000px] mx-auto">
          {thingsToDoSuggestions.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D9D9D9] text-[#180B51] font-bold cursor-pointer hover:bg-[#c0c0c0] transition-colors border border-transparent"
            >
              {renderSuggestionIcon(s.icon)}
              <span className="text-[14px] whitespace-nowrap">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThingsToDoSearch;
