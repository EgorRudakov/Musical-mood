import data from './data.js';

if (data.volumeButton) {
  data.volumeButton.addEventListener('click', () => {
    data.volumeSliderClass.classList.toggle('visible');
    data.volSeekBar.classList.toggle('visible');
  });
} else {
  console.error('Volume button not found');
}
