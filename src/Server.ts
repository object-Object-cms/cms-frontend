const SERVER_ADDRESS = "http://localhost:1234/";

let userInfo: null | { username: string; accessLevel: number } = null;

export async function login(username, password): Promise<boolean | string> {
    const response = (await post("login", { username, password })) as any;
    if (response.ok) {
        localStorage.setItem("session", response.session);
        return true;
    }
    return response.reason as string;
}

export async function cacheInfo() {
    let fromServer = (await get("me")) as any;
    if (fromServer.ok) {
        userInfo = {
            accessLevel: fromServer.accessLevel as number,
            username: fromServer.username as string
        };
    }
}

export function getInfo(): typeof userInfo | null {
    return userInfo;
}

async function get(endpoint: string) {
    return await (
        await fetch(SERVER_ADDRESS + endpoint, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("session")
            }
        })
    ).json();
}

async function post(endpoint: string, data) {
    return await (
        await fetch(SERVER_ADDRESS + endpoint, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("session")
            }
        })
    ).json();
}
