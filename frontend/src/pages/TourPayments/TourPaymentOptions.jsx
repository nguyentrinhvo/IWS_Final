import React, { useState, useEffect } from 'react';
import Button from '../../components/button';

const TourPaymentOptions = ({ 
  selectedMethod, 
  onSelectMethod, 
  totalAmount = 300000, 
  onSubmit, 
  isProcessing, 
  error,
  tourName = "Selected Tour",
  guestsCount = 1
}) => {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('momo');
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) setCardNumber(value);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
    setExpiry(val);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) setCvv(value);
  };

  const getMethodName = () => {
    return selectedMethod?.name || 'Payment';
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="bg-[#0194F3] text-white p-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <span className="font-medium text-sm md:text-base">Don't worry, the price remains the same. Complete your payment by</span>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-green-400 font-bold text-lg tracking-widest">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How would you like to pay?</h2>

        <div className="space-y-4">
          {/* VNPAY */}
          <div className={`border rounded-lg transition-all ${selectedMethod?.id === 'vnpay' ? 'border-[#0194F3] bg-blue-50/30' : 'border-gray-200'}`}>
            <label className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="payment_method" 
                  checked={selectedMethod?.id === 'vnpay'}
                  onChange={() => onSelectMethod({ id: 'vnpay', name: 'VNPAY' })}
                  className="w-5 h-5 text-[#0194F3] focus:ring-[#0194F3]"
                />
                <span className="font-semibold text-gray-800">VNPAY (ATM, Credit Card, VietQR)</span>
              </div>
              <img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png" alt="VNPAY" className="h-8" />
            </label>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedMethod?.id === 'vnpay' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-12 pb-5 space-y-3 text-sm text-gray-600">
                <p>• Thanh toán an toàn, bảo mật qua cổng VNPAY.</p>
                <p>• Hỗ trợ quét mã VietQR, thẻ ATM nội địa, hoặc thẻ Visa/Mastercard.</p>
                <p>• Bạn sẽ được chuyển hướng sang trang của VNPAY để hoàn tất giao dịch.</p>
              </div>
            </div>
          </div>

          {/* PayPal */}
          <div className={`border rounded-lg transition-all ${selectedMethod?.id === 'paypal' ? 'border-[#0194F3] bg-blue-50/30' : 'border-gray-200'}`}>
            <label className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="payment_method" 
                  checked={selectedMethod?.id === 'paypal'}
                  onChange={() => onSelectMethod({ id: 'paypal', name: 'PayPal' })}
                  className="w-5 h-5 text-[#0194F3] focus:ring-[#0194F3]"
                />
                <span className="font-semibold text-gray-800">PayPal</span>
              </div>
              <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" className="h-8" />
            </label>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedMethod?.id === 'paypal' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-12 pb-5 space-y-3 text-sm text-gray-600">
                <p>• Thanh toán nhanh chóng bằng số dư PayPal hoặc thẻ tín dụng quốc tế.</p>
                <p>• Bạn sẽ được chuyển hướng sang trang của PayPal để đăng nhập và thanh toán.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-bold text-gray-800">Apply Coupons</h3>
          <p className="text-sm text-gray-500 mb-3">Enter coupon code or select available coupon(s)</p>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Enter code" 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[#0194F3] focus:outline-none"
            />
            <Button 
              variant="primary" 
              className="!bg-gray-800 hover:!bg-gray-700 !px-6 !py-2 !rounded-md"
            >
              Apply
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div 
            className="flex justify-between items-center cursor-pointer select-none group"
            onClick={() => setShowPriceDetails(!showPriceDetails)}
          >
            <h3 className="text-xl font-bold text-gray-800 transition-colors group-hover:text-[#0194F3]">
              {showPriceDetails ? 'Price Details' : 'Total Price'}
            </h3>
            <div className="flex items-center gap-3">
              {!showPriceDetails && (
                <span className="text-xl font-bold text-gray-800">{totalAmount.toLocaleString()} VND</span>
              )}
              <svg 
                className={`transform transition-transform duration-300 text-gray-600 ${showPriceDetails ? 'rotate-180' : ''}`} 
                width="24px" 
                height="24px" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>

          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showPriceDetails ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-3 text-gray-600 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <span className="font-medium">Tours</span>
                <span className="text-right max-w-[60%]">{tourName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{guestsCount} guests</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
                <span className="font-bold text-gray-800">Total Price</span>
                <span className="font-bold text-xl text-gray-800">{totalAmount.toLocaleString()} VND</span>
              </div>
            </div>
          </div>
        </div>

        <Button 
          variant="primary"
          size="lg"
          onClick={onSubmit}
          disabled={!selectedMethod || isProcessing}
          loading={isProcessing}
          className="w-full mt-8 !bg-[#FF5E1F] hover:!bg-[#E04D10] !py-4 !rounded-lg !text-lg shadow-md"
        >
          {!isProcessing && `Pay with ${getMethodName()}`}
        </Button>
        {error && <p className="text-red-500 text-center mt-3 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default TourPaymentOptions;