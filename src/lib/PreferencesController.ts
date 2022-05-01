import { Writable, writable } from "svelte/store";

function createRawPreference(
    name: string,
    initialValue: string
): Writable<string> {
    const storageName = "pref_" + name;
    const prefStore = writable(
        localStorage.getItem(storageName) ?? initialValue
    );
    prefStore.subscribe((val) => {
        localStorage.setItem(storageName, val);
    });
    return prefStore;
}

function createConvertedPreference<T>(
    name: string,
    initialValue: T,
    convertFromStorage: (val: string) => T | undefined,
    convertToStorage: (val: T) => string
): Writable<T> {
    const storageName = "pref_" + name;
    const storageValue = localStorage.getItem(storageName);
    const prefStore = writable(
        storageValue
            ? convertFromStorage(storageValue) ?? initialValue
            : initialValue
    );
    prefStore.subscribe((val) => {
        localStorage.setItem(storageName, convertToStorage(val));
    });
    return prefStore;
}

function convertNumber(value: string): number | undefined {
    const num = parseFloat(value);
    return Number.isNaN(num) ? undefined : num;
}

function convertObject(value: string) {
    try {
        return JSON.parse(value);
    } catch {}
}

export function createPreference<T>(
    name: string,
    initialValue: T
): Writable<T> {
    switch (typeof initialValue) {
        case "number":
            return createConvertedPreference(
                name,
                initialValue,
                convertNumber,
                (val) => val.toString()
            ) as unknown as Writable<T>;
        case "boolean":
            return createConvertedPreference(
                name,
                initialValue,
                (val) => val == "true",
                (val) => val.toString()
            ) as unknown as Writable<T>;
        case "string":
            return createRawPreference(
                name,
                initialValue
            ) as unknown as Writable<T>;
        case "object":
            return createConvertedPreference(
                name,
                initialValue,
                convertObject,
                (val) => JSON.stringify(val)
            ) as unknown as Writable<T>;
    }
}

export const prefMenubarViewMode = createPreference("menubar_view_mode", false);
