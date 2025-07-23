// Централизованное состояние проигрывателя
const playerState = {
  currentTrackIndex: 0,
  trackList: [],
  audioPlayer: new Audio(),
  isPlaying: false,
  volume: 0.5,
  currentTime: 0,
  duration: 0,
  isMuted: false,
};

// Инициализация аудио
playerState.audioPlayer.volume = playerState.volume;
playerState.audioPlayer.preload = 'metadata';

export default playerState;
