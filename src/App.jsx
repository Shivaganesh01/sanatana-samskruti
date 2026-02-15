import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { BookOpen, Sun, ChevronRight, ArrowLeft, AlertTriangle, Loader2 } from 'lucide-react';
import { validateSamskrutiData, validateGitaData } from './utils/validators';

// --- Components ---

const Header = ({ title, showBack }) => {
  return (
    <header className="glass" style={{
      position: 'sticky', top: 0, zIndex: 50, padding: '1rem',
      display: 'flex', alignItems: 'center', gap: '1rem'
    }}>
      {showBack && (
        <Link to="/" style={{ color: 'var(--text-primary)' }}>
          <ArrowLeft size={24} />
        </Link>
      )}
      <h1 style={{ fontSize: '1.25rem', margin: 0, flex: 1 }}>{title}</h1>
    </header>
  );
};

const BottomNavigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
        <Sun className="nav-icon" size={24} />
        <span>ಸಂಸ್ಕೃತಿ</span>
      </Link>
      <Link to="/gita" className={`nav-item ${isActive('/gita') ? 'active' : ''}`}>
        <BookOpen className="nav-icon" size={24} />
        <span>ಭಗವದ್ಗೀತೆ</span>
      </Link>
    </nav>
  );
};

const ErrorFallback = ({ message }) => (
  <div className="container text-center" style={{ paddingTop: '2rem' }}>
    <AlertTriangle size={48} color="var(--danger)" />
    <h3 style={{ color: 'var(--danger)' }}>Data Error</h3>
    <p>{message}</p>
    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
      Ensure JSON files are not corrupted.
    </p>
  </div>
);

const LoadingScreen = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'var(--background-color)',
    color: 'var(--primary)'
  }}>
    <div className="animate-spin" style={{ marginBottom: '1rem' }}>
      <Loader2 size={48} />
    </div>
    <p>Loading Content...</p>
  </div>
);

// --- Pages: Samskruti ---

const SamskrutiHome = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(category =>
    category.title_kn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.items.some(item =>
      item.title_kn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title_en.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container content-area animate-fade-in">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>ಸನಾತನ ಸಂಸ್ಕೃತಿ</h2>
        <p className="text-secondary">ನಿತ್ಯ ಜೀವನದಲ್ಲಿ ಧರ್ಮ ಮತ್ತು ಆಚರಣೆಗಳು</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="ಹಬ್ಬಗಳು, ದಿನಚರ್ಯ, ಶ್ಲೋಕಗಳನ್ನು ಹುಡುಕಿ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%', padding: '1rem', borderRadius: '12px',
            border: '1px solid var(--glass-border)', background: 'var(--surface-color)',
            color: 'var(--text-primary)', fontSize: '1rem', boxShadow: 'var(--shadow-sm)'
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredData.map((category) => (
          <Link to={`/samskruti/${category.id}`} key={category.id} style={{ textDecoration: 'none' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{category.title_kn}</h3>
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {category.title_en}
                  </p>
                </div>
                <ChevronRight color="var(--primary)" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const SamskrutiCategory = ({ data }) => {
  const { categoryId } = useParams();
  const category = data.find(c => c.id === categoryId);

  if (!category) return <ErrorFallback message="Category not found" />;

  return (
    <div className="container content-area animate-fade-in">
      <Header title={category.title_kn} showBack />
      <div style={{ marginBottom: '2rem' }}>
        <p className="text-secondary">{category.description}</p>
      </div>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {category.items.map((item) => (
          <Link to={`/samskruti/${categoryId}/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title_kn}</h3>
                  <p style={{ margin: '0.3rem 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {item.title_en}
                  </p>
                </div>
                <ChevronRight color="var(--primary)" size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const SamskrutiDetail = ({ data }) => {
  const { categoryId, itemId } = useParams();
  const category = data.find(c => c.id === categoryId);
  const item = category?.items.find(i => i.id === itemId);

  if (!item) return <ErrorFallback message="Item not found" />;

  return (
    <div className="container content-area animate-fade-in">
      <Header title={item.title_kn} showBack />

      <div className="card glass" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, color: 'var(--primary)' }}>{item.title_kn}</h2>
        <h4 style={{ marginTop: 0, color: 'var(--text-secondary)' }}>{item.title_en}</h4>

        {item.shloka && (
          <div style={{ background: 'rgba(255, 153, 51, 0.1)', padding: '1rem', borderRadius: '8px', margin: '1.5rem 0', borderLeft: '4px solid var(--primary)' }}>
            <p style={{ fontFamily: 'serif', fontSize: '1.2rem', fontWeight: 'bold', margin: 0, whiteSpace: 'pre-line' }}>
              {item.shloka}
            </p>
          </div>
        )}

        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
          {item.content_kn}
        </div>

        {item.content_en && (
          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
              {item.content_en}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Pages: Gita ---

const GitaList = ({ data }) => {
  return (
    <div className="container content-area animate-fade-in">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>ಶ್ರೀಮದ್ ಭಗವದ್ಗೀತೆ</h2>
        <p className="text-secondary">ಯೋಗೇಶ್ವರ ಕೃಷ್ಣನ ಉಪದೇಶ</p>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {data.map((chapter) => (
          <Link to={`/gita/${chapter.chapter}`} key={chapter.chapter} style={{ textDecoration: 'none' }}>
            <div className="card">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  background: 'var(--secondary)', color: 'black',
                  width: '40px', height: '40px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {chapter.chapter}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{chapter.title_kn}</h3>
                  <p style={{ margin: '0.3rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                    {chapter.summary_kn}
                  </p>
                </div>
                <ChevronRight color="var(--primary)" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const GitaDetail = ({ data }) => {
  const { chapterId } = useParams();
  const chapter = data.find(c => c.chapter === parseInt(chapterId));

  if (!chapter) return <ErrorFallback message="Chapter not found" />;

  return (
    <div className="container content-area animate-fade-in">
      <Header title={`ಅಧ್ಯಾಯ ${chapter.chapter}: ${chapter.title_kn}`} showBack />

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, color: 'var(--primary)' }}>{chapter.title_kn}</h2>
      </div>

      <div className="card glass">
        <h4 style={{ color: 'var(--secondary)', marginTop: 0 }}>ಶ್ಲೋಕ ಆರಂಭ:</h4>
        <p style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          {chapter.verses_intro_kn}
        </p>

        <h4 style={{ color: 'var(--primary)', marginTop: 0 }}>ಸಾರಾಂಶ:</h4>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          {chapter.summary_kn}
        </p>
      </div>

      {chapter.verses && chapter.verses.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>ಪ್ರಮುಖ ಶ್ಲೋಕಗಳು</h3>
          {chapter.verses.map(verse => (
            <div key={verse.verse_number} className="card" style={{ border: '1px solid var(--secondary)' }}>
              <div style={{ background: 'var(--secondary)', color: 'black', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'inline-block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                ಶ್ಲೋಕ {chapter.chapter}.{verse.verse_number}
              </div>
              <p style={{ fontFamily: 'serif', fontSize: '1.1rem', fontWeight: 'bold', whiteSpace: 'pre-line' }}>
                {verse.shloka}
              </p>
              {verse.transliteration && (
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>
                  {verse.transliteration}
                </p>
              )}
              <hr style={{ borderColor: 'var(--glass-border)', opacity: 0.3, margin: '1rem 0' }} />
              <p><strong>ಅರ್ಥ:</strong> {verse.translation}</p>
              {verse.purport && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '1.5rem' }}>💡</span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{verse.purport}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
        // Use relative paths to fetch from public/data
        const [samskrutiRes, gitaRes] = await Promise.all([
          fetch('data/samskruti.json'),
          fetch('data/gita.json')
        ]);

        if (!samskrutiRes.ok) throw new Error(`Samskruti fetch failed: ${samskrutiRes.status}`);
        if (!gitaRes.ok) throw new Error(`Gita fetch failed: ${gitaRes.status}`);

        const samskrutiRaw = await samskrutiRes.json();
        const gitaRaw = await gitaRes.json();

        // Validate
        const validSamskruti = validateSamskrutiData(samskrutiRaw);
        const validGita = validateGitaData(gitaRaw);

        setSamskrutiData(validSamskruti);
        setGitaData(validGita);
      } catch (err) {
        console.error("Data Fetch Error:", err);
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
      <Routes>
        {/* Samskruti Routes */}
        <Route path="/" element={
          <>
            <Header title="ಸನಾತನ ಸಂಸ್ಕೃತಿ" />
            <SamskrutiHome data={samskrutiData} />
            <BottomNavigation />
          </>
        } />
        <Route path="/samskruti/:categoryId" element={
          <>
            <SamskrutiCategory data={samskrutiData} />
            <BottomNavigation />
          </>
        } />
        <Route path="/samskruti/:categoryId/:itemId" element={
          <>
            <SamskrutiDetail data={samskrutiData} />
            <BottomNavigation />
          </>
        } />

        {/* Gita Routes */}
        <Route path="/gita" element={
          <>
            <Header title="ಭಗವದ್ಗೀತೆ" />
            <GitaList data={gitaData} />
            <BottomNavigation />
          </>
        } />
        <Route path="/gita/:chapterId" element={
          <>
            <GitaDetail data={gitaData} />
            <BottomNavigation />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
