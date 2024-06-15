let now_playing = document.querySelector(".now-playing");
let song_cover = document.querySelector(".song-cover");
let song_name = document.querySelector(".song-name");
let song_singer = document.querySelector(".song-singer");

let current_time = document.querySelector(".current-time");
let duration_time = document.querySelector(".total-time");

let volume_slider = document.querySelector(".volume-slider")


let prev_btn = document.querySelector(".prev-song");
let playpause_btn = document.querySelector(".playpause-song");
let next_btn = document.querySelector(".next-song");

let seekSlider = document.querySelector(".seek-slider")


let track_index= 0;
let isPlaying= false;

let current_song = document.createElement("audio");

let song_list=[
    {
        name: "O Sajni Re",
        singer: "Arijit Singh",
        image : "cover/1.jpg",
        path: "songs/1.mp3",
    },

    {
        name: "Tu Hai Kahan",
        singer: "AUR",
        image : "cover/2.jpg",
        path: "songs/2.mp3",
    },

    {
        name: "Tu Aake Dekhle",
        singer: "King",
        image : "cover/3.jpg",
        path: "songs/3.mp3",
    },
    {
        name: "Saza",
        singer: "Liza Mishra",
        image : "cover/4.jpg",
        path: "https://ghantalele.com/uploads/files/data-87/43047/Saza%20-%20Lisa%20Mishra_192(Ghantalele.com).mp3",
    }
]

// play next song 

function nextSong(){
    if(track_index < song_list.length-1){
        track_index++;
    }
    else  {
        track_index = 0 ;
    }
    
    loadSong(track_index);

    if(isPlaying == true){
       playSong()
    }
    else 
    {
        pauseSong()
    }
  
}

// play prev song 

function prevSong(){
    if(track_index > 0){
        track_index--;
    }
    else{
        track_index = song_list.length - 1;
    }
    loadSong(track_index);
   
    if(isPlaying == true){
        playSong()
     }
     else 
     {
         pauseSong()
     }
   
   
}

function playPauseSong(){
    if(!isPlaying) playSong();
    else pauseSong();
}

function pauseSong(){
    current_song.pause();
    isPlaying = false;
    playpause_btn.innerHTML = "<i class = 'fa fa-play-circle fa-4x'></i>"
}

function loadSong(index){

    // load song

    current_song.src = song_list[index].path;
    current_song.load();

    // load details

    song_name.textContent = song_list[index].name; 
    song_singer.textContent = song_list[index].singer; 
    song_cover.style.backgroundImage = "url('"+ song_list[index].image + "')"
    now_playing.textContent = `Playing ${index + 1} of ${song_list.length} songs`;

     // update timer

     updateTime = setInterval(seekUpdate , 1000);

    current_song.addEventListener("ended", nextSong);

   

}

function seekUpdate(){
    let seekPosition = 0;

    if(!isNaN(current_song.duration)){
        seekPosition = current_song.currentTime * (100 / current_song.duration);
        seekSlider.value = seekPosition; 
         
        let currentMinutes = Math.floor(current_song.currentTime / 60 )
        let currentSeconds = Math.floor(current_song.currentTime - currentMinutes * 60);

        let durationMinutes = Math.floor(current_song.duration / 60);
        let durationSeconds = Math.floor(current_song.duration - durationMinutes * 60);

        if(currentMinutes<10){ currentMinutes = "0" + currentMinutes};
        if(currentSeconds<10){ currentSeconds = "0" + currentSeconds};
        if(durationMinutes<10){ durationMinutes = "0" + durationMinutes};
        if(durationSeconds<10){ durationSeconds = "0" + durationSeconds};

        current_time.textContent = currentMinutes + ":" + currentSeconds;
        duration_time.textContent = durationMinutes + ":" + durationSeconds;
    }
}

function seekTo(){
   let seekto = current_song.duration * (seekSlider.value / 100);
   current_song.currentTime = seekto ;
}

function setVol(){
    current_song.volume = volume_slider.value / 100 ;
}
function playSong(){
    current_song.play();
     isPlaying = true ;
     playpause_btn.innerHTML = "<i class = 'fa fa-pause-circle fa-4x'></i>"
}

loadSong(track_index);



