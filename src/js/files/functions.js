// Подключение списка активных модулей
import { artModules } from "./modules.js";

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	// Проверка поддержки webp 
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

/* Проверка мобильного браузера */
export let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML, если мобильный браузер */
export function addTouchClass() {
	// Додавання класу _touch для HTML, якщо браузер мобільний
	if (isMobile.any()) document.documentElement.classList.add('touch');
}
// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
	if (!document.documentElement.classList.contains('loading')) {
		window.addEventListener("load", function () {
			setTimeout(function () {
				document.documentElement.classList.add('loaded');
			}, 0);
		});
	}
}
// Получение хеша по адресу сайта
export function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); }
}
// Указание хеша по адресу сайта
export function setHash(hash) {
	hash = hash ? `#${hash}` : window.location.href.split('#')[0];
	history.pushState('', '', hash);
}
// Учет плавающей панели на мобильных устройствах при 100vh
export function fullVHfix() {
	const fullScreens = document.querySelectorAll('[data-fullscreen]');
	if (fullScreens.length && isMobile.any()) {
		window.addEventListener('resize', fixHeight);
		function fixHeight() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
		fixHeight();
	}
}

// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
export let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Створюємо подію 
			document.dispatchEvent(new CustomEvent("slideUpDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
export let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Створюємо подію
			document.dispatchEvent(new CustomEvent("slideDownDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
export let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
// Вспомогательные модули блокировки прокрутки и прыжка ====================================================================================================================================================================================================================================================================================
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
export let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
export let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

// Модуль работы по меню (бургер) =======================================================================================================================================================================================================================
export function menuInit() {
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", function (e) {
			if (bodyLockStatus && e.target.closest('.icon-menu')) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
			}
		});
	};
}
export function menuOpen() {
	bodyLock();
	document.documentElement.classList.add("menu-open");
}
export function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove("menu-open");
}

// Модуль "Filter Gallery" https://www.youtube.com/watch?v=ATeWQlY3N04 =======================================================================================================================================================================================================================
export function filterGallery() {
	let filterList = document.querySelectorAll('.filter__button');
	let productBox = document.querySelectorAll('.card');
	if (filterList.length) {
		for (let i = 0; i < filterList.length; i++) {
			filterList[i].addEventListener('click', function () {
				for (let j = 0; j < filterList.length; j++) {
					filterList[j].classList.remove('active');
				}
				this.classList.add('active');
				let dataFilter = this.getAttribute('data-filter');
				for (let k = 0; k < productBox.length; k++) {
					productBox[k].classList.remove('active');
					productBox[k].classList.add('hiden');
					if (productBox[k].getAttribute('data-item') === dataFilter || dataFilter === 'all') {
						productBox[k].classList.remove('hiden');
						productBox[k].classList.add('active');
					}
				}
			})
		}
	}
}

// Модуль Темная и Светлая тема
export function modeInit() {
	//============ DARK LIGHT THEME ============================================================================================================================================
	// Switch function

	const switchTheme = () => {
		// Get root element and data-theme value
		const rootElem = document.documentElement;
		let dataTheme = rootElem.getAttribute('data-theme');
		let newTheme = rootElem.getAttribute('data-theme');
		newTheme = (dataTheme === 'light') ? 'dark' : 'light';
		// Set the new HTML attribute
		rootElem.setAttribute('data-theme', newTheme);
		// Set the new local storage item 
		localStorage.setItem('theme', newTheme);
	}
	//Add event listener for the theme switcher
	document.querySelector('#theme-switcher').addEventListener('click', switchTheme);


}

// Модуль анимация текста .change-text__word
export function changeTextWord() {
	let words = document.querySelectorAll('.change-text__word');
	words.forEach((word) => {
		let letters = word.textContent.split('');
		word.textContent = '';
		letters.forEach((letter) => {
			let span = document.createElement('span');
			span.textContent = letter;
			span.className = 'letter';
			word.append(span);
		});
	});
	let currentWordIndex = 0;
	let maxWordIndex = words.length - 1;
	words[currentWordIndex].style.opacity = '1';
	let changeText = () => {
		let currentWord = words[currentWordIndex];
		let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
		Array.from(currentWord.children).forEach((letter, i) => {
			setTimeout(() => {
				letter.className = 'letter out';
			}, i * 80);
		});
		nextWord.style.opacity = '1';
		Array.from(nextWord.children).forEach((letter, i) => {
			letter.className = 'letter behind';
			setTimeout(() => {
				letter.className = 'letter in';
			}, 340 + i * 80);
		});
		currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
	};
	changeText();
	setInterval(changeText, 3000)
}

// Модуль "показать еще" =======================================================================================================================================================================================================================
export function showMore() {
	const btnshowMoreCards = document.querySelector('.button-load');
	const hiddenCards = document.querySelectorAll('.js-hidden');
	let isHidden = true;

	if (btnshowMoreCards) {
		btnshowMoreCards.addEventListener("click", () => {
			btnshowMoreCards.textContent = isHidden
				? 'Hidden'
				: 'Load more';

			isHidden = !isHidden;
			hiddenCards.forEach(item => item.classList.toggle('js-hidden'));
		});
	};
}

// Модуль "EMAIL JS" =======================================================================================================================================================================================================================
export function libsForSendingFormsEmail() {
	const contactForm = document.getElementById('contact-form'),
		contactMessage = document.getElementById('contact-message');

	const sendEmail = (e) => {
		e.preventDefault()

		// serviceID - templateID - #form - publickKey
		emailjs.sendForm('service_4i46osd', 'template_qrrwmb7', '#contact-form', 'giOd1w371TjDW4QV3')
			.then(() => {
				// Show sent message
				contactMessage.textContent = 'Message sent successfully ✅';
				// Remove message after five seconds
				setTimeout(() => {
					contactMessage.textContent = ''
				}, 5000);
				// Clear input fields
				contactForm.reset()
			}, () => {
				// Show error message
				contactMessage.textContent = 'Message not sent (service error) ❌'
			})
	}

	contactForm.addEventListener('submit', sendEmail)
}

//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// ART (Full Logging System)
export function ART(message) {
	setTimeout(() => {
		if (window.ART) {
			console.log(message);
		}
	}, 0);
}
// Получить цифры из строки
export function getDigFromString(item) {
	return parseInt(item.replace(/[^\d]/g, ''))
}
// Форматування цифр типу 100 000 000
export function getDigFormat(item) {
	return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Убрать класс из всех элементов массива
export function removeClasses(array, className) {
	for (var i = 0; i < array.length; i++) {
		array[i].classList.remove(className);
	}
}
// Уникализация массива
export function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}
// Функция получения индекса внутри родителя
export function indexInParent(parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};
// Функция проверяет, видим ли объект видимый
export function isHidden(el) {
	return (el.offsetParent === null)
}
// Обработа медиа запросов из атрибутов 
export function dataMediaQueries(array, dataSetValue) {
	// Получение объектов с медиа запросами
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Инициализация объектов с медиа запросами
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получаем уникальные брейкпоинты
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Работаем с каждым брейкпоинтом
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}

//================================================================================================================================================================================================================================================================================================================