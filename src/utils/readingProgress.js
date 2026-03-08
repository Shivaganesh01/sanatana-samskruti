/**
 * Reading Progress Utility
 * Tracks which items the user has read across the app
 */

const STORAGE_KEY = 'sanatana_reading_progress';
const RECENTLY_VIEWED_KEY = 'sanatana_recently_viewed';
const JAPA_STREAK_KEY = 'sanatana_japa_streak';

// --- Reading Progress ---

export const getReadingProgress = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
};

export const markAsRead = (categoryId, itemId) => {
    const progress = getReadingProgress();
    if (!progress[categoryId]) {
        progress[categoryId] = [];
    }
    if (!progress[categoryId].includes(itemId)) {
        progress[categoryId].push(itemId);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return progress;
};

export const isItemRead = (categoryId, itemId) => {
    const progress = getReadingProgress();
    return progress[categoryId]?.includes(itemId) || false;
};

export const getCategoryProgress = (categoryId, totalItems) => {
    const progress = getReadingProgress();
    const readCount = progress[categoryId]?.length || 0;
    return {
        read: readCount,
        total: totalItems,
        percentage: totalItems > 0 ? Math.round((readCount / totalItems) * 100) : 0
    };
};

export const getTotalReadCount = () => {
    const progress = getReadingProgress();
    return Object.values(progress).reduce((total, items) => total + items.length, 0);
};

// --- Recently Viewed ---

export const getRecentlyViewed = () => {
    try {
        const data = localStorage.getItem(RECENTLY_VIEWED_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const addToRecentlyViewed = (item) => {
    const recent = getRecentlyViewed();
    // Remove if already exists
    const filtered = recent.filter(r => r.id !== item.id);
    // Add to front
    filtered.unshift({
        id: item.id,
        title_kn: item.title_kn,
        title_en: item.title_en,
        categoryId: item.categoryId,
        type: item.type || 'samskruti',
        timestamp: Date.now()
    });
    // Keep only last 20
    const trimmed = filtered.slice(0, 20);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(trimmed));
    return trimmed;
};

// --- Japa Streak ---

export const getJapaStreak = () => {
    try {
        const data = localStorage.getItem(JAPA_STREAK_KEY);
        return data ? JSON.parse(data) : { currentStreak: 0, bestStreak: 0, lastDate: null, totalSessions: 0, totalCounts: 0 };
    } catch {
        return { currentStreak: 0, bestStreak: 0, lastDate: null, totalSessions: 0, totalCounts: 0 };
    }
};

export const updateJapaStreak = (count) => {
    const streak = getJapaStreak();
    const today = new Date().toDateString();

    if (streak.lastDate === today) {
        // Already updated today, just add counts
        streak.totalCounts += count;
    } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (streak.lastDate === yesterday.toDateString()) {
            streak.currentStreak += 1;
        } else {
            streak.currentStreak = 1;
        }

        streak.lastDate = today;
        streak.totalSessions += 1;
        streak.totalCounts += count;
    }

    if (streak.currentStreak > streak.bestStreak) {
        streak.bestStreak = streak.currentStreak;
    }

    localStorage.setItem(JAPA_STREAK_KEY, JSON.stringify(streak));
    return streak;
};

// --- App-wide Stats ---

export const getAppStats = () => {
    const progress = getReadingProgress();
    const recent = getRecentlyViewed();
    const japaStreak = getJapaStreak();
    const japaCount = parseInt(localStorage.getItem('japa_count') || '0', 10);
    const favorites = JSON.parse(localStorage.getItem('sanatana_favorites') || '[]');

    return {
        totalRead: getTotalReadCount(),
        recentCount: recent.length,
        japaCount,
        japaMalas: Math.floor(japaCount / 108),
        japaStreak: japaStreak.currentStreak,
        japaBestStreak: japaStreak.bestStreak,
        totalFavorites: favorites.length,
        categoriesExplored: Object.keys(progress).length,
    };
};
