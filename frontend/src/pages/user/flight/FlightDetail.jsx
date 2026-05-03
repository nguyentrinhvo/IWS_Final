import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import flightService from '../../../services/flightService';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await flightService.getFlightById(id);
        if (!data) throw new Error("Flight not found");

        const schedule = data.schedules?.[0] || {};
        
        const formatTime = (timeStr, defaultTime) => {
          if (!timeStr) return defaultTime;
          try {
            const d = new Date(timeStr);
            if (isNaN(d.getTime())) return defaultTime;
            return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
          } catch (e) {
            return defaultTime;
          }
        };

        const formatDate = (timeStr, defaultDate) => {
          if (!timeStr) return defaultDate;
          try {
            const d = new Date(timeStr);
            if (isNaN(d.getTime())) return defaultDate;
            return d.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
          } catch (e) {
            return defaultDate;
          }
        };

        const mappedData = {
          id: data.id,
          airline: data.airline,
          airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png',
          flightNo: data.flightNumber,
          aircraft: 'Airbus A320', 
          fromCode: data.departureAirport,
          fromCity: data.departureAirport,
          fromAirport: data.departureAirport + ' Airport',
          toCode: data.arrivalAirport,
          toCity: data.arrivalAirport,
          toAirport: data.arrivalAirport + ' Airport',
          departTime: formatTime(schedule.departureTime, '06:00'),
          departDate: formatDate(schedule.departureTime, 'Thu, 02 May 2026'),
          arriveTime: formatTime(schedule.arrivalTime, '08:00'),
          arriveDate: formatDate(schedule.arrivalTime, 'Thu, 02 May 2026'),
          duration: data.durationMinutes ? `${Math.floor(data.durationMinutes/60)}h ${data.durationMinutes%60}m` : '2h 05m',
          stops: 0,
          cabinClass: data.cabinClass || 'Economy',
          price: data.basePrice || 0,
          passengers: 1,
          policies: MOCK_FLIGHT_DETAIL.policies, 
          fareOptions: [
            {
              id: 'eco-lite',
              name: 'Economy Lite',
              subtitle: 'Most basic option',
              price: data.basePrice || 1250000,
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
              price: (data.basePrice || 1250000) + 600000,
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
              price: (data.basePrice || 1250000) * 3,
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
        setFlight(mappedData);
      } catch (err) {
        console.error("Failed to fetch flight detail:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading flight details...</p>
      </div>
    );
  }

  if (!flight || !flight.fareOptions) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-medium">Flight not found</p>
      </div>
    );
  }

  const selectedFare = flight.fareOptions.find(opt => opt.id === selectedFareId) || flight.fareOptions[0];

  const handleContinue = () => {
    navigate('/flights/booking', { 
      state: { 
        flight, 
        selectedFareId
      } 
    });
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
              price={selectedFare?.price || 0} 
              passengers={flight?.passengers || 1}
              onContinue={handleContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetail;
