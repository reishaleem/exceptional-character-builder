export interface MagicSystemDetailsFields {
    name: string;
    hardnessRating: number;
    type: string[];
    description: string;
}

export interface MagicSystemDetailsFieldsErrors {
    name: string;
    type: string;
    hardnessRating: string;
    description: string;
}
