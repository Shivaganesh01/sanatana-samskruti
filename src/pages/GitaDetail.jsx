import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Quote, Zap, Heart } from 'lucide-react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import TTSButton from '../components/TTSButton';
import { useFavorites } from '../context/FavoritesContext';

const GitaDetail = () => {
    const { chapterId } = useParams();
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                setLoading(true);
                const res = await fetch(`data/gita/chapter_${chapterId}.json`);
                if (!res.ok) throw new Error("Chapter not found");
                const data = await res.json();
                setChapter(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchChapter();
    }, [chapterId]);

    if (loading) return <LoadingScreen />;
    if (error || !chapter) return <div className="container">Error: {error || "Chapter not found"}</div>;

    const favId = `gita_chapter_${chapterId}`;
    const isSaved = isFavorite(favId);

    const handleToggleFavorite = () => {
        toggleFavorite({
            id: favId,
            title_kn: chapter.title_kn,
            title_en: chapter.title_en || `Chapter ${chapterId}`,
            type: 'gita_chapter',
            chapterId: chapterId,
            summary: chapter.summary_kn
        });
    };

    return (
        <div className="content-area animate-fade-in">
            <Header title={`ಅಧ್ಯಾಯ ${chapter.chapter}`} showBack subtitle={chapter.title_kn} />

            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '1rem' }}>
                    <h2 style={{ margin: 0, fontSize: '2.25rem', color: 'var(--primary)', fontWeight: 800 }}>{chapter.title_kn}</h2>
                    {chapter.title_en && <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0', fontSize: '1rem' }}>{chapter.title_en}</p>}
                </div>

                <div className="static-card glass" style={{ marginBottom: '2.5rem', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Quote size={20} color="var(--primary)" />
                            <h4 style={{ color: 'var(--primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>ಸಾರಾಂಶ</h4>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite();
                            }}
                            style={{
                                background: isSaved ? 'rgba(255, 75, 75, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                padding: 0,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                zIndex: 10
                            }}
                        >
                            <Heart
                                size={22}
                                color={isSaved ? '#ff4b4b' : 'var(--text-secondary)'}
                                fill={isSaved ? '#ff4b4b' : 'none'}
                            />
                        </button>
                    </div>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', margin: 0, color: 'var(--text-primary)' }}>
                        {chapter.summary_kn}
                    </p>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <TTSButton text={chapter.summary_kn} label="Listen Summary" />
                    </div>
                </div>

                {chapter.verses && chapter.verses.length > 0 && (
                    <div style={{ marginTop: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }}></div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--text-secondary)' }}>ಪ್ರಮುಖ ಶ್ಲೋಕಗಳು</h3>
                            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }}></div>
                        </div>

                        {chapter.verses.map((verse, index) => (
                            <div key={verse.verse_number} className="static-card animate-slide-up" style={{ padding: '1.5rem', marginBottom: '1.5rem', animationDelay: `${index * 0.1}s` }}>
                                <div style={{
                                    background: 'rgba(255, 153, 51, 0.1)',
                                    color: 'var(--primary)',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '8px',
                                    display: 'inline-flex',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    marginBottom: '1.5rem'
                                }}>
                                    ಶ್ಲೋಕ {chapter.chapter}.{verse.verse_number}
                                </div>

                                <div className="shloka-box" style={{ margin: '0 0 1.5rem' }}>
                                    <p className="shloka-text">
                                        {verse.shloka}
                                    </p>
                                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                                        <TTSButton
                                            text={`${verse.shloka}. ${verse.translation}`}
                                            label="Listen Shloka"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gap: '1.25rem' }}>
                                    <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '4px solid var(--secondary)' }}>
                                        <h5 style={{ margin: '0 0 0.5rem', color: 'var(--secondary)', fontSize: '0.85rem' }}>ಅರ್ಥ:</h5>
                                        <p style={{ fontSize: '1.05rem', lineHeight: '1.6', margin: 0, color: 'var(--text-primary)' }}>{verse.translation}</p>
                                    </div>

                                    {verse.purport && (
                                        <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,153,51,0.03)', padding: '1.25rem', borderRadius: '12px' }}>
                                            <div style={{ background: 'rgba(255,153,51,0.1)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Zap size={16} color="var(--primary)" />
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{verse.purport}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GitaDetail;
