import type { ComponentDescriptor } from "./lib/DynamicComponent.svelte";

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

export interface APIBlob {
    id: number;
    type: string;
}

export interface ArticlePreview {
    id: string;
    author: string;
    title: string;
    description: string;
    bannerImage: string;
    category: string;
    publishDate: number;
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

export async function getCorePage(name: string): Promise<ComponentDescriptor> {
    const response = await get(`core/${name}`);
    if (response.ok) {
        return JSON.parse(response.content);
    } else {
        throw new APIError(response.reason);
    }
}

export async function editCorePage(
    name: string,
    content: ComponentDescriptor
): Promise<void> {
    const contentStr = JSON.stringify(content);
    const response = await post("edit/core/" + name, {
        content: contentStr
    });
    if (!response.ok) {
        throw new APIError(response.reason);
    }
}

export async function getArticle(id: string): Promise<ComponentDescriptor> {
    const response = await get(`article/${id}`);
    if (response.ok) {
        return JSON.parse(response.content);
    } else {
        throw new APIError(response.reason);
    }
}

export async function getArticles(): Promise<ArticlePreview[]> {
    const response = await get("list/articles");
    if (response.ok) {
        return response.articles;
    } else {
        throw new APIError(response.reason);
    }
}

export async function createArticle(
    title: string,
    description: string,
    bannerimage: string,
    category: string,
    content: ComponentDescriptor
): Promise<number> {
    const contentStr = JSON.stringify(content);
    const response = await post("create/article", {
        title,
        description,
        bannerimage,
        category,
        content: contentStr
    });
    if (response.ok) {
        return response.id;
    } else {
        throw new APIError(response.reason);
    }
}

export async function editArticle(
    id: string,
    description: string,
    content: ComponentDescriptor
): Promise<void> {
    const contentStr = JSON.stringify(content);
    const response = await post("edit/article/" + id, {
        description,
        content: contentStr
    });
    if (!response.ok) {
        throw new APIError(response.reason);
    }
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

export async function getBlobs(): Promise<APIBlob[]> {
    const response = await get("list/blobs");
    if (response.ok) {
        return response.blobs;
    } else {
        throw new APIError(response.reason);
    }
}

export async function uploadBlob(blob: Blob): Promise<number> {
    const formData = new FormData();
    formData.append("file", blob);
    const response = await postMultipart("create/blob", formData);
    if (response.ok) {
        return response.id;
    } else {
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

async function postMultipart(
    endpoint: string | URL,
    data: FormData
): Promise<APIResponse> {
    try {
        const endpointUrl = new URL(endpoint, SERVER_ADDRESS).toString();
        return await (
            await fetch(endpointUrl, {
                method: "POST",
                body: data,
                headers: {
                    Authorization: localStorage.getItem("session")
                }
            })
        ).json();
    } catch (err) {
        return { ok: false, reason: err.message };
    }
}

export function getBlobUrl(id: string | number) {
    return new URL(`/blob/${id}`, SERVER_ADDRESS).toString();
}
