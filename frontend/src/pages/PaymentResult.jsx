import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../layouts/UserLayout/Navbar';
import Footer from '../layouts/UserLayout/Footer';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const status = searchParams.get('status');
  const bookingId = searchParams.get('bookingId');
  const gateway = searchParams.get('gateway');
  const code = searchParams.get('code');

  useEffect(() => {
    // Giả lập loading nhẹ để user cảm thấy đang xử lý kết quả
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Đang xử lý kết quả thanh toán...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center border border-gray-100">
          {isSuccess ? (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h1>
              <p className="text-gray-600 mb-8 text-lg">
                Cảm ơn bạn đã tin tưởng dịch vụ của Hanuvivu. Mã đơn hàng của bạn là <span className="font-bold text-blue-600">#{bookingId}</span>.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to="/profile/bookings"
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
                >
                  Xem đơn hàng của tôi
                </Link>
                <Link
                  to="/"
                  className="w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Về trang chủ
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán thất bại</h1>
              <p className="text-gray-600 mb-8 text-lg">
                Rất tiếc, giao dịch của bạn không thành công {code && `(Mã lỗi: ${code})`}. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
                >
                  Thử lại
                </button>
                <Link
                  to="/"
                  className="w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Quay lại trang chủ
                </Link>
              </div>
            </>
          )}
        </div>

        {isSuccess && (
          <div className="mt-8 text-center text-gray-500 max-w-sm px-4">
            Một email xác nhận kèm thông tin chi tiết tour đã được gửi tới địa chỉ email của bạn.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PaymentResult;
