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
import { getTourById } from '../../services/tourService';

export default function Tour() {
  const { id } = useParams();
  const [tourData, setTourData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); 
    setLoading(true);
    setError(null);
    
    const fetchTour = async () => {
      try {
        const data = await getTourById(id);
        setTourData(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching tour');
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

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