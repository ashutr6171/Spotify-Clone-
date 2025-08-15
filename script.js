console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "SoundHelix Song 1", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", coverPath: "covers/1.jpg"},
    {songName: "SoundHelix Song 2", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", coverPath: "covers/2.jpg"},
    {songName: "SoundHelix Song 3", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", coverPath: "covers/3.jpg"},
    {songName: "SoundHelix Song 4", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", coverPath: "covers/4.jpg"},
    {songName: "SoundHelix Song 5", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", coverPath: "covers/5.jpg"},
    {songName: "SoundHelix Song 6", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", coverPath: "covers/6.jpg"},
    {songName: "SoundHelix Song 7", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", coverPath: "covers/7.jpg"},
    {songName: "SoundHelix Song 8", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", coverPath: "covers/8.jpg"},
    {songName: "SoundHelix Song 9", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", coverPath: "covers/9.jpg"},
    {songName: "SoundHelix Song 10", filePath: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
// After populating UI, set initial track and title
audioElement.src = songs[songIndex].filePath;
masterSongName.innerText = songs[songIndex].songName;
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})