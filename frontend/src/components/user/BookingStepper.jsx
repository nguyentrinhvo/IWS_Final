import React from 'react';

const BookingStepper = ({ currentStep = 3, mode = 'flight' }) => {
  const flightSteps = [
    { id: 1, name: 'Search' },
    { id: 2, name: 'Select Flight' },
    { id: 3, name: 'Passenger Info' },
    { id: 4, name: 'Payment' },
    { id: 5, name: 'Done' }
  ];

  const hotelSteps = [
    { id: 1, name: 'Search' },
    { id: 2, name: 'Select Hotel' },
    { id: 3, name: 'Booking' },
    { id: 4, name: 'Payment' },
    { id: 5, name: 'Done' }
  ];

  const transportSteps = [
    { id: 1, name: 'Search' },
    { id: 2, name: 'Select Seats' },
    { id: 3, name: 'Booking' },
    { id: 4, name: 'Payment' },
    { id: 5, name: 'Done' }
  ];

  const steps = mode === 'hotel' ? hotelSteps : mode === 'transport' ? transportSteps : flightSteps;

  return (
    <div className="w-full py-6 md:py-10">
      <div className="max-w-[800px] mx-auto px-4">
        <div className="relative flex justify-between">
          {/* Background Line */}
          <div className="absolute top-[18px] left-0 w-full h-[2px] bg-gray-200 -z-0"></div>
          
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#7978E9] text-white ring-4 ring-[#7978E9]/20' 
                      : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <span className={`mt-2 text-[10px] md:text-xs font-bold uppercase tracking-wider ${
                  isActive ? 'text-[#1a2b49]' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingStepper;
