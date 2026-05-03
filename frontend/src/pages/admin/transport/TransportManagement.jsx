import React, { useState } from 'react';
import { Users, Route as RouteIcon, CheckCircle, UserCheck, Plus, Search } from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';
import TabBar from '../../../components/admin/TabBar';
import AdminTable from '../../../components/admin/AdminTable';
import StatusBadge from '../../../components/admin/StatusBadge';
import ActionButtons from '../../../components/admin/ActionButtons';
import AdminPrimaryButton from '../../../components/admin/AdminPrimaryButton';
import SearchInput from '../../../components/admin/SearchInput';
import FilterBar, { FilterLabel, AdminSelect } from '../../../components/admin/FilterBar';
import ConfirmModal from '../../../components/admin/ConfirmModal';
import ProviderFormModal from './ProviderFormModal';
import RouteFormModal from './RouteFormModal';

const TransportManagement = () => {
  const [activeTab, setActiveTab] = useState('Providers');
  
  // Modal States
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteType, setDeleteType] = useState(''); // 'provider' or 'route'

  // Providers Mock Data
  const [providers, setProviders] = useState([
    { id: 1, name: 'Hoang Long Bus', type: 'Bus', status: 'Active' },
    { id: 2, name: 'Vietnam Railways', type: 'Train', status: 'Active' },
    { id: 3, name: 'Phuong Trang (FUTA)', type: 'Bus', status: 'Active' },
    { id: 4, name: 'Mai Linh Express', type: 'Bus', status: 'Inactive' },
  ]);

  // Routes Mock Data
  const [routes, setRoutes] = useState([
    { 
      id: 1, 
      provider: 'Hoang Long Bus', 
      type: 'Bus', 
      from: 'Hanoi', 
      to: 'Da Nang', 
      depTime: '08:00', 
      arrTime: '20:00', 
      price: 450000, 
      totalSeats: 40, 
      availSeats: 12 
    },
    { 
      id: 2, 
      provider: 'Vietnam Railways', 
      type: 'Train', 
      from: 'Saigon', 
      to: 'Nha Trang', 
      depTime: '06:30', 
      arrTime: '13:45', 
      price: 680000, 
      totalSeats: 320, 
      availSeats: 45 
    },
    { 
      id: 3, 
      provider: 'Phuong Trang', 
      type: 'Bus', 
      from: 'Da Lat', 
      to: 'Saigon', 
      depTime: '22:00', 
      arrTime: '05:00', 
      price: 300000, 
      totalSeats: 36, 
      availSeats: 5 
    },
  ]);

  // Handlers
  const handleAddProvider = () => {
    setEditingItem(null);
    setIsProviderModalOpen(true);
  };

  const handleEditProvider = (p) => {
    setEditingItem(p);
    setIsProviderModalOpen(true);
  };

  const handleDeleteProvider = (id) => {
    setDeletingId(id);
    setDeleteType('provider');
    setIsConfirmModalOpen(true);
  };

  const handleAddRoute = () => {
    setEditingItem(null);
    setIsRouteModalOpen(true);
  };

  const handleEditRoute = (r) => {
    setEditingItem(r);
    setIsRouteModalOpen(true);
  };

  const handleDeleteRoute = (id) => {
    setDeletingId(id);
    setDeleteType('route');
    setIsConfirmModalOpen(true);
  };

  const handleSaveProvider = (data) => {
    if (editingItem) {
      setProviders(providers.map(p => p.id === data.id ? data : p));
    } else {
      setProviders([...providers, data]);
    }
  };

  const handleSaveRoute = (data) => {
    if (editingItem) {
      setRoutes(routes.map(r => r.id === data.id ? data : r));
    } else {
      setRoutes([...routes, data]);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteType === 'provider') {
      setProviders(providers.filter(p => p.id !== deletingId));
    } else {
      setRoutes(routes.filter(r => r.id !== deletingId));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          icon={Users} 
          title="Total Providers" 
          value={providers.length} 
          trend="up" 
          trendValue="2 new" 
          iconBgColor="bg-blue-50" 
          iconColor="text-blue-600" 
        />
        <DashboardCard 
          icon={RouteIcon} 
          title="Total Routes" 
          value={routes.length} 
          trend="up" 
          trendValue="+12%" 
          iconBgColor="bg-purple-50" 
          iconColor="text-purple-600" 
        />
        <DashboardCard 
          icon={CheckCircle} 
          title="Active Routes" 
          value="142" 
          iconBgColor="bg-green-50" 
          iconColor="text-green-600" 
        />
        <DashboardCard 
          icon={UserCheck} 
          title="Available Seats" 
          value="1,204" 
          iconBgColor="bg-orange-50" 
          iconColor="text-orange-600" 
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#f0ecec] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30">
          <TabBar 
            tabs={['Providers', 'Routes']} 
            activeTab={activeTab} 
            onChange={setActiveTab} 
          />
        </div>

        <div className="p-6">
          {activeTab === 'Providers' ? (
            <div className="space-y-6">
              {/* Top Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="w-full md:w-96">
                  <SearchInput placeholder="Search provider name..." />
                </div>
                <AdminPrimaryButton icon={Plus} onClick={handleAddProvider}>
                  Add Provider
                </AdminPrimaryButton>
              </div>

              {/* Providers Table */}
              <AdminTable columns={['Provider Name', 'Transport Type', 'Status', 'Actions']}>
                {providers.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                          {p.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${p.type === 'Bus' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                        {p.type}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="py-4 px-5">
                      <ActionButtons onEdit={() => handleEditProvider(p)} onDelete={() => handleDeleteProvider(p.id)} />
                    </td>
                  </tr>
                ))}
              </AdminTable>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Filter Panel */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="flex-1">
                  <FilterBar gridCols="grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                    <div>
                      <FilterLabel>Search</FilterLabel>
                      <SearchInput placeholder="Route or provider..." />
                    </div>
                    <div>
                      <FilterLabel>Transport Type</FilterLabel>
                      <AdminSelect>
                        <option>All Types</option>
                        <option>Bus</option>
                        <option>Train</option>
                      </AdminSelect>
                    </div>
                    <div>
                      <FilterLabel>Provider</FilterLabel>
                      <AdminSelect>
                        <option>All Providers</option>
                        {providers.map(p => <option key={p.id}>{p.name}</option>)}
                      </AdminSelect>
                    </div>
                    <div>
                      <AdminPrimaryButton className="w-full h-[42px] mt-auto">
                        Apply Filters
                      </AdminPrimaryButton>
                    </div>
                  </FilterBar>
                </div>
                <div className="flex-shrink-0">
                  <AdminPrimaryButton icon={Plus} onClick={handleAddRoute}>
                    Add Route
                  </AdminPrimaryButton>
                </div>
              </div>

              {/* Routes Table */}
              <AdminTable columns={[
                'Provider', 
                'Type', 
                'From', 
                'To', 
                'Departure', 
                'Arrival', 
                'Price', 
                'Seats (T/A)', 
                'Actions'
              ]}>
                {routes.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <span className="text-sm font-bold text-slate-700">{r.provider}</span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${r.type === 'Bus' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                        {r.type}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs font-bold text-slate-600">{r.from}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs font-bold text-slate-600">{r.to}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs font-bold text-slate-800">{r.depTime}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs font-bold text-slate-800">{r.arrTime}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-sm font-black text-[#7C4A4A]">{Number(r.price).toLocaleString()}đ</span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">{r.availSeats} / {r.totalSeats}</span>
                        <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-[#7C4A4A]" 
                            style={{ width: `${(r.availSeats/r.totalSeats)*100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <ActionButtons onEdit={() => handleEditRoute(r)} onDelete={() => handleDeleteRoute(r.id)} />
                    </td>
                  </tr>
                ))}
              </AdminTable>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ProviderFormModal 
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
        onSave={handleSaveProvider}
        initial={editingItem}
      />

      <RouteFormModal 
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
        onSave={handleSaveRoute}
        initial={editingItem}
        providers={providers}
      />

      <ConfirmModal 
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete this ${deleteType}?`}
      />
    </div>
  );
};

export default TransportManagement;
