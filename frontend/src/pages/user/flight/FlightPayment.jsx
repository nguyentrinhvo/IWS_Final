import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingStepper from '../../../components/user/BookingStepper';
import BookingSummary from '../../../components/user/BookingSummary';
import ContactForm from '../../../components/user/ContactForm';
import PaymentMethodSelector from '../../../components/user/PaymentMethodSelector';
import * as bookingService from '../../../services/bookingService';
import * as paymentService from '../../../services/paymentService';

const FlightPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, contactInfo, passengers, addons, totalAmount } = location.state || {};

  // ─── State ──────────────────────────────────────────────────────────────────
  const [selectedMethod, setSelectedMethod] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingInfo, setBillingInfo] = useState(contactInfo || {
    fullName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handlePayNow = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }
    if (!termsAccepted) {
      alert('Please accept the Terms & Conditions');
      return;
    }

    setIsProcessing(true);
    try {
      const bookingRequest = {
        serviceId: flight.id,
        numAdults: passengers.length,
        numChildren: 0,
        note: `Contact: ${billingInfo.fullName}, ${billingInfo.phone}`,
        passengers: passengers.map(p => ({
          firstName: p.firstName,
          lastName: p.lastName,
          idNumber: p.idNumber,
          nationality: p.nationality,
          dob: p.dob,
          gender: p.gender
        })),
        paymentProvider: selectedMethod
      };
      const bookingResponse = await bookingService.createFlightBooking(bookingRequest);
      const bookingId = bookingResponse.id;
      let paymentData;
      if (selectedMethod === 'vnpay') {
        paymentData = await paymentService.createVnPayPayment(bookingId);
      } else if (selectedMethod === 'paypal') {
        paymentData = await paymentService.createPayPalPayment(bookingId);
      }
      if (paymentData && paymentData.paymentUrl) {
        window.location.href = paymentData.paymentUrl;
      } else {
        throw new Error('Failed to generate payment URL.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.response?.data?.message || 'Error processing payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-24 lg:pb-10 -mx-4">
      {/* Header Banner */}
      <div className="bg-[#7C4A4A] pt-4 pb-12">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between text-white">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 font-bold hover:text-white/80 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Back to Booking
          </button>
          <div className="flex items-center gap-2 text-xs font-bold bg-black/10 px-3 py-1.5 rounded-lg border border-white/10">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Booking Secured
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 -mt-10">
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <BookingStepper currentStep={4} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content (Left) */}
          <div className="flex-1 min-w-0">
            
            <PaymentMethodSelector 
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
            />

            <ContactForm 
              data={billingInfo}
              onChange={(field, val) => setBillingInfo(prev => ({ ...prev, [field]: val }))}
              errors={{}}
            />

            {/* Terms & Conditions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#7978E9] focus:ring-[#7978E9]"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <div className="text-sm text-gray-600 leading-relaxed">
                  I agree to the <span className="text-[#7978E9] font-bold hover:underline">Terms & Conditions</span>, <span className="text-[#7978E9] font-bold hover:underline">Privacy Policy</span>, and <span className="text-[#7978E9] font-bold hover:underline">General Carriage Conditions</span> of the airlines and HanuVivu.
                </div>
              </label>
            </div>

            {/* Pay Button (Visible only on non-sticky mobile views, logic handled by Summary component usually but we put one here for desktop context) */}
            <div className="hidden lg:block">
              <button 
                onClick={handlePayNow}
                disabled={isProcessing || !selectedMethod || !termsAccepted}
                className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
                  isProcessing || !selectedMethod || !termsAccepted
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-[#CD6F1E] hover:bg-[#b8631b] text-white active:scale-[0.98]'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Pay Now
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:w-[350px] flex-shrink-0">
            <BookingSummary 
              mode="flight"
              data={flight || {}} 
              subData={passengers || []}
              addons={addons || {}}
              onContinue={handlePayNow} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightPayment;
