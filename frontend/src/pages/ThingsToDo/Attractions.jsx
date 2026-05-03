// src/pages/ThingsToDoPage/Attractions.jsx
import React from 'react';

const Attractions = ({ data }) => {
  return (
    <div className="attractions-section">
      <h2>Điểm tham quan nổi bật</h2>
      <div className="card-list">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>⭐ {item.rating || 'Chưa có đánh giá'}</p>
            <p>{item.price === 0 ? 'Miễn phí' : `₫${item.price}K`}</p>
            {item.location && <p>📍 {item.location}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attractions;
