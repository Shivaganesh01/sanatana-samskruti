
import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { Home, BookOpen, Sun, ChevronRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import samskrutiRaw from './data/samskruti.json';
import gitaRaw from './data/gita.json';
import { validateSamskrutiData, validateGitaData } from './utils/validators';

// --- Data Validation Layer ---

// Validate Data ONLY ONCE during module load to allow fast rendering usually
// In a real app, might want to do this in a Service or Context
const samskrutiData = validateSamskrutiData(samskrutiRaw);
const gitaData = validateGitaData(gitaRaw);

// --- Components ---

const Header = ({ title, showBack }) => {
  return (
    <header className="glass" style={{
      position: 'sticky', top: 0, zIndex: 50, padding: '1rem',
      display: 'flex', alignItems: 'center', gap: '1rem'
    }}>
      {showBack && (
        <Link to={-1} style={{ color: 'var(--text-primary)' }}>
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

// --- Pages: Samskruti ---

const SamskrutiHome = () => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!samskrutiData || samskrutiData.length === 0) return <ErrorFallback message="Failed to load Samskruti data." />;

  const filteredData = samskrutiData.filter(category =>
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
            width: '100%',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            background: 'var(--surface-color)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            boxShadow: 'var(--shadow-sm)'
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

const SamskrutiCategory = () => {
  const { categoryId } = useParams();
  const category = samskrutiData.find(c => c.id === categoryId);

  if (!category) return <div className="container">Category not found</div>;

  return (
    <div className="content-area animate-fade-in">
      <Header title={category.title_kn} showBack={true} />
      <div className="container">
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {category.description}
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {category.items.map((item) => (
            <Link to={`/samskruti/${categoryId}/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title_kn}</h3>
                  <ChevronRight color="var(--text-secondary)" size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const SamskrutiDetail = () => {
  const { categoryId, itemId } = useParams();
  const category = samskrutiData.find(c => c.id === categoryId);
  const item = category?.items.find(i => i.id === itemId);

  if (!item) return <div className="container">Item not found</div>;

  return (
    <div className="content-area animate-fade-in">
      <Header title={item.title_kn} showBack={true} />
      <div className="container">

        {item.shloka && (
          <div className="card glass" style={{ background: 'rgba(255, 153, 51, 0.1)', border: '1px solid var(--primary)' }}>
            <h4 style={{ color: 'var(--primary)', marginTop: 0, fontSize: '0.9rem', textTransform: 'uppercase' }}>Shloka</h4>
            <p style={{ fontFamily: 'serif', whiteSpace: 'pre-line', fontSize: '1.2rem', fontWeight: 'bold', lineHeight: '1.8' }}>
              {item.shloka}
            </p>
          </div>
        )}

        <div className="card glass">
          <p style={{ whiteSpace: 'pre-line', fontSize: '1.1rem', lineHeight: '1.6' }}>
            {item.content_kn}
          </p>
        </div>

        <div className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--primary)' }}>
          <h4 style={{ margin: '0 0 0.5rem', color: 'var(--text-secondary)' }}>English Meaning</h4>
          <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            {item.content_en}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Pages: Gita ---

const GitaList = () => {
  if (!gitaData || gitaData.length === 0) return <ErrorFallback message="Failed to load Gita data." />;

  return (
    <div className="container content-area animate-fade-in">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>ಶ್ರೀಮದ್ ಭಗವದ್ಗೀತೆ</h2>
        <p className="text-secondary">ಅಧ್ಯಾಯಗಳ ಸಾರಾಂಶ & ಶ್ಲೋಕಗಳು</p>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {gitaData.map((chapter) => (
          <Link to={`/gita/${chapter.chapter}`} key={chapter.chapter} style={{ textDecoration: 'none' }}>
            <div className="card">
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  background: 'var(--primary)', color: '#000', width: '40px', height: '40px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {chapter.chapter}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{chapter.title_kn}</h3>
                </div>
                <ChevronRight color="var(--text-secondary)" size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const GitaDetail = () => {
  const { chapterId } = useParams();
  const chapter = gitaData.find(d => d.chapter === parseInt(chapterId));

  if (!chapter) return <div className="container">Chapter not found</div>;

  return (
    <div className="content-area animate-fade-in">
      <Header title={`ಅಧ್ಯಾಯ ${chapter.chapter}`} showBack={true} />
      <div className="container">

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
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>
                  {verse.transliteration}
                </p>
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
    </div>
  );
};

// --- Main App ---

function App() {
  return (
    <Router>
      <Routes>
        {/* Samskruti Routes */}
        <Route path="/" element={
          <>
            <Header title="ಸನಾತನ ಸಂಸ್ಕೃತಿ" />
            <SamskrutiHome />
            <BottomNavigation />
          </>
        } />
        <Route path="/samskruti/:categoryId" element={
          <>
            <SamskrutiCategory />
            <BottomNavigation />
          </>
        } />
        <Route path="/samskruti/:categoryId/:itemId" element={
          <>
            <SamskrutiDetail />
            <BottomNavigation />
          </>
        } />

        {/* Gita Routes */}
        <Route path="/gita" element={
          <>
            <Header title="ಭಗವದ್ಗೀತೆ" />
            <GitaList />
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
    </Router>
  );
}

export default App;
