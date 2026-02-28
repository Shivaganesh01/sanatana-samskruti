import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';
import { RotateCcw, Trash2, Activity } from 'lucide-react';

const JapaMala = () => {
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([]);

    // Load from local storage
    useEffect(() => {
        const savedCount = localStorage.getItem('japa_count');
        const savedHistory = localStorage.getItem('japa_history');

        if (savedCount) setCount(parseInt(savedCount, 10));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    // Save to local storage whenever count/history changes
    useEffect(() => {
        localStorage.setItem('japa_count', count.toString());
        localStorage.setItem('japa_history', JSON.stringify(history));
    }, [count, history]);

    const triggerHaptic = async (style = ImpactStyle.Light) => {
        if (Capacitor.isNativePlatform()) {
            await Haptics.impact({ style });
        }
    };

    const handleTap = async () => {
        const newCount = count + 1;
        setCount(newCount);

        if (newCount % 108 === 0) {
            // Milestone reached! 1 Mala
            await triggerHaptic(ImpactStyle.Heavy);
            setTimeout(() => triggerHaptic(ImpactStyle.Medium), 200);
            saveToHistory(newCount);
        } else {
            await triggerHaptic(ImpactStyle.Light);
        }
    };

    const handleReset = () => {
        if (count > 0) {
            if (window.confirm("Do you want to save current progress to history before resetting?")) {
                saveToHistory(count);
            }
        }
        setCount(0);
        triggerHaptic(ImpactStyle.Medium);
    };

    const saveToHistory = (currentCount) => {
        const entry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('kn-IN', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }),
            count: currentCount,
            malas: Math.floor(currentCount / 108)
        };
        const updatedHistory = [entry, ...history].slice(0, 50); // Keep last 50 entries
        setHistory(updatedHistory);
    };

    const deleteHistoryEntry = (id) => {
        const updatedHistory = history.filter(item => item.id !== id);
        setHistory(updatedHistory);
        triggerHaptic(ImpactStyle.Light);
    };

    return (
        <div className="content-area animate-fade-in" style={{ paddingBottom: '100px' }}>
            <Header title="ಜಪ ಮಾಲೆ (Japa Mala)" />

            <div className="container" style={{ textAlign: 'center', paddingTop: '1rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Tap the circle to count. Completing 108 counts makes 1 Mala.
                </p>

                {/* Counter Circle */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                    <button
                        onClick={handleTap}
                        className="glass animate-scale-up"
                        style={{
                            width: '240px',
                            height: '240px',
                            borderRadius: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '4px solid var(--primary)',
                            background: 'rgba(255, 153, 51, 0.05)',
                            cursor: 'pointer',
                            transition: 'all 0.1s ease',
                            boxShadow: '0 8px 32px rgba(255, 153, 51, 0.15)',
                            userSelect: 'none',
                            WebkitTapHighlightColor: 'transparent',
                            outline: 'none'
                        }}
                        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        onTouchStart={e => e.currentTarget.style.transform = 'scale(0.95)'}
                        onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <span style={{ fontSize: '4.5rem', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>
                            {count}
                        </span>
                        <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            {Math.floor(count / 108)} Malas
                        </span>
                    </button>
                </div>

                {/* Reset Button */}
                <button
                    onClick={handleReset}
                    className="btn secondary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}
                >
                    <RotateCcw size={18} />
                    Reset Counter
                </button>

                {/* History Section */}
                <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                        <Activity size={20} color="var(--primary)" />
                        <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Japa History</h3>
                    </div>

                    {history.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic', padding: '2rem 0' }}>
                            No history yet. Complete 108 counts or reset your counter to save progress.
                        </p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {history.map((entry) => (
                                <div key={entry.id} className="glass" style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)'
                                }}>
                                    <div>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                            {entry.count} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>counts</span>
                                            {entry.malas > 0 && (
                                                <span style={{ fontSize: '0.9rem', color: 'var(--primary)', marginLeft: '0.5rem' }}>
                                                    ({entry.malas} Mala(s))
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                                            {entry.date}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => deleteHistoryEntry(entry.id)}
                                        style={{
                                            background: 'rgba(255, 75, 75, 0.1)',
                                            border: 'none',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            color: 'var(--danger)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JapaMala;
