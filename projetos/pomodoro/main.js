let section = document.getElementById('pomodoro');
let timer = document.getElementById('timer');
let message = document.getElementById('message');
let currentType;
let currentTime;
let playing;
let counter;
let foco = 1500
let intervalo = 300
let pomodoros = 0;

function setupPomodoro(type) {
  currentTime = eval(type);
  currentType = type
  message.innerHTML = "Hora do " + type;
  timer.innerHTML = formatTime();
}

function play () {
  if (!playing) {
    playing = true

    section.classList.add('playing');
    
    counter = setInterval(function() {
      console.log('1 segundo')
      startCounting()
    }, 1000);
  }
}

function startCounting() {
  if (currentTime > 0) {
    currentTime = currentTime - 1;
    timer.innerHTML = formatTime();
  }
  else if (currentTime === 0 && currentType == 'foco') {
    setupPomodoro('intervalo');
    pomodoros = pomodoros + 1;
  }
  else if (pomodoros >= 4) {
    clearInterval(counter);
    playing = false;
    section.classList.remove('playing');
    message.innerHTML = "Acabou! Você fez " + pomodoros + " pomodoros :)";
    pomodoros = 0;
  }
  else {
    setupPomodoro('foco');
    play();
  }
}

function pause() {
  playing = false
  section.classList.remove('playing');
  clearInterval(counter)
}

function formatTime() {
  let minutes = Math.floor(currentTime / 60 % 60);
  let seconds = Math.floor(currentTime % 60);

  return (minutes < 10 ? "0" : "") + minutes + ':' + (seconds < 10 ? "0" : "") + seconds
}