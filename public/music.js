//add event listener listening for document ready (onload)
const playlistCovers = document.getElementsByClassName('playlistCover');
const playlistNameArray = document.getElementsByClassName("playlistName");
const audio = document.getElementById("audio");
const statusIcon = document.getElementById("statusIcon");


const songIndex = 0;


class playlist {
  constructor(playlistName, tracklist) {
    this.playlistName = playlistName;
    this.tracklist = tracklist;
  }
}

let hogwartsPlaylist = new playlist("Hogwarts Ambience", ["Hedwig's Theme.mp3"]);
let bardcorePlaylist = new playlist("Bardcore", ["Never Gonna Give You Up (Medieval Cover).mp3"]);
let studioGhibli = new playlist("Studio Ghibli OST", ["A town with an ocean view.mp3"]);
let witcherAmbience = new playlist("The Witcher III", ["Kaer Morhen.mp3"]);
let rain = new playlist("Rain Sounds", ["rain sounds.mp3"]);
let lofi = new playlist("Lofi", ["Forest Lullaby.mp3"]);
let fireplace = new playlist("Fireplace", ["Fireplace.mp3"])

let playlists = [hogwartsPlaylist, bardcorePlaylist, rain, studioGhibli, witcherAmbience, lofi, fireplace];



function loadPlaylist(playlistName) {
  //update song name, 
  let playlistStatusIcon = playlistName.firstElementChild;
  for (let y = 0; y < playlists.length; y++) {
    if (playlistName.innerText == playlists[y].playlistName) {
      let songToPlay = playlists[y].tracklist[0];
      playSong(songToPlay, playlistStatusIcon);
    }
  }
} 


for (let x = 0; x < playlistCovers.length; x++) {
  playlistCovers[x].addEventListener("click", () => {
    console.log("click is being detected");
    
    //get playlist cover's h3 (the playlists name, then pass that into load playlist function)
    
    let playlistName = playlistCovers[x].firstElementChild;
    console.log(playlistName);
    //console.log(firstChild);
    //let playlistAudio = playlistCovers[x].childNodes[1];

    const isPlaying = audio.classList.contains("playing");
    if (isPlaying) {
      pauseSong(playlistName.firstElementChild);
    }
    else {
      loadPlaylist(playlistName);
    }
  })
}


function playSong(songToPlay, statusIcon) {
  
  audio.classList.add("playing");
  statusIcon.classList.replace("playButtonActive", "pauseButtonActive");
  statusIcon.src = "icons/pause.svg";
  audio.src = "songs/" + songToPlay;
  audio.src = songToPlay;
  console.log("song to play is " + audio.src);
  //audio.load();
  var playPromise = audio.play();


  if (playPromise !== undefined) {
    playPromise.then(function() {
      // Automatic playback started!
      console.log("playback started");
    }).catch(function(error) {
        console.log("playback failed" + error);
      // Automatic playback failed.
      // Show a UI element to let the user manually start playback.
    });
}



function pauseSong(statusIcon) {
  audio.classList.remove("playing");
  statusIcon.classList.replace("pauseButtonActive", "playButtonActive");
  statusIcon.src = "icons/play.svg";
  audio.pause();
}

//TODO - if one playlist is clicked, then another, the previously playing one will automatically stop



//find out which playlist has been clicked (hogwarts, bardcore, etc)

//if song ends, change icon back to play

//store songs for each playlist in specific arrays, and play them when that playlist has been selected