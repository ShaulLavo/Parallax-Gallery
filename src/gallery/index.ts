import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenisManager } from '../lenisManager'
import { math } from '../math'
import urls from '../images.json'
import { Spinner } from '../Spinner'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

export async function renderGallery(containerId: string) {
	const appElement = document.getElementById(containerId)
	if (!appElement) {
		console.error('Container element not found')
		return
	}
	const spinner = new Spinner()
	spinner.show()

	await preloadImages(urls)
	const galleryHTML = urls.map(url => getImageMarkup(url)).join('')

	spinner.hide()

	appElement.innerHTML = `<div class='gallery'>${galleryHTML}</div>`
}

function getImageMarkup(url: string) {
	return `<div class='image-container'>
                <img src='${url}' alt='Image' />
            </div>`
}

async function preloadImages(urls: string[]): Promise<void> {
	await Promise.all(
		urls.map(async url => {
			const img = new Image()
			img.src = url
			return img.decode()
		})
	)
}

export function initImageAnime() {
	const images = document.querySelectorAll('.gallery img') as NodeListOf<HTMLElement>

	const imageAnime = () => {
		images.forEach(image => {
			const imageContainer = image.parentElement
			imageContainer!.style.transition = 'opacity 2s ease-in-out'
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
}
