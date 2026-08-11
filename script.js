const bootLines = [
  "loading memory fragments... [7 files found]",
  "decrypting childhood memories... [OK]",
  "locating sister: GUDDU... [FOUND]"
];
let delay = 350;
bootLines.forEach((line,i)=>{
  setTimeout(()=>document.getElementById(`bootLine${i+1}`).textContent=line, delay);
  delay += 450;
});
setTimeout(()=>document.getElementById("loader").classList.add("hide"), 2400);

const canvas=document.getElementById("matrix"),ctx=canvas.getContext("2d");
let w,h,cols,drops;
function resizeMatrix(){
  w=canvas.width=innerWidth*devicePixelRatio; h=canvas.height=innerHeight*devicePixelRatio;
  canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  cols=Math.floor(innerWidth/18); drops=Array(cols).fill(1);
}
resizeMatrix();addEventListener("resize",resizeMatrix);
function matrix(){
  ctx.fillStyle="rgba(5,6,10,.08)";ctx.fillRect(0,0,innerWidth,innerHeight);
  ctx.fillStyle="#69ffb0";ctx.font="12px DM Mono";
  drops.forEach((y,i)=>{
    const chars="01GUDDU♥"; const text=chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text,i*18,y*18);
    if(y*18>innerHeight&&Math.random()>.975)drops[i]=0;
    drops[i]++;
  });
}
setInterval(matrix,55);

const glow=document.querySelector(".cursor-glow");
addEventListener("mousemove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const message=`Guddu, no matter how old we get, some things never change. You will always be my sister, my partner in all the silly memories, and someone I will always care about. From the little girl in these photographs to the beautiful person you are today, I’m genuinely happy to have all these memories with you. Keep smiling, keep being yourself, and keep making life brighter in your own way. Happy Birthday, Guddu. May this year bring you everything your heart deserves. ❤️`;
const typed=document.getElementById("typedMessage");
let typedStarted=false;
const msgObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!typedStarted){
    typedStarted=true;let i=0;
    const tick=()=>{typed.textContent=message.slice(0,i++);if(i<=message.length)setTimeout(tick,18)};
    tick();
  }
},{threshold:.3});
msgObs.observe(typed);

const lightbox=document.getElementById("lightbox"), lbImg=document.getElementById("lightboxImg"), lbTitle=document.getElementById("lightboxTitle");
document.querySelectorAll(".memory-card").forEach(card=>{
  card.addEventListener("click",()=>{
    lbImg.src=card.querySelector("img").src;
    lbTitle.textContent=card.dataset.title;
    lightbox.classList.add("open");
  });
});
document.getElementById("closeLightbox").onclick=()=>lightbox.classList.remove("open");
lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")lightbox.classList.remove("open")});

document.getElementById("celebrate").addEventListener("click",()=>{
  const box=document.getElementById("confetti");
  box.innerHTML="";
  for(let i=0;i<90;i++){
    const p=document.createElement("i");p.className="piece";
    p.style.left=Math.random()*100+"%";
    p.style.setProperty("--x",(Math.random()*240-120)+"px");
    p.style.animationDelay=(Math.random()*.9)+"s";
    p.style.background=["#69ffb0","#6ce7ff","#ff6fb5","#fff","#ffd166"][Math.floor(Math.random()*5)];
    p.style.transform=`rotate(${Math.random()*360}deg)`;
    box.appendChild(p);
  }
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const el=document.querySelector(a.getAttribute("href"));
    if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"})}
  });
});

// Tiny interactive polish: CTA follows the cursor a little on desktop.
document.querySelectorAll(".magnetic").forEach(btn=>{
  btn.addEventListener("mousemove",e=>{
    if(innerWidth<900)return;
    const r=btn.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*0.08;
    const y=(e.clientY-r.top-r.height/2)*0.08;
    btn.style.transform=`translate(${x}px,${y}px)`;
  });
  btn.addEventListener("mouseleave",()=>btn.style.transform="");
});

// Keyboard birthday easter egg: type G U D D U.
let secret=""; const secretCode="guddu";
document.addEventListener("keydown",e=>{
  secret=(secret+e.key.toLowerCase()).slice(-secretCode.length);
  if(secret===secretCode){
    document.body.animate([{filter:"brightness(1)"},{filter:"brightness(1.5)"},{filter:"brightness(1)"}],{duration:700});
    document.getElementById("celebrate").click();
    secret="";
  }
});
