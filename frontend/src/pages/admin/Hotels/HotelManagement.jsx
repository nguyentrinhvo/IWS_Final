import React, { useState } from 'react';
import { 
  Building, MapPin, Star, BedDouble, 
  Search, Filter, Plus, Pencil, Trash2, Home
} from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';
import AdminModal from '../../../components/admin/AdminModal';
import ConfirmModal from '../../../components/admin/ConfirmModal';

// Dummy Data
const MOCK_HOTELS = [
  { id: 1, name: 'Grand Plaza Hotel', city: 'Hanoi', country: 'Vietnam', rating: 5, description: 'Luxury hotel in the center.', status: 'Active' },
  { id: 2, name: 'Ocean View Resort', city: 'Da Nang', country: 'Vietnam', rating: 4, description: 'Beautiful ocean view.', status: 'Active' },
  { id: 3, name: 'Mountain Retreat', city: 'Sapa', country: 'Vietnam', rating: 3, description: 'Quiet place in mountains.', status: 'Inactive' },
  { id: 4, name: 'City Center Inn', city: 'Ho Chi Minh', country: 'Vietnam', rating: 3, description: 'Convenient location.', status: 'Active' },
];

const MOCK_ROOMS = [
  { id: 1, type: 'Deluxe Ocean View', hotel: 'Ocean View Resort', capacity: 2, price: 1500000, available: 12, amenities: 'WiFi, Pool', status: 'Active' },
  { id: 2, type: 'Presidential Suite', hotel: 'Grand Plaza Hotel', capacity: 4, price: 5000000, available: 2, amenities: 'WiFi, Pool, Spa', status: 'Active' },
  { id: 3, type: 'Standard Double', hotel: 'City Center Inn', capacity: 2, price: 800000, available: 0, amenities: 'WiFi', status: 'Inactive' },
  { id: 4, type: 'Family Suite', hotel: 'Mountain Retreat', capacity: 4, price: 2000000, available: 5, amenities: 'Breakfast, WiFi', status: 'Active' },
];

const HotelManagement = () => {
  const [activeTab, setActiveTab] = useState('Hotels');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy State lists for CRUD
  const [hotels, setHotels] = useState(MOCK_HOTELS);
  const [rooms, setRooms] = useState(MOCK_ROOMS);

  // Modals state
  const [hotelModal, setHotelModal] = useState({ isOpen: false, type: 'add', data: null });
  const [roomModal, setRoomModal] = useState({ isOpen: false, type: 'add', data: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: null, id: null });

  // Handlers for Hotel Modal
  const openAddHotel = () => setHotelModal({ isOpen: true, type: 'add', data: null });
  const openEditHotel = (hotel) => setHotelModal({ isOpen: true, type: 'edit', data: hotel });
  const closeHotelModal = () => setHotelModal({ isOpen: false, type: 'add', data: null });

  // Handlers for Room Modal
  const openAddRoom = () => setRoomModal({ isOpen: true, type: 'add', data: null });
  const openEditRoom = (room) => setRoomModal({ isOpen: true, type: 'edit', data: room });
  const closeRoomModal = () => setRoomModal({ isOpen: false, type: 'add', data: null });

  // Handlers for Delete
  const openDeleteHotel = (id) => setDeleteModal({ isOpen: true, type: 'hotel', id });
  const openDeleteRoom = (id) => setDeleteModal({ isOpen: true, type: 'room', id });
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, type: null, id: null });

  const confirmDelete = () => {
    if (deleteModal.type === 'hotel') {
      setHotels(hotels.filter(h => h.id !== deleteModal.id));
    } else if (deleteModal.type === 'room') {
      setRooms(rooms.filter(r => r.id !== deleteModal.id));
    }
    closeDeleteModal();
  };

  const handleSaveHotel = (e) => {
    e.preventDefault();
    // Simulate save logic here
    closeHotelModal();
  };

  const handleSaveRoom = (e) => {
    e.preventDefault();
    // Simulate save logic here
    closeRoomModal();
  };
  
  // Dummy Stats
  const stats = {
    totalHotels: hotels.length,
    activeHotels: hotels.filter(h => h.status === 'Active').length,
    totalRooms: 4500, // Dummy
    availableRooms: rooms.reduce((acc, curr) => acc + curr.available, 0)
  };

  const StatusBadge = ({ status }) => (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
      status === 'Active' 
        ? 'bg-[#eefcf2] text-[#22a85a]' 
        : 'bg-gray-100 text-gray-500'
    }`}>
      {status}
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
          trend="up" 
          trendValue="+12" 
        />
        <DashboardCard 
          title="ACTIVE HOTELS" 
          value={stats.activeHotels} 
          icon={Building} 
          trend="up" 
          trendValue="+5" 
          iconBgColor="bg-[#eefcf2]" 
          iconColor="text-[#22a85a]" 
        />
        <DashboardCard 
          title="TOTAL ROOMS" 
          value={stats.totalRooms} 
          icon={BedDouble} 
          trend="stable" 
          iconBgColor="bg-[#f3f4f6]" 
          iconColor="text-gray-500" 
        />
        <DashboardCard 
          title="AVAILABLE ROOMS" 
          value={stats.availableRooms} 
          icon={Home} 
          trend="up" 
          trendValue="+45" 
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
                />
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                City
              </label>
              <select className="w-full bg-[#fafafa] border border-gray-100 text-sm font-semibold text-slate-700 py-2.5 px-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all appearance-none cursor-pointer">
                <option value="">All Cities</option>
                <option value="hanoi">Hanoi</option>
                <option value="hcm">Ho Chi Minh</option>
                <option value="danang">Da Nang</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Star Rating
              </label>
              <select className="w-full bg-[#fafafa] border border-gray-100 text-sm font-semibold text-slate-700 py-2.5 px-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all appearance-none cursor-pointer">
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
              </select>
            </div>

            <button className="w-full px-5 py-2.5 bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
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
                              className={`w-3.5 h-3.5 ${i < hotel.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-5 text-sm font-bold text-slate-700">{hotel.totalRooms || 0}</td>
                      <td className="py-4 px-5"><StatusBadge status={hotel.status} /></td>
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
              Showing 1-4 of 4 results
            </p>
            {/* Minimal pagination UI for demo */}
            <div className="flex gap-1">
              <button className="px-3 py-1 text-xs font-bold text-gray-400 border border-gray-100 rounded-md bg-white opacity-50 cursor-not-allowed">Prev</button>
              <button className="px-3 py-1 text-xs font-bold text-white border border-[#7C4A4A] rounded-md bg-[#7C4A4A]">1</button>
              <button className="px-3 py-1 text-xs font-bold text-gray-400 border border-gray-100 rounded-md bg-white opacity-50 cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Form Modal */}
      <AdminModal 
        isOpen={hotelModal.isOpen} 
        onClose={closeHotelModal} 
        title={hotelModal.type === 'add' ? 'Add Hotel' : 'Edit Hotel'}
      >
        <form onSubmit={handleSaveHotel} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Hotel Name</label>
            <input type="text" defaultValue={hotelModal.data?.name} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Enter hotel name" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">City</label>
              <input type="text" defaultValue={hotelModal.data?.city} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Enter city" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Country</label>
              <input type="text" defaultValue={hotelModal.data?.country || 'Vietnam'} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Enter country" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Star Rating</label>
              <select defaultValue={hotelModal.data?.rating || "5"} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A] transition-all">
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Status</label>
              <select defaultValue={hotelModal.data?.status || "Active"} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A] transition-all">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
            <textarea defaultValue={hotelModal.data?.description} rows="3" className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Enter description..."></textarea>
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
            <select defaultValue={roomModal.data?.hotel || ""} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" required>
              <option value="" disabled>Select Hotel</option>
              {hotels.map(h => (
                <option key={h.id} value={h.name}>{h.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Capacity</label>
              <input type="number" defaultValue={roomModal.data?.capacity} min="1" className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Max people" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Price per Night</label>
              <input type="number" defaultValue={roomModal.data?.price} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Price (VND)" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Available Rooms</label>
              <input type="number" defaultValue={roomModal.data?.available} min="0" className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Count" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Status</label>
              <select defaultValue={roomModal.data?.status || "Active"} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A] transition-all">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Amenities</label>
            <input type="text" defaultValue={roomModal.data?.amenities} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="e.g., WiFi, Pool, Breakfast" />
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
