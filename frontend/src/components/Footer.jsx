import React from 'react';
import { useGlobal } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

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
      <div className="w-full h-[570px] flex justify-center">
        <div className="w-full max-w-[1320px] mx-auto px-4 flex pt-[40px] gap-[140px]">
          
          <div className="w-[330px] flex flex-col">
            <Link to="/">
              <img src="/images/logo_web.png" alt="Logo" className="w-[204px] h-[204px] object-contain" />
            </Link>
            <div className="flex gap-4 mt-4">
              <img src="/icons/iata.svg" alt="IATA" className="h-12 w-auto" />
              <img src="/icons/bocongthuong.svg" alt="Bo Cong Thuong" className="h-12 w-auto" />
            </div>
            <div className="mt-[70px]">
              <h3 className="font-bold text-white text-[18px] mb-4">{t('paymentPartners')}</h3>
              <div className="grid grid-cols-4 gap-3">
                {paymentPartners.map((partner) => (
                  <div key={partner} className="bg-white rounded-md p-1.5 flex items-center justify-center h-[36px]">
                    <img src={`/icons/${partner}.svg`} alt={partner} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[168px] flex flex-col">
            <div>
              <h3 className="font-bold text-white text-[18px] mb-6">{t('aboutHanuvivu')}</h3>
              <ul className="flex flex-col gap-3 text-white/80">
                <li className="cursor-pointer hover:text-white transition-colors">{t('contactUs')}</li>
                <li className="cursor-pointer hover:text-white transition-colors">{t('helpCenter')}</li>
                <li className="cursor-pointer hover:text-white transition-colors">{t('aboutUs')}</li>
              </ul>
            </div>
            <div className="mt-[70px]">
              <h3 className="font-bold text-white text-[18px] mb-6">{t('followUsOn')}</h3>
              <ul className="flex flex-col gap-3 text-white/80">
                {socialLinks.map((social) => (
                  <li key={social.name} className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
                    <img src={`/icons/${social.icon}.svg`} alt={social.name} className="w-5 h-5" />
                    <span>{social.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-[140px]">
              <div className="w-[140px] flex flex-col">
                <h3 className="font-bold text-white text-[18px] mb-6">{t('followUsOn')}</h3>
                <ul className="flex flex-col gap-3 text-white/80">
                  <li className="cursor-pointer hover:text-white transition-colors">{t('tours')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('hotels')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('flights')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('carsTrains')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('thingsToDo')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('villas')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('apartments')}</li>
                </ul>
              </div>

              <div className="w-[180px] flex flex-col">
                <h3 className="font-bold text-white text-[18px] mb-6">{t('others')}</h3>
                <ul className="flex flex-col gap-3 text-white/80">
                  <li className="cursor-pointer hover:text-white transition-colors">{t('hanuvivuAffiliate')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('blog')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('privacyNotice')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('termsConditions')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('news')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('travelMagazine')}</li>
                  <li className="cursor-pointer hover:text-white transition-colors">{t('help')}</li>
                </ul>
              </div>
            </div>

            <div className="w-[462px] mt-[70px]">
              <h3 className="font-bold text-white text-[18px] mb-4 leading-snug">{t('stayUpdated')}</h3>
              <div className="w-full h-[52px] bg-white rounded-lg flex items-center px-1.5 py-1.5 shadow-sm">
                <svg className="w-6 h-6 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  placeholder={t('yourEmailAddress')}
                  className="flex-1 bg-transparent outline-none px-3 text-gray-700 placeholder-gray-400 text-[15px]"
                />
                <button className="bg-[#CD6F1E] hover:bg-[#b8631b] transition-colors text-white font-bold h-full px-6 rounded-md">
                  {t('send')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full h-[100px] border-t border-white/20 flex flex-col items-center justify-center">
        <p className="text-white/80 text-[14px] font-medium">{t('copyright')}</p>
        <p className="text-white/80 text-[14px] font-medium mt-1">{t('websiteOperator')}</p>
      </div>
    </footer>
  );
}