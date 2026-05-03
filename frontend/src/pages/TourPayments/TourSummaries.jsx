import React from 'react';
import { mockData } from '../../data/mockData';

const TourSummaries = ({ tour, schedule, passengers }) => {
  const user = mockData?.users?.[0] || {};
  const guestsCount = (passengers?.adults || 0) + (passengers?.children || 0) + (passengers?.infants || 0);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const startDate = formatDate(schedule?.departure);
  const returnDate = formatDate(schedule?.return);
  const duration = tour?.duration || 'N/A';

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
      <div className="bg-[#0194F3] text-white p-4 flex items-center gap-3 min-h-[64px] md:min-h-[72px]">
        <svg width="28px" height="28px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <g strokeWidth="0"></g>
          <g strokeLinecap="round" strokeLinejoin="round"></g>
          <g>
            <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" d="M4.36,20.59H1.5V11.05A1.9,1.9,0,0,1,3.41,9.14h15.8A1.91,1.91,0,0,1,21,10.44l1.47,4.42v5.73H19.64"></path>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="15.82" y1="20.59" x2="8.18" y2="20.59"></line>
            <circle fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" cx="6.27" cy="20.59" r="1.91"></circle>
            <circle fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" cx="17.73" cy="20.59" r="1.91"></circle>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="22.5" y1="14.86" x2="4.36" y2="14.86"></line>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="12" y1="12" x2="12" y2="14.86"></line>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="16.77" y1="12" x2="16.77" y2="14.86"></line>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="7.23" y1="12" x2="7.23" y2="14.86"></line>
            <path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" d="M6.11,1.5H16a2.7,2.7,0,0,1,2.7,2.7V5.32a0,0,0,0,1,0,0H3.41a0,0,0,0,1,0,0V4.2A2.7,2.7,0,0,1,6.11,1.5Z"></path>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="7.23" y1="1.5" x2="7.23" y2="5.32"></line>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="11.05" y1="1.5" x2="11.05" y2="5.32"></line>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="14.86" y1="1.5" x2="14.86" y2="5.32"></line>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="1.5" y1="5.32" x2="20.59" y2="5.32"></line>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="4.36" y1="9.14" x2="4.36" y2="5.32"></line>
            <line fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.91" x1="17.73" y1="9.14" x2="17.73" y2="5.32"></line>
          </g>
        </svg>
        <span className="font-bold text-lg md:text-xl">Tour Summary</span>
      </div>

      <div className="p-6 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{tour?.title}</h3>

        <div className="flex items-center justify-between relative mb-8 w-full">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-gray-200 z-0"></div>
          
          <div className="border border-gray-200 rounded-lg p-2 w-[38%] text-center relative z-10 bg-white">
            <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider whitespace-nowrap">Start Date</p>
            <p className="font-bold text-gray-800 text-[11px] whitespace-nowrap">{startDate}</p>
            <p className="text-[10px] text-gray-500 mt-1 whitespace-nowrap">From 08:00 AM</p>
          </div>

          <div className="relative z-10 bg-white px-1">
            <span className="text-[10px] font-bold text-[#0194F3] bg-blue-50 px-2 py-1 rounded-full border border-blue-100 whitespace-nowrap block">
              {duration}
            </span>
          </div>

          <div className="border border-gray-200 rounded-lg p-2 w-[38%] text-center relative z-10 bg-white">
            <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider whitespace-nowrap">Return Date</p>
            <p className="font-bold text-gray-800 text-[11px] whitespace-nowrap">{returnDate}</p>
            <p className="text-[10px] text-gray-500 mt-1 whitespace-nowrap">Before 09:00 PM</p>
          </div>
        </div>

        <div className="flex flex-col mb-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0194F3]">
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <path fillRule="evenodd" clipRule="evenodd" d="M19.7778 2H4.22222C3 2 2 3 2 4.22222V19.7778C2 21 3 22 4.22222 22H19.7778C21 22 22 21 22 19.7778V4.22222C22 3 21 2 19.7778 2ZM9 9C9 7.3425 10.3425 6 12 6C13.6575 6 15 7.3425 15 9C15 10.6575 13.6575 12 12 12C10.3425 12 9 10.6575 9 9ZM12 7.5C12.825 7.5 13.5 8.175 13.5 9C13.5 9.825 12.825 10.5 12 10.5C11.175 10.5 10.5 9.825 10.5 9C10.5 8.175 11.175 7.5 12 7.5ZM12 15C14.025 15 16.35 15.9675 16.5 16.5H7.5C7.6725 15.96 9.9825 15 12 15ZM12 13.5C9.9975 13.5 6 14.505 6 16.5V18H18V16.5C18 14.505 14.0025 13.5 12 13.5Z" fill="currentColor"></path>
                </g>
              </svg>
            </div>
            <span className="font-bold text-gray-800 text-lg">{guestsCount} Guests</span>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h4 className="text-lg font-bold text-gray-800 mb-5">Contact Details</h4>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0194F3] mt-1 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24px" height="24px" viewBox="0 0 24 24">
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                </g>
              </svg>
            </div>
            <div className="flex flex-col space-y-1.5">
              <span className="font-bold text-gray-800 text-base">{user?.fullName}</span>
              <span className="text-gray-600 text-sm font-medium">{user?.phone}</span>
              <span className="text-gray-600 text-sm font-medium">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourSummaries;
