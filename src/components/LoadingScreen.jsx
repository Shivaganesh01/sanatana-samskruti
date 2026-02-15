import { Loader2 } from 'lucide-react';

const LoadingScreen = () => (
    <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--bg-color)',
        color: 'var(--primary)'
    }}>
        <div className="animate-spin" style={{ marginBottom: '1.5rem', animation: 'spin 2s linear infinite' }}>
            <Loader2 size={48} />
        </div>
        <div className="animate-pulse">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>ಸನಾತನ ಸಂಸ್ಕೃತಿ</h2>
        </div>
        <style>{`
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    `}</style>
    </div>
);

export default LoadingScreen;
