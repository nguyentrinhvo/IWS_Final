import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Map, Ticket, CheckCircle2, DollarSign, Filter, Plus, MapPin, Pencil, Trash2
} from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';
import AdminTable from '../../../components/admin/AdminTable';
import TablePagination from '../../../components/admin/TablePagination';
import TabBar from '../../../components/admin/TabBar';
import StatusBadge from '../../../components/admin/StatusBadge';
import ActionButtons from '../../../components/admin/ActionButtons';
import SearchInput from '../../../components/admin/SearchInput';
import FilterBar, { FilterLabel, AdminSelect } from '../../../components/admin/FilterBar';
import AdminPrimaryButton from '../../../components/admin/AdminPrimaryButton';
import AdminModal from '../../../components/admin/AdminModal';
import ConfirmModal from '../../../components/admin/ConfirmModal';
import { attractionService } from '../../../services/attractionService';
import { toast } from 'react-hot-toast';

const TABS = ['Attractions', 'Tickets & Pricing'];
const ATTRACTION_COLUMNS = ['Name', 'Location', 'Type', 'Status', 'Actions'];
const TICKET_COLUMNS = ['Ticket Name', 'Attraction', 'Price', 'Status', 'Description', 'Actions'];

const AttractionsManagement = () => {
  const [activeTab, setActiveTab] = useState('Attractions');
  const [loading, setLoading] = useState(true);
  
  // ─── States for Attractions ──────────────────────────────────────────────────
  const [attractions, setAttractions] = useState([]);
  const [attrSearch, setAttrSearch] = useState('');
  const [attrType, setAttrType] = useState('All');
  const [attrStatus, setAttrStatus] = useState('All');
  const [pagination, setPagination] = useState({ page: 0, size: 10, totalElements: 0 });

  // ─── States for Tickets ──────────────────────────────────────────────────────
  const [tickets, setTickets] = useState([]);
  const [ticketSearch, setTicketSearch] = useState('');
  const [ticketAttraction, setTicketAttraction] = useState('All');

  // ─── Modal States ────────────────────────────────────────────────────────────
  const [attrModal, setAttrModal] = useState({ isOpen: false, type: 'add', data: null });
  const [attrFormData, setAttrFormData] = useState({
    nameVi: '',
    nameEn: '',
    location: '',
    attractionType: 'Entertainment',
    descriptionVi: '',
    descriptionEn: '',
    isActive: true,
    thumbnailUrl: ''
  });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const [ticketFormData, setTicketFormData] = useState({
    typeName: '',
    price: 0,
    description: '',
    attractionId: ''
  });
  const [ticketModal, setTicketModal] = useState({ isOpen: false, type: 'add', data: null });

  // ─── Summary Stats ───────────────────────────────────────────────────────────
  const [stats, setStats] = useState({
    totalAttractions: 0,
    activeAttractions: 0,
    totalTickets: 0,
    avgTicketPrice: 0
  });

  const fetchStats = async () => {
    try {
      const data = await attractionService.getAttractionStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchAttractions = async () => {
    setLoading(true);
    try {
      // For admin, we can use search with empty params or specialized admin endpoint
      const data = await attractionService.getAllAttractionsAdmin(
        pagination.page, 
        pagination.size,
        'id,desc'
      );
      setAttractions(data.content);
      setPagination(prev => ({ ...prev, totalElements: data.totalElements }));
      
      // Flatten tickets
      const allTickets = data.content.flatMap(a => 
        (a.ticketTypes || []).map(t => ({
          ...t,
          id: `${a.id}-${t.typeName}`,
          attractionId: a.id,
          attraction: a.nameVi,
          name: t.typeName,
          price: t.price,
          status: a.isActive ? 'Active' : 'Inactive',
          description: t.description
        }))
      );
      setTickets(allTickets);
    } catch (error) {
      console.error("Error fetching attractions:", error);
      toast.error("Failed to load attractions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttractions();
    fetchStats();
  }, [pagination.page]);

  // ─── Filter Logic (Client-side for now for simplicity, or we can use backend search) ────────────────
  const filteredAttractions = attractions.filter(a => {
    const matchSearch = attrSearch === '' || 
      a.nameVi.toLowerCase().includes(attrSearch.toLowerCase()) || 
      a.nameEn.toLowerCase().includes(attrSearch.toLowerCase());
    const matchType = attrType === 'All' || a.attractionType === attrType;
    const matchStatus = attrStatus === 'All' || (attrStatus === 'Active' ? a.isActive : !a.isActive);
    return matchSearch && matchType && matchStatus;
  });

  const filteredTickets = tickets.filter(t => {
    const matchSearch = ticketSearch === '' || t.name.toLowerCase().includes(ticketSearch.toLowerCase());
    const matchAttraction = ticketAttraction === 'All' || t.attraction === ticketAttraction;
    return matchSearch && matchAttraction;
  });

  // ─── Handlers for Attractions ────────────────────────────────────────────────
  const openAddAttr = () => {
    setAttrFormData({
      nameVi: '',
      nameEn: '',
      location: '',
      attractionType: 'Entertainment',
      descriptionVi: '',
      descriptionEn: '',
      isActive: true,
      thumbnailUrl: ''
    });
    setAttrModal({ isOpen: true, type: 'add', data: null });
  };

  const openEditAttr = (attr) => {
    setAttrFormData({
      nameVi: attr.nameVi,
      nameEn: attr.nameEn,
      location: attr.location,
      attractionType: attr.attractionType,
      descriptionVi: attr.descriptionVi || '',
      descriptionEn: attr.descriptionEn || '',
      isActive: attr.isActive,
      thumbnailUrl: attr.thumbnailUrl || ''
    });
    setAttrModal({ isOpen: true, type: 'edit', data: attr });
  };

  const closeAttrModal = () => setAttrModal({ isOpen: false, type: 'add', data: null });

  const handleSaveAttr = async (e) => {
    e.preventDefault();
    try {
      if (attrModal.type === 'add') {
        await attractionService.createAttraction(attrFormData);
        toast.success("Attraction created");
      } else {
        await attractionService.updateAttraction(attrModal.data.id, attrFormData);
        toast.success("Attraction updated");
      }
      fetchAttractions();
      fetchStats();
      closeAttrModal();
    } catch (error) {
      toast.error("Failed to save attraction");
    }
  };

  const openDeleteAttr = (id) => setDeleteModal({ isOpen: true, id });
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, id: null });
  const confirmDeleteAttr = async () => {
    try {
      await attractionService.deleteAttraction(deleteModal.id);
      toast.success("Attraction deleted");
      fetchAttractions();
      fetchStats();
    } catch (error) {
      toast.error("Failed to delete attraction");
    }
    closeDeleteModal();
  };

  // ─── Handlers for Tickets (Unchanged dummy implementations) ─────────────────
  const [ticketPage, setTicketPage] = useState(1);
  const [attrPage, setAttrPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const paginatedAttractions = filteredAttractions.slice((attrPage - 1) * ITEMS_PER_PAGE, attrPage * ITEMS_PER_PAGE);
  const paginatedTickets = filteredTickets.slice((ticketPage - 1) * ITEMS_PER_PAGE, ticketPage * ITEMS_PER_PAGE);

  const openAddTicket = () => {
    setTicketFormData({ typeName: '', price: 0, description: '', attractionId: '' });
    setTicketModal({ isOpen: true, type: 'add', data: null });
  };

  const handleEditTicket = (ticket) => {
    setTicketFormData({ ...ticket, typeName: ticket.name });
    setTicketModal({ isOpen: true, type: 'edit', data: ticket });
  };

  const handleSaveTicket = async (e) => {
    e.preventDefault();
    try {
      const attraction = attractions.find(a => a.id === (ticketModal.data?.attractionId || ticketFormData.attractionId));
      if (!attraction) {
        toast.error("Please select an attraction first");
        return;
      }

      let updatedTickets;
      if (ticketModal.type === 'edit') {
        updatedTickets = attraction.ticketTypes.map(t => 
          t.typeName === ticketModal.data.name ? { ...ticketFormData } : t
        );
      } else {
        updatedTickets = [...(attraction.ticketTypes || []), { ...ticketFormData }];
      }

      await attractionService.updateAttraction(attraction.id, {
        ...attraction,
        ticketTypes: updatedTickets
      });

      toast.success("Ticket saved");
      fetchAttractions();
      setTicketModal({ isOpen: false, type: 'add', data: null });
    } catch (error) {
      toast.error("Failed to save ticket");
    }
  };

  const handleDeleteTicket = async (ticket) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        const attraction = attractions.find(a => a.id === ticket.attractionId);
        const updatedTickets = attraction.ticketTypes.filter(t => t.typeName !== ticket.name);
        
        await attractionService.updateAttraction(attraction.id, {
          ...attraction,
          ticketTypes: updatedTickets
        });
        
        toast.success("Ticket deleted");
        fetchAttractions();
      } catch (error) {
        toast.error("Failed to delete ticket");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Dynamic Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
          Attraction Management
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="TOTAL ATTRACTIONS" 
          value={stats.totalAttractions} 
          icon={Map} 
          trend="stable" 
        />
        <DashboardCard 
          title="ACTIVE ATTRACTIONS" 
          value={stats.activeAttractions} 
          icon={CheckCircle2} 
          trend="stable" 
          iconBgColor="bg-[#eefcf2]" 
          iconColor="text-[#22a85a]" 
        />
        <DashboardCard 
          title="TOTAL TICKETS" 
          value={stats.totalTickets} 
          icon={Ticket} 
          trend="stable" 
          iconBgColor="bg-[#eff6ff]" 
          iconColor="text-blue-500" 
        />
        <DashboardCard 
          title="AVG TICKET PRICE" 
          value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.avgTicketPrice)} 
          icon={DollarSign} 
          trend="stable" 
          iconBgColor="bg-[#fffaeb]" 
          iconColor="text-[#f59e0b]" 
        />
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Tabs */}
        <TabBar tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'Attractions' ? (
          <>
            <FilterBar gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <FilterLabel>Search Attractions</FilterLabel>
                <SearchInput
                  value={attrSearch}
                  onChange={(e) => {
                    setAttrSearch(e.target.value);
                    setAttrPage(1);
                  }}
                  placeholder="Search by name (Vi / En)..."
                />
              </div>
              <div>
                <FilterLabel>Type</FilterLabel>
                <AdminSelect 
                  value={attrType} 
                  onChange={(e) => {
                    setAttrType(e.target.value);
                    setAttrPage(1);
                  }}
                >
                  <option value="All">All Types</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Nature">Nature</option>
                  <option value="Culture">Culture</option>
                </AdminSelect>
              </div>
              <div>
                <FilterLabel>Status</FilterLabel>
                <AdminSelect 
                  value={attrStatus} 
                  onChange={(e) => {
                    setAttrStatus(e.target.value);
                    setAttrPage(1);
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </AdminSelect>
              </div>
            </FilterBar>

            <div className="flex justify-start">
              <AdminPrimaryButton icon={Plus} onClick={openAddAttr}>Add Attraction</AdminPrimaryButton>
            </div>

            <AdminTable columns={ATTRACTION_COLUMNS} minWidth="min-w-[800px]" emptyMessage="No attractions match your filters.">
              {paginatedAttractions.map(attr => (
                <tr key={attr.id} className="hover:bg-[#faf8f7] transition-colors group">
                  <td className="py-4 px-5">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{attr.nameVi}</p>
                      <p className="text-[11px] font-semibold text-gray-400">{attr.nameEn}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm font-semibold text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {attr.location}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {attr.attractionType}
                    </span>
                  </td>
                  <td className="py-4 px-5"><StatusBadge isActive={attr.isActive} /></td>
                  <td className="py-4 px-5">
                    <ActionButtons onEdit={() => openEditAttr(attr)} onDelete={() => openDeleteAttr(attr.id)} />
                  </td>
                </tr>
              ))}
            </AdminTable>
            <TablePagination
              currentPage={attrPage}
              totalPages={Math.ceil(filteredAttractions.length / ITEMS_PER_PAGE) || 1}
              totalItems={filteredAttractions.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setAttrPage}
              noun="attractions"
            />
          </>
        ) : (
          <>
            <FilterBar gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <FilterLabel>Search Tickets</FilterLabel>
                <SearchInput
                  value={ticketSearch}
                  onChange={(e) => {
                    setTicketSearch(e.target.value);
                    setTicketPage(1);
                  }}
                  placeholder="Search ticket name..."
                />
              </div>
              <div>
                <FilterLabel>Attraction</FilterLabel>
                <AdminSelect 
                  value={ticketAttraction} 
                  onChange={(e) => {
                    setTicketAttraction(e.target.value);
                    setTicketPage(1);
                  }}
                >
                  <option value="All">All Attractions</option>
                  {[...new Set(tickets.map(t => t.attraction))].map(attr => (
                    <option key={attr} value={attr}>{attr}</option>
                  ))}
                </AdminSelect>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    setTicketSearch('');
                    setTicketAttraction('All');
                    setTicketPage(1);
                  }}
                  className="w-full px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-black uppercase tracking-widest rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Filter className="w-4 h-4" /> Clear Filters
                </button>
              </div>
            </FilterBar>

            <div className="flex justify-start">
              <AdminPrimaryButton icon={Plus} onClick={openAddTicket}>Add Ticket</AdminPrimaryButton>
            </div>

            <AdminTable columns={TICKET_COLUMNS} minWidth="min-w-[900px]" emptyMessage="No tickets match your filters.">
              {paginatedTickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-[#faf8f7] transition-colors group">
                  <td className="py-4 px-5 text-sm font-bold text-slate-800">{ticket.name}</td>
                  <td className="py-4 px-5 text-sm font-semibold text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {ticket.attraction}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm font-black text-[#7C4A4A]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ticket.price)}
                  </td>
                  <td className="py-4 px-5"><StatusBadge status={ticket.status} /></td>
                  <td className="py-4 px-5 text-xs text-gray-500 max-w-xs truncate" title={ticket.description}>
                    {ticket.description}
                  </td>
                  <td className="py-4 px-5">
                    <ActionButtons onEdit={() => handleEditTicket(ticket)} onDelete={() => handleDeleteTicket(ticket)} />
                  </td>
                </tr>
              ))}
            </AdminTable>
            <TablePagination
              currentPage={ticketPage}
              totalPages={Math.ceil(filteredTickets.length / ITEMS_PER_PAGE) || 1}
              totalItems={filteredTickets.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setTicketPage}
              noun="tickets"
            />
          </>
        )}
      </div>

      {/* ─── Attraction Form Modal ────────────────────────────────────────────── */}
      <AdminModal 
        isOpen={attrModal.isOpen} 
        onClose={closeAttrModal} 
        title={attrModal.type === 'add' ? 'Add Attraction' : 'Edit Attraction'}
      >
        <form onSubmit={handleSaveAttr} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name (Vietnamese)</label>
              <input 
                type="text" 
                value={attrFormData.nameVi}
                onChange={(e) => setAttrFormData({...attrFormData, nameVi: e.target.value})}
                className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A]" 
                placeholder="Enter Vietnamese name" 
                required 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name (English)</label>
              <input 
                type="text" 
                value={attrFormData.nameEn}
                onChange={(e) => setAttrFormData({...attrFormData, nameEn: e.target.value})}
                className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A]" 
                placeholder="Enter English name" 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</label>
              <input 
                type="text" 
                value={attrFormData.location}
                onChange={(e) => setAttrFormData({...attrFormData, location: e.target.value})}
                className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A]" 
                placeholder="Enter location" 
                required 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</label>
              <select 
                value={attrFormData.attractionType}
                onChange={(e) => setAttrFormData({...attrFormData, attractionType: e.target.value})}
                className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A]"
              >
                <option value="Entertainment">Entertainment</option>
                <option value="Nature">Nature</option>
                <option value="Culture">Culture</option>
                <option value="History">History</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image URL</label>
              <input 
                type="text" 
                value={attrFormData.thumbnailUrl}
                onChange={(e) => setAttrFormData({...attrFormData, thumbnailUrl: e.target.value})}
                className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A]" 
                placeholder="Enter image URL" 
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input 
                type="checkbox" 
                id="isActiveAttr"
                checked={attrFormData.isActive}
                onChange={(e) => setAttrFormData({...attrFormData, isActive: e.target.checked})}
                className="w-4 h-4 text-[#7C4A4A] border-gray-300 rounded focus:ring-[#7C4A4A]"
              />
              <label htmlFor="isActiveAttr" className="text-sm font-semibold text-slate-700">Active</label>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description (Vi)</label>
            <textarea 
              value={attrFormData.descriptionVi}
              onChange={(e) => setAttrFormData({...attrFormData, descriptionVi: e.target.value})}
              rows="3" 
              className="w-full px-4 py-2 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] resize-none" 
              placeholder="Enter description..."
            ></textarea>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={closeAttrModal} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-sm font-bold transition-all shadow-md active:scale-95">
              {attrModal.type === 'add' ? 'Save Attraction' : 'Update Attraction'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* ─── Ticket Form Modal ───────────────────────────────────────────────── */}
      <AdminModal
        isOpen={ticketModal.isOpen}
        onClose={() => setTicketModal({ isOpen: false, type: 'add', data: null })}
        title={ticketModal.type === 'add' ? 'Add Ticket' : 'Edit Ticket'}
      >
        <form onSubmit={handleSaveTicket} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Ticket Name</label>
            <input 
              type="text" 
              value={ticketFormData.typeName} 
              onChange={(e) => setTicketFormData({...ticketFormData, typeName: e.target.value})}
              className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" 
              placeholder="e.g., Adult Ticket" 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Attraction</label>
            <select 
              value={ticketModal.data?.attractionId || ticketFormData.attractionId} 
              onChange={(e) => setTicketFormData({...ticketFormData, attractionId: e.target.value})}
              className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" 
              required
              disabled={ticketModal.type === 'edit'}
            >
              <option value="" disabled>Select Attraction</option>
              {attractions.map(a => (
                <option key={a.id} value={a.id}>{a.nameVi}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Price</label>
            <input 
              type="number" 
              value={ticketFormData.price} 
              onChange={(e) => setTicketFormData({...ticketFormData, price: parseFloat(e.target.value)})}
              className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" 
              placeholder="Price (VND)" 
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
            <textarea 
              value={ticketFormData.description} 
              onChange={(e) => setTicketFormData({...ticketFormData, description: e.target.value})}
              rows="2"
              className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all resize-none" 
              placeholder="Ticket details..." 
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setTicketModal({ isOpen: false, type: 'add', data: null })} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-sm font-bold transition-all shadow-md active:scale-95">Save Ticket</button>
          </div>
        </form>
      </AdminModal>

      {/* ─── Delete Confirmation Modal ────────────────────────────────────────── */}
      <ConfirmModal 
        isOpen={deleteModal.isOpen} 
        onClose={closeDeleteModal} 
        onConfirm={confirmDeleteAttr}
        message="Are you sure you want to delete this attraction?"
      />
    </div>
  );
};

class AttractionsManagementErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 text-red-600 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Component Crashed!</h2>
          <pre className="whitespace-pre-wrap font-mono text-sm">{this.state.error.toString()}</pre>
          <pre className="whitespace-pre-wrap font-mono text-xs mt-4">{this.state.error.stack}</pre>
        </div>
      );
    }
    return <AttractionsManagement />;
  }
}

export default AttractionsManagementErrorBoundary;
