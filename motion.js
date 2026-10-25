(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = [
    ...document.querySelectorAll('.invitation-note-frame, .intro-art, .intro-copy, .section-title, .day-card, .venue-card, .closing-border, .venue-notice, .dhruvi-head, .pending-day, .family-kicker, .moment-card')
  ];
  const progress = document.querySelector('.scroll-progress');

  const updateProgress = () => {
    const available = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const percent = Math.min(100, Math.max(0, window.scrollY / available * 100));
    if (progress) progress.style.transform = `scaleX(${percent / 100})`;
  };

  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateProgress();
    });
  }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  if (!('IntersectionObserver' in window) || reducedMotion.matches) return;

  targets.forEach((element, i) => {
    element.classList.add('motion-ready');
    element.style.setProperty('--enter-delay', `${Math.min((i % 4) * 80, 240)}ms`);
  });

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  targets.forEach(el => observer.observe(el));

  reducedMotion.addEventListener?.('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    targets.forEach(el => el.classList.add('is-visible'));
  });
})();
