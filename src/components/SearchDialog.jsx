import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ChevronRight, Book, Music, Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchDialog = ({ isOpen, onClose, initialQuery }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState({ gita: [], categories: [], details: {} });
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // 1. Initial Load: Fetch all data ONCE when dialog opens.
    useEffect(() => {
        if (!isOpen) return;

        setQuery(initialQuery || '');

        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch basics
                const [samskrutiRes, gitaRes] = await Promise.all([
                    fetch('/data/samskruti_index.json'),
                    fetch('/data/gita_index.json')
                ]);

                const samskrutiIndex = samskrutiRes.ok ? await samskrutiRes.json() : [];
                const gitaIndex = gitaRes.ok ? await gitaRes.json() : [];

                // Fetch Deep Content for ALL categories (including stotras)
                const detailPromises = samskrutiIndex.map(cat =>
                    fetch(`/data/samskruti/${cat.id}.json`)
                        .then(res => res.ok ? res.json() : null)
                        .catch(err => {
                            console.warn(`Failed to load ${cat.id}`, err);
                            return null;
                        })
                );

                const detailResults = await Promise.all(detailPromises);

                // Map category ID to its content
                const detailsMap = {};
                samskrutiIndex.forEach((cat, index) => {
                    if (detailResults[index]) {
                        detailsMap[cat.id] = detailResults[index];
                    }
                });

                setAllData({
                    gita: gitaIndex || [],
                    categories: samskrutiIndex || [],
                    details: detailsMap
                });
            } catch (err) {
                console.error("Search init error:", err);
            } finally {
                setLoading(false);
                setTimeout(() => {
                    if (inputRef.current) inputRef.current.focus();
                }, 150);
            }
        };

        loadData();
    }, [isOpen, initialQuery]);

    // 2. Filter Logic: Run locally on the loaded data
    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (q.length < 2) return [];

        const hits = [];
        // Helper to find snippet
        const getSnippet = (text) => {
            if (!text) return null;
            const str = String(text);
            const lowerStr = str.toLowerCase();
            const index = lowerStr.indexOf(q);

            if (index === -1) return null;

            if (str.length < 60) return str;

            const start = Math.max(0, index - 30);
            const end = Math.min(str.length, index + q.length + 50);
            let snippet = str.substring(start, end);

            if (start > 0) snippet = '...' + snippet;
            if (end < str.length) snippet = snippet + '...';

            return snippet;
        };

        // Helper text search
        const matches = (text) => (text || '').toLowerCase().includes(q);

        // A. Search Gita (Chapters)
        allData.gita.forEach(chapter => {
            const kn = chapter.title_kn;
            const en = chapter.title_en;
            const sum = chapter.summary_kn;
            const ch = String(chapter.chapter || '');

            const isGitaTerm = q.includes('gita') || q.includes('geeta') || q.includes('ಭಗವದ್ಗೀತೆ');
            const matchInCh = ch === q || (isGitaTerm && q.includes(ch));

            let snippet = null;
            if (matches(kn) || matches(en)) snippet = null; // Title match
            else if (matches(sum)) snippet = getSnippet(sum);

            if (matches(kn) || matches(en) || snippet || matchInCh) {
                hits.push({
                    type: 'gita',
                    icon: <Book size={18} />,
                    title: `ಅಧ್ಯಾಯ ${chapter.chapter}: ${chapter.title_kn}`,
                    subtitle: snippet || chapter.title_en || 'ಭಗವದ್ಗೀತೆ',
                    link: `/gita/${chapter.chapter}`
                });
            }
        });

        // B. Search Top Categories (Titles)
        allData.categories.forEach(cat => {
            let snippet = null;
            if (matches(cat.title_kn) || matches(cat.title_en)) snippet = null;
            else if (matches(cat.description)) snippet = getSnippet(cat.description);

            if (matches(cat.title_kn) || matches(cat.title_en) || snippet) {
                hits.push({
                    type: 'category',
                    icon: <Folder size={18} />,
                    title: cat.title_kn,
                    subtitle: snippet || cat.title_en,
                    link: `/samskruti/${cat.id}`
                });
            }
        });

        // C. Deep Search Content (Inside Categories)
        Object.entries(allData.details).forEach(([catId, items]) => {
            if (!Array.isArray(items)) return;

            const catInfo = allData.categories.find(c => c.id === catId);
            const catName = catInfo ? catInfo.title_kn : 'ಸಂಸ್ಕೃತಿ';
            const isStotra = catId === 'stotras';

            items.forEach(item => {
                // Check all relevant fields
                const titleMatch = matches(item.title_kn) || matches(item.title_en);

                let snippet = null;
                if (!titleMatch) {
                    snippet =
                        getSnippet(item.content_kn) ||
                        getSnippet(item.content_en) ||
                        getSnippet(item.description) ||
                        getSnippet(item.shloka) ||
                        getSnippet(item.meaning);
                }

                if (titleMatch || snippet) {
                    hits.push({
                        type: 'item',
                        icon: isStotra ? <Music size={18} /> : <Book size={18} />,
                        title: item.title_kn || item.title_en || 'ವಿವರ',
                        subtitle: snippet ? `${catName} | ${snippet}` : `${catName} - ${item.title_en || ''}`,
                        link: item.customRoute || `/samskruti/${catId}/${item.id}`
                    });
                }
            });
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
