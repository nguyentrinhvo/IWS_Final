import React from 'react';

const FlightPolicies = ({ policies }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
      <h3 className="text-lg font-bold text-[#1a2b49] mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-[#7978E9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Policies & Important Info
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Baggage */}
        <div>
          <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            Baggage Rules
          </h4>
          <div className="space-y-2">
            {policies.baggage.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs">
                <span className="text-gray-500">{item.label}</span>
                <span className="text-gray-800 font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Refund */}
        <div>
          <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Refund Policy
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed italic bg-gray-50 p-3 rounded-lg border border-gray-100">
            {policies.refund}
          </p>
        </div>

        {/* Changes */}
        <div className="md:col-span-2">
          <h4 className="font-bold text-gray-800 text-sm mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Change Policy
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            {policies.change}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightPolicies;
