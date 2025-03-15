const songList = [
    { songName: "Alone - 1", filePath: "songs/alone.mp3", coverPath: "image/cover1.jpg" },
    { songName: "Faded", filePath: "songs/faded.mp3", coverPath: "image/cover2.jpg" },
    { songName: "Darkside", filePath: "songs/darkside.mp3", coverPath: "image/cover3.jpg" },
    { songName: "On My Way", filePath: "songs/onmyway.mp3", coverPath: "image/cover4.jpg" },
    { songName: "Alone - 2", filePath: "songs/alone2.mp3", coverPath: "image/cover5.jpg" },
    { songName: "Sorry", filePath: "songs/sorry.mp3", coverPath: "image/cover6.jpg" }
];

const songContainer = document.getElementById("songList");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress");
const masterSongName = document.getElementById("masterSongName");
const gif = document.getElementById("gif");

let audioElement = new Audio();
let songIndex = 0;
let isPlaying = false;

// Populate Song List
songList.forEach((song, index) => {
    let songItem = document.createElement("div");
    songItem.classList.add("songItem");
    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="${index + 1}">
        <span>${song.songName}</span>
        <span class="songlistplay">
            <span class="time">03:14 <i class="fa-solid fa-play playBtn" data-index="${index}"></i></span>
        </span>
    `;
    songContainer.appendChild(songItem);
});

// Play/Pause Function
const playMusic = () => {
    audioElement.src = songList[songIndex].filePath;
    masterSongName.textContent = songList[songIndex].songName;
    audioElement.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    gif.style.opacity = 1;
    isPlaying = true;
};

const pauseMusic = () => {
    audioElement.pause();
    playBtn.classList.replace("fa-pause", "fa-play");
    gif.style.opacity = 0;
    isPlaying = false;
};

playBtn.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
});

// Next and Previous Buttons
nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songList.length;
    playMusic();
});

prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songList.length) % songList.length;
    playMusic();
});

// Update Progress Bar
audioElement.addEventListener("timeupdate", () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress;
});

// Seek Bar Control
progressBar.addEventListener("input", () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Play Song from List
document.querySelectorAll(".songItem").forEach((songItem, index) => {
    songItem.addEventListener("click", () => {
        songIndex = index;
        playMusic();
    });
});
