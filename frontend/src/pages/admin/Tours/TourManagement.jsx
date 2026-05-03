import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Map, 
  MapPin,
  Globe, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';
import { getTours, updateTour, deleteTour } from '../../../services/tourService';
import { toast } from "react-hot-toast";

const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tourType, setTourType] = useState('ALL TYPES');
  const [status, setStatus] = useState('ALL STATUS');
  const [pagination, setPagination] = useState({ page: 0, size: 10, totalElements: 0 });

  const fetchTours = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        size: pagination.size,
        keyword: searchTerm,
      };
      if (tourType !== 'ALL TYPES') params.tourType = tourType.toLowerCase();
      if (status !== 'ALL STATUS') params.isActive = status === 'ACTIVE';

      const data = await getTours(params);
      setTours(data.content);
      setPagination(prev => ({ ...prev, totalElements: data.totalElements }));
    } catch (error) {
      console.error("Error fetching tours:", error);
      toast.error("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [pagination.page, tourType, status]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setPagination(prev => ({ ...prev, page: 0 }));
      fetchTours();
    }
  };

  const toggleStatus = async (tour) => {
    try {
      await updateTour(tour.id, { ...tour, isActive: !tour.isActive });
      toast.success(`Tour is now ${!tour.isActive ? 'Active' : 'Hidden'}`);
      fetchTours();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await deleteTour(id);
        toast.success("Tour deleted successfully");
        fetchTours();
      } catch (error) {
        toast.error("Failed to delete tour");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Tour Management</h1>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="TOTAL TOURS" 
          value={pagination.totalElements.toString()} 
          icon={Map} 
          trend="stable" 
          trendValue="Live" 
        />
        <DashboardCard 
          title="ACTIVE TOURS" 
          value={tours.filter(t => t.isActive).length.toString()} 
          icon={CheckCircle2} 
          trend="up" 
          trendValue="Active" 
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
        />
        <DashboardCard 
          title="HIDDEN TOURS" 
          value={tours.filter(t => !t.isActive).length.toString()} 
          icon={Eye} 
          trend="stable" 
          trendValue="Hidden" 
          iconBgColor="bg-slate-100"
          iconColor="text-slate-500"
        />
        <DashboardCard 
          title="DOMESTIC" 
          value={tours.filter(t => t.tourType === 'domestic').length.toString()} 
          icon={Globe} 
          trend="stable" 
          trendValue="VN" 
          iconBgColor="bg-amber-50"
          iconColor="text-amber-500"
        />
      </div>

      {/* Filter & Action Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-[#f0ecec] gap-4">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search & Press Enter..." 
              className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-2.5 pl-10 pr-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative group flex-1 md:flex-none">
              <select 
                className="w-full appearance-none bg-[#fafafa] border border-gray-100 text-sm font-bold text-slate-700 py-2.5 pl-4 pr-10 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer"
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
              >
                <option>ALL TYPES</option>
                <option>DOMESTIC</option>
                <option>INTERNATIONAL</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#7C4A4A]">
                 <Globe size={14} />
              </div>
            </div>

            <div className="relative group flex-1 md:flex-none">
              <select 
                className="w-full appearance-none bg-[#fafafa] border border-gray-100 text-sm font-bold text-slate-700 py-2.5 pl-4 pr-10 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>ALL STATUS</option>
                <option>ACTIVE</option>
                <option>HIDDEN</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#7C4A4A]">
                 <Filter size={14} />
              </div>
            </div>
          </div>
        </div>

        <Link 
          to="/admin/tours/create"
          className="flex items-center space-x-2 bg-[#7C4A4A] hover:bg-[#633b3b] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg active:scale-95 w-full md:w-auto justify-center"
        >
          <Plus size={16} />
          <span>Create New Tour</span>
        </Link>
      </div>

      {/* Tour Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] overflow-hidden min-h-[300px] relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C4A4A]"></div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfaf9]">
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Tour Name</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Destination</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-center">Type</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Price</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Duration</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!loading && tours.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-400 font-medium">No tours found</td>
                </tr>
              )}
              {tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-[#faf8f7] transition-colors group">
                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={tour.images?.[0]?.url || 'https://via.placeholder.com/100'} 
                        alt={tour.nameVi} 
                        className="w-12 h-12 rounded-lg object-cover shadow-sm ring-2 ring-white group-hover:ring-[#faeceb] transition-all" 
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-none mb-1">{tour.nameVi}</p>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">ID: {tour.id.substring(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center text-gray-600 text-xs font-semibold">
                      <MapPin size={12} className="mr-2 text-[#7C4A4A] opacity-60" />
                      <span>{tour.destination}, {tour.country}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className={`px-2 py-1 rounded text-[9px] font-black tracking-widest uppercase ${
                      tour.tourType === 'international' 
                        ? 'bg-purple-50 text-purple-600 border border-purple-100' 
                        : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {tour.tourType}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-sm font-bold text-slate-700">
                    ${tour.priceAdult?.toLocaleString()}
                  </td>
                  <td className="py-5 px-6 text-xs font-semibold text-gray-500">
                    <div className="flex items-center">
                      <Clock size={12} className="mr-2 opacity-50" />
                      {tour.durationDays} Days
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${tour.isActive ? 'text-[#42b872]' : 'text-gray-400'}`}>
                        {tour.isActive ? 'ACTIVE' : 'HIDDEN'}
                      </span>
                      {/* Toggle Button */}
                      <button 
                        onClick={() => toggleStatus(tour)}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${tour.isActive ? 'bg-[#42b872]' : 'bg-gray-200'}`}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${tour.isActive ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Link 
                        to={`/admin/tours/edit/${tour.id}`}
                        className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-500 transition-all" 
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <Link 
                        to={`/tour/${tour.id}`}
                        target="_blank"
                        className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-slate-700 transition-all" 
                        title="View Live Page"
                      >
                        <Eye size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(tour.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all" 
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info & Pagination */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-100 bg-[#fefcfc] gap-4">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Showing <span className="text-slate-800">1-{tours.length}</span> of <span className="text-slate-800">{pagination.totalElements}</span> tours
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              disabled={pagination.page === 0}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              className="p-2 border border-gray-100 rounded-lg hover:bg-white hover:shadow-sm text-gray-400 transition-all disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center px-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#7C4A4A] text-white text-xs font-bold shadow-md">{pagination.page + 1}</button>
            </div>
            <button 
              disabled={(pagination.page + 1) * pagination.size >= pagination.totalElements}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              className="p-2 border border-gray-100 rounded-lg hover:bg-white hover:shadow-sm text-gray-400 transition-all disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourManagement;
