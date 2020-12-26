import { Document, model, Schema } from "mongoose";

export interface NoteFields {
    _id?: string;
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
