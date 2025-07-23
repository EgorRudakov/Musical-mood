import { fetchTracks, formatTrackTime } from './api.js';
import data from './data.js';
import playerState from './playerState.js';
import { playTrack } from './player.js';

// Функция для рендеринга треков
const renderTracks = (tracks) => {
  if (!tracks || tracks.length === 0 || !data.audioSliderWrapper) return;

  // Сохраняем треки в состоянии плеера
  playerState.trackList = tracks;

  const trackListHTML = tracks
    .map((track, index) => {
      const trackTime = formatTrackTime(track.duration);
      return `
        <div class="audio-slider__slide swiper-slide">
          <div class="audio-slider__item">
            <div class="audio-slider__info info">
              <button class="info__button-icon-play button--centered" 
                      aria-label="Воспроизвести ${track.trackName}" 
                      data-index="${index}">
                <img class="info__track-image" 
                     src="${track.trackImage}" 
                     alt="${track.trackName}" 
                     height="42" 
                     width="42" />
              </button>
              <div class="info__performer-title">
                <h3 class="info__track-name">${track.trackName}</h3>
                <p class="info__track-artist">${track.artistName}</p>
                <span class="info__track-time">${trackTime}</span>
              </div>
            </div>
            <div class="audio-slider__actions">
              <button class="audio-slider__button button-show-similar button--centered">
                <svg class="audio-slider__icon icon">
                  <use xlink:href="./src/assets/sprites.svg#show-similar"></use>
                </svg>
              </button>
              <button class="audio-slider__button button-add-to-my-music button--centered">
                <svg class="icon__add-to-my-music icon">
                  <use xlink:href="./src/assets/sprites.svg#add-to-my-music"></use>
                </svg>
              </button>
              <div class="audio-slider__menu">
                <button class="audio-slider__button button-menu button--centered">
                  <svg class="icon__popular-menu icon">
                    <use xlink:href="./src/assets/sprites.svg#frame"></use>
                  </svg>
                </button>
                <ul display="none" class="button-menu__list"></ul>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  data.audioSliderWrapper.innerHTML = trackListHTML;

  // Добавляем обработчики событий для кнопок воспроизведения
  addTrackEventListeners();
};

// Добавление обработчиков событий для треков
const addTrackEventListeners = () => {
  const playButtons = document.querySelectorAll('.info__button-icon-play');

  playButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const index = parseInt(e.currentTarget.dataset.index);
      const track = playerState.trackList[index];

      if (track) {
        playTrack(track, index);
      }
    });
  });
};

// Инициализация загрузки треков
export const initPopularTracks = async () => {
  try {
    const tracks = await fetchTracks();

    if (tracks && tracks.length > 0) {
      renderTracks(tracks);
      console.log('Треки загружены:', tracks.length);
    } else {
      console.warn('Треки не найдены');
    }
  } catch (error) {
    console.error('Ошибка загрузки треков:', error);
  }
};
