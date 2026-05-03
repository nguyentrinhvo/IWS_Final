import React, { useState, useEffect } from 'react';
import { 
  Building, MapPin, Star, BedDouble, 
  Search, Filter, Plus, Pencil, Trash2, Home
} from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';
import AdminModal from '../../../components/admin/AdminModal';
import ConfirmModal from '../../../components/admin/ConfirmModal';
import { hotelService } from '../../../services/hotelService';
import { toast } from 'react-hot-toast';

const HotelManagement = () => {
  const [activeTab, setActiveTab] = useState('Hotels');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 0, size: 10, totalElements: 0 });
  const [stats, setStats] = useState({
    totalHotels: 0,
    activeHotels: 0,
    totalRoomTypes: 0,
    totalAvailableRooms: 0
  });

  const fetchStats = async () => {
    try {
      const data = await hotelService.getHotelStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching hotel stats:", error);
    }
  };

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const data = await hotelService.getAllHotels(
        pagination.page, 
        pagination.size, 
        'id,desc', 
        { 
          name: searchTerm, 
          city: selectedCity, 
          starRating: selectedRating 
        }
      );
      setHotels(data.content);
      // Populate rooms from hotels
      const allRooms = data.content.flatMap(h => 
        (h.roomTypes || []).map(r => ({
          ...r,
          id: `${h.id}-${r.typeName}`, // Virtual ID for keying
          hotelId: h.id,
          hotel: h.name,
          type: r.typeName,
          price: r.pricePerNight,
          available: r.availableRooms,
          capacity: r.maxGuests,
          status: h.isActive ? 'Active' : 'Inactive'
        }))
      );
      setRooms(allRooms);
      setPagination(prev => ({ ...prev, totalElements: data.totalElements }));
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast.error("Failed to load hotels");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'Hotels') {
      fetchHotels();
      fetchStats();
    }
  }, [pagination.page, activeTab]);

  const handleFilter = () => {
    if (pagination.page === 0) {
      fetchHotels();
    } else {
      setPagination(prev => ({ ...prev, page: 0 }));
    }
  };

  // Dummy State for rooms for now as they are embedded
  const [rooms, setRooms] = useState([]);

  // Modals state
  const [hotelModal, setHotelModal] = useState({ isOpen: false, type: 'add', data: null });
  const [hotelFormData, setHotelFormData] = useState({
    name: '',
    city: '',
    country: 'Vietnam',
    starRating: 5,
    isActive: true,
    description: '',
    address: '',
    roomTypes: []
  });

  const [roomModal, setRoomModal] = useState({ isOpen: false, type: 'add', data: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: null, id: null });

  // Handlers for Hotel Modal
  const openAddHotel = () => {
    setHotelFormData({
      name: '',
      city: '',
      country: 'Vietnam',
      starRating: 5,
      isActive: true,
      description: '',
      address: '',
      roomTypes: []
    });
    setHotelModal({ isOpen: true, type: 'add', data: null });
  };

  const openEditHotel = (hotel) => {
    setHotelFormData({
      name: hotel.name,
      city: hotel.city,
      country: hotel.country || 'Vietnam',
      starRating: hotel.starRating,
      isActive: !!hotel.isActive,
      description: hotel.description || '',
      address: hotel.address || '',
      roomTypes: hotel.roomTypes || []
    });
    setHotelModal({ isOpen: true, type: 'edit', data: hotel });
  };

  const closeHotelModal = () => setHotelModal({ isOpen: false, type: 'add', data: null });

  // Handlers for Room Modal
  const openAddRoom = () => {
    setRoomFormData({ typeName: '', pricePerNight: 0, availableRooms: 0, maxGuests: 2, description: '' });
    setRoomModal({ isOpen: true, type: 'add', data: null });
  };
  const openEditRoom = (room) => {
    setRoomFormData({ ...room, typeName: room.type, pricePerNight: room.price, availableRooms: room.available, maxGuests: room.capacity });
    setRoomModal({ isOpen: true, type: 'edit', data: room });
  };
  const closeRoomModal = () => setRoomModal({ isOpen: false, type: 'add', data: null });

  // Handlers for Delete
  const openDeleteHotel = (id) => setDeleteModal({ isOpen: true, type: 'hotel', id });
  const openDeleteRoom = (id) => setDeleteModal({ isOpen: true, type: 'room', id });
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, type: null, id: null });

  const confirmDelete = async () => {
    if (deleteModal.type === 'hotel') {
      try {
        await hotelService.deleteHotel(deleteModal.id);
        toast.success("Hotel deleted successfully");
        fetchHotels();
        fetchStats();
      } catch (error) {
        toast.error("Failed to delete hotel");
      }
    } else if (deleteModal.type === 'room') {
      try {
        // Find the hotel for this room
        const room = rooms.find(r => r.id === deleteModal.id);
        const hotel = hotels.find(h => h.id === room.hotelId);
        
        const updatedRoomTypes = hotel.roomTypes.filter(rt => rt.typeName !== room.type);
        
        await hotelService.updateHotel(hotel.id, {
          ...hotel,
          roomTypes: updatedRoomTypes
        });
        
        toast.success("Room deleted successfully");
        fetchHotels();
        fetchStats();
      } catch (error) {
        toast.error("Failed to delete room");
      }
    }
    closeDeleteModal();
  };

  const handleSaveHotel = async (e) => {
    e.preventDefault();
    try {
      if (hotelModal.type === 'add') {
        await hotelService.createHotel(hotelFormData);
        toast.success("Hotel created successfully");
      } else {
        await hotelService.updateHotel(hotelModal.data.id, hotelFormData);
        toast.success("Hotel updated successfully");
      }
      fetchHotels();
      fetchStats();
      closeHotelModal();
    } catch (error) {
      console.error("Error saving hotel:", error);
      toast.error("Failed to save hotel");
    }
  };

  const [roomFormData, setRoomFormData] = useState({
    typeName: '',
    pricePerNight: 0,
    availableRooms: 0,
    maxGuests: 2,
    description: ''
  });

  const handleSaveRoom = async (e) => {
    e.preventDefault();
    try {
      const hotel = hotels.find(h => h.id === (roomModal.data?.hotelId || roomFormData.hotelId));
      if (!hotel) {
        toast.error("Please select a hotel first");
        return;
      }

      let updatedRoomTypes;
      if (roomModal.type === 'edit') {
        updatedRoomTypes = hotel.roomTypes.map(rt => 
          rt.typeName === roomModal.data.type ? { ...roomFormData } : rt
        );
      } else {
        updatedRoomTypes = [...(hotel.roomTypes || []), { ...roomFormData }];
      }

      await hotelService.updateHotel(hotel.id, {
        ...hotel,
        roomTypes: updatedRoomTypes
      });

      toast.success("Room saved successfully");
      fetchHotels();
      closeRoomModal();
    } catch (error) {
      toast.error("Failed to save room");
    }
  };

  const StatusBadge = ({ isActive }) => (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
      isActive 
        ? 'bg-[#eefcf2] text-[#22a85a]' 
        : 'bg-gray-100 text-gray-500'
    }`}>
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );

  const ActionButtons = ({ onEdit, onDelete }) => (
    <div className="flex items-center gap-2">
      <button onClick={onEdit} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-[#7C4A4A] bg-[#faeceb] hover:bg-[#f5dada] transition-all">
        <Pencil size={13} /> Edit
      </button>
      <button onClick={onDelete} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-[#e0455d] bg-[#fef3f2] hover:bg-[#fde0e4] transition-all">
        <Trash2 size={13} /> Delete
      </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Title Area */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Hotel Management</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="TOTAL HOTELS" 
          value={stats.totalHotels} 
          icon={Building} 
          trend="stable" 
        />
        <DashboardCard 
          title="ACTIVE HOTELS" 
          value={stats.activeHotels} 
          icon={Building} 
          trend="stable" 
          iconBgColor="bg-[#eefcf2]" 
          iconColor="text-[#22a85a]" 
        />
        <DashboardCard 
          title="ROOM TYPES" 
          value={stats.totalRoomTypes} 
          icon={BedDouble} 
          trend="stable" 
          iconBgColor="bg-[#f3f4f6]" 
          iconColor="text-gray-500" 
        />
        <DashboardCard 
          title="AVAILABLE ROOMS" 
          value={stats.totalAvailableRooms} 
          icon={Home} 
          trend="stable" 
          iconBgColor="bg-[#eff6ff]" 
          iconColor="text-blue-500" 
        />
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex items-center border-b border-gray-200 gap-1">
          {['Hotels', 'Rooms / Contracts'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-bold transition-all relative ${
                activeTab === tab 
                  ? 'text-[#7C4A4A]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C4A4A] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Filters & Search - Common to both tabs for UI consistency */}
        <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder={activeTab === 'Hotels' ? "Search hotel name..." : "Search room type..."}
                  className="w-full pl-9 pr-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 placeholder-gray-400 outline-none focus:border-[#7C4A4A] transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                City
              </label>
              <select 
                className="w-full bg-[#fafafa] border border-gray-100 text-sm font-semibold text-slate-700 py-2.5 px-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all appearance-none cursor-pointer"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Cities</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Hội An">Hội An</option>
                <option value="Phú Quốc">Phú Quốc</option>
                <option value="Vũng Tàu">Vũng Tàu</option>
                <option value="Sapa">Sapa</option>
                <option value="Nha Trang">Nha Trang</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Star Rating
              </label>
              <select 
                className="w-full bg-[#fafafa] border border-gray-100 text-sm font-semibold text-slate-700 py-2.5 px-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all appearance-none cursor-pointer"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-transparent uppercase tracking-widest mb-1.5">
                Spacer
              </label>
              <button 
                onClick={handleFilter}
                className="w-full px-5 py-2.5 bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 h-[42px]"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-start">
          <button 
            onClick={activeTab === 'Hotels' ? openAddHotel : openAddRoom}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-md transition-all active:scale-95 w-full sm:w-auto justify-center"
          >
            <Plus size={15} /> 
            {activeTab === 'Hotels' ? 'Add Hotel' : 'Add Room'}
          </button>
        </div>

        {/* Tables Container */}
        <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#fcfaf9]">
                  {activeTab === 'Hotels' ? (
                    <>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Hotel Name</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">City</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Country</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Star Rating</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Total Rooms</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Status</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Actions</th>
                    </>
                  ) : (
                    <>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Room Type</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Hotel</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Capacity</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Price / Night</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Available</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Status</th>
                      <th className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activeTab === 'Hotels' ? (
                  hotels.map((hotel) => (
                    <tr key={hotel.id} className="hover:bg-[#faf8f7] transition-colors group">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#faeceb] flex items-center justify-center flex-shrink-0">
                            <Building className="w-4 h-4 text-[#7C4A4A]" />
                          </div>
                          <span className="text-sm font-bold text-slate-800">{hotel.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-sm font-semibold text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {hotel.city}
                        </div>
                      </td>
                      <td className="py-4 px-5 text-sm font-semibold text-gray-600">{hotel.country}</td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < hotel.starRating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-5 text-sm font-bold text-slate-700">{hotel.roomTypes?.length || 0}</td>
                      <td className="py-4 px-5"><StatusBadge isActive={hotel.isActive} /></td>
                      <td className="py-4 px-5">
                        <ActionButtons 
                          onEdit={() => openEditHotel(hotel)} 
                          onDelete={() => openDeleteHotel(hotel.id)} 
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-[#faf8f7] transition-colors group">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center flex-shrink-0">
                            <BedDouble className="w-4 h-4 text-blue-500" />
                          </div>
                          <span className="text-sm font-bold text-slate-800">{room.type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-sm font-semibold text-gray-600">{room.hotel}</td>
                      <td className="py-4 px-5 text-sm font-semibold text-gray-600">{room.capacity} Guests</td>
                      <td className="py-4 px-5 text-sm font-black text-[#7C4A4A]">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room.price)}
                      </td>
                      <td className="py-4 px-5">
                        <span className={`text-sm font-black ${
                          room.available === 0 ? 'text-[#e0455d]' : 'text-[#22a85a]'
                        }`}>
                          {room.available} left
                        </span>
                      </td>
                      <td className="py-4 px-5"><StatusBadge status={room.status} /></td>
                      <td className="py-4 px-5">
                        <ActionButtons 
                          onEdit={() => openEditRoom(room)} 
                          onDelete={() => openDeleteRoom(room.id)} 
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-[#fefcfc] flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Showing {(pagination.page * pagination.size) + 1}-{Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} of {pagination.totalElements} results
            </p>
            <div className="flex gap-1">
              <button 
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 0}
                className="px-3 py-1 text-xs font-bold text-gray-400 border border-gray-100 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <button className="px-3 py-1 text-xs font-bold text-white border border-[#7C4A4A] rounded-md bg-[#7C4A4A]">
                {pagination.page + 1}
              </button>
              <button 
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={(pagination.page + 1) * pagination.size >= pagination.totalElements}
                className="px-3 py-1 text-xs font-bold text-gray-400 border border-gray-100 rounded-md bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <AdminModal 
        isOpen={hotelModal.isOpen} 
        onClose={closeHotelModal} 
        title={hotelModal.type === 'add' ? 'Add Hotel' : 'Edit Hotel'}
      >
        <form onSubmit={handleSaveHotel} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hotel Name</label>
              <input 
                type="text" 
                value={hotelFormData.name}
                onChange={(e) => setHotelFormData({...hotelFormData, name: e.target.value})}
                className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A]" 
                placeholder="Enter hotel name" 
                required 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">City</label>
              <input 
                type="text" 
                value={hotelFormData.city}
                onChange={(e) => setHotelFormData({...hotelFormData, city: e.target.value})}
                className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A]" 
                placeholder="Enter city" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Country</label>
              <input 
                type="text" 
                value={hotelFormData.country}
                onChange={(e) => setHotelFormData({...hotelFormData, country: e.target.value})}
                className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A]" 
                required 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Star Rating</label>
              <select 
                value={hotelFormData.starRating}
                onChange={(e) => setHotelFormData({...hotelFormData, starRating: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A]"
              >
                {[5,4,3,2,1].map(star => (
                  <option key={star} value={star}>{star} Stars</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address</label>
            <input 
              type="text" 
              value={hotelFormData.address}
              onChange={(e) => setHotelFormData({...hotelFormData, address: e.target.value})}
              className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A]" 
              placeholder="Enter full address" 
              required 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
            <textarea 
              value={hotelFormData.description}
              onChange={(e) => setHotelFormData({...hotelFormData, description: e.target.value})}
              rows="3" 
              className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] resize-none" 
              placeholder="Enter description..."
            ></textarea>
          </div>

          <div className="flex items-center gap-2 py-2">
            <input 
              type="checkbox" 
              id="isActiveForm"
              checked={hotelFormData.isActive}
              onChange={(e) => setHotelFormData({...hotelFormData, isActive: e.target.checked})}
              className="w-4 h-4 text-[#7C4A4A] border-gray-300 rounded focus:ring-[#7C4A4A]"
            />
            <label htmlFor="isActiveForm" className="text-sm font-semibold text-slate-700">Active and visible to customers</label>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={closeHotelModal} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-sm font-bold transition-all shadow-md active:scale-95">Save Hotel</button>
          </div>
        </form>
      </AdminModal>

      {/* Room Form Modal */}
      <AdminModal 
        isOpen={roomModal.isOpen} 
        onClose={closeRoomModal} 
        title={roomModal.type === 'add' ? 'Add Room' : 'Edit Room'}
      >
        <form onSubmit={handleSaveRoom} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Room Type</label>
            <input type="text" defaultValue={roomModal.data?.type} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Enter room type (e.g., Deluxe)" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Hotel</label>
            <select 
              value={roomModal.data?.hotelId || roomFormData.hotelId || ""} 
              onChange={(e) => setRoomFormData({ ...roomFormData, hotelId: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" 
              required
              disabled={roomModal.type === 'edit'}
            >
              <option value="" disabled>Select Hotel</option>
              {hotels.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Capacity</label>
              <input 
                type="number" 
                value={roomFormData.maxGuests} 
                onChange={(e) => setRoomFormData({ ...roomFormData, maxGuests: parseInt(e.target.value) })}
                min="1" 
                className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" 
                placeholder="Max people" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Price per Night</label>
              <input 
                type="number" 
                value={roomFormData.pricePerNight} 
                onChange={(e) => setRoomFormData({ ...roomFormData, pricePerNight: parseFloat(e.target.value) })}
                className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" 
                placeholder="Price (VND)" 
                required 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Available Rooms</label>
              <input 
                type="number" 
                value={roomFormData.availableRooms} 
                onChange={(e) => setRoomFormData({ ...roomFormData, availableRooms: parseInt(e.target.value) })}
                min="0" 
                className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" 
                placeholder="Count" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Status</label>
              <select className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A] transition-all">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
            <input 
              type="text" 
              value={roomFormData.description} 
              onChange={(e) => setRoomFormData({ ...roomFormData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" 
              placeholder="e.g., Garden view, Balcony..." 
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={closeRoomModal} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-sm font-bold transition-all shadow-md active:scale-95">Save Room</button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal 
        isOpen={deleteModal.isOpen} 
        onClose={closeDeleteModal} 
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this ${deleteModal.type}?`}
      />
    </div>
  );
};

export default HotelManagement;
