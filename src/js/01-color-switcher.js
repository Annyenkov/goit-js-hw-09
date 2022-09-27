const refs = {
  body: document.querySelector('body')
}
const btnStart = refs.body.children[1];
const btnStop = refs.body.children[2];
let intervalId = null;
btnStop.disabled = true;

function changeBgColorStart() {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor()
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function changeBgColorStop() {
  clearInterval(intervalId);
  btnStop.disabled = true;
  btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', changeBgColorStart);
btnStop.addEventListener('click', changeBgColorStop);
