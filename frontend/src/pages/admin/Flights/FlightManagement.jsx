import React, { useState } from 'react';
import {
  Plane, PlaneTakeoff, Building2, Armchair,
  Search, Calendar, ChevronLeft, ChevronRight,
  Pencil, Trash2, Plus,
} from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';
import ConfirmModal from '../../../components/admin/ConfirmModal';
import AirlineFormModal from './AirlineFormModal';
import FlightFormModal from './FlightFormModal';

// ─── Mock Data ─────────────────────────────────────────────────────────────
const INIT_AIRLINES = [
  { id: 1, name: 'Vietnam Airlines', code: 'VN', country: 'Vietnam', status: 'Active' },
  { id: 2, name: 'Vietjet Air', code: 'VJ', country: 'Vietnam', status: 'Active' },
  { id: 3, name: 'Bamboo Airways', code: 'QH', country: 'Vietnam', status: 'Inactive' },
  { id: 4, name: 'Emirates', code: 'EK', country: 'UAE', status: 'Active' },
  { id: 5, name: 'Singapore Airlines', code: 'SQ', country: 'Singapore', status: 'Active' },
  { id: 6, name: 'Thai Airways', code: 'TG', country: 'Thailand', status: 'Inactive' },
];

const INIT_FLIGHTS = [
  { id: 1, so_hieu: 'VN-201', hang_bay: 'Vietnam Airlines', diem_di: 'Hanoi (HAN)', diem_den: 'Ho Chi Minh (SGN)', gio_di: '2024-11-01T06:00', gio_den: '2024-11-01T08:10', hang_ve: 'Economy', gia: 1200000, so_cho_con: 48 },
  { id: 2, so_hieu: 'VJ-410', hang_bay: 'Vietjet Air', diem_di: 'Ho Chi Minh (SGN)', diem_den: 'Da Nang (DAD)', gio_di: '2024-11-02T09:30', gio_den: '2024-11-02T11:00', hang_ve: 'Economy', gia: 850000, so_cho_con: 120 },
  { id: 3, so_hieu: 'EK-343', hang_bay: 'Emirates', diem_di: 'Ho Chi Minh (SGN)', diem_den: 'Dubai (DXB)', gio_di: '2024-11-03T23:55', gio_den: '2024-11-04T05:30', hang_ve: 'Business', gia: 12500000, so_cho_con: 12 },
  { id: 4, so_hieu: 'SQ-186', hang_bay: 'Singapore Airlines', diem_di: 'Hanoi (HAN)', diem_den: 'Singapore (SIN)', gio_di: '2024-11-05T14:15', gio_den: '2024-11-05T18:45', hang_ve: 'First Class', gia: 25000000, so_cho_con: 4 },
  { id: 5, so_hieu: 'QH-201', hang_bay: 'Bamboo Airways', diem_di: 'Phu Quoc (PQC)', diem_den: 'Hanoi (HAN)', gio_di: '2024-11-06T16:00', gio_den: '2024-11-06T18:20', hang_ve: 'Economy', gia: 990000, so_cho_con: 76 },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
const fmtPrice = (p) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);
const fmtDT = (dt) => {
  if (!dt) return '—';
  const d = new Date(dt);
  return isNaN(d) ? dt : d.toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
};

const CLASS_STYLE = { Economy: 'bg-gray-100 text-gray-600', Business: 'bg-[#faeceb] text-[#7C4A4A]', 'First Class': 'bg-amber-50 text-amber-700' };
const STATUS_STYLE = { Active: 'bg-[#eefcf2] text-[#22a85a]', Inactive: 'bg-gray-100 text-gray-500' };

const Badge = ({ label, cls }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${cls}`}>{label}</span>
);

const Btn = ({ icon: Icon, label, variant = 'ghost', onClick }) => {
  const v = { ghost: 'text-[#7C4A4A] bg-[#faeceb] hover:bg-[#f5dada]', danger: 'text-[#e0455d] bg-[#fef3f2] hover:bg-[#fde0e4]', primary: 'text-white bg-[#7C4A4A] hover:bg-[#633b3b] shadow-md' };
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all active:scale-95 ${v[variant]}`}>
      <Icon size={13} /> {label}
    </button>
  );
};

// ─── Airlines Tab ────────────────────────────────────────────────────────────
const AirlinesTab = ({ airlines, onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const filtered = airlines.filter((a) =>
    [a.name, a.code, a.country].some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search airline, code, country…" value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 placeholder-gray-400 outline-none focus:border-[#7C4A4A] transition-all" />
        </div>
        <button onClick={onAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-md transition-all active:scale-95 w-full sm:w-auto justify-center">
          <Plus size={15} /> Add Airline
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfaf9]">
                {['Airline Name', 'Code', 'Country', 'Status', 'Actions'].map((c) => (
                  <th key={c} className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-sm text-gray-400 font-semibold">No airlines found.</td></tr>
              ) : filtered.map((a) => (
                <tr key={a.id} className="hover:bg-[#faf8f7] transition-colors group">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#faeceb] flex items-center justify-center flex-shrink-0"><Plane className="w-4 h-4 text-[#7C4A4A]" /></div>
                      <span className="text-sm font-bold text-slate-800">{a.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm font-black text-[#7C4A4A] tracking-wider">{a.code}</td>
                  <td className="py-4 px-5 text-sm font-semibold text-gray-600">{a.country}</td>
                  <td className="py-4 px-5"><Badge label={a.status} cls={STATUS_STYLE[a.status] || 'bg-gray-100 text-gray-500'} /></td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <Btn icon={Pencil} label="Edit" onClick={() => onEdit(a)} />
                      <Btn icon={Trash2} label="Delete" variant="danger" onClick={() => onDelete(a)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-100 bg-[#fefcfc]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Showing <span className="text-slate-800">{filtered.length}</span> of <span className="text-slate-800">{airlines.length}</span> airlines
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Flights Tab ─────────────────────────────────────────────────────────────
const ITEMS = 5;

const FlightsTab = ({ flights, airlines, onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [airlineFilter, setAirlineFilter] = useState('All Airlines');
  const [fromFilter, setFromFilter] = useState('All');
  const [toFilter, setToFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [applied, setApplied] = useState({});
  const [page, setPage] = useState(1);

  const airlineOpts = ['All Airlines', ...new Set(flights.map((f) => f.hang_bay))];
  const fromOpts = ['All', ...new Set(flights.map((f) => f.diem_di))];
  const toOpts = ['All', ...new Set(flights.map((f) => f.diem_den))];

  const applyFilters = () => { setApplied({ search, airlineFilter, fromFilter, toFilter, dateFilter }); setPage(1); };

  const filtered = flights.filter((f) => {
    const q = (applied.search || '').toLowerCase();
    return (!q || f.so_hieu.toLowerCase().includes(q) || f.hang_bay.toLowerCase().includes(q))
      && (!applied.airlineFilter || applied.airlineFilter === 'All Airlines' || f.hang_bay === applied.airlineFilter)
      && (!applied.fromFilter || applied.fromFilter === 'All' || f.diem_di === applied.fromFilter)
      && (!applied.toFilter || applied.toFilter === 'All' || f.diem_den === applied.toFilter);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS));
  const paginated = filtered.slice((page - 1) * ITEMS, page * ITEMS);

  const sel = 'w-full appearance-none bg-[#fafafa] border border-gray-100 text-sm font-semibold text-slate-700 py-2.5 px-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer';
  const inp = 'w-full pl-9 pr-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 placeholder-gray-400 outline-none focus:border-[#7C4A4A] transition-all';
  const lbl = 'block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5';

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 items-end">
          <div className="xl:col-span-1">
            <label className={lbl}>Search</label>
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input className={inp} placeholder="Flight no., airline…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          </div>
          <div><label className={lbl}>Airline</label>
            <select className={sel} value={airlineFilter} onChange={(e) => setAirlineFilter(e.target.value)}>
              {airlineOpts.map((o) => <option key={o}>{o}</option>)}</select></div>
          <div><label className={lbl}>From</label>
            <select className={sel} value={fromFilter} onChange={(e) => setFromFilter(e.target.value)}>
              {fromOpts.map((o) => <option key={o}>{o}</option>)}</select></div>
          <div><label className={lbl}>To</label>
            <select className={sel} value={toFilter} onChange={(e) => setToFilter(e.target.value)}>
              {toOpts.map((o) => <option key={o}>{o}</option>)}</select></div>
          <div><label className={lbl}>Date</label>
            <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              <input type="date" className="w-full pl-9 pr-2 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all"
                value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} /></div></div>
          <div className="flex items-end">
            <button onClick={applyFilters} className="w-full px-5 py-2.5 bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-md transition-all active:scale-95">Apply</button>
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <button onClick={onAdd} className="flex items-center gap-2 px-5 py-2.5 bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-md transition-all active:scale-95 w-full sm:w-auto justify-center">
          <Plus size={15} /> Add Flight
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfaf9]">
                {['Flight No.', 'Airline', 'From', 'To', 'Departure', 'Arrival', 'Class', 'Price', 'Seats', 'Actions'].map((c) => (
                  <th key={c} className="py-4 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.length === 0 ? (
                <tr><td colSpan={10} className="py-12 text-center text-sm text-gray-400 font-semibold">No flights match your filters.</td></tr>
              ) : paginated.map((f) => (
                <tr key={f.id} className="hover:bg-[#faf8f7] transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#faeceb] flex items-center justify-center flex-shrink-0"><PlaneTakeoff className="w-3.5 h-3.5 text-[#7C4A4A]" /></div>
                      <span className="text-sm font-black text-slate-800 whitespace-nowrap">{f.so_hieu}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-600 whitespace-nowrap">{f.hang_bay}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-slate-700 whitespace-nowrap">{f.diem_di}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-slate-700 whitespace-nowrap">{f.diem_den}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-gray-500 whitespace-nowrap">{fmtDT(f.gio_di)}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-gray-500 whitespace-nowrap">{fmtDT(f.gio_den)}</td>
                  <td className="py-4 px-4 whitespace-nowrap"><Badge label={f.hang_ve} cls={CLASS_STYLE[f.hang_ve] || 'bg-gray-100 text-gray-500'} /></td>
                  <td className="py-4 px-4 text-sm font-black text-slate-800 whitespace-nowrap">{fmtPrice(f.gia)}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`text-sm font-black ${f.so_cho_con <= 10 ? 'text-[#e0455d]' : f.so_cho_con <= 30 ? 'text-[#f59e0b]' : 'text-[#22a85a]'}`}>{f.so_cho_con}</span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Btn icon={Pencil} label="Edit" onClick={() => onEdit(f)} />
                      <Btn icon={Trash2} label="Delete" variant="danger" onClick={() => onDelete(f)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 bg-[#fefcfc] gap-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Showing <span className="text-slate-800">{filtered.length === 0 ? 0 : (page - 1) * ITEMS + 1}–{Math.min(page * ITEMS, filtered.length)}</span> of <span className="text-slate-800">{filtered.length}</span> flights
          </p>
          <div className="flex items-center space-x-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-2 border border-gray-100 rounded-lg hover:bg-white text-gray-400 transition-all disabled:opacity-30"><ChevronLeft size={16} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${page === p ? 'bg-[#7C4A4A] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 border border-gray-100 rounded-lg hover:bg-white text-gray-400 transition-all disabled:opacity-30"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const TABS = ['Flights', 'Airlines'];

const FlightManagement = () => {
  const [activeTab, setActiveTab] = useState('Flights');
  const [airlines, setAirlines] = useState(INIT_AIRLINES);
  const [flights, setFlights] = useState(INIT_FLIGHTS);

  // Modal state
  const [airlineModal, setAirlineModal] = useState({ open: false, data: null });
  const [flightModal, setFlightModal] = useState({ open: false, data: null });
  const [confirmModal, setConfirmModal] = useState({ open: false, message: '', onConfirm: null });

  // ── Airline CRUD ───────────────────────────────────────────────
  const openAddAirline = () => setAirlineModal({ open: true, data: null });
  const openEditAirline = (a) => setAirlineModal({ open: true, data: a });
  const openDeleteAirline = (a) => setConfirmModal({
    open: true,
    message: `Are you sure you want to delete "${a.name}"?`,
    onConfirm: () => setAirlines((prev) => prev.filter((x) => x.id !== a.id)),
  });
  const saveAirline = (data) => {
    setAirlines((prev) => {
      const exists = prev.find((x) => x.id === data.id);
      return exists ? prev.map((x) => (x.id === data.id ? data : x)) : [...prev, data];
    });
  };

  // ── Flight CRUD ────────────────────────────────────────────────
  const openAddFlight = () => setFlightModal({ open: true, data: null });
  const openEditFlight = (f) => setFlightModal({ open: true, data: f });
  const openDeleteFlight = (f) => setConfirmModal({
    open: true,
    message: `Are you sure you want to delete flight "${f.so_hieu}"?`,
    onConfirm: () => setFlights((prev) => prev.filter((x) => x.id !== f.id)),
  });
  const saveFlight = (data) => {
    setFlights((prev) => {
      const exists = prev.find((x) => x.id === data.id);
      return exists ? prev.map((x) => (x.id === data.id ? data : x)) : [...prev, data];
    });
  };

  // Summary stats
  const totalFlights = flights.length;
  const totalAirlines = airlines.length;
  const availableSeats = flights.reduce((s, f) => s + f.so_cho_con, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Flights Management</h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="TOTAL FLIGHTS" value={totalFlights.toString()} icon={Plane} trend="up" trendValue="+5%" />
        <DashboardCard title="ACTIVE FLIGHTS" value={totalFlights.toString()} icon={PlaneTakeoff} trend="up" trendValue="+3%" iconBgColor="bg-[#eefcf2]" iconColor="text-[#22a85a]" />
        <DashboardCard title="TOTAL AIRLINES" value={totalAirlines.toString()} icon={Building2} trend="stable" trendValue="Stable" iconBgColor="bg-[#fffaeb]" iconColor="text-[#f59e0b]" />
        <DashboardCard title="AVAILABLE SEATS" value={availableSeats.toLocaleString()} icon={Armchair} trend="up" trendValue="+8%" iconBgColor="bg-blue-50" iconColor="text-blue-500" />
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex items-center border-b border-gray-200 gap-1">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-[#7C4A4A]' : 'text-gray-400 hover:text-gray-600'}`}>
              {tab}
              {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C4A4A] rounded-full" />}
            </button>
          ))}
        </div>

        {activeTab === 'Airlines' ? (
          <AirlinesTab airlines={airlines} onAdd={openAddAirline} onEdit={openEditAirline} onDelete={openDeleteAirline} />
        ) : (
          <FlightsTab flights={flights} airlines={airlines} onAdd={openAddFlight} onEdit={openEditFlight} onDelete={openDeleteFlight} />
        )}
      </div>

      {/* ── Modals ─────────────────────────────────────────────── */}
      <AirlineFormModal
        isOpen={airlineModal.open}
        onClose={() => setAirlineModal({ open: false, data: null })}
        onSave={saveAirline}
        initial={airlineModal.data}
      />

      <FlightFormModal
        isOpen={flightModal.open}
        onClose={() => setFlightModal({ open: false, data: null })}
        onSave={saveFlight}
        initial={flightModal.data}
        airlines={airlines}
      />

      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, message: '', onConfirm: null })}
        onConfirm={confirmModal.onConfirm || (() => {})}
        message={confirmModal.message}
        confirmLabel="Delete"
      />
    </div>
  );
};

export default FlightManagement;
