import React, { useState, useEffect } from 'react';
import { Volume2, Square, Pause, Play, AlertCircle } from 'lucide-react';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Capacitor } from '@capacitor/core';

const TTSButton = ({ text, lang = 'kn-IN', label = 'Read' }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voices, setVoices] = useState([]);
    const [error, setError] = useState(null);
    const isNative = Capacitor.isNativePlatform();

    useEffect(() => {
        if (!isNative && window.speechSynthesis) {
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
            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = loadVoices;
            }
        }

        return () => {
            handleStop();
        };
    }, []);

    const handlePlay = async () => {
        setError(null);
        if (!text) {
            setError("No text to read");
            return;
        }

        if (isNative) {
            // --- NATIVE ANDROID/IOS PATH ---
            try {
                if (isSpeaking) {
                    await TextToSpeech.stop();
                    setIsSpeaking(false);
                    return;
                }

                setIsSpeaking(true);
                await TextToSpeech.speak({
                    text: text,
                    lang: lang,
                    rate: 1.0,
                    pitch: 1.0,
                    volume: 1.0,
                    category: 'ambient',
                });
                setIsSpeaking(false);
            } catch (e) {
                console.error("Native TTS Error:", e);
                setError("TTS error");
                setIsSpeaking(false);
            }
        } else {
            // --- WEB FALLBACK PATH ---
            if (!window.speechSynthesis) {
                setError("TTS not supported");
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

            const newUtterance = new SpeechSynthesisUtterance(text);
            newUtterance.rate = 0.9;
            newUtterance.lang = lang;

            // Try to find a matching voice
            const selectedVoice = voices.find(v => v.lang === lang) ||
                voices.find(v => v.lang.startsWith(lang.split('-')[0])) ||
                voices.find(v => v.name.toLowerCase().includes('kannada'));

            if (selectedVoice) newUtterance.voice = selectedVoice;

            newUtterance.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
            };

            newUtterance.onerror = (e) => {
                if (e.error !== 'interrupted') setError("Playback error");
                setIsSpeaking(false);
                setIsPaused(false);
            };

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(newUtterance);
            setIsSpeaking(true);
        }
    };

    const handleStop = async (e) => {
        e?.stopPropagation();
        try {
            if (isNative) {
                await TextToSpeech.stop();
            } else if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        } catch (e) {
            console.warn("Stop error:", e);
        }
        setIsSpeaking(false);
        setIsPaused(false);
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
