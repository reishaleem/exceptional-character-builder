export interface Note {
    id: string;
    title: string;
    body: string;
}

export interface Outline {
    id: string;
    title: string;
    body: string;
}

export interface MagicSystem {
    id: string;
    name: string;
    description: string;
    page: string;
    notes: Note[];
    outlines: Outline[];
    updatedAt: string;
}
