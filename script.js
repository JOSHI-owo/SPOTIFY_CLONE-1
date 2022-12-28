/** @format */

//INITIALIZE THE VARIABLES
let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songitems = Array.from(document.getElementsByClassName("songitem"));

console.log("Welcome to spotify");
let songs = [
  { songName: "Track1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Track2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Track3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Track4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Track5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Track6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
];

songitems.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});
// audioElement.play();

//HANDLE PLAY/PAUSE CLICK
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    // masterPlay.innerHTML = `<span>Pause</span>`;
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    // masterPlay.innerHTML = `<span>Play</span>`;
    gif.style.opacity = 0;
  }
});

//LISTEN TO EVENTS

audioElement.addEventListener("timeupdate", () => {
  console.log("timeupdate");
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target);
      e.target.innerHTML = "pause";
    });
  }
);

// let result = "";
// songs.forEach((song) => {
//   result =
//     result +
//     `<div class="songitem">
// <img src="${song.coverPath}" alt="1" />
// <span>${song.songName}</span>
// <span class="songlistplay"
//   ><span class="timestamp"
//     >05:34 <i class="far fa-play-circle"></i></span
// ></span>
// </div>`;
// });

// contain.innerHTML = result;
