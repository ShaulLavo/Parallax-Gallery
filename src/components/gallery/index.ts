import { updateLoadingProgress, showLoadingScreen } from '../loadingScreen'
import { getImageUrl } from '../../utilities/cloudinary'
import { imageIds } from '../../utilities/constants'
import { lenisManager } from '../lenisManager'
import { math } from '../../utilities/math'
import { calculateImagesToFitScreen } from '../../utilities/utils'
import './style.css'

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

    const numberToPreload = calculateImagesToFitScreen()
    console.log('preloading first', numberToPreload, 'images')
    await preloadImages(urls.slice(0, numberToPreload))

    const galleryHTML = urls
        .map((url, index) => getImageMarkup(url, index, numberToPreload))
        .join('')

    appElement.innerHTML += `<div class='gallery'>${galleryHTML}</div>`
}

export function initImageAnime() {
    const imageAnime = () => {
        const images = document.querySelectorAll(
            '.gallery img'
        ) as NodeListOf<HTMLElement>
        images.forEach(image => animeImage(image as HTMLImageElement))
    }

    lenisManager.lenis.on('scroll', () => requestAnimationFrame(imageAnime))
    window.addEventListener('resize', () => requestAnimationFrame(imageAnime))
    return imageAnime
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
