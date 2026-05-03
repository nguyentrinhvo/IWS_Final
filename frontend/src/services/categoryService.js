import api from './api';

/** Lấy danh sách categories */
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

/** [Admin] Tạo category */
export const createCategory = async (data) => {
  const response = await api.post('/admin/categories', data);
  return response.data;
};

/** [Admin] Cập nhật category */
export const updateCategory = async (id, data) => {
  const response = await api.put(`/admin/categories/${id}`, data);
  return response.data;
};

/** [Admin] Xóa category */
export const deleteCategory = async (id) => {
  const response = await api.delete(`/admin/categories/${id}`);
  return response.data;
};
