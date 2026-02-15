import { Sparkles } from 'lucide-react';

const VerseOfTheDay = () => {
    // Static for now, but could be dynamic
    const verse = {
        chapter: 2,
        verse: 47,
        text: "ಕರ್ಮಣ್ಯೇವಾಧಿಕಾರಸ್ತೇ ಮಾ ಫಲೇಷು ಕದಾಚನ |\nಮಾ ಕರ್ಮಫಲಹೇತುರ್ಭೂರ್ಮಾ ತೇ ಸಂಗೋಽಸ್ತ್ವಕರ್ಮಣಿ ||",
        meaning: "Your right is to work only, but never to its fruits; let not the fruit of action be your motive, nor let your attachment be to inaction."
    };

    return (
        <div className="card glass animate-slide-up" style={{ marginBottom: '2rem', border: '1px solid rgba(255, 153, 51, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Sparkles size={18} color="var(--secondary)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Verse of the Day</span>
            </div>
            <div className="shloka-box" style={{ padding: '1.25rem', margin: '0 0 1rem', background: 'rgba(255, 153, 51, 0.05)', color: 'var(--text-primary)', borderLeftColor: 'var(--primary)' }}>
                <p className="shloka-text" style={{ fontSize: '1.1rem', color: 'var(--primary-light)' }}>
                    {verse.text}
                </p>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                "{verse.meaning}"
            </p>
            <div style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>
                — Gita {verse.chapter}.{verse.verse}
            </div>
        </div>
    );
};

export default VerseOfTheDay;
