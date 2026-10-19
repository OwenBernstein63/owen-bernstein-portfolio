const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');
const glow = document.querySelector('.cursor-glow');
const copyButton = document.querySelector('#copy-email');
const typeLine = document.querySelector('#type-line');
const phrases = ['hardware testing + validation', 'automotive electronics', 'circuit design + analysis', 'electrical troubleshooting'];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
function typeLoop() {
  if (!typeLine) return;
  const phrase = phrases[phraseIndex];
  charIndex += deleting ? -1 : 1;
  typeLine.textContent = phrase.slice(0, charIndex) + '_';
  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    setTimeout(typeLoop, 1300);
    return;
  }
  if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) typeLoop();
else if (typeLine) typeLine.textContent = phrases[0];
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
links.forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));
window.addEventListener('mousemove', event => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  document.querySelectorAll('section[id]').forEach(section => activeObserver.observe(section));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
copyButton?.addEventListener('click', async () => {
  const email = 'owenbernstein63@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
    copyButton.textContent = 'Copied!';
    setTimeout(() => { copyButton.textContent = 'Copy Email'; }, 1600);
  } catch { window.location.href = `mailto:${email}`; }
});
