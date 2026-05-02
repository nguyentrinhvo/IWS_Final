import React from 'react';
import { useGlobal } from '../../context/GlobalContext';

export default function Footer() {
  const { t } = useGlobal();

  const paymentPartners = [
    'visa', 'momo', 'paypal', 'vietqr', 'bidv',
    'mastercard', 'mbbank', 'techcombank', 'tpbank', 'vietcombank'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Instagram', icon: 'instagram' },
    { name: 'Tiktok', icon: 'tiktok' },
    { name: 'Youtube', icon: 'youtube' },
    { name: 'X', icon: 'x' }
  ];

  return (
    <footer className="w-full bg-[#7C4A4A] mt-auto">
      <div className="w-full min-h-[570px] flex justify-center pb-[70px]">
        <div className="w-full px-[16px] md:px-[24px] lg:px-4 lg:max-w-[1320px] mx-auto flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap pt-[40px] gap-10 md:gap-[60px] lg:gap-[140px] items-start">
          
          <div className="w-full md:w-auto lg:w-[330px] flex flex-col items-start">
            <img 
              src="/images/logo_web.png" 
              alt="Logo" 
              className="w-[204px] h-[204px] object-contain block -mt-2" 
            />
            <div className="flex gap-4 mt-[10px]">
              <img src="/icons/iata.svg" alt="IATA" className="h-12 w-auto" />
              <img src="/icons/bocongthuong.svg" alt="Bo Cong Thuong" className="h-12 w-auto" />
            </div>
            <div className="mt-[70px]">
              <h3 className="font-bold text-white text-[18px] mb-4">{t('paymentPartners')}</h3>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-3">
                {paymentPartners.map((partner) => (
                  <div key={partner} className="bg-white rounded-md p-1.5 flex items-center justify-center h-[36px]">
                    <img src={`/icons/${partner}.svg`} alt={partner} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto lg:w-[168px] flex flex-col">
            <div>
              <h3 className="font-bold text-white text-[18px] mb-6">{t('aboutHanuvivu')}</h3>
              <ul className="flex flex-col gap-3 text-white">
                <li className="cursor-pointer hover:underline transition-all duration-200">{t('contactUs')}</li>
                <li className="cursor-pointer hover:underline transition-all duration-200">{t('helpCenter')}</li>
                <li className="cursor-pointer hover:underline transition-all duration-200">{t('aboutUs')}</li>
              </ul>
            </div>
            <div className="mt-[40px] md:mt-[70px]">
              <h3 className="font-bold text-white text-[18px] mb-6">{t('followUsOn')}</h3>
              <ul className="flex flex-col gap-3 text-white">
                {socialLinks.map((social) => (
                  <li key={social.name} className="flex items-center gap-3 cursor-pointer hover:underline transition-all duration-200">
                    <img src={`/icons/${social.icon}.svg`} alt={social.name} className="w-5 h-5" />
                    <span>{social.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col lg:flex-1">
            <div className="flex flex-col md:flex-row gap-10 md:gap-[60px] lg:gap-[140px]">
              <div className="w-full md:w-[140px] flex flex-col">
                <h3 className="font-bold text-white text-[18px] mb-6">{t('followUsOn')}</h3>
                <ul className="flex flex-col gap-3 
                
                text-white">
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('tours')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('hotels')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('flights')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('carsTrains')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('thingsToDo')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('villas')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('apartments')}</li>
                </ul>
              </div>

              <div className="w-full md:w-[180px] flex flex-col">
                <h3 className="font-bold text-white text-[18px] mb-6">{t('others')}</h3>
                <ul className="flex flex-col gap-3 text-white">
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('hanuvivuAffiliate')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('blog')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('privacyNotice')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('termsConditions')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('news')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('travelMagazine')}</li>
                  <li className="cursor-pointer hover:underline transition-all duration-200">{t('help')}</li>
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-[462px] mt-[40px] md:mt-[70px]">
              <h3 className="font-bold text-white text-[18px] mb-4 leading-snug">{t('stayUpdated')}</h3>
              <div className="w-full h-[52px] bg-white rounded-lg flex items-center px-1.5 py-1.5 shadow-sm">
                <svg className="w-6 h-6 text-gray-400 ml-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  placeholder={t('yourEmailAddress')}
                  className="flex-1 w-full bg-transparent outline-none px-3 text-gray-700 placeholder-gray-400 text-[15px]"
                />
                <button className="bg-[#CD6F1E] hover:bg-[#b8631b] transition-colors text-white font-bold h-full px-6 rounded-md cursor-pointer flex-shrink-0">
                  {t('send')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full h-auto min-h-[100px] py-6 border-t border-white/20 flex flex-col items-center justify-center px-[16px] md:px-[24px] text-center">
        <p className="text-white text-[14px] font-medium max-w-full break-words">{t('copyright')}</p>
        <p className="text-white text-[14px] font-medium mt-1 max-w-full break-words">{t('websiteOperator')}</p>
      </div>
    </footer>
  );
}