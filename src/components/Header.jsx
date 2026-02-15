import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import SearchDialog from './SearchDialog';

const Header = ({ title, showBack, subtitle }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <header className="glass" style={{
                position: 'sticky', top: 0, zIndex: 100, padding: '1rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
                borderBottom: '1px solid var(--border-color)',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    {showBack && (
                        <div
                            onClick={() => navigate(-1)}
                            className="nav-icon-container"
                            style={{ color: 'var(--text-primary)', padding: '8px', cursor: 'pointer' }}
                        >
                            <ArrowLeft size={20} />
                        </div>
                    )}
                    <div>
                        <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>{title}</h1>
                        {subtitle && <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{subtitle}</p>}
                    </div>
                </div>

                <div
                    onClick={() => setIsSearchOpen(true)}
                    style={{
                        padding: '8px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)'
                    }}
                >
                    <Search size={22} />
                </div>
            </header>

            {isSearchOpen && <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
        </>
    );
};

export default Header;
