import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ToursBookingPage from './ToursBookingPage';
import { getTours } from '../../services/tourService';

const ToursBooking = () => {
  const location = useLocation();
  const searchState = location.state || {};
  
  const [allTours, setAllTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State bộ lọc
  const [filters, setFilters] = useState({
    location: searchState.tourDestination || 'all',
    minPrice: 0,
    maxPrice: 20000000,
    minDuration: 0,
    maxDuration: 10,
    startDateFrom: '',
    startDateTo: ''
  });

  // Cập nhật filter nếu chuyển hướng từ thanh search
  useEffect(() => {
    if (searchState.tourDestination) {
      setFilters(prev => ({ ...prev, location: searchState.tourDestination }));
    }
  }, [searchState.tourDestination]);
  const [sortBy, setSortBy] = useState('price_asc');

  // 1. Lấy dữ liệu từ API
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const res = await getTours({ size: 100 }); // Lấy 100 tours để filter client-side tạm thời
        const tours = res.content || [];
        if (tours.length === 0) {
          setError('Không có dữ liệu tour');
        } else {
          setAllTours(tours);
          // Cập nhật khoảng giá động
          const prices = tours.map(t => t.priceAdult || 0);
          const minP = Math.min(...prices);
          const maxP = Math.max(...prices);
          setFilters(prev => ({ 
            ...prev, 
            minPrice: prev.minPrice === 0 ? minP : prev.minPrice, 
            maxPrice: prev.maxPrice === 20000000 ? maxP : prev.maxPrice 
          }));
        }
      } catch (err) {
        console.error('Fetch tours failed:', err);
        setError('Lỗi khi tải dữ liệu tour từ máy chủ');
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // 2. Hàm lọc (viết trực tiếp, không cần utils)
  const applyFilters = (tours, currentFilters) => {
    return tours.filter(tour => {
      // Địa điểm
      if (currentFilters.location !== 'all' && tour.destination !== currentFilters.location) return false;
      // Giá
      const price = tour.priceAdult || 0;
      if (price < currentFilters.minPrice || price > currentFilters.maxPrice) return false;
      // Số ngày
      const days = tour.durationDays || 0;
      if (days < currentFilters.minDuration || days > currentFilters.maxDuration) return false;
      // Ngày khởi hành
      if (currentFilters.startDateFrom || currentFilters.startDateTo) {
        const hasValid = tour.departures?.some(s => {
          if (!s.departureDate) return false;
          const depDate = new Date(s.departureDate).toISOString().split('T')[0];
          if (currentFilters.startDateFrom && depDate < currentFilters.startDateFrom) return false;
          if (currentFilters.startDateTo && depDate > currentFilters.startDateTo) return false;
          return true;
        });
        if (!hasValid) return false;
      }
      return true;
    });
  };

  // 3. Hàm sắp xếp
  const applySort = (tours, sortType) => {
    const sorted = [...tours];
    switch (sortType) {
      case 'price_asc': return sorted.sort((a,b) => (a.priceAdult || 0) - (b.priceAdult || 0));
      case 'price_desc': return sorted.sort((a,b) => (b.priceAdult || 0) - (a.priceAdult || 0));
      case 'rating_desc': return sorted.sort((a,b) => (b.avgRating || 0) - (a.avgRating || 0));
      case 'duration_asc': return sorted.sort((a,b) => (a.durationDays || 0) - (b.durationDays || 0));
      default: return sorted;
    }
  };

  // 4. Khi filters hoặc sortBy thay đổi → tính lại kết quả
  useEffect(() => {
    if (allTours.length === 0) return;
    let result = applyFilters(allTours, filters);
    result = applySort(result, sortBy);
    setFilteredTours(result);
  }, [filters, sortBy, allTours]);

  // Handlers
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  const handleSortChange = (newSort) => setSortBy(newSort);
  const handleRetry = () => window.location.reload();

  // Dữ liệu cho breadcrumb
  const breadcrumbData = {
    path: ['Trang chủ', 'Tour', 'Tìm kiếm'],
    current: 'Kết quả tìm kiếm'
  };

  // Danh sách địa điểm unique
  const uniqueLocations = ['all', ...new Set(allTours.map(t => t.destination).filter(Boolean))];
  // Khoảng giá thực tế
  const priceRange = {
    min: allTours.length ? Math.min(...allTours.map(t => t.priceAdult || 0)) : 0,
    max: allTours.length ? Math.max(...allTours.map(t => t.priceAdult || 0)) : 20000000
  };

  return (
    <ToursBookingPage
      tours={filteredTours}
      loading={loading}
      error={error}
      onRetry={handleRetry}
      filters={filters}
      onFilterChange={handleFilterChange}
      sortBy={sortBy}
      onSortChange={handleSortChange}
      locations={uniqueLocations}
      priceRange={priceRange}
      totalResults={filteredTours.length}
      breadcrumbData={breadcrumbData}
    />
  );
};

export default ToursBooking;