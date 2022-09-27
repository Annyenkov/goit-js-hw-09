import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  input: document.querySelector('#datetime-picker'),
  body: document.querySelector('body'),
  timer: document.querySelector('.timer'),
}
const dataDays = refs.timer.children[0].children[0];
const dataHours = refs.timer.children[1].children[0];
const dataMin = refs.timer.children[2].children[0];
const dataSec = refs.timer.children[3].children[0];
const btnStart = refs.body.children[2]
btnStart.disabled = true;
console.dir(btnStart)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let isActive = false;
    console.log(selectedDates[0]);
    const startTime = Date.now();
    if (selectedDates[0] > startTime) {
      if (isActive) {
        return
      }

      btnStart.disabled = false;
      btnStart.addEventListener('click', timer);
      isActive = true;
      function timer() {
        setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = selectedDates[0] - currentTime;
          const { days, hours, minutes, seconds } = convertMs(deltaTime);
          dataDays.textContent = days;
          dataHours.textContent = hours;
          dataMin.textContent = minutes;
          dataSec.textContent = seconds;
        }, 1000)
      };
    } else Notiflix.Notify.warning("Please choose a date in the future");
    
  },
};
flatpickr(refs.input, options)
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}
