import React, { useState, useEffect } from 'react';
import ToursBookingPage from './ToursBookingPage';
import { mockData } from '../../data/mockData';

const ToursBooking = () => {
  const [allTours, setAllTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State bộ lọc
  const [filters, setFilters] = useState({
    location: 'all',
    minPrice: 0,
    maxPrice: 20000000,
    minDuration: 0,
    maxDuration: 10,
    startDateFrom: '',
    startDateTo: ''
  });
  const [sortBy, setSortBy] = useState('price_asc');

  // 1. Lấy dữ liệu từ mockData (giống Tour.jsx)
  useEffect(() => {
    setLoading(true);
    try {
      const tours = mockData.tours || [];
      if (tours.length === 0) {
        setError('Không có dữ liệu tour');
      } else {
        setAllTours(tours);
        // Cập nhật khoảng giá động
        const minP = Math.min(...tours.map(t => t.price));
        const maxP = Math.max(...tours.map(t => t.price));
        setFilters(prev => ({ ...prev, minPrice: minP, maxPrice: maxP }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Hàm lọc (viết trực tiếp, không cần utils)
  const applyFilters = (tours, currentFilters) => {
    return tours.filter(tour => {
      // Địa điểm
      if (currentFilters.location !== 'all' && tour.location !== currentFilters.location) return false;
      // Giá
      if (tour.price < currentFilters.minPrice || tour.price > currentFilters.maxPrice) return false;
      // Số ngày
      const daysMatch = tour.duration?.match(/\d+/);
      const days = daysMatch ? parseInt(daysMatch[0], 10) : 0;
      if (days < currentFilters.minDuration || days > currentFilters.maxDuration) return false;
      // Ngày khởi hành
      if (currentFilters.startDateFrom || currentFilters.startDateTo) {
        const hasValid = tour.departureSchedules?.some(s => {
          if (!s.departure) return false;
          if (currentFilters.startDateFrom && s.departure < currentFilters.startDateFrom) return false;
          if (currentFilters.startDateTo && s.departure > currentFilters.startDateTo) return false;
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
      case 'price_asc': return sorted.sort((a,b) => a.price - b.price);
      case 'price_desc': return sorted.sort((a,b) => b.price - a.price);
      case 'rating_desc': return sorted.sort((a,b) => b.rating - a.rating);
      case 'duration_asc': {
        const getDays = (d) => parseInt((d.duration || '0').match(/\d+/)?.[0] || 0, 10);
        return sorted.sort((a,b) => getDays(a) - getDays(b));
      }
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
  const uniqueLocations = ['all', ...new Set(allTours.map(t => t.location).filter(Boolean))];
  // Khoảng giá thực tế
  const priceRange = {
    min: allTours.length ? Math.min(...allTours.map(t => t.price)) : 0,
    max: allTours.length ? Math.max(...allTours.map(t => t.price)) : 20000000
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