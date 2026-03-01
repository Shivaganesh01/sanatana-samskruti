import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Activity, Heart, BookOpen, Sparkles, Flame, CheckCircle2, ArrowLeft, ChevronRight, Zap, Target } from 'lucide-react';

const MokshaMarga = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('yoga'); // 'yoga' | 'sadhana'
    const [selectedPath, setSelectedPath] = useState(null); // for Yoga detail view

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/moksha_paths.json');
                const json = await response.json();
                setData(json);
            } catch (err) {
                console.error("Error loading moksha_paths.json", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="content-area animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading Moksha Marga...</p>
        </div>
    );

    if (!data) return null;

    return (
        <div className="content-area animate-fade-in">
            <Header title="ಮೋಕ್ಷ ಮಾರ್ಗ (Path to Moksha)" />

            <div className="container" style={{ paddingBottom: '5rem' }}>

                {/* Tab Switcher */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
                    <button
                        onClick={() => { setActiveTab('yoga'); setSelectedPath(null); }}
                        style={{
                            flex: 1, padding: '0.75rem', borderRadius: '14px',
                            border: activeTab === 'yoga' ? '1px solid rgba(255,149,0,0.5)' : '1px solid rgba(255,255,255,0.08)',
                            background: activeTab === 'yoga' ? 'rgba(255,149,0,0.15)' : 'rgba(255,255,255,0.03)',
                            color: activeTab === 'yoga' ? '#FF9500' : 'var(--text-secondary)',
                            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        ☀️ ಯೋಗ ಮಾರ್ಗಗಳು
                    </button>
                    <button
                        onClick={() => { setActiveTab('sadhana'); setSelectedPath(null); }}
                        style={{
                            flex: 1, padding: '0.75rem', borderRadius: '14px',
                            border: activeTab === 'sadhana' ? '1px solid rgba(175,82,222,0.5)' : '1px solid rgba(255,255,255,0.08)',
                            background: activeTab === 'sadhana' ? 'rgba(175,82,222,0.12)' : 'rgba(255,255,255,0.03)',
                            color: activeTab === 'sadhana' ? '#AF52DE' : 'var(--text-secondary)',
                            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        💎 ಸಾಧನಾ ಗುಣಗಳು
                    </button>
                </div>

                {/* Yoga Margas Tab */}
                {activeTab === 'yoga' && (
                    <>
                        {!selectedPath ? (
                            <div className="animate-fade-in">
                                <div className="card glass" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <h2 style={{ fontSize: '1.4rem', color: '#FF9500', marginBottom: '0.5rem' }}>{data.yogaMargas.title_kn}</h2>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{data.yogaMargas.description_kn}</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                    {data.yogaMargas.paths.map((path, i) => (
                                        <div
                                            key={path.id}
                                            className="card animate-slide-up"
                                            onClick={() => setSelectedPath(path)}
                                            style={{
                                                padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.25rem',
                                                borderLeft: `4px solid ${path.color}`, cursor: 'pointer',
                                                animationDelay: `${i * 0.1}s`
                                            }}
                                        >
                                            <div style={{
                                                background: `${path.color}15`, width: '50px', height: '50px', borderRadius: '14px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                {path.id === 'karma' && <Activity color={path.color} size={28} />}
                                                {path.id === 'bhakti' && <Heart color={path.color} size={28} />}
                                                {path.id === 'jnana' && <BookOpen color={path.color} size={28} />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{path.title_kn}</h3>
                                                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{path.title_en}</p>
                                            </div>
                                            <ChevronRight size={20} color="var(--text-secondary)" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* Yoga Path Detail */
                            <div className="animate-fade-in">
                                <button
                                    onClick={() => setSelectedPath(null)}
                                    style={{
                                        background: 'none', border: 'none', color: '#FF9500',
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        marginBottom: '1.5rem', cursor: 'pointer', fontSize: '0.9rem'
                                    }}
                                >
                                    <ArrowLeft size={16} /> ← ಹಿಂದೆ ಹೋಗಿ (Back)
                                </button>

                                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '1.8rem', color: selectedPath.color, marginBottom: '0.3rem' }}>{selectedPath.title_kn}</h2>
                                    <p style={{ color: 'var(--text-secondary)' }}>{selectedPath.title_en}</p>
                                </div>

                                <div className="card glass" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: `4px solid ${selectedPath.color}` }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Sparkles size={18} color={selectedPath.color} /> ತತ್ವ (Philosophy)
                                    </h3>
                                    <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '1rem' }}>{selectedPath.philosophy_kn}</p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{selectedPath.philosophy_en}"</p>
                                </div>

                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>ಶ್ಲೋಕ (Scripture)</h3>
                                    <p style={{ fontStyle: 'italic', fontSize: '1rem', color: selectedPath.color, lineHeight: 1.6 }}>{selectedPath.shloka}</p>
                                </div>

                                <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Flame size={18} color={selectedPath.color} /> ಸಾಧನೆ (Implementation)
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selectedPath.practice_kn}</p>
                                    <div style={{ height: '0.5rem' }} />
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', opacity: 0.8 }}>{selectedPath.practice_en}</p>
                                </div>

                                <div style={{ padding: '1.5rem', borderRadius: '16px', background: `${selectedPath.color}08`, border: `1px solid ${selectedPath.color}20`, marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Zap size={18} color={selectedPath.color} /> ವಿಜ್ಞಾನ (Modern Context)
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>{selectedPath.scientific_kn}</p>
                                    <div style={{ height: '0.5rem' }} />
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{selectedPath.scientific_en}</p>
                                </div>

                                {selectedPath.modern_analogy && (
                                    <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: `4px solid #AF52DE` }}>
                                        <h3 style={{ fontSize: '1rem', color: '#AF52DE', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            💻 ಪ್ರಸ್ತುತ ತಲೆಮಾರು (For Gen-Z)
                                        </h3>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                                            "{selectedPath.modern_analogy}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        )
                        }
                    </>
                )}

                {/* Sadhana Chatustaya Tab */}
                {activeTab === 'sadhana' && (
                    <div className="animate-fade-in">
                        <div className="card glass" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid rgba(175,82,222,0.2)' }}>
                            <h2 style={{ fontSize: '1.4rem', color: '#AF52DE', marginBottom: '0.5rem' }}>{data.sadhanaChatustaya.title_kn}</h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{data.sadhanaChatustaya.description_kn}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                            {data.sadhanaChatustaya.qualifications.map((qual, i) => (
                                <div key={i} className="card animate-slide-up" style={{ padding: '1.5rem', borderLeft: '4px solid #AF52DE', animationDelay: `${i * 0.1}s` }}>
                                    <h3 style={{ fontSize: '1.1rem', color: '#AF52DE', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CheckCircle2 size={18} /> {qual.title_kn} ({qual.title_en})
                                    </h3>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{qual.description_kn}</p>
                                    <div style={{ background: 'rgba(175,82,222,0.05)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Target size={14} /> <span>{qual.lesson}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card glass" style={{ marginTop: '2rem', padding: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(175,82,222,0.1), rgba(255,149,0,0.1))' }}>
                            <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                                "ನಾನು ಈ ಪ್ರಪಂಚದಲ್ಲಿ ಕೇವಲ ಸಾಧಕನಲ್ಲ, ನಾನು ಮುಕ್ತನಾಗಲು ಹುಟ್ಟಿದ್ದೇನೆ."
                            </p>
                            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                I am not just a seeker in this world, I am born to be free.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MokshaMarga;
