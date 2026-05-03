import React, { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';

const TitleIcon = () => (
  <svg height="25px" width="25px" viewBox="0 0 512 512" fill="#180B51">
    <path d="M493.138,216.296c-28.288-31.443-44.004-75.448-44.004-75.448s-15.717,44.005-44.014,75.448 c0,0,12.965,6.675,20.044,3.135c0,0-7.079,27.124-38.906,62.885c28.288,7.849,49.506-5.116,49.506-5.116v38.906h10.224h6.282 h10.233V277.2c0,0,21.209,12.965,49.497,5.116c-31.828-35.761-38.888-62.885-38.888-62.885 C480.172,222.971,493.138,216.296,493.138,216.296z"></path>
    <path d="M324.611,316.666c-137.717-18.578-165.813-22.951-112.675-57.291c39.3-25.4,125.934-44.152,170.755-58.85 h-51.138V14.144h-24.616v186.38h-16.583c-64.453,12.489-121.267,23.382-165.465,43.408c9.024,17.817,21.934,39.732,38.164,57.759 l24.437,27.161l-31.8,16.376c2.238,3.86,4.97,8.152,7.95,12.626c73.741,18.679,138.542,25.546,82.718,56.374 c-69.908,38.613-116.829,65.388-158.055,83.627H401.47c31.479-23.896,86.432-68.644,95.281-96.014 C509.268,363.128,468.096,336.032,324.611,316.666z"></path>
    <path d="M101.369,401.511c0,0,28.206,17.24,65.819,6.805c-42.317-47.554-51.716-83.608-51.716-83.608 c9.399,4.703,26.638-4.173,26.638-4.173c-37.613-41.804-58.51-100.315-58.51-100.315s-20.898,58.511-58.52,100.315 c0,0,17.238,8.876,26.647,4.173c0,0-9.408,36.054-51.726,83.608c37.613,10.435,65.828-6.805,65.828-6.805v51.726h13.59h8.353 h13.599V401.511z"></path>
    <path d="M462.677,104.171c0.756-1.394,0.673-3.136-0.22-4.475l-24.653-36.972c-0.962-1.458-0.962-3.365,0-4.833 l24.653-36.962c0.894-1.348,0.976-3.072,0.22-4.484c-0.771-1.412-2.247-2.302-3.852-2.302H343.862v92.346h114.963 C460.43,106.49,461.902,105.582,462.677,104.171z"></path>
  </svg>
);

const ArrowLeft = () => (
  <svg fill="#765FDD" width="20px" height="20px" viewBox="-8.5 0 32 32">
    <path d="M7.094 15.938l7.688 7.688-3.719 3.563-11.063-11.063 11.313-11.344 3.531 3.5z"></path>
  </svg>
);

const ArrowRight = () => (
  <svg fill="#765FDD" width="20px" height="20px" viewBox="-8.5 0 32 32">
    <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
  </svg>
);

export default function SuggestThings() {
  const { t, currency, rates } = useGlobal();
  const [activeFilter, setActiveFilter] = useState('Attraction');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filters = [
    { id: 'Attraction', label: 'filterAttraction' },
    { id: 'Tour', label: 'filterTour' },
    { id: 'Playground', label: 'filterPlayground' },
  ];

  const items = [
    { id: 1, title: 'VinWonders Cua Hoi Tickets', originalPrice: 100000, discount: 0, image: 'https://static.vinwonders.com/production/2025/09/1.jpg', place: 'Nghi Hoa District' },
    { id: 2, title: 'Sun World Ba Den Mountain', originalPrice: 250000, discount: 20, image: 'https://sun-ecommerce-cdn.azureedge.net/ecommerce/service-sites/thumbnail/SunGroup/D%E1%BB%B1%20%C3%A1n/VCGT/SW%20B%C3%A0%20%C4%90en/10227/image-thumb__10227__1600/Huy%CC%80nh%20Thanh%20Lie%CC%82m.jpg', place: 'Thach Tan commune' },
    { id: 3, title: 'Lotte World Aquarium | Ha Noi', originalPrice: 180000, discount: 20, image: 'https://static-images.vnncdn.net/files/publish/2023/7/18/khai-truong-thuy-cung-lotte-world-ha-noi-vao-ngay-0108-984.jpg?width=0&s=yatXuJMtQyljzri4HdQDtQ', place: 'Phu Thuong' },
    { id: 4, title: 'Temple of Literature by Night', originalPrice: 199000, discount: 0, image: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/kphb0qtoxhcw1awp9lw1/TempleofLiteratureNightWalkingTour:QuintessenceofEducation-Klook.jpg', place: 'Van Mieu Ward' },
    { id: 5, title: 'The Quintessence of Tonkin Show Tickets', originalPrice: 450000, discount: 15, image: 'https://www.civitatis.com/f/vietnam/hanoi/galeria/bailando-quintaesencia-tonkin.jpg', place: 'Sai Son Commune' },
    { id: 6, title: 'VinWonders Nha Trang Tickets', originalPrice: 700000, discount: 0, image: 'https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ft1m7nboxavnfv88wndm.jpg', place: 'Vĩnh Nguyên Ward' },
    { id: 7, title: 'Sun World Ba Na Hills in Da Nang', originalPrice: 70000, discount: 25, image: 'https://danangfantasticity.com/wp-content/uploads/2025/08/toan-canh-khu-du-lich-sun-world-ba-na-hills-1536x864.jpg', place: 'Hoa Ninh' },
    { id: 8, title: 'KidZania in Hanoi', originalPrice: 289968, discount: 0, image: 'https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/5893776513120/KidZania-in-Hanoi-694942d9-f898-4a69-a152-e51b9d3e77ae.jpeg?tr=q-60,c-at_max,w-1280,h-720&_src=imagekit', place: 'Phú Thượng' },
  ];

  const formatPrice = (priceVnd) => {
    if (!rates || !rates[currency]) {
      return new Intl.NumberFormat('vi-VN').format(priceVnd) + ' VND';
    }
    const converted = priceVnd / (rates['VND'] || 1);

    if (currency === 'USD') {
      const formattedNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(converted);
      return `USD ${formattedNumber}`;
    }

    if (currency === 'VND') {
      const formattedNumber = new Intl.NumberFormat('vi-VN').format(converted);
      return `${formattedNumber} VND`;
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(converted);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const itemWidth = 300;
  const gap = 40;

  return (
    <div className="w-full max-w-[1320px] mx-auto flex flex-col gap-6 mt-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <TitleIcon />
          <h2 className="text-[#180B51] font-bold text-[25px]">
            {t('thingsToDoTitle')}
          </h2>
        </div>
        <p className="text-[#180B51] text-[16px] opacity-80 pl-1">
          {t('thingsToDoDesc')}
        </p>
      </div>

      <div className="flex gap-3 mt-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`h-[45px] px-6 rounded-full font-medium transition-all duration-300 flex items-center justify-center
              ${activeFilter === filter.id 
                ? 'bg-[#765FDD] text-white' 
                : 'bg-[#D9D9D9] text-[#765FDD] hover:bg-[#c9c9c9]'}`}
          >
            {t(filter.label)}
          </button>
        ))}
      </div>

      <div className="relative w-full mt-4 group">
        <div className="overflow-hidden pb-6">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
              gap: `${gap}px`
            }}
          >
            {items.map((item) => {
              const discountedPrice = item.originalPrice * (1 - item.discount / 100);
              return (
                <div 
                  key={item.id}
                  className="min-w-[300px] h-[300px] bg-white rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.1)] overflow-hidden relative cursor-pointer"
                >
                  <div className="absolute top-0 left-0 bg-[#ff6d70] text-white px-3 py-1 text-[12px] font-bold z-10 rounded-tl-2xl rounded-br-2xl">
                    {item.place}
                  </div>

                  {item.discount > 0 && (
                    <div className="absolute top-[87px] right-0 bg-[#C86611] text-[#FFD700] px-3 py-1 text-[13px] font-bold z-10 rounded-l-lg flex items-center justify-center min-w-[80px] h-[26px]">
                      {t('save')} {item.discount}%
                    </div>
                  )}

                  <div className="w-full h-[200px] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-3 flex flex-col h-[100px] justify-between">
                    <h3 className="text-[15px] text-black line-clamp-1">{item.title}</h3>
                    
                    <div className="flex flex-col">
                      <div className="h-[20px]">
                        {item.discount > 0 && (
                          <span className="text-[14px] text-gray-400 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      <div className="h-[24px]">
                        <span className="text-[16px] text-[#C86611] font-bold">
                          {formatPrice(discountedPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {currentIndex > 0 && (
          <button 
            onClick={handlePrev}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-20 hover:bg-gray-100"
          >
            <ArrowLeft />
          </button>
        )}
        {currentIndex < items.length - 4 && (
          <button 
            onClick={handleNext}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-20 hover:bg-gray-100"
          >
            <ArrowRight />
          </button>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button className="flex items-center gap-2 px-8 py-2 border border-[#D9D9D9] rounded-full text-[#765FDD] font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
          {t('seeAll')}
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
