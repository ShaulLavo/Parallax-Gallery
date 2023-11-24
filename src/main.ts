import './style.css'
import { lenisManager } from './lenisManager'
import { initializeScrollbar } from './scrollBar'
import { renderGallery, initImageAnime } from './gallery'

let isInfinite = false

const init = async () => {
	lenisManager.initLenis({ isInfinite })
	await renderGallery('app')
	initImageAnime()
	!isInfinite && initializeScrollbar()
}

init()
