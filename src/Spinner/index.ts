import './style.css'

export class Spinner {
	private container: HTMLDivElement
	private spinnerElement: HTMLDivElement
	private progressElement: HTMLDivElement
	private currentProgress: number = 0

	constructor() {
		// Container for both spinner and progress
		this.container = document.createElement('div')
		this.container.className = 'spinner-container'

		this.spinnerElement = document.createElement('div')
		this.spinnerElement.className = 'spinner'
		this.container.appendChild(this.spinnerElement)

		this.progressElement = document.createElement('div')
		this.progressElement.className = 'progress'
		this.container.appendChild(this.progressElement)

		document.body.appendChild(this.container)
		this.hide()
	}

	// Overloaded method signatures
	updateProgress(progress: number): void
	updateProgress(progressUpdater: (current: number) => number): void

	updateProgress(progress: any): void {
		if (typeof progress === 'function') {
			this.currentProgress = progress(this.currentProgress).toFixed(0)
		} else {
			this.currentProgress = progress.toFixed(0)
		}

		this.currentProgress = Math.min(Math.max(this.currentProgress, 0), 100)
		this.progressElement.innerText = `${this.currentProgress}%`
	}

	toggle(): void {
		if (this.spinnerElement.style.display === 'none') {
			this.show()
		} else {
			this.hide()
		}
	}

	show(): void {
		this.container.style.display = 'flex'
	}

	hide(): void {
		this.container.style.display = 'none'
	}
}
