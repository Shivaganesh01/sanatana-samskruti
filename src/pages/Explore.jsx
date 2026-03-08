import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, BookOpen, Heart, Activity, Flame, Compass, Shuffle, TrendingUp, Star, Zap, Users, MapPin, HeartPulse, Library, Leaf, Music, Quote, Book, Info } from 'lucide-react';
import Header from '../components/Header';
import SearchDialog from '../components/SearchDialog';
import { getAppStats, getTotalReadCount } from '../utils/readingProgress';

const DAILY_QUOTES = [
    { kn: "ಕರ್ಮಣ್ಯೇವಾಧಿಕಾರಸ್ತೇ ಮಾ ಫಲೇಷು ಕದಾಚನ", en: "You have the right to work, but not to the fruits of work.", source: "Bhagavad Gita 2.47" },
    { kn: "ಯೋಗಃ ಕರ್ಮಸು ಕೌಶಲಮ್", en: "Yoga is skill in action.", source: "Bhagavad Gita 2.50" },
    { kn: "ಉದ್ಧರೇದಾತ್ಮನಾತ್ಮಾನಮ್", en: "Elevate yourself through yourself.", source: "Bhagavad Gita 6.5" },
    { kn: "ಸರ್ವಂ ಕರ್ಮಾಖಿಲಂ ಜ್ಞಾನೇ ಪರಿಸಮಾಪ್ಯತೆ", en: "All actions culminate in knowledge.", source: "Bhagavad Gita 4.33" },
    { kn: "ಅಹಿಂಸಾ ಪರಮೋ ಧರ್ಮಃ", en: "Non-violence is the supreme duty.", source: "Mahabharata" },
    { kn: "ಸತ್ಯಮೇವ ಜಯತೆ", en: "Truth alone triumphs.", source: "Mundaka Upanishad" },
    { kn: "ವಸುಧೈವ ಕುಟುಂಬಕಮ್", en: "The world is one family.", source: "Maha Upanishad" },
    { kn: "ತಮಸೋ ಮಾ ಜ್ಯೋತಿರ್ಗಮಯ", en: "Lead me from darkness to light.", source: "Brihadaranyaka Upanishad" },
    { kn: "ಆತ್ಮನೋ ಮೋಕ್ಷಾರ್ಥಂ ಜಗತ್ ಹಿತಾಯ ಚ", en: "For one's own liberation and the welfare of the world.", source: "Swami Vivekananda" },
    { kn: "ಧರ್ಮೋ ರಕ್ಷತಿ ರಕ್ಷಿತಃ", en: "Dharma protects those who protect Dharma.", source: "Manusmriti" }
];

const TOPIC_CATEGORIES = [
    {
        title: 'ಮೂಲ ತತ್ವಗಳು',
        title_en: 'Core Philosophy',
        color: '#FF9933',
        topics: ['Dharma / ಧರ್ಮ', 'Karma / ಕರ್ಮ', 'Moksha / ಮೋಕ್ಷ', 'Atman / ಆತ್ಮ']
    },
    {
        title: 'ಮಾನಸಿಕ ಆರೋಗ್ಯ',
        title_en: 'Inner Peace',
        color: '#34C759',
        topics: ['Peace / ಶಾಂತಿ', 'Meditation / ಧ್ಯಾನ', 'Anger / ಕೋಪ', 'Fear / ಭಯ']
    },
    {
        title: 'ಜೀವನ ಮಾರ್ಗ',
        title_en: 'Life Values',
        color: '#AF52DE',
        topics: ['Duty / ಕರ್ತವ್ಯ', 'Truth / ಸತ್ಯ', 'Success / ಜಯ', 'Sacrifice / ತ್ಯಾಗ']
    },
    {
        title: 'ಅಧ್ಯಾತ್ಮ',
        title_en: 'Spirituality',
        color: '#FF6B35',
        topics: ['Bhakti / ಭಕ್ತಿ', 'Yoga / ಯೋಗ', 'Mantra / ಮಂತ್ರ', 'Puja / ಪೂಜೆ']
    },
    {
        title: 'ಸಂಬಂಧಗಳು',
        title_en: 'Relationships',
        color: '#FF4B4B',
        topics: ['Love / ಪ್ರೀತಿ', 'Family / ಕುಟುಂಬ', 'Friendship / ಸ್ನೇಹ', 'Respect / ಗೌರವ']
    },
    {
        title: 'ಜ್ಞಾನ',
        title_en: 'Knowledge',
        color: '#FFD700',
        topics: ['Death / ಮೃತ್ಯು', 'Creation / ಸೃಷ್ಟಿ', 'Nature / ಪ್ರಕೃತಿ', 'Science / ವಿಜ್ಞಾನ']
    }
];

const FEATURES = [
    { to: '/gita', icon: BookOpen, label_kn: 'ಭಗವದ್ಗೀತೆ', label_en: 'Bhagavad Gita', desc: '18 ಅಧ್ಯಾಯ • 700+ ಶ್ಲೋಕ', color: '#FFD700' },
    { to: '/chakra-sadhana', icon: Activity, label_kn: 'ಚಕ್ರ ಸಾಧನೆ', label_en: 'Chakra Sadhana', desc: '7 ಚಕ್ರಗಳ ವಿವರ', color: '#AF52DE' },
    { to: '/moksha-marga', icon: Sparkles, label_kn: 'ಮೋಕ್ಷ ಮಾರ್ಗ', label_en: 'Moksha Marga', desc: 'ಕರ್ಮ • ಭಕ್ತಿ • ಜ್ಞಾನ', color: '#FF9500' },
    { to: '/dharmic-lifestyle', icon: Leaf, label_kn: 'ಧಾರ್ಮಿಕ ಜೀವನ', label_en: 'Dharmic Life', desc: 'ಯಮ • ನಿಯಮ • ಯಜ್ಞ', color: '#34C759' },
    { to: '/japa', icon: Flame, label_kn: 'ಜಪ ಮಾಲೆ', label_en: 'Japa Mala', desc: '108 ಎಣಿಕೆ ಮಾಲೆ', color: '#FF6B35' },
];

const SAMSKRUTI_CATEGORIES = [
    { id: 'health_yoga', icon: HeartPulse, label_kn: 'ಆರೋಗ್ಯ & ಯೋಗ', color: '#FF6B6B' },
    { id: 'vedic_wisdom', icon: Library, label_kn: 'ವೇದ & ವಿಜ್ಞಾನ', color: '#4ECDC4' },
    { id: 'spirituality_sadhana', icon: Zap, label_kn: 'ಅಧ್ಯಾತ್ಮ & ಸಾಧನೆ', color: '#FFE66D' },
    { id: 'dharma_culture', icon: Book, label_kn: 'ಧರ್ಮ & ಸಂಸ್ಕೃತಿ', color: '#A8E6CF' },
    { id: 'saints_temples', icon: MapPin, label_kn: 'ಸಂತರು & ಕ್ಷೇತ್ರ', color: '#FF8A5C' },
];

const Explore = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [stats, setStats] = useState(null);

    useEffect(() => {
        setStats(getAppStats());
    }, []);

    // Get today's quote
    const todayQuote = useMemo(() => {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        return DAILY_QUOTES[dayOfYear % DAILY_QUOTES.length];
    }, []);

    const handleTopicClick = (topic) => {
        const term = topic.split('/')[0].trim();
        setSearchQuery(term);
        setSearchOpen(true);
    };

    const handleRandomDiscovery = () => {
        const allTopics = TOPIC_CATEGORIES.flatMap(cat => cat.topics);
        const randomTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
        handleTopicClick(randomTopic);
    };

    return (
        <div className="content-area animate-fade-in">
            <Header title="ಅನ್ವೇಷಿಸಿ (Explore)" />

            <div className="container">
                {/* Search Bar */}
                <div
                    onClick={() => {
                        setSearchQuery('');
                        setSearchOpen(true);
                    }}
                    className="card glass"
                    style={{
                        margin: '0.5rem 0 1.5rem',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        borderColor: 'var(--primary)'
                    }}
                >
                    <Search color="var(--primary)" />
                    <span style={{ color: 'var(--text-secondary)' }}>ಏನನ್ನಾದರೂ ಹುಡುಕಿ... (Search anything...)</span>
                </div>

                {/* Today's Inspiration */}
                <div className="card glass animate-slide-up" style={{
                    marginBottom: '1.5rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(255,153,51,0.08), rgba(255,215,0,0.05))',
                    border: '1px solid rgba(255,153,51,0.2)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '0.5rem', marginBottom: '1rem'
                    }}>
                        <Star size={16} color="var(--secondary)" />
                        <span style={{
                            fontSize: '0.7rem', fontWeight: 600, color: 'var(--secondary)',
                            textTransform: 'uppercase', letterSpacing: '0.1em'
                        }}>
                            ಇಂದಿನ ಪ್ರೇರಣೆ • Today's Inspiration
                        </span>
                    </div>
                    <p style={{
                        fontSize: '1.15rem', fontWeight: 600, color: 'var(--primary-light)',
                        lineHeight: 1.6, margin: '0 0 0.5rem',
                        fontFamily: 'var(--font-serif)'
                    }}>
                        "{todayQuote.kn}"
                    </p>
                    <p style={{
                        fontSize: '0.85rem', color: 'var(--text-secondary)',
                        fontStyle: 'italic', margin: '0 0 0.75rem'
                    }}>
                        "{todayQuote.en}"
                    </p>
                    <span style={{
                        fontSize: '0.75rem', color: 'var(--primary)',
                        fontWeight: 500
                    }}>
                        — {todayQuote.source}
                    </span>
                </div>

                {/* Random Discovery Button */}
                <button
                    onClick={handleRandomDiscovery}
                    style={{
                        width: '100%',
                        padding: '0.9rem',
                        background: 'linear-gradient(135deg, rgba(175,82,222,0.12), rgba(255,149,0,0.08))',
                        border: '1px solid rgba(175,82,222,0.2)',
                        borderRadius: '14px',
                        color: '#AF52DE',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        transition: 'all 0.3s'
                    }}
                >
                    <Shuffle size={18} />
                    🎲 ಯಾದೃಚ್ಛಿಕ ಅನ್ವೇಷಣೆ (Random Discovery)
                </button>

                {/* App Overview Stats */}
                <div style={{
                    display: 'flex', gap: '0.5rem', marginBottom: '2rem',
                    overflowX: 'auto', scrollbarWidth: 'none',
                    paddingBottom: '0.25rem'
                }}>
                    {[
                        { label: 'ವಿಭಾಗಗಳು', value: '5', sublabel: 'Categories', color: '#FF9933' },
                        { label: 'ಅಧ್ಯಾಯಗಳು', value: '18', sublabel: 'Gita Chapters', color: '#FFD700' },
                        { label: 'ಚಕ್ರಗಳು', value: '7', sublabel: 'Chakras', color: '#AF52DE' },
                        { label: 'ಯೋಗ', value: '3', sublabel: 'Yoga Paths', color: '#34C759' },
                    ].map((stat, i) => (
                        <div key={i} style={{
                            flex: '1 0 auto',
                            minWidth: '85px',
                            padding: '0.75rem',
                            textAlign: 'center',
                            background: `${stat.color}08`,
                            borderRadius: '12px',
                            border: `1px solid ${stat.color}15`
                        }}>
                            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Browse by Category */}
                <h3 style={{
                    margin: '0 0 0.75rem', fontSize: '1.1rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                    <Compass size={18} color="var(--primary)" />
                    ವಿಭಾಗ ಅನ್ವೇಷಿಸಿ (Browse Categories)
                </h3>
                <div style={{
                    display: 'flex', overflowX: 'auto', gap: '0.75rem',
                    marginBottom: '2rem', paddingBottom: '0.5rem',
                    scrollbarWidth: 'none'
                }}>
                    {SAMSKRUTI_CATEGORIES.map((cat, i) => (
                        <Link key={cat.id} to={`/samskruti/${cat.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                gap: '0.5rem', padding: '1rem 1.25rem',
                                background: `${cat.color}10`,
                                borderRadius: '16px',
                                border: `1px solid ${cat.color}20`,
                                minWidth: '100px',
                                transition: 'transform 0.2s'
                            }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '12px',
                                    background: `${cat.color}15`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <cat.icon size={20} color={cat.color} />
                                </div>
                                <span style={{
                                    fontSize: '0.75rem', color: 'var(--text-primary)',
                                    fontWeight: 500, textAlign: 'center', lineHeight: 1.2
                                }}>
                                    {cat.label_kn}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Featured Sections */}
                <h3 style={{
                    margin: '0 0 0.75rem', fontSize: '1.1rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                    <Sparkles size={18} color="#FFD700" />
                    ವಿಶೇಷ ವಿಭಾಗಗಳು (Features)
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                    {FEATURES.map((feat, i) => (
                        <Link key={i} to={feat.to} style={{ textDecoration: 'none' }}>
                            <div className="card" style={{
                                padding: '1rem',
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                borderLeft: `3px solid ${feat.color}`
                            }}>
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '12px',
                                    background: `${feat.color}12`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <feat.icon size={22} color={feat.color} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{feat.label_kn}</h4>
                                    <p style={{ margin: '0.1rem 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{feat.desc}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Topic Grid by Category */}
                {TOPIC_CATEGORIES.map((category, catIndex) => (
                    <div key={catIndex} style={{ marginBottom: '1.75rem' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            marginBottom: '0.75rem'
                        }}>
                            <div style={{
                                width: '4px', height: '18px',
                                background: category.color,
                                borderRadius: '2px'
                            }} />
                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                                {category.title}
                                <span style={{
                                    fontSize: '0.7rem', color: 'var(--text-secondary)',
                                    fontWeight: 400, marginLeft: '0.5rem'
                                }}>
                                    {category.title_en}
                                </span>
                            </h4>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                            {category.topics.map((topic, i) => (
                                <div key={i} className="card" style={{
                                    padding: '0.9rem',
                                    textAlign: 'center',
                                    fontWeight: 500,
                                    fontSize: '0.85rem',
                                    color: 'var(--text-primary)',
                                    background: `${category.color}06`,
                                    border: `1px solid ${category.color}15`,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                    onClick={() => handleTopicClick(topic)}
                                >
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Reuse the existing search dialog */}
            {searchOpen && <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} initialQuery={searchQuery} />}
        </div>
    );
};

export default Explore;
