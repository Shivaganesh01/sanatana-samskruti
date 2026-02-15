import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Settings } from 'lucide-react';
import SearchDialog from './SearchDialog';
import SettingsDialog from './SettingsDialog';

const Header = ({ title, showBack, subtitle }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</h1>
                        {subtitle && <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subtitle}</p>}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
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

                    <div
                        onClick={() => setIsSettingsOpen(true)}
                        style={{
                            padding: '8px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)'
                        }}
                    >
                        <Settings size={22} />
                    </div>
                </div>
            </header>

            {isSearchOpen && <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
            {isSettingsOpen && <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />}
        </>
    );
};

export default Header;
