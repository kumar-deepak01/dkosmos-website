(() => {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch=matchMedia('(pointer: coarse)').matches;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  if(reduce||touch)return;
  let pointerFrame=0,last=null;
  document.addEventListener('pointermove',e=>{last=e;if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{document.querySelectorAll('.magnetic').forEach(el=>{const r=el.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);el.style.transform=Math.abs(dx)<100&&Math.abs(dy)<60?`translate(${dx*.055}px,${dy*.09}px)`:'';});pointerFrame=0;});},{passive:true});
  const bindTilt=card=>{if(card.dataset.tiltBound)return;card.dataset.tiltBound='1';card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(800px) rotateY(${x*3}deg) rotateX(${-y*3}deg) translateY(-3px)`;});card.addEventListener('pointerleave',()=>card.style.transform='');};
  const bindTree=root=>{if(root.matches?.('[data-tilt]'))bindTilt(root);root.querySelectorAll?.('[data-tilt]').forEach(bindTilt);};
  bindTree(document);new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)bindTree(node);}))).observe(document.body,{childList:true,subtree:true});
})();
