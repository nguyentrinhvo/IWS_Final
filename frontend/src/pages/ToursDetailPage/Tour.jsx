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
        const dto = await getTourById(id);
        
        // Map backend DTO to frontend UI structure
        const mappedData = {
          id: dto.id,
          breadcrumb: {
            path: ['Trang chủ', 'Tour', dto.destination || 'Vietnam'],
            current: dto.nameVi
          },
          header: {
            title: dto.nameVi,
            rating: dto.avgRating || 4.8,
            reviewsCount: dto.totalReviews || 0,
            departure: dto.departureCity || 'Hà Nội',
            tourCode: dto.tourCode || `TOUR-${dto.id.substring(0, 5).toUpperCase()}`,
            images: dto.images?.map(img => img.url) || []
          },
          highlights: dto.highlights || [],
          itinerary: dto.itinerary?.map((item, idx) => ({
            day: idx + 1,
            description: item.activity || item.description
          })) || [],
          inclusions: dto.inclusions || ['Xe đưa đón', 'Khách sạn', 'Bữa ăn theo chương trình', 'Hướng dẫn viên'],
          exclusions: dto.exclusions || ['Chi phí cá nhân', 'Đồ uống trong bữa ăn'],
          terms: dto.terms || 'Hủy tour trước 7 ngày hoàn 100%, trước 3 ngày hoàn 50%, không hoàn trong ngày khởi hành.',
          bookNow: {
            price: dto.priceAdult,
            originalPrice: dto.priceAdult * 1.2,
            discount: '17%',
            availableDates: dto.departures?.map(d => d.departureDate) || []
          },
          reviews: {
            averageRating: dto.avgRating || 4.8,
            totalReviews: dto.totalReviews || 0,
            reviewList: dto.reviews || []
          },
          schedulePrice: {
            durations: [`${dto.durationDays} ngày ${dto.durationDays - 1} đêm`],
            prices: [dto.priceAdult],
            startDates: dto.departures?.map(d => d.departureDate) || []
          },
          // Additional field for TourSchedulePrice logic
          departureSchedules: dto.departures?.map((d, idx) => ({
            id: `sch-${idx}`,
            departure: d.departureDate,
            return: new Date(new Date(d.departureDate).getTime() + (dto.durationDays || 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            seats: d.availableSeats || 10,
            price: d.priceAdult || dto.priceAdult
          })) || []
        };

        setTourData(mappedData);
      } catch (err) {
        console.error('Fetch tour error:', err);
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
