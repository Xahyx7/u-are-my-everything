const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const landing=$("#landing"), experience=$("#experience"), enter=$("#enterBtn"), audio=$("#audio");
const spreads=$$(".spread"), pageNo=$("#pageNo"), progress=$("#progressBar"), toast=$("#toast");
let current=0, started=false, audioCtx, analyser, data;

function showToast(msg){
  toast.textContent=msg; toast.classList.add("show");
  clearTimeout(showToast.t); showToast.t=setTimeout(()=>toast.classList.remove("show"),3600);
}
function update(){
  spreads.forEach((s,i)=>s.classList.toggle("active",i===current));
  pageNo.textContent=String(current+1).padStart(2,"0");
  progress.style.width=((current+1)/spreads.length*100)+"%";
  $("#prevBtn").style.opacity=current===0?.35:1;
  $("#nextBtn").style.opacity=current===spreads.length-1?.35:1;
}
function turn(dir){const cls=dir==='next'?'turn-next':'turn-prev'; const book=$("#book"); book.classList.remove('turn-next','turn-prev'); void book.offsetWidth; book.classList.add(cls); setTimeout(()=>book.classList.remove(cls),760);}
function next(){if(current<spreads.length-1){turn('next');current++;update();}}
function prev(){if(current>0){turn('prev');current--;update();}}
$("#nextBtn").onclick=next; $("#prevBtn").onclick=prev;

const cueTimes=[0.0,2.8,5.7,8.9,12.0,15.0,18.2,21.0,24.1,27.0,28.6,29.5];
let lastCue=-1;

async function startMusic(){
  try{
    audio.src="assets/music.mp3";
    await audio.play();
    $("#musicText").textContent="LIVE";
    started=true;
    initAudio();
  }catch(e){
    showToast("Tap OPEN once more to start the music.");
  }
}
function initAudio(){
  if(audioCtx)return;
  audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  const source=audioCtx.createMediaElementSource(audio);
  analyser=audioCtx.createAnalyser();
  analyser.fftSize=256;
  data=new Uint8Array(analyser.frequencyBinCount);
  source.connect(analyser); analyser.connect(audioCtx.destination);
  requestAnimationFrame(react);
}
function react(){
  if(analyser){
    analyser.getByteFrequencyData(data);
    let sum=0; for(let i=0;i<data.length;i++)sum+=data[i];
    let amp=sum/data.length/255;
    document.documentElement.style.setProperty("--amp",amp);
    $("#book").style.transform=`translateZ(${amp*18}px) rotateX(${amp*1.2}deg)`;

    // Choreograph the editorial pages to the selected music section.
    const t=audio.currentTime;
    let cue=cueTimes.findIndex((v,i)=>t>=v && t<(cueTimes[i+1]??999));
    if(cue<0) cue=cueTimes.length-1;
    if(cue!==lastCue){
      const dir=cue>lastCue?'next':'prev'; if(lastCue>=0) turn(dir);
      current=Math.min(cue,spreads.length-1);
      update();
      lastCue=cue;
    }
  }
  requestAnimationFrame(react);
}
audio.addEventListener("ended",()=>{
  $("#musicText").textContent="PLAY";
  lastCue=-1;
});
enter.onclick=async()=>{
  landing.classList.add("hidden"); experience.classList.remove("hidden"); update();
  await startMusic();
};
$("#musicBtn").onclick=async()=>{
  if(audio.paused) await startMusic(); else {audio.pause();$("#musicText").textContent="PLAY";}
};
$$(".reveal-note").forEach(b=>b.onclick=()=>showToast(b.dataset.note));
$$(".spread img").forEach(img=>{
  img.addEventListener("pointermove",e=>{
    const r=img.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    img.style.transform=`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) scale(1.015)`;
  });
  img.addEventListener("pointerleave",()=>img.style.transform="");
});
const messages=[
 "You make ordinary days feel a little less ordinary.",
 "Some memories deserve their own page.",
 "I hope this one made you smile.",
 "A tiny reminder: you matter.",
 "Keep the soft moments."
];
const map=$("#starMap");
for(let i=0;i<12;i++){
 const s=document.createElement("span");s.className="star";s.textContent=i%3===0?"✦":"·";
 s.style.left=(8+Math.random()*84)+"%";s.style.top=(10+Math.random()*75)+"%";s.style.fontSize=(8+Math.random()*14)+"px";
 s.onclick=()=>showToast(messages[i%messages.length]);map.appendChild(s);
}
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev();});
let touchX=null;
document.addEventListener("touchstart",e=>touchX=e.touches[0].clientX,{passive:true});
document.addEventListener("touchend",e=>{if(touchX===null)return;let dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>45){dx<0?next():prev()}touchX=null},{passive:true});
update();
