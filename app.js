const container = document.querySelector(".container");

const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer=document.querySelector("#music-details .singer"); 

const prev=document.querySelector("#controls #prev"); 
const play=document.querySelector("#controls #play"); 
const next=document.querySelector("#controls #next"); 

const currentTime=document.querySelector("#current-time"); 
const duration=document.querySelector("#duration"); 
const progressBar=document.querySelector("#progress-bar");

const volume = document.querySelector("#volume");
const volumeBar=document.querySelector("#volume-bar");

const ul = document.querySelector("ul");

const player= new MusicPlayer(musicList);

window.addEventListener("load",()=>{
    let music=player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});


function displayMusic(music){
    title.innerText=music.title;
    singer.innerText=music.singer;
    image.src="img/"+music.img;
    audio.src="mp3/"+music.file;
}

function displayMusicList(list)
{
    for(let i=0;i<list.length;i++){
        let liTag=`

        <li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
            <span class="fw-bold" >${list[i].getName()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill">1:23</span>
            <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li>  
        `;

        ul.insertAdjacentHTML("beforeend",liTag);

        let liAudioDuration=ul.querySelector(`#music-${i}`);
        let liAudioTag=ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata",()=>{
            liAudioDuration.innerText=calculateTime(liAudioTag.duration);
        });      
    }
}

play.addEventListener("click",()=>{
    const isPLaying=container.classList.contains("playing");
    isPLaying ? pauseMusic() : playMusic();
});

prev.addEventListener("click",()=>{
    prevMusic();
});

next.addEventListener("click",()=>{
    nextMusic();
});

function prevMusic(){
    player.previous();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

function pauseMusic() {
    container.classList.remove("playing");
    play.querySelector("i").classList="fa-solid fa-play";
    audio.pause();
}

function playMusic(){
    container.classList.add("playing");
    play.querySelector("i").classList="fa-solid fa-pause";
    audio.play();
}

//loadedmetadata audio set edildiğinde calısır duration bilgisini anca boyle alabiliriz
audio.addEventListener("loadedmetadata",()=>{
    duration.textContent=calculateTime(audio.duration);
    progressBar.max=Math.floor(audio.duration);
});

//her saniyede müzikde gecen süreyi ve progress barı güncelliyoruz
audio.addEventListener("timeupdate",()=>{
    progressBar.value=Math.floor(audio.currentTime);
    currentTime.textContent=calculateTime(progressBar.value);
});

//progress bara tıklandığında çalışır
progressBar.addEventListener("input",()=>{
    currentTime.textContent=calculateTime(progressBar.value);
    audio.currentTime=progressBar.value;
});

//müzik ses ayarı (volume bar ile)
volumeBar.addEventListener("input",(e)=>{
    const value=e.target.value;
    audio.volume=value/100; //audio.volume 0-1 arası deger aldığı için 100 e bolduk
    if(value==0){
        audio.muted=true;
        isMuted="muted";
        volume.classList="fa-solid fa-volume-xmark";
    }else{
        audio.muted=false;
        isMuted="unMuted";
        volume.classList="fa-solid fa-volume-high";
        // volumeBar.value=100;
    }
});


//müzik sesini açıp kapama(mute iconuna tıklayınca)
let isMuted="unMuted";
volume.addEventListener("click",()=>{
    if(isMuted==="unMuted"){
        audio.muted=true;
        isMuted="muted";
        volume.classList="fa-solid fa-volume-xmark";
        volumeBar.value=0;
    }else{
        audio.muted=false;
        isMuted="unMuted";
        volume.classList="fa-solid fa-volume-high";
        volumeBar.value=100;
    }
})

//müzik bitince bir sonrakine geçsin
audio.addEventListener("ended",()=>{
    nextMusic();
});

const selectedMusic=(li)=>{
    const index = li.getAttribute("li-index");
    player.index=index;
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

//listedeki müziklere tıklayınca arka planı değissin
const isPlayingNow=()=>{
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index")==player.index){
            li.classList.add("playing");
        }
    }
}

//parametre oalrak saniye cinsi alır --> dakika ve sn cinsinden geriye dondurur
function calculateTime(toplamSaniye){

    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenenDakika = dakika < 10 ? `0${dakika}` : `${dakika}`;
    const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
    const sonuc = `${guncellenenDakika} : ${guncellenenSaniye}`;
    return sonuc;
}







