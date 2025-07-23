const createDataObject = (selector) => {
  return Object.fromEntries(
    Object.entries(selector).map(([key, value]) => {
      const elements = document.querySelectorAll(value);
      return [
        key,
        key === 'infoButtonIconPlay'
          ? Array.from(elements)
          : elements.length === 1
          ? elements[0]
          : elements,
      ];
    })
  );
};

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
  currentTimeSpan: '.track-controls__current-time',
  durationSpan: '.track-controls__duration',
  songInfoGrid: '.song-info__grid',
  songName: '.song-info__song-name',
  songArtist: '.song-info__song-artist',
  songYear: '.song-info__song-year',
  songImage: '.song-info__image',
};

const data = createDataObject(selector);

export default data;
