import { compare, hash } from "bcrypt";

export async function verifyPassword(password1: string, password2: string) {
    try {
        return await compare(password1, password2);
    } catch (error) {
        throw error;
    }
}

export async function encryptPassword(password: string) {
    return await hash(password, 10);
}
