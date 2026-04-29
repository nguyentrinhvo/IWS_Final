import React, { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';

const RecommendationIcon = () => (
  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H6C4.34 2 3 3.33 3 4.97V15.88C3 17.52 4.34 18.85 6 18.85H6.76C7.56 18.85 8.32 19.16 8.88 19.72L10.59 21.41C11.37 22.18 12.64 22.18 13.42 21.41L15.13 19.72C15.69 19.16 16.46 18.85 17.25 18.85H18C19.66 18.85 21 17.52 21 15.88V4.97C21 3.33 19.66 2 18 2ZM16.68 10.5L15.51 14.06C15.36 14.65 14.73 15.13 14.09 15.13H12.24C11.92 15.13 11.47 15.02 11.27 14.82L9.8 13.67C9.77 14.31 9.48 14.58 8.77 14.58H8.29C7.55 14.58 7.25 14.29 7.25 13.59V8.82C7.25 8.12 7.55 7.83 8.29 7.83H8.78C9.52 7.83 9.82 8.12 9.82 8.82V9.18L11.76 6.3C11.96 5.99 12.47 5.77 12.9 5.94C13.37 6.1 13.67 6.62 13.57 7.08L13.33 8.64C13.3 8.77 13.33 8.91 13.42 9C13.5 9.09 13.62 9.15 13.75 9.15H15.7C16.08 9.15 16.4 9.3 16.59 9.57C16.77 9.83 16.8 10.16 16.68 10.5Z" fill="#180B51" />
  </svg>
);

const flightList = [
  "Vé máy bay Hà Nội Sài Gòn", "Vé máy bay Thanh Hóa Sài Gòn", "Vé máy bay đi Anh",
  "Vé máy bay Đà Nẵng Sài Gòn", "Vé máy bay Hải Phòng Đà Nẵng", "Vé máy bay đi Thái Lan",
  "Vé máy bay Sài Gòn Hà Nội", "Vé máy bay Huế Hà Nội", "Vé máy bay đi Nhật",
  "Vé máy bay Đà Nẵng Hà Nội", "Vé máy bay Đà Lạt Sài Gòn", "Vé máy bay đi Úc",
  "Vé máy bay Hà Nội Đà Lạt", "Vé máy bay đi Hà Nội", "Vé máy bay đi Hàn Quốc",
  "Vé máy bay Vinh Sài Gòn", "Vé máy bay đi Đà Lạt", "Vé máy bay đi Đài Loan",
  "Vé máy bay Hà Nội Nha Trang", "Vé máy bay đi Đà Nẵng", "Vé máy bay đi Đức",
  "Vé máy bay Hà Nội Huế", "Vé máy bay đi Phú Quốc", "Vé máy bay đi Pháp",
  "Vé máy bay Cần Thơ Hà Nội", "Vé máy bay đi Côn Đảo", "Vé máy bay đi Trung Quốc",
  "Vé máy bay Hải Phòng Sài Gòn", "Vé máy bay đi Nha Trang", "Vé máy bay Vietjet",
  "Vé máy bay Huế Sài Gòn", "Vé máy bay đi Quy Nhơn", "Vé máy bay Vietnam Airlines",
  "Vé máy bay Sài Gòn Đà Nẵng", "Vé máy bay đi Sài Gòn", "Vé máy bay Bamboo Airways",
  "Vé máy bay Nha Trang Hà Nội", "Vé máy bay đi San Francisco", "Vé máy bay nội địa",
  "Vé máy bay Hà Nội Phú Quốc", "Vé máy bay đi Luân Đôn", "Vé máy bay quốc tế",
  "Vé máy bay Đà Nẵng Đà Lạt", "Vé máy bay đi Singapore", "Vé máy bay Tết 2026",
  "Vé máy bay Cần Thơ Đà Lạt", "Vé máy bay đi Mỹ"
];

const hotelList = [
  "khách sạn Vũng Tàu", "khách sạn Hồ Tràm", "Homestay Hội An", "khách sạn Nha Trang",
  "khách sạn Quy Nhơn", "Homestay Mũi Né", "khách sạn Đà Nẵng", "khách sạn Phú Yên",
  "Homestay Nha Trang", "khách sạn Phan Thiết", "khách sạn Tam Đảo", "Resort Mũi Né",
  "khách sạn Mũi Né", "khách sạn Sầm Sơn", "Resort Phan Thiết", "khách sạn Hà Nội",
  "khách sạn Ninh Bình", "Resort Vũng Tàu", "khách sạn TP.HCM", "khách sạn Cửa Lò",
  "Resort Hồ Tràm", "khách sạn Hạ Long", "khách sạn Đồ Sơn", "Resort Nha Trang",
  "khách sạn Phú Quốc", "Homestay Đà Lạt", "Resort Phú Quốc", "khách sạn Cát Bà",
  "Homestay Vũng Tàu", "Resort Đà Nẵng", "khách sạn Cần Thơ", "Homestay Hà Nội",
  "Resort Đà Lạt", "khách sạn Hội An", "Homestay Sài Gòn", "Resort Hội An",
  "khách sạn Sapa", "Homestay Phan Thiết", "Nhà Nghỉ Đà Lạt", "khách sạn gần đây",
  "Homestay Măng Đen", "Nhà Nghỉ Vũng Tàu", "khách sạn quận 1", "Homestay Sapa",
  "Nhà Nghỉ Cần Thơ", "khách sạn quận 3", "Homestay Ninh Bình", "Nhà Nghỉ Hà Nội"
];

const activityList = [
  "Du lịch Sài Gòn", "Du lịch Hà Nội", "Du lịch Đà Lạt", "Du lịch Sapa",
  "Du lịch Ninh Bình", "Du lịch Hạ Long", "Du lịch Huế", "Du lịch Đà Nẵng",
  "Du lịch Hội An", "Du lịch Nha Trang", "Du lịch Phan Thiết", "Du lịch Phú Quốc",
  "Du lịch Thái Lan", "Du lịch Singapore", "Du lịch Nhật Bản", "Du lịch Hàn Quốc",
  "Du lịch Đài Loan", "Du lịch Malaysia", "Du lịch Trung Quốc", "Du lịch Úc",
  "Vé Bà Nà Hills", "Vé The Amazing Bay", "Vé Saigon Waterbus", "Vé Da Nang Downtown",
  "Vé Cáp treo núi Bà Đen", "Vé Landmark 81 Skyview", "Vé Kỷ Ức Hội An", "Vé VinWonders Nha Trang",
  "Vé Cáp treo Fansipan", "Vé Cáp treo Hòn Thơm", "Vé ZooDoo Đà Lạt", "Vé VinWonders Phú Quốc",
  "Vé VinWonders Nam Hội An", "Vé Sun World Hạ Long", "Vé VinWonders Grand Park", "Vé Hồ Mây Vũng Tàu",
  "Vé Tinh hoa Bắc Bộ", "Du thuyền quốc tế", "Du thuyền Hạ Long", "Du thuyền Nha Trang",
  "Công viên nước", "Vé Universal Studios Singapore", "Vé Hong Kong Disneyland", "Vé Disneyland Thượng Hải",
  "Vé LEGOLAND Malaysia", "Vé Universal Studios Nhật Bản", "Vé Tokyo Disneyland", "Vé Safari World Bangkok"
];

export default function Recommendations() {
  const { t } = useGlobal();
  const [activeTab, setActiveTab] = useState('flights');

  const tabs = [
    { id: 'flights', key: 'topFlights', data: flightList },
    { id: 'hotels', key: 'bestHotels', data: hotelList },
    { id: 'things', key: 'topThingsToDo', data: activityList }
  ];

  const currentData = tabs.find(tab => tab.id === activeTab)?.data || [];

  return (
    <div className="w-full mt-10">
      <div className="flex items-center gap-3 mb-6">
        <RecommendationIcon />
        <h2 className="text-[#180B51] font-bold text-[25px]">
          {t('recommendationsTitle')}
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
            {t(tab.key)}
          </button>
        ))}
      </div>

      <div className="w-full bg-white border border-[#D1D3DD] rounded-2xl p-8 shadow-[0_10px_20px_rgba(0,0,0,0.05),-5px_5px_15px_rgba(0,0,0,0.02),5px_5px_15px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-3 gap-x-8 gap-y-4">
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