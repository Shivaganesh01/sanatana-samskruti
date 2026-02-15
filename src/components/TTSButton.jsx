import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Square, Pause, Play, AlertCircle } from 'lucide-react';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Capacitor } from '@capacitor/core';

const TTSButton = ({ text, lang = 'kn-IN', label = 'Read' }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voices, setVoices] = useState([]);
    const [error, setError] = useState(null);
    const isNative = Capacitor.isNativePlatform();
    const stopRef = useRef(false);

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
            // Remove verse numbers like ॥ 1 ॥, || 1 ||, ॥ ೧ ॥, || ೧ ||
            .replace(/[॥\|]{1,2}\s*[\d೧-೯೦]+\s*[॥\|]{1,2}/g, '')
            // Remove standalone numbers at the end of lines or segments (often used for verse counts)
            .replace(/\s+[\d೧-೯೦]+\s+$/gm, '')
            // Remove the symbols themselves if they appear standalone
            .replace(/[॥\|]/g, ' ')
            // Clean up extra spaces
            .replace(/\s+/g, ' ')
            .trim();
    };

    const chunkText = (input, maxLen = 3000) => {
        const cleaned = cleanTextForTTS(input);
        if (!cleaned) return [];
        // Split by sentences or line breaks to keep it natural
        const segments = cleaned.split(/([.\n!?;]+)/);
        const chunks = [];
        let current = "";

        for (const part of segments) {
            if ((current + part).length > maxLen) {
                if (current) chunks.push(current.trim());
                current = part;
            } else {
                current += part;
            }
        }
        if (current) chunks.push(current.trim());
        return chunks.filter(c => c.length > 0);
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
        const chunks = chunkText(text);

        if (isNative) {
            // --- NATIVE ANDROID/IOS PATH ---
            try {
                for (const chunk of chunks) {
                    if (stopRef.current) break;
                    await TextToSpeech.speak({
                        text: chunk,
                        lang: lang,
                        rate: 1.0,
                        pitch: 1.0,
                        volume: 1.0,
                        category: 'ambient',
                    });
                }
            } catch (e) {
                console.error("Native TTS Error:", e);
                setError("TTS error");
            } finally {
                setIsSpeaking(false);
            }
        } else {
            // --- WEB FALLBACK PATH ---
            if (!window.speechSynthesis) {
                setError("TTS not supported");
                setIsSpeaking(false);
                return;
            }

            if (isPaused) {
                window.speechSynthesis.resume();
                setIsPaused(false);
                setIsSpeaking(true);
                return;
            }

            // Web Speech API prefers chunks too for stability
            let chunkIndex = 0;
            const playNextWebChunk = () => {
                if (stopRef.current || chunkIndex >= chunks.length) {
                    setIsSpeaking(false);
                    return;
                }

                const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
                utterance.lang = lang;
                utterance.rate = 0.9;

                const selectedVoice = voices.find(v => v.lang === lang) ||
                    voices.find(v => v.lang.startsWith(lang.split('-')[0])) ||
                    voices.find(v => v.name.toLowerCase().includes('kannada'));
                if (selectedVoice) utterance.voice = selectedVoice;

                utterance.onend = () => {
                    chunkIndex++;
                    playNextWebChunk();
                };

                utterance.onerror = (e) => {
                    if (e.error !== 'interrupted') setError("Playback error");
                    setIsSpeaking(false);
                };

                window.speechSynthesis.speak(utterance);
            };

            window.speechSynthesis.cancel();
            playNextWebChunk();
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
