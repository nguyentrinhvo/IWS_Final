import React, { useState, useEffect } from 'react';
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
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../../services/categoryService';
import { toast } from "react-hot-toast";

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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ page: 0, size: 10, totalElements: 0 });

  // ─── Modal States ────────────────────────────────────────────────────────────
  const [categoryModal, setCategoryModal] = useState({ isOpen: false, type: 'add', data: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories({
        page: pagination.page,
        size: pagination.size,
        keyword: search
      });
      setCategories(data.content);
      setPagination(prev => ({ ...prev, totalElements: data.totalElements }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [pagination.page, search]);

  // ─── Filter Logic ────────────────────────────────────────────────────────────
  // Pagination Logic
  const totalPages = Math.ceil(pagination.totalElements / pagination.size) || 1;

  // ─── Formatting ──────────────────────────────────────────────────────────────
  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  // ─── Form & Modal Handlers ───────────────────────────────────────────────────
  const openAddModal = () => setCategoryModal({ isOpen: true, type: 'add', data: null });
  const openEditModal = (category) => setCategoryModal({ isOpen: true, type: 'edit', data: category });
  const closeCategoryModal = () => setCategoryModal({ isOpen: false, type: 'add', data: null });

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      nameVi: formData.get('nameVi'),
      nameEn: formData.get('nameEn'),
      descriptionVi: formData.get('descriptionVi'),
      descriptionEn: formData.get('descriptionEn'),
      imageUrl: formData.get('imageUrl')
    };

    try {
      if (categoryModal.type === 'edit') {
        await updateCategory(categoryModal.data.id, payload);
        toast.success("Category updated successfully");
      } else {
        await createCategory(payload);
        toast.success("Category created successfully");
      }
      fetchCategories();
      closeCategoryModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save category");
    }
  };

  const openDeleteModal = (id) => setDeleteModal({ isOpen: true, id });
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, id: null });
  
  const confirmDelete = async () => {
    try {
      await deleteCategory(deleteModal.id);
      toast.success("Category deleted successfully");
      fetchCategories();
      closeDeleteModal();
    } catch (error) {
      toast.error("Failed to delete category");
    }
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
                setPagination(prev => ({ ...prev, page: 0 }));
              }}
              placeholder="Search category name..."
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => {
                setSearch('');
                setPagination(prev => ({ ...prev, page: 0 }));
              }}
              className="w-full px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-black uppercase tracking-widest rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Filter className="w-4 h-4" /> Clear Filter
            </button>
          </div>
        </FilterBar>

        {/* Data Table */}
        <div className="relative min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C4A4A]"></div>
            </div>
          )}

          <AdminTable columns={COLUMNS} minWidth="min-w-[1000px]" emptyMessage="No categories match your search.">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-[#faf8f7] transition-colors group">
                <td className="py-4 px-5">
                  {cat.imageUrl ? (
                    <img 
                      src={cat.imageUrl} 
                      alt={cat.nameEn} 
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 shadow-sm">
                      <ImageIcon size={20} />
                    </div>
                  )}
                </td>
                <td className="py-4 px-5 text-sm font-bold text-slate-800">
                  {cat.nameVi}
                </td>
                <td className="py-4 px-5 text-sm font-semibold text-gray-600">
                  {cat.nameEn}
                </td>
                <td className="py-4 px-5 text-sm text-gray-600 max-w-[200px]">
                  <p className="line-clamp-2" title={cat.descriptionVi}>
                    {cat.descriptionVi}
                  </p>
                </td>
                <td className="py-4 px-5 text-sm text-gray-600 max-w-[200px]">
                  <p className="line-clamp-2" title={cat.descriptionEn}>
                    {cat.descriptionEn}
                  </p>
                </td>
                <td className="py-4 px-5 text-sm font-semibold text-gray-500 whitespace-nowrap">
                  {formatDate(cat.createdAt)}
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
        </div>

        {/* Pagination */}
        <TablePagination
          currentPage={pagination.page + 1}
          totalPages={totalPages}
          totalItems={pagination.totalElements}
          itemsPerPage={pagination.size}
          onPageChange={(p) => setPagination(prev => ({ ...prev, page: p - 1 }))}
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
              name="nameVi" 
              defaultValue={categoryModal.data?.nameVi} 
              placeholder="e.g., Khám phá văn hóa"
              required 
            />
            <FormInput 
              label="Name (English)" 
              name="nameEn" 
              defaultValue={categoryModal.data?.nameEn} 
              placeholder="e.g., Cultural Exploration"
              required 
            />
          </div>
          
          <ImageUpload 
            label="Image URL" 
            name="imageUrl" 
            defaultValue={categoryModal.data?.imageUrl} 
          />

          <div className="space-y-4">
            <FormTextarea 
              label="Description (Vietnamese)" 
              name="descriptionVi" 
              defaultValue={categoryModal.data?.descriptionVi} 
              placeholder="Enter Vietnamese description..."
            />
            <FormTextarea 
              label="Description (English)" 
              name="descriptionEn" 
              defaultValue={categoryModal.data?.descriptionEn} 
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
