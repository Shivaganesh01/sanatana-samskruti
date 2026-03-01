const fs = require('fs');
const path = require('path');

const dharmaCulturePath = path.join(__dirname, 'public/data/samskruti/dharma_culture.json');
const viduraNeetiPath = path.join(__dirname, 'public/data/samskruti/dharma_culture/vidura_neeti.json');

let dharmaData = JSON.parse(fs.readFileSync(dharmaCulturePath, 'utf8'));

// Find vidura_neeti
let viduraIndex = dharmaData.findIndex(item => item.id === 'vidura_neeti');
if (viduraIndex !== -1) {
    // Remove content_kn and content_en so it prompts the app to fetch the separate file
    delete dharmaData[viduraIndex].content_kn;
    delete dharmaData[viduraIndex].content_en;
    fs.writeFileSync(dharmaCulturePath, JSON.stringify(dharmaData, null, 2));
    console.log('Updated dharma_culture.json (removed inline vidura_neeti content)');
}

// Ensure dir exists
if (!fs.existsSync(path.dirname(viduraNeetiPath))) {
    fs.mkdirSync(path.dirname(viduraNeetiPath), { recursive: true });
}

// Create Vidura Neeti complete data
const completeViduraNeeti = {
    content_kn: "ಮಹಾಭಾರತದ ಉದ್ಯೋಗ ಪರ್ವದಲ್ಲಿನ 'ವಿದುರ ನೀತಿ'ಯು ಪ್ರಾಚೀನ ಭಾರತದ ಪ್ರಸಿದ್ಧ ರಾಜನೀತಿ ಹಾಗೂ ಜೀವನಮೌಲ್ಯಗಳ ರತ್ನಗಣಿ. ಕುರುಕ್ಷೇತ್ರ ಯುದ್ಧದ ಮುನ್ನ, ದೃತರಾಷ್ಟ್ರನಿಗೆ ನಿದ್ರೆ ಬಾರದಿದ್ದಾಗ, ಜ್ಞಾನಿ ಮತ್ತು ಮಂತ್ರಿ ವಿದುರನು ಅವನಿಗೆ ಹೇಳಿದ ನೀತಿ-ಪಾಠಗಳೇ ಇವು. ಈ ತತ್ವಗಳು ಕೇವಲ ರಾಜರಿಗೆ ಮಾತ್ರವಲ್ಲ, ಆಧುನಿಕ ಜೀವನದ ಎಲ್ಲರಿಗೂ ಅನ್ವಯಿಸುತ್ತವೆ. ಆಯ್ದ ಕೆಲವು ಶ್ರೇಷ್ಠ ನೀತಿಗಳು ಇಲ್ಲಿವೆ:",
    content_en: "Vidura Neeti, part of the Udyoga Parva in the Mahabharata, is a treasure trove of ancient Indian statecraft and human values. It consists of the wise counsel given by Prime Minister Vidura to the blind King Dhritarashtra, who was sleepless and agitated before the Kurukshetra war. These principles of ethics, politics, and life are highly relevant even today. Here are some of the most profound teachings:",
    content: [
        {
            verse: 1,
            shloka_kn: "ನಿಷೇವತೇ ಪ್ರಶಸ್ತಾನಿ ನಿಂದಿತಾನಿ ನ ಸೇವತೇ | ಅನಾಸ್ತಿಕಃ ಶ್ರದ್ದಧಾನ ಏತತ್ಪಂಡಿತಲಕ್ಷಣಮ್ ||",
            shloka_en: "Nishevate prashastaani ninditaani na sevate | Anaastikah shraddhadhaana etat-panditalakshanam ||",
            meaning_kn: "ಯಾರು ಒಳ್ಳೆಯ ಕಾರ್ಯಗಳನ್ನು ಆಚರಿಸುತ್ತಾನೋ, ಕೆಟ್ಟ ಹಾಗೂ ನಿಂದಿಸಲ್ಪಡುವ ಕೆಲಸಗಳಿಂದ ದೂರವಿರುತ್ತಾನೋ, ದೇವ-ಧರ್ಮಗಳಲ್ಲಿ ವಿಶ್ವಾಸ (ಆಸ್ತಿಕತೆ) ಮತ್ತು ಶ್ರದ್ಧೆಯನ್ನು ಹೊಂದಿರುತ್ತಾನೋ, ಅವನೇ ನಿಜವಾದ 'ಪಂಡಿತ' (ಜ್ಞಾನಿ/ಬುದ್ಧಿವಂತ).",
            meaning_en: "He who engages in praiseworthy actions, avoids what is blameworthy (bad deeds), and has faith (does not deny God) and sincerity, possesses the marks of a 'Pandit' (a truly wise person)."
        },
        {
            verse: 2,
            shloka_kn: "ಕ್ರೋಧೋ ಹರ್ಷಶ್ಚ ದರ್ಪಶ್ಚ ಹ್ರೀಃ ಸ್ತಂಭೋ ಮಾನ್ಯಮಾನಿತಾ | ಯಮರ್ಥಾನ್-ನಾಪಕರ್ಷಂತಿ ಸ ವೈ ಪಂಡಿತ ಉಚ್ಯತೇ ||",
            shloka_en: "Krodho harshashcha darpashcha hreeh stambho maanyamaanitaa | Yamarthaan-naapakarshanti sa vai pandita uchyate ||",
            meaning_kn: "ಕೋಪ, ಅತಿಯಾದ ಸಂತೋಷ, ಅಹಂಕಾರ, ಅವಮಾನ, ಅತಿಯಾದ ನಾಚಿಕೆ ಮತ್ತು ಹೊಗಳಿಕೆಗೆ ಮರುಳಾಗುವುದು - ಈ ಆರು ಗುಣಗಳು ಯಾವ ವ್ಯಕ್ತಿಯನ್ನು ತನ್ನ ಗುರಿ (ಕರ್ತವ್ಯ) ಯಿಂದ ವಿಮುಖನನ್ನಾಗಿ ಮಾಡುವುದಿಲ್ಲವೋ ಆತನೇ ನಿಜವಾದ ಪಂಡಿತ (ಜ್ಞಾನಿ).",
            meaning_en: "Anger, excessive joy, pride, false modesty, stubbornness, and vanity—he whose goals (duties) are not swerved by these is called a wise man."
        },
        {
            verse: 3,
            shloka_kn: "ಯಸ್ಯ ಕೃತ್ಯಂ ನ ವಿಘ್ನಂತಿ ಶೀತಮುಷ್ಣಂ ಭಯಂ ರತಿಃ | ಸಮೃದ್ಧಿರಸಮೃದ್ಧಿರ್ವಾ ಸ ವೈ ಪಂಡಿತ ಉಚ್ಯತೇ ||",
            shloka_en: "Yasya krutyam na vighnanti sheetamushnam bhayam ratih | Samruddhirasamruddhirvaa sa vai pandita uchyate ||",
            meaning_kn: "ಚಳಿ-ಬಿಸಿಲು (ಕಷ್ಟ-ಸುಖ), ಭಯ, ಕಾಮ (ಆಸೆ), ಸಮೃದ್ಧಿ (ಯಶಸ್ಸು) ಅಥವಾ ಅಸಮೃದ್ಧಿ (ವೈಫಲ್ಯ) - ಇವುಗಳಲ್ಲಿ ಯಾವುದೂ ಒಬ್ಬನ ಕೆಲಸಕ್ಕೆ ಅಡ್ಡಿಯಾಗುವುದಿಲ್ಲವೋ ಅವನೇ ಪಂಡಿತ.",
            meaning_en: "He whose actions and duties are not hindered by cold or heat, fear or attachment, prosperity or adversity, is known as a wise person."
        },
        {
            verse: 4,
            shloka_kn: "ಏಕಃ ಪಾಪಾನಿ ಕುರುತೇ ಫಲಂ ಭುಂಕ್ತಿ ಮಹಾಜನಃ | ಭೋಕ್ತಾರೋ ವಿಪ್ರಮುಚ್ಯಂತೇ ಕರ್ತಾ ದೋಷೇಣ ಲಿಪ್ಯತೇ ||",
            shloka_en: "Ekah paapaani kurute phalam bhunkti mahaajanah | Bhoktaaro vipramuchyante kartaa doshena lipyate ||",
            meaning_kn: "ಒಬ್ಬ ವ್ಯಕ್ತಿ (ರಾಜ/ಮುಖಂಡ) ಕೆಟ್ಟ ಕೆಲಸವನ್ನು ಮಾಡಿದರೆ, ಅದರ ಫಲವನ್ನು ಅನೇೆಕರು (ಕುಟುಂಬ/ಪ್ರಜೆಗಳು) ಅನುಭವಿಸಬೇಕಾಗುತ್ತದೆ. ಆದರೆ ಭೋಗಿಸಿದವರು ಆ ಪಾಪದಿಂದ ಮುಕ್ತರಾಗುತ್ತಾರೆ, ತಪ್ಪು ಮಾಡಿದವನು ಮಾತ್ರ ಆ ಪಾಪದ ದೋಷಕ್ಕೆ ತುತ್ತಾಗುತ್ತಾನೆ.",
            meaning_en: "One person commits a sin, but many (family/citizens) enjoy its fruits. However, those who enjoy the fruits are freed, while the doer alone is tainted by the sin."
        },
        {
            verse: 5,
            shloka_kn: "ದ್ವಾವಿಮೌ ಕಂಟಕೌ ತೀಕ್ಷ್ಣೌ ಶರೀರಪರಿಶೋಷಿಣೌ | ಯಶ್ಚಾಧನಃ ಕಾಮಯತೇ ಯಶ್ಚ ಕುಪ್ಯತ್ಯನೀಶ್ವರಃ ||",
            shloka_en: "Dvaavimau kantakau teekshnau shareeraparishoshinau | Yashchaadhanah kaamayate yashcha kupyatyaneeshvarah ||",
            meaning_kn: "ಶರೀರವನ್ನು ಒಣಗಿಸುವ (ನಾಶ ಮಾಡುವ) ಎರಡು ಚೂಪಾದ ಮುಳ್ಳುಗಳಿವೆ: ಒಂದು, ಹಣವಿಲ್ಲದೆ ಇದ್ದರೂ ಹೆಚ್ಚು ಆಸೆಪಡುವವನು; ಮತ್ತು ಎರಡು, ಶಕ್ತಿಯಿಲ್ಲದೆ ಇದ್ದರೂ (ಅನೀಶ್ವರ) ಹೆಚ್ಚು ಕೋಪಗೊಳ್ಳುವವನು.",
            meaning_en: "There are two sharp thorns that dry out the body (destroy a person): one who desires much without having wealth, and one who gets angry without having the power to act."
        },
        {
            verse: 6,
            shloka_kn: "ಷಡ್ ದೋಷಾಃ ಪುರುಷೇಣೇಹ ಹಾತವ್ಯಾ ಭೂತಿಮಿಚ್ಛತಾ | ನಿದ್ರಾ ತಂದ್ರಾ ಭಯಂ ಕ್ರೋಧ ಆಲಸ್ಯಂ ದೀರ್ಘಸೂತ್ರತಾ ||",
            shloka_en: "Shad doshaah purusheneha haatavyaa bhootimichchhataa | Nidraa tandraa bhayam krodha aalasyam deerghasootrataa ||",
            meaning_kn: "ಉನ್ನತಿಯನ್ನು (ಯಶಸ್ಸನ್ನು) ಬಯಸುವ ಮನುಷ್ಯನು ಈ ಆರು ದೋಷಗಳನ್ನು ಬಿಟ್ಟುಬಿಡಬೇಕು: ಅತಿಯಾದ ನಿದ್ದೆ, ಮಂಪರು/ಜಡತ್ವ, ಭಯ, ಕೋಪ, ಸೋಮಾರಿತನ ಮತ್ತು ಕೆಲಸಗಳನ್ನು ಮುಂದೂಡುವ ಅಥವಾ ನಿಧಾನ ಮಾಡುವ ಗುಣ (ದೀರ್ಘಸೂತ್ರತಾ).",
            meaning_en: "A man desiring prosperity in this world should renounce these six faults: excessive sleep, drowsiness/lethargy, fear, anger, laziness, and procrastination."
        },
        {
            verse: 7,
            shloka_kn: "ಪಂಚೇಮಾನ್-ನ ಜಹ್ಯಾತ್ ಪುರುಷಃ ಶ್ರೇಯ ಇಚ್ಛನ್ | ಪಿತರಂ ಮಾತರಂ ಅಗ್ನಿಂ ಆತ್ಮಾನಂ ಗುರುಮೇವ ಚ ||",
            shloka_en: "Panchaimaan-na jahyaat purushah shreya ichchhan | Pitaram maataram agnim aatmaanam gurumeva cha ||",
            meaning_kn: "ಶ್ರೇಯಸ್ಸನ್ನು (ಒಳ್ಳೆಯದನ್ನು) ಬಯಸುವ ಮನುಷ್ಯನು ಈ ಐದು ವಸ್ತು/ವ್ಯಕ್ತಿಗಳನ್ನು ಎಂದಿಗೂ ಬಿಡಬಾರದು: ತಂದೆ, ತಾಯಿ, ಅಗ್ನಿ (ದೇವತೆಗಳ ಸಂಕೇತ/ಕರ್ತವ್ಯ), ತನ್ನ ಆತ್ಮ (ಸ್ವಾಭಿಮಾನ) ಮತ್ತು ಗುರು (ಶಿಕ್ಷಕ).",
            meaning_en: "A person seeking well-being and success should never abandon these five: the father, the mother, the sacred fire (duty/worship), the soul (self-respect), and the Guru (teacher)."
        },
        {
            verse: 8,
            shloka_kn: "ಯಸ್ಯ ಮಂತ್ರಂ ನ ಜಾನಂತಿ ಬಾಹ್ಯಾಶ್ಚಾಭ್ಯಂತರಾ ನರಾಃ | ಸ ರಾಜಾ ಸರ್ವತಶ್ಚಕ್ಷುಃ ಚಿರಂ ಭುಂಕ್ತೇ ವಸುಂಧರಾಮ್ ||",
            shloka_en: "Yasya mantram na jaananti baahyaashchaabhyantaraa naraah | Sa raajaa sarvatashchakshuh chiram bhunkte vasundharaam ||",
            meaning_kn: "ಯಾವ ರಾಜನ ಒಳ ಮತ್ತು ಹೊರಗಿನ ಯೋಜನೆಗಳನ್ನು, ಯೋಚನೆಗಳನ್ನು ಬೇರೆಯವರು ಸುಲಭವಾಗಿ ತಿಳಿಯಲು ಸಾಧ್ಯವಿಲ್ಲವೋ, ಆ ರಾಜನು (ಎಲ್ಲಾ ಕಡೆಯೂ ಕಣ್ಣುಳ್ಳವನಾಗಿ) ಭೂಮಿಯನ್ನು ದೀರ್ಘಕಾಲ ಆಳುತ್ತಾನೆ. ಅಂದರೆ ಮಂತ್ರಗುಪ್ತಿ (Secret Strategy) ಅತಿ ಮುಖ್ಯ.",
            meaning_en: "A king whose diplomatic counsels and secret strategies are not known to outsiders or insiders until executed, rules the earth for a long time like someone with all-seeing eyes."
        },
        {
            verse: 9,
            shloka_kn: "ವಿಷಸ್ಯ ವಿಷಯಾಣಾಂ ಚ ದೂರಮತ್ಯಂತಮಂತರಮ್ | ಉಪಭುಕ್ತಂ ವಿಷಂ ಹಂತಿ ವಿಷಯಾಃ ಸ್ಮರಣಾದಪಿ ||",
            shloka_en: "Vishasya vishayaanaam cha dooramatyantamantaram | Upabhuktam visham hanti vishayaah smaranaadapi ||",
            meaning_kn: "ವಿಷ ಮತ್ತು ವಿಷಯಗಳ (ಭೋಗಾಸೆಗಳ) ನಡುವೆ ದೊಡ್ಡ ವ್ಯತ್ಯಾಸವಿದೆ. ವಿಷವು ನಾವು ಅದನ್ನು ತಿಂದಾಗ ಮಾತ್ರ ನಮ್ಮನ್ನು ಕೊಲ್ಲುತ್ತದೆ. ಆದರೆ ವಿಷಯ-ವಾಸನೆಗಳು (ಭೌತಿಕ ಆಸೆಗಳು) ಕೇವಲ ಅವುಗಳನ್ನು ಧ್ಯಾನಿಸುವುದರಿಂದಲೇ (ಸ್ಮರಿಸುವುದರಿಂದಲೇ) ನಮ್ಮನ್ನು ನಾಶಮಾಡುತ್ತವೆ.",
            meaning_en: "There is a vast difference between poison and sensory desires (vishaya). Poison kills only when it is consumed, but sensory desires can destroy a person merely by thinking/remembering about them."
        },
        {
            verse: 10,
            shloka_kn: "ನ ವಿಶ್ವಸೇದವಿಶ್ವಸ್ತೇ ವಿಶ್ವಸ್ತೇ ನಾತಿವಿಶ್ವಸೇತ್ | ವಿಶ್ವಾಸಾತ್ ಭಯಮುತ್ಪನ್ನಂ ಮೂಲಾನ್ಯಪಿ ನಿಕೃಂತತಿ ||",
            shloka_en: "Na vishvased-avishvaste vishvaste naati-vishvaset | Vishvaasaat bhayam-utpannam moolaanyapi nikruntati ||",
            meaning_kn: "ನಂಬಿಕೆಗೆ ಅರ್ಹರಲ್ಲದವರನ್ನು ಎಂದಿಗೂ ನಂಬಬಾರದು. ಹಾಗೆಯೇ ನಂಬಿಕೆಗೆ ಅರ್ಹರಾದವರನ್ನೂ ಅತಿಯಾಗಿ ನಂಬಬಾರದು. ಏಕೆಂದರೆ ಅತಿಯಾದ ನಂಬಿಕೆಯಿಂದ ಹುಟ್ಟುವ ಭಯವು ಬೆನ್ನಿಗೆ ಇರಿದು ಸರ್ವನಾಶಕ್ಕೆ (ಬೇರುಸಹಿತ ಕೀಳಲು) ಕಾರಣವಾಗುತ್ತದೆ.",
            meaning_en: "Never trust someone who is untrustworthy, and do not over-trust even those who are trustworthy. For the danger arising from over-trusting cuts off a person entirely by the roots."
        },
        {
            verse: 11,
            shloka_kn: "ಮೂರ್ಖಸ್ಯ ಪಂಚ ಚಿಹ್ನಾನಿ ಗರ್ವೋ ದುರ್ವಚನಂ ತಥಾ | ಹಠಾವಾದೋ ದೃಢಗ್-ರೋಷಃ ಪರವಾಕ್ಯೇ-ಷು-ಅನಾದರಃ ||",
            shloka_en: "Moorkhasya pancha chihnaani garvo durvachanam tathaa | Hatha-vaado dhrudag-roshah paravaakye-shu-anaadarah ||",
            meaning_kn: "ಮೂರ್ಖನಿಗೆ ಐದು ಲಕ್ಷಣಗಳಿರುತ್ತವೆ: ಅಹಂಕಾರ (ಗರ್ವ), ಕೆಟ್ಟ ಮಾತು (ಬೈಗುಳ), ಯಾವ ಕಾರಣವಿಲ್ಲದೆ ಹಠ, ಅತಿಯಾದ ಕೋಪ, ಮತ್ತು ಬೇರೆಯವರ ಮಾತಿಗೆ ಬೆಲೆ ಕೊಡದಿರುವುದು (ಅನಾದರ).",
            meaning_en: "A fool has five signs: vanity (pride), foul language, stubborn argument without logic, staunch anger, and disrespect for what others have to say."
        },
        {
            verse: 12,
            shloka_kn: "ಯೋऽನ್ಯಥಾ ಸಂತಮಾತ್ಮಾನಂ ಅನ್ಯಥಾ ಪ್ರತಿಪದ್ಯತೇ | ಕಿಂ ತೇನ ನ ಕೃತಂ ಪಾಪಂ ಚೋರೇಣ-ಆರ್ತಾಪಹಾರಿಣಾ ||",
            shloka_en: "Yo'nyathaa santamaatmaanam anyathaa pratipadyate | Kim tena na krutam paapam choren-aartaapahaarinaa ||",
            meaning_kn: "ಒಬ್ಬ ವ್ಯಕ್ತಿ ತಾನು ಹೇಗಿದ್ದಾನೋ ಅದನ್ನು ಮುಚ್ಚಿಟ್ಟು (ತನ್ನ ಆತ್ಮಸಾಕ್ಷಿಗೆ ವಿರುದ್ಧವಾಗಿ) ಇನ್ನೊಂದು ರೂಪದಲ್ಲಿ ಅಥವಾ ಸ್ವಭಾವದಲ್ಲಿ ಜನರೆದುರು ನಾಟಕ ಮಾಡಿದರೆ (ವಂಚನೆ), ಅವನು ರಕ್ತ ಹೀರುವ ಕಳ್ಳನಿಗಿಂತ ಕಡೆಯಾದವನು. ಅವನು ಯಾವ ಪಾಪವನ್ನಾದರೂ ಮಾಡಲು ಹೇಸದವನು.",
            meaning_en: "A person who is one thing but presents himself as entirely different (a hypocrite) is worse than a thief. What sin hasn't been committed by such a deceptive thief who steals his own soul?"
        }
    ]
};

fs.writeFileSync(viduraNeetiPath, JSON.stringify(completeViduraNeeti, null, 2));
console.log('Created vidura_neeti.json');
