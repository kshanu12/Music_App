console.log("Welcome to Rythemic");

/*
    activestatus=masterplay_activestatus (activestatus=1=>play , activestatus=0=>pause)
    number=id of which music is playing
    cur_full_time=full duration of the song which is playing
    first_master_play=whether master play is tapped first time or not
*/

let activestatus=0,number=0,tostr,cur_full_time=0,first_master_play=0,same_song_play=0;
let audioElement=new Audio("./assets/songs/music1.mp3");
let masterplay=document.getElementById("masterplay");
let progressbar=document.getElementById("progressbar");
let gif=document.getElementById("gif");
let songitems=Array.from(document.getElementsByClassName("songitem"));
let ftime=document.getElementById("ftime");

let songs=[
    {songnames:"How you Like That"},{songnames:"Believer"},
    {songnames:"Thunder"},{songnames:"Shape of You"},
    {songnames:"Cheap Thrills"},{songnames:"Faded"},
    {songnames:"Swalla"},{songnames:"I'm on my way"},
    {songnames:"Ignite"},{songnames:"Senorita"}
]

const play_gif=(op)=>{
    if(op){
        gif.style.opacity=1;
    }
    else{
        gif.style.opacity=0;
    }
}

const bottom_name=(numb)=>{
    document.getElementById("mastername").innerText=songs[numb-1].songnames;
}

masterplay.addEventListener("click",()=>{
    if(activestatus===0)
    {
        if(first_master_play===0)
        {
            document.getElementsByClassName("songitemplay")[0].classList.remove("fa-play-circle");
            document.getElementsByClassName("songitemplay")[0].classList.add("fa-pause-circle");
            number=1;
            cur_full_time=document.getElementById((number).toString()).innerText;
            ftime.innerText=cur_full_time;
            first_master_play=1;
            audioElement.play();
            masterplay.classList.remove("fa-play");
            masterplay.classList.add("fa-pause");
            play_gif(1);
            activestatus=1;
        }
        else
        {
            document.getElementsByClassName("songitemplay")[number-1].classList.remove("fa-play-circle");
            document.getElementsByClassName("songitemplay")[number-1].classList.add("fa-pause-circle");
            audioElement.play();
            masterplay.classList.remove("fa-play");
            masterplay.classList.add("fa-pause");
            play_gif(1);
            activestatus=1;
        }
    }
    else
    {
        audioElement.pause();
        masterplay.classList.remove("fa-pause");
        masterplay.classList.add("fa-play");
        play_gif(0);
        activestatus=0;
        makeallplay();
    }
})

const nextss=()=>
{
    document.getElementById((number).toString()).innerText=cur_full_time;
    number=number-1;
    let previoussong=(number+1)%(songs.length);
    number=previoussong+1;
    audioElement.src=`./assets/songs/${"music"+((number).toString())}.mp3`;
    bottom_name(number);
    audioElement.currentTime=0;
    cur_full_time=document.getElementById((number).toString()).innerText;
    ftime.innerText=cur_full_time;
    audioElement.play();
    makeallplay();
    document.getElementsByClassName("songitemplay")[number-1].classList.remove("fa-play-circle");
    document.getElementsByClassName("songitemplay")[number-1].classList.add("fa-pause-circle");
    masterplay.classList.remove("fa-play");
    masterplay.classList.add("fa-pause");
    activestatus=1;
    play_gif(1);
}


audioElement.addEventListener("timeupdate",()=>
{
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value=progress;
    let min=(audioElement.currentTime/60).toFixed(0).padStart(2,0),sec=(audioElement.currentTime%60).toFixed(0).padStart(2,0);
    document.getElementById((number).toString()).innerText=min+":"+sec;
    document.getElementById("ctime").innerText=min+":"+sec;
    let q=min+":"+sec;
    if(cur_full_time===q)
    {
        nextss();
    }
})

progressbar.addEventListener("change",()=>{
    audioElement.currentTime=(progressbar.value*audioElement.duration)/100;
})

const makeallplay=()=>{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
        element.classList.remove("fa-pause-circle");    
        element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>
{
    element.addEventListener("click",(e)=>
    {
        if(number===parseInt(e.target.id.slice(5)))
        {
            if(same_song_play===0)
            {
                makeallplay();
                audioElement.pause();
                play_gif(0);
                same_song_play=1;
                masterplay.classList.remove("fa-pause");
                masterplay.classList.add("fa-play");
            }
            else
            {
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
                masterplay.classList.remove("fa-play");
                masterplay.classList.add("fa-pause");
                same_song_play=0;
                audioElement.play();
                play_gif(1);
                activestatus=1;
            }
        }
        else
        {
            if(number!==0)
            {
                document.getElementById((number).toString()).innerText=cur_full_time;
            }
            makeallplay();
            number=parseInt(e.target.id.slice(5));
            tostr=number.toString();
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audioElement.src=`./assets/songs/${"music"+tostr}.mp3`;
            cur_full_time=document.getElementById((number).toString()).innerText;
            ftime.innerText=cur_full_time;
            bottom_name(number);
            audioElement.currentTime=0;
            audioElement.play();
            play_gif(1);
            masterplay.classList.remove("fa-play");
            masterplay.classList.add("fa-pause");
            activestatus=1;
            first_master_play=1;
        }
    })
})

document.getElementById("previous").addEventListener("click",()=>{
    first_master_play=1;
    document.getElementById((number).toString()).innerText=cur_full_time;
    let previoussong=(number-2+songs.length)%(songs.length);
    number=previoussong+1;
    audioElement.src=`./assets/songs/${"music"+((number).toString())}.mp3`;
    audioElement.currentTime=0;
    cur_full_time=document.getElementById((number).toString()).innerText;
    ftime.innerText=cur_full_time;
    bottom_name(number);
    audioElement.play();
    makeallplay();
    document.getElementsByClassName("songitemplay")[number-1].classList.remove("fa-play-circle");
    document.getElementsByClassName("songitemplay")[number-1].classList.add("fa-pause-circle");
    masterplay.classList.remove("fa-play");
    masterplay.classList.add("fa-pause");
    activestatus=1;
    play_gif(1);
})

document.getElementById("next").addEventListener("click",()=>{
    nextss();  
})