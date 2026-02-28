import React, { useEffect, useState } from 'react';
import { X, Volume2, Sliders, Type } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Capacitor } from '@capacitor/core';

const SettingsDialog = ({ isOpen, onClose }) => {
    const { ttsSettings, updateTtsSettings, textSize, updateTextSize } = useSettings();
    const [availableVoices, setAvailableVoices] = useState([]);
    const isNative = Capacitor.isNativePlatform();

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                if (isNative) {
                    const result = await TextToSpeech.getSupportedVoices();
                    // Filter for Kannada and English voices primarily
                    const knVoices = result.voices.filter(v => v.lang.startsWith('kn') || v.lang.startsWith('en'));
                    setAvailableVoices(knVoices);
                } else if (window.speechSynthesis) {
                    const voices = window.speechSynthesis.getVoices();
                    const knVoices = voices.filter(v => v.lang.startsWith('kn') || v.lang.startsWith('en'));
                    setAvailableVoices(knVoices);
                }
            } catch (e) {
                console.warn("Failed to fetch voices", e);
            }
        };

        fetchVoices();
        if (!isNative && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = fetchVoices;
        }
    }, [isNative]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay animate-fade-in" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem'
        }}>
            <div className="modal-content glass animate-scale-up" style={{
                width: '100%', maxWidth: '450px', borderRadius: '24px',
                padding: '2rem', border: '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-dark)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Sliders size={20} color="var(--primary)" />
                        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Reading Settings</h2>
                    </div>
                    <button onClick={onClose} className="nav-icon-container" style={{ color: 'var(--text-secondary)' }}>
                        <X size={20} />
                    </button>
                </div>

                <div style={{ display: 'grid', gap: '2rem' }}>

                    {/* Text Size */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Type size={16} color="var(--text-secondary)" />
                                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Text Size</label>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            padding: '4px',
                            border: '1px solid var(--border-color)'
                        }}>
                            {['small', 'medium', 'large', 'xlarge'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => updateTextSize(size)}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem 0',
                                        background: textSize === size ? 'var(--primary)' : 'transparent',
                                        color: textSize === size ? '#000' : 'var(--text-primary)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: size === 'small' ? '0.8rem' : size === 'medium' ? '0.9rem' : size === 'large' ? '1rem' : '1.1rem',
                                        fontWeight: textSize === size ? 700 : 500,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    A
                                </button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Small</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Extra Large</span>
                        </div>
                    </div>
                    {/* Speech Speed */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Speech Speed</label>
                            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>{ttsSettings.rate}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="2.0"
                            step="0.1"
                            value={ttsSettings.rate}
                            onChange={(e) => updateTtsSettings({ rate: parseFloat(e.target.value) })}
                            style={{
                                width: '100%',
                                height: '6px',
                                borderRadius: '3px',
                                background: 'var(--border-color)',
                                accentColor: 'var(--primary)',
                                cursor: 'pointer'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Slower</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Faster</span>
                        </div>
                    </div>

                    {/* Voice Selection */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Voice Type
                        </label>
                        <select
                            className="glass"
                            value={ttsSettings.voice}
                            onChange={(e) => updateTtsSettings({ voice: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-color)',
                                fontSize: '0.95rem',
                                outline: 'none'
                            }}
                        >
                            <option value="default">System Default</option>
                            {availableVoices.map((v, i) => (
                                <option key={i} value={v.name || v.voiceURI}>
                                    {v.name} ({v.lang})
                                </option>
                            ))}
                        </select>
                        <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                            Note: Voice availability depends on your device's installed speech engines (like Google TTS).
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="btn primary"
                    style={{ width: '100%', marginTop: '2.5rem', padding: '1.25rem', borderRadius: '16px' }}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default SettingsDialog;
