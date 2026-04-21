import { useState, useEffect } from 'react'
import Navbar from './layouts/Navbar'
import { useGlobal } from './context/GlobalContext'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t } = useGlobal()

  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(err => {
        console.error("Backend connection failed", err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-cyan-500/30 flex flex-col">
      <Navbar /> 

      <main className="w-full">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-[300px] py-12">
          <h1 className="text-4xl font-bold mb-6">{t('welcome')}</h1>
          <p className="text-gray-600">{t('startEditing')}</p>
          
          <div className="mt-10 p-4 bg-gray-100 rounded-xl inline-block font-mono text-sm">
             {loading ? t('checkingConnection') : data ? `✅ ${data.message}` : `❌ ${t('backendOffline')}`}
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 border-t border-gray-200">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-[300px] text-center text-slate-500 text-sm">
          &copy; 2026 HANU vivu. {t('footerText')}.
        </div>
      </footer>
    </div>
  )
}

export default App