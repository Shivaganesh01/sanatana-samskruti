const fs = require('fs');
const path = require('path');

const DIR = 'c:\\Users\\shiva\\OneDrive\\Documents\\sanatana-samskruti\\public\\data\\samskruti';

// 1. Health Yoga
const healthPath = path.join(DIR, 'health_yoga.json');
const healthData = JSON.parse(fs.readFileSync(healthPath, 'utf8'));
healthData.push({
    "id": "padmasana",
    "title_kn": "ಪದ್ಮಾಸನ (ಧ್ಯಾನದ ಮೂಲ)",
    "title_en": "Padmasana (Lotus Pose)",
    "content_kn": "ಪದ್ಮಾಸನವು ಧ್ಯಾನಕ್ಕೆ ಅತ್ಯಂತ ಶ್ರೇಷ್ಠವಾದ ಆಸನವಾಗಿದೆ. ಇದು ಶ್ರೋಣಿಯ (pelvis) ಭಾಗಕ್ಕೆ ರಕ್ತಸಂಚಾರವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ ಮತ್ತು ಬೆನ್ನುಮೂಳೆಯನ್ನು ನೇರವಾಗಿರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಮನಸ್ಸನ್ನು ಶಾಂತಗೊಳಿಸಿ ಏಕಾಗ್ರತೆಯನ್ನು ಹೆಚ್ಚಿಸಲು ಇದು ಅತ್ಯುತ್ತಮ. ಉಸಿರಾಟವನ್ನು ನಿಯಂತ್ರಿಸಲು ಮತ್ತು ಕುಂಡಲಿನೀ ಶಕ್ತಿಯನ್ನು ಜಾಗೃತಗೊಳಿಸಲು ಇದು ಸಹಕಾರಿ.",
    "content_en": "Padmasana is the most highly regarded pose for meditation. It increases blood circulation to the pelvic region and helps keep the spine erect effortlessly. It calms the brain, increases awareness, and is excellent for deep breathing and pranayama practice. It is said to awaken the dormant Kundalini energy.",
    "subCategory_kn": "ಯೋಗಾಸನ",
    "subCategory_en": "Yoga Asanas"
});
healthData.push({
    "id": "sirsasana",
    "title_kn": "ಶೀರ್ಷಾಸನ (ಆಸನಗಳ ರಾಜ)",
    "title_en": "Sirsasana (Headstand)",
    "content_kn": "ಶೀರ್ಷಾಸನವನ್ನು 'ಆಸನಗಳ ರಾಜ' ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ಇದು ಮಿದುಳಿಗೆ ಶುದ್ಧ ರಕ್ತವನ್ನು ಪೂರೈಸುತ್ತದೆ, ನೆನಪಿನ ಶಕ್ತಿ ಮತ್ತು ಏಕಾಗ್ರತೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ. ಕಣ್ಣು, ಕಿವಿ ಮತ್ತು ಮೂಗಿನ ರೋಗಗಳನ್ನು ತಡೆಯುತ್ತದೆ. ಎಂಡೋಕ್ರೈನ್ ಗ್ರಂಥಿಗಳನ್ನು (ಪಿಟ್ಯುಟರಿ ಮತ್ತು ಪೀನಲ್) ಉತ್ತೇಜಿಸಿ, ದೇಹದ ಹಾರ್ಮೋನ್ ಸಮತೋಲನವನ್ನು ಕಾಪಾಡುತ್ತದೆ.",
    "content_en": "Known as the 'King of Asanas', Sirsasana reverses gravity's effect on the body. It directs oxygen-rich blood to the brain, enhancing memory, focus, and overall cognitive function. It stimulates the pituitary and pineal glands, relieving stress and balancing the endocrine system. It also strengthens the core and shoulders.",
    "subCategory_kn": "ಯೋಗಾಸನ",
    "subCategory_en": "Yoga Asanas"
});
healthData.push({
    "id": "anulom_vilom",
    "title_kn": "ಅನುಲೋಮ ವಿಲೋಮ (ನಾಡಿ ಶೋಧನ)",
    "title_en": "Anulom Vilom (Alternate Nostril Breathing)",
    "content_kn": "ಇದು ಎಡ ಮತ್ತು ಬಲ ನಾಡಿಗಳನ್ನು (ಇಡಾ ಮತ್ತು ಪಿಂಗಳ) ಶುದ್ಧೀಕರಿಸುವ ಪ್ರಾಣಾಯಾಮ. ಇದು ಮಿದುಳಿನ ಎರಡು ಭಾಗಗಳ ನಡುವೆ ಸಮತೋಲನವನ್ನು ತರುತ್ತದೆ. ರಕ್ತದೊತ್ತಡವನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ, ಹೃದಯದ ಆರೋಗ್ಯವನ್ನು ಸುಧಾರಿಸುತ್ತದೆ ಮತ್ತು ಆತಂಕ-ಒತ್ತಡವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
    "content_en": "This Pranayama purifies the Nadis (energy channels), specifically balancing the Ida (left/moon) and Pingala (right/sun) nadis. It balances the right and left hemispheres of the brain, reduces stress and anxiety, lowers hypertension, and promotes a deep sense of peace and mental clarity.",
    "subCategory_kn": "ಪ್ರಾಣಾಯಾಮ",
    "subCategory_en": "Pranayama"
});
fs.writeFileSync(healthPath, JSON.stringify(healthData, null, 2));

// 2. Dharma Culture
const dharmaPath = path.join(DIR, 'dharma_culture.json');
const dharmaData = JSON.parse(fs.readFileSync(dharmaPath, 'utf8'));
dharmaData.push({
    "id": "chanakya_neeti",
    "title_kn": "ಚಾಣಕ್ಯ ನೀತಿ (ರಾಜತಾಂತ್ರಿಕತೆ)",
    "title_en": "Chanakya Neeti (Diplomacy & Strategy)",
    "content_kn": "ಆಚಾರ್ಯ ಚಾಣಕ್ಯನು ಅರ್ಥಶಾಸ್ತ್ರ ಮತ್ತು ನೀತಿಶಾಸ್ತ್ರದ ಶ್ರೇಷ್ಠ ವಿದ್ವಾಂಸ. 'ಶತ್ರುವಿನ ಶತ್ರು ಮಿತ್ರ', ಹಾಗೂ 'ಯಾರನ್ನೂ ಕುರುಡಾಗಿ ನಂಬಬಾರದು' ಎಂಬಂತಹ ಕಟು ಸತ್ಯಗಳನ್ನು ಅವರು ಬೋಧಿಸಿದರು. ನೈತಿಕತೆ, ಹಣಕಾಸು ನಿರ್ವಹಣೆ ಮತ್ತು ದೈನಂದಿನ ಜೀವನದ ಸಮಸ್ಯೆಗಳನ್ನು ಹೇಗೆ ಎದುರಿಸಬೇಕೆಂದು ಅವರ ನೀತಿಗಳು ತಿಳಿಸುತ್ತವೆ. ಜವಾಬ್ದಾರಿ, ದೂರದೃಷ್ಟಿ ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆಯ ಬಗ್ಗೆ ಚಾಣಕ್ಯರ ವಿಚಾರಗಳು ಇಂದಿಗೂ ಪ್ರಸ್ತುತ.",
    "content_en": "Chanakya Neeti is a collection of aphorisms by the ancient Indian polymath and strategist Chanakya. It covers ethics, statecraft, financial management, and practical wisdom for daily life. It emphasizes the importance of vigilance, choosing the right company, acquiring knowledge, and strategic thinking. His teachings, like not trusting blindly and understanding human nature, remain highly relevant in the modern world.",
    "subCategory_kn": "ನೀತಿಶಾಸ್ತ್ರ",
    "subCategory_en": "Ethics"
});
dharmaData.push({
    "id": "ramayana_values",
    "title_kn": "ರಾಮಾಯಣದ ಮೌಲ್ಯಗಳು",
    "title_en": "Values of Ramayana",
    "content_kn": "ರಾಮಾಯಣವು ಕೇವಲ ಕಥೆಯಲ್ಲ, ಅದು ಆದರ್ಶ ಜೀವನದ ಕೈಪಿಡಿ. ಶ್ರೀರಾಮನು ಪಿತೃವಾಕ್ಯ ಪರಿಪಾಲನೆಯ ಆದರ್ಶ ಪುತ್ರನಾಗಿ, ಸೀತೆಯು ಪತಿವ್ರತಾ ಧರ್ಮದ ಆದರ್ಶ ಪತ್ನಿಯಾಗಿ, ಲಕ್ಷ್ಮಣನು ತ್ಯಾಗಮಯಿ ಸಹೋದರನಾಗಿ, ಹನುಮಂತನು ನಿರಪೇಕ್ಷ ಭಕ್ತನಾಗಿ ನಮಗೆ ಆದರ್ಶರಾಗಿದ್ದಾರೆ. ಇದು ಸತ್ಯ, ಧರ್ಮ, ಮತ್ತು ಕುಟುಂಬದ ಬದ್ಧತೆಯನ್ನು ಎತ್ತಿಹಿಡಿಯುತ್ತದೆ.",
    "content_en": "The Ramayana is a foundational epic of Hindu culture, serving as a manual for an ideal life. It portrays the ideal characters: Rama as the perfect son and king who strictly adhered to duty (Dharma), Sita as the epitome of grace and fidelity, Lakshmana as the symbol of selfless brotherly love, and Hanuman as the absolute pinnacle of devotion (Bhakti). It teaches relationship values, sacrifice, and the enduring triumph of righteousness over ego and evil.",
    "subCategory_kn": "ಇತಿಹಾಸ",
    "subCategory_en": "Itihasa"
});
fs.writeFileSync(dharmaPath, JSON.stringify(dharmaData, null, 2));

// 3. Chakras
const chakrasPath = path.join(DIR, '../chakras.json');
const chakrasData = JSON.parse(fs.readFileSync(chakrasPath, 'utf8'));
chakrasData.chakras.forEach(chakra => {
    if (chakra.id === "muladhara") {
        chakra.crystals = "Red Jasper, Hematite, Smoky Quartz, Black Tourmaline";
        chakra.essential_oils = "Patchouli, Cedarwood, Sandalwood, Vetiver";
        chakra.affirmation_en = "I am safe. I am grounded. I belong in this world. Everything I need is provided.";
        chakra.affirmation_kn = "ನಾನು ಸುರಕ್ಷಿತ, ನಾನು ಸ್ಥಿರ. ಈ ಜಗತ್ತಿನಲ್ಲಿ ನನಗೆ ಬೇಕಾದೆಲ್ಲವೂ ಲಭ್ಯವಿದೆ.";
    } else if (chakra.id === "svadhishthana") {
        chakra.crystals = "Carnelian, Orange Calcite, Sunstone, Tiger's Eye";
        chakra.essential_oils = "Ylang Ylang, Orange, Jasmine, Rose";
        chakra.affirmation_en = "I am creative. I embrace my passions. I allow my emotions to flow like water.";
        chakra.affirmation_kn = "ನಾನು ಸೃಜನಶೀಲ, ನನ್ನ ಭಾವನೆಗಳನ್ನು ನಾನು ಮುಕ್ತವಾಗಿ ಹರಿಯಲು ಬಿಡುತ್ತೇನೆ.";
    } else if (chakra.id === "manipura") {
        chakra.crystals = "Citrine, Yellow Topaz, Amber, Pyrite";
        chakra.essential_oils = "Lemon, Ginger, Peppermint, Lemongrass";
        chakra.affirmation_en = "I am strong. I am confident. I honor the power within me.";
        chakra.affirmation_kn = "ನಾನು ಶಕ್ತಿಶಾಲಿ, ನನ್ನ ಸಾಮರ್ಥ್ಯದ ಮೇಲೆ ನನಗೆ ವಿಶ್ವಾಸವಿದೆ.";
    } else if (chakra.id === "anahata") {
        chakra.crystals = "Rose Quartz, Jade, Green Aventurine, Emerald";
        chakra.essential_oils = "Rose, Lavender, Chamomile, Ylang Ylang";
        chakra.affirmation_en = "I am love. I am peace. I forgive easily and offer compassion to all.";
        chakra.affirmation_kn = "ನಾನು ಪ್ರೀತಿಯ ಸ್ವರೂಪ, ನಾನು ಎಲ್ಲರನ್ನೂ ಕ್ಷಮಿಸುತ್ತೇನೆ ಮತ್ತು ಕರುಣೆಯಿಂದಿರುತ್ತೇನೆ.";
    } else if (chakra.id === "vishuddha") {
        chakra.crystals = "Lapis Lazuli, Aquamarine, Turquoise, Blue Lace Agate";
        chakra.essential_oils = "Eucalyptus, Peppermint, Tea Tree, Chamomile";
        chakra.affirmation_en = "I am truth. I express myself freely and clearly with love.";
        chakra.affirmation_kn = "ನಾನು ಸತ್ಯ. ನನ್ನ ವಿಚಾರಗಳನ್ನು ನಾನು ಸ್ಪಷ್ಟವಾಗಿ ಮತ್ತು ನಿರ್ಭಯವಾಗಿ ವ್ಯಕ್ತಪಡಿಸುತ್ತೇನೆ.";
    } else if (chakra.id === "ajna") {
        chakra.crystals = "Amethyst, Sodalite, Lapis Lazuli, Clear Quartz";
        chakra.essential_oils = "Frankincense, Rosemary, Clary Sage, Lavender";
        chakra.affirmation_en = "I am wise. I trust my intuition. I see the truth beyond illusions.";
        chakra.affirmation_kn = "ನಾನು ಜ್ಞಾನಿ, ನನ್ನ ಅಂತಃಪ್ರಜ್ಞೆಯನ್ನು ನಾನು ನಂಬುತ್ತೇನೆ. ಭ್ರಮೆಗಳನ್ನು ಮೀರಿ ಸತ್ಯವನ್ನು ಕಾಣುತ್ತೇನೆ.";
    } else if (chakra.id === "sahasrara") {
        chakra.crystals = "Clear Quartz, Amethyst, Selenite, Diamond";
        chakra.essential_oils = "Frankincense, Myrrh, Lotus, Rose";
        chakra.affirmation_en = "I am divine. I am connected to the universe. I am one with everything.";
        chakra.affirmation_kn = "ನಾನು ದೈವಿಕ, ನಾನು ವಿಶ್ವದೊಂದಿಗೆ ಬೆರೆತಿದ್ದೇನೆ. ಎಲ್ಲವೂ ನನ್ನಲ್ಲಿದೆ.";
    }
});
fs.writeFileSync(chakrasPath, JSON.stringify(chakrasData, null, 2));

// 4. Suktas
const VEDIC_DIR = path.join(DIR, 'vedic_wisdom');
const psPath = path.join(VEDIC_DIR, 'purusha_suktam.json');
const psData = JSON.parse(fs.readFileSync(psPath, 'utf8'));
psData.intro_en = "The Purusha Suktam is one of the most sacred hymns from the Rig Veda (10.90), dedicated to the Cosmic Being (Purusha). It contains 16 verses (Shodasha Mantra) that describe the spiritual unity of the universe.";
psData.significance_kn = "ಈ ಸೂಕ್ತವನ್ನು ಪ್ರತಿದಿನ ಪಠಿಸುವುದರಿಂದ ಏಕಾಗ್ರತೆ ಹೆಚ್ಚುತ್ತದೆ. ಇದು ಭಗವಂತನು ಎಲ್ಲೆಡೆ ಇದ್ದಾನೆ ಎಂಬ ಅರಿವನ್ನು ಮೂಡಿಸಿ ಮನಸ್ಸನ್ನು ಶಾಂತಗೊಳಿಸುತ್ತದೆ. ಪೂಜೆಗಳಲ್ಲಿ, ಹೋಮಗಳಲ್ಲಿ, ಮತ್ತು ದೇವಸ್ಥಾನಗಳಲ್ಲಿ ಅಭಿಷೇಕ ಮಾಡುವಾಗ ಇದನ್ನು ಪ್ರಮುಖವಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.";
psData.significance_en = "Chanting the Purusha Suktam is believed to elevate one's consciousness and purify the mind. It instills the realization that the Divine is omnipresent and that all creation is interconnected. It is widely used during temple rituals, Abhisheka (holy bathing of deities), and homas (fire rituals).";
fs.writeFileSync(psPath, JSON.stringify(psData, null, 2));

const ssPath = path.join(VEDIC_DIR, 'sri_suktam.json');
const ssData = JSON.parse(fs.readFileSync(ssPath, 'utf8'));
ssData.intro_en = "Sri Suktam is a reverence to Goddess Lakshmi, the deity of wealth, prosperity, and abundance. Found in the appendices of the Rig Veda, these 15 verses are powerful invocations to attract spiritual and material wealth.";
ssData.significance_kn = "ಶ್ರೀ ಸೂಕ್ತದ ಪಠಣವು ದಾರಿದ್ರ್ಯ (ಬಡತನ) ಹಾಗೂ ಆಲಸ್ಯವನ್ನು ದೂರ ಮಾಡುತ್ತದೆ. ಪ್ರತಿ ಶುಕ್ರವಾರ, ಹಬ್ಬದ ದಿನಗಳಲ್ಲಿ ಇದನ್ನು ಪಠಿಸುವುದರಿಂದ ಮನೆಯಲ್ಲಿ ಸಮೃದ್ಧಿ, ಶಾಂತಿ ಮತ್ತು ಸಂತೋಷ ನೆಲೆಸುತ್ತದೆ.";
ssData.significance_en = "Reciting the Sri Suktam with devotion is highly recommended to overcome financial difficulties and eliminate negative energy from one's life. It invokes not just material wealth, but also inner richness, good health, and peace of mind. It is especially auspicious to chant this on Fridays and during Diwali.";
fs.writeFileSync(ssPath, JSON.stringify(ssData, null, 2));

const nsPath = path.join(VEDIC_DIR, 'narayana_suktam.json');
if (fs.existsSync(nsPath)) {
    const nsData = JSON.parse(fs.readFileSync(nsPath, 'utf8'));
    nsData.intro_kn = "ನಾರಾಯಣ ಸೂಕ್ತವು ಯಜುರ್ವೇದದ ತೈತ್ತಿರೀಯ ಅರಣ್ಯಕದಲ್ಲಿದೆ. ಇದು ಪರಮಾತ್ಮನಾದ ನಾರಾಯಣನ (ವಿಷ್ಣುವಿನ) ಸರ್ವಾಂತರ್ಯಾಮಿತ್ವವನ್ನು ಧ್ಯಾನಿಸುವ ಅತ್ಯುನ್ನತ ಮಂತ್ರ.";
    nsData.intro_en = "Narayana Suktam is found in the Taittiriya Aranyaka of the Yajur Veda. It is a profound hymn for meditating upon Lord Narayana (the Supreme Being) and His omnipresence in all creation.";
    nsData.significance_kn = "ಈ ಸೂಕ್ತವು ಭಗವಂತನು ಪ್ರತಿಯೊಂದು ಅಣುವಿನಲ್ಲೂ ನೆಲೆಸಿದ್ದಾನೆ ಎಂದು ತಿಳಿಸುತ್ತದೆ. ಇದನ್ನು ಪಠಿಸುವುದರಿಂದ ಅಹಂಕಾರ ನಾಶವಾಗಿ ಧ್ಯಾನದಲ್ಲಿ ಆಳವಾದ ನಿಲುವು ಸಾಧಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತದೆ.";
    nsData.significance_en = "This Suktam emphasizes that the Divine resides within the heart of every being as 'Antaryami'. Regular chanting purifies the heart, reduces ego, and aids in deep meditation, ultimately leading to self-realization.";
    fs.writeFileSync(nsPath, JSON.stringify(nsData, null, 2));
}

console.log("Updated data successfully.");
