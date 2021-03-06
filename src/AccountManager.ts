import { writable } from "svelte/store";
import {
    login as serverLogin,
    register as serverRegister,
    getSelfInfo
} from "./Server";

export class AccountManagerError extends Error {}

export interface Account {
    id: number;
    username: string;
    accessLevel: number;
}

export const currentAccount = writable<Account>(null);

export async function refreshAccountInfo(): Promise<Account> {
    const response = await getSelfInfo();
    if (response.ok) {
        const account: Account = {
            id: response.id,
            username: response.username,
            accessLevel: response.accessLevel
        };
        currentAccount.set(account);
        return account;
    } else {
        currentAccount.set(null);
        return null;
    }
}

export async function login(
    username: string,
    password: string
): Promise<Account> {
    const response = await serverLogin(username, password);
    if (response.ok) {
        const account = await refreshAccountInfo();
        if (account) {
            return account;
        } else {
            throw new AccountManagerError(
                "Login failed: Couldn't retrieve account info."
            );
        }
    } else {
        throw new AccountManagerError(`Login failed: ${response.reason}`);
    }
}

export async function register(
    username: string,
    password: string
): Promise<Account> {
    const response = await serverRegister(username, password);
    if (response.ok) {
        const account = await refreshAccountInfo();
        if (account) {
            return account;
        } else {
            throw new AccountManagerError(
                "Registration failed: Couldn't retrieve account info."
            );
        }
    } else {
        throw new AccountManagerError(
            `Registration failed: ${response.reason}`
        );
    }
}

export function logout() {
    localStorage.removeItem("session");
    currentAccount.set(null);
}

export function getAccountType(accessLevel: number) {
    if (accessLevel >= 100) {
        return "Administrator";
    } else if (accessLevel >= 50) {
        return "Moderator";
    } else {
        return "Regular user";
    }
}
