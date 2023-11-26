import { Cloudinary } from '@cloudinary/url-gen';
import { scale, limitFit } from '@cloudinary/url-gen/actions/resize';

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

type ImageFormat = 'png' | 'webp';

interface BaseImageOptions {
	width?: number;
	height?: number;
	format?: ImageFormat;
}


interface ImageDataFlags {
	includeHighQuality?: boolean;
	includeLimited?: boolean;
	includeLqip?: boolean;
}

type ImageDataOptions = BaseImageOptions & AtLeastOne<ImageDataFlags>;

interface ImageData {
	imageUrl?: string;
	limitedImageUrl?: string;
	lqipUrl?: string;
}


const cld = new Cloudinary({
	cloud: {
		cloudName: 'dp7akzaod'
	},
	url: {
		secure: true
	}
});

function getCld() {
	return cld;
}

function getImageUrl(imageId: string, options?: BaseImageOptions): string {
	const url = cld.image(imageId).quality('auto');

	if (options?.format) {
		url.format(options.format);
	} else {
		url.format('auto');
	}

	if (options?.width && options?.height) {
		url.resize(scale(options.width.toFixed(0), options.height.toFixed(0)));
	} else if (options?.width) {
		url.resize(scale(options.width.toFixed(0)));
	} else if (options?.height) {
		url.resize(scale(undefined, options.height.toFixed(0)));
	}

	return url.toURL();
}

function getLimitedImage(imageId: string, options: BaseImageOptions): string {
	const url = cld.image(imageId).quality('auto');

	if (options.format) {
		url.format(options.format);
	}

	if (options.width && options.height) {
		url.resize(limitFit(options.width.toFixed(0), options.height.toFixed(0)));
	} else if (options.width) {
		url.resize(limitFit(options.width.toFixed(0)));
	} else if (options.height) {
		url.resize(limitFit(undefined, options.height.toFixed(0)));
	}

	return url.toURL();
}

function getLqipUrl(imageId: string): string {
	return cld.image(imageId).resize(scale(150)).quality('auto:low').toURL();
}

function getImageData(imageId: string, options: ImageDataOptions): ImageData {
	const imageData: ImageData = {};

	if (options.includeHighQuality) {
		imageData.imageUrl = getImageUrl(imageId, options);
	}

	if (options.includeLimited) {
		imageData.limitedImageUrl = getLimitedImage(imageId, options);
	}

	if (options.includeLqip) {
		imageData.lqipUrl = getLqipUrl(imageId);
	}

	return imageData;
}


export { getCld, getImageUrl, getImageData, getLqipUrl, getLimitedImage };
export type { ImageData, BaseImageOptions, ImageDataOptions };
