import data from './data.js';

// const data = {
//   seekBar: document.querySelector(".track-controls__seek-bar"),
//   outputPower: document.querySelector(".track-controls__output-power"),
//   volSeekBar: document.querySelector(".volume__seek-bar"),
//   volOutputPower: document.querySelector(".volume__output-power"),
// };

// Добавляет обработчики событий к элементам seekBar и outputPower
function addEventListeners(seekBar, outputPower) {
  seekBar.addEventListener('mouseover', () => {
    showOutputPower(outputPower);
  });

  seekBar.addEventListener('mouseout', () => {
    hideOutputPower(outputPower);
  });

  seekBar.addEventListener('input', () => {
    updateSeekBar(seekBar, outputPower);
  });
}

// Показывает элемент outputPower
function showOutputPower(outputPower) {
  outputPower.style.opacity = 1;
  outputPower.style.transition = 'opacity 0.4s';
}

// Скрывает элемент outputPower
function hideOutputPower(outputPower) {
  outputPower.style.opacity = 0;
  outputPower.style.transition = 'opacity 0.4s';
}

// Обновляет элементы seekBar и outputPower
function updateSeekBar(seekBar, outputPower) {
  const result = calculateValue(seekBar);
  updateBackground(seekBar, result);
  updateOutputPowerPosition(seekBar, outputPower);
}

addEventListeners(data.seekBar, data.outputPower);
addEventListeners(data.volSeekBar, data.volOutputPower);

// Вычисляет значение элемента seekBar
function calculateValue(seekBar) {
  return Math.round(
    ((seekBar.value - seekBar.min) / (seekBar.max - seekBar.min)) * 100
  );
}

// Обновляет фон элемента seekBar
function updateBackground(seekBar, value) {
  seekBar.style.background = `rgba(255, 255, 255, 0.31) linear-gradient( to right, #ffa501 ${value}%, transparent ${value}%)`;
}

// Вычисляет позицию ползунка на элементе seekBar
function calculateThumbPosition(seekBar) {
  const seekBarRect = seekBar.getBoundingClientRect();

  return Math.round(
    ((seekBar.value - seekBar.min) / (seekBar.max - seekBar.min)) *
      seekBarRect.width
  );
}

// Обновляет текст элемента outputPower
function updateOutputPowerText(outputPower, percentage) {
  outputPower.textContent = `${percentage}%`;
}

// Обновляет border-radius элемента outputPower
function updateBorderRadiusOutputPower(outputPower, percentage) {
  const borderRadius =
    percentage <= 84
      ? '150px 150px 150px 0px / 150px 150px 150px 88px'
      : '150px 150px 0px 150px';

  outputPower.style.borderRadius = borderRadius;
}

// Обновляет border-radius элемента volOutputPower
function updateBorderRadiusVolOutputPower(volOutputPower, percentage) {
  const borderRadius =
    percentage <= 49
      ? '150px 150px 150px 0px / 150px 150px 150px 88px'
      : '150px 150px 0px 150px';

  volOutputPower.style.borderRadius = borderRadius;
}

// Вычисляет край ползунка для элемента outputPower
function calculateThumbLeftEdge(
  thumbPosition,
  outputPowerWidth,
  outputPower,
  data,
  seekBar
) {
  let thumbLeftEdge = Math.round(thumbPosition - outputPowerWidth / 2);

  if (outputPower === data.outputPower) {
    if (seekBar.value >= 0) thumbLeftEdge += 27;
    if (seekBar.value >= 30) thumbLeftEdge -= 2;
    if (seekBar.value >= 40) thumbLeftEdge -= 0;
    if (seekBar.value >= 50) thumbLeftEdge -= 2;
    if (seekBar.value >= 60) thumbLeftEdge -= 2;
    if (seekBar.value >= 85) thumbLeftEdge -= 47;
    if (seekBar.value >= 100) thumbLeftEdge -= 7;

    return thumbLeftEdge;
  } else if (outputPower === data.volOutputPower) {
    if (seekBar.value >= 0) thumbLeftEdge += 5;
    if (seekBar.value >= 0.1) thumbLeftEdge += 30;
    if (seekBar.value >= 0.3) thumbLeftEdge -= 2;
    if (seekBar.value >= 0.5) thumbLeftEdge -= 50;
    if (seekBar.value >= 0.85) thumbLeftEdge -= 2;
    if (seekBar.value >= 1) thumbLeftEdge -= 10;

    return thumbLeftEdge;
  }
}

// Обновляет позицию элемента outputPower
function updateOutputPowerPosition(seekBar, outputPower) {
  const outputPowerWidth = outputPower.offsetWidth;

  const thumbPosition = calculateThumbPosition(seekBar);

  const percentage = calculateValue(seekBar);

  updateOutputPowerText(outputPower, percentage);

  if (outputPower === data.outputPower) {
    updateBorderRadiusOutputPower(outputPower, percentage);
  } else if (outputPower === data.volOutputPower) {
    updateBorderRadiusVolOutputPower(outputPower, percentage);
  }

  const thumbLeftEdge = calculateThumbLeftEdge(
    thumbPosition,
    outputPowerWidth,
    outputPower,
    data,
    seekBar
  );

  outputPower.style.left = `${40 + thumbLeftEdge}px`;
}
