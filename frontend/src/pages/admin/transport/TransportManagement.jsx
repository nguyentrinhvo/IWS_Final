import React, { useState, useEffect } from 'react';
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
import { transportService } from '../../../services/transportService';
import { toast } from 'react-hot-toast';

const TransportManagement = () => {
  const [activeTab, setActiveTab] = useState('Providers');
  const [loading, setLoading] = useState(true);
  
  // States
  const [routes, setRoutes] = useState([]);
  const [providers, setProviders] = useState([]);
  const [stats, setStats] = useState({
    totalProviders: 0,
    totalRoutes: 0,
    activeRoutes: 0,
    availableSeats: 0
  });

  const [pagination, setPagination] = useState({ page: 0, size: 10, totalElements: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [providerFilter, setProviderFilter] = useState('All');

  // Modal States
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteType, setDeleteType] = useState('');

  const fetchStats = async () => {
    try {
      const data = await transportService.getTransportStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching transport stats:", error);
    }
  };

  const fetchProviders = async () => {
    try {
      const data = await transportService.getAllProviders();
      setProviders(data);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const data = await transportService.getAllRoutesAdmin(pagination.page, pagination.size);
      setRoutes(data.content);
      setPagination(prev => ({ ...prev, totalElements: data.totalElements }));
    } catch (error) {
      console.error("Error fetching transport routes:", error);
      toast.error("Failed to load routes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
    fetchStats();
    fetchProviders();
  }, [pagination.page]);

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

  const handleSaveProvider = async (data) => {
    try {
      if (editingItem) {
        await transportService.updateProvider(editingItem.id, data);
        toast.success("Provider updated");
      } else {
        await transportService.createProvider(data);
        toast.success("Provider added");
      }
      fetchProviders();
      setIsProviderModalOpen(false);
    } catch (error) {
      toast.error("Failed to save provider");
    }
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

  const handleSaveRoute = async (data) => {
    try {
      if (editingItem) {
        await transportService.updateTransportRoute(editingItem.id, data);
        toast.success("Route updated");
      } else {
        await transportService.createTransportRoute(data);
        toast.success("Route created");
      }
      fetchRoutes();
      fetchStats();
      setIsRouteModalOpen(false);
    } catch (error) {
      toast.error("Failed to save route");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteType === 'route') {
        await transportService.deleteTransportRoute(deletingId);
        toast.success("Route deleted");
        fetchRoutes();
      } else {
        await transportService.deleteProvider(deletingId);
        toast.success("Provider deleted");
        fetchProviders();
      }
      fetchStats();
    } catch (error) {
      toast.error(`Failed to delete ${deleteType}`);
    }
    setIsConfirmModalOpen(false);
  };

  const filteredRoutes = routes.filter(r => {
    const matchSearch = searchQuery === '' || 
      r.departureCity.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.arrivalCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.operatorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = typeFilter === 'All' || r.vehicleType === typeFilter;
    const matchProvider = providerFilter === 'All' || r.operatorName === providerFilter;
    return matchSearch && matchType && matchProvider;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          icon={Users} 
          title="Total Providers" 
          value={stats.totalProviders} 
          trend="stable" 
          iconBgColor="bg-blue-50" 
          iconColor="text-blue-600" 
        />
        <DashboardCard 
          icon={RouteIcon} 
          title="Total Routes" 
          value={stats.totalRoutes} 
          trend="stable" 
          iconBgColor="bg-purple-50" 
          iconColor="text-purple-600" 
        />
        <DashboardCard 
          icon={CheckCircle} 
          title="Active Routes" 
          value={stats.activeRoutes} 
          iconBgColor="bg-green-50" 
          iconColor="text-green-600" 
        />
        <DashboardCard 
          icon={UserCheck} 
          title="Available Seats" 
          value={(stats.availableSeats || 0).toLocaleString()} 
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
                      <SearchInput 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Route or provider..." 
                      />
                    </div>
                    <div>
                      <FilterLabel>Transport Type</FilterLabel>
                      <AdminSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="All">All Types</option>
                        <option value="Bus">Bus</option>
                        <option value="Train">Train</option>
                      </AdminSelect>
                    </div>
                    <div>
                      <FilterLabel>Provider</FilterLabel>
                      <AdminSelect value={providerFilter} onChange={(e) => setProviderFilter(e.target.value)}>
                        <option value="All">All Providers</option>
                        {providers.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                      </AdminSelect>
                    </div>
                    <div className="flex items-end">
                      <AdminPrimaryButton 
                        className="w-full h-[42px]"
                        onClick={() => {
                          setSearchQuery('');
                          setTypeFilter('All');
                          setProviderFilter('All');
                        }}
                      >
                        Reset Filters
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
                {filteredRoutes.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <span className="text-sm font-bold text-slate-700">{r.operatorName}</span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${r.vehicleType === 'Bus' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                        {r.vehicleType}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs font-bold text-slate-600">{r.departureCity}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs font-bold text-slate-600">{r.arrivalCity}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs font-bold text-slate-800">{new Date(r.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-xs font-bold text-slate-800">{new Date(r.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-sm font-black text-[#7C4A4A]">{Number(r.price).toLocaleString()}đ</span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">
                          {(r.seatMap || []).filter(s => s.isAvailable).length} / {r.totalSeats}
                        </span>
                        <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-[#7C4A4A]" 
                            style={{ width: `${((r.seatMap || []).filter(s => s.isAvailable).length/r.totalSeats)*100}%` }}
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
