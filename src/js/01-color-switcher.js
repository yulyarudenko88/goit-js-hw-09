const bodyRef = document.querySelector('body');
const btnStartRef = document.querySelector('[data-start]');
const btnStoptRef = document.querySelector('[data-stop]');

const DELAY = 1000;
let timerId = null;

btnStartRef.addEventListener('click', onBtnStartClick);
btnStoptRef.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  timerId = setInterval (changeBodyBackgroundColor, DELAY);
}

function onBtnStopClick () {
  clearInterval(timerId);
}

function changeBodyBackgroundColor() {
  bodyRef.style.backgroundColor = getRandomHexColor();
  console.log('hi');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
