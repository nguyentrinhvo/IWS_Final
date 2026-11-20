import React, { useState, useEffect } from 'react';
import { CalendarCheck, Clock, CheckCircle2, XCircle, Check, X } from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';
import AdminTable from '../../../components/admin/AdminTable';
import TablePagination from '../../../components/admin/TablePagination';
import FilterBar, { FilterLabel, AdminSelect } from '../../../components/admin/FilterBar';
import SearchInput from '../../../components/admin/SearchInput';
import { getAllBookings } from '../../../services/adminService';
import api from '../../../services/api';
import { toast } from "react-hot-toast";

const COLUMNS = ['Booking ID', 'User', 'Service', 'Date', 'Status', 'Payment Status', 'Total Price', 'Actions'];

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const ITEMS_PER_PAGE = 10;

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = {
        page: page - 1,
        size: ITEMS_PER_PAGE,
      };
      if (statusFilter !== 'All') params.status = statusFilter.toLowerCase();
      if (typeFilter !== 'All') params.serviceType = typeFilter.toLowerCase();

      const data = await getAllBookings(params);
      setBookings(data.content);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [page, statusFilter, typeFilter]);

  // ─── Stats ───────────────────────────────────────────────────────────────────
  // Note: For real stats, we should use the Dashboard API or a separate summary API.
  // Here we just show some placeholder or derived values from the current page/total.

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/bookings/${id}/confirm`);
      toast.success("Booking confirmed");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to confirm booking");
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await api.put(`/bookings/${id}/cancel`); // Uses the common cancel endpoint
        toast.success("Booking cancelled");
        fetchBookings();
      } catch (error) {
        toast.error("Failed to cancel booking");
      }
    }
  };

  const renderBadge = (status) => {
    let style = '';
    const s = status?.toLowerCase();
    if (s === 'pending') style = 'bg-yellow-50 text-yellow-600 border-yellow-200';
    else if (s === 'confirmed' || s === 'success') style = 'bg-green-50 text-green-600 border-green-200';
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
        <DashboardCard title="TOTAL BOOKINGS" value={totalElements} icon={CalendarCheck} />
        <DashboardCard title="LIVE UPDATES" value="Real-time" icon={Clock} iconBgColor="bg-[#fffbeb]" iconColor="text-[#f59e0b]" />
        <DashboardCard title="STATUS" value="Active" icon={CheckCircle2} iconBgColor="bg-[#eefcf2]" iconColor="text-[#22a85a]" />
        <DashboardCard title="DATABASE" value="Connected" icon={XCircle} iconBgColor="bg-blue-50" iconColor="text-blue-500" />
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Filter Panel */}
        <FilterBar gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <FilterLabel>Search Bookings</FilterLabel>
            <SearchInput
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search is handled by backend (WIP)..."
              disabled
            />
          </div>
          <div>
            <FilterLabel>Status</FilterLabel>
            <AdminSelect value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </AdminSelect>
          </div>
          <div>
            <FilterLabel>Type</FilterLabel>
            <AdminSelect value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}>
              <option value="All">All Types</option>
              <option value="tour">Tour</option>
              <option value="flight">Flight</option>
              <option value="hotel">Hotel</option>
              <option value="bus_train">Transport</option>
            </AdminSelect>
          </div>
        </FilterBar>

        {/* Table */}
        <div className="relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C4A4A]"></div>
            </div>
          )}
          
          <AdminTable columns={COLUMNS} minWidth="min-w-[1200px]" emptyMessage="No bookings match your filters.">
            {bookings.map(b => (
              <tr key={b.id} className="hover:bg-[#faf8f7] transition-colors group">
                <td className="py-4 px-5 text-sm font-black text-[#7C4A4A]">#{b.id.substring(0, 8)}</td>
                <td className="py-4 px-5">
                   <div className="text-sm font-bold text-slate-800">{b.userName || 'Unknown User'}</div>
                   <div className="text-[10px] text-gray-400">{b.userEmail}</div>
                </td>
                <td className="py-4 px-5">
                   <div className="text-sm font-semibold text-gray-600">{b.snapshotName}</div>
                   <div className="text-[10px] text-gray-400 uppercase font-bold">{b.serviceType}</div>
                </td>
                <td className="py-4 px-5 text-sm font-semibold text-gray-500 whitespace-nowrap">
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-5">{renderBadge(b.status)}</td>
                <td className="py-4 px-5">{renderBadge(b.payment?.paymentStatus || 'N/A')}</td>
                <td className="py-4 px-5 text-sm font-bold text-slate-800">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(b.totalPrice)}
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2">
                    {b.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleApprove(b.id)}
                          className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded border border-green-200 transition-colors shadow-sm"
                          title="Confirm Booking"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleCancel(b.id)}
                          className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded border border-red-200 transition-colors shadow-sm"
                          title="Cancel Booking"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </AdminTable>
        </div>

        <TablePagination
          currentPage={page}
          totalPages={Math.ceil(totalElements / ITEMS_PER_PAGE) || 1}
          totalItems={totalElements}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
          noun="bookings"
        />
      </div>
    </div>
  );
};

export default BookingManagement;
