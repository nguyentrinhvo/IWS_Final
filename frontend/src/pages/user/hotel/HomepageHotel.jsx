import React, { useEffect } from 'react';
import HotelSearchBox from '../../../components/user/HotelSearchBox';
import PromoCard from '../../../components/user/PromoCard';
import AppDownloadBanner from '../../../components/user/AppDownloadBanner';
import DestinationGrid from '../../../components/user/DestinationGrid';
import ActivityList from '../../../components/user/ActivityList';
import RecommendationLinks from '../../../components/user/RecommendationLinks';

const HomepageHotel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const domesticHotels = [
    { title: 'Phu Quoc', flightsCount: '2,500+ Hotels', image: 'https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Da Lat', flightsCount: '1,800+ Hotels', image: 'https://images.unsplash.com/photo-1620959049103-6f345a9fc27c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Da Nang', flightsCount: '3,200+ Hotels', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Nha Trang', flightsCount: '2,100+ Hotels', image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800&q=80' },
    { title: 'Hoi An', flightsCount: '1,400+ Hotels', image: 'https://images.unsplash.com/photo-1613045618451-b846e4ceec9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Vung Tau', flightsCount: '900+ Hotels', image: 'https://images.unsplash.com/photo-1583344600645-ec0b9ca04473?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800&q=80' },
    { title: 'Hue', flightsCount: '750+ Hotels', image: 'https://images.unsplash.com/photo-1560662241-11d7c07ce2c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Sa Pa', flightsCount: '800+ Hotels', image: 'https://images.unsplash.com/photo-1601614948795-5f5647565e7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ];

  const internationalHotels = [
    { title: 'Singapore', flightsCount: '1,200+ Hotels', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
    { title: 'Bangkok', flightsCount: '4,500+ Hotels', image: 'https://images.unsplash.com/photo-1583491470869-d4677e11c5f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
    { title: 'Seoul', flightsCount: '2,800+ Hotels', image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
    { title: 'Tokyo', flightsCount: '5,000+ Hotels', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
    { title: 'Hong Kong', flightsCount: '1,500+ Hotels', image: 'https://images.unsplash.com/photo-1502693891783-6f81a7b1b369?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
    { title: 'Paris', flightsCount: '3,000+ Hotels', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
  ];

  const hotelActivities = [
    { category: 'Resort', title: 'Luxury Oceanfront Villa with Pool', location: 'Phu Quoc', price: 'VND 4,500,000', originalPrice: 'VND 5,200,000', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Boutique', title: 'Heritage House in Ancient Town', location: 'Hoi An', price: 'VND 1,200,000', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Business', title: 'Modern Executive Suite Downtown', location: 'Saigon', price: 'VND 2,100,000', image: 'https://images.unsplash.com/photo-1541339946196-5eb5b23a56f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Nature', title: 'Cloud View Bungalow in Hills', location: 'Sa Pa', price: 'VND 850,000', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
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
    {
      links: []
    }
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

        {/* Destinations Grid */}
        <DestinationGrid 
          title="Most popular hotel destinations" 
          subtitle="Discover our curated list of destinations with the best hotel options and exclusive rates." 
          destinations={domesticHotels} 
          layoutType="domestic"
          titleIcon={<svg className="w-6 h-6 text-[#1a2b49]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        
        <DestinationGrid 
          title="International Getaways" 
          subtitle="Explore the world and find your home away from home with HanuVivu." 
          destinations={internationalHotels} 
          layoutType="overseas"
          titleIcon={<svg className="w-6 h-6 text-[#1a2b49]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />

        {/* Featured Hotels */}
        <ActivityList 
          title="Featured Accommodations" 
          activities={hotelActivities} 
        />

        {/* Links */}
        <RecommendationLinks 
          groups={recommendationGroups} 
        />
      </div>
    </div>
  );
};

export default HomepageHotel;
