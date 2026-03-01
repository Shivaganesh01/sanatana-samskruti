import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sun, Quote, MapPin, Activity, Library, Book, Leaf, Music, Flame, Mic2, Calendar, User, PenTool, Zap, HeartPulse, Sparkles } from 'lucide-react';
import VerseOfTheDay from '../components/VerseOfTheDay';

import Header from '../components/Header';
import SearchDialog from '../components/SearchDialog';

const IconMap = {
    Sun, Quote, MapPin, Activity, Library, Book, Leaf, Music,
    Flame, Mic2, Calendar, User, PenTool, Zap, HeartPulse, Sparkles
};

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return "ಶುಭ ರಾತ್ರಿ";
    if (hour < 12) return "ಶುಭೋದಯ";
    if (hour < 17) return "ಶುಭ ಮಧ್ಯಾಹ್ನ";
    if (hour < 21) return "ಶುಭ ಸಂಜೆ";
    return "ಶುಭ ರಾತ್ರಿ";
};

const SamskrutiHome = ({ categories }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
    const greeting = getGreeting();

    const filteredData = categories.filter(category =>
        category.title_kn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="content-area animate-fade-in">
            <Header title="ಸನಾತನ ಸಂಸ್ಕೃತಿ" />
            <div className="container">
                <div style={{ marginBottom: '2.5rem', textAlign: 'left', paddingTop: '0.5rem' }}>
                    <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{greeting}</h2>
                    <p className="text-secondary" style={{ fontSize: '1.1rem' }}>ನಿತ್ಯ ಜೀವನದ ಸನಾತನ ಮಾರ್ಗದರ್ಶಿ</p>
                </div>

                <VerseOfTheDay />

                {/* Global Search Trigger (Home Page version) */}
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
                        readOnly // It opens the global search dialog instead
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                {isGlobalSearchOpen && (
                    <SearchDialog
                        isOpen={isGlobalSearchOpen}
                        onClose={() => setIsGlobalSearchOpen(false)}
                    />
                )}

                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>ವಿಭಾಗಗಳು (Categories)</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {filteredData.map((category, index) => {
                        const IconComponent = IconMap[category.icon] || Sun;
                        return (
                            <Link
                                to={`/samskruti/${category.id}`}
                                key={category.id}
                                style={{ textDecoration: 'none', animationDelay: `${index * 0.05}s` }}
                                className="animate-slide-up"
                            >
                                <div className="card h-full" style={{ textAlign: 'center', padding: '1.75rem 1rem' }}>
                                    <div style={{
                                        background: 'rgba(255, 153, 51, 0.1)',
                                        width: '56px', height: '56px', borderRadius: '16px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 1.25rem'
                                    }}>
                                        <IconComponent size={28} color="var(--primary)" />
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{category.title_kn}</h3>
                                    <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {category.title_en}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}

                    {/* Chakra & Atma Sadhana Card */}
                    {("ಚಕ್ರ ಮತ್ತು ಆತ್ಮ ಸಾಧನೆ chakra saadhana".includes(searchTerm.toLowerCase())) && (
                        <Link
                            to="/chakra-sadhana"
                            style={{ textDecoration: 'none', animationDelay: `${filteredData.length * 0.05}s` }}
                            className="animate-slide-up"
                        >
                            <div className="card h-full" style={{ textAlign: 'center', padding: '1.75rem 1rem' }}>
                                <div style={{
                                    background: 'rgba(255, 153, 51, 0.1)',
                                    width: '56px', height: '56px', borderRadius: '16px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.25rem'
                                }}>
                                    <Activity size={28} color="var(--primary)" />
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>ಚಕ್ರ ಮತ್ತು ಆತ್ಮ ಸಾಧನೆ</h3>
                                <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Chakra Sadhana
                                </p>
                            </div>
                        </Link>
                    )}

                    {/* Moksha Marga Card */}
                    {("ಮೋಕ್ಷ ಮಾರ್ಗ moksha marga".includes(searchTerm.toLowerCase())) && (
                        <Link
                            to="/moksha-marga"
                            style={{ textDecoration: 'none', animationDelay: `${(filteredData.length + 1) * 0.05}s` }}
                            className="animate-slide-up"
                        >
                            <div className="card h-full" style={{ textAlign: 'center', padding: '1.75rem 1rem' }}>
                                <div style={{
                                    background: 'rgba(255, 149, 0, 0.1)',
                                    width: '56px', height: '56px', borderRadius: '16px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.25rem'
                                }}>
                                    <Sparkles size={28} color="#FF9500" />
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>ಮೋಕ್ಷ ಮಾರ್ಗ</h3>
                                <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Moksha Marga
                                </p>
                            </div>
                        </Link>
                    )}

                    {/* Dharmic Lifestyle Card */}
                    {("ಧಾರ್ಮಿಕ ಜೀವನ ಜೀವನ ಶೈಲಿ lifestyle".includes(searchTerm.toLowerCase())) && (
                        <Link
                            to="/dharmic-lifestyle"
                            style={{ textDecoration: 'none', animationDelay: `${(filteredData.length + 2) * 0.05}s` }}
                            className="animate-slide-up"
                        >
                            <div className="card h-full" style={{ textAlign: 'center', padding: '1.75rem 1rem' }}>
                                <div style={{
                                    background: 'rgba(52, 199, 89, 0.1)',
                                    width: '56px', height: '56px', borderRadius: '16px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.25rem'
                                }}>
                                    <Leaf size={28} color="#34C759" />
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>ಧಾರ್ಮಿಕ ಜೀವನ</h3>
                                <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Dharmic Life
                                </p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SamskrutiHome;
