function createDataObject(selector) {
  const data = {};
  for (let key in selector) {
    if (key === 'infoButtonIconPlay') {
      data[key] = Array.from(document.querySelectorAll(selector[key]));
    } else {
      const elements = document.querySelectorAll(selector[key]);
      data[key] = elements.length === 1 ? elements[0] : elements;
    }
  }

  return data;
}

const selector = {
  seekBar: '.track-controls__seek-bar',
  outputPower: '.track-controls__output-power',
  volSeekBar: '.volume__seek-bar',
  volOutputPower: '.volume__output-power',
  volumeButton: '.volume__button',
  volumeSliderClass: '.volume__slider',
  controlsButton: '.controls__button--play',
  infoButtonIconPlay: '.info__button-icon-play',
  iconPlay: '.icon__play',
  iconPause: '.icon__pause',
  audioSliderWrapper: '.audio-slider__wrapper',
  previousTrackBtn: '#previous-track',
  playPauseBtn: '#play-pause',
  nextTrackBtn: '#next-track',
  volumeSliderId: '#volume-slider',
  rewindBackwardBtn: '#rewind-backward',
  rewindForwardBtn: '#rewind-forward',
};

const data = createDataObject(selector);

export default data;
