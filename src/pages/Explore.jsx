import { useState } from 'react';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import SearchDialog from '../components/SearchDialog';

// Reusing existing search logic but in a dedicated page + discovery
const Explore = () => {
    // This page will essentially be a full-screen entry point to the search
    // plus "Trending" or "Popular" topics to explore
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleTopicClick = (topic) => {
        // Extract the main term (e.g., "Peace" from "Peace / ಶಾಂತಿ")
        const term = topic.split('/')[0].trim();
        setSearchQuery(term);
        setSearchOpen(true);
    };

    return (
        <div className="content-area animate-fade-in">
            <Header title="ಅನ್ವೇಷಿಸಿ (Explore)" />

            <div className="container">
                <div
                    onClick={() => {
                        setSearchQuery('');
                        setSearchOpen(true);
                    }}
                    className="card glass"
                    style={{
                        margin: '1rem 0 2rem',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        borderColor: 'var(--primary)'
                    }}
                >
                    <Search color="var(--primary)" />
                    <span style={{ color: 'var(--text-secondary)' }}>ಏನನ್ನಾದರೂ ಹುಡುಕಿ... (Search...)</span>
                </div>

                <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>ಜನಪ್ರಿಯ ವಿಷಯಗಳು (Popular Topics)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {/* Placeholder trending topics */}
                    {['Peace / ಶಾಂತಿ', 'Anger / ಕೋಪ', 'Duty / ಕರ್ತವ್ಯ', 'Meditation / ಧ್ಯಾನ', 'Success / ಜಯ', 'Death / ಮೃತ್ಯು'].map((topic, i) => (
                        <div key={i} className="card glass" style={{
                            padding: '1.25rem',
                            textAlign: 'center',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            cursor: 'pointer'
                        }}
                            onClick={() => handleTopicClick(topic)}
                        >
                            {topic}
                        </div>
                    ))}
                </div>
            </div>

            {/* Reuse the existing search dialog */}
            {searchOpen && <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} initialQuery={searchQuery} />}
        </div>
    );
};

export default Explore;
