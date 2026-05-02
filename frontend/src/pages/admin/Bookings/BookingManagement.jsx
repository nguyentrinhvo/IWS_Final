import React, { useState } from 'react';
import { CalendarCheck, Clock, CheckCircle2, XCircle, Check, X } from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';
import AdminTable from '../../../components/admin/AdminTable';
import TablePagination from '../../../components/admin/TablePagination';
import FilterBar, { FilterLabel, AdminSelect } from '../../../components/admin/FilterBar';
import SearchInput from '../../../components/admin/SearchInput';

const MOCK_BOOKINGS = [
  { id: 1, bookingId: 'BK-1001', user: 'John Doe', tour: 'Ha Long Bay Cruise', date: '2023-11-15', status: 'Pending', paymentStatus: 'Pending', totalPrice: 1500000 },
  { id: 2, bookingId: 'BK-1002', user: 'Jane Smith', tour: 'Hoi An Ancient Town', date: '2023-11-16', status: 'Confirmed', paymentStatus: 'Confirmed', totalPrice: 850000 },
  { id: 3, bookingId: 'BK-1003', user: 'Mike Johnson', tour: 'Ba Na Hills', date: '2023-11-17', status: 'Rejected', paymentStatus: 'Cancelled', totalPrice: 1200000 },
  { id: 4, bookingId: 'BK-1004', user: 'Sarah Williams', tour: 'Phu Quoc Island', date: '2023-11-18', status: 'Cancelled', paymentStatus: 'Cancelled', totalPrice: 3500000 },
  { id: 5, bookingId: 'BK-1005', user: 'David Brown', tour: 'Mekong Delta', date: '2023-11-19', status: 'Pending', paymentStatus: 'Confirmed', totalPrice: 950000 },
];

const COLUMNS = ['Booking ID', 'User', 'Tour', 'Date', 'Status', 'Payment Status', 'Total Price', 'Actions'];

const BookingManagement = () => {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tourFilter, setTourFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const toursList = [...new Set(MOCK_BOOKINGS.map(b => b.tour))];

  // ─── Filters ─────────────────────────────────────────────────────────────────
  const filteredBookings = bookings.filter(b => {
    const matchSearch = search === '' || 
      b.bookingId.toLowerCase().includes(search.toLowerCase()) || 
      b.user.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchTour = tourFilter === 'All' || b.tour === tourFilter;
    const matchDate = dateFilter === '' || b.date === dateFilter;
    return matchSearch && matchStatus && matchTour && matchDate;
  });

  const paginatedBookings = filteredBookings.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE) || 1;

  // ─── Stats ───────────────────────────────────────────────────────────────────
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleApprove = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b));
  };

  const handleReject = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Rejected' } : b));
  };

  const handlePaymentChange = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, paymentStatus: newStatus } : b));
  };

  const renderBadge = (status) => {
    let style = '';
    if (status === 'Pending') style = 'bg-yellow-50 text-yellow-600 border-yellow-200';
    else if (status === 'Confirmed') style = 'bg-green-50 text-green-600 border-green-200';
    else style = 'bg-red-50 text-red-600 border-red-200'; // Cancelled or Rejected

    return (
      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${style}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Dynamic Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
          Booking Management
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="TOTAL BOOKINGS" value={totalBookings} icon={CalendarCheck} />
        <DashboardCard title="PENDING" value={pendingBookings} icon={Clock} iconBgColor="bg-[#fffbeb]" iconColor="text-[#f59e0b]" trend="up" trendValue="+2" />
        <DashboardCard title="CONFIRMED" value={confirmedBookings} icon={CheckCircle2} iconBgColor="bg-[#eefcf2]" iconColor="text-[#22a85a]" trend="up" trendValue="+5" />
        <DashboardCard title="CANCELLED" value={cancelledBookings} icon={XCircle} iconBgColor="bg-[#fef2f2]" iconColor="text-[#ef4444]" />
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Filter Panel */}
        <FilterBar gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <FilterLabel>Search Bookings</FilterLabel>
            <SearchInput
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by Booking ID or User..."
            />
          </div>
          <div>
            <FilterLabel>Status</FilterLabel>
            <AdminSelect value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Rejected">Rejected</option>
              <option value="Cancelled">Cancelled</option>
            </AdminSelect>
          </div>
          <div>
            <FilterLabel>Tour</FilterLabel>
            <AdminSelect value={tourFilter} onChange={(e) => { setTourFilter(e.target.value); setPage(1); }}>
              <option value="All">All Tours</option>
              {toursList.map(t => <option key={t} value={t}>{t}</option>)}
            </AdminSelect>
          </div>
          <div>
            <FilterLabel>Date</FilterLabel>
            <input 
              type="date"
              value={dateFilter}
              onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-[#7C4A4A] transition-all"
            />
          </div>
        </FilterBar>

        {/* Table */}
        <AdminTable columns={COLUMNS} minWidth="min-w-[1200px]" emptyMessage="No bookings match your filters.">
          {paginatedBookings.map(b => (
            <tr key={b.id} className="hover:bg-[#faf8f7] transition-colors group">
              <td className="py-4 px-5 text-sm font-black text-[#7C4A4A]">{b.bookingId}</td>
              <td className="py-4 px-5 text-sm font-bold text-slate-800">{b.user}</td>
              <td className="py-4 px-5 text-sm font-semibold text-gray-600">{b.tour}</td>
              <td className="py-4 px-5 text-sm font-semibold text-gray-500 whitespace-nowrap">{b.date}</td>
              <td className="py-4 px-5">{renderBadge(b.status)}</td>
              <td className="py-4 px-5">{renderBadge(b.paymentStatus)}</td>
              <td className="py-4 px-5 text-sm font-bold text-slate-800">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(b.totalPrice)}
              </td>
              <td className="py-4 px-5">
                <div className="flex items-center gap-2">
                  {b.status === 'Pending' && (
                    <>
                      <button 
                        onClick={() => handleApprove(b.id)}
                        className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded border border-green-200 transition-colors shadow-sm"
                        title="Approve Booking"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleReject(b.id)}
                        className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded border border-red-200 transition-colors shadow-sm"
                        title="Reject Booking"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  
                  <select 
                    value={b.paymentStatus}
                    onChange={(e) => handlePaymentChange(b.id, e.target.value)}
                    className="ml-1 px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-gray-600 outline-none focus:border-[#7C4A4A] transition-colors cursor-pointer"
                    title="Update Payment Status"
                  >
                    <option value="Pending">Payment: Pending</option>
                    <option value="Confirmed">Payment: Confirmed</option>
                    <option value="Cancelled">Payment: Cancelled</option>
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>

        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredBookings.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
          noun="bookings"
        />
      </div>
    </div>
  );
};

export default BookingManagement;
