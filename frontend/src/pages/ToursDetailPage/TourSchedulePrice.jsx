import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

const formatShortDate = (dateStr) => {
  const d = new Date(dateStr);
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(d);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}, ${dd}/${mm}`;
};

const TourSchedulePrice = ({ data, tourId }) => {
  const navigate = useNavigate();
  
  // Use data passed from parent instead of mockData
  // data here is mappedData.schedulePrice from Tour.jsx
  // but wait, we need the actual departureSchedules array.
  // In Tour.jsx, we added departureSchedules to the main object.
  // ToursDetailPage.jsx passes data.schedulePrice to TourSchedulePrice.
  // Let's assume we pass the whole tour object or at least the schedules.
  
  // Actually, I'll update ToursDetailPage.jsx to pass the whole mapped tour object
  // or at least the schedules.
  
  const departureSchedules = data?.departureSchedules || [];
  const tour = data?.tour || {};
  
  const [selectedId, setSelectedId] = useState(null);
  const [windowStartIndex, setWindowStartIndex] = useState(0);
  const [guests, setGuests] = useState({ adult: 2, child: 0, baby: 0 });

  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail && e.detail.source === 'bottom') {
        setSelectedId(e.detail.dateId);
        setGuests(e.detail.guests);
        
        const idx = departureSchedules.findIndex(s => s.id === e.detail.dateId);
        if (idx !== -1) {
          if (idx === 0) {
            setWindowStartIndex(0);
          } else if (idx === departureSchedules.length - 1) {
            setWindowStartIndex(Math.max(0, departureSchedules.length - 3));
          } else {
            setWindowStartIndex(Math.max(0, idx - 1));
          }
        }
      }
    };

    window.addEventListener('syncTourBooking', handleSync);
    return () => window.removeEventListener('syncTourBooking', handleSync);
  }, [departureSchedules]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('syncTourBooking', {
      detail: { dateId: selectedId, guests: guests, source: 'top' }
    }));
  }, [selectedId, guests]);

  const selectedDateObj = useMemo(() => 
    departureSchedules.find(d => d.id === selectedId) || null, 
  [selectedId, departureSchedules]);

  const adultPrice = selectedDateObj ? selectedDateObj.price : 0;
  const childPrice = adultPrice * 0.75;
  const babyPrice = adultPrice * 0.3;

  const totalGuests = guests.adult + guests.child + guests.baby;
  const totalPrice = (guests.adult * adultPrice) + (guests.child * childPrice) + (guests.baby * babyPrice);
  const spotsAvailable = selectedDateObj ? selectedDateObj.seats - totalGuests : 0;

  const visibleSchedules = departureSchedules.slice(windowStartIndex, windowStartIndex + 3);

  const handleLocalSelect = (id) => {
    setSelectedId(id);
    window.dispatchEvent(new CustomEvent('syncTourBooking', {
      detail: { dateId: id, guests: guests, source: 'top' }
    }));
  };

  const updateGuestCount = (type, delta) => {
    setGuests(prev => {
      let newCount = prev[type] + delta;
      if (type === 'adult' && newCount < 1) return prev;
      if (newCount < 0) return prev;
      if (selectedDateObj && (totalGuests + delta) > selectedDateObj.seats) return prev;
      
      const newGuests = { ...prev, [type]: newCount };
      window.dispatchEvent(new CustomEvent('syncTourBooking', {
        detail: { dateId: selectedId, guests: newGuests, source: 'top' }
      }));
      return newGuests;
    });
  };

  const handleAllClick = () => {
    const el = document.getElementById('tour-book-now');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
    
    window.dispatchEvent(new CustomEvent('openDateSelection', {
      detail: { source: 'allButton' }
    }));
  };

  const handleBookNow = () => {
    if (!selectedDateObj) {
      alert('Please select a departure date');
      return;
    }
    if (totalGuests === 0) {
      alert('Please select at least one guest');
      return;
    }
    
    // Cuộn xuống phần thông tin liên hệ và đặt chỗ chính
    const el = document.getElementById('tour-book-now');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Gửi event để TourBookNow mở tab nhập thông tin (Step 3)
      window.dispatchEvent(new CustomEvent('openContactForm', {
        detail: { dateId: selectedId, guests: guests }
      }));
    }
  };

  const guestTypes = [
    { id: 'adult', label: 'Adult', desc: '>10 year old', price: adultPrice },
    { id: 'child', label: 'Children', desc: '2-10 year old', price: childPrice },
    { id: 'baby', label: 'Baby', desc: '<2 year old', price: babyPrice }
  ];

  if (departureSchedules.length === 0) return null;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)', padding: '24px', boxSizing: 'border-box', width: '100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>Tour Itinerary and Prices</h2>
        <span style={{ color: '#9ca3af', fontSize: '13px' }}>Choose a Schedule and View Prices:</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px', marginBottom: '24px', overflowX: 'visible' }}>
        {visibleSchedules.map(schedule => {
          const isSelected = schedule.id === selectedId;
          return (
            <div 
              key={schedule.id}
              onClick={() => handleLocalSelect(schedule.id)}
              style={{
                border: isSelected ? 'none' : '1px solid #e5e7eb',
                backgroundColor: isSelected ? '#f3f4f6' : '#ffffff',
                boxShadow: isSelected ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                borderRadius: '6px',
                padding: '4px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                minWidth: '70px',
                flex: '1'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: isSelected ? 'bold' : 'normal', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {formatShortDate(schedule.departure)}
              </span>
            </div>
          );
        })}
        <div 
          onClick={handleAllClick}
          style={{
            border: '1px solid #e5e7eb',
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            padding: '4px 8px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            minWidth: '70px',
            flex: '1'
          }}
        >
          <svg width="14px" height="14px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <path d="M22 14V12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> 
              <path d="M7 4V2.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> 
              <path d="M17 4V2.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> 
              <circle cx="18" cy="18" r="3" stroke="#1C274C" strokeWidth="1.5"></circle> 
              <path d="M20.5 20.5L22 22" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> 
              <path d="M21.5 9H16.625H10.75M2 9H5.875" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> 
            </g>
          </svg>
          <span style={{ fontSize: '10px', color: '#111827', fontWeight: '500', whiteSpace: 'nowrap' }}>All</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
        {guestTypes.map(guest => (
          <div key={guest.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '500', color: '#111827', fontSize: '15px' }}>{guest.label}</span>
              <span style={{ color: '#9ca3af', fontSize: '12px' }}>{guest.desc}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {guests[guest.id] > 0 && (
                <span style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>
                  x {formatCurrency(guest.price)}
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '2px 4px' }}>
                <button 
                  onClick={() => updateGuestCount(guest.id, -1)}
                  style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#4b5563', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >-</button>
                <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}>
                  {guests[guest.id]}
                </span>
                <button 
                  onClick={() => updateGuestCount(guest.id, 1)}
                  style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#4b5563', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px', textAlign: 'left' }}>
        still <strong style={{ color: '#111827', fontWeight: 'bold' }}>{selectedDateObj ? spotsAvailable : 0}</strong> spots available
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '20px', marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#111827' }}>Tour Total</div>
        <div style={{ fontWeight: 'bold', fontSize: '22px', color: '#2563EB' }}>
          {formatCurrency(totalPrice)} VND
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <Button 
          onClick={handleBookNow}
          variant="primary"
          size="lg"
          style={{ width: '100%' }}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default TourSchedulePrice;
