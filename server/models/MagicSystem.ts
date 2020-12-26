import { Document, Schema } from "mongoose";
import { noteSchema, NoteFields } from "./Note";
import { outlineSchema, OutlineFields } from "./Outline";

export interface MagicSystemFields {
    _id?: any;
    name: string;
    description: string;
    type: string[];
    hardnessRating: number;
    page: string;
    notes: NoteFields[];
    outlines: OutlineFields[];
}

export const magicSystemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    description: {
        type: String,
        trim: true,
        maxLength: 255,
    },
    type: {
        type: [String],
        required: true,
    },
    hardnessRating: {
        type: Number,
    },
    page: {
        type: String,
    },
    notes: {
        type: [noteSchema],
    },
    outlines: {
        type: [outlineSchema],
    },
});
