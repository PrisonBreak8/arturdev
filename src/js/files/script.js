// Подключение функционала "Artur-Start"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { artModules } from "./modules.js";

//========================================================================================================================================================
const getItemOffset = (item) => {
	return item.offsetTop;
};
const toggleActive = (e) => {
	e.preventDefault();
	// Remove any existing active classes
	const links = document.querySelectorAll('.menu__item');

	links.forEach((link => link.classList.remove('is-active')));
	// Add class to active link
	const activeItem = e.target.parentElement
	activeItem.classList.toggle('is-active');
	const offset = getItemOffset(activeItem);
	// Attach click event listener
}
const menu = document.querySelector('.menu__list');
menu.addEventListener('click', toggleActive);























