import React, { useState, useEffect } from 'react';
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
  ShieldCheck,
} from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';
import { getAllUsers, toggleLockUser, changeUserRole } from '../../../services/userService';
import { toast } from "react-hot-toast";
import AddUserModal from './AddUserModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers({
        page: page - 1,
        size: ITEMS_PER_PAGE,
        keyword: searchTerm
      });
      setUsers(data.content);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setPage(1);
      fetchUsers();
    }
  };

  const handleToggleLock = async (id) => {
    try {
      await toggleLockUser(id);
      toast.success("User status updated");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await changeUserRole(id, newRole);
      toast.success("Role updated successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const isOnline = (lastActiveAt) => {
    if (!lastActiveAt) return false;
    const lastActive = new Date(lastActiveAt);
    const now = new Date();
    // Consider online if active within last 5 minutes
    return (now - lastActive) < 5 * 60 * 1000;
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
          value={totalElements.toString()} 
          icon={Users} 
          trend="stable" 
          trendValue="All" 
        />
        <DashboardCard 
          title="ACTIVE MEMBERS" 
          value={users.filter(u => !u.isLocked).length.toString()} 
          icon={UserCheck} 
          trend="stable" 
          trendValue="Unlocked" 
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
        />
        <DashboardCard 
          title="LOCKED ACCOUNTS" 
          value={users.filter(u => u.isLocked).length.toString()} 
          icon={UserMinus} 
          trend="stable" 
          trendValue="Locked" 
          iconBgColor="bg-gray-100"
          iconColor="text-gray-500"
        />
        
        <div className="bg-[#7C4A4A] rounded-xl p-6 shadow-lg flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <UserPlus size={80} color="white" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">REAL-TIME</h3>
            <div className="text-2xl font-black text-white">Database Live</div>
          </div>
        </div>
      </div>

      {/* Filter & Action Section */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-[#f0ecec] gap-4">
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
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

          <div className="relative group hidden md:block">
            <select className="appearance-none bg-[#fafafa] border border-gray-100 text-sm font-bold text-slate-700 py-2.5 pl-4 pr-10 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer">
              <option>ALL ROLES</option>
              <option>ADMIN</option>
              <option>CUSTOMER</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-[#7C4A4A]">
               <ShieldCheck size={14} />
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-[#7C4A4A] hover:bg-[#633b3b] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-lg active:scale-95 w-full md:w-auto justify-center"
        >
          <UserPlus size={16} />
          <span>Add New User</span>
        </button>
      </div>

      <AddUserModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={fetchUsers} 
      />

      {/* User Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] overflow-hidden min-h-[400px] relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C4A4A]"></div>
          </div>
        )}

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
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400 font-medium">No users found</td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[#faf8f7] transition-colors group">
                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-lg bg-[#faeceb] flex items-center justify-center text-[#7C4A4A] font-black text-xs ring-2 ring-white group-hover:ring-[#faeceb] transition-all">
                          {user.fullName?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${isOnline(user.lastActiveAt) ? 'bg-[#42b872] animate-pulse' : 'bg-gray-300'}`}></div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-bold text-slate-800 leading-none">{user.fullName || 'No Name'}</p>
                          {isOnline(user.lastActiveAt) && (
                            <span className="text-[9px] font-bold text-[#42b872] uppercase tracking-tighter">Online</span>
                          )}
                        </div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter mt-1">ID: {user.id.substring(0, 8)}</p>
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
                        <span>{user.phone || 'No Phone'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <select 
                      value={user.role?.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'CUSTOMER'}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className={`px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase border-none outline-none cursor-pointer transition-colors ${user.role?.toUpperCase() === 'ADMIN' ? 'bg-[#faeceb] text-[#7C4A4A]' : 'bg-gray-100 text-gray-500'}`}
                    >
                      <option value="CUSTOMER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isOnline(user.lastActiveAt) ? 'text-[#42b872]' : 'text-gray-400'}`}>
                        {isOnline(user.lastActiveAt) ? 'ONLINE' : 'OFFLINE'}
                      </span>
                      <span className={`text-[9px] font-medium uppercase ${!user.isLocked ? 'text-gray-400' : 'text-red-400'}`}>
                        {!user.isLocked ? 'Account Active' : 'Account Locked'}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-sm font-semibold text-gray-500">
                    <div className="flex items-center uppercase text-[11px] tracking-tight">
                      <Calendar size={12} className="mr-2 opacity-50" />
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleToggleLock(user.id)}
                        title={user.isLocked ? "Unlock User" : "Lock User"}
                        className={`p-2 rounded-lg transition-all ${user.isLocked ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100'}`}
                      >
                        {user.isLocked ? <UserMinus size={16} /> : <UserCheck size={16} />}
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
            Showing <span className="text-slate-800">1-{users.length}</span> of <span className="text-slate-800">{totalElements}</span> users
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-2 border border-gray-100 rounded-lg hover:bg-white hover:shadow-sm text-gray-400 transition-all disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center px-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#7C4A4A] text-white text-xs font-bold shadow-md">{page}</button>
            </div>
            <button 
              disabled={page * ITEMS_PER_PAGE >= totalElements}
              onClick={() => setPage(page + 1)}
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

export default UserManagement;
