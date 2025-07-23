import data from './data.js';
import playerState from './playerState.js';
import {
  playPauseTrack,
  playPreviousTrack,
  playNextTrack,
  setVolume,
  setCurrentTime,
} from './player.js';
import { toggleVolumeSlider, updateVolumeUI } from './uiController.js';

// Инициализация обработчиков кнопок управления
export const initControls = () => {
  // Кнопка Play/Pause
  if (data.playPauseBtn) {
    data.playPauseBtn.addEventListener('click', playPauseTrack);
  }

  // Кнопка предыдущего трека
  if (data.previousTrackBtn) {
    data.previousTrackBtn.addEventListener('click', playPreviousTrack);
  }

  // Кнопка следующего трека
  if (data.nextTrackBtn) {
    data.nextTrackBtn.addEventListener('click', playNextTrack);
  }

  // Кнопка громкости
  if (data.volumeButton) {
    data.volumeButton.addEventListener('click', toggleVolumeSlider);
  }

  // Слайдер громкости
  if (data.volSeekBar) {
    data.volSeekBar.addEventListener('input', (e) => {
      const volume = parseFloat(e.target.value) / 100;
      setVolume(volume);
      updateVolumeUI();
    });

    data.volSeekBar.addEventListener('mouseover', () => {
      showOutputPower(data.volOutputPower);
    });

    data.volSeekBar.addEventListener('mouseout', () => {
      hideOutputPower(data.volOutputPower);
    });

    data.volSeekBar.addEventListener('input', () => {
      updateSliderUI(data.volSeekBar, data.volOutputPower);
    });
  }

  // Слайдер прогресса трека
  if (data.seekBar) {
    data.seekBar.addEventListener('input', (e) => {
      if (playerState.audioPlayer.duration) {
        const time =
          (parseFloat(e.target.value) / 100) * playerState.audioPlayer.duration;
        setCurrentTime(time);
      }
    });

    data.seekBar.addEventListener('mouseover', () => {
      showOutputPower(data.outputPower);
    });

    data.seekBar.addEventListener('mouseout', () => {
      hideOutputPower(data.outputPower);
    });

    data.seekBar.addEventListener('input', () => {
      updateSliderUI(data.seekBar, data.outputPower);
    });
  }

  // Инициализация UI громкости
  updateVolumeUI();
};

// Показать индикатор значения
const showOutputPower = (outputPower) => {
  if (outputPower) {
    outputPower.style.opacity = '1';
    outputPower.style.transition = 'opacity 0.4s';
  }
};

// Скрыть индикатор значения
const hideOutputPower = (outputPower) => {
  if (outputPower) {
    outputPower.style.opacity = '0';
    outputPower.style.transition = 'opacity 0.4s';
  }
};

// Обновление UI слайдера
const updateSliderUI = (slider, outputPower) => {
  if (!slider || !outputPower) return;

  const value = parseFloat(slider.value);
  const percentage = Math.round(
    ((value - slider.min) / (slider.max - slider.min)) * 100
  );

  // Обновляем фон слайдера
  slider.style.background = `rgba(255, 255, 255, 0.31) linear-gradient(to right, #ffa501 ${percentage}%, transparent ${percentage}%)`;

  // Обновляем текст индикатора
  outputPower.textContent = `${percentage}%`;

  // Позиционирование индикатора
  updateOutputPowerPosition(slider, outputPower);
};

// Позиционирование индикатора значения
const updateOutputPowerPosition = (slider, outputPower) => {
  if (!slider || !outputPower) return;

  const sliderRect = slider.getBoundingClientRect();
  const value = parseFloat(slider.value);
  const percentage = ((value - slider.min) / (slider.max - slider.min)) * 100;

  const thumbPosition = (percentage / 100) * sliderRect.width;
  const outputPowerWidth = outputPower.offsetWidth;

  let leftPosition = thumbPosition - outputPowerWidth / 2;

  // Корректировки для разных слайдеров
  if (outputPower === data.outputPower) {
    leftPosition += 27;
    if (percentage >= 85) leftPosition -= 47;
    if (percentage >= 100) leftPosition -= 7;
  } else if (outputPower === data.volOutputPower) {
    leftPosition += 35;
    if (percentage >= 50) leftPosition -= 50;
    if (percentage >= 85) leftPosition -= 2;
  }

  outputPower.style.left = `${40 + leftPosition}px`;

  // Обновляем border-radius
  const borderRadius =
    percentage <= 84
      ? '150px 150px 150px 0px / 150px 150px 150px 88px'
      : '150px 150px 0px 150px';

  outputPower.style.borderRadius = borderRadius;
};
