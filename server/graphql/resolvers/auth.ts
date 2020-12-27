import { login } from "../../services/auth";

export function loginResolver(args: any, context: any) {
    const request: any = {
        email: args.email,
        password: args.password,
    };
    return login(request, context.res);
}

export function logoutResolver(context: any) {
    const res = context.res;
    res.clearCookie("rjid");
    return true;
}
