import React from 'react';
import { Link } from 'react-router-dom';

const TourBreadcrumb = ({ data }) => {
  // Gộp mảng path và current từ data.breadcrumb lại thành 1 mảng duy nhất
  // Ví dụ: ["Trang chủ", "Tour", "Miền Trung", "Đà Nẵng", "Tour Đà Nẵng 3 ngày"]
  let items = [];
  if (data?.path && Array.isArray(data.path)) {
    items = [...data.path];
    if (data.current) items.push(data.current);
  } else if (Array.isArray(data)) {
    items = data;
  } else {
    // Giá trị mặc định dự phòng
    items = ["Homepage", "VietNam", "Tour Đà Nẵng - Hội An - Bà Nà Hills 3 ngày 2 đêm"];
  }

  // Hàm tạo URL path động tương ứng với mỗi tên phần
  const getRoutePath = (item, index) => {
    // Phần tử đầu tiên (Trang chủ / Homepage) luôn nhảy về '/'
    if (index === 0 || item === 'Homepage' || item === 'Trang chủ') return '/';
    
    // Convert các cấp tiếp theo thành dạng url thật (ví dụ: 'Việt Nam' -> '/viet-nam')
    return `/${item
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
      .replace(/\s+/g, '-')}`; // Đổi khoảng trắng thành dấu gạch ngang
  };

  return (
    <nav style={{ 
      display: 'flex', 
      alignItems: 'center', 
      fontSize: '14px', // Kích thước chữ nhỏ thôi theo yêu cầu
      color: '#6B7280', 
      flexWrap: 'wrap', 
      gap: '8px' 
    }}>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const routePath = getRoutePath(item, index);

        return (
          <React.Fragment key={index}>
            <Link
              to={routePath}
              style={{
                color: isFirst ? '#2563EB' : isLast ? '#111827' : '#6B7280', // Chữ Homepage màu xanh dương, current thì màu đen
                fontWeight: isLast ? '600' : '400', // Highlight item cuối cùng
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => { if (!isLast) e.target.style.color = '#2563EB'; }}
              onMouseLeave={(e) => { 
                if (!isLast) e.target.style.color = isFirst ? '#2563EB' : '#6B7280'; 
              }}
            >
              {isFirst && (
                <svg 
                  fill="#2563EB" // Icon màu xanh dương
                  width="16px"   // Thu nhỏ kích thước lại cho hợp với text
                  height="16px" 
                  viewBox="-4.5 0 32 32" 
                  version="1.1" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: '6px' }}
                >
                  <g strokeWidth="0"></g>
                  <g strokeLinecap="round" strokeLinejoin="round"></g>
                  <g>
                    <title>home</title>
                    <path d="M19.469 12.594l3.625 3.313c0.438 0.406 0.313 0.719-0.281 0.719h-2.719v8.656c0 0.594-0.5 1.125-1.094 1.125h-4.719v-6.063c0-0.594-0.531-1.125-1.125-1.125h-2.969c-0.594 0-1.125 0.531-1.125 1.125v6.063h-4.719c-0.594 0-1.125-0.531-1.125-1.125v-8.656h-2.688c-0.594 0-0.719-0.313-0.281-0.719l10.594-9.625c0.438-0.406 1.188-0.406 1.656 0l2.406 2.156v-1.719c0-0.594 0.531-1.125 1.125-1.125h2.344c0.594 0 1.094 0.531 1.094 1.125v5.875z"></path>
                  </g>
                </svg>
              )}
              {item}
            </Link>

            {/* Dấu gạch chéo ngăn cách (trừ phần tử cuối cùng) */}
            {!isLast && (
              <span style={{ color: '#9CA3AF', margin: '0 4px', fontSize: '12px' }}>/</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default TourBreadcrumb;