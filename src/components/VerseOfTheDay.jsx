import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const VerseOfTheDay = () => {
    const [verse, setVerse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVerseOfTheDay = async () => {
            try {
                setLoading(true);
                // 1. Fetch the index to get list of chapters
                const indexRes = await fetch('data/gita_index.json');
                if (!indexRes.ok) throw new Error('Failed to load Gita index');
                const chapters = await indexRes.json();

                // 2. Generate a seed based on the current date
                const today = new Date();
                const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

                // 3. Pick a random chapter using the seed
                // We use the seed for chapter selection
                const chapterIndex = seed % chapters.length;
                const targetChapter = chapters[chapterIndex];

                // 4. Fetch the content for that specific chapter
                const chapterRes = await fetch(`data/gita/chapter_${targetChapter.chapter}.json`);
                if (!chapterRes.ok) throw new Error(`Failed to load chapter ${targetChapter.chapter}`);
                const chapterData = await chapterRes.json();

                // 5. Pick a verse from the AVAILABLE verses in that file
                // We re-use the seed but shift it slightly to pick a verse index
                const availableVerses = chapterData.verses;

                if (!availableVerses || availableVerses.length === 0) {
                    // Fallback if chapter has no verses, try chapter 2 which we know is populated
                    const backupRes = await fetch('data/gita/chapter_2.json');
                    const backupData = await backupRes.json();
                    const backupVerseIndex = seed % backupData.verses.length;
                    const backupVerse = backupData.verses[backupVerseIndex];

                    if (backupVerse) {
                        setVerse({
                            chapter: 2,
                            verse: backupVerse.verse_number,
                            text: backupVerse.shloka,
                            transliteration: backupVerse.transliteration,
                            meaning: backupVerse.translation,
                        });
                    }
                    return;
                }

                const verseIndex = (seed * 13) % availableVerses.length; // Multiply by prime to vary verse from chapter
                const foundVerse = availableVerses[verseIndex];

                setVerse({
                    chapter: targetChapter.chapter,
                    verse: foundVerse.verse_number || (verseIndex + 1), // Fallback if number missing
                    text: foundVerse.shloka,
                    transliteration: foundVerse.transliteration,
                    meaning: foundVerse.translation,
                });

            } catch (err) {
                console.error("Verse of the Day Error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVerseOfTheDay();
    }, []);

    if (loading) return (
        <div className="card glass" style={{ marginBottom: '2rem', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="animate-pulse" style={{ color: 'var(--text-secondary)' }}>Loading Shloka of the Day...</div>
        </div>
    );

    if (error || !verse) return null;

    return (
        <div className="card glass animate-slide-up" style={{ marginBottom: '2rem', border: '1px solid rgba(255, 153, 51, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={18} color="var(--secondary)" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Verse of the Day</span>
                </div>
            </div>

            <div className="shloka-box" style={{ padding: '1.25rem', margin: '0 0 1rem', background: 'rgba(255, 153, 51, 0.05)', color: 'var(--text-primary)', borderLeftColor: 'var(--primary)' }}>
                <p className="shloka-text" style={{ fontSize: '1.1rem', color: 'var(--primary-light)', whiteSpace: 'pre-line' }}>
                    {verse.text}
                </p>
                {verse.transliteration && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontStyle: 'italic', opacity: 0.8, whiteSpace: 'pre-line' }}>
                        {verse.transliteration}
                    </p>
                )}
            </div>

            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                {verse.meaning}
            </p>

            <div style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>
                — Gita {verse.chapter}.{verse.verse}
            </div>
        </div>
    );
};

export default VerseOfTheDay;
