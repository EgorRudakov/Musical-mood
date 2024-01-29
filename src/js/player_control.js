import data from './data.js';

data.volumeButton.addEventListener('click', () => {
  data.volumeSlider.classList.toggle('visible');
  data.volSeekBar.classList.toggle('visible');
});

// export async function playTrack(track) {
//   let audio = new Audio(track);

//   data.controlsButton.addEventListener('click', () => {
//     if (audio.paused) {
//       audio.play();
//       data.controlsButton.innerHTML = data.iconPause;
//     } else {
//       audio.pause();
//       data.controlsButton.innerHTML = data.iconPlay;
//     }
//   });
// }

// const playerButton = document.getElementById('button-play-pause');
// const buttonIconMusics = document.querySelectorAll('.info__button-icon-play');

// document.addEventListener('click', (e) => {
//   if (e.target && e.target.className == 'info__button-icon-play') {
//     let trackImage = e.target.querySelector('.info__button-icon-play').src;
//     playPauseAudio(trackImage);
//   }
// });

// function createAudioPlayer() {
//   let audio = new Audio();
//   let isPlaying = false;

//   return function(trackImage) {
//     if (!isPlaying) {
//       audio.src = trackImage;
//       audio.play();
//       isPlaying = true;
//     } else {
//       audio.pause();
//       isPlaying = false;
//     }
//   }
// }

// let playPauseAudio = createAudioPlayer();