import { useEffect, useState, useRef } from 'react';

const ChakraVisualizer = ({ chakras, activeChakra, onChakraSelect }) => {
    // Generate an abstract SVG human silhouette for the chakras to sit on
    return (
        <div style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0'
        }}>
            {/* Ethereal background aura */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120px',
                height: '80%',
                background: 'linear-gradient(to top, rgba(255, 59, 48, 0.1), rgba(255, 149, 0, 0.1), rgba(255, 204, 0, 0.1), rgba(52, 199, 89, 0.1), rgba(0, 199, 190, 0.1), rgba(175, 82, 222, 0.1), rgba(255, 255, 255, 0.1))',
                borderRadius: '50px',
                filter: 'blur(20px)',
                zIndex: 0
            }} />

            <svg viewBox="0 0 100 400" preserveAspectRatio="xMidYMid meet" style={{ height: '100%', width: '100px', zIndex: 1 }}>
                {/* Silhouette or minimal vertical line representing the spine/Sushumna Nadi */}
                <path d="M 50 20 Q 20 60, 40 100 T 50 180 T 40 260 T 50 340 T 40 380" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeLinecap="round" />
                <path d="M 50 20 Q 80 60, 60 100 T 50 180 T 60 260 T 50 340 T 60 380" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeLinecap="round" />
                <line x1="50" y1="20" x2="50" y2="380" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="4 4" />

                {/* Ida and Pingala nadis (Subtle representation) */}
                <path d="M 50 380 Q 20 290, 50 200 Q 80 110, 50 20" fill="none" stroke="rgba(175, 82, 222, 0.2)" strokeWidth="1" />
                <path d="M 50 380 Q 80 290, 50 200 Q 20 110, 50 20" fill="none" stroke="rgba(255, 204, 0, 0.2)" strokeWidth="1" />
            </svg>

            {/* Render chakras */}
            <div style={{
                position: 'absolute',
                top: '5%',
                bottom: '5%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 2,
                height: '90%'
            }}>
                {/* We reverse the chakras array to render Sahasrara at the top and Muladhara at the bottom */}
                {[...chakras].reverse().map((chakra) => {
                    const isActive = activeChakra && activeChakra.id === chakra.id;
                    return (
                        <div
                            key={chakra.id}
                            style={{
                                width: isActive ? '50px' : '36px',
                                height: isActive ? '50px' : '36px',
                                borderRadius: '50%',
                                backgroundColor: chakra.color,
                                boxShadow: isActive ? `0 0 25px ${chakra.color}` : `0 0 10px ${chakra.color}80`,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                color: isActive && (chakra.color === '#FFFFFF' || chakra.color === '#FFCC00') ? '#000' : '#FFF',
                                fontWeight: 'bold',
                                fontSize: isActive ? '0.9rem' : '0.7rem',
                                border: isActive ? '2px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.2)'
                            }}
                            onClick={() => onChakraSelect(chakra)}
                            className="chakra-node"
                        >
                            {isActive ? chakra.beeja.split(' ')[0] : ''}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ChakraVisualizer;
