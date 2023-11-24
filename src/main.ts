import './style.css'
import { lenisManager } from './lenisManager'
import { initializeScrollbar } from './scrollBar'
import { renderGallery, initImageAnime } from './gallery'

let isInfinite = false

lenisManager.initLenis({ isInfinite })
await renderGallery('gallery')
initImageAnime()
!isInfinite && initializeScrollbar()
