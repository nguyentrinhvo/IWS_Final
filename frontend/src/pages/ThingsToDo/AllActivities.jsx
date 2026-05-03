// src/pages/ThingsToDoPage/AllActivities.jsx
import React from 'react';

const AllActivities = ({ data }) => {
  return (
    <div className="all-activities-section">
      <h2>Tất cả hoạt động</h2>
      <div className="card-list">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>📂 {item.category}</p>
            <p>₫{item.price}K</p>
            {item.rating && <p>⭐ {item.rating}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllActivities;