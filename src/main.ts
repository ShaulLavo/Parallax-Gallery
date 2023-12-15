import './style.css'
import { lenisManager } from './components/lenisManager'
import { initializeScrollbar } from './components/scrollBar'
import { renderGallery, initImageAnime } from './components/gallery'
import {
    createLoadingScreen,
    hideLoadingScreen,
} from './components/loadingScreen'
import { isInfinite } from './utilities/constants'

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
