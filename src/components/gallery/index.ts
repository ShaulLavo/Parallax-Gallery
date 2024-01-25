import { updateLoadingProgress, showLoadingScreen } from '../loadingScreen'
import { getImageUrl } from '../../utilities/cloudinary'
import { imageIds } from '../../utilities/constants'
import { lenisManager } from '../lenisManager'
import { math } from '../../utilities/math'
import {
    calculateImagesToFitScreen,
    segmentIntoRows,
} from '../../utilities/utils'
import './style.css'

let images: NodeListOf<HTMLImageElement>

function getImages() {
    if (images) return images
    else {
        return document.querySelectorAll(
            '.gallery img'
        ) as NodeListOf<HTMLImageElement>
    }
}

export async function renderGallery(containerId: string) {
    const appElement = document.getElementById(containerId)
    if (!appElement) {
        console.error('Container element not found')
        return
    }

    showLoadingScreen()

    const urls = imageIds.map(imageId =>
        getImageUrl(imageId, { format: 'webp' })
    )

    const { screen: numberToPreload } = calculateImagesToFitScreen()
    console.log('preloading first', numberToPreload, 'images')
    await preloadImages(urls.slice(0, numberToPreload))

    const galleryHTML = urls
        .map((url, index) => getImageMarkup(url, index, numberToPreload))
        .join('')

    appElement.innerHTML += `<div class='gallery'>${galleryHTML}</div>`
}

export function initImageAnime() {
    const imageAnime = () => {
        getImages().forEach(image => animeImage(image))
    }

    lenisManager.lenis.on('scroll', () => requestAnimationFrame(imageAnime))
    window.addEventListener('resize', () => requestAnimationFrame(imageAnime))
    return imageAnime
}

export async function preloadImagesRowByRow() {
    const { rows, screen } = calculateImagesToFitScreen()
    const imageRows = segmentIntoRows(
        Array.from(getImages()),
        rows
    ) as HTMLImageElement[][]
    const startingRowIndex = Math.ceil(screen / rows)
    for (let i = startingRowIndex; i < imageRows.length; i++) {
        const row = imageRows[i]
        const promises = row.map(img => {
            img.loading = 'eager'
            return img
                .decode()
                .catch(error => console.error('Error decoding image:', error))
        })

        await Promise.all(promises)
    }
}

function getImageMarkup(url: string, index: number, numberToPreload: number) {
    return `<div class='image-container'>
                <img src='${url}' alt='Image' ${
        index >= numberToPreload ? 'loading="lazy"' : ''
    }/>
            </div>`
}

async function preloadImages(urls: string[]): Promise<void> {
    try {
        await Promise.all(
            urls.map(async url => {
                const image = new Image()
                image.src = url
                return image
                    .decode()
                    .then(() =>
                        updateLoadingProgress(
                            current => current + 100 / urls.length
                        )
                    )
            })
        )
    } catch (e) {
        console.log(e)
    }
}

function animeImage(image: HTMLImageElement) {
    const imageContainer = image.parentElement
    if (!imageContainer || !image.naturalHeight) {
        // not loaded yet - animate on load
        image.onload = ({ target }) => animeImage(target as HTMLImageElement)
        return
    }
    const {
        height: containerHeight,
        top: containerTop,
        bottom: containerBottom,
    } = imageContainer.getBoundingClientRect()

    if (!image.style.height) {
        image.style.height = `${math.clamp(520, image.naturalHeight, 1000)}px`
    }

    const windowHeight = window.innerHeight

    // we don't need to animate images that are not visible
    if (!(containerBottom >= 0 && containerTop <= windowHeight)) return

    let progress =
        1 - (windowHeight - containerTop) / (windowHeight + containerHeight)
    const translate = progress * (containerHeight - image.clientHeight) * 1.05
    image.style.transform = `translate3d(-50%,${translate}px,0)`
}
