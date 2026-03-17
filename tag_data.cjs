const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/shiva/OneDrive/Documents/sanatana-samskruti/public/data/samskruti';

function updateFile(fileName, mapping) {
    const filePath = path.join(baseDir, fileName);
    if (!fs.existsSync(filePath)) return;

    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data = data.map(item => {
        let sub = mapping.default || { kn: 'ಇತರೆ', en: 'Other' };
        for (const [subKey, ids] of Object.entries(mapping.groups)) {
            if (ids.includes(item.id)) {
                sub = mapping.subInfo[subKey];
                break;
            }
        }
        return {
            ...item,
            subCategory_kn: sub.kn,
            subCategory_en: sub.en
        };
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Updated ${fileName} with sub-categories.`);
}

const config = {
    'health_yoga.json': {
        subInfo: {
            arogya: { kn: 'ಆರೋಗ್ಯ ಸೂತ್ರ', en: 'Health Tips' },
            ayurveda: { kn: 'ಆಯುರ್ವೇದ', en: 'Ayurveda' },
            dinacharya: { kn: 'ದಿನಚರಿ', en: 'Daily Routine' },
            mudras: { kn: 'ಮುದ್ರೆಗಳು', en: 'Yoga Mudras' }
        },
        groups: {
            arogya: ['health_youth', 'physical_fitness', 'mental_health', 'digital_wellness', 'youth_energy', 'youth_fitness', 'digital_eye_health', 'posture_spine', 'mental_health_youth', 'skin_hair_youth'],
            ayurveda: ['ayurveda_intro', 'tridosha', 'prakriti', 'ayur_diet', 'herbs', 'pancha_mahabhuta', 'saptadhatu', 'agni', 'viruddha_ahara', 'triphala', 'ushnodaka', 'turmeric_benefits', 'sleep_ayurveda', 'panchakarma', 'medhya_rasayana', 'ayurvedic_skincare'],
            dinacharya: ['brahma_muhurta', 'morning_routine', 'food_etiquette', 'night_routine', 'ritucharya', 'kara_darshana', 'bhoomi_vandana', 'ushapana', 'danta_dhavana', 'jihwa_nirlekhana', 'gandusha', 'nasya', 'vyayama', 'abhyanga', 'snana', 'surya_namaskar', 'mitahara', 'vastra_dharana', 'tambula_sevana', 'deepa_pravalana', 'nidra'],
            mudras: ['jnana_mudra', 'prana_mudra', 'vayu_mudra', 'shunya_mudra', 'apana_mudra', 'surya_mudra', 'varuna_mudra', 'chin_mudra', 'prithvi_mudra', 'adi_mudra', 'hakini_mudra']
        }
    },
    'vedic_wisdom.json': {
        subInfo: {
            science: { kn: 'ವೈದಿಕ ವಿಜ್ಞಾನ', en: 'Ancient Science' },
            suktas: { kn: 'ವೇದ ಸೂಕ್ತಗಳು', en: 'Vedic Suktas' },
            stotras: { kn: 'ಸ್ತೋತ್ರಗಳು', en: 'Stotras' }
        },
        groups: {
            science: ['zero', 'kanad_atom', 'madhava_calculus', 'plastic_surgery', 'astronomy_aryabhata', 'metallurgy_iron_pillar', 'baudhayana_pythagoras', 'varahamihira', 'yoga_psychology', 'civil_engineering', 'navigational_compass'],
            suktas: ['purusha_suktam', 'sri_suktam', 'narayana_suktam', 'devi_suktam', 'manyu_suktam', 'balittha_suktam', 'durga_suktam', 'vishnu_suktam', 'ato_deva_mantra'],
            stotras: ['mahalakshmi_ashtaka', 'venkatesha_stotra', 'mangalashtaka', 'krishna_shatanama', 'vayu_stuti', 'mahishasura_mardini', 'shanti_mantra', 'lakshmi_shobhana', 'ganesha_prarthana', 'guru_stotram', 'shiva_panchakshari', 'lingashtakam', 'bilvashtakam', 'hanuman_chalisa', 'vishnu_sahasranama', 'rama_raksha']
        },
        default: { kn: 'ಸ್ತೋತ್ರಗಳು', en: 'Stotras' }
    },
    'spirituality_sadhana.json': {
        subInfo: {
            etiquette: { kn: 'ಧರ್ಮ ನಡವಳಿಕೆ', en: 'Etiquette' },
            lifestyle: { kn: 'ಜೀವನ ಶೈಲಿ', en: 'Lifestyle' },
            marga: { kn: 'ಮೋಕ್ಷ ಮಾರ್ಗ', en: 'Moksha Paths' },
            chakra: { kn: 'ಚಕ್ರ - ಆತ್ಮ ಸಾಧನೆ', en: 'Chakras & Atma' }
        },
        groups: {
            etiquette: ['namaste', 'tilaka', 'charana_sparsha', 'shanti_mantra', 'lighting_deepa'],
            lifestyle: ['dharmic_lifestyle_link', 'bhojan_sitting', 'respect_nature', 'rangoli', 'fasting', 'yama_Non-violence', 'yama_Truthfulness', 'yama_Non-stealing', 'yama_Self-restraint', 'yama_Non-attachment', 'niyama_Purity', 'niyama_Contentment', 'niyama_Discipline', 'niyama_Self-study', 'niyama_Surrender'],
            marga: ['moksha_paths_link', 'karma', 'bhakti', 'jnana', 'karma_yoga', 'bhakti_yoga', 'jnana_yoga', 'raja_yoga', 'viveka', 'vairagya', 'shat_sampat', 'mumukshutva'],
            chakra: ['chakra_sadhana_link', 'chakra_atma_intro', 'muladhara_chakra', 'svadhisthana_chakra', 'manipura_chakra', 'anahata_chakra', 'vishuddha_chakra', 'ajna_chakra', 'sahasrara_chakra', 'atma_realization']
        },
        default: { kn: 'ಮೋಕ್ಷ ಮಾರ್ಗ', en: 'Moksha Paths' }
    },
    'dharma_culture.json': {
        subInfo: {
            mahabharata: { kn: 'ಮಹಾಭಾರತ', en: 'Mahabharata' },
            subhashita: { kn: 'ಸುಭಾಷಿತ', en: 'Subhashitas' },
            culture: { kn: 'ಸಂಸ್ಕೃತಿ', en: 'Culture' },
            festivals: { kn: 'ಹಬ್ಬಗಳು', en: 'Festivals' },
            ethics: { kn: 'ನೀತಿಶಾಸ್ತ್ರ', en: 'Ethics' }
        },
        groups: {
            mahabharata: ['dharma_victory', 'yaksha_prashna', 'vidura_neeti', 'ekalavya_bhakti', 'karna_charity', 'abhimanyu_bravery', 'bhishma_pratigna', 'draupadi_resilience', 'shakuni_cunning', 'krishna_upadesha', 'arjuna_vishada', 'sanjaya_divyadrishti', 'gandhari_shap', 'aswatthama_krodha'],
            subhashita: ['vidya_dhanam', 'vachanam', 'paropakarah', 'uddyamo', 'satya_mahima', 'kshama', 'vidya_vinaya', 'satsanga', 'alasya'],
            culture: ['vasudhaiva_kutumbakam', 'pooja_significance', 'shodasha_upachara', 'deepa', 'bell', 'panchamruta', 'abhisheka', 'archana', 'mangala_arati', 'prasada', 'teertha'],
            festivals: ['ugadi', 'makara_sankranti', 'mahashivaratri', 'rama_navami', 'varamahalakshmi', 'krishna_janmashtami', 'ganesha_chaturthi', 'dasara', 'deepavali', 'hanuman_jayanti', 'rathasaptami'],
            ethics: ['panchatantra_wisdom', 'samanya_dharma', 'purusharthas']
        },
        default: { kn: 'ಹಬ್ಬಗಳು', en: 'Festivals' }
    },
    'saints_temples.json': {
        subInfo: {
            saints: { kn: 'ಸಂತರು', en: 'Saints' },
            temples: { kn: 'ದೇವಾಲಯಗಳು', en: 'Temples' },
            dasara: { kn: 'ದಾಸರ ಪದಗಳು', en: 'Dasara Padagalu' },
            vivekananda: { kn: 'ಸ್ವಾಮಿ ವಿವೇಕಾನಂದ', en: 'Swami Vivekananda' }
        },
        groups: {
            saints: ['basavanna', 'akkamahadevi', 'allama_prabhu', 'purandara_dasa', 'kanaka_dasa', 'sarvajna', 'madhvacharya', 'shankaracharya', 'ramanujacharya', 'shishunala_sharif', 'raghavendra_swamy'],
            temples: ['hampi', 'udupi', 'dharmasthala', 'kashi', 'tirupati', 'kedarnath', 'subrahmanya', 'kollur', 'belur_halebidu', 'shravanabelagola', 'somnath', 'murudeshwar', 'madurai', 'puri', 'dwarka', 'puri_jagannath', 'ram_mandir'],
            dasara: ['bhagyada_lakshmi', 'krishna_nee_begane', 'jagadoddharana', 'dasarendre_purandara', 'ragi_tandira', 'pillangoviya'],
            vivekananda: ['awake', 'believe_self', 'fearless', 'education', 'service', 'thought_power', 'youth_message', 'concentration', 'india_greatness']
        },
        default: { kn: 'ದಾಸರ ಪದಗಳು', en: 'Dasara Padagalu' }
    }
};

module.exports.config = config;
Object.entries(config).forEach(([file, mapping]) => {
    updateFile(file, mapping);
});
