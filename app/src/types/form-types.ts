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

export interface CreateOutlineFields {
    name: string;
    type: string;
}

export interface EditPageFields {
    body: string;
}

export interface EditNoteFields {
    body: string;
}

export interface EditOutlineFields {
    body: string;
}

export interface DeleteAccountFields {
    name: string;
}

export interface ChangePasswordFields {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface EditProfileFields {
    name: string;
    email: string;
    penName: string;
    bio: string;
}

export interface LoginFields {
    email: string;
    password: string;
}

export interface RegisterFields {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
