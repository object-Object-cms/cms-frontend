export function clampWithRollover(
    min: number,
    max: number,
    value: number
): number {
    return value > max ? min : value < min ? max : value;
}
