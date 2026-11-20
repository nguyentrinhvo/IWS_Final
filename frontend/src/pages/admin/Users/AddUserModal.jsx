import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Shield } from 'lucide-react';
import { createUser } from '../../../services/userService';
import { toast } from 'react-hot-toast';

const AddUserModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'CUSTOMER'
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUser(formData);
      toast.success('User created successfully');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'CUSTOMER'
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#fefcfc]">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Add New User</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                required
                type="text"
                placeholder="Enter full name"
                className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium py-2.5 pl-10 pr-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                required
                type="email"
                placeholder="email@example.com"
                className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium py-2.5 pl-10 pr-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                required
                type="password"
                placeholder="********"
                className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium py-2.5 pl-10 pr-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  placeholder="09..."
                  className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium py-2.5 pl-10 pr-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">User Role</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <select
                  className="w-full bg-[#fafafa] border border-gray-100 text-sm font-bold py-2.5 pl-10 pr-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer appearance-none"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="flex-1 py-3 bg-[#7C4A4A] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#633b3b] transition-all shadow-md disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
