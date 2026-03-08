import { useState, useEffect } from 'react';
import { BookOpen, Heart, Activity, Flame, TrendingUp, Eye } from 'lucide-react';
import { getAppStats } from '../utils/readingProgress';

const StatCard = ({ icon, label, value, color, sublabel }) => (
    <div style={{
        padding: '1rem',
        background: `${color}08`,
        borderRadius: '14px',
        border: `1px solid ${color}20`,
        textAlign: 'center',
        transition: 'transform 0.2s ease'
    }}>
        <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: `${color}15`, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 0.5rem'
        }}>
            {icon}
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color, lineHeight: 1 }}>
            {value}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {label}
        </div>
        {sublabel && (
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', opacity: 0.7, marginTop: '2px' }}>
                {sublabel}
            </div>
        )}
    </div>
);

const StatsWidget = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        setStats(getAppStats());
    }, []);

    if (!stats) return null;

    // Don't show if user has no activity yet
    const hasActivity = stats.totalRead > 0 || stats.japaCount > 0 || stats.totalFavorites > 0;

    if (!hasActivity) return null;

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                marginBottom: '0.75rem'
            }}>
                <TrendingUp size={16} color="var(--primary)" />
                <h4 style={{
                    margin: 0, fontSize: '0.85rem', fontWeight: 600,
                    color: 'var(--text-secondary)', textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    ನಿಮ್ಮ ಪ್ರಯಾಣ (Your Journey)
                </h4>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem'
            }}>
                {stats.totalRead > 0 && (
                    <StatCard
                        icon={<BookOpen size={18} color="#FF9933" />}
                        label="ಓದಿದ"
                        value={stats.totalRead}
                        color="#FF9933"
                        sublabel="Articles Read"
                    />
                )}
                {stats.totalFavorites > 0 && (
                    <StatCard
                        icon={<Heart size={18} color="#FF4B4B" />}
                        label="ಮೆಚ್ಚಿನ"
                        value={stats.totalFavorites}
                        color="#FF4B4B"
                        sublabel="Favorites"
                    />
                )}
                {stats.japaCount > 0 && (
                    <StatCard
                        icon={<Activity size={18} color="#34C759" />}
                        label="ಜಪ"
                        value={stats.japaMalas}
                        color="#34C759"
                        sublabel={`${stats.japaCount} counts`}
                    />
                )}
                {stats.japaStreak > 0 && (
                    <StatCard
                        icon={<Flame size={18} color="#FF6B35" />}
                        label="ಸ್ಟ್ರೀಕ್"
                        value={stats.japaStreak}
                        color="#FF6B35"
                        sublabel={`Best: ${stats.japaBestStreak}`}
                    />
                )}
                {stats.categoriesExplored > 0 && (
                    <StatCard
                        icon={<Eye size={18} color="#AF52DE" />}
                        label="ವಿಭಾಗ"
                        value={stats.categoriesExplored}
                        color="#AF52DE"
                        sublabel="Explored"
                    />
                )}
            </div>
        </div>
    );
};

export default StatsWidget;
