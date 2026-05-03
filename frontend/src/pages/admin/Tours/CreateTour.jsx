import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Save, 
  X, 
  Info, 
  MapPin, 
  Calendar, 
  Globe, 
  DollarSign, 
  Users, 
  ShieldCheck,
  Plane
} from 'lucide-react';

const CreateTour = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameVi: '',
    nameEn: '',
    descriptionVi: '',
    descriptionEn: '',
    departureLocation: '',
    destination: '',
    duration: '',
    country: '',
    adultPrice: '',
    childrenPrice: '',
    maxCapacity: '',
    tourType: 'Domestic',
    visaRequired: false,
    visaInformation: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Logic to save would go here
    alert('Tour Details Saved Successfully!');
    navigate('/admin/tours');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header Title */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Create New Tour</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Info & Details (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#f0ecec]">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#faeceb] flex items-center justify-center text-[#7C4A4A]">
                <Info size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Basic Information</h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Name (Vietnamese)</label>
                  <input 
                    type="text" 
                    name="nameVi"
                    value={formData.nameVi}
                    onChange={handleChange}
                    placeholder="Nhập tên chuyến đi..."
                    className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Name (English)</label>
                  <input 
                    type="text" 
                    name="nameEn"
                    value={formData.nameEn}
                    onChange={handleChange}
                    placeholder="Enter tour name..."
                    className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Description (Vietnamese)</label>
                <textarea 
                  name="descriptionVi"
                  value={formData.descriptionVi}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Nhập mô tả chi tiết..."
                  className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Description (English)</label>
                <textarea 
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter detailed description..."
                  className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Tour Details Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#f0ecec]">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <Plane size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Tour Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center">
                  <MapPin size={12} className="mr-1" /> Departure Location
                </label>
                <input 
                  type="text" 
                  name="departureLocation"
                  value={formData.departureLocation}
                  onChange={handleChange}
                  placeholder="e.g. Ho Chi Minh City"
                  className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center">
                  <MapPin size={12} className="mr-1" /> Destination
                </label>
                <input 
                  type="text" 
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Paris, France"
                  className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center">
                  <Calendar size={12} className="mr-1" /> Duration (days)
                </label>
                <input 
                  type="number" 
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 7"
                  className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center">
                  <Globe size={12} className="mr-1" /> Country
                </label>
                <input 
                  type="text" 
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. Italy"
                  className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Economics, Classification, Visa (1/3 width) */}
        <div className="space-y-8">
          {/* Economics Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#f0ecec]">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <DollarSign size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Economics</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Adult Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input 
                    type="number" 
                    name="adultPrice"
                    value={formData.adultPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full bg-[#fafafa] border border-gray-100 text-sm font-bold text-slate-700 py-3 pl-8 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Children Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input 
                    type="number" 
                    name="childrenPrice"
                    value={formData.childrenPrice}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full bg-[#fafafa] border border-gray-100 text-sm font-bold text-slate-700 py-3 pl-8 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center">
                  <Users size={12} className="mr-1" /> Max Capacity
                </label>
                <input 
                  type="number" 
                  name="maxCapacity"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  placeholder="e.g. 20"
                  className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Classification & Visa Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#f0ecec]">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Classification</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Tour Type</label>
                <select 
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleChange}
                  className="w-full bg-[#fafafa] border border-gray-100 text-sm font-bold text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all cursor-pointer"
                >
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </select>
              </div>

              {/* Conditional Visa Section */}
              {formData.tourType === 'International' && (
                <div className="pt-4 border-t border-gray-50 space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Visa Required</label>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, visaRequired: !prev.visaRequired }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.visaRequired ? 'bg-[#7C4A4A]' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.visaRequired ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {formData.visaRequired && (
                    <div className="space-y-2 animate-in fade-in duration-300">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Visa Information</label>
                      <textarea 
                        name="visaInformation"
                        value={formData.visaInformation}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Detail visa requirements..."
                        className="w-full bg-[#fafafa] border border-gray-100 text-sm font-medium text-slate-700 py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#7C4A4A]/20 focus:border-[#7C4A4A] transition-all resize-none"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <button 
              type="submit"
              className="w-full bg-[#7C4A4A] hover:bg-[#633b3b] text-white py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg shadow-[#7C4A4A]/20 flex items-center justify-center space-x-2 active:scale-[0.98]"
            >
              <Save size={18} />
              <span>Save Tour Details</span>
            </button>
            <button 
              type="button"
              onClick={() => navigate('/admin/tours')}
              className="w-full bg-white hover:bg-gray-50 text-gray-400 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest border border-gray-100 transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTour;
