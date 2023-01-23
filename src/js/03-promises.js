import { Notify } from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(e) {
  e.preventDefault();

  let delay = Number(e.currentTarget.delay.value);
  let step = Number(e.currentTarget.step.value);
  let amount = Number(e.currentTarget.amount.value);
  // console.log(delay, step, amount);

  for (let position = 1; position <= amount; position += 1) {
    
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay)
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay)
      })
      .finally(() => {
        console.log(`${amount} new Promises were created!`);
      });

    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
      // console.log({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
