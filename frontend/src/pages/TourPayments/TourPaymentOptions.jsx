import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';


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
    switch (selectedMethod) {
      case 'vietqr': return 'VietQR';
      case 'mobile_banking': return 'Mobile Banking';
      case 'digital_wallet': return selectedWallet === 'momo' ? 'Momo' : 'ZaloPay';
      case 'credit_card': return 'Credit/Debit Card';
      default: return '';
    }
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
          <div className={`border rounded-lg transition-all ${selectedMethod === 'vietqr' ? 'border-[#0194F3] bg-blue-50/30' : 'border-gray-200'}`}>
            <label className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment_method"
                  checked={selectedMethod === 'vietqr'}
                  onChange={() => onSelectMethod('vietqr')}
                  className="w-5 h-5 text-[#0194F3] focus:ring-[#0194F3]"
                />
                <span className="font-semibold text-gray-800">VietQR</span>
              </div>
              <img src="/icons/vietqr.svg" alt="VietQR" className="h-8" />
            </label>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedMethod === 'vietqr' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-12 pb-5 space-y-3 text-sm text-gray-600">
                <p>• Make sure you have any e-wallet or mobile banking app that supports payment with VietQR.</p>
                <p>• A QR code will appear after you click the ‘Pay’ button. Simply save or screenshot the QR code to complete your payment within the time limit.</p>
                <p>• Please use the latest QR code provided to complete your payment.</p>
              </div>
            </div>
          </div>

          <div className={`border rounded-lg transition-all ${selectedMethod === 'mobile_banking' ? 'border-[#0194F3] bg-blue-50/30' : 'border-gray-200'}`}>
            <label className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment_method"
                  checked={selectedMethod === 'mobile_banking'}
                  onChange={() => onSelectMethod('mobile_banking')}
                  className="w-5 h-5 text-[#0194F3] focus:ring-[#0194F3]"
                />
                <span className="font-semibold text-gray-800">Mobile Banking</span>
              </div>
              <svg version="1.1" viewBox="0 0 512 512" width="32px" height="32px" fill="#000000">
                <path d="M358.584,512H153.416c-21.863-0.061-39.571-17.769-39.632-39.632V39.632C113.845,17.769,131.553,0.061,153.416,0h205.168 c21.862,0.061,39.571,17.769,39.632,39.632v432.736C398.146,494.228,380.443,511.93,358.584,512z"></path>
                <rect x="132.546" y="40.4" style={{ fill: "#FFFFFF" }} width="246.917" height="403.719"></rect>
                <path style={{ fill: "#CCCCCC" }} d="M293.032,24.424h-50.528c-2.278-0.004-4.124-1.85-4.128-4.128l0,0 c0.004-2.278,1.85-4.124,4.128-4.128h50.528c2.279,0.004,4.124,1.85,4.128,4.128l0,0C297.155,22.574,295.31,24.419,293.032,24.424z "></path>
                <circle style={{ fill: "#CCCCCC" }} cx="218.97" cy="20.296" r="4.128"></circle>
                <path style={{ fill: "#CCCCCC" }} d="M256,497.601c-10.781,0-19.52-8.739-19.52-19.52s8.739-19.52,19.52-19.52 c10.781,0,19.52,8.739,19.52,19.52l0,0C275.507,488.856,266.774,497.587,256,497.601z M256,462.553c-8.571,0-15.52,6.949-15.52,15.52c0,8.571,6.948,15.52,15.52,15.52c8.571,0,15.52-6.949,15.52-15.52l0,0 c0.009-8.58-6.94-15.543-15.52-15.552l0,0V462.553z"></path>
                <rect x="311.976" y="162.762" style={{ fill: "#E21B1B" }} width="18.16" height="71.375"></rect>
                <rect x="181.876" y="162.762" style={{ fill: "#E21B1B" }} width="18.16" height="71.375"></rect>
                <rect x="255.876" y="250.913" width="93.292" height="18.16"></rect>
                <rect x="162.831" y="250.913" style={{ fill: "#3F3F3F" }} width="93.292" height="18.16"></rect>
                <path d="M253.368,228.176v-7.44c-3.989-0.014-7.894-1.139-11.28-3.248l1.768-4.944c3.158,2.064,6.843,3.176,10.616,3.2 c5.232,0,8.8-3.024,8.8-7.2c0-4.056-2.88-6.56-8.336-8.8c-7.52-2.944-12.16-6.336-12.16-12.752 c0.096-6.237,4.918-11.378,11.136-11.872v-7.44h4.568v7.152c3.369,0.025,6.674,0.915,9.6,2.584l-1.848,4.864 c-2.807-1.672-6.02-2.538-9.288-2.504c-5.68,0-7.816,3.392-7.816,6.336c0,3.832,2.727,5.752,9.144,8.408 c7.592,3.104,11.424,6.936,11.424,13.496c-0.109,6.541-5.132,11.948-11.648,12.536v7.664h-4.64L253.368,228.176z"></path>
                <rect x="210.01" y="162.762" style={{ fill: "#E21B1B" }} width="18.16" height="71.375"></rect>
                <rect x="283.832" y="162.762" style={{ fill: "#E21B1B" }} width="18.16" height="71.375"></rect>
                <path d="M256,88.752v23.752c5.284-0.432,9.918,3.5,10.352,8.784c0.432,5.284-3.5,9.918-8.784,10.352 c-0.521,0.042-1.045,0.042-1.566,0v15.2h86.665L256,88.752z"></path>
                <path style={{ fill: "#3F3F3F" }} d="M246.4,122.072c0-5.302,4.299-9.6,9.6-9.6l0,0V88.752l-86.665,58.104H256v-15.2 C250.704,131.657,246.409,127.368,246.4,122.072z"></path>
                <rect x="162.831" y="317.068" style={{ fill: "#CCCCCC" }} width="186.327" height="8"></rect>
                <rect x="162.831" y="342.725" style={{ fill: "#CCCCCC" }} width="186.327" height="8"></rect>
                <rect x="162.831" y="368.362" style={{ fill: "#CCCCCC" }} width="186.327" height="8"></rect>
                <rect x="162.831" y="394.009" style={{ fill: "#CCCCCC" }} width="186.327" height="8"></rect>
              </svg>
            </label>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedMethod === 'mobile_banking' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-12 pb-5 space-y-3 text-sm text-gray-600">
                <p>• Make sure you have installed your mobile banking application before continuing.</p>
                <p>• After clicking the 'Pay' button, you'll see a list of bank providers. You can either pay using the QR code or choose your bank provider to open your mobile banking app.</p>
              </div>
            </div>
          </div>

          <div className={`border rounded-lg transition-all ${selectedMethod === 'digital_wallet' ? 'border-[#0194F3] bg-blue-50/30' : 'border-gray-200'}`}>
            <label className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment_method"
                  checked={selectedMethod === 'digital_wallet'}
                  onChange={() => onSelectMethod('digital_wallet')}
                  className="w-5 h-5 text-[#0194F3] focus:ring-[#0194F3]"
                />
                <span className="font-semibold text-gray-800">Digital Wallet</span>
              </div>
              <div className="flex gap-2">
                <img src="/icons/momo.svg" alt="Momo" className="h-6" />
                <img src="/icons/zalopay.svg" alt="ZaloPay" className="h-6" />
              </div>
            </label>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedMethod === 'digital_wallet' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-4 pb-4">
                <div className="space-y-2 bg-white p-3 rounded-md border border-gray-100">
                  <label className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="wallet_type"
                        checked={selectedWallet === 'momo'}
                        onChange={() => setSelectedWallet('momo')}
                        className="w-4 h-4 text-[#0194F3] focus:ring-[#0194F3]"
                      />
                      <span className="text-gray-700">Momo</span>
                    </div>
                    <img src="/icons/momo.svg" alt="Momo" className="h-6" />
                  </label>
                  <label className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="wallet_type"
                        checked={selectedWallet === 'zalopay'}
                        onChange={() => setSelectedWallet('zalopay')}
                        className="w-4 h-4 text-[#0194F3] focus:ring-[#0194F3]"
                      />
                      <span className="text-gray-700">ZaloPay</span>
                    </div>
                    <img src="/icons/zalopay.svg" alt="ZaloPay" className="h-6" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className={`border rounded-lg transition-all ${selectedMethod === 'credit_card' ? 'border-[#0194F3] bg-blue-50/30' : 'border-gray-200'}`}>
            <label className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment_method"
                  checked={selectedMethod === 'credit_card'}
                  onChange={() => onSelectMethod('credit_card')}
                  className="w-5 h-5 text-[#0194F3] focus:ring-[#0194F3]"
                />
                <span className="font-semibold text-gray-800">Credit Card/ Debit Card</span>
              </div>
              <div className="flex gap-2">
                <img src="/icons/visa.svg" alt="Visa" className="h-6" />
                <img src="/icons/mastercard.svg" alt="Mastercard" className="h-6" />
              </div>
            </label>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedMethod === 'credit_card' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-12 pb-6 space-y-4 bg-white mx-4 mb-4 p-4 rounded-md border border-gray-100">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Credit Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength="16"
                    className="w-full lg:w-auto min-w-[280px] px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none transition-colors placeholder-opacity-20 bg-white"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 lg:flex-none">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Valid Until</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      maxLength="5"
                      className="w-full lg:w-auto min-w-[130px] px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none transition-colors bg-white"
                    />
                  </div>
                  <div className="flex-1 lg:flex-none">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                      maxLength="4"
                      className="w-full lg:w-auto min-w-[130px] px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none transition-colors bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Name on Card</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value.replace(/[^a-zA-ZÀ-ỹ\s\.\-]/g, ''))}
                    className="w-full lg:w-auto min-w-[280px] px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none transition-colors placeholder-opacity-20 bg-white"
                  />
                </div>
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