import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingStepper from '../../../components/user/BookingStepper';
import BookingSummary from '../../../components/user/BookingSummary';
import PaymentMethodSelector from '../../../components/user/PaymentMethodSelector';

const MOCK_TRIP = {
  id: '1',
  ten_nha_xe: 'Hoang Long Bus',
  loai_phuong_tien: 'Bus (Sleeper)',
  diem_di: 'Hanoi',
  diem_den: 'Da Nang',
  gia: 450000,
  departDate: '02 May 2026',
};

const MOCK_SELECTED_SEATS = ['A1', 'A3'];

const TransportPayment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }
    if (!isAgreed) {
      alert('Please agree to the Terms and Conditions');
      return;
    }

    setIsProcessing(true);
    
    // Mock payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/transport/success');
    }, 2000);
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 lg:pb-10">
      <BookingStepper currentStep={4} mode="transport" />

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Payment Options */}
          <div className="flex-1">
            <PaymentMethodSelector 
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
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
                  I have read and agree to the <span className="text-[#7978E9] font-bold hover:underline">Terms & Conditions</span> and <span className="text-[#7978E9] font-bold hover:underline">Privacy Policy</span>. I understand that the ticket booking is subject to the carrier's policy.
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
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Confirm & Pay
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:w-[380px]">
            <BookingSummary 
              mode="transport"
              data={MOCK_TRIP}
              subData={MOCK_SELECTED_SEATS}
              onContinue={handlePayment}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransportPayment;
