import { linear } from '../../utilities/easing'
import { throttle } from '../../utilities/utils'
import './style.css'

import Lenis from '@studio-freight/lenis'

export const lenisManager = {
    instance: null as Lenis | null,

    initLenis(options: { duration?: number; isInfinite?: boolean } = {}) {
        const { duration = 1.1, isInfinite = true } = options
        this.instance = new Lenis({
            duration,
            lerp: 0.4,
            infinite: isInfinite,
            syncTouch: true,
            wheelMultiplier: 1.6,
            easing: linear,
        })
        this.instance.emit()

        const raf = (time: number) => {
            this.instance!.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    },

    get lenis() {
        if (!this.instance) throw Error('Lenis not initialized')
        return this.instance
    },

    onScrollThrottled(callback: (scroll: number) => void) {
        lenisManager.lenis.on('scroll', throttle(callback, 10))
    },
}
