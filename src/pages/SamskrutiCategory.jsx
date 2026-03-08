import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Search, BookOpen, CheckCircle2, Filter } from 'lucide-react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import { isItemRead, getCategoryProgress } from '../utils/readingProgress';

const SamskrutiCategory = ({ categories }) => {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const category = categories.find(c => c.id === categoryId);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const res = await fetch(`data/samskruti/${categoryId}.json`);
                if (!res.ok) throw new Error(`Category "${categoryId}" not found`);
                const data = await res.json();
                setItems(data);

                // Set default tab to the first sub-category if available
                if (data.length > 0 && data[0].subCategory_en) {
                    setActiveTab(data[0].subCategory_en);
                }
            } catch (err) {
                console.error("Category load error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (categoryId) fetchItems();
    }, [categoryId]);

    // Extract unique sub-categories with counts
    const subCategories = useMemo(() => {
        const subs = [];
        const seen = new Set();
        const counts = {};

        items.forEach(item => {
            if (item.subCategory_en) {
                if (!counts[item.subCategory_en]) counts[item.subCategory_en] = 0;
                counts[item.subCategory_en]++;
            }
        });

        items.forEach(item => {
            if (item.subCategory_en && !seen.has(item.subCategory_en)) {
                seen.add(item.subCategory_en);
                subs.push({
                    en: item.subCategory_en,
                    kn: item.subCategory_kn,
                    count: counts[item.subCategory_en] || 0
                });
            }
        });
        return subs;
    }, [items]);

    // Filter items based on active tab AND search
    const filteredItems = useMemo(() => {
        let filtered = items;
        if (activeTab) {
            filtered = filtered.filter(item => item.subCategory_en === activeTab);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                (item.title_kn && item.title_kn.toLowerCase().includes(q)) ||
                (item.title_en && item.title_en.toLowerCase().includes(q)) ||
                (item.content_kn && item.content_kn.toLowerCase().includes(q)) ||
                (item.content_en && item.content_en.toLowerCase().includes(q))
            );
        }
        return filtered;
    }, [items, activeTab, searchQuery]);

    // Reading progress for this category
    const progress = useMemo(() => {
        return getCategoryProgress(categoryId, items.length);
    }, [categoryId, items.length]);

    if (!category) return <div className="container">Category not found</div>;
    if (loading) return <LoadingScreen />;
    if (error) return <div className="container">Error: {error}</div>;

    const showTabs = subCategories.length > 1;

    return (
        <div className="content-area animate-fade-in">
            <Header title={category.title_kn} showBack subtitle={category.title_en} />
            <div className="container">
                {/* Category Info Card */}
                <div className="card glass" style={{
                    marginBottom: '1rem', padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.03)'
                }}>
                    <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                        {category.description}
                    </p>

                    {/* Progress bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{
                                height: '6px', background: 'rgba(255,255,255,0.06)',
                                borderRadius: '3px', overflow: 'hidden'
                            }}>
                                <div style={{
                                    height: '100%',
                                    width: `${progress.percentage}%`,
                                    background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                    borderRadius: '3px',
                                    transition: 'width 0.5s ease'
                                }} />
                            </div>
                        </div>
                        <span style={{
                            fontSize: '0.75rem', color: 'var(--text-secondary)',
                            whiteSpace: 'nowrap', fontWeight: 500
                        }}>
                            {progress.read}/{progress.total} ಓದಿದ
                        </span>
                    </div>
                </div>

                {/* Search + Filter Row */}
                <div style={{
                    display: 'flex', gap: '0.5rem', marginBottom: '1rem',
                    alignItems: 'center'
                }}>
                    {showSearch ? (
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Search style={{
                                position: 'absolute', left: '0.75rem', top: '50%',
                                transform: 'translateY(-50%)', color: 'var(--text-secondary)'
                            }} size={16} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ಈ ವಿಭಾಗದಲ್ಲಿ ಹುಡುಕಿ..."
                                autoFocus
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
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
                    ) : (
                        <div style={{
                            flex: 1,
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)'
                        }}>
                            {filteredItems.length} ವಿಷಯಗಳು ({filteredItems.length} items)
                        </div>
                    )}
                    <button
                        onClick={() => {
                            setShowSearch(!showSearch);
                            if (showSearch) setSearchQuery('');
                        }}
                        style={{
                            background: showSearch ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            border: 'none',
                            padding: '0.6rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Search size={18} color={showSearch ? '#000' : 'var(--text-secondary)'} />
                    </button>
                </div>

                {/* Sub-category Tabs */}
                {showTabs && (
                    <div className="tabs-container" style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '0.5rem',
                        marginBottom: '1.25rem',
                        paddingBottom: '0.5rem',
                        scrollbarWidth: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        {subCategories.map((tab) => (
                            <button
                                key={tab.en}
                                onClick={() => setActiveTab(tab.en)}
                                className={`tab-pill ${activeTab === tab.en ? 'active' : ''}`}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    whiteSpace: 'nowrap',
                                    fontSize: '0.85rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    background: activeTab === tab.en ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                                    color: activeTab === tab.en ? 'white' : 'var(--text-secondary)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: activeTab === tab.en ? '0 4px 15px rgba(255, 153, 51, 0.3)' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}
                            >
                                <span style={{ fontSize: '0.95rem' }}>{tab.kn}</span>
                                <span style={{
                                    fontSize: '0.6rem',
                                    background: activeTab === tab.en ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)',
                                    padding: '1px 6px',
                                    borderRadius: '50px',
                                    fontWeight: 700
                                }}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Items List */}
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {filteredItems.map((item, index) => {
                        const read = isItemRead(categoryId, item.id);
                        // Get a short preview from content
                        const preview = item.content_kn
                            ? item.content_kn.substring(0, 80) + (item.content_kn.length > 80 ? '...' : '')
                            : item.content_en
                                ? item.content_en.substring(0, 80) + (item.content_en.length > 80 ? '...' : '')
                                : '';

                        return (
                            <Link
                                to={item.customRoute || `/samskruti/${categoryId}/${item.id}`}
                                key={item.id}
                                style={{ textDecoration: 'none', animationDelay: `${index * 0.03}s` }}
                                className="animate-slide-up"
                            >
                                <div className="card" style={{
                                    padding: '1.25rem',
                                    borderLeft: read ? '3px solid var(--success)' : '3px solid transparent'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{item.title_kn}</h3>
                                                {read && (
                                                    <CheckCircle2 size={14} color="var(--success)" style={{ flexShrink: 0 }} />
                                                )}
                                            </div>
                                            <p style={{
                                                margin: '0.2rem 0 0', fontSize: '0.8rem',
                                                color: 'var(--text-secondary)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.02em'
                                            }}>
                                                {item.title_en}
                                            </p>
                                            {preview && (
                                                <p style={{
                                                    margin: '0.5rem 0 0', fontSize: '0.8rem',
                                                    color: 'var(--text-secondary)',
                                                    opacity: 0.7,
                                                    lineHeight: 1.4,
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}>
                                                    {preview}
                                                </p>
                                            )}
                                            {/* Tags row */}
                                            {item.benefits_kn && (
                                                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                                                    <span style={{
                                                        fontSize: '0.6rem',
                                                        background: 'rgba(0,230,118,0.1)',
                                                        color: 'var(--success)',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        fontWeight: 600
                                                    }}>
                                                        {item.benefits_kn.length} ಪ್ರಯೋಜನ
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div style={{
                                            background: 'rgba(255, 153, 51, 0.1)',
                                            padding: '8px', borderRadius: '12px',
                                            flexShrink: 0, marginLeft: '0.5rem',
                                            alignSelf: 'center'
                                        }}>
                                            <ChevronRight color="var(--primary)" size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                    {filteredItems.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                            {searchQuery ? `"${searchQuery}" ಗೆ ಯಾವ ಫಲಿತಾಂಶಗಳೂ ಇಲ್ಲ` : 'No items found in this section.'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SamskrutiCategory;
