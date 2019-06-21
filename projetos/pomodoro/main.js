let section = document.getElementById('pomodoro');
let timer = document.getElementById('timer');
let message = document.getElementById('message');
let currentType;
let currentTime;
let playing;
let counting;
let defaultPomodoro = 1500
let defaultInterval = 300
let step = 0;

function changeType(type) {
  if (type === 'pomodoro') {
    currentTime = defaultPomodoro;
    message.innerHTML = "Hora do foco!";
  }
  if (type === 'intervalo') {
    currentTime = defaultInterval;
    message.innerHTML = "Hora do intervalo :)";
  }
  currentType = type
  timer.value = formatTime(timer.value);
}

function play () {
  if (!playing) {
    playing = true
    section.classList.add('playing');
    counting = setInterval(function() {
      startCounting(timer.value)
    }, 1000);
  }
}

function startCounting() {
  section.classList.add('playing');
  if (currentTime > 0) {
    currentTime = currentTime - 1;
    timer.value = formatTime();
  }
  else if (currentTime === 0 && currentType == 'pomodoro') {
    changeType('intervalo');
    step = step + 1;
  }
  else if (step >= 4) {
    clearInterval(counting);
    playing = false;
    message.innerHTML = "Acabou! Você fez " + step + " pomodoros :)";
    step = 0;
  }
  else {
    changeType('pomodoro');
    play();
  }
}

function pause() {
  playing = false
  section.classList.remove('playing');
  clearInterval(counting)
}

function formatTime() {
  let minutes = Math.floor(currentTime % 3600 / 60);
  let seconds = Math.floor(currentTime % 3600 % 60);

  return (minutes < 10 ? "0" : "") + minutes + ':' + (seconds < 10 ? "0" : "") + seconds
}