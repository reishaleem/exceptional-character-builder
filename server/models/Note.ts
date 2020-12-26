import { Document, model, Schema } from "mongoose";

export interface NoteFields {
    name: string;
    body: string;
}

export const noteSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
    },
});
