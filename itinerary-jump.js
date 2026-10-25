/* Precisely align the wedding itinerary shortcut on Safari/iOS and desktop browsers.
   Reserve image dimensions in the HTML to prevent the final lazy-loaded photo
   from shifting this destination after navigation. */
(() => {
  'use strict';
  const target = document.getElementById('celebrations-heading');
  if (!target) return;
  const links = document.querySelectorAll('.hero-mobile-itinerary, .hero-side-itinerary');
  function landOnCelebrations() {
    const root = document.documentElement;
    const prior = root.style.scrollBehavior;
    // Disable smooth scrolling for long itinerary jumps, as the layout may still
    // be updating while images and fonts load on mobile Safari.
    root.style.scrollBehavior = 'auto';
    const offset = Math.max(16, Math.min(38, Math.round(window.innerHeight * .035)));
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo(0, Math.max(0, Math.round(y)));
    root.style.scrollBehavior = prior;
  }
  links.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    if (window.location.hash !== '#celebrations-heading') {
      window.history.pushState(null, '', '#celebrations-heading');
    }
    landOnCelebrations();
    // Final positioning check once the viewport and revealed heading have settled.
    window.requestAnimationFrame(() => window.requestAnimationFrame(landOnCelebrations));
  }));
})();
