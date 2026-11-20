import React, { useState } from 'react';

const TourExclusions = ({ data = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data || data.length === 0) return null;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
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
      <div
        onClick={handleToggle}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: 'transparent',
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
          Tour Price Does Not Include
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6B7280',
            transition: 'transform 0.4s ease-in-out',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg
            width="24"
            height="24"
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
        style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.4s ease-in-out',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              paddingTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '16px',
                  color: '#4B5563',
                  lineHeight: '1.6',
                }}
              >
                <span style={{ flexShrink: 0 }}>-</span>
                <span
                  style={{
                    wordWrap: 'break-word',
                    whiteSpace: 'normal',
                    flex: 1,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourExclusions;
