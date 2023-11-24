export const getImageUrls = async (
	count: number,
	size: keyof UnsplashImage['urls']
): Promise<string[]> => {
	try {
		const cacheKey = `unsplash-images-${size}`
		const url = 'https://api.unsplash.com/photos/random'
		const secrets = (await import('./secret.ts').catch(console.log))?.secrets
		const accessKey = secrets?.UNSPLASH_ACCESS_KEY
		if (!accessKey) {
			const images = await import('./images.json')
			localStorage.setItem(cacheKey, JSON.stringify(images.default))
			return images.default
		}
		// Check local storage first
		const cachedData = localStorage.getItem(cacheKey)
		if (cachedData) {
			const cachedImages = JSON.parse(cachedData) as string[]
			if (cachedImages.length >= count) {
				return cachedImages.slice(0, count)
			}
		}

		// Fetch new images if necessary
		let images: string[] = cachedData ? JSON.parse(cachedData) : []
		let remainingCount = count - images.length
		while (remainingCount > 0) {
			const requestCount = Math.min(remainingCount, 30) // Unsplash API limit per request is 30
			const response = await fetch(`${url}?client_id=${accessKey}&count=${requestCount}`)
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			const data = (await response.json()) as UnsplashImage[]
			images = images.concat(data.map(image => image.urls[size]))
			remainingCount -= requestCount
		}

		// Update local storage
		localStorage.setItem(cacheKey, JSON.stringify(images))
		return images
	} catch (error) {
		console.error('Error fetching images from Unsplash:', error)
		return []
	}
}

interface UnsplashImage {
	id: string
	created_at: string // ISO date string
	updated_at: string // ISO date string
	promoted_at: string | null // ISO date string or null
	width: number
	height: number
	color: string // Hex color code
	blur_hash: string
	description: string | null
	alt_description: string | null
	urls: {
		raw: string
		full: string
		regular: string
		small: string
		thumb: string
	}
	links: {
		self: string
		html: string
		download: string
		download_location: string
	}
	categories: string[]
	likes: number
	liked_by_user: boolean
	current_user_collections: Array<any> // Array of user's collections that this photo is a part of
}
