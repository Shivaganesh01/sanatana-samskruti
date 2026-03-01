import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { App as CapacitorApp } from '@capacitor/app';

import BottomNavigation from './components/BottomNavigation';
import LoadingScreen from './components/LoadingScreen';
import SamskrutiHome from './pages/SamskrutiHome';
import SamskrutiCategory from './pages/SamskrutiCategory';
import SamskrutiDetail from './pages/SamskrutiDetail';
import GitaList from './pages/GitaList';
import GitaDetail from './pages/GitaDetail';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import JapaMala from './pages/JapaMala';
import ChakraSadhana from './pages/ChakraSadhana';
import MokshaMarga from './pages/MokshaMarga';
import DharmicLifestyle from './pages/DharmicLifestyle';
import { SettingsProvider } from './context/SettingsContext';

// --- Back Button Handler for Mobile ---

const BackButtonHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Stop any active TTS when navigating to a new page
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    const listener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      const isRoot = ['/', '/gita', '/explore', '/favorites', '/japa'].includes(location.pathname);

      if (isRoot) {
        CapacitorApp.exitApp();
      } else if (canGoBack) {
        window.history.back();
      } else {
        navigate(-1);
      }
    });

    return () => {
      listener.then(l => l.remove());
    };
  }, [location, navigate]);

  return null;
};

// --- Components ---

const ErrorFallback = ({ message }) => (
  <div className="container text-center animate-fade-in" style={{ paddingTop: '4rem' }}>
    <div style={{ background: 'rgba(255, 75, 75, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
      <AlertTriangle size={40} color="var(--danger)" />
    </div>
    <h3 style={{ color: 'var(--danger)', fontSize: '1.5rem' }}>Data Error</h3>
    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{message}</p>
    <button className="btn" onClick={() => window.location.reload()}>Retry</button>
  </div>
);

// --- Main App Content ---

const AppContent = () => {
  const [samskrutiData, setSamskrutiData] = useState([]);
  const [gitaData, setGitaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [samskrutiRes, gitaRes] = await Promise.all([
          fetch('/data/samskruti_index.json'),
          fetch('/data/gita_index.json')
        ]);

        if (!samskrutiRes.ok) throw new Error("Samskruti index not found");
        if (!gitaRes.ok) throw new Error("Gita index not found");

        const sData = await samskrutiRes.json();
        const gData = await gitaRes.json();

        setSamskrutiData(sData);
        setGitaData(gData);
      } catch (err) {
        console.error("App initialization error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorFallback message={error} />;

  return (
    <>
      <BackButtonHandler />
      <div id="root">
        <Routes>
          {/* Samskruti Routes */}
          <Route path="/" element={
            <>
              <SamskrutiHome categories={samskrutiData} />
              <BottomNavigation />
            </>
          } />
          <Route path="/samskruti/:categoryId" element={
            <>
              <SamskrutiCategory categories={samskrutiData} />
              <BottomNavigation />
            </>
          } />
          <Route path="/samskruti/:categoryId/:itemId" element={
            <>
              <SamskrutiDetail categories={samskrutiData} />
              <BottomNavigation />
            </>
          } />

          {/* Gita Routes */}
          <Route path="/gita" element={
            <>
              <GitaList data={gitaData} />
              <BottomNavigation />
            </>
          } />
          <Route path="/gita/:chapterId" element={
            <>
              <GitaDetail />
              <BottomNavigation />
            </>
          } />

          {/* New Routes */}
          <Route path="/explore" element={
            <>
              <Explore />
              <BottomNavigation />
            </>
          } />

          <Route path="/favorites" element={
            <>
              <Favorites />
              <BottomNavigation />
            </>
          } />

          <Route path="/japa" element={
            <>
              <JapaMala />
              <BottomNavigation />
            </>
          } />

          <Route path="/chakra-sadhana" element={
            <>
              <ChakraSadhana />
              <BottomNavigation />
            </>
          } />

          <Route path="/moksha-marga" element={
            <>
              <MokshaMarga />
              <BottomNavigation />
            </>
          } />

          <Route path="/dharmic-lifestyle" element={
            <>
              <DharmicLifestyle />
              <BottomNavigation />
            </>
          } />
        </Routes>
      </div>
    </>
  );
};

// --- App Root ---

// ... imports
import { FavoritesProvider } from './context/FavoritesContext';

// ... 

function App() {
  return (
    <SettingsProvider>
      <FavoritesProvider>
        <Router>
          <AppContent />
        </Router>
      </FavoritesProvider>
    </SettingsProvider>
  );
}

export default App;
