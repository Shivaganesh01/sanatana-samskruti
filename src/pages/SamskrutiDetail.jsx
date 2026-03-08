import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Zap, Heart, Clock, BookOpen, ChevronRight, Info, Tag, Layers, Lightbulb, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';
import TTSButton from '../components/TTSButton';
import ShareButton from '../components/ShareButton';
import { useFavorites } from '../context/FavoritesContext';
import { markAsRead, addToRecentlyViewed } from '../utils/readingProgress';

// Did You Know facts related to topics
const DID_YOU_KNOW_FACTS = {
    health_yoga: [
        "ಯೋಗವನ್ನು UNESCO 2016 ರಲ್ಲಿ 'ಅಮೂರ್ತ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ' ಎಂದು ಘೋಷಿಸಿತು.",
        "ಪ್ರಾಣಾಯಾಮವು ರಕ್ತದ ಆಮ್ಲಜನಕ ಮಟ್ಟವನ್ನು 50% ವರೆಗೆ ಹೆಚ್ಚಿಸಬಹುದು.",
        "ಆಯುರ್ವೇದವು 5000 ವರ್ಷಗಳಿಗಿಂತ ಹಳೆಯ ವೈದ್ಯಕೀಯ ಪದ್ಧತಿ.",
        "108 ಸೂರ್ಯ ನಮಸ್ಕಾರಗಳು ಸುಮಾರು 13,000 ಕ್ಯಾಲೊರಿಗಳನ್ನು ಸುಡಬಲ್ಲವು."
    ],
    vedic_wisdom: [
        "ಋಗ್ವೇದವು ವಿಶ್ವದ ಅತ್ಯಂತ ಹಳೆಯ ಗ್ರಂಥವೆಂದು ಪರಿಗಣಿಸಲಾಗಿದೆ.",
        "ವೇದಗಳಲ್ಲಿ ಗಣಿತ, ಖಗೋಳಶಾಸ್ತ್ರ ಮತ್ತು ವೈದ್ಯಕೀಯ ಜ್ಞಾನ ಅಡಕವಾಗಿದೆ.",
        "ಗಾಯತ್ರಿ ಮಂತ್ರವು ಅತ್ಯಂತ ಶಕ್ತಿಶಾಲಿ ವೈದಿಕ ಮಂತ್ರಗಳಲ್ಲಿ ಒಂದು.",
        "ಸಂಸ್ಕೃತವನ್ನು NASA 'ಕಂಪ್ಯೂಟರ್ ಸ್ನೇಹಿ ಭಾಷೆ' ಎಂದು ಪರಿಗಣಿಸಿದೆ."
    ],
    spirituality_sadhana: [
        "ಧ್ಯಾನವು ಮೆದುಳಿನ ಬೂದು ದ್ರವ್ಯವನ್ನು (Grey Matter) ಹೆಚ್ಚಿಸುತ್ತದೆ ಎಂದು ವಿಜ್ಞಾನ ಸಾಬೀತುಪಡಿಸಿದೆ.",
        "ಓಂಕಾರದ ಕಂಪನ 432Hz ಆಗಿದ್ದು, ಇದು ಪ್ರಕೃತಿಯ ಮೂಲ ಕಂಪನಕ್ಕೆ ಹತ್ತಿರವಾಗಿದೆ.",
        "ಜಪ ಮಾಡುವಾಗ ಮೆದುಳಿನ ಆಲ್ಫಾ ತರಂಗಗಳು ಹೆಚ್ಚಾಗುತ್ತವೆ.",
        "7 ಚಕ್ರಗಳು ನರಮಂಡಲದ 7 ಪ್ರಮುಖ ಬಿಂದುಗಳಿಗೆ ಹೊಂದಿಕೊಳ್ಳುತ್ತವೆ."
    ],
    dharma_culture: [
        "ಮಹಾಭಾರತವು 1,00,000 ಶ್ಲೋಕಗಳನ್ನು ಹೊಂದಿದ ವಿಶ್ವದ ಅತಿ ದೊಡ್ಡ ಮಹಾಕಾವ್ಯ.",
        "ಭಾರತದಲ್ಲಿ ವರ್ಷದ ಪ್ರತಿ ದಿನವೂ ಯಾವುದೋ ಒಂದು ಹಬ್ಬ ಇರುತ್ತದೆ.",
        "ಸುಭಾಷಿತಗಳು 'Twitter ಗೆಳೆಯ' ಆಗಿ ಕೆಲಸ ಮಾಡುತ್ತವೆ - ಕಡಿಮೆ ಪದಗಳಲ್ಲಿ ಹೆಚ್ಚು ಅರ್ಥ!",
        "ವಿದುರ ನೀತಿಯನ್ನು 'ಪ್ರಾಚೀನ ಭಾರತದ MBA' ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ."
    ],
    saints_temples: [
        "ಭಾರತದಲ್ಲಿ ಸುಮಾರು 20 ಲಕ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚು ಹಿಂದೂ ದೇವಸ್ಥಾನಗಳಿವೆ.",
        "ಕರ್ನಾಟಕದ ವಚನ ಸಾಹಿತ್ಯವು 12ನೇ ಶತಮಾನದ ಸಾಮಾಜಿಕ ಚಳುವಳಿಯ ಫಲ.",
        "ದಾಸ ಸಾಹಿತ್ಯವು ಸಂಗೀತ ಮತ್ತು ಭಕ್ತಿಯ ಅಪೂರ್ವ ಸಂಗಮ.",
        "ಹಂಪಿಯ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯಕ್ಕೆ 1300+ ವರ್ಷಗಳ ಇತಿಹಾಸವಿದೆ."
    ]
};

const SamskrutiDetail = ({ categories }) => {
    const { categoryId, itemId } = useParams();
    const [item, setItem] = useState(null);
    const [allItems, setAllItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDidYouKnow, setShowDidYouKnow] = useState(false);
    const { toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const res = await fetch(`data/samskruti/${categoryId}.json`);
                if (!res.ok) throw new Error(`Could not load data for category: ${categoryId}`);
                let items = await res.json();
                setAllItems(items);

                let found = items.find(i => i.id === itemId);
                if (!found) {
                    console.error(`Item "${itemId}" not found in ${categoryId}. Available IDs:`, items.map(i => i.id));
                    throw new Error(`Item "${itemId}" not found in this category.`);
                }

                // If content is missing (e.g. for split files like suktas), try fetching individual file
                if (!found.content && !found.shloka && !found.content_kn) {
                    try {
                        const detailRes = await fetch(`data/samskruti/${categoryId}/${itemId}.json`);
                        if (detailRes.ok) {
                            const detailData = await detailRes.json();
                            found = { ...found, ...detailData };
                        } else {
                            console.warn(`Individual file for ${itemId} not found at data/samskruti/${categoryId}/${itemId}.json`);
                        }
                    } catch (e) {
                        console.warn("Failed to fetch detail file:", e);
                    }
                }

                setItem(found);

                // Track reading progress
                markAsRead(categoryId, itemId);
                addToRecentlyViewed({
                    id: itemId,
                    title_kn: found.title_kn,
                    title_en: found.title_en,
                    categoryId: categoryId,
                    type: 'samskruti'
                });

            } catch (err) {
                console.error("Detail load error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [categoryId, itemId]);

    // Related items (same subcategory, excluding current)
    const relatedItems = useMemo(() => {
        if (!item || !allItems.length) return [];
        return allItems
            .filter(i => i.id !== itemId && !i.customRoute)
            .filter(i =>
                (item.subCategory_en && i.subCategory_en === item.subCategory_en) ||
                (!item.subCategory_en)
            )
            .slice(0, 4);
    }, [item, allItems, itemId]);

    // Get a random "Did You Know" fact
    const didYouKnowFact = useMemo(() => {
        const facts = DID_YOU_KNOW_FACTS[categoryId] || [];
        if (facts.length === 0) return null;
        const seed = itemId ? itemId.length : 0;
        return facts[seed % facts.length];
    }, [categoryId, itemId]);

    // Estimated reading time
    const readingTime = useMemo(() => {
        if (!item) return 0;
        const text = (item.content_kn || '') + (item.content_en || '') + (item.shloka || '');
        const words = text.split(/\s+/).length;
        return Math.max(1, Math.ceil(words / 150)); // ~150 words per minute for bilingual
    }, [item]);

    if (loading) return <LoadingScreen />;
    if (error) return <div className="container text-center" style={{ paddingTop: '4rem' }}><h3 style={{ color: 'var(--danger)' }}>ನೋಂದಣಿ ದೋಷ</h3><p>{error}</p></div>;
    if (!item) return <div className="container">Item not found</div>;

    const isSaved = isFavorite(item.id);

    return (
        <div className="content-area animate-fade-in">
            <Header title={item.title_kn} showBack />

            <div className="container">
                <article className="static-card glass" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    {/* Title section */}
                    <div style={{ position: 'relative', marginBottom: '1rem' }}>
                        <div style={{ paddingRight: '5rem' }}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.25rem', color: 'var(--primary)', marginTop: 0 }}>{item.title_kn}</h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.title_en}</p>
                        </div>
                        <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <ShareButton
                                title={item.title_kn}
                                text={`🌺 ಸನಾತನ ಸಂಸ್ಕೃತಿ 🌺\n\n*${item.title_kn}*\n${item.shloka ? `\n${item.shloka}\n` : ''}\n${item.content_kn}`}
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite({
                                        id: item.id,
                                        title_kn: item.title_kn,
                                        title_en: item.title_en,
                                        type: 'samskruti',
                                        categoryId: categoryId
                                    });
                                }}
                                className="favorite-btn"
                                style={{
                                    position: 'relative',
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
                                    zIndex: 10
                                }}
                            >
                                <Heart
                                    size={24}
                                    color={isSaved ? '#ff4b4b' : 'var(--text-secondary)'}
                                    fill={isSaved ? '#ff4b4b' : 'none'}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Meta info row */}
                    <div style={{
                        display: 'flex', gap: '1rem', alignItems: 'center',
                        marginBottom: '1.25rem', flexWrap: 'wrap'
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                            fontSize: '0.75rem', color: 'var(--text-secondary)',
                            background: 'rgba(255,255,255,0.04)',
                            padding: '4px 10px', borderRadius: '50px'
                        }}>
                            <Clock size={12} />
                            <span>{readingTime} min read</span>
                        </div>
                        {item.subCategory_en && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.3rem',
                                fontSize: '0.75rem', color: 'var(--primary)',
                                background: 'rgba(255,153,51,0.08)',
                                padding: '4px 10px', borderRadius: '50px'
                            }}>
                                <Tag size={12} />
                                <span>{item.subCategory_en}</span>
                            </div>
                        )}
                        {item.benefits_kn && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.3rem',
                                fontSize: '0.75rem', color: 'var(--success)',
                                background: 'rgba(0,230,118,0.08)',
                                padding: '4px 10px', borderRadius: '50px'
                            }}>
                                <Zap size={12} />
                                <span>{item.benefits_kn.length} Benefits</span>
                            </div>
                        )}
                    </div>

                    {/* TTS Button */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                        <TTSButton
                            text={`${item.title_kn}. ${item.shloka || ''}. ${item.content_kn}`}
                            label="Listen / ಆಲಿಸಿ"
                        />
                    </div>

                    {/* Introduction */}
                    {(item.intro_kn || item.intro_en) && (
                        <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                            {item.intro_kn && <p style={{ margin: '0 0 0.75rem', fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>{item.intro_kn}</p>}
                            {item.intro_en && <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>{item.intro_en}</p>}
                        </div>
                    )}

                    {/* Shloka */}
                    {item.shloka && (
                        <div className="shloka-box shloka-box-highlight">
                            <p className="shloka-text">{item.shloka}</p>
                        </div>
                    )}

                    {/* Kannada Content */}
                    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-line', color: 'var(--text-primary)', marginBottom: '2rem', overflowWrap: 'break-word', wordWrap: 'break-word' }}>
                        {item.content_kn}
                    </div>

                    {/* Verse content (for items with verse arrays) */}
                    {item.content && Array.isArray(item.content) && (
                        <div className="verses-container" style={{ display: 'grid', gap: '1.5rem' }}>
                            {item.content.map((verse, idx) => (
                                <div key={idx} className="static-card glass" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '0.5rem' }}>
                                        <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Verse {verse.verse}</h4>
                                        <ShareButton
                                            title={`Verse ${verse.verse}`}
                                            text={`🌺 ಸನಾತನ ಸಂಸ್ಕೃತಿ 🌺\n\n${verse.shloka_kn}${verse.meaning_kn ? `\n\nಅರ್ಥ: ${verse.meaning_kn}` : ''}${verse.meaning_en ? `\nMeaning: ${verse.meaning_en}` : ''}`}
                                        />
                                    </div>

                                    <p className="shloka-text" style={{ fontSize: '1.2rem', marginBottom: '1rem', textAlign: 'left' }}>
                                        {verse.shloka_kn}
                                    </p>

                                    {verse.shloka_en && (
                                        <p style={{
                                            fontStyle: 'italic',
                                            color: 'var(--text-secondary)',
                                            marginBottom: '1.25rem',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.6',
                                            paddingBottom: '1.25rem',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                                        }}>{verse.shloka_en}</p>
                                    )}

                                    {verse.meaning_kn && (
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <p style={{ margin: '0 0 0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                                                <span style={{ fontWeight: 600, color: 'var(--success)', marginRight: '0.5rem' }}>ಅರ್ಥ:</span>
                                                {verse.meaning_kn}
                                            </p>
                                        </div>
                                    )}

                                    {verse.meaning_en && (
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                                <span style={{ fontWeight: 600, opacity: 0.7, marginRight: '0.5rem' }}>Meaning:</span>
                                                {verse.meaning_en}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Benefits */}
                    {item.benefits_kn && (
                        <div style={{ background: 'rgba(0, 230, 118, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(0, 230, 118, 0.1)', marginTop: '1.5rem' }}>
                            <h5 style={{ color: 'var(--success)', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Zap size={18} /> ಪ್ರಯೋಜನಗಳು (Benefits):
                            </h5>
                            <ul style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--text-secondary)', display: 'grid', gap: '0.5rem' }}>
                                {item.benefits_kn.map((b, i) => <li key={i} style={{ fontSize: '0.95rem' }}>{b}</li>)}
                            </ul>
                        </div>
                    )}

                    {/* English Translation */}
                    {item.content_en && (
                        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                            <h5 style={{ color: 'var(--primary)', margin: '0 0 1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <BookOpen size={14} /> English Translation & Summary
                            </h5>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem' }}>
                                {item.content_en}
                            </p>
                        </div>
                    )}

                    {/* Significance */}
                    {(item.significance_kn || item.significance_en) && (
                        <div style={{ background: 'linear-gradient(135deg, rgba(175,82,222,0.08), rgba(232,224,255,0.05))', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(175,82,222,0.2)', marginTop: '2.5rem' }}>
                            <h5 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Sparkles size={18} /> ಮಹತ್ವ ಮತ್ತು ಒಳನೋಟ (Significance)
                            </h5>
                            {item.significance_kn && <p style={{ margin: '0 0 0.85rem', color: 'var(--text-primary)', fontSize: '1rem', lineHeight: 1.6 }}>{item.significance_kn}</p>}
                            {item.significance_en && <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.6 }}>{item.significance_en}</p>}
                        </div>
                    )}
                </article>

                {/* Did You Know? Section */}
                {didYouKnowFact && (
                    <div
                        className="card glass animate-slide-up"
                        style={{
                            marginBottom: '1.5rem',
                            padding: '1.25rem',
                            background: 'linear-gradient(135deg, rgba(255,215,0,0.06), rgba(255,153,51,0.04))',
                            border: '1px solid rgba(255,215,0,0.15)',
                            cursor: 'pointer'
                        }}
                        onClick={() => setShowDidYouKnow(!showDidYouKnow)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                background: 'rgba(255,215,0,0.15)',
                                width: '36px', height: '36px', borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Lightbulb size={18} color="#FFD700" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: '0.75rem', color: '#FFD700', fontWeight: 600,
                                    textTransform: 'uppercase', letterSpacing: '0.08em',
                                    marginBottom: '0.25rem'
                                }}>
                                    💡 ನಿಮಗೆ ಗೊತ್ತೆ? (Did You Know?)
                                </div>
                                <p style={{
                                    fontSize: '0.9rem', color: 'var(--text-primary)',
                                    lineHeight: 1.5, margin: 0
                                }}>
                                    {didYouKnowFact}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Related Topics */}
                {relatedItems.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            marginBottom: '0.75rem'
                        }}>
                            <Layers size={16} color="var(--primary)" />
                            <h4 style={{
                                margin: 0, fontSize: '0.9rem', fontWeight: 600,
                                color: 'var(--text-secondary)', textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                ಸಂಬಂಧಿತ ವಿಷಯಗಳು (Related)
                            </h4>
                        </div>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {relatedItems.map((related, i) => (
                                <Link
                                    key={related.id}
                                    to={`/samskruti/${categoryId}/${related.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className="card" style={{
                                        padding: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4 style={{
                                                margin: 0, fontSize: '0.95rem', fontWeight: 600,
                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                                            }}>
                                                {related.title_kn}
                                            </h4>
                                            <p style={{
                                                margin: '0.15rem 0 0', fontSize: '0.75rem',
                                                color: 'var(--text-secondary)',
                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                                            }}>
                                                {related.title_en}
                                            </p>
                                        </div>
                                        <ChevronRight size={16} color="var(--primary)" style={{ opacity: 0.5, flexShrink: 0 }} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SamskrutiDetail;
