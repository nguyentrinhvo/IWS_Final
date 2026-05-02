import React from 'react';

const TourHighlights = ({ data = {} }) => {
  // Xử lý dữ liệu linh hoạt: nếu data là mảng thì dùng luôn, nếu là object có items thì lấy items
  let items = [];
  if (Array.isArray(data)) {
    items = data;
  } else if (data && Array.isArray(data.items)) {
    items = data.items;
  }

  if (!items || items.length === 0) return null;

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      height: 'max-content',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#180B51',
        margin: '0 0 20px 0'
      }}>
        Tour Highlights
      </h2>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px' 
      }}>
        {items.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '12px' 
          }}>
            <svg 
              width="24px" 
              height="24px" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg" 
              style={{ flexShrink: 0, marginTop: '2px' }}
            >
              <polyline 
                points="21 5 12 14 8 10" 
                style={{ fill: "none", stroke: "#007BFF", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }}
              />
              <path 
                d="M20.94,11A8.26,8.26,0,0,1,21,12a9,9,0,1,1-9-9,8.83,8.83,0,0,1,4,1" 
                style={{ fill: "none", stroke: "#007BFF", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }}
              />
            </svg>
            <span style={{ 
              fontSize: '16px', 
              color: '#333333', 
              lineHeight: '1.6', 
              flex: 1, 
              wordWrap: 'break-word',
              whiteSpace: 'normal'
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourHighlights;