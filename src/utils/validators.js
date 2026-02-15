import { z } from 'zod';

// --- Samskruti Schemas ---

export const SamskrutiItemSchema = z.object({
    id: z.string(),
    title_kn: z.string(),
    title_en: z.string(),
    content_kn: z.string(),
    content_en: z.string(),
    // Optional detailed fields for specific types
    shloka: z.string().optional(),
    meaning: z.string().optional(),
});

export const SamskrutiCategorySchema = z.object({
    id: z.string(), // e.g., 'dinacharya', 'utsava'
    title_kn: z.string(),
    title_en: z.string(),
    description: z.string().optional(),
    items: z.array(SamskrutiItemSchema),
});

export const SamskrutiDataSchema = z.array(SamskrutiCategorySchema);

// --- Gita Schemas ---

export const VerseSchema = z.object({
    verse_number: z.number(),
    shloka: z.string(), // Sanskrit text
    transliteration: z.string().optional(), // English/Kannada script reading
    word_meanings: z.string().optional(), // Padacched/Padartha
    translation: z.string(), // Simple meaning
    purport: z.string().optional(), // Deep explanation
});

export const ChapterSchema = z.object({
    chapter: z.number(),
    title_kn: z.string(),
    title_en: z.string().optional(),
    summary_kn: z.string(),
    verses_intro_kn: z.string().optional(),
    verses: z.array(VerseSchema).default([]), // Defaults to empty if not yet populated
});

export const GitaDataSchema = z.array(ChapterSchema);

// --- Validation Functions ---

export const validateSamskrutiData = (data) => {
    try {
        return SamskrutiDataSchema.parse(data);
    } catch (error) {
        console.error("Samskruti Data Validation Error:", error);
        return []; // Return empty or handle gracefully
    }
};

export const validateGitaData = (data) => {
    try {
        return GitaDataSchema.parse(data);
    } catch (error) {
        console.error("Gita Data Validation Error:", error);
        return [];
    }
};
