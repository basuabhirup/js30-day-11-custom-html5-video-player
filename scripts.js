// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Build out functions
const togglePlay = () => {
  video.paused ? video.play() : video.pause() ;
}

const updateButton = () => {
  video.paused ? toggle.textContent = "►" : toggle.textContent = "||";
}

function skip () {
  let skippingTime = parseFloat(this.dataset.skip);
  video.currentTime += skippingTime;
}


// Hook up the event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);
for (let i = 0; i < skipButtons.length; i++) {
  skipButtons[i].addEventListener("click", skip);
}
