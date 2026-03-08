import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { getRecentlyViewed } from '../utils/readingProgress';

const RecentlyViewedWidget = () => {
    const [recent, setRecent] = useState([]);

    useEffect(() => {
        setRecent(getRecentlyViewed());
    }, []);

    if (recent.length === 0) return null;

    // Show only last 5
    const items = recent.slice(0, 5);

    const getTimeAgo = (timestamp) => {
        const diff = Date.now() - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'ಈಗ';
        if (minutes < 60) return `${minutes}ನಿ ಹಿಂದೆ`;
        if (hours < 24) return `${hours}ಗಂ ಹಿಂದೆ`;
        return `${days}ದಿ ಹಿಂದೆ`;
    };

    const getItemLink = (item) => {
        if (item.type === 'gita_chapter') {
            return `/gita/${item.categoryId}`;
        }
        return `/samskruti/${item.categoryId}/${item.id}`;
    };

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                marginBottom: '0.75rem'
            }}>
                <Clock size={16} color="var(--text-secondary)" />
                <h4 style={{
                    margin: 0, fontSize: '0.85rem', fontWeight: 600,
                    color: 'var(--text-secondary)', textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    ಇತ್ತೀಚೆಗೆ ಓದಿದ (Recently Viewed)
                </h4>
            </div>
            <div style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '0.75rem',
                paddingBottom: '0.5rem',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch',
                msOverflowStyle: 'none'
            }}>
                {items.map((item, index) => (
                    <Link
                        key={item.id + '-' + index}
                        to={getItemLink(item)}
                        style={{
                            textDecoration: 'none',
                            minWidth: '180px',
                            maxWidth: '200px',
                            flexShrink: 0
                        }}
                    >
                        <div className="card" style={{
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.06)'
                        }}>
                            <div style={{
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                marginBottom: '0.25rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {item.title_kn}
                            </div>
                            <div style={{
                                fontSize: '0.7rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '0.5rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {item.title_en}
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                            }}>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                                    {getTimeAgo(item.timestamp)}
                                </span>
                                <ChevronRight size={14} color="var(--primary)" style={{ opacity: 0.5 }} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewedWidget;
