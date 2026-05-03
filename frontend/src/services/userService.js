import api from './api';

/** Lấy thông tin profile của user đang đăng nhập */
export const getMyProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

/** Cập nhật profile user đang đăng nhập */
export const updateMyProfile = async (data) => {
  const response = await api.put('/users/me', data);
  return response.data;
};

/** Đổi mật khẩu */
export const changePassword = async (oldPassword, newPassword) => {
  const response = await api.put('/users/me/password', { oldPassword, newPassword });
  return response.data;
};

// ── Admin endpoints ──────────────────────────────────────────

/** [Admin] Lấy danh sách tất cả users */
export const getAllUsers = async (keyword = '', page = 0, size = 10) => {
  const response = await api.get('/admin/users', {
    params: { keyword, page, size },
  });
  return response.data;
};

/** [Admin] Khóa / Mở khóa user */
export const toggleLockUser = async (id) => {
  const response = await api.put(`/admin/users/${id}/lock`);
  return response.data;
};
