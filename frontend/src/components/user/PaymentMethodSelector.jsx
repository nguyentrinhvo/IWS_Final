import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { PAYMENT_METHODS } from '../../data/mockData';

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {
  const methods = PAYMENT_METHODS.map(m => ({
    id: m.id,
    name: m.name,
    description: m.id === 'vnpay' 
      ? 'Pay via VNPay gateway (Credit Card, Bank Transfer, QR Code)'
      : 'Pay safely and easily with your PayPal account or Credit Card',
    logo: m.icon
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-bold text-[#1a2b49] mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        Select Payment Method
      </h3>
      <div className="space-y-4">
        {methods.map((method) => (
          <PaymentMethodCard 
            key={method.id}
            {...method}
            isSelected={selectedMethod === method.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
