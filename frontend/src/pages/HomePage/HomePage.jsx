import React from 'react';
import SearchHomepage from './SearchHomepage';
import NewUserExclusive from './NewUserExclusive';
import PopularDestinations from './PopularDestinations';
import OverseasDestinations from './OverseasDestinations';
import SuggestionThings from './SuggestionThings';
import Recommendations from './Recommendations';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export default function HomePage() {
  const location = useLocation();
  const { setIsLoginModalOpen } = useAuth();

  useEffect(() => {
    if (location.state?.requireLogin) {
      setIsLoginModalOpen(true);
    }
  }, [location.state, setIsLoginModalOpen]);

  return (
    <div className="w-full flex flex-col mb-20">
      <SearchHomepage />

      <div className="w-full max-w-[1320px] mx-auto px-[16px] md:px-[24px] xl:px-0 flex flex-col gap-12">
        <NewUserExclusive />
        <PopularDestinations />
        <OverseasDestinations />
        <SuggestionThings />
        <Recommendations />
      </div>
    </div>
  );
}