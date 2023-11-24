import './style.css'

import Lenis from '@studio-freight/lenis'

export const lenisManager = {
	instance: null as Lenis | null,

	initLenis(options: { duration?: number; isInfinite?: boolean } = {}) {
		const { duration = 1.1, isInfinite = true } = options
		this.instance = new Lenis({
			duration,
			infinite: isInfinite,
			normalizeWheel: true,
			wheelMultiplier: 1.6,
			lerp: 0.2
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
	}
}
