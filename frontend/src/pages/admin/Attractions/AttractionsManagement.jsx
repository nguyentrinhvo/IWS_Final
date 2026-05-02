import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Map, Ticket, CheckCircle2, DollarSign, Filter, Plus, MapPin
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

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_ATTRACTIONS = [
  { id: 1, ten_vi: 'VinWonders Phú Quốc', ten_en: 'VinWonders Phu Quoc', dia_diem: 'Phu Quoc, Vietnam', loai_hinh: 'Entertainment', trang_thai: 'Active', mo_ta: 'Largest theme park in Vietnam.', anh_dai_dien: '' },
  { id: 2, ten_vi: 'Vịnh Hạ Long', ten_en: 'Ha Long Bay', dia_diem: 'Quang Ninh, Vietnam', loai_hinh: 'Nature', trang_thai: 'Active', mo_ta: 'UNESCO World Heritage site with stunning islands.', anh_dai_dien: '' },
  { id: 3, ten_vi: 'Phố cổ Hội An', ten_en: 'Hoi An Ancient Town', dia_diem: 'Quang Nam, Vietnam', loai_hinh: 'Culture', trang_thai: 'Inactive', mo_ta: 'Well-preserved ancient trading port.', anh_dai_dien: '' },
  { id: 4, ten_vi: 'Bà Nà Hills', ten_en: 'Ba Na Hills', dia_diem: 'Da Nang, Vietnam', loai_hinh: 'Entertainment', trang_thai: 'Active', mo_ta: 'Mountaintop resort and theme park.', anh_dai_dien: '' },
];

const MOCK_TICKETS = [
  { id: 1, name: 'Standard Admission', attraction: 'VinWonders Phu Quoc', price: 950000, status: 'Active', description: 'Full day access to all zones' },
  { id: 2, name: 'Cruise Day Tour', attraction: 'Ha Long Bay', price: 1200000, status: 'Active', description: '6-hour cruise with lunch' },
  { id: 3, name: 'Night Tour & Lanterns', attraction: 'Hoi An Ancient Town', price: 200000, status: 'Active', description: 'Guided walking tour at night' },
  { id: 4, name: 'Cable Car Round Trip', attraction: 'Ba Na Hills', price: 850000, status: 'Active', description: 'Round trip cable car ticket' },
];

const TABS = ['Attractions', 'Tickets & Pricing'];
const ATTRACTION_COLUMNS = ['Name', 'Location', 'Type', 'Status', 'Actions'];
const TICKET_COLUMNS = ['Ticket Name', 'Attraction', 'Price', 'Status', 'Description', 'Actions'];

const AttractionsManagement = () => {
  const [activeTab, setActiveTab] = useState('Attractions');
  
  // ─── States for Attractions ──────────────────────────────────────────────────
  const [attractions, setAttractions] = useState(MOCK_ATTRACTIONS);
  const [attrSearch, setAttrSearch] = useState('');
  const [attrType, setAttrType] = useState('All');
  const [attrStatus, setAttrStatus] = useState('All');
  const [attrPage, setAttrPage] = useState(1);

  // ─── States for Tickets ──────────────────────────────────────────────────────
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [ticketSearch, setTicketSearch] = useState('');
  const [ticketAttraction, setTicketAttraction] = useState('All');
  const [ticketPage, setTicketPage] = useState(1);

  // ─── Modal States ────────────────────────────────────────────────────────────
  const [attrModal, setAttrModal] = useState({ isOpen: false, type: 'add', data: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // ─── Filter Logic ────────────────────────────────────────────────────────────
  const filteredAttractions = attractions.filter(a => {
    const matchSearch = attrSearch === '' || 
      a.ten_vi.toLowerCase().includes(attrSearch.toLowerCase()) || 
      a.ten_en.toLowerCase().includes(attrSearch.toLowerCase());
    const matchType = attrType === 'All' || a.loai_hinh === attrType;
    const matchStatus = attrStatus === 'All' || a.trang_thai === attrStatus;
    return matchSearch && matchType && matchStatus;
  });

  const filteredTickets = tickets.filter(t => {
    const matchSearch = ticketSearch === '' || t.name.toLowerCase().includes(ticketSearch.toLowerCase());
    const matchAttraction = ticketAttraction === 'All' || t.attraction === ticketAttraction;
    return matchSearch && matchAttraction;
  });

  // ─── Pagination Logic ────────────────────────────────────────────────────────
  const ITEMS_PER_PAGE = 5;
  const paginatedAttractions = filteredAttractions.slice((attrPage - 1) * ITEMS_PER_PAGE, attrPage * ITEMS_PER_PAGE);
  const paginatedTickets = filteredTickets.slice((ticketPage - 1) * ITEMS_PER_PAGE, ticketPage * ITEMS_PER_PAGE);

  // ─── Summary Stats ───────────────────────────────────────────────────────────
  const totalAttractions = attractions.length;
  const activeAttractions = attractions.filter(a => a.trang_thai === 'Active').length;
  const totalTickets = tickets.length;
  const avgTicketPrice = totalTickets > 0 ? tickets.reduce((sum, t) => sum + t.price, 0) / totalTickets : 0;

  // ─── Handlers for Attractions ────────────────────────────────────────────────
  const openAddAttr = () => setAttrModal({ isOpen: true, type: 'add', data: null });
  const openEditAttr = (attr) => setAttrModal({ isOpen: true, type: 'edit', data: attr });
  const closeAttrModal = () => setAttrModal({ isOpen: false, type: 'add', data: null });

  const handleSaveAttr = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAttr = {
      id: attrModal.type === 'edit' ? attrModal.data.id : Date.now(),
      ten_vi: formData.get('ten_vi'),
      ten_en: formData.get('ten_en'),
      dia_diem: formData.get('dia_diem'),
      loai_hinh: formData.get('loai_hinh'),
      trang_thai: formData.get('trang_thai'),
      mo_ta: formData.get('mo_ta'),
      anh_dai_dien: formData.get('anh_dai_dien')
    };

    if (attrModal.type === 'edit') {
      setAttractions(prev => prev.map(a => (a.id === newAttr.id ? newAttr : a)));
    } else {
      setAttractions(prev => [newAttr, ...prev]);
    }
    closeAttrModal();
  };

  const openDeleteAttr = (id) => setDeleteModal({ isOpen: true, id });
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, id: null });
  const confirmDeleteAttr = () => {
    setAttractions(prev => prev.filter(a => a.id !== deleteModal.id));
    closeDeleteModal();
  };

  // ─── Handlers for Tickets (Unchanged dummy implementations) ─────────────────
  const handleEditTicket = (id) => console.log('Edit ticket', id);
  const handleDeleteTicket = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      setTickets(prev => prev.filter(t => t.id !== id));
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
          value={totalAttractions} 
          icon={Map} 
          trend="up" 
          trendValue="+3" 
        />
        <DashboardCard 
          title="ACTIVE ATTRACTIONS" 
          value={activeAttractions} 
          icon={CheckCircle2} 
          trend="up" 
          trendValue="+1" 
          iconBgColor="bg-[#eefcf2]" 
          iconColor="text-[#22a85a]" 
        />
        <DashboardCard 
          title="TOTAL TICKETS" 
          value={totalTickets} 
          icon={Ticket} 
          trend="stable" 
          iconBgColor="bg-[#eff6ff]" 
          iconColor="text-blue-500" 
        />
        <DashboardCard 
          title="AVG TICKET PRICE" 
          value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(avgTicketPrice)} 
          icon={DollarSign} 
          trend="up" 
          trendValue="+5%" 
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
                      <p className="text-sm font-bold text-slate-800">{attr.ten_vi}</p>
                      <p className="text-[11px] font-semibold text-gray-400">{attr.ten_en}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm font-semibold text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {attr.dia_diem}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {attr.loai_hinh}
                    </span>
                  </td>
                  <td className="py-4 px-5"><StatusBadge status={attr.trang_thai} /></td>
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
              <AdminPrimaryButton icon={Plus}>Add Ticket</AdminPrimaryButton>
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
                    <ActionButtons onEdit={() => handleEditTicket(ticket.id)} onDelete={() => handleDeleteTicket(ticket.id)} />
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
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Name (Vietnamese)</label>
              <input type="text" name="ten_vi" defaultValue={attrModal.data?.ten_vi} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Enter Vietnamese name" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Name (English)</label>
              <input type="text" name="ten_en" defaultValue={attrModal.data?.ten_en} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Enter English name" required />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Location</label>
              <input type="text" name="dia_diem" defaultValue={attrModal.data?.dia_diem} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Enter location" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Type</label>
              <select name="loai_hinh" defaultValue={attrModal.data?.loai_hinh || "Entertainment"} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A] transition-all">
                <option value="Entertainment">Entertainment</option>
                <option value="Nature">Nature</option>
                <option value="Culture">Culture</option>
                <option value="History">History</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Image URL</label>
              <input type="text" name="anh_dai_dien" defaultValue={attrModal.data?.anh_dai_dien} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Enter image URL" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Status</label>
              <select name="trang_thai" defaultValue={attrModal.data?.trang_thai || "Active"} className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A] transition-all">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
            <textarea name="mo_ta" defaultValue={attrModal.data?.mo_ta} rows="3" className="w-full px-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all" placeholder="Enter description..."></textarea>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={closeAttrModal} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-sm font-bold transition-all shadow-md active:scale-95">
              {attrModal.type === 'add' ? 'Save Attraction' : 'Update Attraction'}
            </button>
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
