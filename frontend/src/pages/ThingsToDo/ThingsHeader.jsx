import React from 'react';
import { useGlobal } from '../../context/GlobalContext';

const ThingsHeader = ({ onSearch }) => {
  const { t } = useGlobal();

  return (
    <div className="things_header_container relative w-full h-[300px] flex flex-col items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://cdn-media.sforum.vn/storage/app/media/ctvseo_maihue/hinh-nen-nui-doi/hinh-nen-nui-doi-49.jpg')" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 md:px-6">
        
        {/* Title */}
        <h1 className="hero_title text-white text-[36px] md:text-[48px] font-bold italic [-webkit-text-stroke:1.5px_black] drop-shadow-md text-center mb-6">
          {t('thingsToIn')}
        </h1>

        {/* Search Row */}
        <div className="search_row_wrapper flex flex-col md:flex-row w-full gap-4 h-auto md:h-[73px] justify-center items-center">
          
          {/* Pick a destination button */}
          <div className="pick_destination_btn h-[56px] md:h-[73px] bg-transparent border-[1px] border-white rounded-full flex items-center px-4 md:px-6 cursor-pointer shrink-0 min-w-fit gap-2 hover:bg-white/10 transition-colors">
            {/* Position Icon */}
            <svg className="w-6 h-6 text-[#007BFF]" fill="currentColor" version="1.1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M255.996,0C145.058,0,55.138,89.929,55.138,200.866c0,68.454,34.648,128.363,86.55,165.174 c47.356,33.594,57.811,41.609,74.462,73.4c13.174,25.147,34.541,69.279,34.541,69.279c1.004,2.008,3.052,3.281,5.306,3.281 c2.244,0,4.31-1.274,5.313-3.281c0,0,21.368-44.132,34.541-69.279c16.642-31.791,27.106-39.806,74.454-73.4 c51.91-36.811,86.558-96.72,86.558-165.174C456.862,89.929,366.925,0,255.996,0z M255.996,335.473 c-74.331,0-134.599-60.268-134.599-134.608c0-74.339,60.268-134.607,134.599-134.607c74.339,0,134.606,60.268,134.606,134.607 C390.602,275.205,330.335,335.473,255.996,335.473z"></path>
            </svg>
            
            <span className="text-white font-bold whitespace-nowrap text-[16px]">
              {t('pickADestination')}
            </span>
            
            {/* Down Icon */}
            <svg className="w-6 h-6 text-[#007BFF]" fill="currentColor" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.125 16.313l7.688-7.688 3.594 3.719-11.094 11.063-11.313-11.313 3.5-3.531z"></path>
            </svg>
          </div>

          {/* Search Input Wrapper */}
          <div className="things_to_do_input_wrapper flex-1 w-full border-[5px] border-[#D9D9D9] rounded-full flex relative bg-white h-[56px] md:h-[73px]">
            <div className="flex-1 h-full flex items-center px-4 gap-4 relative min-w-0">
              <svg className="w-8 h-8 text-[#180B51] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                placeholder={t('thingsToDoPlaceholder')}
                className="w-full h-full bg-transparent outline-none text-[#180B51] text-lg font-medium placeholder-[#180B51]/40 truncate"
                onChange={(e) => onSearch && onSearch(e.target.value)}
              />
            </div>

            <div className="w-[65px] md:w-[85px] h-full bg-[#CC8118] flex items-center justify-center cursor-pointer rounded-r-full shrink-0 transition-colors hover:bg-[#b57215]">
              <svg className="w-7 h-7 text-white font-bold" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ThingsHeader;
