// src/pages/ThingsToDoPage/Essentials.jsx
import React from 'react';

const Essentials = ({ data }) => {
  return (
    <div className="essentials-section">
      <h2>Tiện ích cần thiết</h2>
      <div className="card-list">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>₫{item.price}K</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Essentials;