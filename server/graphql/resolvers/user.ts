import { createUser, getAllUsers } from "../../services/user";
import { CreateUserRequest } from "../types/user";

export function usersResolver() {
    return getAllUsers();
}

export function createUserResolver(args: any) {
    const request: CreateUserRequest = {
        name: args.name,
        email: args.email,
        password: args.password,
    };

    return createUser(request);
}
