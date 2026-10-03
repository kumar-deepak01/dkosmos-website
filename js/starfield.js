(() => {
  const host = document.getElementById('starfield');
  if (!host) return;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d',{alpha:true});
  host.append(canvas);
  let width=0,height=0,stars=[];
  const resize=()=>{width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=width*dpr;canvas.height=height*dpr;canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);const count=width<650?34:68;stars=Array.from({length:count},()=>({x:Math.random()*width,y:Math.random()*height,size:Math.random()*1.2+.25,alpha:Math.random()*.48+.12}));draw();};
  const draw=()=>{ctx.clearRect(0,0,width,height);for(const s of stars){ctx.globalAlpha=s.alpha;ctx.fillStyle='#d9e1ff';ctx.beginPath();ctx.arc(s.x,s.y,s.size,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;};
  addEventListener('resize',resize,{passive:true});resize();
})();
