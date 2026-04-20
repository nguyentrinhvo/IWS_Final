import React, { useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext';

export default function Register({ isOpen, onClose, onSwitchToLogin, onSwitchToOtp, onRegisterSuccess }) {
  const { t } = useGlobal();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      setVisible(true);
      setFullName('');
      setEmail('');
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleSwitchToLogin = () => {
    setIsClosing(true);
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
      onSwitchToLogin();
    }, 300);
  };

  const handleRegisterClick = () => {
    setIsClosing(true);
    const newUser = {
      id: Date.now().toString(),
      fullName: fullName || "New Member",
      email: email || "member@hanuvivu.com"
    };

    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
      onClose();
      if (onRegisterSuccess) {
        onRegisterSuccess(newUser);
      }
      if (onSwitchToOtp) {
        onSwitchToOtp();
      }
    }, 300);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes backdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes backdropOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.85) translateY(24px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes modalOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.85) translateY(24px); }
        }
        .backdrop-in { animation: backdropIn 0.3s ease forwards; }
        .backdrop-out { animation: backdropOut 0.3s ease forwards; }
        .modal-in { animation: modalIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .modal-out { animation: modalOut 0.3s ease forwards; }
      `}</style>

      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm ${isClosing ? 'backdrop-out' : 'backdrop-in'}`}
        onClick={handleClose}
      >
        <div
          className={`w-[768px] h-[754px] bg-white rounded-3xl relative flex overflow-hidden shadow-2xl ${isClosing ? 'modal-out' : 'modal-in'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-[300px] h-full flex-shrink-0 relative"
            style={{
              backgroundImage: `url('https://png.pngtree.com/background/20241009/original/pngtree-exploring-with-the-golden-compass-and-map-a-journey-of-travel-picture-image_10809502.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-6 right-6 text-white">
              <h3 className="text-2xl font-black uppercase leading-tight mb-2">{t('registerImageTitle')}</h3>
              <p className="text-sm text-white/80 leading-relaxed">{t('registerImageSubtitle')}</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col px-8 py-8 overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-8">
              <h2 className="text-[26px] font-extrabold text-[#0B1E43] tracking-tight">{t('joinHanuvivu')}</h2>
              <p className="mt-1 text-[#6B7280] text-[14px] leading-relaxed">{t('registerSubtitle')}</p>
            </div>

            <div className="flex flex-col space-y-6 flex-1">
              <div>
                <label className="block text-[#0B1E43] text-xs font-bold mb-1.5 uppercase tracking-wide">
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  name="registerName"
                  autoComplete="off"
                  placeholder={t('fullNamePlaceholder')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#F4F7FF] rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F57323]/50 transition-all text-[#0B1E43]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#0B1E43] text-xs font-bold mb-1.5 uppercase tracking-wide">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    name="registerEmail"
                    autoComplete="off"
                    placeholder={t('emailPlaceholderReg')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F4F7FF] rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F57323]/50 transition-all text-[#0B1E43]"
                  />
                </div>
                <div>
                  <label className="block text-[#0B1E43] text-xs font-bold mb-1.5 uppercase tracking-wide">
                    {t('mobileNumber')}
                  </label>
                  <input
                    type="tel"
                    name="registerPhone"
                    autoComplete="off"
                    placeholder={t('mobilePlaceholder')}
                    className="w-full bg-[#F4F7FF] rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-[#F57323]/50 transition-all text-[#0B1E43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#0B1E43] text-xs font-bold mb-1.5 uppercase tracking-wide">
                    {t('password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="registerPassword"
                      autoComplete="new-password"
                      placeholder="........"
                      className="w-full bg-[#F4F7FF] rounded-xl py-3 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#F57323]/50 transition-all text-[#0B1E43]"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[#0B1E43] text-xs font-bold mb-1.5 uppercase tracking-wide">
                    {t('confirmPassword')}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="registerConfirmPassword"
                      autoComplete="new-password"
                      placeholder="........"
                      className="w-full bg-[#F4F7FF] rounded-xl py-3 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#F57323]/50 transition-all text-[#0B1E43]"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <label className="flex items-start space-x-2.5 cursor-pointer mt-1">
                <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#F57323] focus:ring-[#F57323] flex-shrink-0" />
                <span className="text-sm text-gray-600 leading-relaxed">
                  {t('agreeTerms1')}{' '}
                  <a href="#" className="font-bold text-[#D05615] hover:underline">{t('agreeTerms2')}</a>
                  {' '}{t('agreeTerms3')}
                </span>
              </label>

              <button 
                onClick={handleRegisterClick}
                className="w-full bg-gradient-to-r from-[#9F4200] to-[#F57323] text-white font-bold py-3.5 rounded-full shadow-lg shadow-orange-500/30 hover:opacity-90 transition-opacity cursor-pointer"
              >
                {t('registerBtn')}
              </button>

              <div className="flex items-center space-x-3">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-[#A0AEC0] text-xs font-bold tracking-wider">{t('orRegisterWith')}</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex-1 border border-gray-200 rounded-full py-2.5 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors cursor-pointer">
                  <img src="/Logo/google.svg" alt="Google" className="w-5 h-5" />
                  <span className="font-bold text-[#0B1E43] text-sm">Google</span>
                </button>
                <button className="flex-1 bg-[#1877F2] rounded-full py-2.5 flex items-center justify-center space-x-2 hover:bg-[#166FE5] transition-colors cursor-pointer">
                  <img src="/Logo/facebook.svg" alt="Facebook" className="w-5 h-5" />
                  <span className="font-bold text-white text-sm">Facebook</span>
                </button>
              </div>

              <div className="text-center text-sm">
                <span className="text-[#6B7280] font-medium">{t('alreadyMember')} </span>
                <button onClick={handleSwitchToLogin} className="font-bold text-[#D05615] hover:underline cursor-pointer bg-transparent border-none p-0">
                  {t('loginNow')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}