import { decode } from "jsonwebtoken";

let accessToken = "";

export function getAccessToken() {
    return accessToken;
}

export function setAccessToken(token: string) {
    accessToken = token;
}

export async function refreshAccessToken() {
    const response = await fetch(
        process.env.REACT_APP_BACKEND_URI + "/refresh-token",
        {
            method: "POST",
            credentials: "include",
        }
    );
    const x = await response.json();
    setAccessToken(x.accessToken);
}

// the issue with doing things this way, particularly with fetching the current user, is that when the accessToken changes, the react app does not refresh
// but does that matter? For now, just go without it. If it ends up being an issue, refer back to the tutorial
export function getCurrentUser() {
    const user: any = decode(accessToken)!;

    return user;
}

export function isLoggedIn() {
    const user = getCurrentUser();

    return Boolean(user);
}
