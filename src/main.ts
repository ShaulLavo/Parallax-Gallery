import './style.css'
import { lenisManager } from './lenis'
import { initializeScrollbar } from './scrollBar'
import { renderGallery, initImageAnime } from './gallery'
import { createLoadingScreen, hideLoadingScreen } from './loadingScreen'
import { isInfinite } from './constants'

const init = async () => {
    createLoadingScreen()
    const start = performance.now()
    await renderGallery('app')

    lenisManager.initLenis({ isInfinite })

    const anime = initImageAnime()
    requestAnimationFrame(anime)

    initializeScrollbar()
    lenisManager.lenis.scrollTo(0, { immediate: true })

    const end = performance.now()
    const elapsed = end - start
    console.log(`took ${elapsed} milliseconds to init.`)

    hideLoadingScreen()
}

init()
