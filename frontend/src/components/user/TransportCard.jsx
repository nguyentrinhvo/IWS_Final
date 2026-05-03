import React from 'react';
import { useNavigate } from 'react-router-dom';

const TransportCard = ({ route }) => {
  const navigate = useNavigate();
  
  // Support both mock and real backend field names
  const id = route.id || route._id;
  const operatorName = route.operatorName || route.ten_nha_xe;
  const vehicleType = route.vehicleType || 'bus';
  const vehicleClass = route.vehicleClass || route.loai_phuong_tien;
  const departureCity = route.departureCity || route.diem_di;
  const arrivalCity = route.arrivalCity || route.diem_den;
  const departureTime = route.departureTime || route.gio_di;
  const arrivalTime = route.arrivalTime || route.gio_den;
  const price = route.price || route.gia || 0;
  const totalSeats = route.totalSeats || route.tong_so_ghe || 40;
  const availableSeats = route.availableSeats || route.so_ghe_con || 0;

  const formatVND = (price) => (price || 0).toLocaleString('vi-VN') + ' VND';

  const calculateDuration = (start, end) => {
    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);
    let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diff < 0) diff += 24 * 60;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md p-5 flex flex-col lg:flex-row lg:items-center gap-6">
      {/* Transport Info */}
      <div className="flex-shrink-0 flex items-center gap-4 lg:w-48">
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl">
          {vehicleClass.includes('Train') ? '🚆' : '🚌'}
        </div>
        <div>
          <p className="text-base font-bold text-gray-800 leading-tight">{operatorName}</p>
          <p className="text-xs text-gray-500 mt-1">{vehicleClass}</p>
        </div>
      </div>

      {/* Times & Route */}
      <div className="flex-1 flex items-center gap-4">
        {/* Departure */}
        <div className="text-center min-w-[70px]">
          <p className="text-xl font-bold text-[#1a2b49]">{departureTime}</p>
          <p className="text-xs font-semibold text-gray-500 mt-1">{departureCity}</p>
        </div>

        {/* Duration Line */}
        <div className="flex-1 flex flex-col items-center px-2">
          <p className="text-xs text-gray-500 font-medium mb-1">{calculateDuration(departureTime, arrivalTime)}</p>
          <div className="relative w-full flex items-center">
            <div className="h-px flex-1 bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full border-2 border-gray-300 mx-1"></div>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Direct</p>
        </div>

        {/* Arrival */}
        <div className="text-center min-w-[70px]">
          <p className="text-xl font-bold text-[#1a2b49]">{arrivalTime}</p>
          <p className="text-xs font-semibold text-gray-500 mt-1">{arrivalCity}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px h-12 bg-gray-100"></div>

      {/* Seats Info */}
      <div className="flex flex-col items-center justify-center min-w-[100px]">
        <p className="text-sm font-bold text-gray-700">{availableSeats} / {totalSeats}</p>
        <p className="text-[11px] text-gray-500">seats available</p>
      </div>

      {/* Price & CTA */}
      <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 lg:ml-auto">
        <div className="text-right">
          <p className="text-2xl font-bold text-orange-500 leading-tight">
            {formatVND(price)}
          </p>
          <p className="text-[11px] text-gray-500">per ticket</p>
        </div>
        <button 
          onClick={() => navigate(`/transport/detail/${id}`)}
          className="bg-[#CD6F1E] hover:bg-[#b8631b] text-white font-bold py-2.5 px-6 rounded-xl shadow-sm transition-colors whitespace-nowrap text-sm"
        >
          Select Seats
        </button>
      </div>
    </div>
  );
};

export default TransportCard;
