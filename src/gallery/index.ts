import { Spinner } from '../Spinner'
import urls from '../images.json'
import { lenisManager } from '../lenisManager'
import { math } from '../math'
import './style.css'

const spinner = new Spinner()
export async function renderGallery(containerId: string) {
	const appElement = document.getElementById(containerId)
	if (!appElement) {
		console.error('Container element not found')
		return
	}

	spinner.show()
	spinner.updateProgress(0)

	// initTitle(containerId)

	await preloadImages(urls)
	const galleryHTML = urls.map(url => getImageMarkup(url)).join('')

	spinner.hide()

	appElement.innerHTML += `<div class='gallery'>${galleryHTML}</div>`
}

function getImageMarkup(url: string) {
	return `<div class='image-container'>
                <img src='${url}' alt='Image' />
            </div>`
}

async function preloadImages(urls: string[]): Promise<void> {
	try{
	await Promise.all(
		urls.map(async url => {
			const img = new Image()
			img.src = url
			return img.decode().then(() => spinner.updateProgress(current => current + 100 / urls.length))
		})
	)
	}catch(e){console.log(e)}
}

export function initImageAnime() {
	const images = document.querySelectorAll('.gallery img') as NodeListOf<HTMLElement>

	const imageAnime = () => {
		images.forEach(image => {
			const imageContainer = image.parentElement
			if (!imageContainer) return

			const {
				height: containerHeight,
				top: containerTop,
				bottom: containerBottom
			} = imageContainer.getBoundingClientRect()
			image.style.height = `${math.clamp(520, image.clientHeight, 1000)}px`

			const windowHeight = window.innerHeight

			let progress = 0
			if (containerBottom >= 0 && containerTop <= windowHeight) {
				progress = (windowHeight - containerTop) / (windowHeight + containerHeight)
			} else if (containerTop > windowHeight) {
				progress = 1
			}
			progress = Math.max(0, Math.min(1, progress))
			progress = 1 - progress
			// console.log('progress', progress)
			const translate = progress * (containerHeight - image.clientHeight)
			image.style.transform = `translate3d(-50%,${translate}px,0)`
		})
	}
	imageAnime()
	lenisManager.lenis.on('scroll', imageAnime)
	document.addEventListener('resize', imageAnime)
}
