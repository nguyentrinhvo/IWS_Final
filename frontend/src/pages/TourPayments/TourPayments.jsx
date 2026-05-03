import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/UserLayout/Navbar';
import TourPaymentOptions from './TourPaymentOptions';
import TourSummaries from './TourSummaries';
import { PAYMENT_METHODS, getMockBookingSummary } from '../../data/mockData';
import { createVnPayPayment, createPayPalPayment } from '../../services/paymentService';

const TourPayments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state && location.state.booking) {
      setBookingData(location.state.booking);
    } else {
      const defaultBooking = getMockBookingSummary('TOUR001', 'schedule-1');
      setBookingData(defaultBooking);
    }
  }, [location.state]);

  useEffect(() => {
    if (PAYMENT_METHODS.length > 0 && !selectedMethod) {
      setSelectedMethod(PAYMENT_METHODS[0]);
    }
  }, [selectedMethod]);

  const handlePaymentSubmit = async () => {
    if (!selectedMethod) {
      setError('Vui lòng chọn phương thức thanh toán');
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    try {
      let response;
      const id = bookingData.id || location.state?.bookingId;

      if (selectedMethod.id === 'paypal') {
        response = await createPayPalPayment(id);
      } else {
        response = await createVnPayPayment(id);
      }

      if (response.paymentUrl) {
          window.location.href = response.paymentUrl;
      } else {
          setError("Không thể khởi tạo thanh toán");
      }
    } catch (err) {
      console.error(err);
      setError('Thanh toán thất bại, vui lòng thử lại sau');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-gray-500">Đang tải thông tin đặt chỗ...</div>
        </div>
      </>
    );
  }

  const { totalPrice, passengers, tour, schedule } = bookingData;

  return (
    <>
      <Navbar />
      <div className="max-w-[1080px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          <div className="flex-1 w-full">
            <TourPaymentOptions
              paymentMethods={PAYMENT_METHODS}
              selectedMethod={selectedMethod}
              onSelectMethod={setSelectedMethod}
              totalAmount={totalPrice}
              onSubmit={handlePaymentSubmit}
              isProcessing={isProcessing}
              error={error}
            />
          </div>

          <div className="w-full lg:w-[340px] flex-shrink-0">
            <TourSummaries
              tour={tour}
              schedule={schedule}
              passengers={passengers}
              totalPrice={totalPrice}
              unitPrice={schedule?.price || tour.price}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TourPayments;