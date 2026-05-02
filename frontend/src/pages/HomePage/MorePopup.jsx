// src/pages/HomePage/MorePopup.jsx
import React from 'react';
import {
  AttractionsIcon,
  SpaRelaxationIcon,
  RecreationalSportsIcon,
  GamesActivitiesIcon,
  TransportsIcon,
  CulinaryExperiencesIcon,
  PlaygroundIcon,
  EventsIcon
} from './SearchIcons'; // adjust path to your SearchIcons.jsx

const MorePopup = ({ isOpen, onClose, t }) => {
  // Data (copied from original)
  const activitiesToTryItems = [
    { id: 'beautySpa', label: t('beautySpa'), icon: 'spaRelaxation' },
    { id: 'playground', label: t('playground'), icon: 'playground' },
    { id: 'classesWorkshops', label: t('classesWorkshops'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /> },
    { id: 'events', label: t('events'), icon: 'events' },
    { id: 'attractions', label: t('attractions'), icon: 'attractions' },
    { id: 'tours', label: t('tours'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /> },
  ];

  const otherServicesItems = [
    { id: 'travelInsurance', label: t('travelInsurance'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /> },
    { id: 'giftVoucher', label: t('giftVoucher'), icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" /> },
  ];

  const renderPopupIcon = (icon) => {
    if (typeof icon === 'string') {
      switch (icon) {
        case 'attractions': return <AttractionsIcon className="w-6 h-6 text-[#CC8118]" />;
        case 'spaRelaxation': return <SpaRelaxationIcon className="w-6 h-6 text-[#CC8118]" />;
        case 'recreationalSports': return <RecreationalSportsIcon className="w-6 h-6 text-[#CC8118]" />;
        case 'gamesActivities': return <GamesActivitiesIcon className="w-6 h-6 text-[#CC8118]" />;
        case 'transports': return <TransportsIcon className="w-6 h-6 text-[#CC8118]" />;
        case 'culinaryExperiences': return <CulinaryExperiencesIcon className="w-6 h-6 text-[#CC8118]" />;
        case 'playground': return <PlaygroundIcon className="w-6 h-6 text-[#CC8118]" />;
        case 'events': return <EventsIcon className="w-6 h-6 text-[#CC8118]" />;
        default: return null;
      }
    }
    return (
      <svg className="w-6 h-6 text-[#CC8118]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        {icon}
      </svg>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      ></div>

      <div
        className={`bg-white rounded-3xl w-[1000px] h-[500px] relative flex flex-col shadow-2xl transition-all duration-300 ease-out overflow-hidden ${
          isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <svg className="w-6 h-6 text-[#180B51]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full h-full p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold text-[#180B51] mb-8">{t('moreProducts')}</h2>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#180B51] mb-5">{t('activitiesToTry')}</h3>

            <div className="flex flex-wrap gap-y-4 gap-x-[2%] w-full">
              {activitiesToTryItems.map((item) => (
                <div
                  key={item.id}
                  className="w-[32%] h-[60px] flex items-center p-2 rounded-xl border border-[#D9D9D9] bg-white cursor-pointer hover:border-[#CC8118] hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mr-3">
                    {renderPopupIcon(item.icon)}
                  </div>
                  <span className="font-bold text-[#180B51] text-[15px] leading-tight flex-1 break-words pr-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#180B51] mb-5">{t('otherServices')}</h3>

            <div className="flex flex-wrap gap-y-4 gap-x-[2%] w-full">
              {otherServicesItems.map((item) => (
                <div
                  key={item.id}
                  className="w-[32%] h-[60px] flex items-center p-2 rounded-xl border border-[#D9D9D9] bg-white cursor-pointer hover:border-[#CC8118] hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mr-3">
                    <svg className="w-6 h-6 text-[#CC8118]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <span className="font-bold text-[#180B51] text-[15px] leading-tight flex-1 break-words pr-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorePopup;