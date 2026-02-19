import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Heart, Trash2, BookOpen, Sun } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
    const { favorites, removeFavorite } = useFavorites();
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        if (item.type === 'gita_chapter') {
            navigate(`/gita/${item.chapterId}`);
        } else {
            // Default to Samskruti items
            navigate(`/samskruti/${item.categoryId}/${item.id}`);
        }
    };

    if (favorites.length === 0) {
        return (
            <div className="content-area animate-fade-in" style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
                <Header title="ಮೆಚ್ಚಿನವುಗಳು (Favorites)" />
                <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.7 }}>
                    <div style={{ background: 'rgba(255, 153, 51, 0.1)', padding: '2rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <Heart size={48} color="var(--primary)" />
                    </div>
                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>ಇನ್ನೂ ಯಾವುದೇ ಮೆಚ್ಚಿನವುಗಳಿಲ್ಲ</h3>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '280px' }}>
                        ಶ್ಲೋಕಗಳು ಅಥವಾ ಅಧ್ಯಾಯಗಳನ್ನು ಓದುವಾಗ 'save' ಅಥವಾ 'bookmark' ಗುರುತನ್ನು ಬಳಸಿ ಇಲ್ಲಿ ಸೇರಿಸಿ.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="content-area animate-fade-in">
            <Header title="Your Favorites" />
            <div className="container">
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {favorites.map((item) => (
                        <div
                            key={item.id}
                            className="card glass"
                            style={{
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                border: '1px solid var(--border-color)'
                            }}
                            onClick={() => handleItemClick(item)}
                        >
                            <div style={{
                                background: item.type === 'gita_chapter' ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 153, 51, 0.1)',
                                padding: '10px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {item.type === 'gita_chapter' ?
                                    <BookOpen size={24} color={item.type === 'gita_chapter' ? 'var(--secondary)' : 'var(--primary)'} /> :
                                    <Sun size={24} color="var(--primary)" />
                                }
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <h4 style={{ margin: '0 0 0.25rem', color: 'var(--text-primary)', fontSize: '1rem' }}>{item.title_kn}</h4>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {item.title_en}
                                </p>
                            </div>

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
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
