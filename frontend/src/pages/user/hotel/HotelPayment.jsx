import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingStepper from '../../../components/user/BookingStepper';
import BookingSummary from '../../../components/user/BookingSummary';
import PaymentMethodSelector from '../../../components/user/PaymentMethodSelector';
import ContactForm from '../../../components/user/ContactForm';
import { createHotelBooking } from '../../../services/bookingService';
import { createVnPayPayment, createPayPalPayment } from '../../../services/paymentService';

const HotelPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Data from HotelBooking step
  const { hotel, room, stayInfo, guest, checkIn, checkOut, guests } = location.state || {};

  // Helper to parse guests string
  const parsedGuests = (() => {
    if (!guests) return { adults: 2, children: 0, rooms: 1 };
    const adults = parseInt(guests.match(/(\d+)\s*Adult/i)?.[1]) || 2;
    const children = parseInt(guests.match(/(\d+)\s*Child/i)?.[1]) || 0;
    const rooms = parseInt(guests.match(/(\d+)\s*Room/i)?.[1]) || 1;
    return { adults, children, rooms };
  })();

  const [selectedMethod, setSelectedMethod] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contactData, setContactData] = useState({
    fullName: guest?.fullName || '',
    email: guest?.email || '',
    phone: guest?.phone || '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!hotel || !room) {
      navigate('/hotels');
    }
  }, [hotel, room, navigate]);

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }
    if (!isAgreed) {
      alert('Please agree to the Terms and Conditions');
      return;
    }
    if (!contactData.fullName || !contactData.email || !contactData.phone) {
      alert('Please fill in all contact information');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create booking in backend
      const bookingPayload = {
        serviceId: hotel.id,
        numAdults: parsedGuests.adults,
        numChildren: parsedGuests.children,
        quantity: parsedGuests.rooms, // Number of rooms
        checkInDate: checkIn ? new Date(checkIn) : new Date(),
        checkOutDate: checkOut ? new Date(checkOut) : new Date(Date.now() + 86400000),
        roomTypeName: room.name,
        paymentProvider: selectedMethod?.id || selectedMethod,
        note: `Contact: ${contactData.fullName}, ${contactData.email}, ${contactData.phone}. Requests: ${guest?.specialRequests || 'None'}`,
      };

      const booking = await createHotelBooking(bookingPayload);

      // 2. Initiate payment
      if (selectedMethod?.id === 'vnpay' || selectedMethod === 'vnpay') {
        const vnpayData = await createVnPayPayment(booking.id);
        if (vnpayData?.paymentUrl) {
          window.location.href = vnpayData.paymentUrl;
          return;
        }
      } else if (selectedMethod?.id === 'paypal' || selectedMethod === 'paypal') {
        const paypalData = await createPayPalPayment(booking.id);
        if (paypalData?.paymentUrl || paypalData?.approvalUrl) {
          window.location.href = paypalData.paymentUrl || paypalData.approvalUrl;
          return;
        }
      }

      // Fallback: navigate to success with booking data
      navigate('/hotels/success', {
        state: { booking, hotel, room, stayInfo, guest: contactData }
      });
    } catch (err) {
      console.error('Booking/payment error:', err);
      const errorMsg = err?.response?.data?.message || err?.response?.data?.error || 'Đặt phòng thất bại. Vui lòng thử lại.';
      alert(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!hotel || !room) return null;

  const nights = stayInfo?.nights || 1;

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <BookingStepper currentStep={4} mode="hotel" />

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content Area */}
          <div className="flex-1">
            <PaymentMethodSelector
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
            />

            <ContactForm
              data={contactData}
              onChange={(field, val) => setContactData(prev => ({ ...prev, [field]: val }))}
              errors={{}}
            />

            {/* Terms & Conditions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#7978E9] focus:ring-[#7978E9]"
                />
                <span className="text-sm text-gray-600 leading-relaxed">
                  I have read and agree to the <span className="text-[#7978E9] font-bold hover:underline">Terms & Conditions</span> and <span className="text-[#7978E9] font-bold hover:underline">Privacy Policy</span> of HanuVivu. I understand that the booking is subject to the hotel's cancellation policy.
                </span>
              </label>
            </div>

            {/* Desktop Action */}
            <div className="hidden lg:block">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-4 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${
                  isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#CD6F1E] hover:bg-[#b8631b] text-white'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Securely Pay Now
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-[380px]">
            <BookingSummary
              mode="hotel"
              data={hotel}
              subData={{ ...room, name: room.name, price: room.price * nights }}
              stayInfo={stayInfo}
              onContinue={handlePayment}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HotelPayment;
