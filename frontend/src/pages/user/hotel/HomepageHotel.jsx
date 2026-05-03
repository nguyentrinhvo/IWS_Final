import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelSearchBox from '../../../components/user/HotelSearchBox';
import PromoCard from '../../../components/user/PromoCard';
import AppDownloadBanner from '../../../components/user/AppDownloadBanner';
import DestinationGrid from '../../../components/user/DestinationGrid';
import RecommendationLinks from '../../../components/user/RecommendationLinks';
import { hotelService } from '../../../services/hotelService';

/* ─── Mini Hotel Card cho Featured section ─── */
const FeaturedHotelCard = ({ hotel, onClick }) => {
  const minPrice = hotel.roomTypes?.length
    ? Math.min(...hotel.roomTypes.map(r => r.pricePerNight || 0))
    : 0;
  const image =
    hotel.thumbnailUrl ||
    hotel.images?.[0]?.url ||
    hotel.images?.[0] ||
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80';
  const stars = hotel.starRating || 0;
  const rating = hotel.avgRating || 0;
  const location = [hotel.address, hotel.city].filter(Boolean).join(', ');

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x200?text=No+Image';
          }}
        />
        {stars > 0 && (
          <div className="absolute top-3 left-3 bg-amber-400/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {stars} Stars
          </div>
        )}
        {rating > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#1a2b49] text-xs font-bold px-2 py-1 rounded-lg">
            ⭐ {rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[#1a2b49] text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#7978E9] transition-colors">
          {hotel.name}
        </h3>
        {location && (
          <p className="text-[11px] text-gray-400 flex items-center gap-1 mb-3">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
        )}

        {/* Amenities tags */}
        {hotel.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {hotel.amenities.slice(0, 3).map((a, i) => (
              <span key={i} className="text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-tight">
                {a}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-gray-50 flex items-end justify-between">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">From / night</p>
            <p className="text-base font-black text-orange-500">
              {minPrice > 0
                ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(minPrice)
                : 'Liên hệ'}
            </p>
          </div>
          <span className="text-[10px] font-bold text-[#7978E9] bg-[#7978E9]/10 px-2 py-1 rounded-lg">
            Xem chi tiết →
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Page ─── */
const HomepageHotel = () => {
  const navigate = useNavigate();
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFeaturedHotels();
  }, []);

  const fetchFeaturedHotels = async () => {
    try {
      setLoadingFeatured(true);
      const data = await hotelService.getFeaturedHotels(0, 8);
      const hotels = (data.content || []).filter(h => h.isActive !== false);
      setFeaturedHotels(hotels);
    } catch (err) {
      console.error('Failed to load featured hotels:', err);
      setFeaturedHotels([]);
    } finally {
      setLoadingFeatured(false);
    }
  };

  // Static destination grids (thành phố cố định)
  const domesticHotels = [
    { title: 'Phú Quốc', flightsCount: '2,500+ Hotels', image: 'https://picsum.photos/seed/phuquoc/800/600' },
    { title: 'Đà Lạt', flightsCount: '1,800+ Hotels', image: 'https://picsum.photos/seed/dalat/400/300' },
    { title: 'Đà Nẵng', flightsCount: '3,200+ Hotels', image: 'https://picsum.photos/seed/danang/800/600' },
    { title: 'Nha Trang', flightsCount: '2,100+ Hotels', image: 'https://picsum.photos/seed/nhatrang/400/600' },
    { title: 'Hội An', flightsCount: '1,400+ Hotels', image: 'https://picsum.photos/seed/hoian/400/300' },
    { title: 'Vũng Tàu', flightsCount: '900+ Hotels', image: 'https://picsum.photos/seed/vungtau/400/600' },
    { title: 'Huế', flightsCount: '750+ Hotels', image: 'https://picsum.photos/seed/huecity/400/300' },
    { title: 'Sa Pa', flightsCount: '800+ Hotels', image: 'https://picsum.photos/seed/sapa/400/300' },
  ];

  const internationalHotels = [
    { title: 'Singapore', flightsCount: '1,200+ Hotels', image: 'https://picsum.photos/seed/singapore/800/400' },
    { title: 'Bangkok', flightsCount: '4,500+ Hotels', image: 'https://picsum.photos/seed/bangkok/800/400' },
    { title: 'Seoul', flightsCount: '2,800+ Hotels', image: 'https://picsum.photos/seed/seoul/800/400' },
    { title: 'Tokyo', flightsCount: '5,000+ Hotels', image: 'https://picsum.photos/seed/tokyo/800/400' },
    { title: 'Hong Kong', flightsCount: '1,500+ Hotels', image: 'https://picsum.photos/seed/hongkong/800/400' },
    { title: 'Paris', flightsCount: '3,000+ Hotels', image: 'https://picsum.photos/seed/paris/800/400' },
  ];

  const recommendationGroups = [
    {
      links: [
        { label: 'Hotels in Da Nang', url: '#' },
        { label: 'Hotels in Hanoi', url: '#' },
        { label: 'Hotels in Ho Chi Minh City', url: '#' },
        { label: 'Hotels in Phu Quoc', url: '#' },
        { label: 'Hotels in Nha Trang', url: '#' },
        { label: 'Hotels in Da Lat', url: '#' },
        { label: 'Hotels in Vung Tau', url: '#' },
      ]
    },
    {
      links: [
        { label: '5-star Hotels in Vietnam', url: '#' },
        { label: 'Resorts with Private Pool', url: '#' },
        { label: 'Budget Hotels for Solo Travelers', url: '#' },
        { label: 'Family Friendly Resorts', url: '#' },
        { label: 'Boutique Hotels in Hoi An', url: '#' },
        { label: 'Pet Friendly Accommodations', url: '#' },
        { label: 'Honeymoon Suites', url: '#' },
      ]
    },
    {
      links: [
        { label: 'Hotels in Bangkok', url: '#' },
        { label: 'Hotels in Singapore', url: '#' },
        { label: 'Hotels in Tokyo', url: '#' },
        { label: 'Hotels in Seoul', url: '#' },
        { label: 'Hotels in Taipei', url: '#' },
        { label: 'Hotels in Kuala Lumpur', url: '#' },
        { label: 'Hotels in Bali', url: '#' },
      ]
    },
    { links: [] }
  ];

  return (
    <div className="w-full flex flex-col items-center bg-gray-50/30 pb-20">
      <HotelSearchBox />

      <div className="w-full max-w-[1200px] px-4 -mt-6 relative z-20">

        {/* Promos Title */}
        <h2 className="text-xl font-bold text-[#1a2b49] mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Exclusive Hotel Deals
        </h2>

        {/* Promos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <PromoCard
            title="15% off!"
            description="First Hotel Booking"
            code="STAYWITHUS"
            titleIcon={<svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
          />
          <PromoCard
            title="VND 500k off!"
            description="Luxury Resorts above 5M"
            code="LUXURYSTAY"
            titleIcon={<svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
          />
          <PromoCard
            title="Free Breakfast!"
            description="Selected Domestic Hotels"
            code="MORNINGVIBE"
            titleIcon={<svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          />
        </div>

        {/* App Download Banner */}
        <div className="mb-10">
          <AppDownloadBanner />
        </div>

        {/* Destinations Grid – Domestic */}
        <DestinationGrid
          title="Most popular hotel destinations"
          subtitle="Discover our curated list of destinations with the best hotel options and exclusive rates."
          destinations={domesticHotels}
          layoutType="domestic"
          titleIcon={<svg className="w-6 h-6 text-[#1a2b49]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />

        {/* Destinations Grid – International */}
        <DestinationGrid
          title="International Getaways"
          subtitle="Explore the world and find your home away from home with HanuVivu."
          destinations={internationalHotels}
          layoutType="overseas"
          titleIcon={<svg className="w-6 h-6 text-[#1a2b49]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />

        {/* Featured Hotels — từ database */}
        <div className="py-6 mt-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1a2b49] flex items-center mb-1">
              <svg className="w-5 h-5 mr-2 text-[#1a2b49]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Featured Accommodations
            </h2>
            <p className="text-sm text-gray-600">Các khách sạn được đề xuất từ cơ sở dữ liệu của chúng tôi.</p>
          </div>

          {loadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-44 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-5 bg-gray-200 rounded w-2/3 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredHotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredHotels.map(hotel => (
                <FeaturedHotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onClick={() => navigate(`/hotels/detail/${hotel.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
              <p className="text-gray-400 font-medium">Chưa có khách sạn nổi bật. Hãy thêm dữ liệu vào database.</p>
            </div>
          )}

          {featuredHotels.length > 0 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate('/hotels/search')}
                className="bg-[#7978E9] hover:bg-[#6665d0] text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                Xem tất cả khách sạn
              </button>
            </div>
          )}
        </div>

        {/* Links */}
        <RecommendationLinks groups={recommendationGroups} />
      </div>
    </div>
  );
};

export default HomepageHotel;
