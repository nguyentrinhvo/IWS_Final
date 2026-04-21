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