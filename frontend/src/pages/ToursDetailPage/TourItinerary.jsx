import React, { useState } from 'react';

const TourItinerary = ({ data = [] }) => {
  const [expandedDays, setExpandedDays] = useState([]);

  if (!data || data.length === 0) return null;

  const isAllExpanded = expandedDays.length === data.length;

  const handleToggleAll = () => {
    if (isAllExpanded) {
      setExpandedDays([]);
    } else {
      setExpandedDays(data.map((item) => item.day));
    }
  };

  const handleToggleDay = (day) => {
    if (expandedDays.includes(day)) {
      setExpandedDays(expandedDays.filter((d) => d !== day));
    } else {
      setExpandedDays([...expandedDays, day]);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <style>
        {`
          .itinerary-row {
            border-bottom: 1px solid #E5E7EB;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          .itinerary-row:last-child {
            border-bottom: none;
          }
          .itinerary-header {
            display: flex;
            align-items: center;
            padding: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            background-color: transparent;
          }
          .itinerary-header.expanded {
            background-color: #F3F4F6;
            border-radius: 8px 8px 0 0;
          }
          .itinerary-image-wrapper {
            width: 60px;
            height: 60px;
            margin-right: 16px;
            border-radius: 8px;
            overflow: hidden;
            flex-shrink: 0;
            transition: all 0.4s ease-in-out;
            opacity: 1;
            transform: translateX(0);
          }
          .itinerary-header.expanded .itinerary-image-wrapper {
            width: 0;
            margin-right: 0;
            opacity: 0;
            transform: translateX(-20px);
          }
          .itinerary-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .itinerary-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transition: all 0.4s ease-in-out;
          }
          .itinerary-day {
            color: #2563EB;
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 4px;
          }
          .itinerary-activity {
            color: #111827;
            font-weight: 500;
            font-size: 16px;
          }
          .itinerary-icon {
            flex-shrink: 0;
            margin-left: 16px;
            transition: transform 0.3s ease;
            color: #6B7280;
          }
          .itinerary-header.expanded .itinerary-icon {
            transform: rotate(180deg);
          }
          .itinerary-detail-wrapper {
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.4s ease-in-out;
            background-color: #F9FAFB;
          }
          .itinerary-detail-wrapper.expanded {
            grid-template-rows: 1fr;
          }
          .itinerary-detail-inner {
            overflow: hidden;
          }
          .itinerary-detail-content {
            padding: 16px;
            border-top: 1px dashed #D1D5DB;
            color: #4B5563;
            font-size: 15px;
            line-height: 1.6;
          }
        `}
      </style>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#180B51',
            margin: 0,
          }}
        >
          Tour Itinerary
        </h2>
        <button
          onClick={handleToggleAll}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563EB',
            fontWeight: '600',
            fontSize: '15px',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {isAllExpanded ? 'Collapse' : 'See all'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {data.map((item, index) => {
          const isExpanded = expandedDays.includes(item.day);
          const mockImage = `https://picsum.photos/seed/day${item.day}/150/150`;
          const activityTitle = item.title || `Schedule of Day ${item.day}`;

          return (
            <div key={item.day || index} className="itinerary-row">
              <div
                className={`itinerary-header ${isExpanded ? 'expanded' : ''}`}
                onClick={() => handleToggleDay(item.day)}
              >
                <div className="itinerary-image-wrapper">
                  <img
                    src={item.image || mockImage}
                    alt={`Day ${item.day}`}
                    className="itinerary-image"
                  />
                </div>
                <div className="itinerary-info">
                  <span className="itinerary-day">Day {item.day}</span>
                  <span className="itinerary-activity">{activityTitle}</span>
                </div>
                <div className="itinerary-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              <div
                className={`itinerary-detail-wrapper ${
                  isExpanded ? 'expanded' : ''
                }`}
              >
                <div className="itinerary-detail-inner">
                  <div className="itinerary-detail-content">
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TourItinerary;