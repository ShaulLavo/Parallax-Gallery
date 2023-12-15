function mapRange(
    inMin: number,
    inMax: number,
    input: number,
    outMin: number,
    outMax: number
): number {
    return ((input - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

function normalizedToNegOneOne(value: number): number {
    return 2 * value - 1
}

function normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min)
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}
export const math = { mapRange, normalize, normalizedToNegOneOne, clamp }
