var pomodoroDisplay = document.getElementById("pomodoro");
var stopwatchDisplay = document.getElementById("stopwatch");
var pomodoroStartBtn = document.getElementById("pomodoroStart");
const stopButtonSw = document.getElementById("stopSw");
const stopButtonPom = document.getElementById("stopPom");
const pomodoroResetBtn = document.getElementById("pomodoroReset");
const stopwatchStartBtn = document.getElementById("swStart");
const stopwatchResetBtn = document.getElementById("swReset");
//POMODORO TIMER
var pomodoroCountDown = 0;
var pomodoroTimeLeft = 1500;
var interval = null;
pomodoroStartBtn.addEventListener("click", startPom);
stopButtonPom.addEventListener("click", stop);
pomodoroResetBtn.addEventListener("click", resetPom);
//setInterval(countdownSeconds, 1000); //count down every second that passes
function countdownSeconds() {
    pomodoroCountDown++;
    pomodoroDisplay.innerHTML = convertToMinutes(pomodoroTimeLeft - pomodoroCountDown);
}
function convertToMinutes(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - hrs * 3600) / 60);
    let secs = seconds % 60; //gives remainder of seconds
    if (secs < 10) secs = "0" + secs;
    if (mins < 10) mins = "0" + mins;
    if (hrs < 10) hrs = "0" + hrs;
    return hrs + ":" + mins + ":" + secs;
}
function startPom() {
    if (interval) return;
    interval = setInterval(countdownSeconds, 1000);
}
function resetPom() {
    stop();
    seconds = 0;
    pomodoroDisplay.innerHTML = "00:25:00";
}
//TODO - When pomodoro timer hits 00:00:00, reset it and/or set off an alarm letting user know time is up
//STOPWATCH TIMER
var stopwatchCounter = 0;
//setInterval(countUp, 1000); 
stopwatchStartBtn.addEventListener("click", startStopwatch);
stopwatchResetBtn.addEventListener("click", resetStopwatch);
stopButtonSw.addEventListener("click", stop); //universal
function startStopwatch() {
    if (interval) return;
    interval = setInterval(countUp, 1000); //count up every second that passes
}
function countUp() {
    stopwatchCounter++;
    stopwatchDisplay.innerHTML = convertToMinutes(stopwatchCounter);
}
function resetStopwatch() {
    stop();
    stopwatchCounter = 0;
    stopwatchDisplay.innerHTML = "00:00:00";
}
function stop() {
    console.log("this is getting called");
    clearInterval(interval);
    interval = null;
}

//# sourceMappingURL=timers.4919793f.js.map
