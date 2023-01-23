const bodyRef = document.querySelector('body');
const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');

const DELAY = 1000;
let timerId = null;
const isBtnActive = true;

btnStartRef.addEventListener('click', onBtnStartClick);
btnStopRef.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  changeBodyBackgroundColor();

  btnStartRef.disabled = isBtnActive;
  if (btnStartRef.disabled) {
    btnStopRef.disabled = !isBtnActive;
  };

  timerId = setInterval(changeBodyBackgroundColor, DELAY);
}

function onBtnStopClick() {
  btnStopRef.disabled = isBtnActive;
  if (btnStopRef.disabled) {
    btnStartRef.disabled = !isBtnActive;
  };

  clearInterval(timerId);
}

function changeBodyBackgroundColor() {
  bodyRef.style.backgroundColor = getRandomHexColor();
  console.log('hi');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
