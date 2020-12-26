import { Document, model, Schema } from "mongoose";

export interface NoteFields extends Document {
    name: string;
    body: string;
}

const noteSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
    },
});

export const Note = model<NoteFields>("Note", noteSchema);
