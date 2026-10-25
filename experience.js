(() => {
  const tabs = [...document.querySelectorAll('.side-tab')];
  const panels = [...document.querySelectorAll('.family-panel')];

  function select(tab, focus = false) {
    for (const t of tabs) {
      const active = t === tab;
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
    }
    for (const p of panels) p.hidden = p.id !== tab.getAttribute('aria-controls');
    if (focus) tab.focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const next = e.key === 'Home'
        ? 0
        : e.key === 'End'
          ? tabs.length - 1
          : (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      select(tabs[next], true);
    });
  });

  const stage = document.querySelector('.scatter-story');
  if (!stage) return;

  const grid = stage.querySelector('.scatter-grid');
  const cards = [...stage.querySelectorAll('.scatter-card')];
  const heading = stage.querySelector('.scatter-heading');
  const note = stage.querySelector('.scatter-end-note');
  const indicator = stage.querySelector('.scatter-progress span');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 850px)');

  const clamp = x => Math.max(0, Math.min(1, x));
  const easeOut = x => 1 - Math.pow(1 - clamp(x), 3);
  const easeInOut = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const lerp = (a, b, t) => a + (b - a) * t;

  const initialRotate = [-31, 22, 35, -16, 25, -22, 13];
  const settleLift = [-18, 10, -14, 8, -10, 12, -8];
  let ticking = false;
  let positions = [];

  function measure() {
    positions = cards.map(card => {
      const x = card.offsetLeft + card.offsetWidth / 2 - grid.clientWidth / 2;
      const y = card.offsetTop + card.offsetHeight / 2 - grid.clientHeight / 2;
      return { x, y };
    });
  }

  function paint() {
    ticking = false;
    if (reduced.matches || compact.matches) return;

    const available = Math.max(1, stage.offsetHeight - window.innerHeight);
    const progress = clamp(-stage.getBoundingClientRect().top / available);

    const headingFade = easeOut(clamp(progress / 0.20));
    const cardPhase = easeInOut(clamp((progress - 0.08) / 0.66));
    const settlePhase = easeOut(clamp((progress - 0.70) / 0.18));
    const notePhase = easeOut(clamp((progress - 0.80) / 0.12));

    heading.style.opacity = String(1 - headingFade);
    heading.style.transform = `translate(-50%, ${lerp(-50, -61, headingFade)}%) scale(${lerp(1, 0.93, headingFade)})`;

    cards.forEach((card, i) => {
      const stagger = i * 0.026;
      const t = easeInOut(clamp((progress - 0.10 - stagger) / (0.56 - stagger * 0.5)));
      const settle = easeOut(clamp((progress - 0.72 - i * 0.006) / 0.16));
      const finalT = Math.max(t, cardPhase);
      const pos = positions[i] || { x: 0, y: 0 };
      const x = -pos.x * (1 - finalT);
      const y = -pos.y * (1 - finalT) - (1 - finalT) * 26 + settleLift[i] * (1 - settle);
      const scale = lerp(0.40, 1, finalT);
      const rotate = lerp(initialRotate[i], parseFloat(getComputedStyle(card).getPropertyValue('--tilt')) || 0, finalT);
      const opacity = clamp((progress - 0.02 - i * 0.022) / 0.20);
      const shadowLift = lerp(0, 1, settle);
      card.style.opacity = String(opacity);
      card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
      card.style.boxShadow = shadowLift > 0.8
        ? '0 22px 48px rgba(64,52,36,.22)'
        : '0 18px 40px rgba(64,52,36,.18)';
      card.style.zIndex = String(i + 2);
    });

    note.style.opacity = String(notePhase);
    note.style.transform = `translateX(-50%) translateY(${lerp(18, 0, notePhase)}px)`;
    indicator.style.transform = `scaleX(${progress})`;
  }

  function update() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(paint);
  }

  function onResize() {
    if (compact.matches || reduced.matches) {
      cards.forEach(c => { c.style.opacity=''; c.style.transform=''; c.style.boxShadow=''; });
      heading.style.opacity=''; heading.style.transform=''; note.style.opacity='';
      return;
    }
    measure();
    update();
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  compact.addEventListener?.('change', onResize);
  reduced.addEventListener?.('change', () => {
    if (reduced.matches) {
      cards.forEach(card => {
        card.style.opacity = '';
        card.style.transform = '';
        card.style.boxShadow = '';
      });
      heading.style.opacity = '';
      heading.style.transform = '';
      note.style.opacity = '';
      note.style.transform = '';
      indicator.style.transform = '';
      return;
    }
    onResize();
  });

  window.addEventListener('load', onResize, { once: true });
  measure();
  paint();
})();
