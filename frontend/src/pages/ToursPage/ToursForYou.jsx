import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { getTours } from '../../services/tourService';

const TourIcon = () => (
  <svg
    width="40px"
    height="40px"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="text-[#180B51]"
  >
    <path d="M149 24.32L123 124.4l27.8 44.8 15.9-29.4 37.5 30.9 17.5-55.5zm169.7 43.7l-32.2 48.38 10.7 25.5 21.9-21.7 18.1 42.8 10.3-21.7zm-83.4 64.18l-21.9 69.3-41.3-33.9L152 205l-35.2-56.7-88.38 339.4H154.9c45.6-17 135.3-56.7 137.2-106.3 1.7-47.8-108.9-43.4-110.8-91.2-1.5-39.1 84.5-81.5 84.5-81.5s-54.1 43.3-47.4 71c12.9 53 125.6 27.6 143.2 79.3 13 38.2-33.5 104.3-52.2 128.7h174.2L356.5 164.3 336.4 207l-23.5-55.4-22.1 21.9-16.3-39.1-17 25.5z" />
  </svg>
);

const ExploreIcon = () => (
  <svg fill="currentColor" width="20px" height="20px" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
  </svg>
);

const SliderArrowLeft = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SliderArrowRight = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ToursForYou = () => {
  const { t, language, currency, rates } = useGlobal();
  const navigate = useNavigate();
  const [toursByRegion, setToursByRegion] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRefs = useRef([]);
  const cardRefs = useRef([]);
  const [scrollStates, setScrollStates] = useState([]);

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTours({ size: 12 });
      const tours = res.content || [];
      
      const grouped = {};
      tours.forEach(tour => {
        const loc = tour.destination || 'Vietnam';
        if (!grouped[loc]) grouped[loc] = [];
        grouped[loc].push(tour);
      });

      const formattedData = Object.keys(grouped).map((loc, idx) => ({
        id: `region-${idx}`,
        locationName: loc,
        image: grouped[loc][0].images?.[0]?.url || 'https://picsum.photos/seed/loc/800/600',
        tours: grouped[loc]
      }));

      setToursByRegion(formattedData);
    } catch (error) {
      console.error('Failed to fetch tours for you:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const handleLocationClick = (locationName) => {
    navigate('/tours-booking', { 
      state: { tourDestination: locationName },
      replace: true
    });
  };

  const handleTourClick = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  const getPrice = (priceVnd) => {
    if (currency === 'VND' || !rates || !rates.VND) {
      const formattedNumber = new Intl.NumberFormat(language === 'VI' ? 'vi-VN' : 'en-US').format(priceVnd);
      return `${formattedNumber} VND`;
    }
    const converted = priceVnd / rates.VND;
    const formattedNumber = new Intl.NumberFormat(language === 'VI' ? 'vi-VN' : 'en-US', {
      maximumFractionDigits: 0
    }).format(converted);
    return `${formattedNumber} ${currency}`;
  };

  const updateScrollState = useCallback((rowIndex) => {
    const container = sliderRefs.current[rowIndex];
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const canScrollLeft = scrollLeft > 0;
    const canScrollRight = scrollLeft < maxScrollLeft - 1;
    setScrollStates(prev => {
      const newStates = [...prev];
      newStates[rowIndex] = { canScrollLeft, canScrollRight };
      return newStates;
    });
  }, []);

  const scrollToCard = (rowIndex, direction) => {
    const container = sliderRefs.current[rowIndex];
    if (!container) return;
    const cards = cardRefs.current[rowIndex] || [];
    if (cards.length === 0) return;
    const currentScroll = container.scrollLeft;
    let targetScroll = currentScroll;

    if (direction === 'right') {
      const nextCard = cards.find(card => card && card.offsetLeft > currentScroll + 1);
      if (nextCard) targetScroll = nextCard.offsetLeft;
    } else if (direction === 'left') {
      const previousCards = cards.filter(card => card && card.offsetLeft < currentScroll - 1);
      targetScroll = previousCards.length > 0 ? previousCards[previousCards.length - 1].offsetLeft : 0;
    }

    if (targetScroll !== currentScroll) {
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      setTimeout(() => updateScrollState(rowIndex), 300);
    }
  };

  useEffect(() => {
    if (toursByRegion.length === 0) return;
    
    toursByRegion.forEach((_, idx) => {
      const container = sliderRefs.current[idx];
      if (container) {
        const handleScroll = () => updateScrollState(idx);
        container.addEventListener('scroll', handleScroll);
        container._scrollHandler = handleScroll;
        updateScrollState(idx);
      }
    });

    return () => {
      toursByRegion.forEach((_, idx) => {
        const container = sliderRefs.current[idx];
        if (container && container._scrollHandler) {
          container.removeEventListener('scroll', container._scrollHandler);
        }
      });
    };
  }, [toursByRegion, updateScrollState]);

  if (loading) return <div className="py-20 text-center font-bold text-[#180B51]">Loading Tours...</div>;
  if (toursByRegion.length === 0) return null;

  return (
    <div className="w-full max-w-[1320px] mx-auto py-8 md:py-12 px-4 md:px-6 overflow-visible">
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-3 flex-nowrap mb-2">
          <TourIcon />
          <h2 className="text-2xl md:text-3xl font-bold text-[#180B51] break-words">
            {t('toursForYouTitle')}
          </h2>
        </div>
        <p className="text-[#180B51] opacity-80 break-words">
          {t('toursForYouDesc')}
        </p>
      </div>

      <div className="flex flex-col gap-8 md:gap-10 overflow-visible">
        {toursByRegion.map((row, rowIndex) => (
          <div key={row.id} className="flex flex-col md:flex-row w-full gap-6 overflow-visible">
            {/* Left side - Location card */}
            <div 
              onClick={() => handleLocationClick(row.locationName)}
              className="w-full md:w-1/4 h-[280px] md:h-[450px] shrink-0 relative rounded-xl overflow-hidden group cursor-pointer z-0"
            >
              <img 
                src={row.image} 
                alt={row.locationName} 
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:brightness-[0.65]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 line-clamp-2 break-words">
                  {row.locationName}
                </h3>
                <button className="flex items-center gap-2 border-2 border-white text-white bg-transparent px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold transition-colors duration-300 group-hover:bg-white group-hover:text-black whitespace-nowrap cursor-pointer">
                  <span>{t('explore')}</span>
                  <ExploreIcon />
                </button>
              </div>
            </div>

            {/* Right side - Tour slider */}
            <div className="w-full md:w-3/4 relative overflow-visible">
              <div 
                ref={el => sliderRefs.current[rowIndex] = el}
                className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-visible scroll-smooth pt-4 -mt-4 pb-6 -mb-4 hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {row.tours.map((tour, cardIndex) => (
                  <div 
                    key={tour.id} 
                    ref={el => {
                      if (!cardRefs.current[rowIndex]) cardRefs.current[rowIndex] = [];
                      cardRefs.current[rowIndex][cardIndex] = el;
                    }}
                    onClick={() => handleTourClick(tour.id)}
                    className="w-[85vw] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] shrink-0 h-[420px] md:h-[450px] border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2 hover:z-20 relative flex flex-col cursor-pointer"
                  >
                    <img 
                      src={tour.images?.[0]?.url || 'https://picsum.photos/seed/tour/800/600'} 
                      alt={tour.nameVi} 
                      className="w-full h-[160px] object-cover rounded-t-xl" 
                    />
                    
                    <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200 break-words">
                          {tour.nameVi}
                        </h4>
                        <div className="flex items-center gap-1 text-sm flex-wrap">
                          <span className="font-bold text-black">{tour.avgRating || 4.5}</span>
                          <span className="text-gray-600">/ 5</span>
                          <span className="text-gray-400 ml-1">({tour.totalReviews || 0} {t('reviews')})</span>
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 mt-2 line-clamp-1 break-words">
                          {tour.destination}
                        </div>
                      </div>

                      <div className="pt-4 mt-auto">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-gray-400 text-xs md:text-sm whitespace-nowrap">{t('fromPriceText')}</span>
                          <span className="font-bold text-lg md:text-xl text-black break-words">
                            {getPrice(tour.priceAdult)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {scrollStates[rowIndex]?.canScrollLeft && (
                <button 
                  onClick={() => scrollToCard(rowIndex, 'left')}
                  className="absolute left-[-20px] md:left-[-24px] top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all z-20 cursor-pointer"
                >
                  <SliderArrowLeft />
                </button>
              )}

              {scrollStates[rowIndex]?.canScrollRight && (
                <button 
                  onClick={() => scrollToCard(rowIndex, 'right')}
                  className="absolute right-[-20px] md:right-[-24px] top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-all z-20 cursor-pointer"
                >
                  <SliderArrowRight />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ToursForYou;