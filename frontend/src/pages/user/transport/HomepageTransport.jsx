import React, { useEffect } from 'react';
import HeroBanner from '../../../components/user/HeroBanner';
import SearchTabs from '../../../components/user/SearchTabs';
import TransportSearchBox from '../../../components/user/TransportSearchBox';
import PromoCard from '../../../components/user/PromoCard';
import AppDownloadBanner from '../../../components/user/AppDownloadBanner';
import DestinationGrid from '../../../components/user/DestinationGrid';
import ActivityList from '../../../components/user/ActivityList';
import RecommendationLinks from '../../../components/user/RecommendationLinks';

const HomepageTransport = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Data reused from existing homepages for consistency
  const popularDestinations = [
    { title: 'Hanoi', flightsCount: '1,200+ Routes', image: 'https://images.unsplash.com/photo-1555944630-da23b9d107c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Saigon', flightsCount: '2,500+ Routes', image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Da Nang', flightsCount: '1,800+ Routes', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Sapa', flightsCount: '900+ Routes', image: 'https://images.unsplash.com/photo-1508804052314-11d867317ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Ha Giang', flightsCount: '600+ Routes', image: 'https://images.unsplash.com/photo-1599708153386-62e260909565?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Ninh Binh', flightsCount: '800+ Routes', image: 'https://images.unsplash.com/photo-1508233620467-f79f1e317a05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Hue', flightsCount: '750+ Routes', image: 'https://images.unsplash.com/photo-1560662241-11d7c07ce2c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Vung Tau', flightsCount: '500+ Routes', image: 'https://images.unsplash.com/photo-1583344600645-ec0b9ca04473?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  const nearbyGetaways = [
    { title: 'Phan Thiet', flightsCount: '450+ Routes', image: 'https://images.unsplash.com/photo-1560662241-11d7c07ce2c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Can Tho', flightsCount: '300+ Routes', image: 'https://images.unsplash.com/photo-1552011670-68847015b031?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Da Lat', flightsCount: '950+ Routes', image: 'https://images.unsplash.com/photo-1620959049103-6f345a9fc27c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Hoi An', flightsCount: '1,100+ Routes', image: 'https://images.unsplash.com/photo-1613045618451-b846e4ceec9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Quy Nhon', flightsCount: '600+ Routes', image: 'https://images.unsplash.com/photo-1606556108119-01c51bfbe2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Dong Hoi', flightsCount: '400+ Routes', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  const activitiesData = [
    { category: 'Transport', title: 'Luxury Limousine Hanoi - Sapa', location: 'Hanoi', price: 'VND 450,000', originalPrice: 'VND 500,000', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Transport', title: 'High-speed Train Ticket Saigon - Nha Trang', location: 'Saigon', price: 'VND 650,000', image: 'https://images.unsplash.com/photo-1474487056236-0529c99a78a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Transport', title: 'Private Car Transfer Airport - City Center', location: 'Da Nang', price: 'VND 250,000', image: 'https://images.unsplash.com/photo-1511704976891-620257e8d626?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Transport', title: 'Bus Ticket Hanoi - Hai Phong', location: 'Hanoi', price: 'VND 120,000', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ];

  const recommendationGroups = [
    {
      links: [
        { label: 'Bus Hanoi to Sapa', url: '#' },
        { label: 'Train Saigon to Da Nang', url: '#' },
        { label: 'Car rental in Da Lat', url: '#' },
        { label: 'Limousine Hanoi to Ninh Binh', url: '#' },
        { label: 'Ferry to Phu Quoc', url: '#' },
        { label: 'Bus Saigon to Mui Ne', url: '#' },
        { label: 'Private car in Hoi An', url: '#' },
      ]
    },
    {
      links: [
        { label: 'Train schedules Vietnam', url: '#' },
        { label: 'Sleeper bus bookings', url: '#' },
        { label: 'Luxury van rentals', url: '#' },
        { label: 'Airport shuttle services', url: '#' },
        { label: 'Motorbike rentals', url: '#' },
        { label: 'Cross-border bus routes', url: '#' },
        { label: 'VIP transport services', url: '#' },
      ]
    },
    {
      links: [
        { label: 'Top transport providers', url: '#' },
        { label: 'Student discounts on trains', url: '#' },
        { label: 'Group booking for buses', url: '#' },
        { label: 'Travel insurance for transport', url: '#' },
        { label: 'Refund and cancelation policy', url: '#' },
        { label: 'Track your train status', url: '#' },
        { label: 'Customer support 24/7', url: '#' },
      ]
    },
    {
      links: []
    }
  ];

  return (
    <main className="w-full flex flex-col items-center bg-gray-50/30 pb-20">
      <HeroBanner 
        title="Your Trip Starts Here" 
        backgroundImage="https://images.unsplash.com/photo-1474487056236-0529c99a78a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
      >
        <SearchTabs activeTab="Cars & Trains" />
        <TransportSearchBox />
      </HeroBanner>
      
      <div className="w-full max-w-[1200px] px-4 -mt-6 relative z-20">
        
        {/* PromotionCards Section */}
        <h2 className="text-xl font-bold text-[#1a2b49] mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Exclusive Transport Deals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <PromoCard 
            title="10% off!" 
            description="First Cars & Trains Booking" 
            code="HANUVIVU" 
            titleIcon={<svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          />
          <PromoCard 
            title="VND 50k off!" 
            description="Round-trip Train Bookings" 
            code="TRAINLOVE" 
            titleIcon={<svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10M8 5v12" /></svg>}
          />
          <PromoCard 
            title="Free Cancellation!" 
            description="Selected Bus Routes" 
            code="FLEXIBUS" 
            titleIcon={<svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
        </div>

        {/* AppDownloadBanner Section */}
        <div className="mb-10">
          <AppDownloadBanner />
        </div>

        {/* DestinationGrid Section */}
        <DestinationGrid 
          title="Popular Train & Bus Routes" 
          subtitle="Explore Vietnam's most beautiful routes by rail or road with our extensive network." 
          destinations={popularDestinations} 
          layoutType="domestic"
          titleIcon={<svg className="w-6 h-6 text-[#1a2b49]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>}
        />
        
        <DestinationGrid 
          title="Nearby Getaways" 
          subtitle="Quick and easy trips to escape the city for a weekend." 
          destinations={nearbyGetaways} 
          layoutType="overseas"
          titleIcon={<svg className="w-6 h-6 text-[#1a2b49]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />

        {/* ThingsToDoSection (using ActivityList) */}
        <ActivityList 
          title="Recommended Transport Services" 
          activities={activitiesData} 
        />

        {/* RecommendationSection (using RecommendationLinks) */}
        <RecommendationLinks 
          groups={recommendationGroups} 
        />
      </div>
    </main>
  );
};

export default HomepageTransport;
