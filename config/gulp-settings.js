// Получаем имя папки проект
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

// Пути в папку с исходными данными и папку с результатом
const buildFolder = `./dist`;
const srcFolder = `./src`;

// Пути к папкам и файлам проекта
export const path = {
	build: {
		html: `${buildFolder}/`,
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`
	},
	src: {
		html: `${srcFolder}/*.html`,
		pug: `${srcFolder}/pug/*.pug`,
		js: `${srcFolder}/js/app.js`,
		scss: `${srcFolder}/scss/style.scss`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		fonts: `${srcFolder}/fonts/*.*`,
		files: `${srcFolder}/files/**/*.*`,
		svgicons: `${srcFolder}/svgicons/*.svg`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	rootFolder: rootFolder,
	srcFolder: srcFolder,
	// Путь к нужной папке на удаленном сервере.
	ftp: ``
	// Пример: загрузить в папку 2022 далее в папку с названием проекта
	// ftp: `2023/${rootFolder}`
};

// Настройка FTP соединения
export const configFTP = {
	host: "", // Адрес FTP сервера
	user: "", // Имя пользователя
	password: "", // Пароль
	parallel: 5 // Количество одновременных потоков
}