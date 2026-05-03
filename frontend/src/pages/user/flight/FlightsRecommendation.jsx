import React, { useState } from 'react';

const RecommendationIcon = () => (
  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H6C4.34 2 3 3.33 3 4.97V15.88C3 17.52 4.34 18.85 6 18.85H6.76C7.56 18.85 8.32 19.16 8.88 19.72L10.59 21.41C11.37 22.18 12.64 22.18 13.42 21.41L15.13 19.72C15.69 19.16 16.46 18.85 17.25 18.85H18C19.66 18.85 21 17.52 21 15.88V4.97C21 3.33 19.66 2 18 2ZM16.68 10.5L15.51 14.06C15.36 14.65 14.73 15.13 14.09 15.13H12.24C11.92 15.13 11.47 15.02 11.27 14.82L9.8 13.67C9.77 14.31 9.48 14.58 8.77 14.58H8.29C7.55 14.58 7.25 14.29 7.25 13.59V8.82C7.25 8.12 7.55 7.83 8.29 7.83H8.78C9.52 7.83 9.82 8.12 9.82 8.82V9.18L11.76 6.3C11.96 5.99 12.47 5.77 12.9 5.94C13.37 6.1 13.67 6.62 13.57 7.08L13.33 8.64C13.3 8.77 13.33 8.91 13.42 9C13.5 9.09 13.62 9.15 13.75 9.15H15.7C16.08 9.15 16.4 9.3 16.59 9.57C16.77 9.83 16.8 10.16 16.68 10.5Z" fill="#180B51" />
  </svg>
);

const popularRoutesList = [
  "Hanoi (HAN) to Ho Chi Minh City (SGN)",
  "Da Nang (DAD) to Ho Chi Minh City (SGN)",
  "Hanoi (HAN) to Da Nang (DAD)",
  "Ho Chi Minh City (SGN) to Phu Quoc (PQC)",
  "Hanoi (HAN) to Phu Quoc (PQC)",
  "Da Nang (DAD) to Hanoi (HAN)",
  "Ho Chi Minh City (SGN) to Da Lat (DLI)",
  "Hanoi (HAN) to Nha Trang (CXR)",
  "Ho Chi Minh City (SGN) to Nha Trang (CXR)",
  "Hanoi (HAN) to Hue (HUI)",
  "Ho Chi Minh City (SGN) to Hanoi (HAN)",
  "Da Nang (DAD) to Phu Quoc (PQC)",
  "Hanoi (HAN) to Da Lat (DLI)",
  "Ho Chi Minh City (SGN) to Hue (HUI)",
  "Hanoi (HAN) to Thanh Hoa (THD)",
  "Ho Chi Minh City (SGN) to Thanh Hoa (THD)",
  "Da Nang (DAD) to Nha Trang (CXR)",
  "Hanoi (HAN) to Hai Phong (HPH)",
  "Ho Chi Minh City (SGN) to Hai Phong (HPH)",
  "Hanoi (HAN) to Vinh (VII)"
];

const popularDestinationsList = [
  "Ho Chi Minh City (SGN)",
  "Hanoi (HAN)",
  "Da Nang (DAD)",
  "Phu Quoc (PQC)",
  "Nha Trang (CXR)",
  "Da Lat (DLI)",
  "Hue (HUI)",
  "Hai Phong (HPH)",
  "Thanh Hoa (THD)",
  "Vinh (VII)",
  "Quy Nhon (UIH)",
  "Tuy Hoa (TBB)",
  "Buon Ma Thuot (BMV)",
  "Pleiku (PXU)",
  "Chu Lai (VCL)",
  "Rach Gia (VKG)",
  "Ca Mau (CAH)",
  "Con Dao (VCS)",
  "Ban Me Thuot (BMV)",
  "Dong Hoi (VDH)"
];

const popularAirlineDestinationList = [
  "Vietnam Airlines to Ho Chi Minh City",
  "VietJet Air to Hanoi",
  "Bamboo Airways to Da Nang",
  "Vietnam Airlines to Phu Quoc",
  "VietJet Air to Nha Trang",
  "Bamboo Airways to Hue",
  "Vietnam Airlines to Da Lat",
  "VietJet Air to Hai Phong",
  "Bamboo Airways to Thanh Hoa",
  "Vietnam Airlines to Vinh",
  "VietJet Air to Quy Nhon",
  "Bamboo Airways to Tuy Hoa",
  "Vietnam Airlines to Buon Ma Thuot",
  "VietJet Air to Pleiku",
  "Bamboo Airways to Chu Lai",
  "Vietnam Airlines to Rach Gia",
  "VietJet Air to Ca Mau",
  "Bamboo Airways to Con Dao",
  "Vietnam Airlines to Ban Me Thuot",
  "VietJet Air to Dong Hoi"
];

const popularAirlineList = [
  "Vietnam Airlines",
  "VietJet Air",
  "Bamboo Airways",
  "Pacific Airlines",
  "Vietravel Airlines",
  "Vietnam Airlines - Business Class",
  "VietJet Air - SkyBoss",
  "Bamboo Airways - Premium",
  "Vietnam Airlines - Economy",
  "VietJet Air - Eco",
  "Bamboo Airways - Economy Plus",
  "Pacific Airlines - Flex",
  "Vietravel Airlines - Deluxe",
  "Vietnam Airlines to Bangkok",
  "VietJet Air to Seoul",
  "Bamboo Airways to Tokyo",
  "Vietnam Airlines to Singapore",
  "VietJet Air to Kuala Lumpur",
  "Bamboo Airways to Taipei",
  "Vietnam Airlines to London"
];

export default function FlightsRecommendation() {
  const [activeTab, setActiveTab] = useState('routes');

  const tabs = [
    { id: 'routes', label: 'Popular Routes', data: popularRoutesList },
    { id: 'destinations', label: 'Popular Destinations', data: popularDestinationsList },
    { id: 'airlineDest', label: 'Popular Airline & Destination', data: popularAirlineDestinationList },
    { id: 'airline', label: 'Popular Airline', data: popularAirlineList }
  ];

  const currentData = tabs.find(tab => tab.id === activeTab)?.data || [];

  return (
    <div className="w-full mt-10">
      <div className="flex items-center gap-3 mb-6">
        <RecommendationIcon />
        <h2 className="text-[#180B51] font-bold text-[25px]">
          Flight Recommendations
        </h2>
      </div>

      <div className="flex flex-nowrap gap-4 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`h-[45px] px-6 rounded-xl font-bold text-[16px] transition-all duration-300 whitespace-nowrap flex-shrink-0 cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#061155] text-white'
                : 'bg-[#D1D3DD] text-[#180B51] hover:text-[#0a9af2]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full bg-white border border-[#D1D3DD] rounded-2xl p-8 shadow-[0_10px_20px_rgba(0,0,0,0.05),-5px_5px_15px_rgba(0,0,0,0.02),5px_5px_15px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {currentData.map((item, index) => (
            <div
              key={index}
              className="text-[#180B51] text-[15px] cursor-pointer hover:text-[#0a9af2] transition-colors truncate"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
