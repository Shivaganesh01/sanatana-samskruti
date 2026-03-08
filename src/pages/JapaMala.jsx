import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';
import { RotateCcw, Trash2, Activity, Flame, Target, Clock, TrendingUp, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { updateJapaStreak, getJapaStreak } from '../utils/readingProgress';

const MANTRAS = [
    { id: 'om', name_kn: 'ಓಂ', name_en: 'Om', desc: 'ಪ್ರಣವ ಮಂತ್ರ - Universal Sound', color: '#FFD700' },
    { id: 'rama', name_kn: 'ಶ್ರೀ ರಾಮ ಜಯ ರಾಮ ಜಯ ಜಯ ರಾಮ', name_en: 'Sri Rama Jaya Rama', desc: 'ಶ್ರೀರಾಮ ನಾಮ - Rama Mantra', color: '#34C759' },
    { id: 'krishna', name_kn: 'ಹರೇ ಕೃಷ್ಣ ಹರೇ ಕೃಷ್ಣ', name_en: 'Hare Krishna Hare Krishna', desc: 'ಮಹಾಮಂತ್ರ - Maha Mantra', color: '#4ECDC4' },
    { id: 'shiva', name_kn: 'ಓಂ ನಮಃ ಶಿವಾಯ', name_en: 'Om Namah Shivaya', desc: 'ಪಂಚಾಕ್ಷರ ಮಂತ್ರ - Panchakshari', color: '#AF52DE' },
    { id: 'gayatri', name_kn: 'ಓಂ ಭೂರ್ಭುವಃ ಸ್ವಃ', name_en: 'Gayatri Mantra', desc: 'ವೈದಿಕ ಮಂತ್ರ - Vedic Mantra', color: '#FF9933' },
    { id: 'ganesh', name_kn: 'ಓಂ ಗಂ ಗಣಪತಯೇ ನಮಃ', name_en: 'Om Gam Ganapataye Namah', desc: 'ವಿಘ್ನಹರ - Obstacle Remover', color: '#FF6B35' },
    { id: 'hanuman', name_kn: 'ಓಂ ಹನುಮತೇ ನಮಃ', name_en: 'Om Hanumate Namah', desc: 'ಬಜರಂಗಬಲಿ - Bajrangbali', color: '#FF4B4B' },
    { id: 'custom', name_kn: 'ನಿಮ್ಮ ಮಂತ್ರ', name_en: 'Your Mantra', desc: 'ಯಾವುದೇ ಮಂತ್ರ ಜಪಿಸಿ', color: '#C0C0C0' }
];

const JapaMala = () => {
    const [count, setCount] = useState(0);
    const [history, setHistory] = useState([]);
    const [selectedMantra, setSelectedMantra] = useState('om');
    const [showMantras, setShowMantras] = useState(false);
    const [dailyGoal, setDailyGoal] = useState(108);
    const [sessionTime, setSessionTime] = useState(0);
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [japaStreak, setJapaStreak] = useState({ currentStreak: 0, bestStreak: 0, totalSessions: 0, totalCounts: 0 });
    const [showHistory, setShowHistory] = useState(false);
    const [showGoalSettings, setShowGoalSettings] = useState(false);

    // Load from local storage
    useEffect(() => {
        const savedCount = localStorage.getItem('japa_count');
        const savedHistory = localStorage.getItem('japa_history');
        const savedMantra = localStorage.getItem('japa_mantra');
        const savedGoal = localStorage.getItem('japa_daily_goal');

        if (savedCount) setCount(parseInt(savedCount, 10));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        if (savedMantra) setSelectedMantra(savedMantra);
        if (savedGoal) setDailyGoal(parseInt(savedGoal, 10));

        setJapaStreak(getJapaStreak());
    }, []);

    // Save to local storage whenever count/history changes
    useEffect(() => {
        localStorage.setItem('japa_count', count.toString());
        localStorage.setItem('japa_history', JSON.stringify(history));
    }, [count, history]);

    // Session timer
    useEffect(() => {
        let interval;
        if (isSessionActive) {
            interval = setInterval(() => {
                setSessionTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isSessionActive]);

    const triggerHaptic = async (style = ImpactStyle.Light) => {
        if (Capacitor.isNativePlatform()) {
            await Haptics.impact({ style });
        }
    };

    const handleTap = async () => {
        if (!isSessionActive) setIsSessionActive(true);

        const newCount = count + 1;
        setCount(newCount);

        if (newCount % 108 === 0) {
            await triggerHaptic(ImpactStyle.Heavy);
            setTimeout(() => triggerHaptic(ImpactStyle.Medium), 200);
            saveToHistory(newCount);

            // Update streak
            const updatedStreak = updateJapaStreak(108);
            setJapaStreak(updatedStreak);
        } else {
            await triggerHaptic(ImpactStyle.Light);
        }
    };

    const handleReset = () => {
        if (count > 0) {
            if (window.confirm("Do you want to save current progress to history before resetting?")) {
                saveToHistory(count);
                const updatedStreak = updateJapaStreak(count % 108);
                setJapaStreak(updatedStreak);
            }
        }
        setCount(0);
        setSessionTime(0);
        setIsSessionActive(false);
        triggerHaptic(ImpactStyle.Medium);
    };

    const saveToHistory = (currentCount) => {
        const mantra = MANTRAS.find(m => m.id === selectedMantra);
        const entry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('kn-IN', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }),
            count: currentCount,
            malas: Math.floor(currentCount / 108),
            mantra: mantra?.name_kn || 'ಓಂ',
            duration: sessionTime
        };
        const updatedHistory = [entry, ...history].slice(0, 50);
        setHistory(updatedHistory);
    };

    const deleteHistoryEntry = (id) => {
        const updatedHistory = history.filter(item => item.id !== id);
        setHistory(updatedHistory);
        triggerHaptic(ImpactStyle.Light);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentMantra = MANTRAS.find(m => m.id === selectedMantra) || MANTRAS[0];
    const progressInMala = count % 108;
    const progressPercent = (progressInMala / 108) * 100;
    const dailyProgressPercent = Math.min(100, (count / dailyGoal) * 100);

    return (
        <div className="content-area animate-fade-in" style={{ paddingBottom: '100px' }}>
            <Header title="ಜಪ ಮಾಲೆ (Japa Mala)" />

            <div className="container" style={{ textAlign: 'center', paddingTop: '0.5rem' }}>

                {/* Mantra Selector */}
                <div
                    className="card glass"
                    style={{
                        padding: '1rem',
                        marginBottom: '1rem',
                        cursor: 'pointer',
                        border: `1px solid ${currentMantra.color}30`,
                        transition: 'all 0.3s'
                    }}
                    onClick={() => setShowMantras(!showMantras)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>
                                ಮಂತ್ರ (Mantra)
                            </div>
                            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: currentMantra.color }}>
                                {currentMantra.name_kn}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                {currentMantra.desc}
                            </div>
                        </div>
                        {showMantras ? <ChevronUp size={18} color="var(--text-secondary)" /> : <ChevronDown size={18} color="var(--text-secondary)" />}
                    </div>

                    {showMantras && (
                        <div className="animate-fade-in" style={{
                            marginTop: '1rem', borderTop: '1px solid var(--border-color)',
                            paddingTop: '0.75rem',
                            display: 'grid', gap: '0.5rem'
                        }}>
                            {MANTRAS.map(mantra => (
                                <div
                                    key={mantra.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedMantra(mantra.id);
                                        localStorage.setItem('japa_mantra', mantra.id);
                                        setShowMantras(false);
                                    }}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '10px',
                                        border: selectedMantra === mantra.id ? `1px solid ${mantra.color}50` : '1px solid rgba(255,255,255,0.05)',
                                        background: selectedMantra === mantra.id ? `${mantra.color}10` : 'transparent',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: mantra.color }}>{mantra.name_kn}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{mantra.desc}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats Row */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem', marginBottom: '1.5rem'
                }}>
                    <div style={{
                        padding: '0.75rem 0.5rem',
                        background: 'rgba(255,107,53,0.08)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,107,53,0.15)'
                    }}>
                        <Flame size={16} color="#FF6B35" style={{ marginBottom: '0.25rem' }} />
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FF6B35' }}>{japaStreak.currentStreak}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>Day Streak</div>
                    </div>
                    <div style={{
                        padding: '0.75rem 0.5rem',
                        background: 'rgba(175,82,222,0.08)',
                        borderRadius: '12px',
                        border: '1px solid rgba(175,82,222,0.15)'
                    }}>
                        <Award size={16} color="#AF52DE" style={{ marginBottom: '0.25rem' }} />
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#AF52DE' }}>{japaStreak.bestStreak}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>Best Streak</div>
                    </div>
                    <div style={{
                        padding: '0.75rem 0.5rem',
                        background: 'rgba(52,199,89,0.08)',
                        borderRadius: '12px',
                        border: '1px solid rgba(52,199,89,0.15)'
                    }}>
                        <TrendingUp size={16} color="#34C759" style={{ marginBottom: '0.25rem' }} />
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#34C759' }}>{japaStreak.totalSessions}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>Sessions</div>
                    </div>
                </div>

                {/* Daily Goal Progress */}
                <div style={{
                    marginBottom: '1.5rem', padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.06)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            <Target size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            Daily Goal: {count}/{dailyGoal}
                        </span>
                        <button
                            onClick={() => setShowGoalSettings(!showGoalSettings)}
                            style={{
                                background: 'none', border: 'none',
                                color: 'var(--primary)', fontSize: '0.7rem',
                                cursor: 'pointer', padding: '0.25rem'
                            }}
                        >
                            Change
                        </button>
                    </div>
                    <div style={{
                        height: '6px', background: 'rgba(255,255,255,0.06)',
                        borderRadius: '3px', overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${dailyProgressPercent}%`,
                            background: dailyProgressPercent >= 100
                                ? 'linear-gradient(90deg, #34C759, #00E676)'
                                : 'linear-gradient(90deg, var(--primary), var(--secondary))',
                            borderRadius: '3px',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                    {dailyProgressPercent >= 100 && (
                        <div style={{ fontSize: '0.7rem', color: '#34C759', marginTop: '0.35rem', fontWeight: 600 }}>
                            🎉 ಇಂದಿನ ಗುರಿ ತಲುಪಿದಿರಿ! (Goal Reached!)
                        </div>
                    )}
                    {showGoalSettings && (
                        <div className="animate-fade-in" style={{
                            marginTop: '0.75rem', paddingTop: '0.75rem',
                            borderTop: '1px solid var(--border-color)',
                            display: 'flex', gap: '0.5rem', flexWrap: 'wrap'
                        }}>
                            {[108, 216, 324, 540, 1080].map(goal => (
                                <button
                                    key={goal}
                                    onClick={() => {
                                        setDailyGoal(goal);
                                        localStorage.setItem('japa_daily_goal', goal.toString());
                                        setShowGoalSettings(false);
                                    }}
                                    style={{
                                        padding: '0.4rem 0.75rem',
                                        borderRadius: '8px',
                                        border: dailyGoal === goal ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                                        background: dailyGoal === goal ? 'rgba(255,153,51,0.15)' : 'rgba(255,255,255,0.03)',
                                        color: dailyGoal === goal ? 'var(--primary)' : 'var(--text-secondary)',
                                        fontSize: '0.8rem', fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {goal} ({Math.floor(goal / 108)} Mala{goal > 108 ? 's' : ''})
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Session Timer */}
                {isSessionActive && (
                    <div style={{
                        fontSize: '0.8rem', color: 'var(--text-secondary)',
                        marginBottom: '0.75rem',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '0.3rem'
                    }}>
                        <Clock size={14} />
                        <span>Session: {formatTime(sessionTime)}</span>
                    </div>
                )}

                {/* Counter Circle */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', position: 'relative' }}>
                    {/* SVG Progress Ring */}
                    <svg width="260" height="260" style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)' }}>
                        <circle
                            cx="130" cy="130" r="120"
                            fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6"
                        />
                        <circle
                            cx="130" cy="130" r="120"
                            fill="none" stroke={currentMantra.color} strokeWidth="6"
                            strokeDasharray={`${2 * Math.PI * 120}`}
                            strokeDashoffset={`${2 * Math.PI * 120 * (1 - progressPercent / 100)}`}
                            strokeLinecap="round"
                            transform="rotate(-90, 130, 130)"
                            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                            opacity={0.6}
                        />
                    </svg>
                    <button
                        onClick={handleTap}
                        className="glass"
                        style={{
                            width: '220px',
                            height: '220px',
                            borderRadius: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `3px solid ${currentMantra.color}60`,
                            background: `${currentMantra.color}08`,
                            cursor: 'pointer',
                            transition: 'all 0.1s ease',
                            boxShadow: `0 8px 32px ${currentMantra.color}20`,
                            userSelect: 'none',
                            WebkitTapHighlightColor: 'transparent',
                            outline: 'none',
                            position: 'relative',
                            zIndex: 1
                        }}
                        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        onTouchStart={e => e.currentTarget.style.transform = 'scale(0.95)'}
                        onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <span style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>
                            {count}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: currentMantra.color, marginTop: '0.25rem', fontWeight: 600 }}>
                            {Math.floor(count / 108)} Mala{Math.floor(count / 108) !== 1 ? 's' : ''}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                            {108 - progressInMala} left in mala
                        </span>
                    </button>
                </div>

                {/* Reset Button */}
                <button
                    onClick={handleReset}
                    className="btn secondary"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        marginBottom: '2rem', width: 'auto', padding: '0.75rem 1.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        color: 'var(--text-secondary)',
                        boxShadow: 'none'
                    }}
                >
                    <RotateCcw size={18} />
                    Reset Counter
                </button>

                {/* History Section */}
                <div style={{ textAlign: 'left' }}>
                    <div
                        style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            marginBottom: '1rem', paddingBottom: '0.5rem',
                            borderBottom: '1px solid var(--border-color)',
                            cursor: 'pointer'
                        }}
                        onClick={() => setShowHistory(!showHistory)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={20} color="var(--primary)" />
                            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Japa History</h3>
                            <span style={{
                                fontSize: '0.65rem', fontWeight: 700,
                                background: 'rgba(255,153,51,0.1)',
                                color: 'var(--primary)',
                                padding: '2px 8px',
                                borderRadius: '50px'
                            }}>
                                {history.length}
                            </span>
                        </div>
                        {showHistory ? <ChevronUp size={18} color="var(--text-secondary)" /> : <ChevronDown size={18} color="var(--text-secondary)" />}
                    </div>

                    {showHistory && (
                        <div className="animate-fade-in">
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
                                                <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                                    {entry.count} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>counts</span>
                                                    {entry.malas > 0 && (
                                                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginLeft: '0.5rem' }}>
                                                            ({entry.malas} Mala{entry.malas > 1 ? 's' : ''})
                                                        </span>
                                                    )}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                                                    {entry.mantra && <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>{entry.mantra}</span>}
                                                    {entry.date}
                                                    {entry.duration > 0 && <span style={{ marginLeft: '0.5rem' }}>• {formatTime(entry.duration)}</span>}
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default JapaMala;
