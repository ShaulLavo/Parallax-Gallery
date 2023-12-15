export const linear = (t: number): number => t

export const quadratic = (t: number): number =>
    t * (-(t * t) * t + 4 * t * t - 6 * t + 4)

export const cubic = (t: number): number => t * (4 * t * t - 9 * t + 6)

export const elastic = (t: number): number =>
    t * (33 * t * t * t * t - 106 * t * t * t + 126 * t * t - 67 * t + 15)

export const inQuad = (t: number): number => t * t

export const outQuad = (t: number): number => t * (2 - t)

export const inOutQuad = (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

export const inCubic = (t: number): number => t * t * t

export const outCubic = (t: number): number => --t * t * t + 1

export const inOutCubic = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

export const inQuart = (t: number): number => t * t * t * t

export const outQuart = (t: number): number => 1 - --t * t * t * t

export const inOutQuart = (t: number): number =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t

export const inQuint = (t: number): number => t * t * t * t * t

export const outQuint = (t: number): number => 1 + --t * t * t * t * t

export const inOutQuint = (t: number): number =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t

export const inSine = (t: number): number => -Math.cos(t * (Math.PI / 2)) + 1

export const outSine = (t: number): number => Math.sin(t * (Math.PI / 2))

export const inOutSine = (t: number): number => -(Math.cos(Math.PI * t) - 1) / 2

export const inExpo = (t: number): number => Math.pow(2, 10 * (t - 1))

export const outExpo = (t: number): number => -Math.pow(2, -10 * t) + 1

export const inOutExpo = (t: number): number => {
    t /= 0.5
    if (t < 1) return Math.pow(2, 10 * (t - 1)) / 2
    t--
    return (-Math.pow(2, -10 * t) + 2) / 2
}

export const inCirc = (t: number): number => -Math.sqrt(1 - t * t) + 1

export const outCirc = (t: number): number => Math.sqrt(1 - (t = t - 1) * t)

export const inOutCirc = (t: number): number => {
    t /= 0.5
    if (t < 1) return -(Math.sqrt(1 - t * t) - 1) / 2
    t -= 2
    return (Math.sqrt(1 - t * t) + 1) / 2
}
