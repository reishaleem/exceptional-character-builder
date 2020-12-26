import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserPassword,
    updateUserProfile,
} from "../../services/user";
import { CreateUserRequest } from "../types/user";

export function usersResolver() {
    return getAllUsers();
}

export function userResolver(args: any) {
    return getUserById(args.id);
}

export function createUserResolver(args: any) {
    const request: CreateUserRequest = {
        name: args.name,
        email: args.email,
        password: args.password,
    };

    return createUser(request);
}

export function updateUserProfileResolver(args: any) {
    const request = {
        id: args.id,
        name: args.name,
        email: args.email,
        penName: args.penName,
        bio: args.bio,
    };

    return updateUserProfile(request);
}

export function updateUserPasswordResolver(args: any) {
    const request = {
        id: args.id,
        currentPassword: args.currentPassword,
        newPassword: args.newPassword,
    };

    return updateUserPassword(request);
}
