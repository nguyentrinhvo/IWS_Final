import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingStepper from '../../../components/user/BookingStepper';
import ContactForm from '../../../components/user/ContactForm';
import PassengerForm from '../../../components/user/PassengerForm';
import AddonServices from '../../../components/user/AddonServices';
import BookingSummary from '../../../components/user/BookingSummary';

const FlightBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight: stateFlight, selectedFareId } = location.state || {};

  // ─── Mock Data ──────────────────────────────────────────────────────────────
  // ─── Data Initialization ───────────────────────────────────────────────────
  const selectedFare = stateFlight?.fareOptions?.find(f => f.id === selectedFareId);
  const flight = stateFlight ? {
    ...stateFlight,
    price: selectedFare?.price || stateFlight.price || 0,
    date: stateFlight.departDate
  } : {
    airline: 'Vietnam Airlines',
    airlineLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Vietnam_Airlines_logo.svg/200px-Vietnam_Airlines_logo.svg.png',
    fromCode: 'HAN',
    toCode: 'SGN',
    date: 'Thu, 02 May 2026',
    price: 1250000,
  };

  // ─── State ──────────────────────────────────────────────────────────────────
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [passengers, setPassengers] = useState([
    { firstName: '', lastName: '', gender: '', dob: '', nationality: 'Vietnam', idNumber: '' }
  ]);

  const [addons, setAddons] = useState({
    extraBaggage: false,
    insurance: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
    if (errors.contact?.[field]) {
      const newContactErrors = { ...errors.contact };
      delete newContactErrors[field];
      setErrors({ ...errors, contact: newContactErrors });
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
    
    if (errors.passengers?.[index]?.[field]) {
      const newPassengerErrors = [...(errors.passengers || [])];
      delete newPassengerErrors[index][field];
      setErrors({ ...errors, passengers: newPassengerErrors });
    }
  };

  const toggleAddon = (field) => {
    setAddons(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = () => {
    const newErrors = { contact: {}, passengers: [] };
    let isValid = true;

    // Contact validation
    if (!contactInfo.fullName) newErrors.contact.fullName = 'Full name is required';
    if (!contactInfo.email || !/\S+@\S+\.\S+/.test(contactInfo.email)) newErrors.contact.email = 'Valid email is required';
    if (!contactInfo.phone) newErrors.contact.phone = 'Phone number is required';

    // Passengers validation
    passengers.forEach((p, i) => {
      const pErrors = {};
      if (!p.firstName) pErrors.firstName = 'First name is required';
      if (!p.lastName) pErrors.lastName = 'Last name is required';
      if (!p.idNumber) pErrors.idNumber = 'ID/Passport is required';
      
      newErrors.passengers[i] = pErrors;
      if (Object.keys(pErrors).length > 0) isValid = false;
    });

    if (Object.keys(newErrors.contact).length > 0) isValid = false;
    
    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validate()) {
      const baseFare = (flight.price || 0) * passengers.length;
      const taxes = baseFare * 0.1;
      const addonTotal = (addons.extraBaggage ? 250000 : 0) + (addons.insurance ? 120000 : 0);
      const totalAmount = baseFare + taxes + addonTotal;

      navigate('/flights/payment', { 
        state: { 
          flight, 
          contactInfo, 
          passengers, 
          addons,
          totalAmount
        } 
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-24 lg:pb-10 -mx-4">
      {/* Top Section */}
      <div className="bg-[#7C4A4A] pt-4">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between text-white pb-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 font-bold hover:text-white/80 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Flight Booking
          </button>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">Booking ID: HANU-10293</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
          <BookingStepper currentStep={3} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Side */}
          <div className="flex-1 min-w-0">
            <ContactForm 
              data={contactInfo} 
              onChange={handleContactChange} 
              errors={errors.contact}
            />

            {passengers.map((p, index) => (
              <PassengerForm 
                key={index}
                index={index}
                data={p}
                onChange={handlePassengerChange}
                errors={errors.passengers?.[index]}
              />
            ))}

            <AddonServices addons={addons} onToggle={toggleAddon} />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
               <h3 className="text-lg font-bold text-[#1a2b49] mb-4">Special Requests</h3>
               <textarea 
                placeholder="e.g. Need assistance for elderly passenger, etc."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none transition-all focus:border-[#7978E9] min-h-[100px] text-sm"
               ></textarea>
            </div>

            <div className="hidden lg:flex items-center gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
              <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-blue-700 leading-relaxed">
                Please ensure all information is identical to your ID or Passport to avoid boarding issues. 
                Tickets will be sent to <strong>{contactInfo.email || 'your email'}</strong> once payment is confirmed.
              </p>
            </div>
          </div>

          {/* Summary Side */}
          <div className="lg:w-[350px] flex-shrink-0">
            <BookingSummary 
              mode="flight"
              data={flight} 
              subData={passengers}
              addons={addons}
              onContinue={handleContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;
