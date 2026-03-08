import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Info, TrendingUp, BarChart3 } from 'lucide-react';
import Header from '../components/Header';

const GitaList = ({ data }) => {
    // Calculate stats
    const stats = useMemo(() => {
        const totalVerses = data.reduce((sum, ch) => sum + (ch.verses_count || 0), 0);
        return { totalChapters: data.length, totalVerses };
    }, [data]);

    return (
        <div className="content-area animate-fade-in">
            <Header title="ಶ್ರೀಮದ್ ಭಗವದ್ಗೀತೆ" />
            <div className="container">
                <div style={{ marginBottom: '2rem', textAlign: 'center', paddingTop: '1rem' }}>
                    <div style={{ background: 'rgba(255, 153, 51, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                        <BookOpen size={32} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>ಜೀವನದ ದಿವ್ಯವಾಣಿ</h2>
                    <p className="text-secondary" style={{ marginBottom: '0.5rem' }}>ಯೋಗೇಶ್ವರ ಕೃಷ್ಣನ ಅಮೃತ ಉಪದೇಶಗಳು</p>
                    <p style={{
                        fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.7,
                        lineHeight: 1.5, maxWidth: '350px', margin: '0.5rem auto 0'
                    }}>
                        ಕುರುಕ್ಷೇತ್ರ ಯುದ್ಧಭೂಮಿಯಲ್ಲಿ ಶ್ರೀಕೃಷ್ಣನು ಅರ್ಜುನನಿಗೆ ಬೋಧಿಸಿದ ಜೀವನದ ಅಂತಿಮ ಸತ್ಯಗಳು.
                    </p>
                </div>

                {/* Stats Row */}
                <div style={{
                    display: 'flex', gap: '0.75rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        flex: 1, padding: '1rem',
                        background: 'rgba(255,215,0,0.06)',
                        borderRadius: '14px',
                        border: '1px solid rgba(255,215,0,0.12)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFD700' }}>{stats.totalChapters}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>ಅಧ್ಯಾಯಗಳು</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.7 }}>Chapters</div>
                    </div>
                    <div style={{
                        flex: 1, padding: '1rem',
                        background: 'rgba(255,153,51,0.06)',
                        borderRadius: '14px',
                        border: '1px solid rgba(255,153,51,0.12)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF9933' }}>{stats.totalVerses}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>ಶ್ಲೋಕಗಳು</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.7 }}>Total Verses</div>
                    </div>
                    <div style={{
                        flex: 1, padding: '1rem',
                        background: 'rgba(175,82,222,0.06)',
                        borderRadius: '14px',
                        border: '1px solid rgba(175,82,222,0.12)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#AF52DE' }}>3</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>ಯೋಗ ಮಾರ್ಗ</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.7 }}>Yoga Paths</div>
                    </div>
                </div>

                {/* Section Divider */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    marginBottom: '1rem'
                }}>
                    <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }} />
                    <span style={{
                        fontSize: '0.75rem', color: 'var(--text-secondary)',
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        fontWeight: 600
                    }}>
                        ಅಧ್ಯಾಯಗಳು (Chapters)
                    </span>
                    <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }} />
                </div>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {data.map((chapter, index) => (
                        <Link
                            to={`/gita/${chapter.chapter}`}
                            key={chapter.chapter}
                            style={{ textDecoration: 'none', animationDelay: `${index * 0.03}s` }}
                            className="animate-slide-up"
                        >
                            <div className="card" style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{
                                        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                                        color: '#000',
                                        width: '44px', height: '44px', borderRadius: '12px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 800, fontSize: '1.1rem', flexShrink: 0,
                                        boxShadow: '0 4px 10px rgba(255, 153, 51, 0.3)'
                                    }}>
                                        {chapter.chapter}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.1rem' }}>
                                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{chapter.title_kn}</h3>
                                        </div>
                                        {chapter.title_en && (
                                            <p style={{
                                                margin: '0.1rem 0 0', fontSize: '0.7rem',
                                                color: 'var(--text-secondary)',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.02em'
                                            }}>
                                                {chapter.title_en}
                                            </p>
                                        )}
                                        <p style={{
                                            margin: '0.4rem 0 0', fontSize: '0.8rem',
                                            color: 'var(--text-secondary)',
                                            lineHeight: 1.4, opacity: 0.8,
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {chapter.summary_kn}
                                        </p>
                                        {chapter.verses_count && (
                                            <div style={{ marginTop: '0.4rem' }}>
                                                <span style={{
                                                    fontSize: '0.6rem', fontWeight: 700,
                                                    background: 'rgba(255,215,0,0.1)',
                                                    color: 'var(--secondary)',
                                                    padding: '2px 8px',
                                                    borderRadius: '50px'
                                                }}>
                                                    {chapter.verses_count} ಶ್ಲೋಕ
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <ChevronRight color="var(--primary)" opacity={0.5} size={18} style={{ alignSelf: 'center', flexShrink: 0 }} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer Info */}
                <div style={{
                    textAlign: 'center',
                    padding: '2rem 1rem 1rem',
                    opacity: 0.5
                }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
                        "ಯದಾ ಯದಾ ಹಿ ಧರ್ಮಸ್ಯ ಗ್ಲಾನಿರ್ಭವತಿ ಭಾರತ"
                    </p>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                        — Bhagavad Gita 4.7
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GitaList;
