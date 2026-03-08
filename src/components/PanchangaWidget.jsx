import { useState } from 'react';
import { Calendar, Moon, Sun, Sunrise, Clock, Star, ChevronDown, ChevronUp } from 'lucide-react';

const TITHIS_KN = [
    'ಪ್ರತಿಪದ', 'ದ್ವಿತೀಯ', 'ತೃತೀಯ', 'ಚತುರ್ಥಿ', 'ಪಂಚಮಿ',
    'ಷಷ್ಠಿ', 'ಸಪ್ತಮಿ', 'ಅಷ್ಟಮಿ', 'ನವಮಿ', 'ದಶಮಿ',
    'ಏಕಾದಶಿ', 'ದ್ವಾದಶಿ', 'ತ್ರಯೋದಶಿ', 'ಚತುರ್ದಶಿ'
];

const TITHIS_EN = [
    'Pratipada', 'Dvitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dvadashi', 'Trayodashi', 'Chaturdashi'
];

const NAKSHATRAS = [
    'ಅಶ್ವಿನಿ', 'ಭರಣಿ', 'ಕೃತ್ತಿಕಾ', 'ರೋಹಿಣಿ', 'ಮೃಗಶಿರಾ',
    'ಆರ್ದ್ರಾ', 'ಪುನರ್ವಸು', 'ಪುಷ್ಯ', 'ಆಶ್ಲೇಷಾ', 'ಮಘಾ',
    'ಪೂರ್ವ ಫಾಲ್ಗುಣಿ', 'ಉತ್ತರ ಫಾಲ್ಗುಣಿ', 'ಹಸ್ತ', 'ಚಿತ್ರಾ',
    'ಸ್ವಾತಿ', 'ವಿಶಾಖಾ', 'ಅನುರಾಧಾ', 'ಜ್ಯೇಷ್ಠಾ', 'ಮೂಲ',
    'ಪೂರ್ವಾಷಾಢ', 'ಉತ್ತರಾಷಾಢ', 'ಶ್ರವಣ', 'ಧನಿಷ್ಠಾ',
    'ಶತಭಿಷಾ', 'ಪೂರ್ವಾ ಭಾದ್ರಪದ', 'ಉತ್ತರಾ ಭಾದ್ರಪದ', 'ರೇವತಿ'
];

const VARAS = [
    { kn: 'ಭಾನುವಾರ', en: 'Sunday', deity: 'ಸೂರ್ಯ (Surya)', color: '#FF6B35', mantra: 'ಓಂ ಸೂರ್ಯಾಯ ನಮಃ' },
    { kn: 'ಸೋಮವಾರ', en: 'Monday', deity: 'ಚಂದ್ರ (Chandra)', color: '#C0C0C0', mantra: 'ಓಂ ನಮಃ ಶಿವಾಯ' },
    { kn: 'ಮಂಗಳವಾರ', en: 'Tuesday', deity: 'ಮಂಗಳ (Mangala)', color: '#FF4B4B', mantra: 'ಓಂ ಹನುಮತೇ ನಮಃ' },
    { kn: 'ಬುಧವಾರ', en: 'Wednesday', deity: 'ಬುಧ (Budha)', color: '#34C759', mantra: 'ಓಂ ಗಂ ಗಣಪತಯೇ ನಮಃ' },
    { kn: 'ಗುರುವಾರ', en: 'Thursday', deity: 'ಬೃಹಸ್ಪತಿ (Brihaspati)', color: '#FFD700', mantra: 'ಓಂ ಗುರವೇ ನಮಃ' },
    { kn: 'ಶುಕ್ರವಾರ', en: 'Friday', deity: 'ಶುಕ್ರ (Shukra)', color: '#FF69B4', mantra: 'ಓಂ ಶ್ರೀ ಮಹಾಲಕ್ಷ್ಮ್ಯೈ ನಮಃ' },
    { kn: 'ಶನಿವಾರ', en: 'Saturday', deity: 'ಶನಿ (Shani)', color: '#7B68EE', mantra: 'ಓಂ ಶಂ ಶನೈಶ್ಚರಾಯ ನಮಃ' }
];

const MONTHS_KN = [
    'ಚೈತ್ರ', 'ವೈಶಾಖ', 'ಜ್ಯೇಷ್ಠ', 'ಆಷಾಢ',
    'ಶ್ರಾವಣ', 'ಭಾದ್ರಪದ', 'ಆಶ್ವಿನ', 'ಕಾರ್ತಿಕ',
    'ಮಾರ್ಗಶಿರ', 'ಪುಷ್ಯ', 'ಮಾಘ', 'ಫಾಲ್ಗುಣ'
];

const YOGAS = [
    'ವಿಷ್ಕಂಭ', 'ಪ್ರೀತಿ', 'ಆಯುಷ್ಮಾನ್', 'ಸೌಭಾಗ್ಯ', 'ಶೋಭನ',
    'ಅತಿಗಂಡ', 'ಸುಕರ್ಮ', 'ಧೃತಿ', 'ಶೂಲ', 'ಗಂಡ',
    'ವೃಧ್ಧಿ', 'ಧ್ರುವ', 'ವ್ಯಘಾತ', 'ಹರ್ಷಣ', 'ವಜ್ರ',
    'ಸಿದ್ಧಿ', 'ವ್ಯತೀಪಾತ', 'ವರೀಯಾನ', 'ಪರಿಘ', 'ಶಿವ',
    'ಸಿದ್ಧ', 'ಸಾಧ್ಯ', 'ಶುಭ', 'ಶುಕ್ಲ', 'ಬ್ರಹ್ಮ',
    'ಐಂದ್ರ', 'ವೈಧೃತಿ'
];

const KARANAS = [
    'ಬವ', 'ಬಾಲವ', 'ಕೌಲವ', 'ತೈತಿಲ', 'ಗರ',
    'ವಣಿಜ', 'ವಿಷ್ಟಿ', 'ಶಕುನಿ', 'ಚತುಷ್ಪದ', 'ನಾಗ', 'ಕಿಂಸ್ತುಘ್ನ'
];

// Rahu Kala times (standard for each day of the week)
const RAHU_KALA = [
    '4:30 - 6:00 PM',   // Sunday
    '7:30 - 9:00 AM',   // Monday
    '3:00 - 4:30 PM',   // Tuesday
    '12:00 - 1:30 PM',  // Wednesday
    '1:30 - 3:00 PM',   // Thursday
    '10:30 - 12:00 PM', // Friday
    '9:00 - 10:30 AM'   // Saturday
];

const GULIKA_KALA = [
    '3:00 - 4:30 PM',   // Sunday
    '1:30 - 3:00 PM',   // Monday
    '12:00 - 1:30 PM',  // Tuesday
    '10:30 - 12:00 PM', // Wednesday
    '9:00 - 10:30 AM',  // Thursday
    '7:30 - 9:00 AM',   // Friday
    '6:00 - 7:30 AM'    // Saturday
];

// Known new moon reference: January 29, 2025 was Amavasya
const KNOWN_NEW_MOON = new Date(2025, 0, 29); // Jan 29, 2025
const SYNODIC_MONTH = 29.530588853; // days
const SIDEREAL_MONTH = 27.321661; // days for nakshatra cycle

/**
 * Calculate lunar day (tithi) based on actual moon phase
 */
const getLunarDay = (date) => {
    const msPerDay = 86400000;
    const daysSinceNewMoon = (date.getTime() - KNOWN_NEW_MOON.getTime()) / msPerDay;
    // Each tithi = synodic month / 30
    const tithiDuration = SYNODIC_MONTH / 30;
    const lunarDay = ((daysSinceNewMoon % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
    const tithiNum = Math.floor(lunarDay / tithiDuration); // 0-29
    return tithiNum;
};

/**
 * Calculate nakshatra based on sidereal month
 */
const getNakshatra = (date) => {
    const msPerDay = 86400000;
    // Reference: Jan 1, 2025 was approximately in Punarvasu nakshatra
    const ref = new Date(2025, 0, 1);
    const daysSinceRef = (date.getTime() - ref.getTime()) / msPerDay;
    const nakshatraDuration = SIDEREAL_MONTH / 27;
    const refNakshatraIndex = 6; // Punarvasu
    const index = Math.floor(((daysSinceRef / nakshatraDuration) + refNakshatraIndex) % 27);
    return (index + 27) % 27;
};

const getPanchangaForDate = (date) => {
    const dayOfWeek = date.getDay();
    const vara = VARAS[dayOfWeek];

    // Tithi calculation
    const tithiNum = getLunarDay(date); // 0-29
    const isShukla = tithiNum < 15;
    const paksha = isShukla ? 'ಶುಕ್ಲ ಪಕ್ಷ' : 'ಕೃಷ್ಣ ಪಕ್ಷ';
    const pakshaEn = isShukla ? 'Shukla Paksha' : 'Krishna Paksha';

    let tithiIndex = tithiNum % 15;
    let tithiKn, tithiEn;
    if (tithiIndex < 14) {
        tithiKn = TITHIS_KN[tithiIndex];
        tithiEn = TITHIS_EN[tithiIndex];
    } else {
        // 14th of each paksha is special
        tithiKn = isShukla ? 'ಪೂರ್ಣಿಮಾ' : 'ಅಮಾವಾಸ್ಯೆ';
        tithiEn = isShukla ? 'Purnima' : 'Amavasya';
    }

    // Nakshatra
    const nakshatraIndex = getNakshatra(date);
    const nakshatra = NAKSHATRAS[nakshatraIndex];

    // Hindu month (approximate: Chaitra starts around mid-March)
    // More accurate: based on the solar month
    const month = date.getMonth(); // 0-11
    const day = date.getDate();
    let hinduMonthIndex;
    if (month === 2 && day >= 15 || month === 3 && day <= 14) hinduMonthIndex = 0; // Chaitra
    else if (month === 3 && day >= 15 || month === 4 && day <= 14) hinduMonthIndex = 1; // Vaishakha
    else if (month === 4 && day >= 15 || month === 5 && day <= 14) hinduMonthIndex = 2; // Jyeshtha
    else if (month === 5 && day >= 15 || month === 6 && day <= 14) hinduMonthIndex = 3; // Ashadha
    else if (month === 6 && day >= 15 || month === 7 && day <= 14) hinduMonthIndex = 4; // Shravana
    else if (month === 7 && day >= 15 || month === 8 && day <= 14) hinduMonthIndex = 5; // Bhadrapada
    else if (month === 8 && day >= 15 || month === 9 && day <= 14) hinduMonthIndex = 6; // Ashvina
    else if (month === 9 && day >= 15 || month === 10 && day <= 14) hinduMonthIndex = 7; // Kartika
    else if (month === 10 && day >= 15 || month === 11 && day <= 14) hinduMonthIndex = 8; // Margashira
    else if (month === 11 && day >= 15 || month === 0 && day <= 14) hinduMonthIndex = 9; // Pushya
    else if (month === 0 && day >= 15 || month === 1 && day <= 14) hinduMonthIndex = 10; // Magha
    else hinduMonthIndex = 11; // Phalguna

    const hinduMonth = MONTHS_KN[hinduMonthIndex];

    // Yoga (based on sun+moon longitude sum, approx)
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const yogaIndex = (tithiNum + nakshatraIndex) % YOGAS.length;
    const yoga = YOGAS[yogaIndex];

    // Karana
    const karanaIndex = (tithiNum * 2) % KARANAS.length;
    const karana = KARANAS[karanaIndex];

    // Rahu Kala & Gulika
    const rahuKala = RAHU_KALA[dayOfWeek];
    const gulikaKala = GULIKA_KALA[dayOfWeek];

    // Samvatsara (60-year cycle) - approximate
    const samvatsaras = ['ಪ್ರಭವ', 'ವಿಭವ', 'ಶುಕ್ಲ', 'ಪ್ರಮೋದೂತ', 'ಪ್ರಜೋತ್ಪತ್ತಿ', 'ಆಂಗೀರಸ', 'ಶ್ರೀಮುಖ', 'ಭಾವ', 'ಯುವ', 'ಧಾತು',
        'ಈಶ್ವರ', 'ಬಹುಧಾನ್ಯ', 'ಪ್ರಮಾಥಿ', 'ವಿಕ್ರಮ', 'ವೃಷ', 'ಚಿತ್ರಭಾನು', 'ಸ್ವಭಾನು', 'ತಾರಣ', 'ಪಾರ್ಥಿವ', 'ವ್ಯಯ',
        'ಸರ್ವಜಿತ್', 'ಸರ್ವಧಾರಿ', 'ವಿರೋಧಿ', 'ವಿಕೃತಿ', 'ಖರ', 'ನಂದನ', 'ವಿಜಯ', 'ಜಯ', 'ಮನ್ಮಥ', 'ದುರ್ಮುಖಿ',
        'ಹೇವಿಳಂಬಿ', 'ವಿಳಂಬಿ', 'ವಿಕಾರಿ', 'ಶಾರ್ವರಿ', 'ಪ್ಲವ', 'ಶುಭಕೃತ್', 'ಶೋಭಕೃತ್', 'ಕ್ರೋಧಿ', 'ವಿಶ್ವಾವಸು', 'ಪರಾಭವ',
        'ಪ್ಲವಂಗ', 'ಕೀಲಕ', 'ಸೌಮ್ಯ', 'ಸಾಧಾರಣ', 'ವಿರೋಧಿಕೃತ್', 'ಪರಿಧಾವಿ', 'ಪ್ರಮಾದೀಚ', 'ಆನಂದ', 'ರಾಕ್ಷಸ', 'ನಳ',
        'ಪಿಂಗಳ', 'ಕಾಲಯುಕ್ತಿ', 'ಸಿದ್ಧಾರ್ಥಿ', 'ರೌದ್ರಿ', 'ದುರ್ಮತಿ', 'ದುಂದುಭಿ', 'ರುಧಿರೋದ್ಗಾರಿ', 'ರಕ್ತಾಕ್ಷಿ', 'ಕ್ರೋಧನ', 'ಅಕ್ಷಯ'];
    // Year 2000 is Prabhava (index 0 approximately)
    const samvatsaraIndex = ((date.getFullYear() - 2000 + 17) % 60 + 60) % 60;
    const samvatsara = samvatsaras[samvatsaraIndex] || 'ಶೋಭಕೃತ್';

    return {
        vara, tithiKn, tithiEn, paksha, pakshaEn,
        nakshatra, hinduMonth, yoga, karana,
        rahuKala, gulikaKala, samvatsara
    };
};

const PanchangaWidget = () => {
    const [expanded, setExpanded] = useState(false);
    const today = new Date();
    const panchanga = getPanchangaForDate(today);

    // Format today's date in Kannada format
    const dateFormatKn = today.toLocaleDateString('kn-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const dateFormatEn = today.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div
            className="card glass"
            style={{
                marginBottom: '1.5rem',
                padding: '1.25rem',
                border: `1px solid ${panchanga.vara.color}30`,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            }}
            onClick={() => setExpanded(!expanded)}
        >
            {/* Header with today's date */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: expanded ? '1rem' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        background: `${panchanga.vara.color}20`,
                        width: '48px', height: '48px', borderRadius: '14px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: panchanga.vara.color, lineHeight: 1 }}>
                            {today.getDate()}
                        </span>
                        <span style={{ fontSize: '0.5rem', color: panchanga.vara.color, textTransform: 'uppercase', fontWeight: 600 }}>
                            {today.toLocaleDateString('en', { month: 'short' })}
                        </span>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>
                            ಇಂದಿನ ಪಂಚಾಂಗ • {dateFormatEn}
                        </div>
                        <div style={{ fontWeight: 600, color: panchanga.vara.color, fontSize: '1.05rem' }}>
                            {panchanga.vara.kn} • {panchanga.paksha} {panchanga.tithiKn}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '1px' }}>
                            {panchanga.hinduMonth} ಮಾಸ • {panchanga.nakshatra} ನಕ್ಷತ್ರ
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                    {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
            </div>

            {/* Expanded Content */}
            {expanded && (
                <div className="animate-fade-in" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    {/* Samvatsara */}
                    <div style={{
                        textAlign: 'center', marginBottom: '1rem',
                        padding: '0.5rem', background: 'rgba(255,215,0,0.05)',
                        borderRadius: '10px'
                    }}>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            ಸಂವತ್ಸರ:
                        </span>
                        <span style={{ fontSize: '0.9rem', color: '#FFD700', fontWeight: 600, marginLeft: '0.5rem' }}>
                            {panchanga.samvatsara}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <InfoRow icon={<Moon size={13} />} label="ತಿಥಿ (Tithi)" value={`${panchanga.paksha} ${panchanga.tithiKn}`} subvalue={`${panchanga.pakshaEn} ${panchanga.tithiEn}`} color="#C0C0C0" />
                        <InfoRow icon={<Star size={13} />} label="ನಕ್ಷತ್ರ (Star)" value={panchanga.nakshatra} color="#FFD700" />
                        <InfoRow icon={<Calendar size={13} />} label="ಮಾಸ (Month)" value={panchanga.hinduMonth} color="#34C759" />
                        <InfoRow icon={<Sunrise size={13} />} label="ಯೋಗ (Yoga)" value={panchanga.yoga} color="#AF52DE" />
                        <InfoRow icon={<Sun size={13} />} label="ಕರಣ (Karana)" value={panchanga.karana} color="#FF9933" />
                        <InfoRow icon={<Clock size={13} />} label="ರಾಹು ಕಾಲ" value={panchanga.rahuKala} color="#FF4B4B" />
                    </div>

                    {/* Gulika Kala */}
                    <div style={{
                        marginTop: '0.75rem',
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(255,75,75,0.05)',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                            ⚠️ ಗುಳಿಕ ಕಾಲ:
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#FF4B4B', fontWeight: 600 }}>
                            {panchanga.gulikaKala}
                        </span>
                    </div>

                    {/* Deity and Mantra */}
                    <div style={{
                        marginTop: '0.75rem',
                        padding: '0.75rem',
                        background: `${panchanga.vara.color}08`,
                        borderRadius: '10px',
                        border: `1px solid ${panchanga.vara.color}15`
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                ಇಂದಿನ ಅಧಿದೇವತೆ:
                            </span>
                            <span style={{ color: panchanga.vara.color, fontWeight: 600, fontSize: '0.85rem' }}>
                                {panchanga.vara.deity}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                ಇಂದಿನ ಮಂತ್ರ:
                            </span>
                            <span style={{ color: panchanga.vara.color, fontWeight: 500, fontSize: '0.8rem', fontStyle: 'italic' }}>
                                {panchanga.vara.mantra}
                            </span>
                        </div>
                    </div>

                    {/* Note */}
                    <p style={{
                        fontSize: '0.6rem', color: 'var(--text-secondary)',
                        opacity: 0.5, textAlign: 'center', margin: '0.75rem 0 0',
                        fontStyle: 'italic'
                    }}>
                        * ಪಂಚಾಂಗದ ಅಂದಾಜು ಲೆಕ್ಕಾಚಾರ. ನಿಖರ ಮಾಹಿತಿಗೆ ಸ್ಥಳೀಯ ಪಂಚಾಂಗ ನೋಡಿ.
                    </p>
                </div>
            )}
        </div>
    );
};

const InfoRow = ({ icon, label, value, subvalue, color }) => (
    <div style={{
        padding: '0.5rem 0.6rem',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.04)'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <span style={{ color }}>{icon}</span>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.3 }}>{value}</div>
        {subvalue && <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '1px' }}>{subvalue}</div>}
    </div>
);

export default PanchangaWidget;
