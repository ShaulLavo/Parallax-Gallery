import './style.css'

let loadingContainer: HTMLDivElement
let loadingScreenElement: HTMLDivElement
let progressElement: HTMLDivElement
let currentProgress = 0

function createLoadingScreen() {
    loadingContainer = document.createElement('div')
    loadingContainer.className = 'loading-container'

    loadingScreenElement = document.createElement('div')
    loadingScreenElement.className = 'loading-screen'
    loadingContainer.appendChild(loadingScreenElement)

    progressElement = document.createElement('div')
    progressElement.className = 'progress'
    loadingContainer.appendChild(progressElement)

    document.body.appendChild(loadingContainer)
    hideLoadingScreen()
}

function updateLoadingProgress(progress: number): void
function updateLoadingProgress(
    progressUpdater: (current: number) => number
): void
function updateLoadingProgress(
    progress: number | ((current: number) => number)
): void {
    if (typeof progress === 'function') {
        currentProgress = parseFloat(progress(currentProgress).toFixed(0))
    } else {
        currentProgress = parseFloat(progress.toFixed(0))
    }

    currentProgress = Math.min(Math.max(currentProgress, 0), 100)
    progressElement.innerText = `${currentProgress}%`
}

function toggleLoadingScreen(): void {
    if (loadingScreenElement.style.display === 'none') {
        showLoadingScreen()
    } else {
        hideLoadingScreen()
    }
}

function showLoadingScreen(): void {
    loadingContainer.style.display = 'flex'
}

function hideLoadingScreen(): void {
    loadingContainer.style.display = 'none'
}

export {
    createLoadingScreen,
    updateLoadingProgress,
    toggleLoadingScreen,
    showLoadingScreen,
    hideLoadingScreen,
}
