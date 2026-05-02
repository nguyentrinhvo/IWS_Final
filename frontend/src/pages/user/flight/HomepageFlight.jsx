import React, { useEffect } from 'react';
import FlightSearchBox from '../../../components/user/FlightSearchBox';
import PromoCard from '../../../components/user/PromoCard';
import AppDownloadBanner from '../../../components/user/AppDownloadBanner';
import DestinationGrid from '../../../components/user/DestinationGrid';
import ActivityList from '../../../components/user/ActivityList';
import RecommendationLinks from '../../../components/user/RecommendationLinks';

const HomepageFlight = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const domesticDestinations = [
    { title: 'Phu Quoc', flightsCount: '1,200', image: 'https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Da Lat', flightsCount: '950', image: 'https://images.unsplash.com/photo-1620959049103-6f345a9fc27c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Da Nang', flightsCount: '2,100', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Nha Trang', flightsCount: '1,400', image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800&q=80' },
    { title: 'Quy Nhon', flightsCount: '600', image: 'https://images.unsplash.com/photo-1606556108119-01c51bfbe2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Vung Tau', flightsCount: '500', image: 'https://images.unsplash.com/photo-1583344600645-ec0b9ca04473?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800&q=80' },
    { title: 'Phan Thiet', flightsCount: '450', image: 'https://images.unsplash.com/photo-1560662241-11d7c07ce2c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Phu Yen', flightsCount: '300', image: 'https://images.unsplash.com/photo-1601614948795-5f5647565e7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ];

  const overseasDestinations = [
    { title: 'Singapore', flightsCount: '1,800', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
    { title: 'Bangkok', flightsCount: '2,500', image: 'https://images.unsplash.com/photo-1583491470869-d4677e11c5f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
    { title: 'Seoul', flightsCount: '1,100', image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
    { title: 'Tokyo', flightsCount: '900', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
    { title: 'Shanghai', flightsCount: '2,100', image: 'https://images.unsplash.com/photo-1502693891783-6f81a7b1b369?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
    { title: 'Maldives', flightsCount: '400', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80' },
  ];

  const activitiesData = [
    { category: 'Attraction', title: 'Sun World Ba Na Hills Ticket', location: 'Da Nang', price: 'VND 850,000', originalPrice: 'VND 900,000', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Attraction', title: 'VinWonders Phu Quoc Theme Park', location: 'Phu Quoc', price: 'VND 950,000', image: 'https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Attraction', title: 'VinKE & Aquarium Times City', location: 'Hanoi', price: 'VND 250,000', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { category: 'Attraction', title: 'Thang Long Water Puppet Show Ticket', location: 'Hanoi', price: 'VND 200,000', image: 'https://images.unsplash.com/photo-1583344600645-ec0b9ca04473?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ];

  const recommendationGroups = [
    {
      links: [
        { label: 'About flights Hanoi - Da Nang', url: '#' },
        { label: 'About flights Thanh Hoa - Saigon', url: '#' },
        { label: 'About flight destination prices', url: '#' },
        { label: 'About flights Da Nang - Saigon', url: '#' },
        { label: 'About flights Hai Phong - Da Nang', url: '#' },
        { label: 'About flights to Thailand', url: '#' },
        { label: 'About flights Saigon - Hanoi', url: '#' },
      ]
    },
    {
      links: [
        { label: 'About flights Hue - Hanoi', url: '#' },
        { label: 'About flights to Japan', url: '#' },
        { label: 'About flights Da Nang - Hanoi', url: '#' },
        { label: 'About flights Da Lat - Saigon', url: '#' },
        { label: 'About flights to Australia', url: '#' },
        { label: 'About flights Hanoi - Da Lat', url: '#' },
        { label: 'About flights to Hanoi', url: '#' },
      ]
    },
    {
      links: [
        { label: 'About flights to South Korea', url: '#' },
        { label: 'About flights Vinh - Saigon', url: '#' },
        { label: 'About flights to Da Lat', url: '#' },
        { label: 'About flights to Da Nang', url: '#' },
        { label: 'About flights Hanoi - Nha Trang', url: '#' },
        { label: 'About flights to Da Nang', url: '#' },
        { label: 'About flights to Germany', url: '#' },
      ]
    },
    {
      links: []
    }
  ];

  return (
    <div className="w-full flex flex-col items-center bg-gray-50/30 pb-20">
      <FlightSearchBox />
      
      <div className="w-full max-w-[1200px] px-4 -mt-6 relative z-20">
        
        {/* Promos Title */}
        <h2 className="text-xl font-bold text-[#1a2b49] mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          New user exclusive
        </h2>

        {/* Promos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <PromoCard 
            title="5% off!" 
            description="First Flight Booking" 
            code="HANUVIVU" 
            titleIcon={<svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          />
          <PromoCard 
            title="10% off!" 
            description="First Cars & Trains Booking" 
            code="HANUVIVU" 
            titleIcon={<svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          />
          <PromoCard 
            title="5% off!" 
            description="First Hotels Booking" 
            code="HANUVIVU" 
            titleIcon={<svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          />
        </div>

        {/* App Download Banner */}
        <div className="mb-10">
          <AppDownloadBanner />
        </div>

        {/* Destinations Grid */}
        <DestinationGrid 
          title="Get inspired for your next trip" 
          subtitle="Choose one of the popular most destinations below to discover our exclusive tours at incredibly reasonable prices." 
          destinations={domesticDestinations} 
          layoutType="domestic"
          titleIcon={<svg className="w-6 h-6 text-[#1a2b49]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        
        <DestinationGrid 
          title="Favorite overseas destination" 
          subtitle="The world is vast. The whole world is my home." 
          destinations={overseasDestinations} 
          layoutType="overseas"
          titleIcon={<svg className="w-6 h-6 text-[#1a2b49]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />

        {/* Things To Do */}
        <ActivityList 
          title="Things to Do" 
          activities={activitiesData} 
        />

        {/* Links */}
        <RecommendationLinks 
          groups={recommendationGroups} 
        />
      </div>
    </div>
  );
};

export default HomepageFlight;
