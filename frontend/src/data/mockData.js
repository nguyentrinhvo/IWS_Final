// mockData.js
// Dữ liệu mock chi tiết cho web du lịch: tours, hotels, flights, cars&trains, thingsToDo
// Chỉ giữ lại một tour mẫu TOUR001, các phần khác vẫn sinh ngẫu nhiên.

export const VN_PROVINCES = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lạng Sơn", "Lào Cai", "Lâm Đồng", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

export const INT_LOCATIONS = [
  "South Korea", "China", "Japan", "Malaysia", "Laos", "Cambodia", "Singapore", "Thailand", "Taiwan", "France", "USA", "Australia"
];

export const ALL_LOCATIONS = [...VN_PROVINCES, ...INT_LOCATIONS];

// Helper functions
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomPrice = (minK, maxK) => randomInt(minK, maxK) * 1000;
const randomRating = () => (3.5 + Math.random() * 1.5).toFixed(1);
const randomReviews = () => randomInt(50, 2500);
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Mảng dữ liệu phong phú cho từng loại
const tourStyles = ["Khám phá thiên nhiên", "Tour văn hóa", "Ẩm thực đường phố", "Nghỉ dưỡng cao cấp", "Hành hương tâm linh", "Tour mạo hiểm", "Chụp ảnh check-in", "Trải nghiệm cộng đồng"];
const hotelChains = ["Grand", "Luxury", "Sunrise", "Seaside", "Mountain View", "Central", "Heritage", "Eco Lodge"];
const amenitiesList = ["Hồ bơi", "Spa", "Phòng gym", "Nhà hàng", "Bar", "Dịch vụ phòng 24/7", "WiFi miễn phí", "Chỗ đỗ xe", "Bữa sáng buffet", "Sân vườn", "Xông hơi", "Sân tennis"];
const airlines = ["Vietnam Airlines", "Vietjet Air", "Bamboo Airways", "Pacific Airlines", "Vietravel Airlines"];
const carTypes = ["Toyota Vios", "Hyundai Grand i10", "Kia Cerato", "Mitsubishi Xpander", "Ford Transit 16 chỗ", "VinFast Lux A2.0"];
const trainTypes = ["Tàu SE", "Tàu Thống Nhất", "Tàu cao tốc", "Tàu SP", "Tàu chợ"];
const thingCategories = ["Di tích lịch sử", "Công viên giải trí", "Bảo tàng", "Chợ đêm", "Làng nghề truyền thống", "Khu sinh thái", "Thác nước", "Đền chùa"];

const generateMockData = () => {
  const data = {
    users: [
      {
        id: "u1",
        fullName: "The Anh",
        email: "theanh",
        phone: "0987654321",
        password: "123456",
        avatar: "https://cdn2.fptshop.com.vn/unsafe/hinh_nen_arsenal_53_c43bfddcbc.jpg",
        role: "client",
        createdAt: "2025-01-01T00:00:00Z",
        isActive: true
      }
    ],
    tours: [],       // Sẽ chỉ có TOUR001, TOUR002
    hotels: [],
    flights: [],
    carsTrains: [],
    thingsToDo: []
  };

  // -------------------- TOUR MẪU --------------------
  data.tours.push({
    id: "TOUR001",
    title: "Tour Đà Nẵng - Hội An - Bà Nà Hills 3 ngày 2 đêm",
    location: "Đà Nẵng",
    price: 3500000,
    duration: "3 ngày 2 đêm",
    rating: 4.8,
    reviewsCount: 256,
    image: "https://picsum.photos/seed/tour_mau/800/600",
    isFeatured: true,
    description: "Khám phá thành phố đáng sống nhất Việt Nam, trải nghiệm cáp treo Bà Nà Hills, dạo phố cổ Hội An về đêm.",
    itinerary: [
      { day: 1, description: "Đón khách tại sân bay Đà Nẵng, tham quan Bán đảo Sơn Trà, tắm biển Mỹ Khê." },
      { day: 2, description: "Sáng đi Bà Nà Hills, cáp treo, vườn hoa, cầu Vàng. Chiều về Hội An cổ." },
      { day: 3, description: "Tham quan làng gốm Thanh Hà, chợ Hội An, tiễn khách." }
    ],
    included: ["Xe đưa đón", "Khách sạn 3 sao", "Bữa sáng", "Vé tham quan Bà Nà", "Hướng dẫn viên"],
    notIncluded: ["Vé máy bay", "Bữa trưa, tối", "Chi phí cá nhân"],
    availableDates: ["2026-06-10", "2026-06-15", "2026-06-20"],
    departure: "Hà Nội (có thể khởi hành từ HN hoặc Đà Nẵng)",
    tourCode: "DAD-HOI-3D",
    images: [
      "https://picsum.photos/seed/danang1/800/600",
      "https://picsum.photos/seed/danang2/800/600",
      "https://picsum.photos/seed/danang3/800/600",
      "https://picsum.photos/seed/danang4/800/600",
      "https://picsum.photos/seed/danang5/800/600"
    ],
    header: {
      title: "Tour Đà Nẵng - Hội An - Bà Nà Hills 3 ngày 2 đêm",
      rating: 4.8,
      reviewsCount: 256,
      departure: "Hà Nội (có thể khởi hành từ HN hoặc Đà Nẵng)",
      tourCode: "DAD-HOI-3D",
      images: [
        "https://picsum.photos/seed/danang1/800/600",
        "https://picsum.photos/seed/danang2/800/600",
        "https://picsum.photos/seed/danang3/800/600",
        "https://picsum.photos/seed/danang4/800/600",
        "https://picsum.photos/seed/danang4/800/600",
        "https://picsum.photos/seed/danang4/800/600",
        "https://picsum.photos/seed/danang4/800/600",
        "https://picsum.photos/seed/danang4/800/600",
        "https://picsum.photos/seed/danang4/800/600",
      ]
    },
    breadcrumb: {
      path: ["Trang chủ", "Tour", "Miền Trung", "Đà Nẵng"],
      current: "Tour Đà Nẵng 3 ngày"
    },
    highlights: [
      "Tắm biển Mỹ Khê - một trong những bãi biển đẹp nhất hành tinh",
      "Tham quan phố cổ Hội An về đêm",
      "Tắm biển Mỹ Khê - một trong những bãi biển đẹp nhất hành tinh",
      "Thưởng thức ẩm thực đặc sản: mì Quảng, bánh xèo, cao lầu"
    ],
    inclusions: ["Xe đưa đón", "Khách sạn 3 sao", "Bữa sáng", "Vé tham quan Bà Nà", "Hướng dẫn viên"],
    exclusions: ["Vé máy bay", "Bữa trưa, tối", "Chi phí cá nhân"],
    terms: "Hủy tour trước 7 ngày hoàn 100%, trước 3 ngày hoàn 50%, không hoàn trong ngày khởi hành.",
    bookNow: {
      price: 3500000,
      originalPrice: 4200000,
      discount: "17%",
      availableDates: ["2026-06-10", "2026-06-15", "2026-06-20"]
    },
    reviews: {
      averageRating: 4.8,
      totalReviews: 256,
      reviewList: [
        { user: "Nguyễn Văn A", rating: 5, comment: "Rất hài lòng, hướng dẫn viên nhiệt tình", date: "2025-12-10" },
        { user: "Trần Thị B", rating: 4.5, comment: "Tour ổn, ăn uống ngon", date: "2025-11-20" }
      ]
    },
    schedulePrice: {
      durations: ["3 ngày 2 đêm"],
      prices: [3500000],
      startDates: ["2026-06-10", "2026-06-15", "2026-06-20"]
    },
    departureSchedules: Array.from({ length: 11 }).map((_, index) => {
      const depDate = new Date('2026-05-20');
      depDate.setDate(depDate.getDate() + index * 2);
      const retDate = new Date(depDate);
      retDate.setDate(retDate.getDate() + 4);
      return {
        id: `schedule-${index + 1}`,
        departure: depDate.toISOString().split('T')[0],
        return: retDate.toISOString().split('T')[0],
        seats: 15 - (index % 5),
        price: 3500000 + (index * 100000)
      };
    }),
  });
  data.tours.push({
    id: "TOUR002",
    title: "Tour Đà Nẵng - Hội An - Bà Nà Hills 3 ngày 2 đêm",
    location: "Đà Nẵng",
    price: 3500000,
    duration: "3 ngày 2 đêm",
    rating: 4.8,
    reviewsCount: 256,
    image: "https://picsum.photos/seed/tour_mau/800/600",
    isFeatured: true,
    description: "Khám phá thành phố đáng sống nhất Việt Nam, trải nghiệm cáp treo Bà Nà Hills, dạo phố cổ Hội An về đêm.",
    itinerary: [
      { day: 1, description: "Đón khách tại sân bay Đà Nẵng, tham quan Bán đảo Sơn Trà, tắm biển Mỹ Khê." },
      { day: 2, description: "Sáng đi Bà Nà Hills, cáp treo, vườn hoa, cầu Vàng. Chiều về Hội An cổ." },
      { day: 3, description: "Tham quan làng gốm Thanh Hà, chợ Hội An, tiễn khách." }
    ],
    included: ["Xe đưa đón", "Khách sạn 3 sao", "Bữa sáng", "Vé tham quan Bà Nà", "Hướng dẫn viên"],
    notIncluded: ["Vé máy bay", "Bữa trưa, tối", "Chi phí cá nhân"],
    availableDates: ["2026-06-10", "2026-06-15", "2026-06-20"],
    departure: "Hà Nội (có thể khởi hành từ HN hoặc Đà Nẵng)",
    tourCode: "DAD-HOI-3D",
    images: [
      "https://picsum.photos/seed/danang1/800/600",
      "https://picsum.photos/seed/danang2/800/600",
      "https://picsum.photos/seed/danang3/800/600",
      "https://picsum.photos/seed/danang4/800/600",
      "https://picsum.photos/seed/danang5/800/600"
    ],
    header: {
      title: "Tour Đà Nẵng - Hội An - Bà Nà Hills 3 ngày 2 đêm",
      rating: 4.8,
      reviewsCount: 256,
      departure: "Hà Nội (có thể khởi hành từ HN hoặc Đà Nẵng)",
      tourCode: "DAD-HOI-3D",
      images: [
        "https://picsum.photos/seed/danang1/800/600",
        "https://picsum.photos/seed/danang2/800/600",
        "https://picsum.photos/seed/danang3/800/600",
        "https://picsum.photos/seed/danang4/800/600",
        "https://picsum.photos/seed/danang4/800/600",
        "https://picsum.photos/seed/danang4/800/600",
        "https://picsum.photos/seed/danang4/800/600",
        "https://picsum.photos/seed/danang4/800/600",
        "https://picsum.photos/seed/danang4/800/600",
      ]
    },
    breadcrumb: {
      path: ["Trang chủ", "Tour", "Miền Trung", "Đà Nẵng"],
      current: "Tour Đà Nẵng 3 ngày"
    },
    highlights: [
      "Tắm biển Mỹ Khê - một trong những bãi biển đẹp nhất hành tinh",
      "Tham quan phố cổ Hội An về đêm",
      "Tắm biển Mỹ Khê - một trong những bãi biển đẹp nhất hành tinh",
      "Thưởng thức ẩm thực đặc sản: mì Quảng, bánh xèo, cao lầu"
    ],
    inclusions: ["Xe đưa đón", "Khách sạn 3 sao", "Bữa sáng", "Vé tham quan Bà Nà", "Hướng dẫn viên"],
    exclusions: ["Vé máy bay", "Bữa trưa, tối", "Chi phí cá nhân"],
    terms: "Hủy tour trước 7 ngày hoàn 100%, trước 3 ngày hoàn 50%, không hoàn trong ngày khởi hành.",
    bookNow: {
      price: 3500000,
      originalPrice: 4200000,
      discount: "17%",
      availableDates: ["2026-06-10", "2026-06-15", "2026-06-20"]
    },
    reviews: {
      averageRating: 4.8,
      totalReviews: 256,
      reviewList: [
        { user: "Nguyễn Văn A", rating: 5, comment: "Rất hài lòng, hướng dẫn viên nhiệt tình", date: "2025-12-10" },
        { user: "Trần Thị B", rating: 4.5, comment: "Tour ổn, ăn uống ngon", date: "2025-11-20" }
      ]
    },
    schedulePrice: {
      durations: ["3 ngày 2 đêm"],
      prices: [3500000],
      startDates: ["2026-06-10", "2026-06-15", "2026-06-20"]
    },
    departureSchedules: Array.from({ length: 11 }).map((_, index) => {
      const depDate = new Date('2026-05-20');
      depDate.setDate(depDate.getDate() + index * 2);
      const retDate = new Date(depDate);
      retDate.setDate(retDate.getDate() + 4);
      return {
        id: `schedule-${index + 1}`,
        departure: depDate.toISOString().split('T')[0],
        return: retDate.toISOString().split('T')[0],
        seats: 15 - (index % 5),
        price: 3500000 + (index * 100000)
      };
    }),
  });

  // -------------------- CÁC DỮ LIỆU KHÁC (hotels, flights, carsTrains, thingsToDo) --------------------
  ALL_LOCATIONS.forEach((loc, idx) => {
    for (let i = 1; i <= 5; i++) {
      const idSuffix = `${idx}_${i}`;
      const rating = randomRating();
      const reviews = randomReviews();
      const price = randomPrice(500, 8000);

      // Hotels
      const starLevel = randomInt(3, 5);
      data.hotels.push({
        id: `h_${idSuffix}`,
        name: `${hotelChains[i % hotelChains.length]} ${loc} Hotel & Resort`,
        location: loc,
        stars: starLevel,
        pricePerNight: randomPrice(800, 6000),
        rating,
        reviewsCount: reviews,
        amenities: randomItem(amenitiesList),
        image: `https://picsum.photos/seed/hotel_${idSuffix}/800/600`,
        description: `Khách sạn sang trọng bậc nhất ${loc}, view hướng biển/thành phố, phòng ốc tiện nghi, phục vụ chuyên nghiệp.`,
        roomTypes: [
          { name: "Phòng Superior", size: "25m²", bed: "1 giường đôi", price: randomPrice(800, 1500) },
          { name: "Phòng Deluxe", size: "35m²", bed: "1 giường king", price: randomPrice(1500, 3000) },
          { name: "Suite", size: "50m²", bed: "2 giường king", price: randomPrice(3000, 6000) }
        ],
        checkInTime: "14:00",
        checkOutTime: "12:00",
        policies: "Miễn phí hủy phòng trước 3 ngày, giữ phòng đến 18h tính thêm 50% phí."
      });

      // Flights
      const airline = randomItem(airlines);
      const isInternational = INT_LOCATIONS.includes(loc);
      const flightClass = i > 3 ? "Business" : "Economy";
      data.flights.push({
        id: `f_${idSuffix}`,
        airline: airline,
        flightNumber: `${airline.substring(0, 2).toUpperCase()}${randomInt(100, 999)}`,
        from: "Hà Nội (HAN)",
        to: loc,
        price: randomPrice(400, 2500),
        departureTime: `${randomInt(6, 21)}:${randomInt(0, 1) * 30}0`,
        arrivalTime: `${randomInt(8, 23)}:${randomInt(0, 1) * 30}0`,
        duration: isInternational ? `${randomInt(2, 8)}h${randomInt(0, 50)}m` : `${randomInt(1, 2)}h${randomInt(0, 30)}m`,
        class: flightClass,
        stops: randomInt(0, 1),
        baggage: flightClass === "Business" ? "30kg + 1 kiện xách tay 12kg" : "20kg + 1 kiện xách tay 7kg",
        image: `https://picsum.photos/seed/flight_${idSuffix}/800/600`
      });

      // Cars & Trains
      const type = i % 2 === 0 ? "Train" : "Car";
      const title = type === "Train" 
        ? `Tàu ${randomItem(trainTypes)} - Hà Nội đi ${loc}`
        : `Xe ${randomItem(carTypes)} - Xe riêng đi ${loc}`;
      data.carsTrains.push({
        id: `ct_${idSuffix}`,
        title: title,
        type: type,
        provider: type === "Train" ? "Đường sắt Việt Nam" : "EasyCar + Partners",
        price: randomPrice(200, 1500),
        duration: type === "Train" ? `${randomInt(6, 14)}h${randomInt(0, 50)}m` : `${randomInt(4, 10)}h${randomInt(0, 30)}m`,
        departure: `Ga Hà Nội / Nội thành`,
        destination: loc,
        features: type === "Train" 
          ? ["Điều hòa", "Giường nằm mềm", "Toa ăn", "Nhà vệ sinh"]
          : ["Máy lạnh", "Đưa đón tận nơi", "Tài xế thân thiện", "Nước suối miễn phí"],
        seatTypes: type === "Train" 
          ? [{ name: "Ghế cứng", price: randomPrice(100, 300) }, { name: "Ghế mềm", price: randomPrice(300, 600) }, { name: "Giường nằm", price: randomPrice(600, 1200) }]
          : [{ name: "Xe 4 chỗ", price: randomPrice(500, 1000) }, { name: "Xe 7 chỗ", price: randomPrice(800, 1500) }, { name: "Xe 16 chỗ", price: randomPrice(1200, 2000) }],
        image: `https://picsum.photos/seed/transport_${idSuffix}/800/600`
      });

      // Things To Do
      const category = randomItem(thingCategories);
      data.thingsToDo.push({
        id: `ttd_${idSuffix}`,
        title: `[${category}] Trải nghiệm đặc sắc tại ${loc} - Tour ${i}`,
        category: category,
        location: loc,
        price: randomPrice(50, 500),
        rating,
        reviewsCount: randomReviews(),
        openHours: `${randomInt(7, 9)}:00 - ${randomInt(17, 21)}:00`,
        image: `https://picsum.photos/seed/ttd_${idSuffix}/800/600`,
        shortDescription: `Một trải nghiệm thú vị dành cho du khách muốn khám phá ${loc} theo cách riêng.`,
        fullDescription: `Tham gia tour ${category.toLowerCase()} này bạn sẽ được hướng dẫn viên địa phương dẫn đi khám phá những góc khuất, nghe kể chuyện lịch sử, thưởng thức đặc sản và chụp ảnh sống ảo. Thời gian linh hoạt, phù hợp mọi lứa tuổi.`,
        duration: `${randomInt(2, 6)} giờ`,
        included: ["Vé tham quan", "Nước uống", "Hướng dẫn viên", "Ảnh kỷ niệm"],
        meetingPoint: `Sảnh chính khách sạn trung tâm ${loc}`,
        availableLanguages: ["Tiếng Việt", "Tiếng Anh"]
      });
    }
  });

  return data;
};

export const mockData = generateMockData();

// Các export giữ nguyên để không ảnh hưởng các file khác
export const carLocationsMock = [];
export const trainStationsMock = [];
export const flightAllPlaces = [];
export const flightLocationCategories = [];
export const flightCabinOptions = [];
export const hotelDestinationsMock = [];
export const toursLocationsMock = [];
export const thingsToDoLocationsMock = [];
export const getTourDestinations = (t) => [
  t ? t('all') : 'Tất cả',
  ...ALL_LOCATIONS
];
export const getTourOrigins = (t) => [
  t ? t('all') : 'Tất cả',
  ...ALL_LOCATIONS
];

// Dữ liệu cho các section khác (giữ nguyên)
export const toursForYouData = [
  {
    id: "r1",
    location: { titleKey: "hoChiMinhTitle", image: "https://picsum.photos/seed/hcm/800/600" },
    tours: Array.from({ length: 6 }, (_, i) => ({
      id: `hcm_t_${i}`,
      titleKey: `tour_hcm_${i+1}`,
      image: `https://picsum.photos/seed/hcm_t_${i}/800/600`,
      rating: (4.2 + Math.random() * 0.7).toFixed(1),
      reviewsCount: Math.floor(Math.random() * 1000) + 50,
      price: Math.floor(Math.random() * 500 + 300) * 1000
    }))
  },
  {
    id: "r2",
    location: { titleKey: "shanghai", image: "https://picsum.photos/seed/shanghai/800/600" },
    tours: Array.from({ length: 6 }, (_, i) => ({
      id: `sh_t_${i}`,
      titleKey: `tour_shanghai_${i+1}`,
      image: `https://picsum.photos/seed/sh_t_${i}/800/600`,
      rating: (4.2 + Math.random() * 0.7).toFixed(1),
      reviewsCount: Math.floor(Math.random() * 1000) + 50,
      price: Math.floor(Math.random() * 500 + 300) * 1000
    }))
  }
];

export const bestTourDealsData = [
  { id: "btd1", image: "https://picsum.photos/seed/btd1/800/600", rating: 4.8, reviewsCount: 1250, titleTemplate: "Tour Hanoi 5D4N: Hanoi + Sapa + Halong Bay", days: 5, departureLocation: "Hanoi", price: 8500000, departureDate: "May 15th" },
  { id: "btd2", image: "https://picsum.photos/seed/btd2/800/600", rating: 4.9, reviewsCount: 890, titleTemplate: "Tour Ho Chi Minh 4D3N: HCM + Cu Chi + Mekong Delta", days: 4, departureLocation: "Ho Chi Minh City", price: 6200000, departureDate: "June 02nd" }
];

// mockData.js (chỉ sửa phần toursDestinationsData)
export const toursDestinationsData = [
  { id: "td1", titleKey: "toursDestHanoi", toursCount: 156, image: "https://picsum.photos/seed/tdhanoi/800/600" },
  { id: "td2", titleKey: "toursDestSapa", toursCount: 84, image: "https://picsum.photos/seed/tdsapa/800/600" },
  { id: "td3", titleKey: "toursDestHanoi", toursCount: 124, image: "https://picsum.photos/seed/tdhanoi/800/600" },
  { id: "td4", titleKey: "toursDestHanoi", toursCount: 25, image: "https://picsum.photos/seed/tdhanoi/800/600" },
  { id: "td5", titleKey: "toursDestHanoi", toursCount: 65, image: "https://picsum.photos/seed/tdhanoi/800/600" },
];

export const getRelatedTours = (currentTourId, limit = 4) => {
  const currentTour = mockData.tours.find(tour => tour.id === currentTourId);
  if (!currentTour) return [];
  const related = mockData.tours.filter(tour => tour.id !== currentTourId && tour.location === currentTour.location);
  return related.slice(0, limit);
};

// Helper random cho highlights (nếu cần)
const randomHighlights = [
  "Trải nghiệm ẩm thực địa phương",
  "Khám phá di sản văn hóa",
  "Nghỉ dưỡng tại khách sạn 4 sao",
  "Hướng dẫn viên nhiệt tình",
  "Tặng kèm bảo hiểm du lịch",
  "Xe đưa đón đời mới",
  "Lịch trình linh hoạt"
];

const generateRandomHighlights = () => {
  const count = Math.floor(Math.random() * 3) + 3; 
  const shuffled = [...randomHighlights].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// ================== DỮ LIỆU MOCK CHO TRANG THANH TOÁN ==================
export const PAYMENT_METHODS = [
  {
    id: 'vietqr',
    name: 'VietQR',
    icon: '/icons/vietqr.svg'
  },
  {
    id: 'mobile_banking',
    name: 'Mobile Banking',
    icon: ''
  },
  {
    id: 'digital_wallet',
    name: 'Digital Wallet',
    icon: '/icons/momo.svg'
  },
  {
    id: 'credit_card',
    name: 'Credit Card/ Debit Card',
    icon: '/icons/visa.svg'
  }
];

// Hàm lấy booking mẫu dựa trên tourId và scheduleId
export const getMockBookingSummary = (tourId, scheduleId) => {
  const tour = mockData.tours.find(t => t.id === tourId) || mockData.tours[0];
  const schedule = tour.departureSchedules?.find(s => s.id === scheduleId) || tour.departureSchedules?.[0];
  const defaultPassengers = { adults: 2, children: 1, infants: 0 };
  const unitPrice = schedule?.price || tour.price || 3500000;
  const totalPrice = (defaultPassengers.adults * unitPrice) + (defaultPassengers.children * unitPrice * 0.7);
  
  return {
    tour,
    schedule,
    passengers: defaultPassengers,
    totalPrice: Math.round(totalPrice),
    unitPrice,
    extras: {
      travelInsurance: false,
      hotelUpgrade: false
    }
  };
};

/*
export const mockData = {
  users: [
    {
      id: "u1",
      fullName: "The Anh",
      email: "theanh",
      phone: "0987654321",
      password: "123456",
      avatar: "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/500744397_732843845888006_3892369977756513497_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFqEErgaz4hDrOOBuFwZr_ez7vCXAiTGnrPu8JcCJMaeisWl6vJFPTgmNe6tFV4ZHivFGX9qc66vJlu8BISf8lT&_nc_ohc=rQpAmuVtyt0Q7kNvwG8nayw&_nc_oc=AdqtHNcQUSrTxGVFZdDYQxoVv_wzb_rqPfgiYzXZjN33gWDg_5MCA-FHt7kpMO-79cudCiBB6sm05yxj0rdHta7q&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=Op3VSkLozVOT4NXdR2vZqA&_nc_ss=7a3a8&oh=00_Af1B8JdQsOuitjomANYBV_vI-R5jLmZ31T1d-u7fI2eDKw&oe=69E6CCBA",
      role: "client"
    }
  ],

  tours: [
    {
      id: "t1",
      title: "Ha Long Bay Luxury Cruise 2D1N",
      location: "Quang Ninh, Vietnam",
      price: {
        USD: 120,
        VND: 3000000
      },
      duration: "2 Days 1 Night",
      rating: 4.8,
      reviewsCount: 342,
      availableDates: ["2026-05-01", "2026-05-15", "2026-06-01"],
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      isFeatured: true
    },
    {
      id: "t2",
      title: "Sapa Trekking & Homestay Experience",
      location: "Lao Cai, Vietnam",
      price: {
        USD: 85,
        VND: 2125000
      },
      duration: "3 Days 2 Nights",
      rating: 4.9,
      reviewsCount: 512,
      availableDates: ["2026-04-20", "2026-04-25", "2026-05-10"],
      image: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=800&q=80",
      isFeatured: true
    },
    {
      id: "t3",
      title: "Mekong Delta Floating Market Tour",
      location: "Can Tho, Vietnam",
      price: {
        USD: 45,
        VND: 1125000
      },
      duration: "1 Day",
      rating: 4.5,
      reviewsCount: 128,
      availableDates: ["2026-04-18", "2026-04-19", "2026-04-20"],
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80",
      isFeatured: false
    },
    {
      id: "t4",
      title: "Hoi An Ancient Town Lantern Evening",
      location: "Quang Nam, Vietnam",
      price: {
        USD: 25,
        VND: 625000
      },
      duration: "4 Hours",
      rating: 4.7,
      reviewsCount: 890,
      availableDates: ["2026-04-17", "2026-04-18", "2026-04-19"],
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
      isFeatured: false
    },
    {
      id: "t5",
      title: "Phong Nha Cave Exploration",
      location: "Quang Binh, Vietnam",
      price: {
        USD: 60,
        VND: 1500000
      },
      duration: "1 Day",
      rating: 4.6,
      reviewsCount: 215,
      availableDates: ["2026-05-05", "2026-05-12", "2026-05-19"],
      image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=800&q=80",
      isFeatured: true
    }
  ],

  hotels: [
    {
      id: "h1",
      name: "InterContinental Hanoi Westlake",
      location: "Tay Ho, Hanoi",
      stars: 5,
      pricePerNight: {
        USD: 150,
        VND: 3750000
      },
      rating: 4.8,
      reviewsCount: 1024,
      amenities: ["Pool", "Spa", "Free WiFi", "Breakfast Included"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "h2",
      name: "Vinpearl Resort Nha Trang",
      location: "Hon Tre Island, Nha Trang",
      stars: 5,
      pricePerNight: {
        USD: 200,
        VND: 5000000
      },
      rating: 4.9,
      reviewsCount: 2056,
      amenities: ["Private Beach", "Water Park", "Spa", "All-inclusive"],
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "h3",
      name: "Lapis Hotel",
      location: "Hoan Kiem, Hanoi",
      stars: 4,
      pricePerNight: {
        USD: 65,
        VND: 1625000
      },
      rating: 4.5,
      reviewsCount: 432,
      amenities: ["City View", "Free WiFi", "Gym"],
      image: "https://images.unsplash.com/photo-1551882547-ff40c0d5e914?auto=format&fit=crop&w=800&q=80"
    }
  ],

  thingsToDo: [
    {
      id: "ttd1",
      title: "Ba Na Hills Theme Park",
      category: "Attraction",
      location: "Da Nang, Vietnam",
      price: {
        USD: 35,
        VND: 875000
      },
      rating: 4.7,
      reviewsCount: 3102,
      openHours: "08:00 - 17:00",
      image: "https://images.unsplash.com/photo-1596711438515-b74c2cd8d1ff?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ttd2",
      title: "Thang Long Water Puppet Theatre",
      category: "Entertainment",
      location: "Hoan Kiem, Hanoi",
      price: {
        USD: 10,
        VND: 250000
      },
      rating: 4.4,
      reviewsCount: 856,
      openHours: "15:00 - 21:00",
      image: "https://images.unsplash.com/photo-1563212046-24ba7b1652f4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ttd3",
      title: "VinWonders Phu Quoc",
      category: "Attraction",
      location: "Phu Quoc, Kien Giang",
      price: {
        USD: 40,
        VND: 1000000
      },
      rating: 4.8,
      reviewsCount: 1542,
      openHours: "09:00 - 19:30",
      image: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ttd4",
      title: "Vietnamese Cooking Class",
      category: "Activity",
      location: "District 1, Ho Chi Minh City",
      price: {
        USD: 28,
        VND: 700000
      },
      rating: 4.9,
      reviewsCount: 320,
      openHours: "09:00 - 13:00",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
    }
  ]
};
*/