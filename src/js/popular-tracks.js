import data from './data.js'
import { createTrackList, fetchTracks } from './api.js';

// let trackList;

fetchTracks().then((tracks) => {
  const trackList = createTrackList(tracks);

  const trackListHTML = trackList
    .map((track, index) => {
      return `
						<div class="audio-slider__slide swiper-slide">
							<div class="audio-slider__item">
								<div class="audio-slider__info info">
									<button class="info__button-icon-play button--centered" aria-label='Воспроизвести' data-index="${index}">
											<img
												class="info__track-image"
												src="${track.trackImage}"
												alt="Track"
												height="42"
												width="42"
											/>
									</button>
									<div class="info__performer-title">
										<h3 class="info__track-name">${track.track_name}</h3>
										<p class="info__track-artist">${track.artist_id}</p>
										<span class="info__track-time">${track.trackTime}</span>
									</div>
								</div>
								<div class="audio-slider__actions">
									<button
										class="audio-slider__button button-show-similar button--centered"
									>
										<svg class="audio-slider__icon icon">
											<use
												xlink:href="./src/assets/sprites.svg#show-similar"
											></use>
										</svg>
									</button>
									<button
										class="audio-slider__button button-add-to-my-music button--centered"
									>
										<svg class="icon__add-to-my-music icon">
											<use
												xlink:href="./src/assets/sprites.svg#add-to-my-music"
											></use>
										</svg>
									</button>
									<div class="audio-slider__menu">
										<button
											class="audio-slider__button button-menu button--centered"
										>
											<svg class="icon__popular-menu icon">
												<use
													xlink:href="./src/assets/sprites.svg#frame"
												></use>
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

  let audio = new Audio();
  let isPlaying = false;

	function ButtonPlayPausePlyer() {

	}

  function togglePlayPauseIcon(isPlaying) {
    // const controlsButton = document.getElementById('button-play-pause');
    // const iconPlay = controlsButton.querySelector('.icon__play');
    // const iconPause = controlsButton.querySelector('.icon__pause');
    if (isPlaying) {
      data.iconPlay.style.display = 'none';
      data.iconPause.style.display = 'block';
    } else {
      data.iconPlay.style.display = 'block';
      data.iconPause.style.display = 'none';
    }
  }

  // Получаем все кнопки и добавляем обработчики событий

  const playButtons = document.querySelectorAll('.info__button-icon-play');

  playButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.currentTarget.dataset.index;
			
      if (trackList[index] && trackList[index].trackAudio) {
				const audio = new Audio(trackList[index].trackAudio);
        createAudioPlayer(audio);
      }
    });

    function createAudioPlayer(audioSrc) {
      if (!isPlaying) {
        audio = audioSrc;
        audio.play();
        isPlaying = true;
      } else {
        audio.pause();
        isPlaying = false;
      }
      togglePlayPauseIcon(isPlaying);
    }
  });
});
