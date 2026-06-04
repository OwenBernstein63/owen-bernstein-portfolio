const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');
const glow = document.querySelector('.cursor-glow');
const copyButton = document.querySelector('#copy-email');
const typeLine = document.querySelector('#type-line');

const phrases = [
  'hardware + software systems',
  'electrical troubleshooting',
  'embedded engineering mindset',
  'discipline through ROTC'
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  if (!typeLine) return;

  if (deleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  typeLine.textContent = phrase.slice(0, charIndex) + (charIndex % 2 === 0 ? '_' : '');

  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeLoop, deleting ? 34 : 64);
}

typeLoop();

document.querySelector('#year').textContent = new Date().getFullYear();

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

links.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('mousemove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const sections = document.querySelectorAll('section[id]');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach((section) => activeObserver.observe(section));

copyButton?.addEventListener('click', async () => {
  const email = 'owen.bernstein@temple.edu';
  try {
    await navigator.clipboard.writeText(email);
    copyButton.textContent = 'Copied!';
    setTimeout(() => { copyButton.textContent = 'Copy Email'; }, 1600);
  } catch (error) {
    window.location.href = `mailto:${email}`;
  }
});
