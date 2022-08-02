$("#random").click(function(){
  $(this).toggleClass("clicked");
});
$("#heart").click(function(){
  $(this).toggleClass("clicked");
});

const track = document.getElementById("track");
const thumbnail = document.getElementById("thumbnail");
const background = document.getElementById("background");
const trackArtist = document.getElementById("track-artist");
const trackTitle = document.getElementById("track-title");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");

let play = document.getElementById("play");
let pause = document.getElementById("pause");
let next = document.getElementById("next-track");
let prev = document.getElementById("prev-track");
trackIndex = 0;

tracks = [
    "http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
    "http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
    "http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3"
];
thumbnails = [
    "https://images.unsplash.com/photo-1439871786806-682361b95269?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhpZGRlbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1533557188897-ef2bc7257ba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fHlvdXIlMjBmYWNlJTIwZHJhd3xlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1534987658209-443e1e80c443?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTh8fGNybyUyMG1hZ25vbiUyMG1hbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
];
trackTitles = ["Hidden","Your Face","Cro Magnon Man"];
trackArtists = ["Miaow", "The Stark Palace","The Stark Palace"];

let playing = true;

function pausePlay() {
    if (playing) {
        play.style.display = "none";
        pause.style.display = "block";

        thumbnail.style.transform = "scale(1.05)";

        track.play();
        playing = false;
    } else {
        pause.style.display = "none";
        play.style.display = "block";

        thumbnail.style.transform = "scale(1)";

        track.pause();
        playing = true;
    }
}

play.addEventListener("click", pausePlay);
pause.addEventListener("click", pausePlay);

track.addEventListener("ended", nextTrack);

function nextTrack() {
    trackIndex++;
    if (trackIndex > tracks.length - 1) {
      trackIndex = 0;
    }
  
    track.src = tracks[trackIndex];
    thumbnail.src = thumbnails[trackIndex];
    background.src = thumbnails[trackIndex];
  
    trackArtist.textContent = trackArtists[trackIndex];
    trackTitle.textContent = trackTitles[trackIndex];
  
    playing = true;
    pausePlay();
  }

  next.addEventListener("click", nextTrack);

function prevTrack() {
  trackIndex--;
  if (trackIndex < 0) {
    trackIndex = tracks.length - 1;
  }

  track.src = tracks[trackIndex];
  thumbnail.src = thumbnails[trackIndex];
  background.src = thumbnails[trackIndex];

  trackArtist.textContent = trackArtists[trackIndex];
  trackTitle.textContent = trackTitles[trackIndex];

  playing = true;
  pausePlay();
}

prev.addEventListener("click", prevTrack);

function progressValue() {
  progressBar.max = track.duration;
  progressBar.value = track.currentTime;

  currentTime.textContent = formatTime(track.currentTime);
  durationTime.textContent = formatTime(track.duration);
}

setInterval(progressValue, 500);

function formatTime(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec - minutes * 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function changeProgressBar() {
  track.currentTime = progressBar.value;
}

progressBar.addEventListener("click", changeProgressBar);

let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


safariHacks();
