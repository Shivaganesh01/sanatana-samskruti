import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import Header from '../components/Header';

const GitaList = ({ data }) => {
    return (
        <div className="content-area animate-fade-in">
            <Header title="ಶ್ರೀಮದ್ ಭಗವದ್ಗೀತೆ" />
            <div className="container">
                <div style={{ marginBottom: '2.5rem', textAlign: 'center', paddingTop: '1rem' }}>
                    <div style={{ background: 'rgba(255, 153, 51, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                        <BookOpen size={32} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>ಜೀವನದ ದಿವ್ಯವಾಣಿ</h2>
                    <p className="text-secondary">ಯೋಗೇಶ್ವರ ಕೃಷ್ಣನ ಅಮೃತ ಉಪದೇಶಗಳು</p>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {data.map((chapter, index) => (
                        <Link
                            to={`/gita/${chapter.chapter}`}
                            key={chapter.chapter}
                            style={{ textDecoration: 'none', animationDelay: `${index * 0.03}s` }}
                            className="animate-slide-up"
                        >
                            <div className="card" style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
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
                                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 600 }}>{chapter.title_kn}</h3>
                                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {chapter.summary_kn}
                                        </p>
                                    </div>
                                    <ChevronRight color="var(--primary)" opacity={0.5} size={20} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GitaList;
