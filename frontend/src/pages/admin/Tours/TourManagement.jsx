import React, { useState } from 'react';
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

const mockTours = [
  {
    id: 'TOUR-7721',
    name: 'Amalfi Coast Dream',
    destination: 'Positano, Italy',
    type: 'INTERNATIONAL',
    price: 4250,
    duration: '8 Days / 7 Nights',
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=100&h=100&fit=crop'
  },
  {
    id: 'TOUR-8842',
    name: 'Kyoto Zen Gardens',
    destination: 'Kyoto, Japan',
    type: 'INTERNATIONAL',
    price: 3800,
    duration: '6 Days / 5 Nights',
    status: 'HIDDEN',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=100&h=100&fit=crop'
  },
  {
    id: 'TOUR-1209',
    name: 'Yosemite Expedition',
    destination: 'California, USA',
    type: 'DOMESTIC',
    price: 1200,
    duration: '4 Days / 3 Nights',
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=100&h=100&fit=crop'
  }
];

const TourManagement = () => {
  const [tours, setTours] = useState(mockTours);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleStatus = (id) => {
    setTours(tours.map(tour => {
      if (tour.id === id) {
        return {
          ...tour,
          status: tour.status === 'ACTIVE' ? 'HIDDEN' : 'ACTIVE'
        };
      }
      return tour;
    }));
  };

  const deleteTour = (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      setTours(tours.filter(tour => tour.id !== id));
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
          value="128" 
          icon={Map} 
          trend="up" 
          trendValue="+12%" 
        />
        <DashboardCard 
          title="ACTIVE TOURS" 
          value="112" 
          icon={CheckCircle2} 
          trend="up" 
          trendValue="+5%" 
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
        />
        <DashboardCard 
          title="HIDDEN TOURS" 
          value="16" 
          icon={Eye} 
          trend="stable" 
          trendValue="Stable" 
          iconBgColor="bg-slate-100"
          iconColor="text-slate-500"
        />
        <DashboardCard 
          title="INTERNATIONAL" 
          value="42" 
          icon={Globe} 
          trend="up" 
          trendValue="+24%" 
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
              placeholder="Search by tour name..." 
              className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-2.5 pl-10 pr-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative group flex-1 md:flex-none">
              <select className="w-full appearance-none bg-[#fafafa] border border-gray-100 text-sm font-bold text-slate-700 py-2.5 pl-4 pr-10 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer">
                <option>ALL TYPES</option>
                <option>DOMESTIC</option>
                <option>INTERNATIONAL</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#7C4A4A]">
                 <Globe size={14} />
              </div>
            </div>

            <div className="relative group flex-1 md:flex-none">
              <select className="w-full appearance-none bg-[#fafafa] border border-gray-100 text-sm font-bold text-slate-700 py-2.5 pl-4 pr-10 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer">
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
      <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] overflow-hidden">
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
              {tours.map((tour) => (
                <tr key={tour.id} className="hover:bg-[#faf8f7] transition-colors group">
                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={tour.image} 
                        alt={tour.name} 
                        className="w-12 h-12 rounded-lg object-cover shadow-sm ring-2 ring-white group-hover:ring-[#faeceb] transition-all" 
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-none mb-1">{tour.name}</p>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">ID: {tour.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center text-gray-600 text-xs font-semibold">
                      <MapPin size={12} className="mr-2 text-[#7C4A4A] opacity-60" />
                      <span>{tour.destination}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className={`px-2 py-1 rounded text-[9px] font-black tracking-widest ${
                      tour.type === 'INTERNATIONAL' 
                        ? 'bg-purple-50 text-purple-600 border border-purple-100' 
                        : 'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      {tour.type}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-sm font-bold text-slate-700">
                    ${tour.price.toLocaleString()}
                  </td>
                  <td className="py-5 px-6 text-xs font-semibold text-gray-500">
                    <div className="flex items-center">
                      <Clock size={12} className="mr-2 opacity-50" />
                      {tour.duration}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${tour.status === 'ACTIVE' ? 'text-[#42b872]' : 'text-gray-400'}`}>
                        {tour.status}
                      </span>
                      {/* Toggle Button */}
                      <button 
                        onClick={() => toggleStatus(tour.id)}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${tour.status === 'ACTIVE' ? 'bg-[#42b872]' : 'bg-gray-200'}`}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${tour.status === 'ACTIVE' ? 'translate-x-4' : 'translate-x-0'}`} />
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
                      <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-slate-700 transition-all" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => deleteTour(tour.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all" title="Delete"
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
            Showing <span className="text-slate-800">1-{tours.length}</span> of <span className="text-slate-800">128</span> tours
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-white hover:shadow-sm text-gray-400 transition-all disabled:opacity-30">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center px-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#7C4A4A] text-white text-xs font-bold shadow-md">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 text-xs font-bold transition-all">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 text-xs font-bold transition-all">3</button>
              <span className="px-2 text-gray-400 text-xs">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 text-xs font-bold transition-all">43</button>
            </div>
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-white hover:shadow-sm text-gray-400 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourManagement;
