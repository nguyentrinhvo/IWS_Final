import React, { useEffect, useState, useRef } from 'react';
import FlightSearchBox from '../../../components/user/FlightSearchBox';
import FlightsRecommendation from './FlightsRecommendation';
import NewUserExclusive from '../../HomePage/NewUserExclusive';

const FlightsIcon = () => (
  <svg
    width="35px"
    height="35px"
    viewBox="0 0 32 32"
    fill="currentColor"
    className="text-[#180B51]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Airplane_x2C__plane_x2C__flight_1_">
      <g id="XMLID_94_">
        <path
          d="M17.542,8.382L2.958,4.902l-1.25,1.26c-0.18,0.17-0.14,0.45,0.07,0.58l11.083,6.465"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d="M17.884,17.581l7.374,12.642c0.13,0.209,0.41,0.25,0.58,0.07l1.26-1.25l-3.903-16.359"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d="M9.134,19.857l-6.336-0.715l-1.19,1.189c-0.18,0.18-0.13,0.48,0.09,0.6l3.787,1.975"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d="M8.109,24.625l2.958,5.677c0.12,0.221,0.42,0.271,0.6,0.091l1.19-1.19l-0.715-6.333"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d="M7.328,24.673l0.4-0.011c0.12-0.01,2.81-0.14,4.88-2.22c0.63-0.58,14.51-13.32,15.99-14.811c2.2-2.2,2.15-5.149,1.54-5.77c-0.61-0.61-3.58-0.66-5.77,1.54c-1.5,1.5-14.23,15.359-14.82,16c-0.644,0.649-1.104,1.354-1.43,2.024"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="10.5"
          x2="4"
          y1="21.5"
          y2="28"
        />
        <path
          d="M27.498,3.502c0.552,0,1,0.448,1,1"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
      </g>
    </g>
  </svg>
);

const MOCK_FLIGHT_DEALS = [
  { id: 1, originCity: "Ha Noi", title: "Hanoi → Ho Chi Minh City", departureDate: "Mon, 12 May 2026", price: "1,250,000 VND", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=500&fit=crop" },
  { id: 2, originCity: "Ha Noi", title: "Hanoi → Da Nang", departureDate: "Wed, 14 May 2026", price: "890,000 VND", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=500&fit=crop" },
  { id: 3, originCity: "Ha Noi", title: "Hanoi → Phu Quoc", departureDate: "Fri, 16 May 2026", price: "1,890,000 VND", image: "https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?w=400&h=500&fit=crop" },
  { id: 4, originCity: "Ho Chi Minh", title: "Ho Chi Minh → Hanoi", departureDate: "Tue, 13 May 2026", price: "1,350,000 VND", image: "https://images.unsplash.com/photo-1582990129070-e4f3e7b32a2c?w=400&h=500&fit=crop" },
  { id: 5, originCity: "Ho Chi Minh", title: "Ho Chi Minh → Da Nang", departureDate: "Thu, 15 May 2026", price: "990,000 VND", image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=500&fit=crop" },
  { id: 6, originCity: "Ho Chi Minh", title: "Ho Chi Minh → Nha Trang", departureDate: "Sat, 17 May 2026", price: "1,150,000 VND", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=400&h=500&fit=crop" },
  { id: 7, originCity: "Da Nang", title: "Da Nang → Hanoi", departureDate: "Mon, 12 May 2026", price: "1,120,000 VND", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=500&fit=crop" },
  { id: 8, originCity: "Da Nang", title: "Da Nang → Ho Chi Minh", departureDate: "Wed, 14 May 2026", price: "1,050,000 VND", image: "https://images.unsplash.com/photo-1562794850-cc5ba1035da3?w=400&h=500&fit=crop" },
  { id: 9, originCity: "Hue", title: "Hue → Hanoi", departureDate: "Fri, 16 May 2026", price: "950,000 VND", image: "https://images.unsplash.com/photo-1581507883264-5edb8ddc7788?w=400&h=500&fit=crop" },
  { id: 10, originCity: "Hue", title: "Hue → Ho Chi Minh", departureDate: "Sun, 18 May 2026", price: "1,190,000 VND", image: "https://images.unsplash.com/photo-1606556108119-01c51bfbe2a7?w=400&h=500&fit=crop" },
  { id: 11, originCity: "Phu Quoc", title: "Phu Quoc → Hanoi", departureDate: "Tue, 13 May 2026", price: "1,990,000 VND", image: "https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?w=400&h=500&fit=crop" },
  { id: 12, originCity: "Phu Quoc", title: "Phu Quoc → Ho Chi Minh", departureDate: "Thu, 15 May 2026", price: "1,250,000 VND", image: "https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?w=400&h=500&fit=crop" },
  { id: 13, originCity: "Nha Trang", title: "Nha Trang → Hanoi", departureDate: "Sat, 17 May 2026", price: "1,390,000 VND", image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=400&h=500&fit=crop" },
  { id: 14, originCity: "Quy Nhon", title: "Quy Nhon → Ho Chi Minh", departureDate: "Mon, 12 May 2026", price: "1,090,000 VND", image: "https://images.unsplash.com/photo-1606556108119-01c51bfbe2a7?w=400&h=500&fit=crop" },
  { id: 15, originCity: "Hai Phong", title: "Hai Phong → Da Nang", departureDate: "Wed, 14 May 2026", price: "1,150,000 VND", image: "https://images.unsplash.com/photo-1562794850-cc5ba1035da3?w=400&h=500&fit=crop" },
  { id: 16, originCity: "Can Tho", title: "Can Tho → Hanoi", departureDate: "Fri, 16 May 2026", price: "1,450,000 VND", image: "https://images.unsplash.com/photo-1582990129070-e4f3e7b32a2c?w=400&h=500&fit=crop" },
  { id: 17, originCity: "Other Places", title: "Da Lat → Hanoi", departureDate: "Sun, 18 May 2026", price: "1,250,000 VND", image: "https://images.unsplash.com/photo-1620959049103-6f345a9fc27c?w=400&h=500&fit=crop" },
  { id: 18, originCity: "Other Places", title: "Vung Tau → Ho Chi Minh", departureDate: "Tue, 20 May 2026", price: "590,000 VND", image: "https://images.unsplash.com/photo-1583344600645-ec0b9ca04473?w=400&h=500&fit=crop" },
];

const INTERNATIONAL_FLIGHT_DEALS = [
  { id: 101, originFilter: "Malaysia", title: "Hanoi → Kuala Lumpur", departureDate: "Tue, 03 Jun 2026", price: "2,450,000 VND", image: "https://images.unsplash.com/photo-1519631128182-433895475ffe?w=400&h=500&fit=crop" },
  { id: 102, originFilter: "Malaysia", title: "Ho Chi Minh → Penang", departureDate: "Fri, 06 Jun 2026", price: "2,890,000 VND", image: "https://images.unsplash.com/photo-1523707611943-e935f0eb5da3?w=400&h=500&fit=crop" },
  { id: 103, originFilter: "Singapore", title: "Hanoi → Singapore", departureDate: "Thu, 05 Jun 2026", price: "3,150,000 VND", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=500&fit=crop" },
  { id: 104, originFilter: "Singapore", title: "Ho Chi Minh → Singapore", departureDate: "Sat, 07 Jun 2026", price: "2,990,000 VND", image: "https://images.unsplash.com/photo-1511818555139-cb0a6f63682a?w=400&h=500&fit=crop" },
  { id: 105, originFilter: "Australia", title: "Hanoi → Sydney", departureDate: "Wed, 11 Jun 2026", price: "12,500,000 VND", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=500&fit=crop" },
  { id: 106, originFilter: "Australia", title: "Ho Chi Minh → Melbourne", departureDate: "Sat, 14 Jun 2026", price: "11,900,000 VND", image: "https://images.unsplash.com/photo-1545044846-351ca4b9d6e1?w=400&h=500&fit=crop" },
  { id: 107, originFilter: "China", title: "Hanoi → Beijing", departureDate: "Mon, 09 Jun 2026", price: "4,200,000 VND", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=500&fit=crop" },
  { id: 108, originFilter: "China", title: "Ho Chi Minh → Shanghai", departureDate: "Thu, 12 Jun 2026", price: "4,500,000 VND", image: "https://images.unsplash.com/photo-1502693891783-6f81a7b1b369?w=400&h=500&fit=crop" },
  { id: 109, originFilter: "Laos", title: "Hanoi → Vientiane", departureDate: "Tue, 10 Jun 2026", price: "1,890,000 VND", image: "https://images.unsplash.com/photo-1577819661022-c997d2de5a3a?w=400&h=500&fit=crop" },
  { id: 110, originFilter: "Laos", title: "Da Nang → Luang Prabang", departureDate: "Fri, 13 Jun 2026", price: "2,150,000 VND", image: "https://images.unsplash.com/photo-1563016793-9b8a0d2b7d4e?w=400&h=500&fit=crop" },
  { id: 111, originFilter: "Thai", title: "Hanoi → Bangkok", departureDate: "Wed, 04 Jun 2026", price: "2,250,000 VND", image: "https://images.unsplash.com/photo-1583491470869-d4677e11c5f0?w=400&h=500&fit=crop" },
  { id: 112, originFilter: "Thai", title: "Ho Chi Minh → Phuket", departureDate: "Sat, 07 Jun 2026", price: "2,590,000 VND", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=500&fit=crop" },
  { id: 113, originFilter: "Campuchia", title: "Hanoi → Phnom Penh", departureDate: "Mon, 09 Jun 2026", price: "1,950,000 VND", image: "https://images.unsplash.com/photo-1564665285942-68a85ded4b0f?w=400&h=500&fit=crop" },
  { id: 114, originFilter: "Campuchia", title: "Ho Chi Minh → Siem Reap", departureDate: "Thu, 12 Jun 2026", price: "1,790,000 VND", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=500&fit=crop" },
  { id: 115, originFilter: "Korea", title: "Hanoi → Seoul", departureDate: "Tue, 10 Jun 2026", price: "5,200,000 VND", image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&h=500&fit=crop" },
  { id: 116, originFilter: "Korea", title: "Ho Chi Minh → Busan", departureDate: "Fri, 13 Jun 2026", price: "5,600,000 VND", image: "https://images.unsplash.com/photo-1504035468969-4b268613ed5f?w=400&h=500&fit=crop" },
  { id: 117, originFilter: "Japan", title: "Hanoi → Tokyo", departureDate: "Wed, 11 Jun 2026", price: "6,800,000 VND", image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&h=500&fit=crop" },
  { id: 118, originFilter: "Japan", title: "Ho Chi Minh → Osaka", departureDate: "Sat, 14 Jun 2026", price: "6,500,000 VND", image: "https://images.unsplash.com/photo-1542051841857-5f900e8e17f1?w=400&h=500&fit=crop" },
  { id: 119, originFilter: "America", title: "Hanoi → New York", departureDate: "Mon, 16 Jun 2026", price: "18,900,000 VND", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=500&fit=crop" },
  { id: 120, originFilter: "America", title: "Ho Chi Minh → Los Angeles", departureDate: "Thu, 19 Jun 2026", price: "17,500,000 VND", image: "https://images.unsplash.com/photo-1541383068926-b444ddc71427?w=400&h=500&fit=crop" },
  { id: 121, originFilter: "Europe", title: "Hanoi → Paris", departureDate: "Tue, 17 Jun 2026", price: "14,200,000 VND", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=500&fit=crop" },
  { id: 122, originFilter: "Europe", title: "Ho Chi Minh → London", departureDate: "Fri, 20 Jun 2026", price: "15,000,000 VND", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=500&fit=crop" },
  { id: 123, originFilter: "Europe", title: "Da Nang → Frankfurt", departureDate: "Sun, 22 Jun 2026", price: "13,800,000 VND", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=500&fit=crop" },
];

const DOMESTIC_FILTER_BUTTONS = [
  "Ha Noi", "Ho Chi Minh", "Da Nang", "Hue", "Phu Quoc", "Nha Trang", "Quy Nhon", "Hai Phong", "Can Tho", "Other Places"
];

const INTERNATIONAL_FILTER_BUTTONS = [
  "Malaysia", "Singapore", "Australia", "China", "Laos", "Thai", "Campuchia", "Korea", "Japan", "America", "Europe"
];

const HomepageFlight = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [domesticFilter, setDomesticFilter] = useState("Ha Noi");
  const [internationalFilter, setInternationalFilter] = useState("Malaysia");
  
  const domesticScrollRef = useRef(null);
  const internationalScrollRef = useRef(null);

  const domesticFilteredDeals = MOCK_FLIGHT_DEALS.filter(
    (deal) => deal.originCity === domesticFilter
  );

  const internationalFilteredDeals = INTERNATIONAL_FLIGHT_DEALS.filter(
    (deal) => deal.originFilter === internationalFilter
  );

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50/30 pb-20">
      <FlightSearchBox />
      
      <div className="w-full max-w-[1200px] px-4 pt-8 relative z-20">
        <div className="w-full flex flex-col gap-4 mb-12">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <FlightsIcon />
              <h2 className="text-[#180B51] font-bold text-[25px]">
                Best prices on domestic flights!
              </h2>
            </div>
            <p className="text-[#180B51] text-[16px] opacity-80 pl-1">
              Super saver fares from Vietnam Airlines, Bamboo Airways, Vietjet, Vietravel Airlines, and Sun Phu Quoc Airways.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {DOMESTIC_FILTER_BUTTONS.map((city) => (
              <button
                key={city}
                onClick={() => setDomesticFilter(city)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  domesticFilter === city
                    ? "bg-[#7C70EB] text-white shadow-md"
                    : "bg-white border border-gray-200 text-[#180B51] hover:bg-gray-50"
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="relative group mt-4">
            {domesticFilteredDeals.length > 5 && (
              <button
                onClick={() => scrollLeft(domesticScrollRef)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all -translate-x-3 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div
              ref={domesticScrollRef}
              className="flex overflow-x-auto scroll-smooth gap-5 pb-4 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {domesticFilteredDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="w-[230px] h-[270px] relative rounded-xl overflow-hidden shadow-md flex-shrink-0"
                  style={{
                    backgroundImage: `url(${deal.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-bold text-[15px] leading-tight mb-1">{deal.title}</p>
                    <p className="text-xs text-white/80 mb-1">{deal.departureDate}</p>
                    <p className="text-yellow-400 font-bold text-sm">{deal.price}</p>
                  </div>
                </div>
              ))}
            </div>
            {domesticFilteredDeals.length > 5 && (
              <button
                onClick={() => scrollRight(domesticScrollRef)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all translate-x-3 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            {domesticFilteredDeals.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500">No flight deals available for {domesticFilter}</p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mb-12">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <FlightsIcon />
              <h2 className="text-[#180B51] font-bold text-[25px]">
                Best prices on international flights!
              </h2>
            </div>
            <p className="text-[#180B51] text-[16px] opacity-80 pl-1">
              Competitive fares from reputable international airlines such as Vietnam Airlines, Singapore Airlines, and EVA Air.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {INTERNATIONAL_FILTER_BUTTONS.map((country) => (
              <button
                key={country}
                onClick={() => setInternationalFilter(country)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  internationalFilter === country
                    ? "bg-[#7C70EB] text-white shadow-md"
                    : "bg-white border border-gray-200 text-[#180B51] hover:bg-gray-50"
                }`}
              >
                {country}
              </button>
            ))}
          </div>

          <div className="relative group mt-4">
            {internationalFilteredDeals.length > 5 && (
              <button
                onClick={() => scrollLeft(internationalScrollRef)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all -translate-x-3 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div
              ref={internationalScrollRef}
              className="flex overflow-x-auto scroll-smooth gap-5 pb-4 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {internationalFilteredDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="w-[230px] h-[270px] relative rounded-xl overflow-hidden shadow-md flex-shrink-0"
                  style={{
                    backgroundImage: `url(${deal.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-bold text-[15px] leading-tight mb-1">{deal.title}</p>
                    <p className="text-xs text-white/80 mb-1">{deal.departureDate}</p>
                    <p className="text-yellow-400 font-bold text-sm">{deal.price}</p>
                  </div>
                </div>
              ))}
            </div>
            {internationalFilteredDeals.length > 5 && (
              <button
                onClick={() => scrollRight(internationalScrollRef)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all translate-x-3 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            {internationalFilteredDeals.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500">No flight deals available for {internationalFilter}</p>
              </div>
            )}
          </div>
        </div>

        <NewUserExclusive />

        <FlightsRecommendation />
      </div>
    </div>
  );
};

export default HomepageFlight;