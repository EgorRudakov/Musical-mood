import './js/swiper.js';
import './scss/main.scss';
import { initControls } from './js/controls.js';
import { initPopularTracks } from './js/popular-tracks.js';

// Инициализация приложения
const initApp = () => {
  console.log('Инициализация музыкального плеера...');

  // Инициализируем элементы управления
  initControls();

  // Загружаем популярные треки
  initPopularTracks();

  console.log('Плеер инициализирован');
};

// Запуск приложения после загрузки DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
