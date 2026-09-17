const headings = [...document.querySelectorAll('article h2')];
const links = [...document.querySelectorAll('nav a')];
const progress = document.querySelector('.progress');
let ticking = false;
function updateReadingPosition() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? Math.min(100, scrollY / max * 100) : 0}%`;
  let current = headings[0]?.id;
  for (const h of headings) if (h.getBoundingClientRect().top < 170) current = h.id;
  for (const a of links) {
    const active = a.hash === `#${current}`;
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  }
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateReadingPosition); ticking = true; } }, {passive:true});
addEventListener('resize', updateReadingPosition);
updateReadingPosition();
