import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Header = ({ title, showBack, subtitle }) => {
    return (
        <header className="glass" style={{
            position: 'sticky', top: 0, zIndex: 100, padding: '1rem 1.25rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            borderBottom: '1px solid var(--border-color)'
        }}>
            {showBack && (
                <Link to={-1} className="nav-icon-container" style={{ color: 'var(--text-primary)', padding: '8px' }}>
                    <ArrowLeft size={20} />
                </Link>
            )}
            <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>{title}</h1>
                {subtitle && <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{subtitle}</p>}
            </div>
        </header>
    );
};

export default Header;
