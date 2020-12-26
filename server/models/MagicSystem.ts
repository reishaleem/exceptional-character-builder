import { Document, model, Schema } from "mongoose";
import { Note, NoteFields } from "./Note";
import { Outline, OutlineFields } from "./Outline";

export interface MagicSystemFields extends Document {
    name: string;
    description: string;
    type: string;
    page: string;
    notes: NoteFields[];
    outlines: OutlineFields[];
}

const magicSystemSchema = new Schema({
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
        type: String,
        required: true,
    },
    page: {
        type: String,
    },
    notes: {
        type: [Note],
    },
    outlines: {
        type: [Outline],
    },
});

export const MagicSystem = model<MagicSystemFields>(
    "MagicSystem",
    magicSystemSchema
);
