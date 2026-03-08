import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sun, Quote, MapPin, Activity, Library, Book, Leaf, Music, Flame, Mic2, Calendar, User, PenTool, Zap, HeartPulse, Sparkles, ChevronRight, BookOpen, Info } from 'lucide-react';
import VerseOfTheDay from '../components/VerseOfTheDay';
import PanchangaWidget from '../components/PanchangaWidget';
import StatsWidget from '../components/StatsWidget';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';
import Header from '../components/Header';
import SearchDialog from '../components/SearchDialog';

const IconMap = {
    Sun, Quote, MapPin, Activity, Library, Book, Leaf, Music,
    Flame, Mic2, Calendar, User, PenTool, Zap, HeartPulse, Sparkles
};

const CATEGORY_COLORS = {
    health_yoga: '#FF6B6B',
    vedic_wisdom: '#4ECDC4',
    spirituality_sadhana: '#FFE66D',
    dharma_culture: '#A8E6CF',
    saints_temples: '#FF8A5C'
};

const CATEGORY_DESCRIPTIONS_SHORT = {
    health_yoga: 'ಯೋಗ, ಆಯುರ್ವೇದ, ಪ್ರಾಣಾಯಾಮ ಮತ್ತು ಹೆಚ್ಚಿನವು',
    vedic_wisdom: 'ಸೂಕ್ತ, ಸ್ತೋತ್ರ, ಮಂತ್ರ ಮತ್ತು ಪ್ರಾಚೀನ ಜ್ಞಾನ',
    spirituality_sadhana: 'ಧ್ಯಾನ, ಚಕ್ರ, ಮೋಕ್ಷ ಮತ್ತು ಸಾಧನೆ',
    dharma_culture: 'ಇತಿಹಾಸ, ಹಬ್ಬ, ಸುಭಾಷಿತ ಮತ್ತು ಪ್ರಶ್ನೆ',
    saints_temples: 'ಸಂತರು, ದಾಸರು, ಶರಣರು ಮತ್ತು ಕ್ಷೇತ್ರಗಳು'
};

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return { kn: "ಶುಭ ರಾತ್ರಿ", en: "Good Night", emoji: "🌙" };
    if (hour < 12) return { kn: "ಶುಭೋದಯ", en: "Good Morning", emoji: "🙏" };
    if (hour < 17) return { kn: "ಶುಭ ಮಧ್ಯಾಹ್ನ", en: "Good Afternoon", emoji: "☀️" };
    if (hour < 21) return { kn: "ಶುಭ ಸಂಜೆ", en: "Good Evening", emoji: "🪔" };
    return { kn: "ಶುಭ ರಾತ್ರಿ", en: "Good Night", emoji: "🌙" };
};

const QUICK_ACCESS_ITEMS = [
    { to: '/gita', icon: BookOpen, label_kn: 'ಭಗವದ್ಗೀತೆ', label_en: 'Gita', color: '#FFD700' },
    { to: '/chakra-sadhana', icon: Activity, label_kn: 'ಚಕ್ರ ಸಾಧನೆ', label_en: 'Chakras', color: '#AF52DE' },
    { to: '/moksha-marga', icon: Sparkles, label_kn: 'ಮೋಕ್ಷ ಮಾರ್ಗ', label_en: 'Moksha', color: '#FF9500' },
    { to: '/dharmic-lifestyle', icon: Leaf, label_kn: 'ಧಾರ್ಮಿಕ ಜೀವನ', label_en: 'Dharmic Life', color: '#34C759' },
    { to: '/japa', icon: Activity, label_kn: 'ಜಪ ಮಾಲೆ', label_en: 'Japa', color: '#FF6B35' },
];

const SamskrutiHome = ({ categories }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
    const [itemCounts, setItemCounts] = useState({});
    const greeting = getGreeting();

    // Fetch item counts for each category
    useEffect(() => {
        const fetchCounts = async () => {
            const counts = {};
            for (const cat of categories) {
                try {
                    const res = await fetch(`data/samskruti/${cat.id}.json`);
                    if (res.ok) {
                        const data = await res.json();
                        counts[cat.id] = data.length;
                    }
                } catch { /* ignore */ }
            }
            setItemCounts(counts);
        };
        fetchCounts();
    }, [categories]);

    const filteredData = categories.filter(category =>
        category.title_kn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="content-area animate-fade-in">
            <Header title="ಸನಾತನ ಸಂಸ್ಕೃತಿ" />
            <div className="container">
                {/* Greeting */}
                <div style={{ marginBottom: '1.5rem', textAlign: 'left', paddingTop: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{greeting.emoji}</span>
                        <h2 style={{ fontSize: '2.25rem', margin: '0 0 0.25rem', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{greeting.kn}</h2>
                    </div>
                    <p className="text-secondary" style={{ fontSize: '1rem', margin: 0 }}>ನಿತ್ಯ ಜೀವನದ ಸನಾತನ ಮಾರ್ಗದರ್ಶಿ</p>
                </div>

                {/* Panchanga Widget */}
                <PanchangaWidget />

                {/* Verse of the Day */}
                <VerseOfTheDay />

                {/* Stats Widget */}
                <StatsWidget />

                {/* Recently Viewed */}
                <RecentlyViewedWidget />

                {/* Global Search Trigger  */}
                <div
                    className="search-container"
                    onClick={() => setIsGlobalSearchOpen(true)}
                    style={{ cursor: 'pointer' }}
                >
                    <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="ವಿಷಯಗಳು ಅಥವಾ ಸ್ತೋತ್ರಗಳನ್ನು ಹುಡುಕಿ..."
                        readOnly
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                {isGlobalSearchOpen && (
                    <SearchDialog
                        isOpen={isGlobalSearchOpen}
                        onClose={() => setIsGlobalSearchOpen(false)}
                    />
                )}

                {/* Quick Access Row */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                        margin: '0 0 0.75rem', fontSize: '0.85rem', fontWeight: 600,
                        color: 'var(--text-secondary)', textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        ತ್ವರಿತ ಪ್ರವೇಶ (Quick Access)
                    </h4>
                    <div style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '0.75rem',
                        paddingBottom: '0.5rem',
                        scrollbarWidth: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        {QUICK_ACCESS_ITEMS.map((item, i) => (
                            <Link key={i} to={item.to} style={{ textDecoration: 'none', flexShrink: 0 }}>
                                <div style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    gap: '0.4rem', padding: '0.75rem 1rem',
                                    background: `${item.color}10`,
                                    borderRadius: '14px',
                                    border: `1px solid ${item.color}20`,
                                    minWidth: '80px',
                                    transition: 'transform 0.2s'
                                }}>
                                    <item.icon size={22} color={item.color} />
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-primary)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                        {item.label_kn}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Categories Section */}
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>ವಿಭಾಗಗಳು (Categories)</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {categories.length} ವಿಭಾಗಗಳು
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                    {filteredData.map((category, index) => {
                        const IconComponent = IconMap[category.icon] || Sun;
                        const catColor = CATEGORY_COLORS[category.id] || '#FF9933';
                        const count = itemCounts[category.id];
                        const shortDesc = CATEGORY_DESCRIPTIONS_SHORT[category.id] || category.description;
                        return (
                            <Link
                                to={`/samskruti/${category.id}`}
                                key={category.id}
                                style={{ textDecoration: 'none', animationDelay: `${index * 0.05}s` }}
                                className="animate-slide-up"
                            >
                                <div className="card" style={{ padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <div style={{
                                            background: `${catColor}15`,
                                            width: '52px', height: '52px', borderRadius: '14px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <IconComponent size={26} color={catColor} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                                                    {category.title_kn}
                                                </h3>
                                                {count > 0 && (
                                                    <span style={{
                                                        background: `${catColor}20`,
                                                        color: catColor,
                                                        fontSize: '0.65rem',
                                                        fontWeight: 700,
                                                        padding: '2px 8px',
                                                        borderRadius: '50px',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        {count} articles
                                                    </span>
                                                )}
                                            </div>
                                            <p style={{
                                                margin: '0.15rem 0 0', fontSize: '0.75rem',
                                                color: 'var(--text-secondary)', textTransform: 'uppercase',
                                                letterSpacing: '0.03em'
                                            }}>
                                                {category.title_en}
                                            </p>
                                            <p style={{
                                                margin: '0.5rem 0 0', fontSize: '0.8rem',
                                                color: 'var(--text-secondary)', lineHeight: 1.4,
                                                opacity: 0.8,
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                                {shortDesc}
                                            </p>
                                        </div>
                                        <div style={{
                                            background: `${catColor}10`,
                                            padding: '8px', borderRadius: '10px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0, alignSelf: 'center'
                                        }}>
                                            <ChevronRight color={catColor} size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Dedicated Feature Cards */}
                <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                    <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.2rem', fontWeight: 600 }}>
                        ವಿಶೇಷ ವಿಭಾಗಗಳು (Special Sections)
                    </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                    {/* Chakra & Atma Sadhana Card */}
                    <Link to="/chakra-sadhana" style={{ textDecoration: 'none' }} className="animate-slide-up">
                        <div className="card h-full" style={{
                            textAlign: 'center', padding: '1.5rem 1rem',
                            background: 'linear-gradient(135deg, rgba(175,82,222,0.08), rgba(175,82,222,0.02))',
                            border: '1px solid rgba(175,82,222,0.15)'
                        }}>
                            <div style={{
                                background: 'rgba(175,82,222,0.1)',
                                width: '48px', height: '48px', borderRadius: '14px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 0.75rem'
                            }}>
                                <Activity size={24} color="#AF52DE" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>ಚಕ್ರ ಸಾಧನೆ</h3>
                            <p style={{ margin: '0.3rem 0 0', fontSize: '0.65rem', color: '#AF52DE', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                7 Chakras
                            </p>
                        </div>
                    </Link>

                    {/* Moksha Marga Card */}
                    <Link to="/moksha-marga" style={{ textDecoration: 'none' }} className="animate-slide-up">
                        <div className="card h-full" style={{
                            textAlign: 'center', padding: '1.5rem 1rem',
                            background: 'linear-gradient(135deg, rgba(255,149,0,0.08), rgba(255,149,0,0.02))',
                            border: '1px solid rgba(255,149,0,0.15)'
                        }}>
                            <div style={{
                                background: 'rgba(255,149,0,0.1)',
                                width: '48px', height: '48px', borderRadius: '14px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 0.75rem'
                            }}>
                                <Sparkles size={24} color="#FF9500" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>ಮೋಕ್ಷ ಮಾರ್ಗ</h3>
                            <p style={{ margin: '0.3rem 0 0', fontSize: '0.65rem', color: '#FF9500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                3 Yoga Paths
                            </p>
                        </div>
                    </Link>

                    {/* Dharmic Lifestyle Card */}
                    <Link to="/dharmic-lifestyle" style={{ textDecoration: 'none' }} className="animate-slide-up">
                        <div className="card h-full" style={{
                            textAlign: 'center', padding: '1.5rem 1rem',
                            background: 'linear-gradient(135deg, rgba(52,199,89,0.08), rgba(52,199,89,0.02))',
                            border: '1px solid rgba(52,199,89,0.15)'
                        }}>
                            <div style={{
                                background: 'rgba(52,199,89,0.1)',
                                width: '48px', height: '48px', borderRadius: '14px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 0.75rem'
                            }}>
                                <Leaf size={24} color="#34C759" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>ಧಾರ್ಮಿಕ ಜೀವನ</h3>
                            <p style={{ margin: '0.3rem 0 0', fontSize: '0.65rem', color: '#34C759', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Yama & Niyama
                            </p>
                        </div>
                    </Link>

                    {/* Japa Mala Card */}
                    <Link to="/japa" style={{ textDecoration: 'none' }} className="animate-slide-up">
                        <div className="card h-full" style={{
                            textAlign: 'center', padding: '1.5rem 1rem',
                            background: 'linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,107,53,0.02))',
                            border: '1px solid rgba(255,107,53,0.15)'
                        }}>
                            <div style={{
                                background: 'rgba(255,107,53,0.1)',
                                width: '48px', height: '48px', borderRadius: '14px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 0.75rem'
                            }}>
                                <Activity size={24} color="#FF6B35" />
                            </div>
                            <h3 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>ಜಪ ಮಾಲೆ</h3>
                            <p style={{ margin: '0.3rem 0 0', fontSize: '0.65rem', color: '#FF6B35', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                108 Counter
                            </p>
                        </div>
                    </Link>
                </div>

                {/* App Info Footer */}
                <div style={{
                    textAlign: 'center',
                    padding: '2rem 1rem 1rem',
                    opacity: 0.6
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Info size={14} color="var(--text-secondary)" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            ಸನಾತನ ಸಂಸ್ಕೃತಿ • Sanatana Samskruti
                        </span>
                    </div>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', margin: 0 }}>
                        18 ಅಧ್ಯಾಯಗಳು • 700+ ಶ್ಲೋಕಗಳು • 5 ವಿಭಾಗಗಳು
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SamskrutiHome;
