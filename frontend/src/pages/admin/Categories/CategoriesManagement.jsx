import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, Image as ImageIcon } from 'lucide-react';
import AdminTable from '../../../components/admin/AdminTable';
import TablePagination from '../../../components/admin/TablePagination';
import ActionButtons from '../../../components/admin/ActionButtons';
import SearchInput from '../../../components/admin/SearchInput';
import FilterBar, { FilterLabel } from '../../../components/admin/FilterBar';
import AdminPrimaryButton from '../../../components/admin/AdminPrimaryButton';
import AdminModal from '../../../components/admin/AdminModal';
import ConfirmModal from '../../../components/admin/ConfirmModal';
import FormInput from '../../../components/admin/FormInput';
import FormTextarea from '../../../components/admin/FormTextarea';
import ImageUpload from '../../../components/admin/ImageUpload';

// ─── Mock Data (Strictly matching DB fields) ─────────────────────────────────
const MOCK_CATEGORIES = [
  { 
    id: 1, 
    ten_vi: 'Tham quan', 
    ten_en: 'Sightseeing', 
    mo_ta_vi: 'Các địa điểm tham quan ngắm cảnh, di tích lịch sử và danh lam thắng cảnh.', 
    mo_ta_en: 'Sightseeing spots, historical monuments, and scenic landscapes.', 
    anh_dai_dien: 'https://images.unsplash.com/photo-1548625361-26c63f1e967d?auto=format&fit=crop&w=150&h=150', 
    tao_luc: '2023-01-15T08:30:00Z' 
  },
  { 
    id: 2, 
    ten_vi: 'Nghỉ dưỡng', 
    ten_en: 'Resort', 
    mo_ta_vi: 'Khu nghỉ dưỡng cao cấp, spa và các dịch vụ thư giãn.', 
    mo_ta_en: 'Luxury resorts, spas, and relaxation services.', 
    anh_dai_dien: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=150&h=150', 
    tao_luc: '2023-02-10T09:15:00Z' 
  },
  { 
    id: 3, 
    ten_vi: 'Vui chơi giải trí', 
    ten_en: 'Entertainment', 
    mo_ta_vi: 'Công viên giải trí, khu vui chơi và các hoạt động sôi động.', 
    mo_ta_en: 'Amusement parks, entertainment centers, and exciting activities.', 
    anh_dai_dien: '', 
    tao_luc: '2023-03-05T14:20:00Z' 
  },
  { 
    id: 4, 
    ten_vi: 'Khám phá văn hóa', 
    ten_en: 'Cultural Exploration', 
    mo_ta_vi: 'Trải nghiệm văn hóa địa phương, làng nghề truyền thống và ẩm thực.', 
    mo_ta_en: 'Experience local culture, traditional craft villages, and cuisine.', 
    anh_dai_dien: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=150&h=150', 
    tao_luc: '2023-04-20T10:05:00Z' 
  },
];

const COLUMNS = [
  'Image', 
  'Name (Vietnamese)', 
  'Name (English)', 
  'Description (Vietnamese)', 
  'Description (English)', 
  'Created At', 
  'Actions'
];

const CategoriesManagement = () => {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // ─── Modal States ────────────────────────────────────────────────────────────
  const [categoryModal, setCategoryModal] = useState({ isOpen: false, type: 'add', data: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // ─── Filter Logic ────────────────────────────────────────────────────────────
  const filteredCategories = categories.filter(c => {
    const term = search.toLowerCase();
    return search === '' || 
      c.ten_vi.toLowerCase().includes(term) || 
      c.ten_en.toLowerCase().includes(term);
  });

  // ─── Pagination Logic ────────────────────────────────────────────────────────
  const paginatedCategories = filteredCategories.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE) || 1;

  // ─── Formatting ──────────────────────────────────────────────────────────────
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  // ─── Form & Modal Handlers ───────────────────────────────────────────────────
  const openAddModal = () => setCategoryModal({ isOpen: true, type: 'add', data: null });
  const openEditModal = (category) => setCategoryModal({ isOpen: true, type: 'edit', data: category });
  const closeCategoryModal = () => setCategoryModal({ isOpen: false, type: 'add', data: null });

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCategory = {
      id: categoryModal.type === 'edit' ? categoryModal.data.id : Date.now(),
      ten_vi: formData.get('ten_vi'),
      ten_en: formData.get('ten_en'),
      mo_ta_vi: formData.get('mo_ta_vi'),
      mo_ta_en: formData.get('mo_ta_en'),
      anh_dai_dien: formData.get('anh_dai_dien'),
      tao_luc: categoryModal.type === 'edit' ? categoryModal.data.tao_luc : new Date().toISOString()
    };

    if (categoryModal.type === 'edit') {
      setCategories(prev => prev.map(c => (c.id === newCategory.id ? newCategory : c)));
    } else {
      setCategories(prev => [newCategory, ...prev]);
    }
    closeCategoryModal();
  };

  const openDeleteModal = (id) => setDeleteModal({ isOpen: true, id });
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, id: null });
  
  const confirmDelete = () => {
    setCategories(prev => prev.filter(c => c.id !== deleteModal.id));
    closeDeleteModal();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Breadcrumbs */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
          Category Management
        </h1>
        
        <AdminPrimaryButton icon={Plus} onClick={openAddModal}>
          Add Category
        </AdminPrimaryButton>
      </div>

      {/* Main Content Card */}
      <div className="space-y-6">
        {/* Filter Panel */}
        <FilterBar gridCols="grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <FilterLabel>Search Categories</FilterLabel>
            <SearchInput
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search category name..."
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => {
                setSearch('');
                setPage(1);
              }}
              className="w-full px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-black uppercase tracking-widest rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" /> Clear Filter
            </button>
          </div>
        </FilterBar>

        {/* Data Table */}
        <AdminTable columns={COLUMNS} minWidth="min-w-[1000px]" emptyMessage="No categories match your search.">
          {paginatedCategories.map(cat => (
            <tr key={cat.id} className="hover:bg-[#faf8f7] transition-colors group">
              <td className="py-4 px-5">
                {cat.anh_dai_dien ? (
                  <img 
                    src={cat.anh_dai_dien} 
                    alt={cat.ten_en} 
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 shadow-sm">
                    <ImageIcon size={20} />
                  </div>
                )}
              </td>
              <td className="py-4 px-5 text-sm font-bold text-slate-800">
                {cat.ten_vi}
              </td>
              <td className="py-4 px-5 text-sm font-semibold text-gray-600">
                {cat.ten_en}
              </td>
              <td className="py-4 px-5 text-sm text-gray-600 max-w-[200px]">
                <p className="line-clamp-2" title={cat.mo_ta_vi}>
                  {cat.mo_ta_vi}
                </p>
              </td>
              <td className="py-4 px-5 text-sm text-gray-600 max-w-[200px]">
                <p className="line-clamp-2" title={cat.mo_ta_en}>
                  {cat.mo_ta_en}
                </p>
              </td>
              <td className="py-4 px-5 text-sm font-semibold text-gray-500 whitespace-nowrap">
                {formatDate(cat.tao_luc)}
              </td>
              <td className="py-4 px-5">
                <ActionButtons 
                  onEdit={() => openEditModal(cat)} 
                  onDelete={() => openDeleteModal(cat.id)} 
                />
              </td>
            </tr>
          ))}
        </AdminTable>

        {/* Pagination */}
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredCategories.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
          noun="categories"
        />
      </div>

      {/* ─── Create / Edit Modal ────────────────────────────────────────────── */}
      <AdminModal
        isOpen={categoryModal.isOpen}
        onClose={closeCategoryModal}
        title={categoryModal.type === 'add' ? 'Add Category' : 'Edit Category'}
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput 
              label="Name (Vietnamese)" 
              name="ten_vi" 
              defaultValue={categoryModal.data?.ten_vi} 
              placeholder="e.g., Khám phá văn hóa"
              required 
            />
            <FormInput 
              label="Name (English)" 
              name="ten_en" 
              defaultValue={categoryModal.data?.ten_en} 
              placeholder="e.g., Cultural Exploration"
              required 
            />
          </div>
          
          <ImageUpload 
            label="Image" 
            name="anh_dai_dien" 
            defaultValue={categoryModal.data?.anh_dai_dien} 
          />

          <div className="space-y-4">
            <FormTextarea 
              label="Description (Vietnamese)" 
              name="mo_ta_vi" 
              defaultValue={categoryModal.data?.mo_ta_vi} 
              placeholder="Enter Vietnamese description..."
            />
            <FormTextarea 
              label="Description (English)" 
              name="mo_ta_en" 
              defaultValue={categoryModal.data?.mo_ta_en} 
              placeholder="Enter English description..."
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={closeCategoryModal} 
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-2.5 rounded-lg bg-[#7C4A4A] hover:bg-[#633b3b] text-white text-sm font-bold transition-all shadow-md active:scale-95"
            >
              {categoryModal.type === 'add' ? 'Save Category' : 'Save Changes'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* ─── Delete Confirmation Modal ──────────────────────────────────────── */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default CategoriesManagement;
