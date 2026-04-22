import React, { useState, useEffect } from 'react';
import { useGlobal } from '../../context/GlobalContext';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useGlobal();

  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Backend connection failed", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-[1920px] mx-auto px-4 lg:px-[300px] py-12">
      <h1 className="text-4xl font-bold mb-6">{t('welcome')}</h1>
      <p className="text-gray-600">{t('startEditing')}</p>
      
      <div className="mt-10 p-4 bg-gray-100 rounded-xl inline-block font-mono text-sm">
         {loading ? t('checkingConnection') : data ? `✅ ${data.message}` : `❌ ${t('backendOffline')}`}
      </div>
    </div>
  );
};

export default Home;
