import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';

const SamskrutiCategory = ({ categories }) => {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(null);

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

    // Extract unique sub-categories
    const subCategories = useMemo(() => {
        const subs = [];
        const seen = new Set();
        items.forEach(item => {
            if (item.subCategory_en && !seen.has(item.subCategory_en)) {
                seen.add(item.subCategory_en);
                subs.push({
                    en: item.subCategory_en,
                    kn: item.subCategory_kn
                });
            }
        });
        return subs;
    }, [items]);

    // Filter items based on active tab
    const filteredItems = useMemo(() => {
        if (!activeTab) return items;
        return items.filter(item => item.subCategory_en === activeTab);
    }, [items, activeTab]);

    if (!category) return <div className="container">Category not found</div>;
    if (loading) return <LoadingScreen />;
    if (error) return <div className="container">Error: {error}</div>;

    const showTabs = subCategories.length > 1;

    return (
        <div className="content-area animate-fade-in">
            <Header title={category.title_kn} showBack subtitle={category.title_en} />
            <div className="container">
                <div className="card glass" style={{ marginBottom: '1.5rem', padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)' }}>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>{category.description}</p>
                </div>

                {showTabs && (
                    <div className="tabs-container" style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '0.5rem',
                        marginBottom: '1.5rem',
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
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    whiteSpace: 'nowrap',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    background: activeTab === tab.en ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                                    color: activeTab === tab.en ? 'white' : 'var(--text-secondary)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: activeTab === tab.en ? '0 4px 15px rgba(255, 153, 51, 0.3)' : 'none'
                                }}
                            >
                                <span style={{ display: 'block', fontSize: '1rem', marginBottom: '2px' }}>{tab.kn}</span>
                                <span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.8, textTransform: 'uppercase' }}>{tab.en}</span>
                            </button>
                        ))}
                    </div>
                )}

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {filteredItems.map((item, index) => (
                        <Link
                            to={item.customRoute || `/samskruti/${categoryId}/${item.id}`}
                            key={item.id}
                            style={{ textDecoration: 'none', animationDelay: `${index * 0.05}s` }}
                            className="animate-slide-up"
                        >
                            <div className="card" style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 600 }}>{item.title_kn}</h3>
                                        <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            {item.title_en}
                                        </p>
                                    </div>
                                    <div style={{ background: 'rgba(255, 153, 51, 0.1)', padding: '8px', borderRadius: '12px' }}>
                                        <ChevronRight color="var(--primary)" size={18} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {filteredItems.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                            No items found in this section.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SamskrutiCategory;
