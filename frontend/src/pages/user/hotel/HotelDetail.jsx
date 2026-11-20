import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HotelHeader from '../../../components/user/HotelHeader';
import HotelGallery from '../../../components/user/HotelGallery';
import HotelAmenities from '../../../components/user/HotelAmenities';
import RoomCard from '../../../components/user/RoomCard';
import { hotelService } from '../../../services/hotelService';

const HotelDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      fetchHotel(id);
    }
  }, [id]);

  const fetchHotel = async (hotelId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await hotelService.getHotelById(hotelId);
      setHotel(mapHotelDTO(data));
    } catch (err) {
      console.error('Failed to fetch hotel:', err);
      setError('Không thể tải thông tin khách sạn. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Map backend HotelDTO -> component-friendly shape
  const mapHotelDTO = (dto) => ({
    id: dto.id,
    name: dto.name,
    location: `${dto.address || ''}, ${dto.city || ''}, ${dto.country || ''}`.replace(/^,\s*/, ''),
    stars: dto.starRating || 0,
    rating: dto.avgRating || 0,
    reviewCount: null,
    minPrice: dto.roomTypes?.length
      ? Math.min(...dto.roomTypes.map(r => r.pricePerNight || 0))
      : 0,
    description: dto.description || '',
    images: [
      dto.thumbnailUrl,
      ...(dto.images?.map(img => img.url || img) || [])
    ].filter(Boolean),
    amenities: dto.amenities || [],
    rooms: (dto.roomTypes || []).map((rt, idx) => ({
      id: `${dto.id}-room-${idx}`,
      name: rt.typeName,
      capacity: rt.maxGuests,
      bedType: `Max ${rt.maxGuests} Guests`,
      size: null,
      price: rt.pricePerNight,
      image: rt.imageUrl || dto.thumbnailUrl || '',
      amenities: rt.amenities || [],
      availableRooms: rt.availableRooms,
    })),
  });

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const { checkIn, checkOut, guests } = location.state || {};

  const handleBookNow = () => {
    if (!selectedRoom) {
      alert('Please select a room first');
      return;
    }
    navigate('/hotels/booking', {
      state: {
        hotel: {
          id: hotel.id,
          name: hotel.name,
          location: hotel.location,
          thumbnailUrl: hotel.images?.[0] || '',
        },
        room: selectedRoom,
        checkIn,
        checkOut,
        guests,
      }
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50/50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-[#7978E9]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500 font-medium">Đang tải thông tin khách sạn...</p>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="bg-gray-50/50 min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-red-500 font-bold text-lg mb-4">{error || 'Không tìm thấy khách sạn'}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#7978E9] text-white rounded-xl font-bold hover:bg-[#6665d0] transition-all"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <div className="max-w-[1200px] mx-auto px-4 py-8">

        {/* Breadcrumbs */}
        <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">
          <span
            onClick={() => navigate('/hotels')}
            className="hover:text-[#7978E9] cursor-pointer"
          >
            Hotels
          </span>
          <span className="mx-2">/</span>
          <span className="hover:text-[#7978E9] cursor-pointer">{hotel.location?.split(',').slice(-2, -1)[0]?.trim() || 'Vietnam'}</span>
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

          {hotel.rooms.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
              <p className="text-gray-400 font-medium">Không có phòng nào khả dụng</p>
            </div>
          ) : (
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
          )}
        </div>

        {/* Policies Section */}
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
