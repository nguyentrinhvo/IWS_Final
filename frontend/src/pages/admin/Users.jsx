import React from 'react';
import { useTranslation } from 'react-i18next';

const Users = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('pages.users.title', 'Users Management')}</h1>
      <p className="text-gray-600">{t('pages.users.description', 'This is the users management page.')}</p>
    </div>
  );
};

export default Users;
