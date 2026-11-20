import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { attractionService } from '../../services/attractionService';
import { useGlobal } from '../../context/GlobalContext';
import { useAuth } from '../../context/AuthContext';


const AttractionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useGlobal();
  const { isAuthenticated, setIsLoginModalOpen } = useAuth();


  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await attractionService.getAttractionById(id);
        setAttraction(data);
        if (data.ticketTypes && data.ticketTypes.length > 0) {
          setSelectedTicket(data.ticketTypes[0]);
        }
      } catch (err) {
        setError('Không thể tải thông tin hoạt động. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0;

  const PROCESS_STEPS = [
    {
      step: '01',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      titleVi: 'Chọn vé & số lượng',
      titleEn: 'Choose ticket & quantity',
      descVi: 'Chọn loại vé phù hợp và số lượng người tham gia.',
      descEn: 'Select the right ticket type and the number of participants.',
    },
    {
      step: '02',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      titleVi: 'Xác nhận ngày',
      titleEn: 'Confirm date',
      descVi: 'Chọn ngày tham quan phù hợp với lịch trình của bạn.',
      descEn: 'Choose a visit date that fits your schedule.',
    },
    {
      step: '03',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      titleVi: 'Thanh toán',
      titleEn: 'Payment',
      descVi: 'Thanh toán an toàn qua VNPay hoặc PayPal.',
      descEn: 'Pay securely via VNPay or PayPal.',
    },
    {
      step: '04',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      titleVi: 'Nhận vé điện tử',
      titleEn: 'Get e-ticket',
      descVi: 'Vé sẽ được gửi qua email. Xuất trình mã QR khi đến nơi.',
      descEn: 'Your ticket will be sent by email. Show the QR code on arrival.',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-14 h-14 border-4 border-[#007BFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !attraction) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500 text-lg">{error || 'Không tìm thấy hoạt động.'}</p>
        <button onClick={() => navigate('/things-to-do')} className="text-[#007BFF] hover:underline font-medium">
          ← Quay lại
        </button>
      </div>
    );
  }

  const name = language === 'VI' ? attraction.nameVi : (attraction.nameEn || attraction.nameVi);
  const description = language === 'VI' ? attraction.descriptionVi : (attraction.descriptionEn || attraction.descriptionVi);
  const images = attraction.images && attraction.images.length > 0
    ? attraction.images
    : [{ url: 'https://via.placeholder.com/800x500?text=No+Image', caption: name }];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/things-to-do')} className="hover:text-[#007BFF] transition-colors">
            {t('thingsToDo')}
          </button>
          <span>›</span>
          <span className="text-gray-800 font-medium truncate max-w-xs">{name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Images + Info ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="relative h-80 md:h-[420px] overflow-hidden">
                <img
                  src={images[activeImage]?.url}
                  alt={name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Type badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#007BFF] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {attraction.attractionType}
                </div>
                {attraction.avgRating && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {attraction.avgRating}
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#007BFF] scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Meta */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">{name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-[#007BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {attraction.location}
                </span>
                {attraction.openingHours?.monday && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {attraction.openingHours.monday}
                  </span>
                )}
              </div>
              {description && (
                <p className="text-gray-600 leading-relaxed">{description}</p>
              )}
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {language === 'VI' ? '🗺️ Quy trình đặt vé' : '🗺️ Booking Process'}
              </h2>
              <div className="relative">
                {/* Connector line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#007BFF] to-blue-100 hidden md:block" />
                <div className="space-y-6">
                  {PROCESS_STEPS.map((step, i) => (
                    <div key={i} className="flex gap-5 items-start">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#007BFF] to-blue-600 text-white flex items-center justify-center shadow-md z-10">
                        {step.icon}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#007BFF] bg-blue-50 px-2 py-0.5 rounded-full">BƯỚC {step.step}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-base">
                          {language === 'VI' ? step.titleVi : step.titleEn}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {language === 'VI' ? step.descVi : step.descEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            {attraction.openingHours && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {language === 'VI' ? '🕐 Giờ mở cửa' : '🕐 Opening Hours'}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].map(day => {
                    const dayNames = { monday: 'Thứ 2', tuesday: 'Thứ 3', wednesday: 'Thứ 4', thursday: 'Thứ 5', friday: 'Thứ 6', saturday: 'Thứ 7', sunday: 'Chủ nhật' };
                    const dayNamesEn = { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday' };
                    return (
                      <div key={day} className="bg-gray-50 rounded-xl p-3 text-center">
                        <div className="text-xs font-semibold text-gray-500 mb-1">{language === 'VI' ? dayNames[day] : dayNamesEn[day]}</div>
                        <div className="text-sm font-bold text-gray-800">{attraction.openingHours[day] || 'Đóng cửa'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Booking Card ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-[#007BFF] to-blue-600 px-6 py-4">
                <p className="text-white/80 text-sm">{language === 'VI' ? 'Giá từ' : 'Price from'}</p>
                <p className="text-white text-3xl font-extrabold">
                  {attraction.minPrice ? formatPrice(attraction.minPrice) : (attraction.ticketTypes?.[0]?.price ? formatPrice(attraction.ticketTypes[0].price) : 'Miễn phí')}
                </p>
              </div>

              <div className="p-5 space-y-4">
                {/* Ticket type selector */}
                {attraction.ticketTypes && attraction.ticketTypes.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'VI' ? 'Loại vé' : 'Ticket type'}
                    </label>
                    <div className="space-y-2">
                      {attraction.ticketTypes.map((ticket, i) => (
                        <label
                          key={i}
                          className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedTicket?.typeName === ticket.typeName ? 'border-[#007BFF] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="ticket"
                              className="accent-[#007BFF]"
                              checked={selectedTicket?.typeName === ticket.typeName}
                              onChange={() => setSelectedTicket(ticket)}
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{ticket.typeName}</p>
                              {ticket.description && <p className="text-xs text-gray-500">{ticket.description}</p>}
                            </div>
                          </div>
                          <span className="text-sm font-bold text-[#007BFF]">{formatPrice(ticket.price)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === 'VI' ? 'Số lượng' : 'Quantity'}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-[#007BFF] hover:text-[#007BFF] transition-all"
                    >−</button>
                    <span className="text-xl font-bold text-gray-900 w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 hover:border-[#007BFF] hover:text-[#007BFF] transition-all"
                    >+</button>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">{language === 'VI' ? 'Tổng cộng' : 'Total'}</span>
                    <span className="text-2xl font-extrabold text-red-500">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      setIsLoginModalOpen(true);
                    } else {
                      // TODO: navigate to booking page
                      alert(language === 'VI' ? 'Tính năng thanh toán đang được phát triển!' : 'Payment feature coming soon!');
                    }
                  }}
                  className="w-full bg-gradient-to-r from-[#007BFF] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl text-lg shadow-md hover:shadow-xl transition-all duration-300 active:scale-95"
                >
                  {language === 'VI' ? '🎟️ Đặt vé ngay' : '🎟️ Book Now'}
                </button>

                <p className="text-center text-xs text-gray-400">
                  {language === 'VI' ? 'Hủy miễn phí trước 24 giờ' : 'Free cancellation up to 24 hours'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AttractionDetail;
