/** @format */

//INITIALIZE THE VARIABLES
let index = 0;
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
// We used Array.from() because we are accessing a group of html elements with the classname as songitem
let songitems = Array.from(document.getElementsByClassName("songitem"));
let masterSongName = document.getElementById("masterSongName");

console.log("Welcome to spotify");
let songs = [
  { songName: "Track1", filePath: "/songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Track2", filePath: "/songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Track3", filePath: "/songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Track4", filePath: "/songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Track5", filePath: "/songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Track6", filePath: "/songs/6.mp3", coverPath: "covers/6.jpg" },
];

// audioElement=new Audio(songs[3].filePath);
// audioElement.play();

songitems.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});
// audioElement.play();

//HANDLE PLAY/PAUSE CLICK
masterPlay.addEventListener('click', () => {
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

audioElement.addEventListener('timeupdate', () => {
  console.log("timeupdate");
  //currentime provides us the time it has run
  //duration gives us the total duration
  // (current time/duration)*100 gives us how muc percentage the song has played
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
  //audioElemnt.value gives us the percentage at which the cursor has been placed by the user for changing the timing of the song
  // (percentage*duration)/100 will give us the current time at that point of the progress bar
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

makeAllplays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
      // element.innerHTML = `<span>Play</span>`;
    }
  );
};

// Here we control the play for all the songs
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener('click', (e) => {
      makeAllplays();
      index = parseInt(e.target.id);
      console.log(index);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
     
      audioElement.src = `songs/${index}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      // e.target.innerHTML = `<span>Pause</span>`;
      masterSongName.innerText = songs[index].songName;
      console.log(masterSongName);
      let image=document.getElementById("right");
      image.innerHTML=`<img class="image" src="${songs[index-1].coverPath}" alt="${songs[index].songName}" />`;
      gif.style.opacity = 1;
      myProgressBar.value = 0;
    });
  }
);

// Moving to next song
document.getElementById("next").addEventListener("click", () => {
  if (index >= 6) {
    index = 0;
  } else {
    index += 1;
  }
  audioElement.src = `songs/${index}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  masterSongName.innerHTML = songs[index].songName;
  gif.style.opacity = 1;
});

// Moving to previous song
document.getElementById("previous").addEventListener("click", () => {
  if (index <= 0) {
    index = 6;
  } else {
    index -= 1;
  }
  audioElement.src = `songs/${index + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  masterSongName.innerText = songs[index].songName;
  gif.style.opacity = 1;
});

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
