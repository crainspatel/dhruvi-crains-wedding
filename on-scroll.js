/* Stable natural-height scroll formation: no pinning, no clipping, no layout changes.
   Scroll-controlled from a centered photo stack into an organic photo board with family memories. */
(() => {
  const stage = document.querySelector('.memory-chapter');
  if (!stage) return;
  const board = stage.querySelector('.memory-board');
  const photos = [...stage.querySelectorAll('.memory-polaroid')];
  if (!board || !photos.length) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  // Static layout is the graceful fallback if the animation library is unavailable.
  if (!window.gsap || !window.ScrollTrigger || reduced.matches) return;
  const gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  const rotations = [-27, 24, -19, 22, 26, -21, 17, -14, 15];
  let tween;
  function createFormation() {
    if (tween) {tween.scrollTrigger?.kill(); tween.kill();}
    gsap.set(photos, {clearProps:'transform,opacity,visibility'});
    // Measurements use the finished, natural-height grid, before any transforms.
    const bounds = board.getBoundingClientRect();
    const centreX = bounds.left + bounds.width / 2;
    const centreY = bounds.top + Math.min(bounds.height / 2, 420);
    const starts = photos.map((photo, i) => {
      const b = photo.getBoundingClientRect();
      return {x:centreX - (b.left + b.width/2), y:centreY - (b.top + b.height/2), rotation:rotations[i], scale:0.66, opacity: i === 0 ? 1 : 0.82};
    });
    photos.forEach((p, i) => gsap.set(p, {...starts[i], transformOrigin:'50% 50%'}));
    const tl = gsap.timeline({paused:true});
    photos.forEach((p, i) => {
      const endAngle = parseFloat(getComputedStyle(p).getPropertyValue('--angle')) || 0;
      tl.to(p, {x:0,y:0,scale:1,rotation:endAngle,opacity:1,duration:1,ease:'none'}, i*0.055);
    });
    const st = ScrollTrigger.create({
      trigger:stage,
      start:'top 75%',
      end:()=>`+=${Math.max(window.innerHeight * 0.9, 650)}`,
      scrub:0.25,
      invalidateOnRefresh:false,
      onUpdate:self=>tl.progress(self.progress)
    });
    tl.progress(st.progress);
    tween={kill:()=>tl.kill(), scrollTrigger:st};
  }
  let resizeTimer;
  function resize(){clearTimeout(resizeTimer);resizeTimer=setTimeout(createFormation,120)}
  // Initialize as early as possible, before the visitor reaches the section.
  if (document.readyState === 'complete') createFormation();
  else window.addEventListener('load',createFormation,{once:true});
  window.addEventListener('resize',resize,{passive:true});
  reduced.addEventListener?.('change',()=>{
    if(reduced.matches){tween?.scrollTrigger?.kill();tween?.kill();gsap.set(photos,{clearProps:'all'});} else createFormation();
  });
})();
