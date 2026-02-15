import React, { useState, useEffect } from 'react';
import { Volume2, Square, Pause, Play, AlertCircle } from 'lucide-react';

const TTSButton = ({ text, lang = 'kn-IN', label = 'Read' }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [utterance, setUtterance] = useState(null);
    const [voices, setVoices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!window.speechSynthesis) return;

        const loadVoices = () => {
            try {
                const availableVoices = window.speechSynthesis.getVoices();
                if (availableVoices && availableVoices.length > 0) {
                    setVoices(availableVoices);
                }
            } catch (e) {
                console.warn("Error loading voices:", e);
            }
        };

        loadVoices();

        // Chrome/Android loads voices asynchronously
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            if (isSpeaking && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, [isSpeaking]);

    const handlePlay = () => {
        setError(null);

        if (!window.speechSynthesis) {
            setError("TTS not supported on this device");
            return;
        }

        if (isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
            setIsSpeaking(true);
            return;
        }

        if (isSpeaking) {
            window.speechSynthesis.pause();
            setIsPaused(true);
            setIsSpeaking(false);
            return;
        }

        if (!text) {
            setError("No text to read");
            return;
        }

        // Create utterance
        const newUtterance = new SpeechSynthesisUtterance(text);
        newUtterance.rate = 0.9;
        newUtterance.pitch = 1.0;

        // Try to find a matching voice
        let selectedVoice = null;

        // 1. Try exact match (e.g., kn-IN)
        selectedVoice = voices.find(v => v.lang === lang);

        // 2. Try partial match in lang code (e.g., just 'kn' or 'kannada')
        if (!selectedVoice) {
            const shortLang = lang.split('-')[0];
            selectedVoice = voices.find(v => v.lang.startsWith(shortLang));
        }

        // 3. Try to find voice by name if lang match failed (e.g. "Google Kannada", "Microsoft Kannada")
        if (!selectedVoice && lang.startsWith('kn')) {
            selectedVoice = voices.find(v => v.name.toLowerCase().includes('kannada'));
        }

        // 4. Last resort: Try Hindi or other Indian languages that support Devanagari/similar scripts well
        if (!selectedVoice && lang.startsWith('kn')) {
            selectedVoice = voices.find(v => v.lang === 'hi-IN' || v.lang === 'ta-IN' || v.lang === 'te-IN');
        }

        if (selectedVoice) {
            console.log("TTS: Selected voice:", selectedVoice.name, selectedVoice.lang);
            newUtterance.voice = selectedVoice;
            newUtterance.lang = selectedVoice.lang;
        } else {
            console.warn("TTS: No specific voice found for language", lang, ". Using system default.");
            // Forcefully set the lang to requested lang (e.g. kn-IN) so the OS tries to match it
            newUtterance.lang = lang;
        }

        newUtterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            setUtterance(null);
        };

        newUtterance.onerror = (e) => {
            console.error("TTS Error event:", e);
            setIsSpeaking(false);
            setIsPaused(false);
            setUtterance(null);

            // Ignore interruption errors (happens when we cancel or stop manually)
            if (e.error === 'interrupted' || e.error === 'canceled') {
                return;
            }

            if (e.error === 'not-allowed') {
                setError("Playback not allowed");
            } else {
                setError("Playback error"); // Simpler message
            }
        };

        setUtterance(newUtterance);
        try {
            window.speechSynthesis.cancel(); // Safety cancel
            window.speechSynthesis.speak(newUtterance);
            setIsSpeaking(true);
        } catch (e) {
            console.error("Speak error:", e);
            setError("Speech error");
            setIsSpeaking(false);
        }
    };

    const handleStop = (e) => {
        e?.stopPropagation();
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
        setIsPaused(false);
        setUtterance(null);
    };

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <button
                onClick={handlePlay}
                className="btn"
                style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: 'auto',
                    minWidth: '140px',
                    justifyContent: 'center',
                    background: isSpeaking ? 'var(--primary)' : 'var(--surface-color)',
                    color: isSpeaking ? '#000' : 'var(--primary)',
                    border: '1px solid var(--primary)',
                    borderRadius: '50px' // Pill shape
                }}
            >
                {isSpeaking ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                {isSpeaking ? 'Pause' : label}
            </button>

            {(isSpeaking || isPaused) && (
                <button
                    onClick={handleStop}
                    style={{
                        background: 'rgba(255, 75, 75, 0.1)',
                        border: '1px solid var(--danger)',
                        color: 'var(--danger)',
                        borderRadius: '50%',
                        width: '42px',
                        height: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    title="Stop"
                >
                    <Square size={18} fill="currentColor" />
                </button>
            )}

            {error && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{error}</span>}
        </div>
    );
};

export default TTSButton;
