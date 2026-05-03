import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '../backend/demo/.env' });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('test'); // Push to 'test' database as requested
    
    console.log("Connected to MongoDB (database: test)!");

    // 1. Seed Tours from tous.json
    const toursFilePath = path.join(__dirname, 'data', 'tous.json');
    if (fs.existsSync(toursFilePath)) {
      const toursCol = db.collection('tours');
      await toursCol.deleteMany({});
      
      const rawData = fs.readFileSync(toursFilePath, 'utf8');
      const toursData = JSON.parse(rawData);

      const toursToInsert = toursData.map(t => {
        let durationDays = 3; 
        if (t.duration) {
          const match = t.duration.match(/\d+/);
          if (match) durationDays = parseInt(match[0], 10);
        }
        
        return {
          _id: t.id.length === 24 ? new ObjectId(t.id) : undefined, // Let Mongo generate if not valid ObjectId
          nameVi: t.title,
          nameEn: t.title, 
          descriptionVi: t.description + (t.highlights ? "\nHighlights: " + t.highlights.join(", ") : ""),
          descriptionEn: t.description + (t.highlights ? "\nHighlights: " + t.highlights.join(", ") : ""),
          tourType: "domestic",
          priceAdult: t.price,
          priceChild: t.price * 0.7,
          durationDays: durationDays,
          departureCity: t.departure || "Hà Nội",
          destination: t.location,
          country: "Vietnam",
          requireVisa: false,
          visaInfo: "",
          maxCapacity: 20,
          avgRating: t.rating || 4.5,
          totalReviews: t.reviewsCount || 100,
          isDeleted: false,
          images: t.images ? t.images.map((url, i) => ({ url, caption: "Tour image", isPrimary: i === 0 })) : (t.image ? [{ url: t.image, caption: "Primary", isPrimary: true }] : []),
          itinerary: t.itinerary ? t.itinerary.map(it => ({ 
            day: it.day, 
            titleVi: it.title, 
            titleEn: it.title, 
            descriptionVi: `Meals: ${it.meals || 'N/A'}, Hotel: ${it.hotel || 'N/A'}`, 
            descriptionEn: `Meals: ${it.meals || 'N/A'}, Hotel: ${it.hotel || 'N/A'}` 
          })) : [],
          departures: t.departureSchedules ? t.departureSchedules.map(sch => ({ 
            departureDate: new Date(sch.departure), 
            availableSeats: sch.seats, 
            isActive: true 
          })) : [],
          createdAt: new Date(),
          updatedAt: new Date()
        };
      });
      
      await toursCol.insertMany(toursToInsert);
      console.log(`Seeded ${toursToInsert.length} tours from tous.json.`);
    }

    // 2. Seed Bus/Train Routes
    const transportCol = db.collection('bus_train_routes');
    await transportCol.deleteMany({});
    const transportRoutes = [
      {
        operatorName: 'Hoang Long Bus',
        vehicleType: 'bus',
        vehicleClass: 'Sleeper',
        departureCity: 'Hanoi',
        arrivalCity: 'Da Nang',
        departureTime: '08:00',
        arrivalTime: '20:00',
        price: 450000,
        totalSeats: 40,
        isActive: true,
        seatMap: Array.from({ length: 40 }, (_, i) => ({
          position: `${String.fromCharCode(65 + Math.floor(i / 10))}${i % 10 + 1}`,
          status: Math.random() > 0.8 ? 'booked' : 'available'
        }))
      },
      {
        operatorName: 'Phuong Trang (FUTA)',
        vehicleType: 'bus',
        vehicleClass: 'Sleeper',
        departureCity: 'Hanoi',
        arrivalCity: 'Da Nang',
        departureTime: '10:30',
        arrivalTime: '22:45',
        price: 480000,
        totalSeats: 38,
        isActive: true,
        seatMap: Array.from({ length: 38 }, (_, i) => ({
          position: `S${i + 1}`,
          status: 'available'
        }))
      },
      {
        operatorName: 'Vietnam Railways',
        vehicleType: 'train',
        vehicleClass: 'Soft seat',
        departureCity: 'Hanoi',
        arrivalCity: 'Da Nang',
        departureTime: '06:00',
        arrivalTime: '21:30',
        price: 850000,
        totalSeats: 64,
        isActive: true,
        seatMap: Array.from({ length: 64 }, (_, i) => ({
          position: `T${i + 1}`,
          status: 'available'
        }))
      }
    ];
    await transportCol.insertMany(transportRoutes);
    console.log("Seeded 3 transport routes.");

    // 3. Seed Flights
    const flightCol = db.collection('flights');
    await flightCol.deleteMany({});
    const flights = [
      {
        airline: 'Vietnam Airlines',
        flightNumber: 'VN123',
        departureCity: 'Hanoi',
        arrivalCity: 'Ho Chi Minh',
        departureAirport: 'HAN',
        arrivalAirport: 'SGN',
        basePrice: 1200000,
        cabinClass: 'Economy',
        isActive: true,
        schedules: [
          {
            departureTime: new Date('2026-05-10T08:00:00'),
            arrivalTime: new Date('2026-05-10T10:15:00'),
            availableSeats: 120
          }
        ]
      },
      {
        airline: 'Vietjet Air',
        flightNumber: 'VJ456',
        departureCity: 'Hanoi',
        arrivalCity: 'Ho Chi Minh',
        departureAirport: 'HAN',
        arrivalAirport: 'SGN',
        basePrice: 850000,
        cabinClass: 'Economy',
        isActive: true,
        schedules: [
          {
            departureTime: new Date('2026-05-10T14:30:00'),
            arrivalTime: new Date('2026-05-10T16:45:00'),
            availableSeats: 150
          }
        ]
      }
    ];
    await flightCol.insertMany(flights);
    console.log("Seeded 2 flight routes.");

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await client.close();
  }
}

run();
