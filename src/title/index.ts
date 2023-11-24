import { lenisManager } from '../lenisManager'
import './style.css'
export function initTitle(elementId: string) {
	const parentElement = document.getElementById(elementId)
	if (!parentElement) {
		console.error('Element not found:', elementId)
		return
	}

	const title = document.createElement('h1')
	title.textContent = 'Lenis is kinda cool!'
	title.classList.add('centered-title')
	title.id = 'title'

	parentElement.appendChild(title)
	animateTitle()
}

function animateTitle() {
	console.log('animateTitle')
	lenisManager.lenis.on('scroll', () => {
		const title = document.getElementById('title')!
		const progress = lenisManager.lenis.scroll / lenisManager.lenis.limit
		const innerHeight = window.innerHeight
		const titleHeight = title.clientHeight
		let transform = progress * (innerHeight - titleHeight)
		transform *= 13.5
		title.style.transform = `translate3d(-50%,${transform}px,0)`
	})
}
