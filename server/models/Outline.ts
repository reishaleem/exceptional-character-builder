import { Document, model, Schema } from "mongoose";

export interface OutlineFields extends Document {
    name: string;
    type: string;
    body: string;
}

export const outlineSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
    },
    body: {
        type: String,
    },
});
