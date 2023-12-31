/*
(i) Код попадает в итоговый файл,
только когда вызвана функция,
например artFunctions.spollers();
Или когда импортирован весь файл,
например import "files/script.js";
Неиспользуемый (не вызванный)
код в итоговый файл не попадает.

Если мы хотим добавить модуль
следует его расскоментировать
*/

// Включить/выключить ART (в работе)
window['ART'] = true;

// Подключение основного файла стилей
import "../scss/style.scss";

// ========================================================================================================================================================================================================================================================
// Функционал ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as artFunctions from "./files/functions.js";

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
/* (i) необходимо для корректного отображения webp с css */
artFunctions.isWebp();
/* Добавление класса touch для HTML если браузер мобильный */
artFunctions.addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
//artFunctions.addLoadedClass();

/* Модуль для работы с меню (Бургер) */
artFunctions.menuInit();
/* Учет плавающей панели на мобильных устройствах при 100vh */
artFunctions.fullVHfix();

/* Модуль White and Dark mode */
artFunctions.modeInit();

// Функционал анимация текста .change-text__word
// Документация:
artFunctions.changeTextWord();

// ========================================================================================================================================================================================================================================================
// Работа по формами ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
// import * as artForms from "./files/forms/forms.js";

/* Динамический адаптив */
// import "./libs/dynamic_adapt.js";

// Ленивая (отложенная) загрузка картинок
// Документація плагіна: https://github.com/verlok/vanilla-lazyload
// Сниппет(HTML): imgl
// import './files/scroll/lazyload.js';


// Наблюдатель за объектами с атрибутом data-watch
// Сниппет(HTML):
// import './libs/watcher.js'



// Функции работы скролом
import * as artScroll from "./files/scroll/scroll.js";

// Плавная навигация по странице
// Документация:
artScroll.pageNavigation();

// Функционал добавления классов к хедеру во время прокрутки
// Документация:
artScroll.headerScroll();

// ========================================================================================================================================================================================================================================================

// Прочее ========================================================================================================================================================================================================================================================
/*
Модуль "Filter Gallery"
 Документация:
 Сниппетт (HTML):
*/
artFunctions.filterGallery();

// Отправка формы на почту Библиотека
// Документація: https://www.emailjs.com/
// Сніппет(HTML):
// import './libs/emaillibs.js'

/*
Модуль "EMAIL JS"
Документация: https://www.emailjs.com/
Сниппет (HTML):
*/
// artFunctions.libsForSendingFormsEmail();



// ========================================================================================================================================================================================================================================================

/* Подключаем файлы со своим кодом */
import "./files/script.js";
//============================================================================================================================================================================================================================================