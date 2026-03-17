import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Target, Leaf, Heart, Users, Activity, Sparkles, BookOpen, ShieldCheck, Zap, Flame, ChevronDown, ChevronUp } from 'lucide-react';

const DharmicLifestyle = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('yamas');
    const [expandedItems, setExpandedItems] = useState({});

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

    const toggleExpand = (key) => {
        setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (loading) return (
        <div className="content-area animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
    );

    if (!data) return null;

    return (
        <div className="content-area animate-fade-in">
            <Header title="ಧಾರ್ಮಿಕ ಜೀವನ" showBack />

            <div className="container" style={{ paddingBottom: '5rem' }}>

                {/* Tab Switcher */}
                <div className="tab-switcher" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', marginTop: '0.5rem' }}>
                    <button
                        onClick={() => setActiveTab('yamas')}
                        className="tab-switcher-button"
                        style={{
                            flex: 1, padding: '0.75rem', borderRadius: '14px',
                            border: activeTab === 'yamas' ? '1px solid rgba(52,199,89,0.5)' : '1px solid rgba(255,255,255,0.08)',
                            background: activeTab === 'yamas' ? 'rgba(52,199,89,0.12)' : 'rgba(255,255,255,0.03)',
                            color: activeTab === 'yamas' ? '#34C759' : 'var(--text-secondary)',
                            fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        ⚖️ ಯಮ & ನಿಯಮ
                    </button>
                    <button
                        onClick={() => setActiveTab('yajnas')}
                        className="tab-switcher-button"
                        style={{
                            flex: 1, padding: '0.75rem', borderRadius: '14px',
                            border: activeTab === 'yajnas' ? '1px solid rgba(255,149,0,0.5)' : '1px solid rgba(255,255,255,0.08)',
                            background: activeTab === 'yajnas' ? 'rgba(255,149,0,0.15)' : 'rgba(255,255,255,0.03)',
                            color: activeTab === 'yajnas' ? '#FF9500' : 'var(--text-secondary)',
                            fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        🔥 ಪಂಚ ಮಹಾಯಜ್ಞ
                    </button>
                </div>

                {/* Yamas & Niyamas Tab */}
                {activeTab === 'yamas' && (
                    <div className="animate-fade-in">
                        <div className="card glass" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid rgba(52,199,89,0.2)' }}>
                            <h2 style={{ fontSize: '1.25rem', color: '#34C759', marginBottom: '0.5rem', marginTop: 0 }}>{data.yamasNiyamas.title_kn}</h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{data.yamasNiyamas.description_kn}</p>
                        </div>

                        {/* Yamas Section */}
                        <h3 style={{ fontSize: '1.1rem', color: '#FF4B4B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={20} /> ಯಮಗಳು (Yamas) — ಸಾಮಾಜಿಕ ನೀತಿ
                        </h3>
                        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                            {data.yamasNiyamas.yamas.map((y, i) => {
                                const key = `yama-${i}`;
                                const isOpen = expandedItems[key];
                                return (
                                    <div key={i} className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #FF4B4B', overflow: 'hidden' }}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => toggleExpand(key)}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.3rem' }}>
                                                        {i + 1}. {y.title_kn}
                                                    </div>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7 }}>
                                                        {isOpen ? y.desc_kn : y.desc_kn.substring(0, 120) + (y.desc_kn.length > 120 ? '...' : '')}
                                                    </p>
                                                </div>
                                                <div style={{ flexShrink: 0, marginLeft: '0.5rem', marginTop: '0.25rem' }}>
                                                    {isOpen ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-secondary)" />}
                                                </div>
                                            </div>
                                        </div>

                                        {isOpen && (
                                            <div className="animate-fade-in" style={{ marginTop: '1rem' }}>
                                                {/* Shloka */}
                                                {y.shloka && (
                                                    <div style={{
                                                        padding: '0.75rem', borderRadius: '10px',
                                                        background: 'rgba(255,75,75,0.05)',
                                                        border: '1px solid rgba(255,75,75,0.1)',
                                                        marginBottom: '0.75rem',
                                                        fontStyle: 'italic',
                                                        fontSize: '0.85rem',
                                                        color: '#FF4B4B',
                                                        textAlign: 'center'
                                                    }}>
                                                        📜 {y.shloka}
                                                    </div>
                                                )}

                                                {/* English */}
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.8, fontStyle: 'italic', margin: '0 0 0.75rem', lineHeight: 1.5 }}>
                                                    {y.desc_en}
                                                </p>

                                                {/* Practice tip */}
                                                {y.practice_kn && (
                                                    <div style={{
                                                        padding: '0.75rem', borderRadius: '10px',
                                                        background: 'rgba(52,199,89,0.05)',
                                                        border: '1px solid rgba(52,199,89,0.1)',
                                                        fontSize: '0.8rem', color: 'var(--text-primary)',
                                                        lineHeight: 1.6,
                                                        display: 'flex', gap: '0.5rem', alignItems: 'flex-start'
                                                    }}>
                                                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>💡</span>
                                                        <span><strong style={{ color: '#34C759' }}>ಅಭ್ಯಾಸ:</strong> {y.practice_kn}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Niyamas Section */}
                        <h3 style={{ fontSize: '1.1rem', color: '#34C759', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={20} /> ನಿಯಮಗಳು (Niyamas) — ಆಂತರಿಕ ಶಿಸ್ತು
                        </h3>
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {data.yamasNiyamas.niyamas.map((n, i) => {
                                const key = `niyama-${i}`;
                                const isOpen = expandedItems[key];
                                return (
                                    <div key={i} className="card" style={{ padding: '1.25rem', borderLeft: '4px solid #34C759', overflow: 'hidden' }}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => toggleExpand(key)}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.3rem' }}>
                                                        {i + 1}. {n.title_kn}
                                                    </div>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7 }}>
                                                        {isOpen ? n.desc_kn : n.desc_kn.substring(0, 120) + (n.desc_kn.length > 120 ? '...' : '')}
                                                    </p>
                                                </div>
                                                <div style={{ flexShrink: 0, marginLeft: '0.5rem', marginTop: '0.25rem' }}>
                                                    {isOpen ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-secondary)" />}
                                                </div>
                                            </div>
                                        </div>

                                        {isOpen && (
                                            <div className="animate-fade-in" style={{ marginTop: '1rem' }}>
                                                {n.shloka && (
                                                    <div style={{
                                                        padding: '0.75rem', borderRadius: '10px',
                                                        background: 'rgba(52,199,89,0.05)',
                                                        border: '1px solid rgba(52,199,89,0.1)',
                                                        marginBottom: '0.75rem',
                                                        fontStyle: 'italic',
                                                        fontSize: '0.85rem',
                                                        color: '#34C759',
                                                        textAlign: 'center'
                                                    }}>
                                                        📜 {n.shloka}
                                                    </div>
                                                )}

                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.8, fontStyle: 'italic', margin: '0 0 0.75rem', lineHeight: 1.5 }}>
                                                    {n.desc_en}
                                                </p>

                                                {n.practice_kn && (
                                                    <div style={{
                                                        padding: '0.75rem', borderRadius: '10px',
                                                        background: 'rgba(255,153,51,0.05)',
                                                        border: '1px solid rgba(255,153,51,0.1)',
                                                        fontSize: '0.8rem', color: 'var(--text-primary)',
                                                        lineHeight: 1.6,
                                                        display: 'flex', gap: '0.5rem', alignItems: 'flex-start'
                                                    }}>
                                                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>💡</span>
                                                        <span><strong style={{ color: '#FF9933' }}>ಅಭ್ಯಾಸ:</strong> {n.practice_kn}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Pancha Maha Yajnas Tab */}
                {activeTab === 'yajnas' && (
                    <div className="animate-fade-in">
                        <div className="card glass" style={{ padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid rgba(255,149,0,0.2)' }}>
                            <h2 style={{ fontSize: '1.25rem', color: '#FF9500', marginBottom: '0.5rem', marginTop: 0 }}>{data.panchaMahaYajna.title_kn}</h2>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{data.panchaMahaYajna.description_kn}</p>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {data.panchaMahaYajna.yajnas.map((y, i) => {
                                const key = `yajna-${i}`;
                                const isOpen = expandedItems[key];
                                const icons = [Flame, BookOpen, Users, Heart, Leaf];
                                const IconComp = icons[i] || Flame;
                                return (
                                    <div key={i} className="card animate-slide-up" style={{ padding: '1.25rem', animationDelay: `${i * 0.08}s`, overflow: 'hidden' }}>
                                        <div
                                            style={{ display: 'flex', gap: '1rem', cursor: 'pointer' }}
                                            onClick={() => toggleExpand(key)}
                                        >
                                            <div style={{
                                                minWidth: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,149,0,0.1)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                            }}>
                                                <IconComp size={20} color="#FF9500" />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                                                    {i + 1}. {y.title_kn}
                                                </div>
                                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                                                    {y.title_en}
                                                </div>
                                                <p style={{
                                                    fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0,
                                                    overflow: isOpen ? 'visible' : 'hidden',
                                                    display: isOpen ? 'block' : '-webkit-box',
                                                    WebkitLineClamp: isOpen ? 'unset' : 3,
                                                    WebkitBoxOrient: 'vertical'
                                                }}>
                                                    {y.desc_kn}
                                                </p>
                                            </div>
                                            <div style={{ flexShrink: 0, alignSelf: 'flex-start', marginTop: '0.25rem' }}>
                                                {isOpen ? <ChevronUp size={16} color="var(--text-secondary)" /> : <ChevronDown size={16} color="var(--text-secondary)" />}
                                            </div>
                                        </div>

                                        {isOpen && (
                                            <div className="animate-fade-in" style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '0 0 0.75rem', lineHeight: 1.5, opacity: 0.8 }}>
                                                    {y.desc_en}
                                                </p>
                                                {y.practice_kn && (
                                                    <div style={{
                                                        padding: '0.75rem', borderRadius: '10px',
                                                        background: 'rgba(255,149,0,0.05)',
                                                        border: '1px solid rgba(255,149,0,0.1)',
                                                        fontSize: '0.8rem', color: 'var(--text-primary)',
                                                        lineHeight: 1.6,
                                                        display: 'flex', gap: '0.5rem', alignItems: 'flex-start'
                                                    }}>
                                                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>💡</span>
                                                        <span><strong style={{ color: '#FF9500' }}>ಅಭ್ಯಾಸ:</strong> {y.practice_kn}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="card glass" style={{ marginTop: '2rem', padding: '1.5rem', textAlign: 'center', background: 'rgba(255,149,0,0.05)', border: '1px solid rgba(255,149,0,0.1)' }}>
                            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)', fontStyle: 'italic', fontWeight: 500 }}>
                                "ಎಲ್ಲಾ ಜೀವಿಗಳಿಗೆ ಸೇವೆ ಮಾಡುವುದು ನಿಜವಾದ ಈಶ್ವರ ಸೇವೆ."
                            </p>
                            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                — ಸ್ವಾಮಿ ವಿವೇಕಾನಂದ
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DharmicLifestyle;
