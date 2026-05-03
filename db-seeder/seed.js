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

    // 2. Seed Hotels from hotels.json
    const hotelsFilePath = path.join(__dirname, 'data', 'hotels.json');
    if (fs.existsSync(hotelsFilePath)) {
      const hotelsCol = db.collection('hotels');
      await hotelsCol.deleteMany({});

      const hotelsRaw = fs.readFileSync(hotelsFilePath, 'utf8');
      const hotelsData = JSON.parse(hotelsRaw);

      const hotelsToInsert = hotelsData.map(h => ({
        // Match Spring Boot HotelDocument schema exactly
        name: h.name,
        address: h.address,
        city: h.location,           // hotels.json uses "location" → map to "city"
        country: 'Vietnam',
        starRating: h.starRating,
        description: h.description,
        thumbnailUrl: h.image,      // hotels.json uses "image" → map to "thumbnailUrl"
        images: h.images
          ? h.images.map((url, i) => ({ url, caption: `Hotel image ${i + 1}`, isPrimary: i === 0 }))
          : [],
        amenities: h.amenities || [],
        latitude: h.coordinates?.lat || null,
        longitude: h.coordinates?.lng || null,
        avgRating: h.rating || 4.5,
        roomTypes: (h.rooms || []).map(r => ({
          typeName: r.type,
          pricePerNight: r.price,
          maxGuests: r.maxGuests,
          availableRooms: r.available || 10,
          amenities: [],
          imageUrl: h.image || null    // use hotel main image as room image
        })),
        isActive: !h.isDeleted,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await hotelsCol.insertMany(hotelsToInsert);
      console.log(`Seeded ${hotelsToInsert.length} hotels from hotels.json.`);
    }


    // 3. Seed Flights from flights.json
    const flightsFilePath = path.join(__dirname, 'data', 'flights.json');
    if (fs.existsSync(flightsFilePath)) {
      const flightCol = db.collection('flights');
      await flightCol.deleteMany({});

      const flightsRaw = fs.readFileSync(flightsFilePath, 'utf8');
      const flightsData = JSON.parse(flightsRaw);

      const flightsToInsert = flightsData.map(f => ({
        flightId: f.id,
        airline: f.airline,
        flightNumber: f.flightNumber,
        departureCity: f.departureCity,
        arrivalCity: f.arrivalCity,
        departureAirport: f.departureAirport,
        arrivalAirport: f.arrivalAirport,
        departureAirportName: f.departureAirportName || '',
        arrivalAirportName: f.arrivalAirportName || '',
        basePrice: f.basePrice,
        cabinClass: f.cabinClass || 'Economy',
        aircraft: f.aircraft || '',
        avgRating: f.rating || 4.5,
        totalReviews: f.reviewsCount || 0,
        isFeatured: f.isFeatured || false,
        description: f.description || '',
        imageUrl: f.image || null,
        amenities: f.amenities || [],
        baggagePolicy: f.baggagePolicy || {},
        schedules: f.schedules ? f.schedules.map(sch => ({
          scheduleId: sch.id,
          departureTime: new Date(sch.departureTime),
          arrivalTime: new Date(sch.arrivalTime),
          availableSeats: sch.availableSeats,
          price: sch.price
        })) : [],
        isActive: f.isActive !== false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await flightCol.insertMany(flightsToInsert);
      console.log(`Seeded ${flightsToInsert.length} flights from flights.json.`);
    }

    // 4. Seed Cars & Trains from cars_trains.json
    const carsTrainsFilePath = path.join(__dirname, 'data', 'cars_trains.json');
    if (fs.existsSync(carsTrainsFilePath)) {
      const transportCol = db.collection('bus_train_routes');
      await transportCol.deleteMany({});

      const ctRaw = fs.readFileSync(carsTrainsFilePath, 'utf8');
      const ctData = JSON.parse(ctRaw);

      const transportToInsert = ctData.map(t => ({
        routeId: t.id,
        operatorName: t.operatorName,
        vehicleType: t.vehicleType,
        vehicleClass: t.vehicleClass,
        departureCity: t.departureCity,
        arrivalCity: t.arrivalCity,
        departureStation: t.departureStation || '',
        arrivalStation: t.arrivalStation || '',
        departureTime: t.departureTime,
        arrivalTime: t.arrivalTime,
        duration: t.duration || '',
        price: t.price,
        totalSeats: t.totalSeats,
        avgRating: t.rating || 4.0,
        totalReviews: t.reviewsCount || 0,
        isFeatured: t.isFeatured || false,
        description: t.description || '',
        amenities: t.amenities || [],
        schedules: t.schedules ? t.schedules.map(sch => ({
          scheduleId: sch.id,
          date: sch.date,
          departureTime: sch.departureTime,
          arrivalTime: sch.arrivalTime,
          availableSeats: sch.availableSeats,
          price: sch.price
        })) : [],
        seatMap: Array.from({ length: t.totalSeats }, (_, i) => ({
          position: `${t.vehicleType === 'train' ? 'T' : 'S'}${i + 1}`,
          status: 'available'
        })),
        isActive: t.isActive !== false,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await transportCol.insertMany(transportToInsert);
      console.log(`Seeded ${transportToInsert.length} car/train routes from cars_trains.json.`);
    }

    // 5. Seed Things To Do from things_to_do.json
    const ttdFilePath = path.join(__dirname, 'data', 'things_to_do.json');
    if (fs.existsSync(ttdFilePath)) {
      const ttdCol = db.collection('things_to_do');
      await ttdCol.deleteMany({});

      const ttdRaw = fs.readFileSync(ttdFilePath, 'utf8');
      const ttdData = JSON.parse(ttdRaw);

      const ttdToInsert = ttdData.map(a => ({
        activityId: a.id,
        title: a.title,
        category: a.category,
        location: a.location,
        price: a.price,
        duration: a.duration || '',
        avgRating: a.rating || 4.5,
        totalReviews: a.reviewsCount || 0,
        isFeatured: a.isFeatured || false,
        description: a.description || '',
        highlights: a.highlights || [],
        inclusions: a.inclusions || [],
        exclusions: a.exclusions || [],
        availableDates: a.availableDates ? a.availableDates.map(d => new Date(d)) : [],
        images: a.images ? a.images.map((url, i) => ({ url, caption: `Activity image ${i + 1}`, isPrimary: i === 0 })) : [],
        ageRestriction: a.ageRestriction || '',
        maxParticipants: a.maxParticipants || 0,
        meetingPoint: a.meetingPoint || '',
        terms: a.terms || '',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await ttdCol.insertMany(ttdToInsert);
      console.log(`Seeded ${ttdToInsert.length} activities from things_to_do.json.`);
    }

    // 6. Seed Users from users.json
    const usersFilePath = path.join(__dirname, 'data', 'users.json');
    if (fs.existsSync(usersFilePath)) {
      const usersCol = db.collection('users');
      await usersCol.deleteMany({});

      const usersRaw = fs.readFileSync(usersFilePath, 'utf8');
      const usersData = JSON.parse(usersRaw);

      const usersToInsert = usersData.map(u => ({
        _id: u.id ? new ObjectId(u.id) : undefined,
        email: u.email,
        fullName: u.fullName,
        passwordHash: u.passwordHash,
        role: u.role || 'customer',
        phoneNumber: u.phoneNumber || '',
        city: u.city || '',
        provider: u.provider || 'local',
        language: u.language || 'vi',
        isLocked: u.isLocked || false,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await usersCol.insertMany(usersToInsert);
      console.log(`Seeded ${usersToInsert.length} users from users.json.`);
    }

    // 7. Seed Bookings from bookings.json
    const bookingsFilePath = path.join(__dirname, 'data', 'bookings.json');
    if (fs.existsSync(bookingsFilePath)) {
      const bookingsCol = db.collection('bookings');
      await bookingsCol.deleteMany({});

      const bookingsRaw = fs.readFileSync(bookingsFilePath, 'utf8');
      const bookingsData = JSON.parse(bookingsRaw);

      const bookingsToInsert = bookingsData.map(b => ({
        _id: b.id ? new ObjectId(b.id) : undefined,
        userId: b.userId,
        serviceId: b.serviceId,
        serviceType: b.serviceType,
        numAdults: b.numAdults || 0,
        numChildren: b.numChildren || 0,
        quantity: b.quantity || 1,
        totalPrice: b.totalPrice,
        status: b.status || 'pending',
        snapshotName: b.snapshotName || '',
        snapshotPrice: b.snapshotPrice || 0,
        createdAt: b.createdAt ? new Date(b.createdAt) : new Date(),
        updatedAt: new Date()
      }));

      await bookingsCol.insertMany(bookingsToInsert);
      console.log(`Seeded ${bookingsToInsert.length} bookings from bookings.json.`);
    }

    // 8. Seed Categories from categories.json
    const categoriesFilePath = path.join(__dirname, 'data', 'categories.json');
    if (fs.existsSync(categoriesFilePath)) {
      const categoriesCol = db.collection('categories');
      await categoriesCol.deleteMany({});

      const categoriesRaw = fs.readFileSync(categoriesFilePath, 'utf8');
      const categoriesData = JSON.parse(categoriesRaw);

      const categoriesToInsert = categoriesData.map(c => ({
        _id: c.id ? new ObjectId(c.id) : undefined,
        nameVi: c.nameVi,
        nameEn: c.nameEn,
        descriptionVi: c.descriptionVi,
        descriptionEn: c.descriptionEn,
        imageUrl: c.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await categoriesCol.insertMany(categoriesToInsert);
      console.log(`Seeded ${categoriesToInsert.length} categories from categories.json.`);
    }

    console.log("\n✅ Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await client.close();
  }
}

run();
