import React from 'react';
import { Share2 } from 'lucide-react';

const ShareButton = ({ title, text, url }) => {

    const handleShare = async (e) => {
        e.stopPropagation();

        try {
            if (navigator.share) {
                await navigator.share({
                    title: title || 'ಸನಾತನ ಸಂಸ್ಕೃತಿ',
                    text: text,
                    // url: url || window.location.href, // Optional link
                });
            } else {
                // Fallback for browsers that do not support Web Share API (copy to clipboard)
                await navigator.clipboard.writeText(text);
                alert("Text copied to clipboard!");
            }
        } catch (error) {
            console.error('Error sharing', error);
        }
    };

    return (
        <button
            onClick={handleShare}
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                position: 'relative',
                zIndex: 10
            }}
            title="Share"
        >
            <Share2 size={20} color="var(--primary)" />
        </button>
    );
};

export default ShareButton;
