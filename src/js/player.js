let currentTrackIndex = 0;
let audioPlayer = null;
let isPlaying = false;
let volume = 0.5;
let currentTime = 0;

// Функция для переключения на предыдущий трек
const playPreviousTrack = () => {
  if (currentTrackIndex > 0) {
    currentTrackIndex--;
    playTrack(trackList[currentTrackIndex]);
  } else {
    console.log('Это первый трек в списке');
  }
};

// Функция для воспроизведения или паузы трека
const playPauseTrack = () => {
  if (audioPlayer) {
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    isPlaying = !isPlaying;
  } else {
    console.log('Нет активного трека для воспроизведения');
  }
};

// Функция для переключения на следующий трек
const playNextTrack = () => {
  if (currentTrackIndex < trackList.length - 1) {
    currentTrackIndex++;
    playTrack(trackList[currentTrackIndex]);
  } else {
    console.log('Это последний трек в списке');
  }
};

// Функция для уменьшения громкости
const decreaseVolume = () => {
  if (audioPlayer) {
    volume = Math.max(volume - 0.1, 0);
    audioPlayer.volume = volume;
  } else {
    console.log('Нет активного трека для изменения громкости');
  }
};

// Функция для увеличения громкости
const increaseVolume = () => {
  if (audioPlayer) {
    volume = Math.min(volume + 0.1, 1);
    audioPlayer.volume = volume;
  } else {
    console.log('Нет активного трека для изменения громкости');
  }
};

// Функция для перемотки трека назад
const rewindBackward = () => {
  if (audioPlayer) {
    currentTime = Math.max(currentTime - 10, 0);
    audioPlayer.currentTime = currentTime;
  } else {
    console.log('Нет активного трека для перемотки');
  }
};

// Функция для перемотки трека вперед
const rewindForward = () => {
  if (audioPlayer) {
    currentTime = Math.min(currentTime + 10, audioPlayer.duration);
    audioPlayer.currentTime = currentTime;
  } else {
    console.log('Нет активного трека для перемотки');
  }
};

// Функция для воспроизведения трека
// const playTrack = (track) => {
//   if (audioPlayer) {
//     audioPlayer.pause();
//   }
//   audioPlayer = new Audio(track.audio);
//   audioPlayer.volume = volume;
//   audioPlayer.play();
//   isPlaying = true;
// };

// Получение списка треков и воспроизведение первого
// const trackList = await fetchTracks();
// if (trackList && trackList.length > 0) {
//   playTrack(trackList[currentTrackIndex]);
// } else {
//   console.log('Не удалось получить список треков');
// }
