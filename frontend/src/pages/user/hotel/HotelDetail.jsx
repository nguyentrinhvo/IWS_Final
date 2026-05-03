import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HotelHeader from '../../../components/user/HotelHeader';
import HotelGallery from '../../../components/user/HotelGallery';
import HotelAmenities from '../../../components/user/HotelAmenities';
import RoomCard from '../../../components/user/RoomCard';

const MOCK_HOTEL_DETAIL = {
  id: 1,
  name: 'InterContinental Danang Sun Peninsula Resort',
  location: 'Son Tra Peninsula, Da Nang, Vietnam',
  stars: 5,
  rating: 4.9,
  reviewCount: 1248,
  minPrice: 8500000,
  description: 'Nestled in the heart of Son Tra Peninsula, InterContinental Danang Sun Peninsula Resort is a luxury multi-award-winning resort where myth meets luxury. Enjoy the very best of Vietnam at this iconic property designed by star architect Bill Bensley.',
  images: [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ],
  amenities: [
    'Free Wifi', 'Pool', 'Parking', 'Breakfast', 'Air conditioning', 'Gym', 'Spa', 'Beachfront', 'Restaurant'
  ],
  rooms: [
    {
      id: 'r1',
      name: 'Resort Classic Oceanview',
      capacity: 2,
      bedType: '1 King Bed or 2 Single Beds',
      size: 70,
      price: 8500000,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'r2',
      name: 'Son Tra Oceanview Terrace Suite',
      capacity: 2,
      bedType: '1 King Bed',
      size: 80,
      price: 12500000,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'r3',
      name: 'Club InterContinental Penthouse',
      capacity: 4,
      bedType: '2 King Beds',
      size: 150,
      price: 25000000,
      image: 'https://images.unsplash.com/photo-1591088398332-8a77d399e80c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]
};

const HotelDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hotel, setHotel] = useState(MOCK_HOTEL_DETAIL);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // In real app: fetch hotel by id
  }, [id]);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    // Scroll to bottom or show a sticky CTA
    console.log('Room selected:', room.name);
  };

  const handleBookNow = () => {
    if (!selectedRoom) {
      alert('Please select a room first');
      return;
    }
    navigate('/hotels/booking', { state: { hotelId: hotel.id, roomId: selectedRoom.id } });
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        
        {/* Breadcrumbs Placeholder */}
        <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">
          <span className="hover:text-[#7978E9] cursor-pointer">Hotels</span>
          <span className="mx-2">/</span>
          <span className="hover:text-[#7978E9] cursor-pointer">Da Nang</span>
          <span className="mx-2">/</span>
          <span className="text-[#1a2b49]">{hotel.name}</span>
        </div>

        <HotelHeader hotel={hotel} />
        
        <HotelGallery images={hotel.images} />

        <HotelAmenities amenities={hotel.amenities} />

        {/* Room List Section */}
        <div id="rooms" className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-black text-[#1a2b49]">Available Room Types</h3>
              <p className="text-gray-500 font-medium">Prices include taxes & fees</p>
            </div>
            {selectedRoom && (
              <div className="flex items-center gap-6 bg-white p-3 pr-4 rounded-2xl border-2 border-green-500 shadow-lg animate-in slide-in-from-right duration-300">
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Selected Room</p>
                  <p className="font-bold text-[#1a2b49]">{selectedRoom.name}</p>
                </div>
                <button 
                  onClick={handleBookNow}
                  className="bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  Book This Room
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {hotel.rooms.map(room => (
              <RoomCard 
                key={room.id} 
                room={room} 
                onSelect={handleSelectRoom}
                isSelected={selectedRoom?.id === room.id}
              />
            ))}
          </div>
        </div>

        {/* Policies Section Placeholder */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-[#1a2b49] mb-6">Hotel Policies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">Check-in / Check-out</p>
              <div className="space-y-1 text-sm text-gray-500">
                <div className="flex justify-between"><span>Check-in from:</span> <span>15:00</span></div>
                <div className="flex justify-between"><span>Check-out before:</span> <span>12:00</span></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">Children & Extra Beds</p>
              <p className="text-sm text-gray-500">Children under 12 stay for free using existing bedding. Extra beds are available upon request.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HotelDetail;
