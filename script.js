const TimerModes = {
  POMODORO: 1500,
  SHORT_BREAK: 300,
  LONG_BREAK: 900,
};

const state = {
  mode: "POMODORO",
  duration: TimerModes.POMODORO,
  timeLeft: TimerModes.POMODORO,
  isRunning: false,
  isPaused: true,
  endTime: null,
  pausedTimeRemaining: null,
  musicPaused: false,
};

const timerButtons = document.querySelectorAll(".timer-btn");
const circle = document.querySelector(".circle");
const innerCircle = document.querySelector(".inner-circle");
const countdownElement = document.querySelector(".countdown h1");
const playPauseElement = document.querySelector(".play-pause");

const buttonSound = new Audio("assets/button-sound.mp3");
const bellSound = new Audio("assets/bell-sound.mp3");
const audioToggle = document.getElementById("audio-toggle");
const bgAudio = new Audio("assets/wsm.mp3");
bgAudio.loop = true;
bgAudio.preload = "none"; // Important: prevents browser from pre-fetching

let timer = null;

const COLORS = {
  POMODORO: {
    bg: "rgb(255,146,172)",
    border: "rgb(149,9,41)",
    shadow: "rgba(149,9,41,0.7)",
  },
  SHORT_BREAK: {
    bg: "rgb(187,255,179)",
    border: "rgb(10,97,84)",
    shadow: "rgba(10,97,84,0.7)",
  },
  LONG_BREAK: {
    bg: "rgb(134,140,255)",
    border: "rgb(19,27,175)",
    shadow: "rgba(19,27,175,0.7)",
  },
};

function updateDisplay(timeInSeconds) {
  const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
  const seconds = String(timeInSeconds % 60).padStart(2, "0");
  countdownElement.textContent = `${minutes} : ${seconds}`;
}

function updateInnerCircle(progress) {
  const color = COLORS[state.mode].bg;
  innerCircle.style.background = `conic-gradient(${color} ${progress}deg, transparent 0%)`;
}

function updateDocumentTitle(timeInSeconds) {
  if (state.isRunning && !state.isPaused) {
    const minutes = String(Math.floor(timeInSeconds / 60)).padStart(2, "0");
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    if (state.mode === "POMODORO") {
      document.title = `⏳ ${minutes}:${seconds} - Focus`;
    } else {
      document.title = `⏳ ${minutes}:${seconds} - ${state.mode}`;
    }
  } else {
    document.title = "Pomodoro Timer";
  }
}

function handleTimerEnd() {
  state.timeLeft = 0;
  playPauseElement.style.display = "none";
  bellSound.play();
  updateDisplay(0);
  updateInnerCircle(0);
  document.title = "Pomodoro Timer";

  bgAudio.pause();
  bgAudio.currentTime = 0;

  setTimeout(() => {
    setMode("POMODORO");
  }, 5000);
}

function startTimer() {
  if (!state.isRunning) {
    state.isRunning = true;
    state.endTime = Date.now() + state.timeLeft * 1000;

    if (state.mode === "POMODORO" && !state.musicPaused) {
      bgAudio.play();
    }

    timer = setInterval(() => {
      if (!state.isPaused) {
        const remaining = Math.ceil((state.endTime - Date.now()) / 1000);
        if (remaining <= 0) {
          clearInterval(timer);
          handleTimerEnd();
          return;
        }
        state.timeLeft = remaining;
        updateDisplay(state.timeLeft);
        updateInnerCircle((state.timeLeft / state.duration) * 360);
        updateDocumentTitle(state.timeLeft);
      }
    }, 1000);
  }
}

function resetTimer(duration) {
  clearInterval(timer);
  Object.assign(state, {
    duration,
    timeLeft: duration,
    isRunning: false,
    isPaused: true,
  });

  updateDisplay(duration);

  playPauseElement.style.display = "block";
  playPauseElement.textContent = "Play";

  const { bg, border, shadow } = COLORS[state.mode];
  innerCircle.style.background = `conic-gradient(${bg} 360deg, transparent 0%)`;
  circle.style.borderColor = border;
  circle.style.boxShadow = `0 0 40px 20px ${shadow}`;
  document.title = "Pomodoro Timer";

  bgAudio.pause();
  bgAudio.currentTime = 0;
}

function setMode(mode) {
  state.mode = mode;
  // const duration = TimerModes[mode];
  resetTimer(TimerModes[mode]);
}

timerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    timerButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const mode = button.classList.contains("pomodoro")
      ? "POMODORO"
      : button.classList.contains("short-break")
      ? "SHORT_BREAK"
      : "LONG_BREAK";
    setMode(mode);
  });
});

playPauseElement.addEventListener("click", () => {
  buttonSound.play();
  state.isPaused = !state.isPaused;
  playPauseElement.textContent = state.isPaused ? "Play" : "Pause";

  if (state.isPaused) {
    state.pausedTimeRemaining = Math.ceil((state.endTime - Date.now()) / 1000);
    bgAudio.pause();
  } else {
    state.endTime = Date.now() + state.pausedTimeRemaining * 1000;
    if (state.mode === "POMODORO" && !state.musicPaused) {
      bgAudio.play();
    }
  }

  if (!state.isRunning) {
    startTimer();
  }
});

// audioToggle.addEventListener("click", () => {
//   state.musicPaused = !state.musicPaused;
//   audioToggle.textContent = state.musicPaused ? "Music: Off" : "Music: On";

//   if (state.musicPaused) {
//     bgAudio.pause();
//   } else if (state.mode === "POMODORO" && state.isRunning && !state.isPaused) {
//     bgAudio.play();
//   }
// });
const audioIconUse = document.querySelector("#audio-icon use");

const updateAudioIcon = () => {
  const iconId = state.musicPaused ? "#volume-mute-fill" : "#volume-up-fill";
  audioIconUse.setAttribute("xlink:href", iconId);
};

audioToggle.addEventListener("click", () => {
  state.musicPaused = !state.musicPaused;

  // Reflect UI changes
  updateAudioIcon();

  if (state.musicPaused) {
    bgAudio.pause();
  } else if (state.mode === "POMODORO" && state.isRunning && !state.isPaused) {
    bgAudio.play();
  }
});

// Call once to match initial state
updateAudioIcon();

setMode("POMODORO");

// Disable Right Click
document.querySelector("body")?.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
