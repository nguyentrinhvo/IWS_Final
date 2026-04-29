import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserLayout from './layouts/UserLayout';
import HomePage from './pages/HomePage/HomePage';
import { useGlobal } from './context/GlobalContext';
import UserAccount from './pages/PersonalProfile/UserAccount';

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
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profile/:tab" element={<UserAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;