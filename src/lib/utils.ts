import { getBlobUrl } from "../Server";

export function clampWithRollover(
    min: number,
    max: number,
    value: number
): number {
    return value > max ? min : value < min ? max : value;
}

export function getImageUrl(src: string) {
    if (src.startsWith("$") && src.length > 1) {
        return getBlobUrl(src.substring(1));
    } else {
        return src;
    }
}
