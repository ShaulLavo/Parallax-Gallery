import './style.css'

export class Spinner {
	private spinnerElement: HTMLDivElement
	private progressElement: HTMLDivElement

	constructor() {
		this.spinnerElement = document.createElement('div')
		this.spinnerElement.className = 'spinner'

		this.progressElement = document.createElement('div')
		this.progressElement.className = 'progress'
		this.spinnerElement.appendChild(this.progressElement)

		document.body.appendChild(this.spinnerElement)
		this.hide()
	}

	updateProgress(progress: number): void {
		this.progressElement.innerText = `${Math.min(Math.max(progress, 0), 100)}%`
	}

	toggle(): void {
		if (this.spinnerElement.style.display === 'none') {
			this.show()
		} else {
			this.hide()
		}
	}

	show(): void {
		this.spinnerElement.style.display = 'flex'
	}

	hide(): void {
		this.spinnerElement.style.display = 'none'
	}
}
