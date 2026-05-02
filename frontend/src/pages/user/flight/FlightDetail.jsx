import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FlightDetailSummary from '../../../components/user/FlightDetailSummary';
import FlightTimeline from '../../../components/user/FlightTimeline';
import FlightPriceSummary from '../../../components/user/FlightPriceSummary';
import FareOptionsList from '../../../components/user/FareOptionsList';
import FlightPolicies from '../../../components/user/FlightPolicies';

const MOCK_FLIGHT_DETAIL = {
  id: '1',
  airline: 'Vietnam Airlines',
  airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png',
  flightNo: 'VN-201',
  aircraft: 'Airbus A350-900',
  fromCode: 'HAN',
  fromCity: 'Hanoi',
  fromAirport: 'Noi Bai International Airport (HAN) - Terminal 1',
  toCode: 'SGN',
  toCity: 'Ho Chi Minh City',
  toAirport: 'Tan Son Nhat International Airport (SGN) - Terminal 2',
  departTime: '06:00',
  departDate: 'Thu, 02 May 2026',
  arriveTime: '08:05',
  arriveDate: 'Thu, 02 May 2026',
  duration: '2h 05m',
  stops: 0,
  cabinClass: 'Economy',
  price: 1250000,
  passengers: 1,
  policies: {
    baggage: [
      { label: 'Carry-on baggage', value: '1 piece x 7kg' },
      { label: 'Checked baggage', value: '1 piece x 23kg' },
    ],
    refund: 'Refundable with a fee of 500,000 VND if requested at least 24 hours before departure.',
    change: 'Flight change permitted with a fee of 350,000 VND plus fare difference. Changes must be made at least 12 hours before departure.',
  },
  fareOptions: [
    {
      id: 'eco-lite',
      name: 'Economy Lite',
      subtitle: 'Most basic option',
      price: 1250000,
      isCheapest: true,
      features: [
        { label: '7kg Carry-on Baggage', included: true },
        { label: '23kg Checked Baggage', included: true },
        { label: 'Standard Seat', included: true },
        { label: 'Refundable', included: false },
        { label: 'Flight Change', included: false },
      ]
    },
    {
      id: 'eco-flex',
      name: 'Economy Flex',
      subtitle: 'More flexibility',
      price: 1850000,
      isBestValue: true,
      features: [
        { label: '10kg Carry-on Baggage', included: true },
        { label: '30kg Checked Baggage', included: true },
        { label: 'Select Any Seat', included: true },
        { label: 'Refundable', included: true },
        { label: 'Free Flight Change', included: true },
      ]
    },
    {
      id: 'biz-class',
      name: 'Business Class',
      subtitle: 'Premium experience',
      price: 4500000,
      features: [
        { label: '15kg Carry-on Baggage', included: true },
        { label: '40kg Checked Baggage', included: true },
        { label: 'Premium Seat / Bed', included: true },
        { label: 'Full Refund', included: true },
        { label: 'Priority Boarding', included: true },
      ]
    }
  ]
};

const FlightDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFareId, setSelectedFareId] = useState('eco-lite');
  const [flight, setFlight] = useState(MOCK_FLIGHT_DETAIL);

  useEffect(() => {
    window.scrollTo(0, 0);
    // In real app, fetch flight by id
  }, [id]);

  const selectedFare = flight.fareOptions.find(opt => opt.id === selectedFareId);

  const handleContinue = () => {
    // Navigate to next step in booking flow
    console.log('Continuing with fare:', selectedFareId);
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 lg:pb-10 -mx-4">
      {/* Top Banner / Breadcrumb area (optional, using theme color) */}
      <div className="bg-[#7C4A4A] h-32 md:h-40 w-full mb-[-80px] md:mb-[-100px]"></div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content (Left) */}
          <div className="flex-1 min-w-0">
            {/* Header Info */}
            <div className="mb-6 flex items-center justify-between">
               <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-white/80 hover:text-white font-semibold transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                Back to search
              </button>
            </div>

            <FlightDetailSummary flight={flight} />
            
            <FlightTimeline flight={flight} />

            <FareOptionsList 
              options={flight.fareOptions} 
              selectedId={selectedFareId}
              onSelect={setSelectedFareId}
            />

            <FlightPolicies policies={flight.policies} />
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:w-[350px] flex-shrink-0">
            <FlightPriceSummary 
              price={selectedFare.price} 
              passengers={flight.passengers}
              onContinue={handleContinue}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default FlightDetail;
