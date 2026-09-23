// theme toggle
const root=document.documentElement, themeBtn=document.getElementById('themeToggle');
themeBtn.addEventListener('click',()=>{
  const cur=root.getAttribute('data-theme');
  const next=cur==='light'?'dark':'light';
  root.setAttribute('data-theme',next);
  themeBtn.innerHTML = next==='light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// mobile menu
const menuBtn=document.getElementById('menuBtn'), navlinks=document.getElementById('navlinks');
menuBtn.addEventListener('click',()=>navlinks.classList.toggle('open'));
navlinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navlinks.classList.remove('open')));

// active link + scroll progress + back to top
const sections=document.querySelectorAll('section[id]');
const navAs=document.querySelectorAll('.navlinks a');
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const prog=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  document.getElementById('scrollProgress').style.width=prog+'%';
  document.getElementById('toTop').classList.toggle('show', h.scrollTop>500);
  let cur='';
  sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-160) cur=s.getAttribute('id'); });
  navAs.forEach(a=>{ a.classList.toggle('active', a.getAttribute('href')==='#'+cur); });
});
document.getElementById('toTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// typing animation
const phrases=["ICT Cell Assistant Manager","Business Analytics Specialist","Power BI & Data Enthusiast","Digital Transformation Lead"];
let pI=0,cI=0,deleting=false;
const typedEl=document.getElementById('typed');
function typeLoop(){
  const word=phrases[pI];
  typedEl.innerHTML = word.substring(0,cI) + '<span class="cursor">&nbsp;</span>';
  if(!deleting && cI<word.length){cI++; setTimeout(typeLoop,65);}
  else if(!deleting && cI===word.length){deleting=true; setTimeout(typeLoop,1400);}
  else if(deleting && cI>0){cI--; setTimeout(typeLoop,35);}
  else{deleting=false; pI=(pI+1)%phrases.length; setTimeout(typeLoop,300);}
}
typeLoop();

// scroll reveal
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// animated counters
const counters=document.querySelectorAll('[data-count]');
const cIo=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target, target=+el.getAttribute('data-count'); let cur=0;
      const step=Math.max(1,Math.ceil(target/60));
      const t=setInterval(()=>{ cur+=step; if(cur>=target){cur=target; clearInterval(t);} el.textContent=cur.toLocaleString(); },25);
      cIo.unobserve(el);
    }
  });
},{threshold:0.4});
counters.forEach(c=>cIo.observe(c));

// skill bars
const bars=document.querySelectorAll('.bar span');
const bIo=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.width=e.target.getAttribute('data-w')+'%'; bIo.unobserve(e.target);} });
},{threshold:0.4});
bars.forEach(b=>bIo.observe(b));

// ripple effect
document.querySelectorAll('[data-ripple]').forEach(btn=>{
  btn.addEventListener('click',function(e){
    const r=document.createElement('span'); r.className='ripple';
    const rect=this.getBoundingClientRect();
    r.style.left=(e.clientX-rect.left)+'px'; r.style.top=(e.clientY-rect.top)+'px';
    this.appendChild(r); setTimeout(()=>r.remove(),600);
  });
});

// lightbox
document.querySelectorAll('.gallery-item[data-full]').forEach(g=>{
  g.addEventListener('click',()=>{
    document.getElementById('lbImg').src=g.getAttribute('data-full');
    document.getElementById('lightbox').classList.add('show');
  });
});
document.getElementById('lbClose').addEventListener('click',()=>document.getElementById('lightbox').classList.remove('show'));
document.getElementById('lightbox').addEventListener('click',(e)=>{ if(e.target.id==='lightbox') e.target.classList.remove('show'); });

// contact form (client-side only, no backend in this static file)
document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();
  alert('Thanks for reaching out! Please connect this form to an email service (e.g. Formspree) to receive messages, or email shivanshuspandey@gmail.com directly.');
  this.reset();
});

// download CV placeholder
document.getElementById('downloadCvBtn').addEventListener('click',function(e){
  e.preventDefault();
  alert('Add your CV PDF file and link it here (e.g. href="assets/Shivanshu_Pandey_CV.pdf" download).');
});

// loader
window.addEventListener('load',()=>{ setTimeout(()=>document.getElementById('loader').classList.add('hide'),400); });