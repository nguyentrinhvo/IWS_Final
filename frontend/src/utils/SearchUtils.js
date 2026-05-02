/**
 * Trả về số ngày của một tháng nhất định
 * @param {number} year - Năm (vd: 2024)
 * @param {number} month - Tháng (0-11, vd: 0 cho tháng 1)
 */
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Trả về thứ của ngày đầu tiên trong tháng (0 = Chủ Nhật, 1 = Thứ Hai,...)
 * Sau đó chuyển đổi để thứ 2 là đầu tuần.
 * @param {number} year - Năm
 * @param {number} month - Tháng (0-11)
 */
export const getFirstDayOfMonth = (year, month) => {
  let day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Chủ nhật -> 6, thứ 2 -> 0, ...
};

/**
 * Lấy danh sách tên các ngày trong tuần (viết tắt) dựa theo locale
 * @param {string} locale - 'vi' hoặc 'en'
 */
export const getWeekDays = (locale = 'en') => {
  if (locale === 'vi') return ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
};

/**
 * Lấy tên tháng dựa trên Date object và locale
 * @param {Date} date - Đối tượng Date
 * @param {string} locale - 'vi' hoặc 'en'
 */
export const getMonthName = (date, locale = 'en') => {
  const year = date.getFullYear();
  if (locale === 'vi') {
    return `Tháng ${(date.getMonth() + 1).toString().padStart(2, '0')} ${year}`;
  }
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${year}`;
};

/**
 * Format Date object thành dạng chuỗi ngày tháng dựa theo locale
 * @param {Date} date - Đối tượng Date
 * @param {string} locale - 'vi' hoặc 'en'
 */
export const formatDate = (date, locale = 'en') => {
  if (!date) return '';
  const day = date.getDate();
  const year = date.getFullYear();
  if (locale === 'vi') {
    return `${day} thg ${date.getMonth() + 1} ${year}`;
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[date.getMonth()]} ${year}`;
};