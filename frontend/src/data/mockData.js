const VN_PROVINCES = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lạng Sơn", "Lào Cai", "Lâm Đồng", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

const INT_LOCATIONS = [
  "South Korea", "China", "Japan", "Malaysia", "Laos", "Cambodia", "Singapore", "Europe"
];

const ALL_LOCATIONS = [...VN_PROVINCES, ...INT_LOCATIONS];

// Helper để tạo giá ngẫu nhiên (VND) cho đẹp UI
const getRandomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1) + min) * 1000;

const generateMockData = () => {
  const data = {
    users: [
      {
        id: "u1",
        fullName: "The Anh",
        email: "theanh@gmail.com",
        phone: "0987654321",
        password: "123456",
        avatar: "https://i.pravatar.cc/150?u=u1",
        role: "client"
      }
    ],
    tours: [],
    hotels: [],
    flights: [],
    carsTrains: [],
    thingsToDo: []
  };

  ALL_LOCATIONS.forEach((loc, index) => {
    for (let i = 1; i <= 5; i++) {
      const idSuffix = `${index}_${i}`;

      // 1. TOURS
      data.tours.push({
        id: `t_${idSuffix}`,
        title: `Trọn gói khám phá ${loc} - Mẫu số ${i}`,
        location: loc,
        price: getRandomPrice(500, 5000), // Giá từ 500k - 5tr VND
        duration: `${i + 1} ngày ${i} đêm`,
        rating: (4 + Math.random()).toFixed(1),
        reviewsCount: Math.floor(Math.random() * 1000),
        image: `https://picsum.photos/seed/tour${idSuffix}/800/600`,
        isFeatured: i === 1
      });

      // 2. HOTELS
      data.hotels.push({
        id: `h_${idSuffix}`,
        name: `${loc} Grand Luxury Hotel ${i}`,
        location: loc,
        stars: 5,
        pricePerNight: getRandomPrice(800, 8000),
        rating: (4 + Math.random()).toFixed(1),
        reviewsCount: Math.floor(Math.random() * 2000),
        amenities: ["Pool", "Spa", "Free WiFi", "Breakfast"],
        image: `https://picsum.photos/seed/hotel${idSuffix}/800/600`
      });

      // 3. FLIGHTS
      data.flights.push({
        id: `f_${idSuffix}`,
        airline: i % 2 === 0 ? "Vietnam Airlines" : "Vietjet Air",
        from: "Hà Nội (HAN)",
        to: loc,
        price: getRandomPrice(400, 3000),
        departureTime: "08:00 AM",
        class: i > 3 ? "Business" : "Economy",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Vietnam_Airlines_logo_2015.svg/1024px-Vietnam_Airlines_logo_2015.svg.png"
      });

      // 4. CARS & TRAINS
      data.carsTrains.push({
        id: `ct_${idSuffix}`,
        title: i % 2 === 0 ? `Tàu hỏa cao tốc đi ${loc}` : `Xe Limousine riêng đi ${loc}`,
        type: i % 2 === 0 ? "Train" : "Car",
        provider: i % 2 === 0 ? "Đường sắt VN" : "EasyTransport",
        price: getRandomPrice(200, 1500),
        duration: "4-6 Tiếng",
        image: `https://picsum.photos/seed/transport${idSuffix}/800/600`
      });

      // 5. THINGS TO DO
      data.thingsToDo.push({
        id: `ttd_${idSuffix}`,
        title: `Tham quan thắng cảnh ${loc} #${i}`,
        category: i % 2 === 0 ? "Văn hóa" : "Giải trí",
        location: loc,
        price: getRandomPrice(50, 500),
        rating: (4 + Math.random()).toFixed(1),
        reviewsCount: Math.floor(Math.random() * 500),
        openHours: "08:00 - 18:00",
        image: `https://picsum.photos/seed/ttd${idSuffix}/800/600`
      });
    }
  });

  return data;
};

export const mockData = generateMockData();