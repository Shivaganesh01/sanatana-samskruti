import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Heart, Trash2, BookOpen, Sun, Search, Filter, ChevronRight, Layers, BarChart3 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
    const { favorites, removeFavorite } = useFavorites();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'samskruti' | 'gita_chapter'
    const [showSearch, setShowSearch] = useState(false);

    const handleItemClick = (item) => {
        if (item.type === 'gita_chapter') {
            navigate(`/gita/${item.chapterId}`);
        } else {
            navigate(`/samskruti/${item.categoryId}/${item.id}`);
        }
    };

    // Group by type
    const grouped = useMemo(() => {
        const groups = {
            samskruti: favorites.filter(f => f.type === 'samskruti' || (!f.type)),
            gita: favorites.filter(f => f.type === 'gita_chapter')
        };
        return groups;
    }, [favorites]);

    // Filter by search and type
    const filteredFavorites = useMemo(() => {
        let filtered = favorites;

        if (activeFilter === 'samskruti') {
            filtered = grouped.samskruti;
        } else if (activeFilter === 'gita_chapter') {
            filtered = grouped.gita;
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                (item.title_kn && item.title_kn.toLowerCase().includes(q)) ||
                (item.title_en && item.title_en.toLowerCase().includes(q))
            );
        }

        return filtered;
    }, [favorites, activeFilter, searchQuery, grouped]);

    if (favorites.length === 0) {
        return (
            <div className="content-area animate-fade-in" style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
                <Header title="ಮೆಚ್ಚಿನವುಗಳು (Favorites)" />
                <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.7 }}>
                    <div style={{ background: 'rgba(255, 153, 51, 0.1)', padding: '2rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Heart size={48} color="var(--primary)" />
                    </div>
                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>ಇನ್ನೂ ಯಾವುದೇ ಮೆಚ್ಚಿನವುಗಳಿಲ್ಲ</h3>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '280px', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        ಶ್ಲೋಕಗಳು ಅಥವಾ ಅಧ್ಯಾಯಗಳನ್ನು ಓದುವಾಗ ❤️ ಗುರುತನ್ನು ಬಳಸಿ ಇಲ್ಲಿ ಸೇರಿಸಿ.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
                        Tap the ❤️ icon while reading articles to save them here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="content-area animate-fade-in">
            <Header title="ಮೆಚ್ಚಿನವುಗಳು (Favorites)" />
            <div className="container">

                {/* Stats Summary */}
                <div style={{
                    display: 'flex', gap: '0.5rem',
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        flex: 1, padding: '0.75rem',
                        background: 'rgba(255,75,75,0.06)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,75,75,0.12)',
                        textAlign: 'center'
                    }}>
                        <Heart size={16} color="#FF4B4B" style={{ marginBottom: '0.25rem' }} />
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FF4B4B' }}>{favorites.length}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>ಒಟ್ಟು (Total)</div>
                    </div>
                    <div style={{
                        flex: 1, padding: '0.75rem',
                        background: 'rgba(255,153,51,0.06)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,153,51,0.12)',
                        textAlign: 'center'
                    }}>
                        <Sun size={16} color="#FF9933" style={{ marginBottom: '0.25rem' }} />
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FF9933' }}>{grouped.samskruti.length}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>ಸಂಸ್ಕೃತಿ</div>
                    </div>
                    <div style={{
                        flex: 1, padding: '0.75rem',
                        background: 'rgba(255,215,0,0.06)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,215,0,0.12)',
                        textAlign: 'center'
                    }}>
                        <BookOpen size={16} color="#FFD700" style={{ marginBottom: '0.25rem' }} />
                        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFD700' }}>{grouped.gita.length}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>ಗೀತೆ (Gita)</div>
                    </div>
                </div>

                {/* Filter Pills + Search */}
                <div style={{
                    display: 'flex', gap: '0.5rem', alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        display: 'flex', gap: '0.3rem', flex: 1,
                        overflowX: 'auto', scrollbarWidth: 'none'
                    }}>
                        {[
                            { key: 'all', label: 'ಎಲ್ಲಾ', count: favorites.length },
                            { key: 'samskruti', label: 'ಸಂಸ್ಕೃತಿ', count: grouped.samskruti.length },
                            { key: 'gita_chapter', label: 'ಗೀತೆ', count: grouped.gita.length }
                        ].filter(f => f.count > 0).map(filter => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                style={{
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    background: activeFilter === filter.key ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                    color: activeFilter === filter.key ? '#000' : 'var(--text-secondary)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {filter.label} ({filter.count})
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            setShowSearch(!showSearch);
                            if (showSearch) setSearchQuery('');
                        }}
                        style={{
                            background: showSearch ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            border: 'none',
                            padding: '0.5rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Search size={16} color={showSearch ? '#000' : 'var(--text-secondary)'} />
                    </button>
                </div>

                {/* Search Input */}
                {showSearch && (
                    <div className="animate-fade-in" style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ಮೆಚ್ಚಿನವುಗಳಲ್ಲಿ ಹುಡುಕಿ..."
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--surface-color)',
                                color: 'var(--text-primary)',
                                fontSize: '0.9rem',
                                fontFamily: 'var(--font-sans)',
                                outline: 'none'
                            }}
                        />
                    </div>
                )}

                {/* Favorites List */}
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {filteredFavorites.map((item, index) => (
                        <div
                            key={item.id}
                            className="card glass animate-slide-up"
                            style={{
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                border: '1px solid var(--border-color)',
                                animationDelay: `${index * 0.03}s`
                            }}
                            onClick={() => handleItemClick(item)}
                        >
                            <div style={{
                                background: item.type === 'gita_chapter' ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 153, 51, 0.1)',
                                padding: '10px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                {item.type === 'gita_chapter' ?
                                    <BookOpen size={22} color="var(--secondary)" /> :
                                    <Sun size={22} color="var(--primary)" />
                                }
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h4 style={{
                                    margin: '0 0 0.2rem', color: 'var(--text-primary)',
                                    fontSize: '1rem', fontWeight: 600,
                                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                                }}>
                                    {item.title_kn}
                                </h4>
                                <p style={{
                                    margin: 0, color: 'var(--text-secondary)', fontSize: '0.8rem',
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                }}>
                                    {item.title_en}
                                </p>
                                <div style={{
                                    marginTop: '0.3rem',
                                    display: 'flex', gap: '0.3rem', alignItems: 'center'
                                }}>
                                    <span style={{
                                        fontSize: '0.6rem',
                                        background: item.type === 'gita_chapter' ? 'rgba(255,215,0,0.1)' : 'rgba(255,153,51,0.1)',
                                        color: item.type === 'gita_chapter' ? 'var(--secondary)' : 'var(--primary)',
                                        padding: '1px 6px',
                                        borderRadius: '4px',
                                        fontWeight: 600
                                    }}>
                                        {item.type === 'gita_chapter' ? 'ಭಗವದ್ಗೀತೆ' : 'ಸಂಸ್ಕೃತಿ'}
                                    </span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', flexShrink: 0 }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (window.confirm('Delete from favorites?')) {
                                            removeFavorite(item.id);
                                        }
                                    }}
                                    style={{
                                        background: 'rgba(255, 75, 75, 0.1)',
                                        border: 'none',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        color: 'var(--danger)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredFavorites.length === 0 && searchQuery && (
                        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-secondary)' }}>
                            "{searchQuery}" ಗೆ ಯಾವ ಮೆಚ್ಚಿನವುಗಳೂ ಕಂಡಿಲ್ಲ
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
