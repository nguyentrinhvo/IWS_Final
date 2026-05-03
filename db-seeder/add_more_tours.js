import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toursFilePath = path.join(__dirname, 'data', 'tous.json');

const cities = ["Đà Nẵng", "Nha Trang", "Phú Quốc", "Đà Lạt", "Sapa", "Huế", "Hội An", "Quy Nhơn", "Phú Yên", "Hạ Long"];
const tourTypes = ["Nghỉ dưỡng", "Khám phá", "Trải nghiệm", "Văn hóa", "Mạo hiểm"];
const adjectives = ["Tuyệt vời", "Kỳ thú", "Thơ mộng", "Hấp dẫn", "Độc đáo", "Hoang sơ", "Kỳ vĩ"];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMoreTours(count) {
  const newTours = [];
  const startId = Date.now();

  for (let i = 0; i < count; i++) {
    const city = getRandomItem(cities);
    const type = getRandomItem(tourTypes);
    const adj = getRandomItem(adjectives);
    const durationDays = getRandomInt(2, 5);
    const price = getRandomInt(15, 80) * 100000; // 1.5M to 8M
    
    const tour = {
      id: `TOUR_GEN_${startId + i}`,
      title: `${type} ${city} ${adj} ${durationDays} ngày`,
      location: city,
      price: price,
      duration: `${durationDays} ngày ${durationDays - 1} đêm`,
      rating: +(Math.random() * (5 - 4) + 4).toFixed(1), // 4.0 to 5.0
      reviewsCount: getRandomInt(50, 2000),
      image: `https://picsum.photos/seed/gen_tour_${startId}_${i}/800/600`,
      isFeatured: Math.random() > 0.8,
      description: `Một hành trình ${type.toLowerCase()} tại ${city} mang lại cho bạn những trải nghiệm ${adj.toLowerCase()} và khó quên cùng gia đình và người thân.`,
      itinerary: Array.from({ length: durationDays }).map((_, day) => ({
        day: day + 1,
        title: `Ngày ${day + 1}: Khám phá ${city}`,
        meals: "Sáng, Trưa, Tối",
        hotel: `Khách sạn tại ${city}`
      })),
      highlights: [
        `Tham quan các điểm nổi tiếng tại ${city}`,
        `Thưởng thức ẩm thực địa phương đặc sắc`,
        `Nghỉ ngơi và thư giãn`
      ],
      inclusions: [
        "Xe đưa đón đời mới",
        "Khách sạn tiêu chuẩn",
        "Các bữa ăn theo chương trình",
        "Hướng dẫn viên nhiệt tình",
        "Bảo hiểm du lịch"
      ],
      exclusions: [
        "Vé máy bay khứ hồi",
        "Chi phí cá nhân ngoài chương trình",
        "VAT"
      ],
      availableDates: [
        "2026-06-10", "2026-06-15", "2026-06-20", "2026-07-01", "2026-07-15"
      ],
      departure: "Hà Nội / TP. Hồ Chí Minh",
      tourCode: `${city.substring(0, 3).toUpperCase()}-${type.substring(0, 3).toUpperCase()}-${durationDays}D`,
      images: [
        `https://picsum.photos/seed/gen_${startId}_${i}_1/800/600`,
        `https://picsum.photos/seed/gen_${startId}_${i}_2/800/600`
      ],
      departureSchedules: [
        {
          id: `sch_${startId}_${i}_1`,
          departure: "2026-06-10",
          return: "2026-06-10", // Simplification
          seats: getRandomInt(10, 30),
          price: price
        },
        {
          id: `sch_${startId}_${i}_2`,
          departure: "2026-06-20",
          return: "2026-06-20", 
          seats: getRandomInt(10, 30),
          price: price + 200000
        }
      ],
      terms: "Hủy trước 7 ngày hoàn 100%."
    };
    newTours.push(tour);
  }
  return newTours;
}

try {
  const rawData = fs.readFileSync(toursFilePath, 'utf8');
  const toursData = JSON.parse(rawData);
  
  const additionalTours = generateMoreTours(20); // Generate 20 more tours
  toursData.push(...additionalTours);
  
  fs.writeFileSync(toursFilePath, JSON.stringify(toursData, null, 2), 'utf8');
  console.log(`Successfully added 20 new tours! Total tours: ${toursData.length}`);
} catch (error) {
  console.error("Error updating tours:", error);
}
