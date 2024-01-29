const volumeSlider = document.getElementById('volume-slider');


volumeSlider.addEventListener('input', () => {
  const volume = this.value;
  console.log(volume);
} )