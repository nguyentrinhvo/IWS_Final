import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createTourBooking } from '../../services/bookingService';
import { createVnPayPayment } from '../../services/paymentService';
import Button from '../../components/Button';

const RightArrowIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 1024 1024" fill="#000000">
    <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"></path>
  </svg>
);

const CheckIcon = () => (
  <svg width="24px" height="24px" viewBox="0 -3.5 170 170" fill="none">
    <path d="M142.196 30.4125C142.586 30.0637 142.897 29.6356 143.109 29.1567C143.32 28.6778 143.427 28.1592 143.422 27.6357C143.417 27.1122 143.3 26.5959 143.079 26.1213C142.858 25.6467 142.538 25.2248 142.141 24.8838C141.722 24.5249 141.307 24.1678 140.895 23.8127C137.751 21.1093 134.5 18.3102 131.1 15.9225C105.123 -2.36044 78.1316 -2.4633 50.8803 7.23287C26.2068 16.0055 10.3619 33.5563 3.77909 59.3882C-3.56415 88.249 2.86618 113.71 22.9048 135.073C23.4261 135.625 23.9582 136.177 24.4895 136.704C35.2539 147.469 48.6614 154.115 59.2847 158.739C63.8445 160.731 87.2404 163.149 93.5707 162.206C131.19 156.588 155.946 135.37 164.569 99.8725C166.215 92.9194 167.035 85.7962 167.011 78.6508C166.974 71.1466 165.712 63.6988 163.275 56.6012C163.097 56.0703 162.805 55.5851 162.418 55.1805C162.031 54.7759 161.56 54.4618 161.037 54.2606C160.515 54.0595 159.954 53.9764 159.396 54.0171C158.838 54.0579 158.295 54.2216 157.808 54.4965L157.706 54.5547C156.931 54.9984 156.336 55.7005 156.027 56.5381C155.717 57.3757 155.712 58.2954 156.012 59.1364C158.212 65.2371 159.334 71.674 159.327 78.1592C159.251 85.9394 158.198 93.6792 156.192 101.197C150.248 122.8 136.038 138.545 112.75 149.315C89.0741 160.65 55.1215 149.19 46.0879 143.226C36.1031 136.4 27.3663 127.908 20.2596 118.121C9.11418 102.34 6.61369 79.6587 12.6028 58.9229C15.4055 49.3489 20.3036 40.5185 26.9421 33.0722C33.5806 25.6259 41.793 19.7503 50.9838 15.8714C74.8941 5.93474 98.8852 4.18192 122.285 19.0635C125.422 21.061 133.422 27.3424 137.465 30.5501C138.143 31.0882 138.99 31.3691 139.855 31.3432C140.721 31.3172 141.549 30.986 142.194 30.4082L142.196 30.4125Z" fill="#2563EB"></path>
    <path d="M74.6287 104.313C76.2312 102.79 77.1115 102.019 77.9173 101.177C103.753 74.1855 132.047 49.8851 160.508 25.7727C161.584 24.8619 162.685 23.7 163.958 23.3737C165.493 22.9815 167.996 23.4326 168.682 24.2661C169.133 24.8821 169.418 25.6035 169.509 26.3612C169.601 27.1189 169.496 27.8875 169.206 28.5932C168.537 30.3474 166.907 31.8498 165.429 33.1629C156.607 41.0019 147.538 48.5708 138.872 56.5716C120.756 73.3024 102.756 90.1576 84.8704 107.137C77.0334 114.561 74.0173 114.862 66.8059 106.929C62.0589 101.705 47.7328 84.0973 43.3455 78.5495C42.7256 77.6872 42.1735 76.7781 41.6941 75.8305C40.7045 74.0756 40.0576 72.1419 42.0246 70.7814C44.2158 69.2662 45.7707 70.8473 47.0696 72.4937C48.384 74.1607 49.5048 75.9916 50.9121 77.5713C55.2811 82.4737 69.908 99.1421 74.6287 104.313Z" fill="#2563EB"></path>
  </svg>
);

const DownArrowIcon = ({ isUp }) => (
  <svg
    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: isUp ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN').format(amount);
};

const getDayOfWeek = (date) => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
};

const getFormattedDate = (date) => {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

const TourBookNow = ({ data }) => {
  const tour = data || {};
  const departureSchedules = tour?.departureSchedules || [];

  const [activeStep, setActiveStep] = useState(1);
  const [selectedDateId, setSelectedDateId] = useState(null);
  const [showAllDates, setShowAllDates] = useState(false);

  const [guests, setGuests] = useState({ adult: 2, child: 0, baby: 0 });

  const [form, setForm] = useState({ fullName: '', phone: '', email: '', notes: '' });
  const [errors, setErrors] = useState({ fullName: false, phone: false });

  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail && e.detail.source === 'top') {
        setSelectedDateId(e.detail.dateId);
        setGuests(e.detail.guests);
        if (e.detail.dateId && activeStep === 1) setActiveStep(2);
      }
    };
    window.addEventListener('syncTourBooking', handleSync);
    return () => window.removeEventListener('syncTourBooking', handleSync);
  }, [activeStep]);

  useEffect(() => {
    const handleOpenDate = () => {
      setActiveStep(1);
      const element = document.getElementById('tour-book-now');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    };
    
    const handleOpenContact = (e) => {
      if (e.detail) {
        setSelectedDateId(e.detail.dateId);
        setGuests(e.detail.guests);
        setActiveStep(3);
      }
    };

    window.addEventListener('openDateSelection', handleOpenDate);
    window.addEventListener('openContactForm', handleOpenContact);
    return () => {
      window.removeEventListener('openDateSelection', handleOpenDate);
      window.removeEventListener('openContactForm', handleOpenContact);
    };
  }, []);

  const selectedDateObj = useMemo(() =>
    departureSchedules.find(d => d.id === selectedDateId) || null,
    [selectedDateId, departureSchedules]);

  const adultPrice = selectedDateObj ? selectedDateObj.price : (departureSchedules[0]?.price || 0);
  const childPrice = adultPrice * 0.75;
  const babyPrice = adultPrice * 0.3;

  const totalGuests = guests.adult + guests.child + guests.baby;
  const totalPrice = (guests.adult * adultPrice) + (guests.child * childPrice) + (guests.baby * babyPrice);

  const initialDates = departureSchedules.slice(0, 5);
  const hiddenDates = departureSchedules.slice(5);

  const handleDateSelect = (id) => {
    setSelectedDateId(id);
    setActiveStep(2);
    setGuests({ adult: 2, child: 0, baby: 0 });

    window.dispatchEvent(new CustomEvent('syncTourBooking', {
      detail: {
        dateId: id,
        guests: { adult: 2, child: 0, baby: 0 },
        source: 'bottom'
      }
    }));
  };

  const handleReopenDate = () => {
    if (activeStep !== 1) setActiveStep(1);
  };

  const updateGuestCount = (type, delta) => {
    setGuests(prev => {
      let newCount = prev[type] + delta;
      if (type === 'adult' && newCount < 1) return prev;
      if (newCount < 0) return prev;
      if (selectedDateObj && (totalGuests + delta) > selectedDateObj.seats) return prev;
      const newGuests = { ...prev, [type]: newCount };
      window.dispatchEvent(new CustomEvent('syncTourBooking', {
        detail: { dateId: selectedDateId, guests: newGuests, source: 'bottom' }
      }));
      return newGuests;
    });
  };

  const handleConfirmGuests = () => {
    if (selectedDateId) setActiveStep(3);
  };

  const handleReopenGuests = () => {
    if (selectedDateId && activeStep !== 2) setActiveStep(2);
  };

  const { currentUser: user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      alert("Please login to book a tour");
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    const newErrors = {
      fullName: form.fullName.trim() === '',
      phone: form.phone.trim() === ''
    };
    setErrors(newErrors);

    if (newErrors.fullName || newErrors.phone) return;

    try {
      setIsSubmitting(true);
      
      // 1. Tạo booking trên backend
      const bookingRequest = {
        serviceId: tour.id,
        numAdults: guests.adult,
        numChildren: guests.child,
        note: form.notes,
        paymentProvider: 'vnpay', // Mặc định dùng VNPay
        passengers: [
          {
            fullName: form.fullName,
            phone: form.phone,
            email: form.email || user.email
          }
        ]
      };

      const bookingResponse = await createTourBooking(bookingRequest);
      
      // Chuyển hướng sang trang chọn phương thức thanh toán
      navigate('/tours-payment', { 
        state: { 
          bookingId: bookingResponse.id,
          booking: {
            tour: tour,
            schedule: selectedDateObj,
            passengers: guests,
            totalPrice: totalPrice
          }
        } 
      });

    } catch (error) {
      console.error("Booking failed:", error);
      alert(error.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateGuestSummary = () => {
    const parts = [];
    if (guests.adult > 0) parts.push(`${guests.adult} adult`);
    if (guests.child > 0) parts.push(`${guests.child} children`);
    if (guests.baby > 0) parts.push(`${guests.baby} baby`);
    return `${totalGuests} guests (${parts.join(', ')})`;
  };

  if (departureSchedules.length === 0) {
    return <div>No departure schedules available for this tour.</div>;
  }

  return (
    <div id="tour-book-now" className="tour-book-now-container" style={{ fontFamily: 'Arial, sans-serif', width: '100%', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)', backgroundColor: '#ffffff', overflow: 'hidden', boxSizing: 'border-box' }}>
      <style>
        {`
          .tour-book-now-container {
            max-width: 100%;
          }
          .dates-grid-header, .dates-grid-row {
            display: grid;
            grid-template-columns: 1.5fr 1.5fr 1fr 1.5fr 40px;
            gap: 16px;
            align-items: center;
            padding: 16px;
          }
          .dates-grid-header {
            font-weight: bold;
            color: #4b5563;
            font-size: 14px;
            padding: 0 16px 12px 16px;
          }
          .dates-grid-row {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background-color: #ffffff;
            cursor: pointer;
            transition: background-color 0.2s;
            margin-bottom: 12px;
          }
          .dates-grid-row.selected {
            background-color: #f3f4f6;
          }
          .return-date-col {
            display: block;
          }
          .return-date-header {
            display: block;
          }
          @media (max-width: 1024px) {
            .dates-grid-header, .dates-grid-row {
              grid-template-columns: 2fr 1fr 1.2fr 40px;
              gap: 12px;
              padding: 12px;
            }
            .return-date-col, .return-date-header {
              display: none;
            }
            .dates-grid-header {
              font-size: 12px;
              padding: 0 12px 8px 12px;
            }
            .dates-grid-row {
              font-size: 13px;
            }
            .departure-date-text {
              font-size: 13px;
            }
            .departure-day {
              font-size: 14px;
            }
            .status-badge {
              font-size: 11px;
              padding: 3px 8px;
            }
            .tour-price {
              font-size: 13px;
            }
          }
          @media (max-width: 768px) {
            .dates-grid-header, .dates-grid-row {
              grid-template-columns: 1.5fr 1fr 1.2fr 32px;
              gap: 8px;
              padding: 10px;
            }
            .dates-grid-header {
              font-size: 10px;
              padding: 0 8px 6px 8px;
            }
            .dates-grid-row {
              font-size: 11px;
            }
            .departure-date-text {
              font-size: 11px;
            }
            .departure-day {
              font-size: 12px;
            }
            .status-badge {
              font-size: 9px;
              padding: 2px 6px;
            }
            .tour-price {
              font-size: 11px;
            }
            .arrow-icon {
              width: 20px;
            }
          }
        `}
      </style>
      <div style={{ backgroundColor: '#2563EB', padding: '16px 24px' }}>
        <h2 style={{ color: '#ffffff', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Book Tour Now</h2>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        <div>
          <div
            onClick={activeStep !== 1 ? handleReopenDate : undefined}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: activeStep !== 1 ? 'pointer' : 'default', marginBottom: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {selectedDateId && activeStep !== 1 ? (
                <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckIcon />
                </div>
              ) : (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2563EB', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                  1
                </div>
              )}
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>Select your departure date</h3>
            </div>

            {activeStep !== 1 && selectedDateObj && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontWeight: '500' }}>
                {getFormattedDate(new Date(selectedDateObj.departure))} - {getFormattedDate(new Date(selectedDateObj.return))}
                <DownArrowIcon isUp={false} />
              </div>
            )}
          </div>

          {activeStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="dates-grid-header">
                <div style={{ textAlign: 'left' }}>Departure Date</div>
                <div className="return-date-header" style={{ textAlign: 'center' }}>Return Date</div>
                <div style={{ textAlign: 'center' }}>Status</div>
                <div style={{ textAlign: 'right' }}>Tour Price</div>
                <div></div>
              </div>

              {initialDates.map((item) => {
                const isSelected = selectedDateId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleDateSelect(item.id)}
                    className={`dates-grid-row ${isSelected ? 'selected' : ''}`}
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div className="departure-day" style={{ fontWeight: 'bold', color: '#111827' }}>{getDayOfWeek(new Date(item.departure))}</div>
                      <div className="departure-date-text" style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>{getFormattedDate(new Date(item.departure))}</div>
                    </div>
                    <div className="return-date-col" style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 'bold', color: '#111827' }}>{getDayOfWeek(new Date(item.return))}</div>
                      <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>{getFormattedDate(new Date(item.return))}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div className="status-badge" style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>
                        {item.seats} seats remaining
                      </div>
                    </div>
                    <div className="tour-price" style={{ textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>
                      {formatCurrency(item.price)} VND/person
                    </div>
                    <div className="arrow-icon" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      {isSelected ? <CheckIcon /> : <RightArrowIcon />}
                    </div>
                  </div>
                )
              })}

              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: showAllDates ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.4s ease-in-out',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: showAllDates ? '12px' : '0' }}>
                    {hiddenDates.map((item) => {
                      const isSelected = selectedDateId === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleDateSelect(item.id)}
                          className={`dates-grid-row ${isSelected ? 'selected' : ''}`}
                        >
                          <div style={{ textAlign: 'left' }}>
                            <div className="departure-day" style={{ fontWeight: 'bold', color: '#111827' }}>{getDayOfWeek(new Date(item.departure))}</div>
                            <div className="departure-date-text" style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>{getFormattedDate(new Date(item.departure))}</div>
                          </div>
                          <div className="return-date-col" style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', color: '#111827' }}>{getDayOfWeek(new Date(item.return))}</div>
                            <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>{getFormattedDate(new Date(item.return))}</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div className="status-badge" style={{ display: 'inline-block', backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>
                              {item.seats} seats remaining
                            </div>
                          </div>
                          <div className="tour-price" style={{ textAlign: 'right', fontWeight: 'bold', color: '#111827' }}>
                            {formatCurrency(item.price)} VND/person
                          </div>
                          <div className="arrow-icon" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {isSelected ? <CheckIcon /> : <RightArrowIcon />}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {hiddenDates.length > 0 && (
                <div
                  onClick={() => setShowAllDates(!showAllDates)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', cursor: 'pointer', color: '#2563EB', fontWeight: 'bold', marginTop: '8px' }}
                >
                  <div>{showAllDates ? 'Show less' : `See ${hiddenDates.length} more departure dates`}</div>
                  <DownArrowIcon isUp={showAllDates} />
                </div>
              )}
            </div>
          )}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: 0 }} />

        <div>
          <div
            onClick={handleReopenGuests}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: (selectedDateId && activeStep !== 2) ? 'pointer' : 'default', marginBottom: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {activeStep > 2 ? (
                <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckIcon />
                </div>
              ) : (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2563EB', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                  2
                </div>
              )}
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>Select the number of guests</h3>
            </div>

            {activeStep > 2 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontWeight: '500' }}>
                {totalGuests} guests
                <DownArrowIcon isUp={false} />
              </div>
            )}
          </div>

          {activeStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '44px' }}>
              {!selectedDateObj ? (
                <div style={{ color: '#ef4444', padding: '16px', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
                  Please select a departure date first.
                </div>
              ) : (
                <>
                  {[
                    { type: 'adult', label: 'Adult (>10 year old)', price: adultPrice },
                    { type: 'child', label: 'Children (2 - 10 year old)', price: childPrice },
                    { type: 'baby', label: 'Baby (<2 year old)', price: babyPrice }
                  ].map((guestItem) => (
                    <div key={guestItem.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: '500', color: '#111827' }}>{guestItem.label}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {guests[guestItem.type] > 0 && (
                          <div style={{ color: '#6b7280', fontSize: '15px' }}>
                            x {formatCurrency(guestItem.price)}
                          </div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '4px 8px' }}>
                          <button
                            onClick={() => updateGuestCount(guestItem.type, -1)}
                            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#4b5563', width: '24px' }}
                          >-</button>
                          <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{guests[guestItem.type]}</span>
                          <button
                            onClick={() => updateGuestCount(guestItem.type, 1)}
                            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#4b5563', width: '24px' }}
                          >+</button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '-4px' }}>
                    still has {selectedDateObj.seats - totalGuests} spots available
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Total</div>
                      <div style={{ color: '#6b7280' }}>{totalGuests} guests</div>
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: '#2563EB' }}>
                      {formatCurrency(totalPrice)} VND
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                    <Button
                      onClick={handleConfirmGuests}
                      disabled={totalGuests === 0}
                      variant="primary"
                      size="md"
                    >
                      Confirm
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: 0 }} />

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2563EB', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
              3
            </div>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>Contact information</h3>
          </div>

          {activeStep === 3 && selectedDateId && (
            <div style={{ paddingLeft: '44px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '500' }}>Full name <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    style={{ padding: '12px', borderRadius: '6px', border: `1px solid ${errors.fullName ? 'red' : '#d1d5db'}`, outline: 'none' }}
                  />
                  {errors.fullName && <span style={{ color: 'red', fontSize: '12px' }}>You must fill in this information.</span>}
                </div>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '500' }}>Contact phone number <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={{ padding: '12px', borderRadius: '6px', border: `1px solid ${errors.phone ? 'red' : '#d1d5db'}`, outline: 'none' }}
                  />
                  {errors.phone && <span style={{ color: 'red', fontSize: '12px' }}>You must fill in this information.</span>}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '500' }}>Email (optional)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '500' }}>Notes / Additional requests</label>
                <textarea
                  placeholder="Examples include: vegetarian diet, history of allergies, etc."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', width: '100%', minHeight: '80px', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ backgroundColor: '#fefce8', padding: '24px', borderRadius: '8px', border: '1px solid #fef08a', marginTop: '16px' }}>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold' }}>Tour booking summary</h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ color: '#4b5563', fontWeight: '500' }}>Departure date:</div>
                    <div style={{ fontWeight: 'bold' }}>
                      {getFormattedDate(new Date(selectedDateObj.departure))} - {getFormattedDate(new Date(selectedDateObj.return))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ color: '#4b5563', fontWeight: '500' }}>Number of guests:</div>
                    <div style={{ fontWeight: 'bold' }}>{generateGuestSummary()}</div>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '8px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Total</div>
                    <div style={{ fontWeight: 'bold', fontSize: '24px', color: '#2563EB' }}>
                      {formatCurrency(totalPrice)} VND
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                >
                  Book Now
                </Button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TourBookNow;