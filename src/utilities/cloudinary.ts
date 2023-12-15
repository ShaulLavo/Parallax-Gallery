import { Cloudinary } from '@cloudinary/url-gen'
import { blur } from '@cloudinary/url-gen/actions/effect'
import { scale, limitFit } from '@cloudinary/url-gen/actions/resize'

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

type ImageFormat = 'png' | 'webp' | 'auto'

interface BaseImageOptions {
    width?: number
    height?: number
    format?: ImageFormat
}

interface ImageDataFlags {
    includeHighQuality?: boolean
    includeLimited?: boolean
    includeLqip?: boolean
}

type ImageDataOptions = BaseImageOptions & AtLeastOne<ImageDataFlags>

interface ImageData {
    imageUrl?: string
    limitedImageUrl?: string
    lqipUrl?: string
}

const cld = new Cloudinary({
    cloud: {
        cloudName: 'dp7akzaod',
    },
    url: {
        secure: true,
    },
})

function getCld() {
    return cld
}

function getImageUrl(imageId: string, options?: BaseImageOptions): string {
    const url = cld.image(imageId).quality('auto')
    if (options?.format) {
        url.format(options.format)
    } else {
        url.format('auto')
    }

    if (options?.width && options?.height) {
        url.resize(scale(options.width.toFixed(0), options.height.toFixed(0)))
    } else if (options?.width) {
        url.resize(scale(options.width.toFixed(0)))
    } else if (options?.height) {
        url.resize(scale(undefined, options.height.toFixed(0)))
    }

    return url.toURL()
}

function getLimitedImage(imageId: string, options: BaseImageOptions): string {
    const url = cld.image(imageId).quality('auto')

    if (options.format) {
        url.format(options.format)
    }

    if (options.width && options.height) {
        url.resize(
            limitFit(options.width.toFixed(0), options.height.toFixed(0))
        )
    } else if (options.width) {
        url.resize(limitFit(options.width.toFixed(0)))
    } else if (options.height) {
        url.resize(limitFit(undefined, options.height.toFixed(0)))
    }

    return url.toURL()
}

function getLqipUrl(imageId: string, resize?: number): string {
    const url = cld.image(imageId)
    if (resize) url.resize(scale(150))
    url.quality('auto:low')
    url.format('auto')
    url.effect(blur(100))
    return url.toURL()
}

export { getCld, getImageUrl, getLqipUrl, getLimitedImage }
export type { ImageData, BaseImageOptions, ImageDataOptions }
