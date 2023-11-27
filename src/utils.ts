import { sizes } from "./constants";

export function doesSupportWebP() {
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    else {
        return false;
    }
}
export function calculateImagesToFitScreen() {

    const totalSize = sizes.container + sizes.gap;

    const columns = Math.ceil(window.innerWidth / totalSize);
    const rows = Math.ceil(window.innerHeight / totalSize);

    return columns * rows;
}


export function isImage(elem: HTMLElement): elem is HTMLImageElement {
    return elem instanceof HTMLImageElement;
}
export function throttle<R, A extends any[]>(
    fn: (...args: A) => R,
    wait: number
): ((...args: A) => void) {
    let lastTime = 0;

    return (...args: A) => {
        const now = performance.now();
        if (now - lastTime >= wait || lastTime === 0) {
            lastTime = now;
            fn(...args);
        }
    };
}
