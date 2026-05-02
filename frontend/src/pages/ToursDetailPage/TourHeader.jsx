// TourHeader.jsx
import React, { useState } from 'react';

const TourHeader = ({ data = {} }) => {
  const {
    title = '',
    rating = 0,
    reviewsCount = 0,
    departure = '',
    tourCode = '',
    images = []
  } = data;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animDirection, setAnimDirection] = useState('');

  const openPopup = (index) => {
    setCurrentIndex(index);
    setAnimDirection('');
    setIsPopupOpen(true);
  };

  const closePopup = (e) => {
    if (e.target.id === 'popup-overlay' || e.target.id === 'popup-close') {
      setIsPopupOpen(false);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setAnimDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setAnimDirection('right');
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('tour-reviews');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderThumbnails = () => {
    const thumbs = [];
    const total = images.length;
    if (total <= 1) return thumbs;

    const maxThumbs = Math.min(6, total - 1);
    for (let i = 1; i <= maxThumbs; i++) {
      const thumbIndex = (currentIndex + i) % total;
      thumbs.push(
        <img
          key={`thumb-${thumbIndex}`}
          src={images[thumbIndex]}
          alt={`Thumbnail ${thumbIndex}`}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex(thumbIndex);
          }}
          style={{
            height: '70px',
            flex: '1',
            objectFit: 'cover',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        />
      );
    }
    return thumbs;
  };

  return (
    <div className="tour-header-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', textAlign: 'left' }}>
      <style>{`
        .tour-header-popup {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background-color: rgba(0, 0, 0, 0.85);
          z-index: 1000; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .tour-header-popup.open {
          opacity: 1; visibility: visible;
        }
        .popup-content {
          position: relative; width: 90%; max-width: 920px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .main-image-wrapper {
          width: 100%; height: 520px; max-height: 60vh;
          position: relative; display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .main-image-slide {
          max-width: 100%; max-height: 100%; object-fit: contain;
          animation-duration: 0.4s; animation-fill-mode: forwards;
        }
        @keyframes slideRightAnim {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideLeftAnim {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .slide-right { animation-name: slideRightAnim; }
        .slide-left { animation-name: slideLeftAnim; }
        .nav-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.5); color: #fff; border: none;
          border-radius: 50%; width: 40px; height: 40px; font-size: 20px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          z-index: 10;
        }
        .nav-btn:hover { background: rgba(0,0,0,0.8); }
        .nav-btn-left { left: 10px; }
        .nav-btn-right { right: 10px; }
        .close-btn {
          position: absolute; top: -30px; right: 0;
          background: transparent; color: #fff; border: none;
          font-size: 24px; cursor: pointer;
        }

        /* Responsive image grid */
        .tour-header-images {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(2, 220px);
          gap: 15px;
          margin-top: 10px;
        }
        .tour-header-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 20px;
          font-size: 14px;
          color: #000;
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .tour-header-images {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .tour-header-images .main-image {
            width: 100%;
            height: auto;
            max-height: 350px;
            object-fit: cover;
            border-radius: 8px;
          }
          .tour-header-images .thumbnails-row {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .tour-header-images .thumbnails-row img {
            flex: 1 1 calc(25% - 8px);
            min-width: 80px;
            height: 100px;
            object-fit: cover;
            border-radius: 6px;
            cursor: pointer;
          }
          .tour-header-info {
            gap: 15px;
            font-size: 12px;
          }
        }
        @media (max-width: 767px) {
          .tour-header-images {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .tour-header-images .main-image {
            width: 100%;
            height: auto;
            max-height: 280px;
            object-fit: cover;
            border-radius: 8px;
          }
          .tour-header-images .thumbnails-row {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .tour-header-images .thumbnails-row img {
            flex: 1 1 calc(25% - 6px);
            min-width: 70px;
            height: 80px;
            object-fit: cover;
            border-radius: 6px;
            cursor: pointer;
          }
          .tour-header-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            font-size: 13px;
          }
          h1.tour-title {
            font-size: 1.6rem !important;
          }
        }
      `}</style>

      <h1 className="tour-title" style={{ fontSize: '2rem', color: '#180B51', margin: 0, wordWrap: 'break-word', whiteSpace: 'normal', fontWeight: 'bold' }}>
        {title}
      </h1>

      <div className="tour-header-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontWeight: 'bold' }}>{rating}/5</span>
          <span>({reviewsCount} reviews)</span>
          <svg onClick={scrollToReviews} style={{ cursor: 'pointer' }} fill="#007BFF" width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.125 16.313l7.688-7.688 3.594 3.719-11.094 11.063-11.313-11.313 3.5-3.531z"></path>
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <svg fill="#007BFF" width="16px" height="16px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.198 2.059c0.326 0 0.555 0.061 0.675 0.107 0.143 0.382 0.336 1.751-1.079 3.167l-7.218 7.218 0.052 0.896c0.11 1.874 0.313 5.232 0.488 8.111 0.154 2.563 0.301 4.983 0.311 5.189 0.005 0.142 0.007 0.175-0.125 0.334-0.295 0.358-0.846 0.966-1.309 1.47-0.72-1.939-2.232-6.033-3.067-8.325l-1.073-2.949-2.22 2.22-4.082 3.924-0.569 0.567-0.018 0.802c-0.014 0.64-0.011 1.79-0.009 2.803 0.002 0.706 0.004 1.348-0.001 1.701-0.009 0.017 0.136 0.036 0.123 0.059-0.087-0.14-0.181-0.29-0.28-0.447-0.823-1.313-1.962-3.128-2.309-3.695l-0.254-0.415-0.417-0.252c-1.516-0.916-3.196-1.973-4.221-2.634 0.035-0.020 0.064 0.088 0.088 0.075h0.067c0.323 0 0.856 0.007 1.453 0.015 0.782 0.011 1.668 0.023 2.346 0.023 0.26 0 0.491-0.002 0.677-0.006l0.803-0.018 0.568-0.567 3.929-4.053 2.212-2.211-2.935-1.080c-2.206-0.812-6.431-2.389-8.408-3.132 0.507-0.467 1.118-1.021 1.474-1.317 0.099-0.082 0.177-0.124 0.231-0.124l0.071 0.002c0.221 0.011 2.959 0.189 5.606 0.363 2.81 0.184 5.982 0.39 7.786 0.505l0.901 0.056 7.22-7.22c1.014-1.013 2.010-1.164 2.514-1.164zM29.198 0.060c-1.181 0-2.632 0.454-3.927 1.75l-6.581 6.581c-3.707-0.235-13.201-0.862-13.437-0.869-0.042-0.002-0.094-0.004-0.152-0.004-0.321 0-0.874 0.061-1.504 0.582-0.74 0.611-2.281 2.062-2.281 2.062-0.372 0.373-0.56 0.835-0.515 1.27 0.027 0.262 0.17 0.741 0.814 0.993 0.392 0.153 6.622 2.485 9.499 3.543l-3.929 4.053c-0.174 0.004-0.39 0.006-0.633 0.006-1.198 0-3.055-0.039-3.8-0.039-0.099 0-0.178 0-0.234 0.002-0.227 0.007-0.696-0.105-1.933 0.929l-0.088 0.082c-0.371 0.371-0.458 0.741-0.466 0.986-0.008 0.252 0.059 0.615 0.424 0.907 0.219 0.177 3.026 1.974 5.329 3.365 0.552 0.901 3.092 4.938 3.225 5.157 0.194 0.327 0.51 0.514 0.889 0.525h0.031c0.368 0 0.746-0.183 1.116-0.542 1.047-1.224 0.902-1.731 0.907-1.945 0.017-0.668-0.011-3.498 0.012-4.62l4.081-3.925c1.043 2.865 3.323 9.031 3.476 9.424 0.254 0.645 0.733 0.786 0.995 0.813 0.043 0.005 0.087 0.007 0.13 0.007 0.395 0 0.803-0.186 1.139-0.52 0 0 1.445-1.534 2.059-2.28s0.591-1.383 0.579-1.683c-0.005-0.208-0.584-9.651-0.799-13.338l6.583-6.583c2.333-2.334 1.962-5.146 1.096-6.011-0.383-0.385-1.157-0.675-2.103-0.675z"></path>
          </svg>
          <span>Departure from: {departure}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 14V12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4" stroke="#007BFF" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M7 4V2.5" stroke="#007BFF" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M17 4V2.5" stroke="#007BFF" strokeWidth="1.5" strokeLinecap="round"></path>
            <circle cx="18" cy="18" r="3" stroke="#007BFF" strokeWidth="1.5"></circle>
            <path d="M20.5 20.5L22 22" stroke="#007BFF" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M21.5 9H16.625H10.75M2 9H5.875" stroke="#007BFF" strokeWidth="1.5" strokeLinecap="round"></path>
          </svg>
          <span>Tour Code: <strong style={{ fontWeight: 'bold' }}>{tourCode}</strong></span>
        </div>
      </div>

      {images.length > 0 && (
        <div className="tour-header-images">
          {images.slice(0, 5).map((imgUrl, index) => {
            const isFirst = index === 0;
            if (index === 4) {
              return (
                <div
                  key={`grid-img-${index}`}
                  className="main-image"
                  style={{
                    position: 'relative',
                    width: '100%',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                  onClick={() => openPopup(index)}
                >
                  <img
                    src={imgUrl}
                    alt={`Tour ${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(96, 96, 96, 0.85)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      borderRadius: '8px'
                    }}
                  >
                    View all images
                  </div>
                </div>
              );
            }
            if (isFirst) {
              return (
                <img
                  key={`grid-img-${index}`}
                  src={imgUrl}
                  alt={`Tour ${index}`}
                  onClick={() => openPopup(index)}
                  className="main-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    gridColumn: '1 / 4',
                    gridRow: '1 / 3'
                  }}
                />
              );
            }
            return (
              <img
                key={`grid-img-${index}`}
                src={imgUrl}
                alt={`Tour ${index}`}
                onClick={() => openPopup(index)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  borderRadius: '8px'
                }}
              />
            );
          })}
        </div>
      )}

      <div id="popup-overlay" className={`tour-header-popup ${isPopupOpen ? 'open' : ''}`} onClick={closePopup}>
        <div className="popup-content">
          <button id="popup-close" className="close-btn" onClick={closePopup}>X</button>
          
          <div className="main-image-wrapper">
            <button className="nav-btn nav-btn-left" onClick={handlePrev}>&#10094;</button>
            <img
              key={`main-slide-${currentIndex}`}
              src={images[currentIndex]}
              alt="Main popup view"
              className={`main-image-slide ${animDirection === 'right' ? 'slide-right' : animDirection === 'left' ? 'slide-left' : ''}`}
            />
            <button className="nav-btn nav-btn-right" onClick={handleNext}>&#10095;</button>
          </div>

          <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'flex-start', overflow: 'hidden' }}>
            {renderThumbnails()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourHeader;