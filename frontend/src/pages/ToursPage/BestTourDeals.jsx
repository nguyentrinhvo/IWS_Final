import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { bestTourDealsData } from '../../data/mockData';
import Button from '../../components/Button';

const TitleIcon = () => (
  <svg width="40px" height="40px" viewBox="0 0 1024 1024" fill="currentColor" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <path d="M556.19584 720.05632l-150.50752-29.55264c2.17088-16.71168 3.76832-32.84992 4.64896-48.31232l103.17824-69.28384a1307.648 1307.648 0 0 1 42.68032 147.1488z m-123.57632-314.38848l-50.8928 34.16064c4.64896 11.71456 9.05216 24.064 12.82048 37.45792l86.87616 17.05984c-13.90592-29.81888-29.42976-58.44992-46.87872-84.80768a82.7392 82.7392 0 0 1-1.92512-3.87072z m76.02176 153.82528a917.0944 917.0944 0 0 0-20.21376-49.68448l-90.19392-17.7152c9.23648 37.74464 14.4384 81.73568 12.9024 132.85376l97.50528-65.45408zM248.99584 324.77184a42.27072 42.27072 0 0 0-2.7648 14.72512c0 16.56832 9.46176 30.78144 23.22432 38.01088-1.45408 4.9152-2.47808 10.01472-2.47808 15.36a54.8864 54.8864 0 0 0 54.86592 54.8864 54.72256 54.72256 0 0 0 49.52064-31.62112c1.67936 3.4816 3.39968 6.94272 5.0176 10.6496l50.46272-33.93536a212.74624 212.74624 0 0 0-2.3552-5.18144 178.50368 178.50368 0 0 1-8.23296-19.90656c6.28736 3.584 13.45536 5.81632 21.21728 5.81632a43.008 43.008 0 1 0-30.57664-73.216c4.64896-62.83264 46.36672-119.25504 111.3088-150.9376a189.48096 189.48096 0 0 1 181.06368 8.13056c-52.87936-73.80992-152.71936-101.13024-237.1584-59.92448a188.928 188.928 0 0 0-98.28352 115.65056c-0.2048-36.51584 9.78944-68.38272 37.888-98.03776a189.39904 189.39904 0 0 1 191.32416-51.4048C523.10016 5.81632 419.59424 4.77184 348.38528 66.02752a188.88704 188.88704 0 0 0-65.67936 133.95968c-33.62816-50.36032-96.01024-77.18912-158.33088-62.27968-71.63904 17.1008-118.55872 83.37408-113.80736 154.46016a148.5824 148.5824 0 0 1 105.6768-95.15008 148.74624 148.74624 0 0 1 157.40928 60.928 188.96896 188.96896 0 0 0-153.27232 6.32832c-84.21376 41.59488-123.71968 137.216-97.66912 224.256a189.17376 189.17376 0 0 1 226.28352-163.75808z m378.59328 517.50912l69.79584-13.7216c-1.024-7.76192-1.76128-15.23712-2.17088-22.40512l-47.86176-32.13312a609.8944 609.8944 0 0 0-19.7632 68.25984z m80.95744-130.048l-23.63392-15.85152c-0.43008 0.88064-0.73728 1.536-0.90112 1.78176a304.90624 304.90624 0 0 0-21.77024 39.36256l40.28416-7.94624c1.78176-6.16448 3.7888-11.8784 6.02112-17.34656z m-49.5616 32.52224c-3.33824 7.55712-6.43072 15.29856-9.35936 23.08096l45.21984 30.33088c-0.7168-23.71584 1.65888-44.09344 6.00064-61.66528l-41.86112 8.25344z m-48.51712-206.88896a88.04352 88.04352 0 0 1 88.7808 23.87968c13.0048 13.74208 17.65376 28.48768 17.55136 45.42464a87.77728 87.77728 0 0 0-45.60896-53.6576 88.08448 88.08448 0 0 0-110.08 27.81184 88.02304 88.02304 0 0 1 84.04992-3.76832c30.14656 14.68416 49.52064 40.87808 51.63008 70.02112a19.98848 19.98848 0 1 0-14.19264 33.97632c3.584 0 6.90176-1.024 9.80992-2.6624-1.06496 3.072-2.29376 6.16448-3.80928 9.23648a31.86688 31.86688 0 0 1-1.10592 2.41664l23.4496 15.70816c0.73728-1.65888 1.536-3.29728 2.31424-4.9152a25.37472 25.37472 0 0 0 48.41472-10.77248c0-2.4576-0.45056-4.87424-1.1264-7.14752a19.84512 19.84512 0 0 0 10.79296-17.6128 19.43552 19.43552 0 0 0-1.29024-6.84032 87.73632 87.73632 0 0 1 56.58624 7.24992 88.02304 88.02304 0 0 1 48.41472 68.7104 87.9616 87.9616 0 0 0-45.32224-104.01792 87.63392 87.63392 0 0 0-71.12704-2.92864 69.12 69.12 0 0 1 73.0112-28.32384 69.0176 69.0176 0 0 1 49.00864 44.15488 68.99712 68.99712 0 0 0-126.27968-42.76224 87.49056 87.49056 0 0 0-30.43328-62.1568 87.79776 87.79776 0 0 0-113.43872-1.024z m109.34272 379.74016c-10.89536-30.53568-17.92-58.12224-21.6064-82.65728l-72.17152 14.21312c-1.6384 7.35232-3.09248 14.39744-4.42368 21.25824l68.77184 46.20288-11.96032-0.32768-58.10176-39.05536c-2.60096 14.336-4.52608 27.09504-5.98016 37.888-8.25344-0.12288-16.65024-0.12288-24.9856-0.16384a1742.5408 1742.5408 0 0 0-17.59232-119.48032l-183.17312 123.02336c-9.07264 0.4096-17.89952 0.83968-26.66496 1.29024l207.0528-139.01824a1662.8736 1662.8736 0 0 0-9.4208-45.91616l-155.66848-30.57664c-9.46176 63.11936-28.7744 135.12704-60.88704 216.53504-134.22592 7.68-224.82944 22.03648-224.82944 38.5024 0 24.55552 200.4992 44.48256 447.7952 44.48256 247.31648 0 447.77472-19.92704 447.77472-44.48256 0.02048-19.21024-122.53184-35.5328-293.92896-41.71776z"></path>
    </g>
  </svg>
);

const RightArrowIcon = () => (
  <svg fill="currentColor" width="20px" height="20px" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <path d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z"></path>
    </g>
  </svg>
);

const ClockIcon = () => (
  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LocationIcon = () => (
  <svg width="20px" height="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M256 17.108c-75.73 0-137.122 61.392-137.122 137.122.055 23.25 6.022 46.107 11.58 56.262L256 494.892l119.982-274.244h-.063c11.27-20.324 17.188-43.18 17.202-66.418C393.122 78.5 331.73 17.108 256 17.108zm0 68.56a68.56 68.56 0 0 1 68.56 68.562A68.56 68.56 0 0 1 256 222.79a68.56 68.56 0 0 1-68.56-68.56A68.56 68.56 0 0 1 256 85.67z" />
  </svg>
);

const BestTourDeals = () => {
  const { t, language, currency, rates } = useGlobal();

  const getPrice = (priceVnd) => {
    if (currency === 'VND' || !rates || !rates.VND) {
      const formattedNumber = new Intl.NumberFormat(language === 'VI' ? 'vi-VN' : 'en-US').format(priceVnd);
      return `${formattedNumber} VND`;
    }
    const converted = priceVnd / rates.VND;
    const formattedNumber = new Intl.NumberFormat(language === 'VI' ? 'vi-VN' : 'en-US', {
      maximumFractionDigits: 0
    }).format(converted);
    return `${formattedNumber} ${currency}`;
  };

  return (
    <div className="w-full bg-[#ebf0f2]">
      <div className="w-full max-w-[1320px] mx-auto py-8 md:py-12 px-4 md:px-6">
        <div className="flex items-center gap-3 mb-2 text-[#180B51] flex-wrap">
          <TitleIcon />
          <h2 className="text-2xl md:text-3xl font-bold break-words">{t('bestTourDealsTitle')}</h2>
        </div>
        <p className="text-[#180B51] mb-6 md:mb-8 break-words">{t('bestTourDealsDesc')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestTourDealsData.map((tour, index) => {
            const cardContent = (
              <div className="h-[520px] border border-gray-200 rounded-t-xl rounded-b-xl flex flex-col bg-white shadow-md transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                <img
                  src={tour.image}
                  alt={tour.titleTemplate}
                  className="w-full h-[220px] object-cover rounded-t-xl"
                />
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-2 text-sm flex-wrap">
                      <span className="font-bold">{tour.rating}</span>
                      <span>/ 5</span>
                      <span className="text-gray-400 ml-1">({tour.reviewsCount} {t('reviews')})</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-4 leading-snug line-clamp-2 hover:text-blue-600 transition-colors duration-200 break-words">
                      {tour.titleTemplate}
                    </h3>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
                      <div className="flex items-center gap-1 text-black font-medium">
                        <ClockIcon />
                        <span>{tour.days} {t('days')}</span>
                      </div>
                      <span className="text-gray-300 hidden sm:inline">|</span>
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="text-gray-400"><LocationIcon /></span>
                        <span className="text-gray-500 whitespace-nowrap">{t('departureFrom')}</span>
                        <span className="text-black font-bold whitespace-normal break-words">{tour.departureLocation}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <div className="font-bold text-xl md:text-2xl text-black break-words">
                        {getPrice(tour.price)}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 break-words">
                        {t('departureDate')} {tour.departureDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );

            if (index === 0) {
              return (
                <Link key={tour.id} to={`/tour/${tour.id}`}>
                  {cardContent}
                </Link>
              );
            }
            return (
              <div key={tour.id}>
                {cardContent}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8 md:mt-10">
          <Button variant="primary" className="gap-2">
            {t('seeMore')}
            <RightArrowIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BestTourDeals;