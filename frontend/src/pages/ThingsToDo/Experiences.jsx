// src/pages/ThingsToDoPage/Experiences.jsx
import React from 'react';

const Experiences = ({ data }) => {
  return (
    <div className="experiences-section">
      <h2>Trải nghiệm thú vị</h2>
      <div className="card-list">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p>⏱️ {item.duration}</p>
            <p>₫{item.price}K</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
