import data from './data.js';
import playerState from './playerState.js';
import { formatTrackTime } from './api.js';

// Обновление иконки Play/Pause
export const updatePlayPauseIcon = () => {
  const playIcon = data.iconPlay;
  const pauseIcon = data.iconPause;

  if (playIcon && pauseIcon) {
    if (playerState.isPlaying) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  }
};

// Обновление полосы прогресса
export const updateSeekBar = () => {
  if (!data.seekBar || !playerState.audioPlayer.duration) return;

  const progress = (playerState.currentTime / playerState.duration) * 100;
  data.seekBar.value = progress;

  // Обновляем визуальный стиль полосы прогресса
  data.seekBar.style.background = `rgba(255, 255, 255, 0.31) linear-gradient(to right, #ffa501 ${progress}%, transparent ${progress}%)`;

  // Обновляем время
  updateTimeDisplay();
};

// Обновление отображения времени
export const updateTimeDisplay = () => {
  if (data.currentTimeSpan) {
    data.currentTimeSpan.textContent = formatTrackTime(playerState.currentTime);
  }
  if (data.durationSpan && playerState.duration) {
    data.durationSpan.textContent = formatTrackTime(playerState.duration);
  }
};

// Обновление информации о треке
export const updateTrackInfo = (track) => {
  if (!track) return;

  if (data.songName) {
    data.songName.textContent = track.trackName;
  }
  if (data.songArtist) {
    data.songArtist.textContent = track.artistName;
  }
  if (data.songYear) {
    data.songYear.textContent = track.releaseData.split('-')[0];
  }
  if (data.songImage) {
    data.songImage.src = track.trackImage;
    data.songImage.alt = track.trackName;
  }
};

// Обновление громкости UI
export const updateVolumeUI = () => {
  if (!data.volSeekBar) return;

  const volumePercent = playerState.volume * 100;
  data.volSeekBar.value = volumePercent;

  // Обновляем визуальный стиль полосы громкости
  data.volSeekBar.style.background = `rgba(255, 255, 255, 0.31) linear-gradient(to right, #ffa501 ${volumePercent}%, transparent ${volumePercent}%)`;
};

// Показ/скрытие слайдера громкости
export const toggleVolumeSlider = () => {
  if (data.volumeSliderClass && data.volSeekBar) {
    data.volumeSliderClass.classList.toggle('visible');
    data.volSeekBar.classList.toggle('visible');
  }
};
