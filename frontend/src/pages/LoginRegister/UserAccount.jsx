import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';

const CreditCardIcon = () => (
    <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 512 512">
        <path d="M127.633,215.98h215.568c29.315,0,53.166,23.851,53.166,53.166v14.873h38.061c22.735,0,41.166-18.432,41.166-41.167 v-69.608H127.633V215.98z"></path>
        <path d="M434.428,74.2H168.799c-22.735,0-41.166,18.431-41.166,41.166v17.479h347.961v-17.479 C475.594,92.631,457.163,74.2,434.428,74.2z"></path>
        <path d="M343.201,227.98H77.572c-22.735,0-41.166,18.431-41.166,41.166v127.487c0,22.735,18.431,41.166,41.166,41.166h265.629 c22.736,0,41.166-18.431,41.166-41.166V269.146C384.367,246.412,365.938,227.98,343.201,227.98z M131.542,329.846 c0,4.92-3.989,8.909-8.909,8.909H75.289c-4.92,0-8.908-3.989-8.908-8.909v-29.098c0-4.921,3.988-8.909,8.908-8.909h47.344 c4.92,0,8.909,3.988,8.909,8.909V329.846z M300.961,413.039c-10.796,0-19.548-8.752-19.548-19.549s8.752-19.549,19.548-19.549 c10.797,0,19.549,8.752,19.549,19.549S311.758,413.039,300.961,413.039z M345.271,413.039c-10.797,0-19.549-8.752-19.549-19.549 s8.752-19.549,19.549-19.549c10.796,0,19.548,8.752,19.548,19.549S356.067,413.039,345.271,413.039z"></path>
    </svg>
);

const BookingsIcon = () => (
    <svg width="20px" height="20px" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path>
    </svg>
);

const PurchaseIcon = () => (
    <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 24 24">
        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8zM7 9a2 2 0 1 1 .001-4.001A2 2 0 0 1 7 9z"></path>
    </svg>
);

const PassengerIcon = () => (
    <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 56 56">
        <path d="M 38.7232 28.5490 C 43.1399 28.5490 46.9403 24.6047 46.9403 19.4690 C 46.9403 14.3949 43.1193 10.6356 38.7232 10.6356 C 34.3271 10.6356 30.5061 14.4771 30.5061 19.5101 C 30.5061 24.6047 34.3066 28.5490 38.7232 28.5490 Z M 15.0784 29.0215 C 18.8994 29.0215 22.2274 25.5703 22.2274 21.1125 C 22.2274 16.6958 18.8789 13.4294 15.0784 13.4294 C 11.2575 13.4294 7.8885 16.7779 7.9090 21.1536 C 7.9090 25.5703 11.2370 29.0215 15.0784 29.0215 Z M 3.6155 47.5717 L 19.2281 47.5717 C 17.0917 44.4697 19.7006 38.2247 24.1173 34.8146 C 21.8371 33.2944 18.8994 32.1645 15.0579 32.1645 C 5.7931 32.1645 0 39.0053 0 44.6957 C 0 46.5445 1.0271 47.5717 3.6155 47.5717 Z M 25.8018 47.5717 L 51.6241 47.5717 C 54.8493 47.5717 56 46.6472 56 44.8395 C 56 39.5394 49.3644 32.2261 38.7026 32.2261 C 28.0616 32.2261 21.4262 39.5394 21.4262 44.8395 C 21.4262 46.6472 22.5766 47.5717 25.8018 47.5717 Z"></path>
    </svg>
);

const AccountIcon = () => (
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.0175 19C10.6601 19 10.3552 18.7347 10.297 18.373C10.2434 18.0804 10.038 17.8413 9.76171 17.75C9.53658 17.6707 9.31645 17.5772 9.10261 17.47C8.84815 17.3365 8.54289 17.3565 8.30701 17.522C8.02156 17.7325 7.62943 17.6999 7.38076 17.445L6.41356 16.453C6.15326 16.186 6.11944 15.7651 6.33361 15.458C6.49878 15.2105 6.52257 14.8914 6.39601 14.621C6.31262 14.4332 6.23906 14.2409 6.17566 14.045C6.08485 13.7363 5.8342 13.5051 5.52533 13.445C5.15287 13.384 4.8779 13.0559 4.87501 12.669V11.428C4.87303 10.9821 5.18705 10.6007 5.61601 10.528C5.94143 10.4645 6.21316 10.2359 6.33751 9.921C6.37456 9.83233 6.41356 9.74433 6.45451 9.657C6.61989 9.33044 6.59705 8.93711 6.39503 8.633C6.1424 8.27288 6.18119 7.77809 6.48668 7.464L7.19746 6.735C7.54802 6.37532 8.1009 6.32877 8.50396 6.625L8.52638 6.641C8.82735 6.84876 9.21033 6.88639 9.54428 6.741C9.90155 6.60911 10.1649 6.29424 10.2375 5.912L10.2473 5.878C10.3275 5.37197 10.7536 5.00021 11.2535 5H12.1115C12.6248 4.99976 13.0629 5.38057 13.1469 5.9L13.1625 5.97C13.2314 6.33617 13.4811 6.63922 13.8216 6.77C14.1498 6.91447 14.5272 6.87674 14.822 6.67L14.8707 6.634C15.2842 6.32834 15.8528 6.37535 16.2133 6.745L16.8675 7.417C17.1954 7.75516 17.2366 8.28693 16.965 8.674C16.7522 8.99752 16.7251 9.41325 16.8938 9.763L16.9358 9.863C17.0724 10.2045 17.3681 10.452 17.7216 10.521C18.1837 10.5983 18.5235 11.0069 18.525 11.487V12.6C18.5249 13.0234 18.2263 13.3846 17.8191 13.454C17.4842 13.5199 17.2114 13.7686 17.1083 14.102C17.0628 14.2353 17.0121 14.3687 16.9562 14.502C16.8261 14.795 16.855 15.1364 17.0323 15.402C17.2662 15.7358 17.2299 16.1943 16.9465 16.485L16.0388 17.417C15.7792 17.6832 15.3698 17.7175 15.0716 17.498C14.8226 17.3235 14.5001 17.3043 14.2331 17.448C14.0428 17.5447 13.8475 17.6305 13.6481 17.705C13.3692 17.8037 13.1636 18.0485 13.1099 18.346C13.053 18.7203 12.7401 18.9972 12.3708 19H11.0175Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.9747 12C13.9747 13.2885 12.9563 14.333 11.7 14.333C10.4437 14.333 9.42533 13.2885 9.42533 12C9.42533 10.7115 10.4437 9.66699 11.7 9.66699C12.9563 9.66699 13.9747 10.7115 13.9747 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

const LogoutIcon = () => (
    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6,4.2c-0.5-0.3-1.1-0.1-1.4,0.4c-0.3,0.5-0.1,1.1,0.4,1.4c2.1,1.3,3.5,3.6,3.5,6c0,3.9-3.1,7-7,7s-7-3.1-7-7 c0-2.5,1.4-4.8,3.5-6.1C9,5.6,9.2,5,8.9,4.6C8.6,4.1,8,3.9,7.5,4.2C4.7,5.8,3,8.8,3,12c0,5,4,9,9,9s9-4,9-9 C21,8.8,19.3,5.9,16.6,4.2z"></path>
        <path d="M12,13c0.6,0,1-0.4,1-1V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v9C11,12.6,11.4,13,12,13z"></path>
    </svg>
);

const ArrowDownIcon = () => (
    <svg width="16px" height="16px" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"></path>
    </svg>
);

const UserAccount = () => {
    const { t, currentUser } = useGlobal();
    const [activeMenu, setActiveMenu] = useState('account');
    const [activeTab, setActiveTab] = useState('info');
    const [openDropdown, setOpenDropdown] = useState(null);

    const [formData, setFormData] = useState({
        fullName: currentUser?.fullName || 'The Anh',
        gender: '',
        day: '',
        month: '',
        year: '',
        city: ''
    });

    const menuItems = [
        { id: 'cards', label: t('userMyCards'), icon: <CreditCardIcon /> },
        { id: 'purchase', label: t('userPurchaseList'), icon: <PurchaseIcon /> },
        { id: 'bookings', label: t('userMyBookings'), icon: <BookingsIcon /> },
        { id: 'passenger', label: t('userSavedPassenger'), icon: <PassengerIcon /> },
    ];

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const handleSelect = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setOpenDropdown(null);
    };

    const renderDropdown = (field, options) => (
        <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            zIndex: 10,
            maxHeight: openDropdown === field ? '200px' : '0',
            overflowY: 'auto',
            transition: 'max-height 0.3s ease-in-out',
            opacity: openDropdown === field ? 1 : 0,
            pointerEvents: openDropdown === field ? 'all' : 'none'
        }}>
            {options.map(opt => (
                <div
                    key={opt}
                    onClick={() => handleSelect(field, opt)}
                    style={{ padding: '8px 12px', cursor: 'pointer' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    {opt}
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ maxWidth: '1320px', margin: '40px auto', padding: '0 15px', display: 'flex', gap: '15px' }}>
            {/* Left Sidebar */}
            <div style={{ width: '300px', flexShrink: 0 }}>
                <div style={{ padding: '20px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ddd', overflow: 'hidden' }}>
                        {currentUser?.avatar ? <img src={currentUser.avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
                    </div>
                    <div>
                        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{formData.fullName}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Google</div>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />

                {menuItems.map(item => (
                    <div
                        key={item.id}
                        onClick={() => setActiveMenu(item.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 15px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            marginBottom: '4px',
                            backgroundColor: activeMenu === item.id ? '#007CE8' : 'transparent',
                            color: activeMenu === item.id ? 'white' : 'black',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { if (activeMenu !== item.id) e.currentTarget.style.backgroundColor = '#f5f5f5' }}
                        onMouseLeave={(e) => { if (activeMenu !== item.id) e.currentTarget.style.backgroundColor = 'transparent' }}
                    >
                        <span style={{ color: activeMenu === item.id ? 'white' : '#007CE8' }}>{item.icon}</span>
                        <span style={{ fontSize: '14px' }}>{item.label}</span>
                    </div>
                ))}

                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />

                <div
                    onClick={() => setActiveMenu('account')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 15px',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        backgroundColor: activeMenu === 'account' ? '#007CE8' : 'transparent',
                        color: activeMenu === 'account' ? 'white' : 'black'
                    }}
                >
                    <span style={{ color: activeMenu === 'account' ? 'white' : '#007CE8' }}><AccountIcon /></span>
                    <span style={{ fontSize: '14px' }}>{t('userAccount')}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', cursor: 'pointer', borderRadius: '8px' }}>
                    <span style={{ color: '#007CE8' }}><LogoutIcon /></span>
                    <span style={{ fontSize: '14px' }}>{t('userLogOut')}</span>
                </div>
            </div>

            {/* Right Content */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '15px' }}>
                    <h2 style={{ margin: 0, fontSize: '24px' }}>{t('userSetting')}</h2>
                </div>

                <div style={{ display: 'flex', gap: '25px', position: 'relative', borderBottom: '1px solid #eee' }}>
                    <div
                        onClick={() => setActiveTab('info')}
                        style={{
                            padding: '10px 0',
                            cursor: 'pointer',
                            color: activeTab === 'info' ? '#007CE8' : 'black',
                            borderBottom: activeTab === 'info' ? '2px solid #007CE8' : 'none',
                            marginBottom: '-1px',
                            fontWeight: '500'
                        }}
                    >
                        {t('userAccountInfo')}
                    </div>
                    <div
                        onClick={() => setActiveTab('security')}
                        style={{
                            padding: '10px 0',
                            cursor: 'pointer',
                            color: activeTab === 'security' ? '#007CE8' : 'black',
                            borderBottom: activeTab === 'security' ? '2px solid #007CE8' : 'none',
                            marginBottom: '-1px',
                            fontWeight: '500'
                        }}
                    >
                        {t('userPasswordSecurity')}
                    </div>
                </div>

                {activeTab === 'info' && (
                    <div style={{ marginTop: '20px' }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            padding: '20px'
                        }}>
                            <h3 style={{ margin: '0 0 15px 0', fontWeight: 'bold' }}>{t('userPersonalData')}</h3>
                            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 -20px 20px -20px' }} />

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>{t('userFullName')}</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                                />
                                <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>{t('userFullNameDesc')}</div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                                <div style={{ width: '30%', position: 'relative' }}>
                                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>{t('userGender')}</label>
                                    <div
                                        onClick={() => toggleDropdown('gender')}
                                        style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
                                    >
                                        <span>{formData.gender || '-'}</span>
                                        <span style={{ color: '#007CE8', transform: openDropdown === 'gender' ? 'rotate(180deg)' : 'none', transition: '0.3s' }}><ArrowDownIcon /></span>
                                    </div>
                                    {renderDropdown('gender', [t('userMale'), t('userFemale')])}
                                </div>
                                <div style={{ width: '70%', display: 'flex', gap: '10px' }}>
                                    <div style={{ flex: 1, position: 'relative' }}>
                                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>{t('userBirthdate')}</label>
                                        <div onClick={() => toggleDropdown('day')} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                                            <span>{formData.day || '-'}</span>
                                            <span style={{ color: '#007CE8', transform: openDropdown === 'day' ? 'rotate(180deg)' : 'none', transition: '0.3s' }}><ArrowDownIcon /></span>
                                        </div>
                                        {renderDropdown('day', Array.from({ length: 31 }, (_, i) => i + 1))}
                                    </div>
                                    <div style={{ flex: 1, position: 'relative' }}>
                                        <label style={{ display: 'block', height: '21px', marginBottom: '8px' }}></label>
                                        <div onClick={() => toggleDropdown('month')} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                                            <span>{formData.month || '-'}</span>
                                            <span style={{ color: '#007CE8', transform: openDropdown === 'month' ? 'rotate(180deg)' : 'none', transition: '0.3s' }}><ArrowDownIcon /></span>
                                        </div>
                                        {renderDropdown('month', Array.from({ length: 12 }, (_, i) => i + 1))}
                                    </div>
                                    <div style={{ flex: 1, position: 'relative' }}>
                                        <label style={{ display: 'block', height: '21px', marginBottom: '8px' }}></label>
                                        <div onClick={() => toggleDropdown('year')} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                                            <span>{formData.year || '-'}</span>
                                            <span style={{ color: '#007CE8', transform: openDropdown === 'year' ? 'rotate(180deg)' : 'none', transition: '0.3s' }}><ArrowDownIcon /></span>
                                        </div>
                                        {renderDropdown('year', Array.from({ length: 127 }, (_, i) => 2026 - i))}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>{t('userCity')}</label>
                                <input type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#f0f0f0', color: '#007CE8', cursor: 'pointer' }}>{t('userMaybeLater')}</button>
                                <button style={{ padding: '10px 30px', borderRadius: '8px', border: 'none', backgroundColor: '#007CE8', color: 'white', cursor: 'pointer' }}>{t('userSave')}</button>
                            </div>
                        </div>

                        {/* Email Section */}
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '20px', marginTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontWeight: 'bold' }}>{t('userEmail')}</h3>
                                    <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 15px 0' }}>{t('userEmailLimit')}</p>
                                </div>
                                <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', border: '1px solid #ddd', borderRadius: '6px', background: 'none', cursor: 'pointer' }}>
                                    <span>+</span> {t('userAddEmail')}
                                </button>
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 -20px 15px -20px' }} />
                            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>1. {currentUser?.email || 'theanh@gmail.com'}</div>
                        </div>

                        {/* Mobile Section */}
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '20px', marginTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ margin: 0, fontWeight: 'bold' }}>{t('userMobile')}</h3>
                                    <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 15px 0' }}>{t('userMobileLimit')}</p>
                                </div>
                                <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px', border: '1px solid #ddd', borderRadius: '6px', background: 'none', cursor: 'pointer' }}>
                                    <span>+</span> {t('userAddMobile')}
                                </button>
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 -20px 15px -20px' }} />
                            <div style={{ fontSize: '14px', color: '#999', fontStyle: 'italic' }}>No mobile number added</div>
                        </div>

                        {/* Linked Accounts */}
                        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '20px', marginTop: '20px' }}>
                            <h3 style={{ margin: 0, fontWeight: 'bold' }}>{t('userLinkedAccount')}</h3>
                            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 15px 0' }}>{t('userLinkedDesc')}</p>
                            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '0 -20px 0 -20px' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src="/icons/facebook.svg" width="20" height="20" alt="Facebook" />
                                    <span>Facebook</span>
                                </div>
                                <span style={{ color: '#007CE8', fontSize: '14px', cursor: 'pointer' }}>{t('userConnect')}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src="/icons/google.svg" width="20" height="20" alt="Google" />
                                    <span>Google</span>
                                </div>
                                <span style={{ color: '#007CE8', fontSize: '14px', cursor: 'pointer' }}>{t('userConnect')}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAccount;
