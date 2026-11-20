import React, { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';

const CVV_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="11.9999" r="9" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></circle>
    <rect x="12" y="8" width="0.01" height="0.01" stroke="#292929" strokeWidth="3.75" strokeLinejoin="round"></rect>
    <path d="M12 12V16" stroke="#292929" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const cardIcons = {
  visa: '/icons/visa.svg',
  mastercard: '/icons/mastercard.svg',
  paypal: '/icons/paypal.svg',
};

export default function MyCards() {
  const { t } = useGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [cardType, setCardType] = useState('visa');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) setCardNumber(value);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
    setExpiry(val);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) setCvv(value);
  };

  const handleNameChange = (e) => {
    let value = e.target.value.replace(/[^a-zA-ZÀ-ỹ\s\.\-]/g, '');
    setName(value);
  };

  const openAddModal = () => {
    setEditingCardId(null);
    setCardType('visa');
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setName('');
    setIsModalOpen(true);
  };

  const openEditModal = (card) => {
    setEditingCardId(card.id);
    setCardType(card.cardType);
    setCardNumber(card.fullCardNumber);
    setExpiry(card.expiry);
    setCvv(card.cvv);
    setName(card.name);
    setIsModalOpen(true);
  };

  const handleSaveCard = () => {
    if (!cardNumber || !expiry || !cvv || !name) return;

    if (editingCardId !== null) {
      setCards(
        cards.map((card) =>
          card.id === editingCardId
            ? {
                ...card,
                cardType,
                fullCardNumber: cardNumber,
                last4: cardNumber.slice(-4),
                expiry,
                cvv,
                name,
              }
            : card
        )
      );
      showToastMessage('Card updated successfully');
    } else {
      const newCard = {
        id: Date.now(),
        cardType,
        fullCardNumber: cardNumber,
        last4: cardNumber.slice(-4),
        expiry,
        cvv,
        name,
      };
      setCards([...cards, newCard]);
      showToastMessage('Card added successfully');
    }
    setIsModalOpen(false);
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setName('');
    setCardType('visa');
    setEditingCardId(null);
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
    showToastMessage('Card deleted successfully');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isModalOpen) {
      e.preventDefault();
      handleSaveCard();
    }
  };

  return (
    <div className="w-full" onKeyDown={handleKeyDown}>
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-out">
          {toastMessage}
        </div>
      )}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t('user_myCards')}</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-50 transition-all text-black"
        >
          <span className="text-lg font-light leading-none text-[#0194F3]">+</span>
          <span>{t('user_addCard')}</span>
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="bg-white rounded-xl shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] border border-gray-100 p-10 flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{t('user_noSavedCards')}</h3>
          <p className="text-sm text-gray-500 max-w-md">{t('user_noSavedCardsDesc')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img src={cardIcons[card.cardType] || cardIcons.visa} alt={card.cardType} className="h-8 w-auto" />
                <div>
                  <p className="font-bold text-gray-800">**** **** **** {card.last4}</p>
                  <p className="text-xs text-gray-500 uppercase">{card.name}</p>
                  <p className="text-xs text-gray-400">Exp: {card.expiry}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => openEditModal(card)} className="text-[#0194F3] font-bold text-sm hover:underline">
                  {t('user_edit')}
                </button>
                <button onClick={() => handleDeleteCard(card.id)} className="text-red-500 font-bold text-sm hover:underline">
                  {t('user_delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-[600px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">
                {editingCardId !== null ? t('user_editCard') : t('user_addCard')}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">{t('user_acceptedCard')}</p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCardType('visa')}
                    className={`p-2 border rounded-md transition-all ${
                      cardType === 'visa' ? 'border-[#0194F3] bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <img src={cardIcons.visa} alt="Visa" className="h-8 w-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardType('mastercard')}
                    className={`p-2 border rounded-md transition-all ${
                      cardType === 'mastercard' ? 'border-[#0194F3] bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <img src={cardIcons.mastercard} alt="Mastercard" className="h-8 w-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardType('paypal')}
                    className={`p-2 border rounded-md transition-all ${
                      cardType === 'paypal' ? 'border-[#0194F3] bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <img src={cardIcons.paypal} alt="PayPal" className="h-8 w-auto" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_creditCardNum')}</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveCard()}
                  maxLength="16"
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none transition-colors placeholder-opacity-20"
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1">Only numbers, up to 16 digits</p>
              </div>

              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_validUntil')}</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiryChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveCard()}
                    maxLength="5"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_cvv')}</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveCard()}
                      maxLength="4"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none transition-colors placeholder-opacity-50"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">{CVV_ICON}</div>
                  </div>
                </div>
                <div className="w-[80px]">
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2023/04/27/1682590689907-1e638731e8bc451e52ea7f7e4c6d4d45.svg?tr=q-75"
                    alt="CVV help"
                    className="h-[42px] object-contain"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 ml-1">{t('user_nameOnCard')}</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={handleNameChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveCard()}
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:border-[#0194F3] focus:outline-none transition-colors placeholder-opacity-20"
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1">Letters only, no numbers</p>
              </div>

              <button
                onClick={handleSaveCard}
                className="w-full py-3 bg-[#0194F3] text-white font-bold rounded-md hover:bg-blue-600 transition-colors"
              >
                {editingCardId !== null ? t('user_save') : t('user_addCard')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
