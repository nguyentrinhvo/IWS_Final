import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserLayout from './layouts/UserLayout';
import { useGlobal } from './context/GlobalContext';

function App() {
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

  const HomePlaceholder = () => (
    <div className="py-12">
      <h1 className="text-4xl font-bold mb-6">{t('welcome')}</h1>
      <p className="text-gray-600">{t('startEditing')}</p>
      
      <div className="mt-10 p-4 bg-gray-100 rounded-xl inline-block font-mono text-sm">
        {loading ? t('checkingConnection') : (data ? JSON.stringify(data) : t('backendOffline'))}
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePlaceholder />} />
          {/* Add more routes here for other pages */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;