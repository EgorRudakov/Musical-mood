import playerState from './playerState.js';
import {
  updatePlayPauseIcon,
  updateTrackInfo,
  updateSeekBar,
  updateTimeDisplay,
} from './uiController.js';

// Воспроизведение трека
export const playTrack = (track, index = null) => {
  if (!track || !track.trackAudio) return;

  // Останавливаем текущий трек
  playerState.audioPlayer.pause();
  playerState.audioPlayer.currentTime = 0;

  // Устанавливаем новый трек
  playerState.audioPlayer.src = track.trackAudio;
  playerState.audioPlayer.volume = playerState.volume;

  // Обновляем индекс если передан
  if (index !== null) {
    playerState.currentTrackIndex = index;
  }

  // Воспроизводим
  playerState.audioPlayer
    .play()
    .then(() => {
      playerState.isPlaying = true;
      updatePlayPauseIcon();
      updateTrackInfo(track);
    })
    .catch((error) => {
      console.error('Ошибка воспроизведения:', error);
      playerState.isPlaying = false;
      updatePlayPauseIcon();
    });
};

// Play/Pause
export const playPauseTrack = () => {
  if (!playerState.audioPlayer.src) return;

  if (playerState.isPlaying) {
    playerState.audioPlayer.pause();
    playerState.isPlaying = false;
  } else {
    playerState.audioPlayer
      .play()
      .then(() => {
        playerState.isPlaying = true;
      })
      .catch((error) => {
        console.error('Ошибка воспроизведения:', error);
        playerState.isPlaying = false;
      });
  }
  updatePlayPauseIcon();
};

// Предыдущий трек
export const playPreviousTrack = () => {
  if (playerState.trackList.length === 0) return;

  playerState.currentTrackIndex =
    playerState.currentTrackIndex > 0
      ? playerState.currentTrackIndex - 1
      : playerState.trackList.length - 1;

  const track = playerState.trackList[playerState.currentTrackIndex];
  playTrack(track);
};

// Следующий трек
export const playNextTrack = () => {
  if (playerState.trackList.length === 0) return;

  playerState.currentTrackIndex =
    playerState.currentTrackIndex < playerState.trackList.length - 1
      ? playerState.currentTrackIndex + 1
      : 0;

  const track = playerState.trackList[playerState.currentTrackIndex];
  playTrack(track);
};

// Установка громкости
export const setVolume = (volume) => {
  playerState.volume = Math.max(0, Math.min(1, volume));
  playerState.audioPlayer.volume = playerState.volume;
};

// Установка времени воспроизведения
export const setCurrentTime = (time) => {
  if (playerState.audioPlayer.duration) {
    const newTime = Math.max(
      0,
      Math.min(playerState.audioPlayer.duration, time)
    );
    playerState.audioPlayer.currentTime = newTime;
    playerState.currentTime = newTime;
  }
};

// Инициализация аудио обработчиков
const initAudioEventListeners = () => {
  playerState.audioPlayer.addEventListener('timeupdate', () => {
    playerState.currentTime = playerState.audioPlayer.currentTime;
    updateSeekBar();
  });

  playerState.audioPlayer.addEventListener('durationchange', () => {
    playerState.duration = playerState.audioPlayer.duration;
    updateTimeDisplay();
  });

  playerState.audioPlayer.addEventListener('ended', () => {
    playNextTrack();
  });

  playerState.audioPlayer.addEventListener('loadstart', () => {
    updateTimeDisplay();
  });

  playerState.audioPlayer.addEventListener('canplaythrough', () => {
    updateTimeDisplay();
  });
};

// Инициализируем обработчики при загрузке модуля
initAudioEventListeners();
