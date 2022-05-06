const SERVER_ADDRESS = "http://localhost:1234/";

export interface APIResponse {
    ok: boolean;
    reason?: string;
    [key: string]: any;
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
