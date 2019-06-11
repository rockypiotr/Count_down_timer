let countDown;
let isPlayedOnce = false;
const timerDisplay = document.querySelector('.displayTimeLeft');
const endTime = document.querySelector('.displayEndTime');
const buttons = document.querySelectorAll('[data-time]');
const audio = document.querySelector('#sound');
const message = document.querySelector('.message');
const enterMins = document.querySelector('form[name=\'customForm\']');

function test() {
  console.log('test');
}

function timer(seconds) {
  try {
    clearInterval(countdown);
  } catch (error) {
    console.info('Ops, I can\'t find any active Interval');
  }

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      if (isPlayedOnce == false) {
        isPlayedOnce = true;
        endSound();
      }
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
    }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${
    minutes < 10 ? '0' : ''
    }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function endSound() {
  audio.play();
  message.classList.toggle('hidden');
}

message.addEventListener('click', () => {
  message.classList.toggle('hidden');
  audio.pause();
});
buttons.forEach(button => button.addEventListener('click', startTimer));
enterMins.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  // resets input
  this.reset();
});
