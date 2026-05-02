import React, { useState } from 'react';
import { Star, MessageSquare, Eye, EyeOff, Search, Filter } from 'lucide-react';
import DashboardCard from '../../../components/admin/DashboardCard';
import AdminTable from '../../../components/admin/AdminTable';
import TablePagination from '../../../components/admin/TablePagination';
import FilterBar, { FilterLabel, AdminSelect } from '../../../components/admin/FilterBar';
import SearchInput from '../../../components/admin/SearchInput';
import ConfirmModal from '../../../components/admin/ConfirmModal';

const MOCK_REVIEWS = [
  { id: 1, user: 'John Doe', tour: 'Ha Long Bay Cruise', rating: 5, content: 'Absolutely amazing experience! The tour guide was fantastic and the views were breathtaking.', status: 'Visible', createdAt: '2023-10-01' },
  { id: 2, user: 'Jane Smith', tour: 'Hoi An Ancient Town', rating: 4, content: 'Very beautiful place, but a bit too crowded. Overall good.', status: 'Visible', createdAt: '2023-10-02' },
  { id: 3, user: 'Mike Johnson', tour: 'Ba Na Hills', rating: 1, content: 'Terrible service, the weather was bad and we had to wait for hours.', status: 'Hidden', createdAt: '2023-10-03' },
  { id: 4, user: 'Sarah Williams', tour: 'Phu Quoc Island', rating: 5, content: 'Best beach holiday ever. Highly recommend this tour package.', status: 'Visible', createdAt: '2023-10-04' },
  { id: 5, user: 'David Brown', tour: 'Mekong Delta', rating: 2, content: 'Not as described. The boat was old and food was mediocre.', status: 'Hidden', createdAt: '2023-10-05' },
];

const COLUMNS = ['User', 'Tour', 'Rating', 'Content', 'Status', 'Created At', 'Actions'];

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const [confirmModal, setConfirmModal] = useState({ isOpen: false, reviewId: null });

  // ─── Filtering ───────────────────────────────────────────────────────────────
  const filteredReviews = reviews.filter(r => {
    const matchSearch = search === '' || 
      r.user.toLowerCase().includes(search.toLowerCase()) || 
      r.content.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchRating = ratingFilter === 'All' || r.rating.toString() === ratingFilter;
    return matchSearch && matchStatus && matchRating;
  });

  // ─── Pagination ──────────────────────────────────────────────────────────────
  const paginatedReviews = filteredReviews.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE) || 1;

  // ─── Stats ───────────────────────────────────────────────────────────────────
  const totalReviews = reviews.length;
  const visibleReviews = reviews.filter(r => r.status === 'Visible').length;
  const hiddenReviews = reviews.filter(r => r.status === 'Hidden').length;

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleToggleVisibility = (id) => {
    setReviews(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, status: r.status === 'Visible' ? 'Hidden' : 'Visible' };
      }
      return r;
    }));
  };

  const openConfirmHide = (id) => {
    setConfirmModal({ isOpen: true, reviewId: id });
  };

  const confirmHide = () => {
    handleToggleVisibility(confirmModal.reviewId);
    setConfirmModal({ isOpen: false, reviewId: null });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star} 
            className={`w-3.5 h-3.5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
          />
        ))}
      </div>
    );
  };

  const renderBadge = (status) => {
    const isVisible = status === 'Visible';
    return (
      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${isVisible ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Dynamic Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
          Reviews Management
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <DashboardCard title="TOTAL REVIEWS" value={totalReviews} icon={MessageSquare} trend="up" trendValue="+12" />
        <DashboardCard title="VISIBLE REVIEWS" value={visibleReviews} icon={Eye} iconBgColor="bg-[#eefcf2]" iconColor="text-[#22a85a]" />
        <DashboardCard title="HIDDEN REVIEWS" value={hiddenReviews} icon={EyeOff} iconBgColor="bg-[#fef2f2]" iconColor="text-[#ef4444]" />
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        <FilterBar gridCols="grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <FilterLabel>Search Reviews</FilterLabel>
            <SearchInput
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by user or content..."
            />
          </div>
          <div>
            <FilterLabel>Status</FilterLabel>
            <AdminSelect value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              <option value="All">All Status</option>
              <option value="Visible">Visible</option>
              <option value="Hidden">Hidden</option>
            </AdminSelect>
          </div>
          <div>
            <FilterLabel>Rating</FilterLabel>
            <AdminSelect value={ratingFilter} onChange={(e) => { setRatingFilter(e.target.value); setPage(1); }}>
              <option value="All">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </AdminSelect>
          </div>
        </FilterBar>

        <AdminTable columns={COLUMNS} minWidth="min-w-[1000px]" emptyMessage="No reviews match your filters.">
          {paginatedReviews.map(review => (
            <tr key={review.id} className="hover:bg-[#faf8f7] transition-colors group">
              <td className="py-4 px-5 text-sm font-bold text-slate-800">{review.user}</td>
              <td className="py-4 px-5 text-sm font-semibold text-gray-600">{review.tour}</td>
              <td className="py-4 px-5">{renderStars(review.rating)}</td>
              <td className="py-4 px-5 text-sm text-gray-600 max-w-[250px]">
                <p className="truncate" title={review.content}>{review.content}</p>
              </td>
              <td className="py-4 px-5">
                {renderBadge(review.status)}
              </td>
              <td className="py-4 px-5 text-sm font-semibold text-gray-500 whitespace-nowrap">{review.createdAt}</td>
              <td className="py-4 px-5">
                {review.status === 'Visible' ? (
                  <button 
                    onClick={() => openConfirmHide(review.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-md text-xs font-bold transition-colors"
                  >
                    <EyeOff className="w-3.5 h-3.5" /> Hide
                  </button>
                ) : (
                  <button 
                    onClick={() => handleToggleVisibility(review.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 rounded-md text-xs font-bold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Show
                  </button>
                )}
              </td>
            </tr>
          ))}
        </AdminTable>

        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredReviews.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
          noun="reviews"
        />
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, reviewId: null })}
        onConfirm={confirmHide}
        message="Are you sure you want to hide this review? It will no longer be visible to users."
        confirmLabel="Hide"
      />
    </div>
  );
};

export default ReviewsManagement;
