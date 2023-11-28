import './style.css'

class Spinner {
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

    public updateProgress(progress: number): void
    public updateProgress(progressUpdater: (current: number) => number): void

    public updateProgress(
        progress: number | ((current: number) => number)
    ): void {
        if (typeof progress === 'function') {
            this.currentProgress = parseFloat(
                progress(this.currentProgress).toFixed(0)
            )
        } else {
            this.currentProgress = parseFloat(progress.toFixed(0))
        }

        this.currentProgress = Math.min(Math.max(this.currentProgress, 0), 100)
        this.progressElement.innerText = `${this.currentProgress}%`
    }

    public toggle(): void {
        if (this.spinnerElement.style.display === 'none') {
            this.show()
        } else {
            this.hide()
        }
    }

    public show(): void {
        this.container.style.display = 'flex'
    }

    public hide(): void {
        this.container.style.display = 'none'
    }
}

export const spinner = new Spinner()
