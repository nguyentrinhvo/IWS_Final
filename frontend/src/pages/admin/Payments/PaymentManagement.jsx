import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle,
  Clock,
  RefreshCcw,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockTransactions = [
  {
    id: 'TXN-82931',
    user: { name: 'Julian Casablancas', avatar: 'https://i.pravatar.cc/150?u=julian' },
    bookingId: 'Co-PARIS-2023',
    method: 'PayPal',
    amount: 1240.0,
    status: 'Success',
    date: 'Oct 01, 2023',
  },
  {
    id: 'TXN-82932',
    user: { name: 'Sophia Loren', avatar: 'https://i.pravatar.cc/150?u=sophia' },
    bookingId: 'Co-TOKYO-2023',
    method: 'VNPay',
    amount: 3850.0,
    status: 'Pending',
    date: 'Oct 05, 2023',
  },
  {
    id: 'TXN-82933',
    user: { name: 'Marcus Aurelius', avatar: 'https://i.pravatar.cc/150?u=marcus' },
    bookingId: 'Co-ROME-2023',
    method: 'PayPal',
    amount: 920.0,
    status: 'Refunded',
    date: 'Oct 10, 2023',
  },
  {
    id: 'TXN-82934',
    user: { name: 'David Bowie', avatar: 'https://i.pravatar.cc/150?u=david' },
    bookingId: 'Co-LONDON-2023',
    method: 'VNPay',
    amount: 2100.0,
    status: 'Cancelled',
    date: 'Oct 12, 2023',
  },
  {
    id: 'TXN-82935',
    user: { name: 'Amelia Watson', avatar: 'https://i.pravatar.cc/150?u=amelia' },
    bookingId: 'Co-SYDNEY-2023',
    method: 'PayPal',
    amount: 1780.0,
    status: 'Success',
    date: 'Oct 15, 2023',
  },
  {
    id: 'TXN-82936',
    user: { name: 'Keanu Reeves', avatar: 'https://i.pravatar.cc/150?u=keanu' },
    bookingId: 'Co-NYC-2023',
    method: 'VNPay',
    amount: 4500.0,
    status: 'Pending',
    date: 'Oct 18, 2023',
  },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  Success: {
    bg: 'bg-[#eefcf2]',
    text: 'text-[#22a85a]',
    label: 'SUCCESS',
  },
  Pending: {
    bg: 'bg-[#fffaeb]',
    text: 'text-[#f59e0b]',
    label: 'PENDING',
  },
  Cancelled: {
    bg: 'bg-[#fef3f2]',
    text: 'text-[#e0455d]',
    label: 'CANCELLED',
  },
  Refunded: {
    bg: 'bg-gray-100',
    text: 'text-gray-500',
    label: 'REFUNDED',
  },
};

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Pending;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${style.bg} ${style.text}`}
    >
      {style.label}
    </span>
  );
};

// ─── Method Badge ─────────────────────────────────────────────────────────────
const MethodBadge = ({ method }) => {
  const isPayPal = method === 'PayPal';
  return (
    <div className="flex items-center space-x-1.5">
      {isPayPal ? (
        <CreditCard className="w-4 h-4 text-blue-500" />
      ) : (
        <CreditCard className="w-4 h-4 text-[#7C4A4A]" />
      )}
      <span className="text-sm font-semibold text-slate-700">{method}</span>
    </div>
  );
};

// ─── Refund Action Button ─────────────────────────────────────────────────────
const RefundAction = ({ status }) => {
  if (status === 'Pending' || status === 'Cancelled') return null;
  if (status === 'Refunded') {
    return (
      <button
        disabled
        className="px-3 py-1.5 rounded-md text-xs font-bold text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed opacity-60"
      >
        Refund
      </button>
    );
  }
  // status === 'Success'
  return (
    <button className="px-3 py-1.5 rounded-md text-xs font-bold text-[#7C4A4A] bg-[#faeceb] hover:bg-[#f5dada] border border-[#e8c8c8] transition-all active:scale-95">
      Refund
    </button>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const PaymentManagement = () => {
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('All Methods');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    method: 'All Methods',
    status: 'All Status',
    dateFrom: '',
    dateTo: '',
  });

  const handleApplyFilters = () => {
    setAppliedFilters({ search, method: methodFilter, status: statusFilter, dateFrom, dateTo });
    setCurrentPage(1);
  };

  // Filter logic
  const filtered = mockTransactions.filter((tx) => {
    const q = appliedFilters.search.toLowerCase();
    const matchSearch =
      !q ||
      tx.id.toLowerCase().includes(q) ||
      tx.bookingId.toLowerCase().includes(q) ||
      tx.user.name.toLowerCase().includes(q);

    const matchMethod =
      appliedFilters.method === 'All Methods' || tx.method === appliedFilters.method;

    const matchStatus =
      appliedFilters.status === 'All Status' || tx.status === appliedFilters.status;

    return matchSearch && matchMethod && matchStatus;
  });

  // Pagination
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Summary stats
  const total = mockTransactions.length;
  const successful = mockTransactions.filter((t) => t.status === 'Success').length;
  const pending = mockTransactions.filter((t) => t.status === 'Pending').length;
  const refunded = mockTransactions.filter((t) => t.status === 'Refunded').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
          Payment Management
        </h1>
        
      </div>

      {/* ── Summary Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="TOTAL TRANSACTIONS"
          value={total.toLocaleString()}
          icon={CreditCard}
          trend="up"
          trendValue="+12%"
        />
        <DashboardCard
          title="SUCCESSFUL PAYMENTS"
          value={successful.toLocaleString()}
          icon={CheckCircle}
          trend="up"
          trendValue="+8%"
          iconBgColor="bg-[#eefcf2]"
          iconColor="text-[#22a85a]"
        />
        <DashboardCard
          title="PENDING PAYMENTS"
          value={pending.toLocaleString()}
          icon={Clock}
          trend="stable"
          trendValue="14 New"
          iconBgColor="bg-[#fffaeb]"
          iconColor="text-[#f59e0b]"
        />
        <DashboardCard
          title="REFUNDED PAYMENTS"
          value={refunded.toLocaleString()}
          icon={RefreshCcw}
          trend="up"
          trendValue="+2%"
          iconBgColor="bg-gray-100"
          iconColor="text-gray-500"
        />
      </div>

      {/* ── Filters & Search ──────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 items-end">
          {/* Search */}
          <div className="xl:col-span-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="ID, Booking, User..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 placeholder-gray-400 outline-none focus:border-[#7C4A4A] focus:ring-1 focus:ring-[#7C4A4A]/20 transition-all"
              />
            </div>
          </div>

          {/* Method Filter */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Method
            </label>
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full appearance-none bg-[#fafafa] border border-gray-100 text-sm font-semibold text-slate-700 py-2.5 px-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer"
            >
              <option>All Methods</option>
              <option>VNPay</option>
              <option>PayPal</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-[#fafafa] border border-gray-100 text-sm font-semibold text-slate-700 py-2.5 px-4 rounded-lg outline-none focus:border-[#7C4A4A] transition-all cursor-pointer"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Success</option>
              <option>Cancelled</option>
              <option>Refunded</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="md:col-span-2 xl:col-span-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              Date Range
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full pl-9 pr-2 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all"
                />
              </div>
              <span className="text-gray-300 text-sm font-bold flex-shrink-0">–</span>
              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full pl-9 pr-2 py-2.5 bg-[#fafafa] border border-gray-100 rounded-lg text-sm text-slate-700 outline-none focus:border-[#7C4A4A] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="md:col-span-2 xl:col-span-1 flex items-end">
            <button
              onClick={handleApplyFilters}
              className="w-full xl:w-auto px-6 py-2.5 bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-xs font-black uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* ── Transaction Table ─────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-[#f0ecec] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fcfaf9]">
                {[
                  'Transaction ID',
                  'User',
                  'Booking ID',
                  'Payment Method',
                  'Amount',
                  'Status',
                  'Date',
                  'Actions',
                ].map((col) => (
                  <th
                    key={col}
                    className="py-4 px-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-16 text-center text-sm text-gray-400 font-semibold"
                  >
                    No transactions match your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-[#faf8f7] transition-colors group"
                  >
                    {/* Transaction ID */}
                    <td className="py-4 px-5 text-sm font-bold text-slate-800 whitespace-nowrap">
                      {tx.id}
                    </td>

                    {/* User */}
                    <td className="py-4 px-5">
                      <div className="flex items-center space-x-3">
                        <img
                          src={tx.user.avatar}
                          alt={tx.user.name}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-white group-hover:ring-[#faeceb] transition-all flex-shrink-0"
                        />
                        <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                          {tx.user.name}
                        </span>
                      </div>
                    </td>

                    {/* Booking ID */}
                    <td className="py-4 px-5 text-sm font-semibold text-gray-500 whitespace-nowrap">
                      {tx.bookingId}
                    </td>

                    {/* Method */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <MethodBadge method={tx.method} />
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-5 text-sm font-black text-slate-800 whitespace-nowrap">
                      ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <StatusBadge status={tx.status} />
                    </td>

                    {/* Date */}
                    <td className="py-4 px-5 text-sm text-gray-500 font-medium whitespace-nowrap">
                      {tx.date}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <RefundAction status={tx.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 bg-[#fefcfc] gap-4">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Showing{' '}
            <span className="text-slate-800">
              {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} –{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
            </span>{' '}
            of <span className="text-slate-800">{filtered.length}</span> transactions
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-100 rounded-lg hover:bg-white hover:shadow-sm text-gray-400 transition-all disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && arr[idx - 1] !== p - 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((item, idx) =>
                item === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-xs">
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      currentPage === item
                        ? 'bg-[#7C4A4A] text-white shadow-md'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
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

export default PaymentManagement;
