import { createUser } from "../../services/user";
import { CreateUserRequest } from "../types/user";

export function createUserResolver(args: any) {
    const request: CreateUserRequest = {
        name: args.name,
        email: args.email,
        password: args.password,
    };

    return createUser(request);
}
