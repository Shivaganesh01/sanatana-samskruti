import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

import BottomNavigation from './components/BottomNavigation';
import LoadingScreen from './components/LoadingScreen';
import SamskrutiHome from './pages/SamskrutiHome';
import SamskrutiCategory from './pages/SamskrutiCategory';
import SamskrutiDetail from './pages/SamskrutiDetail';
import GitaList from './pages/GitaList';
import GitaDetail from './pages/GitaDetail';

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

// --- Main App ---

function App() {
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
    <Router>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;


