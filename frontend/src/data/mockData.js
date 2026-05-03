// mockData.js
// Only basic constants and stubs for backward compatibility during migration

export const VN_PROVINCES = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lạng Sơn", "Lào Cai", "Lâm Đồng", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

export const INT_LOCATIONS = [
  "South Korea", "China", "Japan", "Malaysia", "Laos", "Cambodia", "Singapore", "Thailand", "Taiwan", "France", "USA", "Australia"
];

export const ALL_LOCATIONS = [...VN_PROVINCES, ...INT_LOCATIONS];

export const mockData = {
  users: [],
  tours: [],
  hotels: [],
  flights: [],
  carsTrains: [],
  thingsToDo: []
};

// Stubs for search components
export const getTourDestinations = (t) => [
  { id: 'hanoi', label: 'Hà Nội', count: 1, image: 'https://picsum.photos/seed/hanoi/400/400' },
  { id: 'danang', label: 'Đà Nẵng', count: 1, image: 'https://picsum.photos/seed/danang/400/400' },
  { id: 'hcm', label: 'Hồ Chí Minh', count: 1, image: 'https://picsum.photos/seed/hcm/400/400' }
];

export const getTourOrigins = (t) => [
  t ? t('all') : 'Tất cả',
  ...ALL_LOCATIONS
];

// Empty data for landing pages (now handled by API in components)
export const toursForYouData = [];
export const bestTourDealsData = [];
export const toursDestinationsData = [];

export const getRelatedTours = () => [];

export const PAYMENT_METHODS = [
  { id: 'vnpay', name: 'VNPAY (ATM, Credit Card, VietQR)', icon: 'https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png' },
  { id: 'paypal', name: 'PayPal', icon: 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg' }
];

export const getMockBookingSummary = () => ({});

export const filterMockData = {
  durations: ["2-4 ngày", "5-6 ngày", "7-8 ngày", "9-10 ngày"],
  prices: ["< 11 triệu", "11 triệu - 18 triệu", "18 triệu - 21 triệu", "> 21 triệu"],
  shopping: ["Không Shopping", "Có Shopping"]
};

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const mockRoutes = [];
export const sortOptions = [
  { id: 'suggested', label: 'Hanuvivu suggests' },
  { id: 'duration', label: 'Duration' },
  { id: 'departure', label: 'Departure Date' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' }
];

export const categories = [];
export const attractions = [];
export const experiences = [];
export const essentials = [];
export const allActivities = [];
export const reviews = [];