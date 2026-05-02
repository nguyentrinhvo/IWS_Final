import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  UserPlus, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Mail,
  Phone,
  Calendar,
  Settings,
  ShieldCheck,
  ToggleLeft as ToggleIcon
} from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';

const mockUsers = [
  {
    id: 'ATRV-89021',
    name: 'Marcus Thorne',
    email: 'm.thorne@travelbox.com',
    phone: '+1 (555) 892-8812',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdDate: 'Oct 12, 2023',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
  {
    id: 'ATRV-89044',
    name: 'Sarah Jennings',
    email: 'sjennings@global.com',
    phone: '+1 (555) 123-4455',
    role: 'USER',
    status: 'BLOCKED',
    createdDate: 'Nov 05, 2023',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 'ATRV-89102',
    name: 'Julian Chen',
    email: 'jchen.design@meta.com',
    phone: '+1 (555) 774-1123',
    role: 'USER',
    status: 'ACTIVE',
    createdDate: 'Dec 01, 2023',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 'ATRV-89105',
    name: 'Elena Valerius',
    email: 'e.valerius@concierge.com',
    phone: '+1 (555) 998-2211',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdDate: 'Jan 15, 2024',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);

  const toggleStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          status: user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
        };
      }
      return user;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">User Management</h1>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="TOTAL USERS" 
          value="14,284" 
          icon={Users} 
          trend="up" 
          trendValue="+12%" 
        />
        <DashboardCard 
          title="ACTIVE MEMBERS" 
          value="12,105" 
          icon={UserCheck} 
          trend="up" 
          trendValue="+5.2%" 
          iconBgColor="bg-orange-50"
          iconColor="text-orange-500"
        />
        <DashboardCard 
          title="BLOCKED ACCOUNTS" 
          value="342" 
          icon={UserMinus} 
          trend="up" 
          trendValue="+1.1%" 
          iconBgColor="bg-gray-100"
          iconColor="text-gray-500"
        />
        
        {/* Special Dark Theme Card */}
        <div className="bg-[#7C4A4A] rounded-xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <UserPlus size={80} color="white" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div className="px-2 py-1 rounded-md bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
              New
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">THIS MONTH</h3>
            <div className="text-3xl font-black text-white">+ 1,240</div>
          </div>
        </div>
      </div>

      {/* Filter & Action Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-[#f0ecec] gap-4">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative group">
            <select className="appearance-none bg-[#fafafa] border border-gray-100 text-sm font-bold text-slate-700 py-2.5 pl-4 pr-10 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer">
              <option>ALL STATUS</option>
              <option>ACTIVE</option>
              <option>BLOCKED</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#7C4A4A]">
               <Filter size={14} />
            </div>
          </div>

          <div className="relative group">
            <select className="appearance-none bg-[#fafafa] border border-gray-100 text-sm font-bold text-slate-700 py-2.5 pl-4 pr-10 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer">
              <option>ALL ROLES</option>
              <option>ADMIN</option>
              <option>USER</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#7C4A4A]">
               <ShieldCheck size={14} />
            </div>
          </div>
        </div>

        <button className="flex items-center space-x-2 bg-[#7C4A4A] hover:bg-[#633b3b] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg active:scale-95 w-full md:w-auto justify-center">
          <UserPlus size={16} />
          <span>Add New User</span>
        </button>
      </div>

      {/* User Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfaf9]">
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">User Profile</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Contact Info</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Role</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Created Date</th>
                <th className="py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#faf8f7] transition-colors group">
                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-lg object-cover shadow-sm ring-2 ring-white group-hover:ring-[#faeceb] transition-all" 
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${user.status === 'ACTIVE' ? 'bg-[#42b872]' : 'bg-[#e0455d]'}`}></div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-none mb-1">{user.name}</p>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-gray-600 text-xs font-semibold">
                        <Mail size={12} className="mr-2 text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-[11px]">
                        <Phone size={10} className="mr-2" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className={`px-2 py-1 rounded text-[10px] font-black tracking-widest ${user.role === 'ADMIN' ? 'bg-[#faeceb] text-[#7C4A4A]' : 'bg-gray-100 text-gray-500'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${user.status === 'ACTIVE' ? 'text-[#42b872]' : 'text-gray-400'}`}>
                        {user.status}
                      </span>
                      {/* Toggle Button */}
                      <button 
                        onClick={() => toggleStatus(user.id)}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${user.status === 'ACTIVE' ? 'bg-[#42b872]' : 'bg-gray-200'}`}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${user.status === 'ACTIVE' ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-sm font-semibold text-gray-500">
                    <div className="flex items-center uppercase text-[11px] tracking-tight">
                      <Calendar size={12} className="mr-2 opacity-50" />
                      {user.createdDate}
                    </div>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button className="p-2 hover:bg-[#faeceb] rounded-lg text-gray-400 hover:text-[#7C4A4A] transition-all">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info & Pagination */}
        <div className="p-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-100 bg-[#fefcfc] gap-4">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Showing <span className="text-slate-800">1-{users.length}</span> of <span className="text-slate-800">14,284</span> users
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
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 text-xs font-bold transition-all">3,571</button>
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

export default UserManagement;
