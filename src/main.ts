import './style.css'
import { lenisManager } from './lenisManager'
import { initializeScrollbar } from './scrollBar'
import { renderGallery, initImageAnime } from './gallery'
import { spinner } from './Spinner'
import { imageIds, isInfinite } from './constants'

const init = async () => {
    console.log('starting a', imageIds.length, 'image gallery')
    const start = performance.now()

    await renderGallery('app')

    lenisManager.initLenis({ isInfinite })
    const anime = initImageAnime()

    initializeScrollbar()
    lenisManager.lenis.scrollTo(0, { immediate: true })
    requestAnimationFrame(anime)

    const end = performance.now()
    const elapsed = end - start
    spinner.hide()

    console.log(`took ${elapsed} milliseconds to init.`)
}

init()
