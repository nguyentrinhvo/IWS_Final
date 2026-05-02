// // src/pages/ToursDetailPage/Tour.js
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ToursDetailPage from './ToursDetailPage';
// import { fetchTourDetail, fetchRelatedTours } from '../../services/tourService';


// export default function Tour() {
//   const { id } = useParams();
//   const [tourData, setTourData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const detail = await fetchTourDetail(id);
//       const related = await fetchRelatedTours(id);
//       setTourData({ ...detail, relatedTours: related });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) loadData();
//   }, [id]);

//   return (
//     <ToursDetailPage
//       data={tourData}
//       loading={loading}
//       error={error}
//       onRetry={loadData}
//       locale="vi"  
//     />
//   );
// }


// src/pages/ToursDetailPage/Tour.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ToursDetailPage from './ToursDetailPage';
import { mockData } from '../../data/mockData';

export default function Tour() {
  const { id } = useParams();
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); 
    setLoading(true);
    setError(null);
    
    try {
      // Luôn lấy tour có id = "TOUR001" từ mockData, bất kể id trên URL
      const foundTour = mockData.tours.find(tour => tour.id === 'TOUR001');
      
      if (!foundTour) {
        throw new Error('Không tìm thấy tour mẫu TOUR001');
      }
      
      // Nếu muốn lấy theo id thật từ URL, bỏ comment dòng dưới và comment dòng trên
      // const foundTour = mockData.tours.find(tour => tour.id === id);
      
      setTourData(foundTour);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]); // vẫn có thể theo dõi id nếu muốn, nhưng không dùng

  return (
    <ToursDetailPage
      data={tourData}
      loading={loading}
      error={error}
      onRetry={() => window.location.reload()}
      locale="vi"
    />
  );
}