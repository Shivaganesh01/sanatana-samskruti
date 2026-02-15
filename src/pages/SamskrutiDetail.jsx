import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Zap } from 'lucide-react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import TTSButton from '../components/TTSButton';

const SamskrutiDetail = ({ categories }) => {
    const { categoryId, itemId } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/data/samskruti/${categoryId}.json`);
                if (!res.ok) throw new Error(`Could not load data for category: ${categoryId}`);
                const items = await res.json();
                const found = items.find(i => i.id === itemId);
                if (!found) {
                    console.error(`Item "${itemId}" not found in ${categoryId}. Available IDs:`, items.map(i => i.id));
                    throw new Error(`Item "${itemId}" not found in this category.`);
                }
                setItem(found);
            } catch (err) {
                console.error("Detail load error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [categoryId, itemId]);

    if (loading) return <LoadingScreen />;
    if (error) return <div className="container text-center" style={{ paddingTop: '4rem' }}><h3 style={{ color: 'var(--danger)' }}>ನೋಂದಣಿ ದೋಷ</h3><p>{error}</p></div>;
    if (!item) return <div className="container">Item not found</div>;

    return (
        <div className="content-area animate-fade-in">
            <Header title={item.title_kn} showBack />

            <div className="container">
                <article className="card glass" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: 'var(--primary)' }}>{item.title_kn}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>{item.title_en}</p>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                        <TTSButton
                            text={`${item.title_kn}. ${item.shloka || ''}. ${item.content_kn}`}
                            label="Listen / ಆಲಿಸಿ"
                        />
                    </div>

                    {item.shloka && (
                        <div className="shloka-box shloka-box-highlight">
                            <p className="shloka-text">{item.shloka}</p>
                        </div>
                    )}

                    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-line', color: 'var(--text-primary)', marginBottom: '2.5rem' }}>
                        {item.content_kn}
                    </div>

                    {item.benefits_kn && (
                        <div style={{ background: 'rgba(0, 230, 118, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(0, 230, 118, 0.1)' }}>
                            <h5 style={{ color: 'var(--success)', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Zap size={18} /> ಪ್ರಯೋಜನಗಳು:
                            </h5>
                            <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--text-secondary)', display: 'grid', gap: '0.5rem' }}>
                                {item.benefits_kn.map((b, i) => <li key={i} style={{ fontSize: '0.95rem' }}>{b}</li>)}
                            </ul>
                        </div>
                    )}

                    {item.content_en && (
                        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                            <h5 style={{ color: 'var(--primary)', margin: '0 0 1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}>English Translation & Summary</h5>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem' }}>
                                {item.content_en}
                            </p>
                        </div>
                    )}
                </article>
            </div>
        </div>
    );
};

export default SamskrutiDetail;
