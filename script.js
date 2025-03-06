let countdownDisplay = document.getElementById("countdown");
let stopwatchDisplay = document.getElementById("stopwatchDisplay");
let sessionCount = document.getElementById("sessionCount");
let currencyAmount = document.getElementById("currencyAmount");
let storeFeedback = document.getElementById("storeFeedback");

let countdownInterval;
let stopwatchInterval;
let timeRemaining = 25 * 60; // Default: 25 minutes in seconds
let stopwatchTime = 0; // Stopwatch starts at 0
let sessions = 0;
let currency = 0; // User's currency

function updateTimer() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateStopwatch() {
  let minutes = Math.floor(stopwatchTime / 60);
  let seconds = stopwatchTime % 60;
  stopwatchDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
  countdownInterval = setInterval(function() {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimer();
    } else {
      clearInterval(countdownInterval);
      alert("Time's up! Great work!");
      sessions++;
      currency += 5; // Earn 5 coins per study session
      sessionCount.textContent = sessions;
      currencyAmount.textContent = currency;
      timeRemaining = 25 * 60; // Reset to default 25 minutes
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdownInterval);
  timeRemaining = 25 * 60; // Reset to default 25 minutes
  updateTimer();
}

function startStopwatch() {
  stopwatchInterval = setInterval(function() {
    stopwatchTime++;
    updateStopwatch();
  }, 1000);
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  updateStopwatch();
}

function setCustomTime() {
  let customTimeInput = document.getElementById("customTimeInput").value;
  if (customTimeInput && customTimeInput > 0) {
    timeRemaining = customTimeInput * 60; // Convert minutes to seconds
    updateTimer();
  } else {
    alert("Please enter a valid time.");
  }
}

function switchToTimerMode() {
  document.getElementById("timer").style.display = "block";
  document.getElementById("stopwatch").style.display = "none";
}

function switchToStopwatchMode() {
  document.getElementById("stopwatch").style.display = "block";
  document.getElementById("timer").style.display = "none";
}

// Currency purchase functions
function buyStudyBuddy() {
  if (currency >= 50) {
    currency -= 50; // Deduct the coins for buying a study buddy
    storeFeedback.textContent = "You bought a Study Buddy!";
  } else {
    storeFeedback.textContent = "You don't have enough coins to buy a Study Buddy!";
  }
  currencyAmount.textContent = currency;
}

function buyFoodForBuddy() {
  if (currency >= 20) {
    currency -= 20; // Deduct the coins for buying food
    storeFeedback.textContent = "You bought food for your Study Buddy!";
  } else {
    storeFeedback.textContent = "You don't have enough coins to buy food!";
  }
  currencyAmount.textContent = currency;
}

let isGradient = true; // Track background state

function switchBackground() {
    let body = document.body;

    if (isGradient) {
        // Switch to the custom background image
        body.style.background = "url('https://t3.ftcdn.net/jpg/02/46/55/16/360_F_246551674_iZhrbUtFYFyJeosc2EwUdkTP2MLiE3nm.jpg') no-repeat center center fixed";
        body.style.backgroundSize = "cover";
        body.style.animation = "none"; // Stop animation
    } else {
        // Switch back to Animated Gradient
        body.style.background = "linear-gradient(45deg, #ff9a9e, #fad0c4, #ffdde1)";
        body.style.backgroundSize = "400% 400%";
        body.style.animation = "gradientAnimation 10s infinite alternate";
    }

    isGradient = !isGradient; // Toggle state
}

document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
document.getElementById("startStopwatchButton").addEventListener("click", startStopwatch);
document.getElementById("resetStopwatchButton").addEventListener("click", resetStopwatch);
document.getElementById("setCustomTimeButton").addEventListener("click", setCustomTime);

document.getElementById("timerModeButton").addEventListener("click", switchToTimerMode);
document.getElementById("stopwatchModeButton").addEventListener("click", switchToStopwatchMode);

// Store purchase buttons
document.getElementById("buyStudyBuddyButton").addEventListener("click", buyStudyBuddy);
document.getElementById("buyFoodButton").addEventListener("click", buyFoodForBuddy);

// ✅ Set default background to Animated Gradient
document.body.style.background = "linear-gradient(45deg, #ff9a9e, #fad0c4, #ffdde1)";
document.body.style.backgroundSize = "400% 400%";
document.body.style.animation = "gradientAnimation 10s infinite alternate";

// 🎯 Add Event Listener for Background Switch Button
document.getElementById("switchBgButton").addEventListener("click", switchBackground);

// ✅ Initial Timer Display
updateTimer();
updateStopwatch();
