import { login, logout } from "../../services/auth";

export function loginResolver(args: any, context: any) {
    const request: any = {
        email: args.email,
        password: args.password,
    };
    return login(request, context.res);
}

export function logoutResolver(context: any) {
    const request = {
        res: context.res,
    };

    return logout(request);
}
