const SERVER_ADDRESS = "http://localhost:1234/";

export class APIError extends Error {}

export interface APIResponse {
    ok: boolean;
    reason?: string;
    [key: string]: any;
}

export interface Comment {
    username: string;
    content: string;
}

export async function login(
    username: string,
    password: string
): Promise<APIResponse> {
    const response = await post("login", { username, password });
    if (response.ok) {
        localStorage.setItem("session", response.session);
    }
    return response;
}

export async function register(
    username: string,
    password: string
): Promise<APIResponse> {
    const response = await post("register", { username, password });
    if (response.ok) {
        localStorage.setItem("session", response.session);
    }
    return response;
}

export function getSelfInfo() {
    return get("me");
}

export async function getComments(): Promise<Comment[]> {
    const response = await get("comments");
    if (response.ok) {
        return response.comments;
    } else {
        throw new APIError(response.reason);
    }
}

export async function postComment(content: string): Promise<void> {
    const response = await post("create/comment", { content });
    if (!response.ok) {
        throw new APIError(response.reason);
    }
}

async function get(endpoint: string | URL): Promise<APIResponse> {
    try {
        const endpointUrl = new URL(endpoint, SERVER_ADDRESS).toString();
        return await (
            await fetch(endpointUrl, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("session")
                }
            })
        ).json();
    } catch (err) {
        return { ok: false, reason: err.message };
    }
}

async function post(endpoint: string | URL, data: any): Promise<APIResponse> {
    try {
        const endpointUrl = new URL(endpoint, SERVER_ADDRESS).toString();
        return await (
            await fetch(endpointUrl, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("session")
                }
            })
        ).json();
    } catch (err) {
        return { ok: false, reason: err.message };
    }
}
