import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ChakraVisualizer from '../components/ChakraVisualizer';
import { Activity, Beaker, Zap, BookOpen, Heart, Eye, Flame, ArrowLeft, ChevronRight, Sparkles } from 'lucide-react';

// --- Sub-components ---

const InfoBadge = ({ color, children }) => (
    <div style={{
        background: 'rgba(255,255,255,0.05)',
        padding: '0.3rem 0.65rem',
        borderRadius: '8px',
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        border: `1px solid ${color}20`
    }}>
        {children}
    </div>
);

const SectionCard = ({ color, icon, title, children }) => (
    <div style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.02), ${color}08)`,
        borderRadius: '16px',
        padding: '1rem 1.15rem',
        border: `1px solid ${color}18`,
    }}>
        <h3 style={{
            fontSize: '1rem', marginBottom: '0.65rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            color: 'var(--text-primary)', fontWeight: 600
        }}>
            {icon} {title}
        </h3>
        {children}
    </div>
);

const TextBlock = ({ text, italic }) => (
    <p style={{
        fontSize: '0.88rem', color: 'var(--text-secondary)',
        lineHeight: 1.7, margin: 0,
        fontStyle: italic ? 'italic' : 'normal'
    }}>
        {text}
    </p>
);

const ScriptureBlock = ({ text, color }) => (
    <div style={{
        marginTop: '0.65rem',
        padding: '0.75rem 1rem',
        borderLeft: `3px solid ${color}`,
        background: `${color}08`,
        borderRadius: '0 10px 10px 0',
        fontFamily: "'Noto Serif', serif",
        fontSize: '0.85rem',
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
        whiteSpace: 'pre-line'
    }}>
        {text}
    </div>
);

// --- Chakra Detail Panel ---

const ChakraDetailPanel = ({ chakra }) => {
    if (!chakra) return null;
    const c = chakra.color;

    return (
        <div className="animate-fade-in" key={chakra.id} style={{
            display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
            {/* Title */}
            <div style={{ textAlign: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{
                    margin: 0, fontSize: '1.8rem', color: c,
                    fontWeight: 700, letterSpacing: '1px',
                    textShadow: `0 0 15px ${c}40`
                }}>
                    {chakra.name_kn}
                </h2>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{chakra.name_en}</p>
            </div>

            {/* Badges row */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <InfoBadge color={c}><span style={{ color: c }}>●</span> {chakra.colorName}</InfoBadge>
                <InfoBadge color={c}>{chakra.petals} Petals</InfoBadge>
                <InfoBadge color={c}>{chakra.element}</InfoBadge>
                <InfoBadge color={c}>{chakra.deity}</InfoBadge>
            </div>

            {/* Adhyatmic section */}
            <SectionCard color={c} icon={<Sparkles size={17} color={c} />} title="ಆಧ್ಯಾತ್ಮ (Adhyatmic)">
                <TextBlock text={chakra.adhyatmic} />
                <ScriptureBlock text={chakra.scripture} color={c} />
            </SectionCard>

            {/* Atma lesson */}
            <div style={{
                background: `linear-gradient(135deg, ${c}12, ${c}05)`,
                border: `1px solid ${c}30`,
                borderRadius: '14px',
                padding: '1rem 1.15rem',
                textAlign: 'center'
            }}>
                <Flame size={20} color={c} style={{ marginBottom: '0.35rem' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                    {chakra.atma_lesson}
                </p>
            </div>

            {/* Philosophy */}
            <SectionCard color={c} icon={<BookOpen size={17} color={c} />} title="ತತ್ವ (Philosophy)">
                <TextBlock text={chakra.description_kn} />
                <div style={{ height: '0.4rem' }} />
                <TextBlock text={chakra.description_en} italic />
            </SectionCard>

            {/* Science */}
            <SectionCard color={c} icon={<Beaker size={17} color={c} />} title="ವಿಜ್ಞಾನ (Science)">
                <TextBlock text={chakra.scientific} />
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.65rem' }}>
                    <InfoBadge color={c}>🧬 Gland: {chakra.gland}</InfoBadge>
                    <InfoBadge color={c}>🔗 {chakra.nervePlexus}</InfoBadge>
                </div>
            </SectionCard>

            {/* Balanced / Blocked */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(52, 199, 89, 0.08)', borderRadius: '12px', padding: '0.85rem', border: '1px solid rgba(52,199,89,0.15)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#34C759', fontWeight: 600, marginBottom: '0.3rem' }}>✓ ಸಮತೋಲಿತ (Balanced)</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{chakra.quality_balanced}</p>
                </div>
                <div style={{ background: 'rgba(255, 59, 48, 0.08)', borderRadius: '12px', padding: '0.85rem', border: '1px solid rgba(255,59,48,0.15)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#FF3B30', fontWeight: 600, marginBottom: '0.3rem' }}>✗ ಅವರೋಧ (Blocked)</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{chakra.quality_blocked}</p>
                </div>
            </div>

            {/* Sadhana / Practice */}
            <SectionCard color={c} icon={<Activity size={17} color={c} />} title="ಸಾಧನೆ (Practice)">
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    marginBottom: '0.65rem',
                    border: '1px solid rgba(255,255,255,0.04)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.35rem' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: c, lineHeight: 1 }}>
                            {chakra.beeja.split(' ')[0]}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>ಬೀಜ ಮಂತ್ರ (Beeja Mantra)</div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500 }}>{chakra.beeja}</div>
                        </div>
                    </div>
                    <TextBlock text={chakra.practice} />
                </div>
            </SectionCard>

            {/* Meditation */}
            <SectionCard color={c} icon={<Eye size={17} color={c} />} title="ಧ್ಯಾನ (Meditation)">
                <TextBlock text={chakra.meditation} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.6rem' }}>
                    <Zap size={14} color={c} />
                    <span>📍 {chakra.location_kn} / {chakra.location_en}</span>
                </div>
            </SectionCard>
        </div>
    );
};

// --- Atma Sadhana Panel ---

const AtmaSadhanaPanel = ({ data }) => {
    if (!data) return null;

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Title */}
            <div style={{ textAlign: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#E8E0FF', fontWeight: 700 }}>
                    {data.title_kn}
                </h2>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{data.title_en}</p>
            </div>

            {/* Introduction */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(232,224,255,0.06), rgba(175,82,222,0.06))',
                borderRadius: '16px',
                padding: '1.15rem',
                border: '1px solid rgba(232,224,255,0.12)'
            }}>
                <TextBlock text={data.introduction_kn} />
                <div style={{ height: '0.5rem' }} />
                <TextBlock text={data.introduction_en} italic />
            </div>

            {/* Steps */}
            {data.steps.map((step, i) => (
                <div key={i} style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '16px',
                    padding: '1.15rem',
                    border: '1px solid rgba(255,255,255,0.06)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', top: '-5px', right: '10px',
                        fontSize: '4rem', fontWeight: 800,
                        color: 'rgba(255,255,255,0.03)', lineHeight: 1
                    }}>{step.step}</div>

                    <h3 style={{
                        fontSize: '1rem', color: '#E8E0FF', fontWeight: 600,
                        margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <span style={{
                            background: 'rgba(175,82,222,0.2)',
                            width: '26px', height: '26px', borderRadius: '50%',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.8rem', flexShrink: 0
                        }}>{step.step}</span>
                        {step.title_kn}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem', fontStyle: 'italic' }}>{step.title_en}</p>

                    <TextBlock text={step.description_kn} />
                    <div style={{ height: '0.4rem' }} />
                    <TextBlock text={step.description_en} italic />
                    <ScriptureBlock text={step.scripture} color="#AF52DE" />
                </div>
            ))}

            {/* Daily Practice */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(255,204,0,0.06), rgba(255,153,51,0.06))',
                borderRadius: '16px',
                padding: '1.15rem',
                border: '1px solid rgba(255,204,0,0.15)',
            }}>
                <h3 style={{
                    fontSize: '1.1rem', color: '#FFCC00', fontWeight: 600,
                    margin: '0 0 0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                    <Flame size={18} color="#FFCC00" /> {data.dailyPractice.title_kn}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem', fontStyle: 'italic' }}>{data.dailyPractice.title_en}</p>

                {data.dailyPractice.practices.map((p, i) => (
                    <div key={i} style={{
                        display: 'flex', gap: '0.75rem',
                        padding: '0.75rem 0',
                        borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                    }}>
                        <div style={{
                            background: 'rgba(255,204,0,0.12)',
                            borderRadius: '10px',
                            padding: '0.4rem 0.6rem',
                            fontSize: '0.7rem',
                            color: '#FFCC00',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            height: 'fit-content',
                            flexShrink: 0
                        }}>{p.time}</div>
                        <div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', margin: '0 0 0.2rem', lineHeight: 1.5 }}>{p.activity_kn}</p>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic', lineHeight: 1.4 }}>{p.activity_en}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Closing Quote */}
            <div style={{
                textAlign: 'center',
                padding: '1.5rem 1rem',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.04)'
            }}>
                <p style={{ fontSize: '1.1rem', color: '#E8E0FF', fontWeight: 500, lineHeight: 1.7, margin: 0 }}>
                    "ತತ್ ತ್ವಂ ಅಸಿ"
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.3rem 0 0', fontStyle: 'italic' }}>
                    "Thou Art That" — Chandogya Upanishad
                </p>
            </div>
        </div>
    );
};


// --- Main Page ---

const ChakraSadhana = () => {
    const [chakras, setChakras] = useState([]);
    const [atmaSadhana, setAtmaSadhana] = useState(null);
    const [activeChakra, setActiveChakra] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('chakra'); // 'chakra' | 'atma'
    const [showDetail, setShowDetail] = useState(false); // mobile: show detail or visualizer

    useEffect(() => {
        const fetchChakras = async () => {
            try {
                const response = await fetch('/data/chakras.json');
                if (!response.ok) throw new Error('Data not found');
                const data = await response.json();
                setChakras(data.chakras);
                setAtmaSadhana(data.atmaSadhana);
                setActiveChakra(data.chakras[0]);
            } catch (err) {
                console.error('Failed to load chakras.json', err);
            } finally {
                setLoading(false);
            }
        };
        fetchChakras();
    }, []);

    const handleChakraSelect = (chakra) => {
        setActiveChakra(chakra);
        setActiveTab('chakra');
        setShowDetail(true);
    };

    if (loading) {
        return (
            <div className="content-area animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
            </div>
        );
    }

    if (!chakras.length) {
        return (
            <div className="content-area animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Failed to load data.</p>
            </div>
        );
    }

    return (
        <div className="content-area animate-fade-in">
            <Header title="ಚಕ್ರ ಸಾಧನೆ (Chakra & Atma)" />

            <div className="container" style={{ paddingBottom: '5rem' }}>

                {/* Tab switcher */}
                <div style={{
                    display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', marginTop: '0.5rem'
                }}>
                    <button
                        onClick={() => { setActiveTab('chakra'); setShowDetail(false); }}
                        style={{
                            flex: 1, padding: '0.7rem', borderRadius: '12px',
                            border: activeTab === 'chakra' ? '1px solid rgba(175,82,222,0.5)' : '1px solid rgba(255,255,255,0.08)',
                            background: activeTab === 'chakra' ? 'rgba(175,82,222,0.15)' : 'rgba(255,255,255,0.03)',
                            color: activeTab === 'chakra' ? '#AF52DE' : 'var(--text-secondary)',
                            fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        🌀 ಚಕ್ರಗಳು
                    </button>
                    <button
                        onClick={() => { setActiveTab('atma'); setShowDetail(true); }}
                        style={{
                            flex: 1, padding: '0.7rem', borderRadius: '12px',
                            border: activeTab === 'atma' ? '1px solid rgba(232,224,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
                            background: activeTab === 'atma' ? 'rgba(232,224,255,0.12)' : 'rgba(255,255,255,0.03)',
                            color: activeTab === 'atma' ? '#E8E0FF' : 'var(--text-secondary)',
                            fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        🕉️ ಆತ್ಮ ಸಾಧನೆ
                    </button>
                </div>

                {/* Chakra Tab */}
                {activeTab === 'chakra' && (
                    <>
                        {!showDetail ? (
                            /* Chakra List View */
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {chakras.map((chakra, i) => (
                                    <div
                                        key={chakra.id}
                                        className="card animate-slide-up"
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            padding: '1rem 1.15rem', cursor: 'pointer',
                                            borderLeft: `3px solid ${chakra.color}`,
                                            animationDelay: `${i * 0.05}s`
                                        }}
                                        onClick={() => handleChakraSelect(chakra)}
                                    >
                                        <div style={{
                                            width: '44px', height: '44px', borderRadius: '50%',
                                            backgroundColor: chakra.color, flexShrink: 0,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: `0 0 12px ${chakra.color}50`,
                                            color: (chakra.color === '#FFCC00' || chakra.color === '#E8E0FF') ? '#000' : '#fff',
                                            fontWeight: 700, fontSize: '0.8rem'
                                        }}>
                                            {chakra.beeja.split(' ')[0]}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                                                {chakra.name_kn}
                                            </h3>
                                            <p style={{ margin: '0.15rem 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                                {chakra.name_en} · {chakra.element}
                                            </p>
                                        </div>
                                        <ChevronRight size={18} color="var(--text-secondary)" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Chakra Detail View */
                            <div>
                                <button
                                    onClick={() => setShowDetail(false)}
                                    style={{
                                        background: 'none', border: 'none', color: 'var(--primary)',
                                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                                        fontSize: '0.9rem', cursor: 'pointer', padding: '0.3rem 0',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    <ArrowLeft size={16} /> ← ಎಲ್ಲಾ ಚಕ್ರಗಳು
                                </button>

                                {/* Quick nav dots */}
                                <div style={{
                                    display: 'flex', justifyContent: 'center', gap: '0.5rem',
                                    marginBottom: '1.25rem'
                                }}>
                                    {chakras.map(ch => (
                                        <div
                                            key={ch.id}
                                            onClick={() => setActiveChakra(ch)}
                                            style={{
                                                width: activeChakra?.id === ch.id ? '30px' : '22px',
                                                height: activeChakra?.id === ch.id ? '30px' : '22px',
                                                borderRadius: '50%',
                                                backgroundColor: ch.color,
                                                cursor: 'pointer',
                                                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                boxShadow: activeChakra?.id === ch.id ? `0 0 15px ${ch.color}` : 'none',
                                                border: activeChakra?.id === ch.id ? '2px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.15)'
                                            }}
                                        />
                                    ))}
                                </div>

                                <ChakraDetailPanel chakra={activeChakra} />
                            </div>
                        )}
                    </>
                )}

                {/* Atma Tab */}
                {activeTab === 'atma' && (
                    <AtmaSadhanaPanel data={atmaSadhana} />
                )}
            </div>
        </div>
    );
}

export default ChakraSadhana;
