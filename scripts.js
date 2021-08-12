// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");



// Build out functions
function togglePlay() {
  video.paused ? video.play() : video.pause() ;
}

function updateButton() {
  video.paused ? toggle.textContent = "►" : toggle.textContent = "❚ ❚";
}

function skip() {
  let skippingTime = parseFloat(this.dataset.skip);
  video.currentTime += skippingTime;
}

function handleRange() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e) {
  const fraction = e.offsetX >= 0 ? (e.offsetX / 640) : 0;
  video.currentTime = fraction * video.duration;
  progressBar.style.flexBasis = `${fraction * 100}%`;
}

// Hook up the event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);;

for (let i = 0; i < skipButtons.length; i++) {
  skipButtons[i].addEventListener("click", skip);
}

for (let i = 0; i < ranges.length; i++) {
  ranges[i].addEventListener("change", handleRange);
}
for (let i = 0; i < ranges.length; i++) {
  ranges[i].addEventListener("mousemove", handleRange);
}

video.addEventListener("timeupdate", handleProgress)
progress.addEventListener("click", scrub);

let mouseDown = false;
progress.addEventListener("mousedown", () => mouseDown = true);
progress.addEventListener("mouseup", () => mouseDown = false);

progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
