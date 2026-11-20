import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingStepper from '../../../components/user/BookingStepper';
import TransportPassengerForm from '../../../components/user/TransportPassengerForm';
import SeatSummary from '../../../components/user/SeatSummary';
import BookingSummary from '../../../components/user/BookingSummary';
import { createBusTrainBooking } from '../../../services/bookingService';
import { useAuth } from '../../../context/AuthContext';

const TransportBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser: user, setIsLoginModalOpen } = useAuth();
  
  const { tripId, trip, selectedSeats } = location.state || {};

  const [passengers, setPassengers] = useState(
    (selectedSeats || []).map(seat => ({ seatId: seat, name: '', phone: '' }))
  );
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!trip || !selectedSeats) {
        navigate('/transport/search');
    }
  }, [trip, selectedSeats, navigate]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const validate = () => {
    const newErrors = passengers.map(p => {
      const err = {};
      if (!p.name.trim()) err.name = 'Full name is required';
      if (!p.phone.trim()) err.phone = 'Phone number is required';
      return err;
    });
    setErrors(newErrors);
    return newErrors.every(err => Object.keys(err).length === 0);
  };

  const handleContinue = async () => {
    if (!user) {
        alert("Please login to book tickets");
        setIsLoginModalOpen(true);
        return;
    }

    if (!validate()) return;

    try {
        setIsSubmitting(true);
        const bookingRequest = {
            serviceId: tripId,
            numAdults: passengers.length,
            numChildren: 0,
            note: "Transport booking",
            paymentProvider: "vnpay",
            passengers: passengers.map(p => ({
                fullName: p.name,
                phone: p.phone,
                seatPosition: p.seatId
            }))
        };

        const response = await createBusTrainBooking(bookingRequest);
        navigate('/transport/payment', { 
            state: { 
                bookingId: response.id,
                trip: trip,
                selectedSeats: selectedSeats,
                totalPrice: response.totalPrice
            } 
        });
    } catch (error) {
        console.error("Booking failed:", error);
        alert(error.response?.data?.message || "Booking failed");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 lg:pb-10">
      <BookingStepper currentStep={3} mode="transport" />

      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Forms */}
          <div className="flex-1">
            <SeatSummary selectedSeats={selectedSeats || []} />
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1a2b49] mb-4">Passenger Information</h2>
              {passengers.map((p, idx) => (
                <TransportPassengerForm 
                  key={p.seatId}
                  seatId={p.seatId}
                  index={idx}
                  data={p}
                  onChange={handlePassengerChange}
                  errors={errors[idx]}
                />
              ))}
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-bold text-[#1a2b49] mb-4">Contact Details</h3>
              <p className="text-sm text-gray-500 mb-4">We will send your e-ticket to this contact.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Contact Email</label>
                  <input type="email" defaultValue={user?.email || "user@example.com"} className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none focus:border-[#7978E9]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Contact Phone</label>
                  <input type="text" defaultValue={user?.phone || "0912345678"} className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 outline-none focus:border-[#7978E9]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:w-[380px]">
            <BookingSummary 
              mode="transport"
              data={trip}
              subData={selectedSeats}
              onContinue={handleContinue}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportBooking;
