import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
}
const delay = refs.form[0];
const step = refs.form[1];
const amount = refs.form[2];

console.dir(amount.value)
refs.form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let position = 0;
  let delayCount = Number(delay.value);
  if (Number(delay.value) < 0 || Number(step.value) < 0) {
    return Notiflix.Notify.warning('Numbers must be positive');
  }
  for (let i = 0; i < amount.value; i += 1) {
    position += 1
    if (position !== 1) {
      delayCount += Number(step.value);
    } 
    createPromise(position, delayCount)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
} )

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  })
}
