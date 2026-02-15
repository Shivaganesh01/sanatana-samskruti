import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ChevronRight, Book, Music, Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchDialog = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState({ gita: [], categories: [], stotras: [] });
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // 1. Initial Load: Fetch all data ONCE when dialog opens.
    useEffect(() => {
        if (!isOpen) return;

        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch basics
                const [samskrutiRes, gitaRes] = await Promise.all([
                    fetch('data/samskruti_index.json'),
                    fetch('data/gita_index.json')
                ]);

                const samskrutiIndex = samskrutiRes.ok ? await samskrutiRes.json() : [];
                const gitaIndex = gitaRes.ok ? await gitaRes.json() : [];

                // Fetch Deep Content (Stotras)
                let stotras = [];
                try {
                    const stotraRes = await fetch('data/samskruti/stotras.json');
                    if (stotraRes.ok) {
                        stotras = await stotraRes.json();
                    }
                } catch (e) {
                    console.warn("Stotra load error", e);
                }

                setAllData({
                    gita: gitaIndex || [],
                    categories: samskrutiIndex || [],
                    stotras: stotras || []
                });
            } catch (err) {
                console.error("Search init error:", err);
            } finally {
                setLoading(false);
                // Auto-focus input
                setTimeout(() => {
                    if (inputRef.current) inputRef.current.focus();
                }, 150);
            }
        };

        loadData();
    }, [isOpen]);

    // 2. Filter Logic: Run locally on the loaded data
    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (q.length < 2) return [];

        const hits = [];
        console.log(`Global Search matching for: "${q}"`, {
            gita: allData.gita.length,
            cats: allData.categories.length,
            stotras: allData.stotras.length
        });

        // A. Search Gita
        allData.gita.forEach(chapter => {
            const kn = (chapter.title_kn || '').toLowerCase();
            const en = (chapter.title_en || '').toLowerCase();
            const sum = (chapter.summary_kn || '').toLowerCase();
            const ch = String(chapter.chapter || '');

            // Allow searching for "Gita" plus chapter number, or just the chapter content
            const isGitaTerm = q.includes('gita') || q.includes('geeta') || q.includes('ಭಗವದ್ಗೀತೆ');

            if (kn.includes(q) || en.includes(q) || sum.includes(q) || ch === q || (isGitaTerm && q.includes(ch))) {
                hits.push({
                    type: 'gita',
                    icon: <Book size={18} />,
                    title: `ಅಧ್ಯಾಯ ${chapter.chapter}: ${chapter.title_kn}`,
                    subtitle: chapter.title_en || 'ಭಗವದ್ಗೀತೆ',
                    link: `/gita/${chapter.chapter}`
                });
            }
        });

        // B. Search Top Categories
        allData.categories.forEach(cat => {
            const kn = (cat.title_kn || '').toLowerCase();
            const en = (cat.title_en || '').toLowerCase();
            if (kn.includes(q) || en.includes(q)) {
                hits.push({
                    type: 'category',
                    icon: <Folder size={18} />,
                    title: cat.title_kn,
                    subtitle: cat.title_en,
                    link: `/samskruti/${cat.id}`
                });
            }
        });

        // C. Search Stotras (Deep Search)
        allData.stotras.forEach(s => {
            const kn = (s.title_kn || '').toLowerCase();
            const en = (s.title_en || '').toLowerCase();
            const shloka = (s.shloka || '').toLowerCase();

            if (kn.includes(q) || en.includes(q) || shloka.includes(q)) {
                hits.push({
                    type: 'stotra',
                    icon: <Music size={18} />,
                    title: s.title_kn,
                    subtitle: s.title_en || 'ಸ್ತೋತ್ರ',
                    link: `/samskruti/stotras/${s.id}`
                });
            }
        });

        console.log(`Search hits: ${hits.length}`);
        return hits;
    }, [query, allData]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg-color)',
            zIndex: 9999, // Ensure it's on top of everything
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.2s ease-out'
        }}>
            {/* Search Top Bar */}
            <div style={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                borderBottom: '1px solid var(--border-color)',
                background: 'var(--surface-color)',
                position: 'sticky',
                top: 0
            }}>
                <button
                    onClick={onClose}
                    style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0 }}
                >
                    <X size={24} />
                </button>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="ಹುಡುಕಿ (Search)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '1.2rem',
                        flex: 1,
                        outline: 'none',
                        fontFamily: 'var(--font-sans)'
                    }}
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)' }}
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Results Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                {loading && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        ಇಂಡೆಕ್ಸ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...
                    </div>
                )}

                {!loading && query.length < 2 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        <Search size={40} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p>ಕನಿಷ್ಠ ೨ ಅಕ್ಷರಗಳನ್ನು ಟೈಪ್ ಮಾಡಿ...</p>
                    </div>
                )}

                {!loading && query.length >= 2 && results.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        <p>ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.</p>
                    </div>
                )}

                <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {results.map((hit, i) => (
                        <div
                            key={`${hit.type}-${i}`}
                            onClick={() => {
                                navigate(hit.link);
                                onClose();
                            }}
                            className="card"
                            style={{
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                cursor: 'pointer',
                                background: 'var(--surface-color)'
                            }}
                        >
                            <div style={{ color: 'var(--primary)', opacity: 0.8 }}>
                                {hit.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{hit.title}</h4>
                                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{hit.subtitle}</p>
                            </div>
                            <ChevronRight size={16} color="var(--text-secondary)" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchDialog;
