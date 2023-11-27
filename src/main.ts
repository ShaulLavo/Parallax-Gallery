import './style.css';
import { lenisManager } from './lenisManager';
import { initializeScrollbar } from './scrollBar';
import { renderGallery, initImageAnime } from './gallery';
import { spinner } from './Spinner';

let isInfinite = false;

const init = async () => {
	const start = performance.now();
	await renderGallery('app');
	lenisManager.initLenis({ isInfinite });
	const anime = initImageAnime();
	!isInfinite && initializeScrollbar();
	lenisManager.lenis.scrollTo(0, { immediate: true });
	requestAnimationFrame(anime);
	const end = performance.now();
	const elapsed = end - start;
	setTimeout(() => spinner.hide(), 10);

	console.log(`took ${elapsed} milliseconds to init.`);
};

init();
