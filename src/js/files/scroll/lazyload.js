import LazyLoad from "vanilla-lazyload";

// Работает с объектами с классом ._lazy
const lazyMedia = new LazyLoad({
	elements_selector: '[data-src],[data-srcset]',
	class_loaded: '_lazy-loaded',
	use_native: true
});

// Обновить модуль
lazyMedia.update();