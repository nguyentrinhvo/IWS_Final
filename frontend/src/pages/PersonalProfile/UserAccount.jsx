// UserAccount.jsx
import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { useAuth } from '../../context/AuthContext';
import EditProfile from './EditProfile';
import MyCards from './MyCards';
import PurchaseList from './PurchaseList';
import MyBookings from './MyBookings';
import SavedPassengersDetails from './SavedPassengerDetails';

export default function UserAccount() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { t } = useGlobal();
  const { currentUser, logout, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (jpg, png, etc.)');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must not exceed 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Avatar = reader.result;
      updateUser({ avatar: base64Avatar });
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const menuItems = [
    { id: 'my-cards', label: t('user_myCards'), icon: '<svg fill="currentColor" width="20px" height="20px" viewBox="0 0 512 512"><path d="M127.633,215.98h215.568c29.315,0,53.166,23.851,53.166,53.166v14.873h38.061c22.735,0,41.166-18.432,41.166-41.167 v-69.608H127.633V215.98z"></path> <path d="M434.428,74.2H168.799c-22.735,0-41.166,18.431-41.166,41.166v17.479h347.961v-17.479 C475.594,92.631,457.163,74.2,434.428,74.2z"></path> <path d="M343.201,227.98H77.572c-22.735,0-41.166,18.431-41.166,41.166v127.487c0,22.735,18.431,41.166,41.166,41.166h265.629 c22.736,0,41.166-18.431,41.166-41.166V269.146C384.367,246.412,365.938,227.98,343.201,227.98z M131.542,329.846 c0,4.92-3.989,8.909-8.909,8.909H75.289c-4.92,0-8.908-3.989-8.908-8.909v-29.098c0-4.921,3.988-8.909,8.908-8.909h47.344 c4.92,0,8.909,3.988,8.909,8.909V329.846z M300.961,413.039c-10.796,0-19.548-8.752-19.548-19.549s8.752-19.549,19.548-19.549 c10.797,0,19.549,8.752,19.549,19.549S311.758,413.039,300.961,413.039z M345.271,413.039c-10.797,0-19.549-8.752-19.549-19.549 s8.752-19.549,19.549-19.549c10.796,0,19.548,8.752,19.548,19.549S356.067,413.039,345.271,413.039z"></path></svg>' },
    { id: 'purchase-list', label: t('user_purchaseList'), icon: '<svg fill="currentColor" width="20px" height="20px" viewBox="0 0 24 24"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8zM7 9a2 2 0 1 1 .001-4.001A2 2 0 0 1 7 9z"></path></svg>' },
    { id: 'my-bookings', label: t('user_myBookings'), icon: '<svg width="20px" height="20px" viewBox="0 0 1024 1024" fill="currentColor"><path d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path></svg>' },
    { id: 'saved-passengers', label: t('user_savedPassengers'), icon: '<svg fill="currentColor" width="20px" height="20px" viewBox="0 0 56 56"><path d="M 38.7232 28.5490 C 43.1399 28.5490 46.9403 24.6047 46.9403 19.4690 C 46.9403 14.3949 43.1193 10.6356 38.7232 10.6356 C 34.3271 10.6356 30.5061 14.4771 30.5061 19.5101 C 30.5061 24.6047 34.3066 28.5490 38.7232 28.5490 Z M 15.0784 29.0215 C 18.8994 29.0215 22.2274 25.5703 22.2274 21.1125 C 22.2274 16.6958 18.8789 13.4294 15.0784 13.4294 C 11.2575 13.4294 7.8885 16.7779 7.9090 21.1536 C 7.9090 25.5703 11.2370 29.0215 15.0784 29.0215 Z M 3.6155 47.5717 L 19.2281 47.5717 C 17.0917 44.4697 19.7006 38.2247 24.1173 34.8146 C 21.8371 33.2944 18.8994 32.1645 15.0579 32.1645 C 5.7931 32.1645 0 39.0053 0 44.6957 C 0 46.5445 1.0271 47.5717 3.6155 47.5717 Z M 25.8018 47.5717 L 51.6241 47.5717 C 54.8493 47.5717 56 46.6472 56 44.8395 C 56 39.5394 49.3644 32.2261 38.7026 32.2261 C 28.0616 32.2261 21.4262 39.5394 21.4262 44.8395 C 21.4262 46.6472 22.5766 47.5717 25.8018 47.5717 Z"></path></svg>' },
  ];

  const renderContent = () => {
    switch (tab) {
      case 'edit-profile': return <EditProfile />;
      case 'my-cards': return <MyCards />;
      case 'purchase-list': return <PurchaseList />;
      case 'my-bookings': return <MyBookings />;
      case 'saved-passengers': return <SavedPassengersDetails />;
      default: return <EditProfile />;
    }
  };

  return (
    <div className="w-full bg-[#F5F7FA] min-h-screen py-6 md:py-10">
      <div className="w-full px-4 md:px-6 lg:max-w-[1320px] lg:mx-auto">
        <div className="flex flex-col md:flex-row gap-4 md:gap-[15px] items-start">
          <div className="w-full md:w-[300px] flex-shrink-0 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden md:sticky md:top-10 flex flex-col">
            <div className="p-4 md:p-5 flex items-center gap-3 md:gap-4">
              <div className="relative group cursor-pointer" onClick={triggerFileInput}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0194F3] flex items-center justify-center text-white font-bold text-base md:text-xl overflow-hidden shadow-inner flex-shrink-0">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    fullNameDisplayName(currentUser?.fullName || 'The Anh')
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 3H0V14H16V3H13L11 1H5L3 3ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" fill="white" />
                  </svg>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm md:text-base font-bold text-gray-800 truncate">{currentUser?.fullName || 'The Anh'}</span>
                <span className="text-[9px] md:text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  {currentUser?.provider || 'Gmail'}
                </span>
              </div>
            </div>

            <div className="h-[1px] bg-gray-100 mx-4" />

            <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/profile/${item.id}`)}
                  className={`w-full flex items-center gap-3 px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-[13px] font-semibold transition-all cursor-pointer border border-transparent ${
                    tab === item.id 
                      ? 'text-white bg-[#0194F3] border-[#0194F3] shadow-sm' 
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <div 
                    className={`flex items-center justify-center ${tab === item.id ? 'text-white' : 'text-[#0194F3]'}`}
                    dangerouslySetInnerHTML={{ __html: item.icon }} 
                  />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="h-[1px] bg-gray-100 mx-4" />

            <div className="py-2">
              <button
                onClick={() => navigate('/profile/edit-profile')}
                className={`w-full flex items-center gap-3 px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-[13px] font-semibold transition-all cursor-pointer border border-transparent ${
                  (!tab || tab === 'edit-profile') ? 'text-white bg-[#0194F3] border-[#0194F3] shadow-sm' : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div 
                  className={`flex items-center justify-center ${(!tab || tab === 'edit-profile') ? 'text-white' : 'text-[#0194F3]'}`}
                  dangerouslySetInnerHTML={{ __html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0175 19C10.6601 19 10.3552 18.7347 10.297 18.373C10.2434 18.0804 10.038 17.8413 9.76171 17.75C9.53658 17.6707 9.31645 17.5772 9.10261 17.47C8.84815 17.3365 8.54289 17.3565 8.30701 17.522C8.02156 17.7325 7.62943 17.6999 7.38076 17.445L6.41356 16.453C6.15326 16.186 6.11944 15.7651 6.33361 15.458C6.49878 15.2105 6.52257 14.8914 6.39601 14.621C6.31262 14.4332 6.23906 14.2409 6.17566 14.045C6.08485 13.7363 5.8342 13.5051 5.52533 13.445C5.15287 13.384 4.8779 13.0559 4.87501 12.669V11.428C4.87303 10.9821 5.18705 10.6007 5.61601 10.528C5.94143 10.4645 6.21316 10.2359 6.33751 9.921C6.37456 9.83233 6.41356 9.74433 6.45451 9.657C6.61989 9.33044 6.59705 8.93711 6.39503 8.633C6.1424 8.27288 6.18119 7.77809 6.48668 7.464L7.19746 6.735C7.54802 6.37532 8.1009 6.32877 8.50396 6.625L8.52638 6.641C8.82735 6.84876 9.21033 6.88639 9.54428 6.741C9.90155 6.60911 10.1649 6.29424 10.2375 5.912L10.2473 5.878C10.3275 5.37197 10.7536 5.00021 11.2535 5H12.1115C12.6248 4.99976 13.0629 5.38057 13.1469 5.9L13.1625 5.97C13.2314 6.33617 13.4811 6.63922 13.8216 6.77C14.1498 6.91447 14.5272 6.87674 14.822 6.67L14.8707 6.634C15.2842 6.32834 15.8528 6.37535 16.2133 6.745L16.8675 7.417C17.1954 7.75516 17.2366 8.28693 16.965 8.674C16.7522 8.99752 16.7251 9.41325 16.8938 9.763L16.9358 9.863C17.0724 10.2045 17.3681 10.452 17.7216 10.521C18.1837 10.5983 18.5235 11.0069 18.525 11.487V12.6C18.5249 13.0234 18.2263 13.3846 17.8191 13.454C17.4842 13.5199 17.2114 13.7686 17.1083 14.102C17.0628 14.2353 17.0121 14.3687 16.9562 14.502C16.8261 14.795 16.855 15.1364 17.0323 15.402C17.2662 15.7358 17.2299 16.1943 16.9465 16.485L16.0388 17.417C15.7792 17.6832 15.3698 17.7175 15.0716 17.498C14.8226 17.3235 14.5001 17.3043 14.2331 17.448C14.0428 17.5447 13.8475 17.6305 13.6481 17.705C13.3692 17.8037 13.1636 18.0485 13.1099 18.346C13.053 18.7203 12.7401 18.9972 12.3708 19H11.0175Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9747 12C13.9747 13.2885 12.9563 14.333 11.7 14.333C10.4437 14.333 9.42533 13.2885 9.42533 12C9.42533 10.7115 10.4437 9.66699 11.7 9.66699C12.9563 9.66699 13.9747 10.7115 13.9747 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>' }} 
                />
                <span className="whitespace-nowrap">{t('user_myAccount')}</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-[13px] font-semibold text-gray-800 hover:bg-gray-100 transition-all cursor-pointer border border-transparent"
              >
                <div className="flex items-center justify-center text-[#0194F3]" dangerouslySetInnerHTML={{ __html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6,4.2c-0.5-0.3-1.1-0.1-1.4,0.4c-0.3,0.5-0.1,1.1,0.4,1.4c2.1,1.3,3.5,3.6,3.5,6c0,3.9-3.1,7-7,7s-7-3.1-7-7 c0-2.5,1.4-4.8,3.5-6.1C9,5.6,9.2,5,8.9,4.6C8.6,4.1,8,3.9,7.5,4.2C4.7,5.8,3,8.8,3,12c0,5,4,9,9,9s9-4,9-9 C21,8.8,19.3,5.9,16.6,4.2z"></path> <path d="M12,13c0.6,0,1-0.4,1-1V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v9C11,12.6,11.4,13,12,13z"></path></svg>' }} />
                <span className="whitespace-nowrap">{t('user_logout')}</span>
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

function fullNameDisplayName(name) {
  if (!name) return 'TA';
  const parts = name.split(' ');
  if (parts.length >= 2) return parts[0][0] + parts[parts.length-1][0];
  return name.substring(0, 2).toUpperCase();
}