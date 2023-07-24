const data = {
	seekBar: document.querySelector(".player__seek-bar"),
	outputPower: document.querySelector(".player__output-power"),
};

data.seekBar.addEventListener("mouseover", () => {
	data.outputPower.style.display = "block";
});

data.seekBar.addEventListener("mouseout", () => {
	data.outputPower.style.display = "none";
});

// Добавляем обработчик события input к элементу seekBar. Когда пользователь перемещает ползунок, функции calculateValue и updateBackground вызываются для вычисления значения value и обновления свойства background элемента seekBar
data.seekBar.addEventListener("input", () => {
	const result = calculateValue(data.seekBar);
	updateBackground(data.seekBar, result);
	// outputUpData(data.seekBar.value);
	updateOutputPowerPosition(data.seekBar.value);
});

// Функция calculateValue вычисляет отношение текущего значения ползунка к его максимальному и минимальному значениям
function calculateValue(seekBar) {
	return Math.round(
		((seekBar.value - seekBar.min) / (seekBar.max - seekBar.min)) * 100
	);
}

// Функция updateBackground обновляет свойство background элемента range, используя линейный градиент, который меняет цвет от #ffa501 до transparent в зависимости от значения value
function updateBackground(seekBar, value) {
	seekBar.style.background = `rgba(255, 255, 255, 0.31) linear-gradient( to right, #ffa501 ${value}%, transparent ${value}%)`;
}

//Функции обновляют значение и положение элемента на основе значения ползунка

// function updateOutputPowerPosition(vol) {
// 	const seekBarRect = data.seekBar.getBoundingClientRect();
// 	const thumbWidth = seekBarRect.height;
// 	const thumbPosition = Math.round(
// 		((data.seekBar.value - data.seekBar.min) /
// 			(data.seekBar.max - data.seekBar.min)) *
// 			seekBarRect.width
// 	);

// 	data.outputPower.value = vol;
// 	let thumbLeftEdge = Math.round(thumbPosition - thumbWidth / 2);
	
// 	if (data.seekBar.value >= 10) thumbLeftEdge -= 10;
// 	if (data.seekBar.value >= 30) thumbLeftEdge -= 2;
// 	if (data.seekBar.value >= 40) thumbLeftEdge -= 2;
// 	if (data.seekBar.value >= 50) thumbLeftEdge -= 2;
// 	if (data.seekBar.value >= 60) thumbLeftEdge -= 2;
// 	if (data.seekBar.value >= 100) thumbLeftEdge -= 10;
	
// 	data.outputPower.style.left = `${20 + thumbLeftEdge}px`;
// }

function updateOutputPowerPosition(vol) {
	const seekBarRect = data.seekBar.getBoundingClientRect();
	const thumbWidth = seekBarRect.height;
	const outputPowerWidth = data.outputPower.offsetWidth;
	const thumbPosition = Math.round(
		((data.seekBar.value - data.seekBar.min) /
			(data.seekBar.max - data.seekBar.min)) *
			seekBarRect.width
	);
	data.outputPower.value = vol;

	let thumbLeftEdge = Math.round(thumbPosition - outputPowerWidth / 2);
	
	if (data.seekBar.value >= 0) thumbLeftEdge += 2;
	if (data.seekBar.value >= 10) thumbLeftEdge -= 4;
	if (data.seekBar.value >= 40) thumbLeftEdge -= 2;
	if (data.seekBar.value >= 60) thumbLeftEdge -= 2;
	if (data.seekBar.value >= 90) thumbLeftEdge -= 3;
	if (data.seekBar.value >= 100) thumbLeftEdge -= 10;

	data.outputPower.style.left = `${20 + thumbLeftEdge}px`;
}