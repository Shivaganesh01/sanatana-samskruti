import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Square, Pause, Play, AlertCircle } from 'lucide-react';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Capacitor } from '@capacitor/core';

import { useSettings } from '../context/SettingsContext';

const TTSButton = ({ text, lang = 'kn-IN', label = 'Read' }) => {
    const { ttsSettings } = useSettings();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voices, setVoices] = useState([]);
    const [error, setError] = useState(null);
    const isNative = Capacitor.isNativePlatform();
    const stopRef = useRef(false);
    const utteranceRef = useRef(null);

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
            stopRef.current = true;
            if (isNative) {
                TextToSpeech.stop().catch(() => { });
            } else if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const cleanTextForTTS = (input) => {
        if (!input) return "";
        return input
            // Remove verse numbers like ॥ 1 ॥, || 1 ||, ॥ ೧ ॥, || ೧ ||, (1), 1.
            .replace(/[॥\|]{1,2}\s*[\d೧-೯೦]+\s*[॥\|]{1,2}/g, ' ')
            .replace(/\(\d+\)/g, ' ')
            .replace(/\b\d+\./g, ' ')
            // Remove the ornamental symbols but keep basic punctuation for splitting
            .replace(/[॥\|]/g, '.')
            // Clean up extra spaces
            .replace(/\s+/g, ' ')
            .trim();
    };

    const chunkText = (input, maxLen = 3000) => {
        const cleaned = cleanTextForTTS(input);
        if (!cleaned) return [];

        // Split by major punctuation while keeping the punctuation
        const segments = cleaned.split(/([.\n!?;]+)/);
        const chunks = [];
        let current = "";

        for (const part of segments) {
            if ((current + part).length > maxLen) {
                if (current.trim()) chunks.push(current.trim());
                current = part;
            } else {
                current += part;
            }
        }
        if (current.trim()) chunks.push(current.trim());
        return chunks.filter(c => c.length > 2); // Avoid tiny slivers
    };

    const handlePlay = async () => {
        setError(null);
        if (!text) {
            setError("No text to read");
            return;
        }

        if (isSpeaking) {
            await handleStop();
            return;
        }

        stopRef.current = false;
        setIsSpeaking(true);

        // --- SHORT TEXT OPTIMIZATION ---
        const isShort = text.length < 500;
        let chunks = [];

        if (isShort) {
            // For short text, try to read mostly as-is but clean a bit
            const cleaned = cleanTextForTTS(text);
            chunks = [cleaned || text];
        } else {
            chunks = chunkText(text);
        }

        if (chunks.length === 0 || (chunks.length === 1 && !chunks[0])) {
            setError("Text content empty");
            setIsSpeaking(false);
            return;
        }

        if (isNative) {
            // --- NATIVE ANDROID/IOS PATH ---
            try {
                let voiceIndex = undefined;
                let activeLang = lang;

                if (ttsSettings?.voice && ttsSettings.voice !== 'default') {
                    try {
                        const result = await TextToSpeech.getSupportedVoices();
                        const index = result.voices.findIndex(v => v.name === ttsSettings.voice || v.voiceURI === ttsSettings.voice);
                        // Only use if lang matches roughly or we trust the user selection
                        if (index !== -1) {
                            voiceIndex = index;
                            activeLang = result.voices[index].lang;
                        }
                    } catch (err) {
                        console.warn("Failed to set custom voice index", err);
                    }
                }

                for (const chunk of chunks) {
                    if (stopRef.current) break;
                    try {
                        await TextToSpeech.speak({
                            text: chunk,
                            lang: activeLang,
                            rate: ttsSettings?.rate || 1.0,
                            pitch: 1.0,
                            volume: 1.0,
                            voice: voiceIndex,
                            category: 'ambient',
                        });
                    } catch (speakErr) {
                        console.warn("Skipping chunk due to error:", speakErr);
                    }
                }
            } catch (e) {
                console.error("Native TTS Error:", e);
                setError(`Playback error: ${e.message || 'Unknown'}`);
            } finally {
                if (!stopRef.current) setIsSpeaking(false);
            }
        } else {
            // --- WEB FALLBACK PATH ---
            if (!window.speechSynthesis) {
                setError("TTS not supported");
                setIsSpeaking(false);
                return;
            }

            window.speechSynthesis.cancel();

            // Reload voices if needed
            let currentVoices = window.speechSynthesis.getVoices();
            if (currentVoices.length === 0) {
                // Try to force load
                currentVoices = window.speechSynthesis.getVoices();
            }

            let chunkIndex = 0;

            const playNextChunk = () => {
                if (stopRef.current || chunkIndex >= chunks.length) {
                    setIsSpeaking(false);
                    utteranceRef.current = null;
                    return;
                }

                const chunk = chunks[chunkIndex];
                const utterance = new SpeechSynthesisUtterance(chunk);
                utteranceRef.current = utterance; // Prevent GC

                utterance.lang = lang;
                const rateVal = parseFloat(ttsSettings?.rate);
                utterance.rate = Number.isFinite(rateVal) ? rateVal : 1.0;

                // Voice selection
                if (ttsSettings?.voice && ttsSettings.voice !== 'default') {
                    const preciseMatch = currentVoices.find(v => v.name === ttsSettings.voice || v.voiceURI === ttsSettings.voice);
                    if (preciseMatch) utterance.voice = preciseMatch;
                }

                // Fallback voice
                if (!utterance.voice) {
                    const langMatch = currentVoices.find(v => v.lang === lang) ||
                        currentVoices.find(v => v.lang.startsWith(lang.split('-')[0]));
                    if (langMatch) utterance.voice = langMatch;
                }

                utterance.onend = () => {
                    chunkIndex++;
                    playNextChunk();
                };

                utterance.onerror = (e) => {
                    console.error("Utterance error", e);
                    if (e.error !== 'interrupted' && e.error !== 'canceled') {
                        // Move to next chunk despite error
                        chunkIndex++;
                        playNextChunk();
                    } else {
                        setIsSpeaking(false);
                    }
                };

                try {
                    window.speechSynthesis.speak(utterance);
                } catch (e) {
                    console.error("Speak execution failed", e);
                    setIsSpeaking(false);
                }
            };

            // Start the sequence
            playNextChunk();
        }
    };

    const handleStop = async (e) => {
        e?.stopPropagation();
        stopRef.current = true;
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
