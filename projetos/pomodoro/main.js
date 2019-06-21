let section = document.getElementById('pomodoro');
let timer = document.getElementById('timer');
let message = document.getElementById('message');
let currentType;
let currentTime;
let playing;
let counting;
let foco = 1500
let intervalo = 300
let pomodoros = 0;

function changeType(type) {
  currentTime = eval(type);
  currentType = type
  message.innerHTML = "Hora do " + type;
  timer.innerHTML = formatTime();
}

function play () {
  if (!playing) {
    playing = true
    section.classList.add('playing');
    counting = setInterval(function() {
      startCounting()
    }, 1000);
  }
}

function startCounting() {
  section.classList.add('playing');
  if (currentTime > 0) {
    currentTime = currentTime - 1;
    timer.innerHTML = formatTime(currentTime);
  }
  else if (currentTime === 0 && currentType == 'foco') {
    changeType('intervalo');
    pomodoros = pomodoros + 1;
  }
  else if (pomodoros >= 4) {
    clearInterval(counting);
    playing = false;
    section.classList.remove('playing');
    message.innerHTML = "Acabou! Você fez " + pomodoros + " pomodoros :)";
    pomodoros = 0;
  }
  else {
    changeType('foco');
    play();
  }
}

function pause() {
  playing = false
  section.classList.remove('playing');
  clearInterval(counting)
}

function formatTime() {
  let minutes = Math.floor(currentTime / 60 % 60);
  let seconds = Math.floor(currentTime % 60);

  return (minutes < 10 ? "0" : "") + minutes + ':' + (seconds < 10 ? "0" : "") + seconds
}