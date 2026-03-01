import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Target, Leaf, Heart, Users, Activity, Sparkles, BookOpen, ShieldCheck, Zap, Flame } from 'lucide-react';

const DharmicLifestyle = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('yamas'); // 'yamas' | 'yajnas'

    useEffect(() => {
        const fetchLifestyle = async () => {
            try {
                const res = await fetch('/data/dharmic_lifestyle.json');
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Error loading dharmic_lifestyle.json", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLifestyle();
    }, []);

    if (loading) return (
        <div className="content-area animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading Dharmic Lifestyle...</p>
        </div>
    );

    if (!data) return null;

    return (
        <div className="content-area animate-fade-in">
            <Header title="ಧಾರ್ಮಿಕ ಜೀವನ (Sanaatana Life)" />

            <div className="container" style={{ paddingBottom: '5rem' }}>

                {/* Tab Switcher */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
                    <button
                        onClick={() => setActiveTab('yamas')}
                        style={{
                            flex: 1, padding: '0.75rem', borderRadius: '14px',
                            border: activeTab === 'yamas' ? '1px solid rgba(52,199,89,0.5)' : '1px solid rgba(255,255,255,0.08)',
                            background: activeTab === 'yamas' ? 'rgba(52,199,89,0.12)' : 'rgba(255,255,255,0.03)',
                            color: activeTab === 'yamas' ? '#34C759' : 'var(--text-secondary)',
                            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        ⚖️ ಯಮ ಮತ್ತು ನಿಯಮ
                    </button>
                    <button
                        onClick={() => setActiveTab('yajnas')}
                        style={{
                            flex: 1, padding: '0.75rem', borderRadius: '14px',
                            border: activeTab === 'yajnas' ? '1px solid rgba(255,149,0,0.5)' : '1px solid rgba(255,255,255,0.08)',
                            background: activeTab === 'yajnas' ? 'rgba(255,149,0,0.15)' : 'rgba(255,255,255,0.03)',
                            color: activeTab === 'yajnas' ? '#FF9500' : 'var(--text-secondary)',
                            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        🔥 ಪಂಚ ಮಹಾಯಜ್ಞ
                    </button>
                </div>

                {/* Yamas & Niyamas Tab */}
                {activeTab === 'yamas' && (
                    <div className="animate-fade-in">
                        <div className="card glass" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid rgba(52,199,89,0.2)' }}>
                            <h2 style={{ fontSize: '1.4rem', color: '#34C759', marginBottom: '0.5rem' }}>{data.yamasNiyamas.title_kn}</h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{data.yamasNiyamas.description_kn}</p>
                        </div>

                        <h3 style={{ fontSize: '1.2rem', color: '#FF4B4B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={20} /> 1. ಯಮಗಳು (Yamas) - Restraints
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                            {data.yamasNiyamas.yamas.map((y, i) => (
                                <div key={i} className="card" style={{ padding: '1rem', borderLeft: '4px solid #FF4B4B' }}>
                                    <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>{y.title_kn} ({y.title_en})</div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.3rem 0 0' }}>{y.desc_kn}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.7, fontStyle: 'italic' }}>{y.desc_en}</p>
                                </div>
                            ))}
                        </div>

                        <h3 style={{ fontSize: '1.2rem', color: '#34C759', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={20} /> 2. ನಿಯಮಗಳು (Niyamas) - Observances
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                            {data.yamasNiyamas.niyamas.map((n, i) => (
                                <div key={i} className="card" style={{ padding: '1rem', borderLeft: '4px solid #34C759' }}>
                                    <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>{n.title_kn} ({n.title_en})</div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.3rem 0 0' }}>{n.desc_kn}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.7, fontStyle: 'italic' }}>{n.desc_en}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pancha Maha Yajnas Tab */}
                {activeTab === 'yajnas' && (
                    <div className="animate-fade-in">
                        <div className="card glass" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid rgba(255,149,0,0.2)' }}>
                            <h2 style={{ fontSize: '1.4rem', color: '#FF9500', marginBottom: '0.5rem' }}>{data.panchaMahaYajna.title_kn}</h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{data.panchaMahaYajna.description_kn}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            {data.panchaMahaYajna.yajnas.map((y, i) => (
                                <div key={i} className="card animate-slide-up" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', animationDelay: `${i * 0.1}s` }}>
                                    <div style={{
                                        minWidth: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,149,0,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                    }}>
                                        {i === 0 && <Flame size={20} color="#FF9500" />}
                                        {i === 1 && <BookOpen size={20} color="#FF9500" />}
                                        {i === 2 && <Users size={20} color="#FF9500" />}
                                        {i === 3 && <Heart size={20} color="#FF9500" />}
                                        {i === 4 && <Leaf size={20} color="#FF9500" />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{y.title_kn}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{y.title_en}</div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{y.desc_kn}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card glass" style={{ marginTop: '2rem', padding: '1.5rem', textAlign: 'center', background: 'rgba(255,149,0,0.05)', border: '1px solid rgba(255,149,0,0.1)' }}>
                            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)', fontStyle: 'italic', fontWeight: 500 }}>
                                "ಎಲ್ಲಾ ಜೀವಿಗಳಿಗೆ ಸೇವೆ ಮಾಡುವುದು ನಿಜವಾದ ಈಶ್ವರ ಸೇವೆ."
                            </p>
                            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                Serving all beings is the true service of Ishvara.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DharmicLifestyle;
