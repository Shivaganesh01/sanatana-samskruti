import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';

const SamskrutiCategory = ({ categories }) => {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const category = categories.find(c => c.id === categoryId);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/data/samskruti/${categoryId}.json`);
                if (!res.ok) throw new Error("Category items not found");
                const data = await res.json();
                setItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (categoryId) fetchItems();
    }, [categoryId]);

    if (!category) return <div className="container">Category not found</div>;
    if (loading) return <LoadingScreen />;
    if (error) return <div className="container">Error: {error}</div>;

    return (
        <div className="content-area animate-fade-in">
            <Header title={category.title_kn} showBack subtitle={category.title_en} />
            <div className="container">
                <div className="card glass" style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)' }}>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{category.description}</p>
                </div>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {items.map((item, index) => (
                        <Link
                            to={`/samskruti/${categoryId}/${item.id}`}
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
                </div>
            </div>
        </div>
    );
};

export default SamskrutiCategory;
