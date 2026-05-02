import React from 'react';

const TourReviews = ({ data, tourTitle = "" }) => {
  if (!data || !data.reviewList) return null;

  const displayReviews = data.reviewList.slice(0, 5);

  return (
    <div
      id="tour-reviews"
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
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#180B51',
          margin: 0,
          wordWrap: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        Customer reviews of {tourTitle}
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151' }}>
          {data.averageRating}/5
        </span>
        <span style={{ color: '#6B7280', fontSize: '1rem' }}>
          {data.totalReviews} reviews
        </span>
      </div>

      <div style={{ marginTop: '32px' }}>
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#180B51',
            margin: 0,
            marginBottom: '16px'
          }}
        >
          Recent reviews
        </h3>

        <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 16px 24px 16px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {displayReviews.map((review, index) => (
            <div key={index} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ width: '140px', flexShrink: 0, fontWeight: '600', color: '#111827' }}>
                {review.user}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#F59E0B', fontWeight: 'bold' }}>
                    {review.rating} 
                    <svg style={{ marginLeft: '4px' }} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>
                    {review.date}
                  </span>
                </div>
                
                {review.comment && (
                  <div style={{ color: '#4B5563', lineHeight: '1.6', wordWrap: 'break-word' }}>
                    {review.comment}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourReviews;