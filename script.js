console.log("Welcome to Spotify");
//Initialize the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let masterSongImg=document.getElementById('masterSongImg');
let songItems=Array.from(document.getElementsByClassName('songItem'));


let songs=[
    {songName:"Ik Lamha:Azaan Sami Khan",filePath:"songs/1.mp3",coverPath:"covers/1.jpg" ,songTime:"4:18"},
    {songName:"Stay With Me:CHANYEOL, Punch",filePath:"songs/2.mp3",coverPath:"covers/2.jpeg", songTime:"3:15"},
    {songName:"Tere Hawale:Arijit Singh,Pritam",filePath:"songs/3.mp3",coverPath:"covers/3.jpeg", songTime:"5:50"},
    {songName:"Love Song:Eun Ji-Won,LEE SUHIYUN",filePath:"songs/4.mp3",coverPath:"covers/4.jpg",songTime:"3:46"},
    {songName:"Yours:Raiden,CHANYEOL",filePath:"songs/5.mp3",coverPath:"covers/5.jpg",songTime:"3:55"},
    {songName:"Pehla Pyaar:Armaan Malik,Vishal Mishra",filePath:"songs/6.mp3",coverPath:"covers/6.jpg",songTime:"4:32"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerText=songs[i].songTime;
})

//audioElement.play()

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update the seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime=((myProgressBar.value*audioElement.duration)/100);
})

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
const makeAllPause=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-play');
        element.classList.add('fa-circle-pause');

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        songIndex=parseInt(e.target.id);
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText= songs[songIndex].songName;
        masterSongImg.src=songs[songIndex].coverPath;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }else{
        songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;
    masterSongImg.src=songs[songIndex].coverPath;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }else{
        songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;
    masterSongImg.src=songs[songIndex].coverPath;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})