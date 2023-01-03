import { model, Schema } from 'mongoose';

export const TranslationSchema = new Schema(
    {
        word: { type: String, required: true },
        translations: {type: [String], required: true },
        notes: {type: [String], required: false },
        references: {type: [String], required: false },
        user_id: { type: Number, required: true }        
    },
    { timestamps: true}
);

export const Translation = model('Translation', TranslationSchema);