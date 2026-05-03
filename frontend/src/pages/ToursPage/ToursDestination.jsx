import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { getTours } from '../../services/tourService';

const TravelIcon = () => (
  <svg 
    width="35px" 
    height="35px" 
    viewBox="0 0 64 64" 
    fill="currentColor"
    className="text-[#180B51]"
  >
    <g> 
      <title>travel</title> 
      <g> 
        <circle cx="4.5" cy="43.5" r="2.5" style={{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2px"}}></circle> 
        <path d="M10.027,26l-1.074.537a1.779,1.779,0,0,0-.8,2.387l5.432,10.864a1.778,1.778,0,0,1,.17,1.047l-.279,1.952a1.78,1.78,0,0,0,1.762,2.031h0a1.778,1.778,0,0,0,.987-.3l2.989-1.993a1.785,1.785,0,0,1,.987-.3h1.568a1.78,1.78,0,0,0,1.779-1.78v-.327a1.78,1.78,0,0,1,1.779-1.779h9.141a1.776,1.776,0,0,1,1.258.521L39.1,42.229v1.3h2.5a1.781,1.781,0,0,1,1.727,1.348l.621,3.78A1.78,1.78,0,0,0,45.665,50h2.692a1.781,1.781,0,0,0,1.592-.984l.311-.623a1.78,1.78,0,0,1,1.592-.983h1.753c.639,0,1.228-1.638,1.545-2.192l4.525-7.92a1.759,1.759,0,0,0,.2-.534l1.108-5.539a1.782,1.782,0,0,0-.2-1.232L56.27,22.1a1.777,1.777,0,0,0-.982-.8l-2.161-.72a1.779,1.779,0,0,1-1.205-1.492l-.415-3.735a1.78,1.78,0,0,0-.973-1.395l-.741-.37a1.781,1.781,0,0,1-.984-1.592V9.2H47.514l-3.038,5.063a1.779,1.779,0,0,1-2.322.676l-2.326-1.163a1.78,1.78,0,0,1-.893-2.154l.027-.08A1.78,1.78,0,0,0,37.274,9.2h-4.2a1.781,1.781,0,0,0-1.592.984l-1.46,2.92A1.78,1.78,0,0,1,28,14.035l-2.621-.655a1.775,1.775,0,0,0-1.355.205" style={{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2px"}}></path> 
        <circle cx="19.74" cy="51.987" r="1.069" fill="currentColor"></circle> 
        <line x1="31" y1="50" x2="31" y2="52" style={{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2px"}}></line> 
        <line x1="31" y1="56" x2="31" y2="58" style={{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2px"}}></line> 
        <line x1="27" y1="54" x2="29" y2="54" style={{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2px"}}></line> 
        <line x1="33" y1="54" x2="35" y2="54" style={{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2px"}}></line> 
        <path d="M45.1,54H48.9a.677.677,0,0,1,.606.98L48,59l-3.51-4.02A.677.677,0,0,1,45.1,54Z" style={{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2px"}}></path> 
        <path d="M15.781,5.326a7.844,7.844,0,0,0-7.747,7.936C8.034,17.645,15.781,28,15.781,28s7.747-10.355,7.747-14.738A7.843,7.843,0,0,0,15.781,5.326Zm0,11.953A4.018,4.018,0,1,1,19.7,13.262,3.97,3.97,0,0,1,15.781,17.279Z" style={{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2px"}}></path> 
        <path d="M47.781,22.326a7.844,7.844,0,0,0-7.747,7.936C40.034,34.645,47.781,45,47.781,45s7.747-10.355,7.747-14.738A7.843,7.843,0,0,0,47.781,22.326Zm0,11.953A4.018,4.018,0,1,1,51.7,30.262,3.97,3.97,0,0,1,47.781,34.279Z" style={{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2px"}}></path> 
      </g> 
    </g>
  </svg>
);

export default function ToursDestination() {
  const { t } = useGlobal();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const res = await getTours({ size: 100 });
        const tours = res.content || [];
        
        const counts = {};
        const images = {};
        tours.forEach(tour => {
          const loc = tour.destination || 'Vietnam';
          counts[loc] = (counts[loc] || 0) + 1;
          if (!images[loc]) images[loc] = tour.images?.[0]?.url;
        });

        const formatted = Object.keys(counts).map((loc, idx) => ({
          id: `dest-${idx}`,
          name: loc,
          count: counts[loc],
          image: images[loc] || 'https://picsum.photos/seed/dest/800/600'
        }));

        setDestinations(formatted);
      } catch (err) {
        console.error('Failed to fetch destinations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const handleDestinationClick = (name) => {
    navigate('/tours-booking', { 
      state: { tourDestination: name },
      replace: true
    });
  };

  if (loading || destinations.length === 0) return null;
  
  const largeItem = destinations[0];
  const smallItems = destinations.slice(1, 5);

  return (
    <section className="w-full flex flex-col gap-4 max-w-[1320px] mx-auto pt-8 md:pt-12 pb-4 mb-[50px] px-4 md:px-6">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center gap-3 flex-nowrap whitespace-nowrap">
          <TravelIcon />
          <h2 className="text-[#180B51] font-bold text-[25px]">
            {t('toursDestTitle')}
          </h2>
        </div>
        <p className="text-[#180B51] text-[16px] opacity-80 pl-1 max-w-full">
          {t('toursDestDesc')}
        </p>
      </div>

      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full min-h-[440px]"
      >
        {largeItem && (
          <div 
            onClick={() => handleDestinationClick(largeItem.name)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group hover:shadow-[0_0_15px_rgba(0,0,0,0.4)] transition-shadow duration-300 md:row-span-2"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${largeItem.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-0.5 pointer-events-none">
              <h3 className="text-white text-[24px] font-bold leading-tight truncate">
                {largeItem.name}
              </h3>
              <p className="text-white text-[16px] font-semibold hidden sm:block">
                {largeItem.count} {t('toursCountLabel')}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:col-span-2 gap-5">
          {smallItems.map((dest) => (
            <div 
              key={dest.id}
              onClick={() => handleDestinationClick(dest.name)}
              className="relative rounded-2xl overflow-hidden cursor-pointer h-[210px] group hover:shadow-[0_0_15px_rgba(0,0,0,0.4)] transition-shadow duration-300"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${dest.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-0.5 pointer-events-none">
                <h3 className="text-white text-[20px] md:text-[24px] font-bold leading-tight truncate">
                  {dest.name}
                </h3>
                <p className="text-white text-[14px] md:text-[16px] font-semibold hidden sm:block">
                  {dest.count} {t('toursCountLabel')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}