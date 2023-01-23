import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const ref = {
  btn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

const isBtnActive = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
    } else {
      options.defaultDate = selectedDates[0];
      ref.btn.disabled = !isBtnActive;
    }
    // console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

ref.btn.disabled = isBtnActive;

ref.btn.addEventListener('click', onBtnClick);

function onBtnClick() {
  timerId = setInterval(timerCounter, 1000);

  const delta = options.defaultDate - Date.now();
  // console.log(delta)
}

function timerCounter() {
  ref.btn.disabled = isBtnActive;

  const delta = options.defaultDate - Date.now();
  // console.log(convertMs(delta));

  const timerComponents = convertMs(delta);
  updateUI(timerComponents);

  if (delta <= 0) {
    clearInterval(timerId);
    Notify.success('Time is over!');
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateUI({ days, hours, minutes, seconds }) {
  ref.daysField.textContent = addLeadingZero(`${days}`);
  ref.hoursField.textContent = addLeadingZero(`${hours}`);
  ref.minutesField.textContent = addLeadingZero(`${minutes}`);
  ref.secondsField.textContent = addLeadingZero(`${seconds}`);
}
