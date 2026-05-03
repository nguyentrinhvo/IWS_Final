import React, { useState, useRef, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateMyProfile, changePassword as changePasswordApi } from '../../services/userService';

const CustomDropdown = ({ label, options, value, onChange, widthClass, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useGlobal();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${widthClass}`}>
      {label && <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1 capitalize">{label}</label>}
      <div
        ref={dropdownRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-md cursor-pointer hover:border-[#0194F3] transition-all"
      >
        <span className="text-sm font-medium text-gray-700">{value || "\u00A0"}</span>
        <div
          className={`text-[#0194F3] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          dangerouslySetInnerHTML={{ __html: icon }}
        />
      </div>

      <div className={`absolute left-0 right-0 z-50 mt-1 bg-white border border-gray-100 rounded-md shadow-xl transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="overflow-y-auto max-h-60 py-1">
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-[#0194F3] hover:text-white cursor-pointer transition-colors"
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PasswordInput = ({ label, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useGlobal();

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#0194F3] text-sm font-medium transition-all pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
};

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium pointer-events-auto transition-all duration-300 animate-fadeIn">
        {message}
      </div>
    </div>
  );
};

export default function EditProfile() {
  const { t } = useGlobal();
  const { currentUser, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('info');
  const [fullName, setFullName] = useState('New Member');
  const [gender, setGender] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [city, setCity] = useState('');

  const [originalFullName, setOriginalFullName] = useState('New Member');
  const [originalGender, setOriginalGender] = useState('');
  const [originalBirthDay, setOriginalBirthDay] = useState('');
  const [originalBirthMonth, setOriginalBirthMonth] = useState('');
  const [originalBirthYear, setOriginalBirthYear] = useState('');
  const [originalCity, setOriginalCity] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [reason, setReason] = useState('');
  const [oldPassError, setOldPassError] = useState(false);
  const [passMismatchError, setPassMismatchError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const name = currentUser?.fullName || 'New Member';
    setFullName(name);
    setOriginalFullName(name);
    
    const g = currentUser?.gender || '';
    setGender(g);
    setOriginalGender(g);

    const c = currentUser?.city || '';
    setCity(c);
    setOriginalCity(c);

    if (currentUser?.dateOfBirth) {
      const dob = new Date(currentUser.dateOfBirth);
      const d = dob.getDate().toString();
      const m = (dob.getMonth() + 1).toString();
      const y = dob.getFullYear().toString();
      setBirthDay(d);
      setOriginalBirthDay(d);
      setBirthMonth(m);
      setOriginalBirthMonth(m);
      setBirthYear(y);
      setOriginalBirthYear(y);
    } else {
      setBirthDay('');
      setOriginalBirthDay('');
      setBirthMonth('');
      setOriginalBirthMonth('');
      setBirthYear('');
      setOriginalBirthYear('');
    }
  }, [currentUser]);

  const isDirty = fullName !== originalFullName ||
    gender !== originalGender ||
    birthDay !== originalBirthDay ||
    birthMonth !== originalBirthMonth ||
    birthYear !== originalBirthYear ||
    city !== originalCity;

  const handleReset = () => {
    setFullName(originalFullName);
    setGender(originalGender);
    setBirthDay(originalBirthDay);
    setBirthMonth(originalBirthMonth);
    setBirthYear(originalBirthYear);
    setCity(originalCity);
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!isDirty) return;
    setIsSaving(true);
    try {
      const payload = { fullName };
      payload.gender = gender;
      if (birthDay && birthMonth && birthYear) {
        payload.dateOfBirth = new Date(birthYear, birthMonth - 1, birthDay);
      }
      payload.city = city;

      await updateMyProfile(payload);
      
      // Update global auth state to keep sidebar and other parts in sync
      updateUser({ 
        fullName, 
        gender, 
        dateOfBirth: payload.dateOfBirth, 
        city 
      });

      setOriginalFullName(fullName);
      setOriginalGender(gender);
      setOriginalBirthDay(birthDay);
      setOriginalBirthMonth(birthMonth);
      setOriginalBirthYear(birthYear);
      setOriginalCity(city);
      setToastMessage(t('user_profileUpdated') || 'Profile updated successfully!');
    } catch (err) {
      console.error('Update profile error:', err);
      setToastMessage(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const isChangePasswordDisabled = () => {
    return !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword;
  };

  const handleChangePassword = async () => {
    setOldPassError(false);
    setPassMismatchError(false);

    if (newPassword !== confirmPassword) {
      setPassMismatchError(true);
      return;
    }

    try {
      await changePasswordApi(oldPassword, newPassword);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setToastMessage(t('user_passwordChanged') || 'Password changed successfully!');
    } catch (err) {
      console.error('Change password error:', err);
      const msg = err.response?.data?.message || '';
      if (msg.toLowerCase().includes('incorrect') || msg.toLowerCase().includes('wrong') || err.response?.status === 400) {
        setOldPassError(true);
      } else {
        setToastMessage(msg || 'Failed to change password.');
      }
    }
  };

  const handleDeleteAccount = () => {
    logout();
    setToastMessage('Account deleted successfully!');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 127 }, (_, i) => (2026 - i).toString());

  const chevronIcon = '<svg width="16px" height="16px" viewBox="0 0 1024 1024" fill="currentColor"><path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"></path></svg>';

  return (
    <div className="w-full">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{t('user_setting')}</h2>
      </div>

      <div className="relative mb-8">
        <div className="flex gap-4 md:gap-8 border-b border-gray-200">
          <button
            onClick={() => setActiveSubTab('info')}
            className={`pb-3 text-xs md:text-sm font-semibold transition-all relative z-10 ${
              activeSubTab === 'info' ? 'text-[#0194F3]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('user_accountInfo')}
            {activeSubTab === 'info' && <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#0194F3]" />}
          </button>
          <button
            onClick={() => setActiveSubTab('security')}
            className={`pb-3 text-xs md:text-sm font-semibold transition-all relative z-10 ${
              activeSubTab === 'security' ? 'text-[#0194F3]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('user_passwordSecurity')}
            {activeSubTab === 'security' && <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#0194F3]" />}
          </button>
        </div>
      </div>

      {activeSubTab === 'info' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-base md:text-lg">{t('user_personalData')}</h3>
            </div>

            <div className="p-4 md:p-6 space-y-6">
              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_fullName')}</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#0194F3] text-sm font-medium transition-all"
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1 italic">{t('user_fullNameDesc')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <CustomDropdown
                  label={t('user_gender')}
                  options={[t('user_female'), t('user_male')]}
                  value={gender}
                  onChange={setGender}
                  widthClass="w-full md:flex-[3]"
                  icon={chevronIcon}
                />
                <CustomDropdown
                  label={t('user_birthdate')}
                  options={days}
                  value={birthDay}
                  onChange={setBirthDay}
                  widthClass="w-full md:flex-[2]"
                  icon={chevronIcon}
                />
                <CustomDropdown
                  label=""
                  options={months}
                  value={birthMonth}
                  onChange={setBirthMonth}
                  widthClass="w-full md:flex-[2]"
                  icon={chevronIcon}
                />
                <CustomDropdown
                  label=""
                  options={years}
                  value={birthYear}
                  onChange={setBirthYear}
                  widthClass="w-full md:flex-[2]"
                  icon={chevronIcon}
                />
              </div>

              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_city')}</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#0194F3] text-sm font-medium transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={handleReset}
                  className={`px-4 md:px-6 py-2 bg-gray-100 text-[#0194F3] text-xs md:text-sm font-bold rounded-md hover:bg-gray-200 transition-colors cursor-pointer ${isDirty ? 'opacity-100' : 'opacity-50'}`}
                >
                  {t('user_maybeLater')}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isDirty || isSaving}
                  className={`px-6 md:px-10 py-2 bg-[#0194F3] text-white text-xs md:text-sm font-bold rounded-md transition-colors shadow-md ${isDirty && !isSaving ? 'hover:bg-blue-600 cursor-pointer opacity-100' : 'opacity-50 cursor-not-allowed'}`}
                >
                  {isSaving ? 'Saving...' : t('user_save')}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-2">
              <div className="space-y-1">
                <h3 className="font-bold text-gray-800 text-base md:text-lg">{t('user_email')}</h3>
                <p className="text-xs text-gray-400 font-medium ml-1">{t('user_emailDesc')}</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-xs md:text-sm font-semibold hover:bg-gray-50 transition-all text-black cursor-pointer">
                <span className="text-base font-light leading-none">+</span>
                <span>{t('user_addEmail')}</span>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
               <div className="text-sm text-gray-600 font-medium ml-1">1. {currentUser?.email || 'theanh@gmail.com'}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-2">
              <div className="space-y-1">
                <h3 className="font-bold text-gray-800 text-base md:text-lg">{t('user_mobile')}</h3>
                <p className="text-xs text-gray-400 font-medium ml-1">{t('user_mobileDesc')}</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-xs md:text-sm font-semibold hover:bg-gray-50 transition-all text-black cursor-pointer">
                <span className="text-base font-light leading-none">+</span>
                <span>{t('user_addMobile')}</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-4 md:p-6">
            <div className="space-y-1 mb-4">
              <h3 className="font-bold text-gray-800 text-base md:text-lg">{t('user_linkedAccounts')}</h3>
              <p className="text-xs text-gray-400 font-medium ml-1">{t('user_linkedAccountsDesc')}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
              <div className="flex justify-between items-center ml-1">
                <div className="flex items-center gap-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="fb" className="w-5 h-5" />
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </div>
                <button className="text-xs font-bold text-[#0194F3] cursor-pointer">{t('user_connect')}</button>
              </div>
              <div className="flex justify-between items-center ml-1">
                <div className="flex items-center gap-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="google" className="w-5 h-5" />
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </div>
                <button className="text-xs font-bold text-[#0194F3] cursor-pointer">{t('user_connect')}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-base md:text-lg">{t('user_changePassword')}</h3>
            </div>
            <div className="p-4 md:p-6 space-y-6">
              <p className="text-xs text-gray-400 ml-1">{t('user_changePasswordDesc')}</p>

              <PasswordInput
                label={t('user_oldPassword')}
                placeholder={t('user_oldPasswordPlaceholder')}
                value={oldPassword}
                onChange={(e) => { setOldPassword(e.target.value); setOldPassError(false); }}
                error={oldPassError ? t('user_oldPasswordIncorrect') : ''}
              />

              <PasswordInput
                label={t('user_newPassword')}
                placeholder={t('user_newPasswordPlaceholder')}
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setPassMismatchError(false); }}
                error={''}
              />

              <PasswordInput
                label={t('user_confirmNewPassword')}
                placeholder={t('user_confirmNewPasswordPlaceholder')}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setPassMismatchError(false); }}
                error={passMismatchError ? t('user_newPasswordMismatch') : ''}
              />

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleChangePassword}
                  disabled={isChangePasswordDisabled()}
                  className={`px-6 md:px-10 py-2 bg-[#0194F3] text-white text-xs md:text-sm font-bold rounded-md transition-colors shadow-md ${
                    isChangePasswordDisabled()
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-600 cursor-pointer'
                  }`}
                >
                  {t('user_changePasswordBtn')}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-base md:text-lg">{t('user_deleteAccount')}</h3>
            </div>
            <div className="p-4 md:p-6 space-y-6">
              <p className="text-xs text-gray-400 ml-1">{t('user_deleteAccountDesc')}</p>

              <div className="w-full">
                <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_reason')}</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={t('user_reasonPlaceholder')}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#0194F3] text-sm font-medium transition-all resize-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 md:px-10 py-2 bg-red-600 text-white text-xs md:text-sm font-bold rounded-md hover:bg-red-700 transition-colors shadow-md cursor-pointer"
                >
                  {t('user_deleteAccountBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
