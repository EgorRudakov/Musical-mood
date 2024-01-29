function createDataObject(selector) {
  const data = {};
  for (let key in selector) {
    if (key === 'infoButtonIconPlay') {
      data[key] = Array.from(document.querySelectorAll(selector[key]));
    }
    data[key] = document.querySelector(selector[key]);
  }

  return data;
}

const selector = {
  seekBar: '.track-controls__seek-bar',
  outputPower: '.track-controls__output-power',
  volSeekBar: '.volume__seek-bar',
  volOutputPower: '.volume__output-power',
  volumeButton: '.volume__button',
  volumeSlider: '.volume__slider',
  controlsButton: '.controls__button--play',
  infoButtonIconPlay: '.info__button-icon-play',
  iconPlay: '.icon__play',
  iconPause: '.icon__pause',
  audioSliderWrapper: '.audio-slider__wrapper',
};

export default createDataObject(selector);
