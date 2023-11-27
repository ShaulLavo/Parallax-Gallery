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
