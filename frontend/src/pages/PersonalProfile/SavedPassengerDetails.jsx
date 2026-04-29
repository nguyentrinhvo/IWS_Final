import React, { useState, useRef, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';

const CHEVRON_ICON = (
  <svg width="16" height="16" viewBox="0 0 1024 1024" fill="currentColor">
    <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"></path>
  </svg>
);

const CustomDropdown = ({ label, options, value, onChange, widthClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      {label && <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{label}</label>}
      <div
        ref={dropdownRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-md cursor-pointer hover:border-[#0194F3] transition-all"
      >
        <span className="text-sm font-medium text-gray-700">{value || ''}</span>
        <div className={`text-[#0194F3] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {CHEVRON_ICON}
        </div>
      </div>
      <div
        className={`absolute left-0 right-0 z-50 mt-1 bg-white border border-gray-100 rounded-md shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="overflow-y-auto max-h-60 py-1">
          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
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

const createEmptyPassenger = () => ({
  id: null,
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  passportNumber: '',
  passportExpiryDay: '',
  passportExpiryMonth: '',
  passportExpiryYear: '',
  passportCountry: '',
  idNumber: '',
  idIssueDay: '',
  idIssueMonth: '',
  idIssueYear: '',
  idCountry: '',
  idExpiryDay: '',
  idExpiryMonth: '',
  idExpiryYear: '',
  licenseNumber: '',
  licenseIssueDay: '',
  licenseIssueMonth: '',
  licenseIssueYear: '',
  licenseCountry: '',
  licenseExpiryDay: '',
  licenseExpiryMonth: '',
  licenseExpiryYear: '',
});

export default function SavedPassengerDetails() {
  const { t, currentUser } = useGlobal();
  const [view, setView] = useState('list');
  const [passengers, setPassengers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(createEmptyPassenger());

  const [isCmndOpen, setIsCmndOpen] = useState(false);
  const [isLicenseOpen, setIsLicenseOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 127 }, (_, i) => (2026 - i).toString());
  const countries = ['Vietnam', 'United States', 'Japan', 'South Korea', 'Singapore'];

  useEffect(() => {
    if (currentUser && passengers.length === 0) {
      const fullNameParts = (currentUser.fullName || 'The Anh').split(' ');
      const lastName = fullNameParts.pop() || '';
      const firstName = fullNameParts.join(' ') || '';
      setPassengers([
        {
          id: 1,
          title: 'Mr',
          firstName: firstName,
          lastName: lastName,
          email: currentUser.email || '',
          phone: '',
          nationality: '',
          birthDay: '',
          birthMonth: '',
          birthYear: '',
          passportNumber: '',
          passportExpiryDay: '',
          passportExpiryMonth: '',
          passportExpiryYear: '',
          passportCountry: '',
          idNumber: '',
          idIssueDay: '',
          idIssueMonth: '',
          idIssueYear: '',
          idCountry: '',
          idExpiryDay: '',
          idExpiryMonth: '',
          idExpiryYear: '',
          licenseNumber: '',
          licenseIssueDay: '',
          licenseIssueMonth: '',
          licenseIssueYear: '',
          licenseCountry: '',
          licenseExpiryDay: '',
          licenseExpiryMonth: '',
          licenseExpiryYear: '',
        },
      ]);
    }
  }, [currentUser, passengers.length]);

  const handleDeleteClick = (id) => {
    setPendingDeleteId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (pendingDeleteId !== null) {
      setPassengers(passengers.filter((p) => p.id !== pendingDeleteId));
      setDeleteModalOpen(false);
      setPendingDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setPendingDeleteId(null);
  };

  const handleEdit = (passenger) => {
    setEditingId(passenger.id);
    setFormData({ ...passenger });
    setView('edit');
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData(createEmptyPassenger());
    setView('add');
  };

  const handleSave = () => {
    if (view === 'add') {
      const newId = Date.now();
      setPassengers([...passengers, { ...formData, id: newId }]);
    } else if (view === 'edit') {
      setPassengers(passengers.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p)));
    }
    setView('list');
  };

  const updateFormField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderList = () => (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('user_listOfPassengers')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('user_passengerLimit')}</p>
      </div>

      <div className="space-y-4">
        {passengers.map((p, index) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-5 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <svg fill="#000000" width="32px" height="32px" viewBox="0 0 32 32">
                <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path>
              </svg>
              <span className="font-bold text-gray-800">
                {index + 1}. {p.firstName} {p.lastName}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(p)}
                className="text-[#0194F3] font-bold text-sm hover:no-underline cursor-pointer"
              >
                {t('user_edit')}
              </button>
              <button
                onClick={() => handleDeleteClick(p.id)}
                className="text-red-500 font-bold text-sm hover:no-underline cursor-pointer"
              >
                {t('user_delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddNew}
        className="mt-6 w-full py-3 bg-[#0194F3] text-white font-bold rounded-md hover:bg-blue-600 transition-colors shadow-md cursor-pointer"
      >
        {t('user_addPassenger')}
      </button>
    </>
  );

  const renderForm = () => (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('user_listOfPassengers')}</h2>
        <p className="text-sm text-gray-500 mt-1">{t('user_passengerLimit')}</p>
      </div>

      <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-6 space-y-6">
        <div className="flex gap-4">
          <CustomDropdown
            label={t('user_title')}
            options={['Mr', 'Mrs', 'Ms']}
            value={formData.title}
            onChange={(val) => updateFormField('title', val)}
            widthClass="w-[20%]"
          />
          <div className="w-[40%]">
            <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_firstName')}</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => updateFormField('firstName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none"
            />
          </div>
          <div className="w-[40%]">
            <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_lastName')}</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => updateFormField('lastName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormField('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => updateFormField('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <CustomDropdown
            label={t('user_nationality')}
            options={countries}
            value={formData.nationality}
            onChange={(val) => updateFormField('nationality', val)}
            widthClass="flex-[3]"
          />
          <CustomDropdown
            label="Day"
            options={days}
            value={formData.birthDay}
            onChange={(val) => updateFormField('birthDay', val)}
            widthClass="flex-[2]"
          />
          <CustomDropdown
            label="Month"
            options={months}
            value={formData.birthMonth}
            onChange={(val) => updateFormField('birthMonth', val)}
            widthClass="flex-[2]"
          />
          <CustomDropdown
            label="Year"
            options={years}
            value={formData.birthYear}
            onChange={(val) => updateFormField('birthYear', val)}
            widthClass="flex-[2]"
          />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">{t('user_passportDetails')}</h3>
          <div className="flex gap-4 items-end mb-4">
            <div className="flex-[3]">
              <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_docNumber')}</label>
              <input
                type="text"
                value={formData.passportNumber}
                onChange={(e) => updateFormField('passportNumber', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none"
              />
            </div>
            <CustomDropdown
              label={t('user_expiryDate')}
              options={days}
              value={formData.passportExpiryDay}
              onChange={(val) => updateFormField('passportExpiryDay', val)}
              widthClass="flex-[2]"
            />
            <CustomDropdown
              label=""
              options={months}
              value={formData.passportExpiryMonth}
              onChange={(val) => updateFormField('passportExpiryMonth', val)}
              widthClass="flex-[2]"
            />
            <CustomDropdown
              label=""
              options={years}
              value={formData.passportExpiryYear}
              onChange={(val) => updateFormField('passportExpiryYear', val)}
              widthClass="flex-[2]"
            />
          </div>
          <div className="flex gap-4 items-end">
            <CustomDropdown
              label={t('user_countryOfIssue')}
              options={countries}
              value={formData.passportCountry}
              onChange={(val) => updateFormField('passportCountry', val)}
              widthClass="flex-[3]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsCmndOpen(!isCmndOpen)}
          >
            <h3 className="font-bold text-[#0194F3]">+ {t('user_idCard')}</h3>
            <div
              className={`text-[#0194F3] transition-transform duration-300 ${
                isCmndOpen ? 'rotate-180' : 'rotate-0'
              }`}
            >
              {CHEVRON_ICON}
            </div>
          </div>
          <div
            className={`transition-all duration-300 ${
              isCmndOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex gap-4 items-end mb-4">
              <div className="flex-[3]">
                <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_docNumber')}</label>
                <input
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => updateFormField('idNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none"
                />
              </div>
              <CustomDropdown
                label={t('user_dateOfIssue')}
                options={days}
                value={formData.idIssueDay}
                onChange={(val) => updateFormField('idIssueDay', val)}
                widthClass="flex-[2]"
              />
              <CustomDropdown
                label=""
                options={months}
                value={formData.idIssueMonth}
                onChange={(val) => updateFormField('idIssueMonth', val)}
                widthClass="flex-[2]"
              />
              <CustomDropdown
                label=""
                options={years}
                value={formData.idIssueYear}
                onChange={(val) => updateFormField('idIssueYear', val)}
                widthClass="flex-[2]"
              />
            </div>
            <div className="flex gap-4 items-end">
              <CustomDropdown
                label={t('user_countryOfIssue')}
                options={countries}
                value={formData.idCountry}
                onChange={(val) => updateFormField('idCountry', val)}
                widthClass="flex-[3]"
              />
              <CustomDropdown
                label={t('user_expiryDate')}
                options={days}
                value={formData.idExpiryDay}
                onChange={(val) => updateFormField('idExpiryDay', val)}
                widthClass="flex-[2]"
              />
              <CustomDropdown
                label=""
                options={months}
                value={formData.idExpiryMonth}
                onChange={(val) => updateFormField('idExpiryMonth', val)}
                widthClass="flex-[2]"
              />
              <CustomDropdown
                label=""
                options={years}
                value={formData.idExpiryYear}
                onChange={(val) => updateFormField('idExpiryYear', val)}
                widthClass="flex-[2]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsLicenseOpen(!isLicenseOpen)}
          >
            <h3 className="font-bold text-[#0194F3]">+ {t('user_driverLicense')}</h3>
            <div
              className={`text-[#0194F3] transition-transform duration-300 ${
                isLicenseOpen ? 'rotate-180' : 'rotate-0'
              }`}
            >
              {CHEVRON_ICON}
            </div>
          </div>
          <div
            className={`transition-all duration-300 ${
              isLicenseOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex gap-4 items-end mb-4">
              <div className="flex-[3]">
                <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_docNumber')}</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => updateFormField('licenseNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none"
                />
              </div>
              <CustomDropdown
                label={t('user_dateOfIssue')}
                options={days}
                value={formData.licenseIssueDay}
                onChange={(val) => updateFormField('licenseIssueDay', val)}
                widthClass="flex-[2]"
              />
              <CustomDropdown
                label=""
                options={months}
                value={formData.licenseIssueMonth}
                onChange={(val) => updateFormField('licenseIssueMonth', val)}
                widthClass="flex-[2]"
              />
              <CustomDropdown
                label=""
                options={years}
                value={formData.licenseIssueYear}
                onChange={(val) => updateFormField('licenseIssueYear', val)}
                widthClass="flex-[2]"
              />
            </div>
            <div className="flex gap-4 items-end">
              <CustomDropdown
                label={t('user_countryOfIssue')}
                options={countries}
                value={formData.licenseCountry}
                onChange={(val) => updateFormField('licenseCountry', val)}
                widthClass="flex-[3]"
              />
              <CustomDropdown
                label={t('user_expiryDate')}
                options={days}
                value={formData.licenseExpiryDay}
                onChange={(val) => updateFormField('licenseExpiryDay', val)}
                widthClass="flex-[2]"
              />
              <CustomDropdown
                label=""
                options={months}
                value={formData.licenseExpiryMonth}
                onChange={(val) => updateFormField('licenseExpiryMonth', val)}
                widthClass="flex-[2]"
              />
              <CustomDropdown
                label=""
                options={years}
                value={formData.licenseExpiryYear}
                onChange={(val) => updateFormField('licenseExpiryYear', val)}
                widthClass="flex-[2]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
          <button
            onClick={() => setView('list')}
            className="px-6 py-2 bg-gray-100 text-[#0194F3] text-sm font-bold rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Maybe later
          </button>
          <button
            onClick={handleSave}
            className="px-10 py-2 bg-[#0194F3] text-white text-sm font-bold rounded-md hover:bg-blue-600 transition-colors shadow-md cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="w-full">
      {view === 'list' ? renderList() : renderForm()}
      
      {/* Delete confirmation modal với fade-in và nền mờ nhẹ */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          deleteModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 transition-opacity duration-300"
          onClick={cancelDelete}
        ></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 transform transition-all duration-300 scale-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this passenger? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={cancelDelete}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
            >
              No
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}