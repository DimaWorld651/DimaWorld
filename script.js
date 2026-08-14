const intro = document.getElementById('intro');
const number = document.getElementById('loadNumber');
let progress = 0;
const loader = setInterval(() => {
  progress += Math.ceil(Math.random() * 13);
  if (progress >= 100) {
    progress = 100;
    clearInterval(loader);
    setTimeout(() => intro.classList.add('intro-hidden'), 250);
  }
  number.textContent = String(progress).padStart(2, '0');
}, 90);

const portal = document.querySelector('.portal-wrap');
const aura = document.querySelector('.cursor-aura');
document.addEventListener('pointermove', (event) => {
  if (aura) { aura.style.left = `${event.clientX}px`; aura.style.top = `${event.clientY}px`; }
  if (!portal || innerWidth < 801) return;
  const x = (event.clientX / innerWidth - .5) * 16;
  const y = (event.clientY / innerHeight - .5) * 16;
  portal.style.transform = `translate(${x}px, ${y}px)`;
});

const particles = document.getElementById('portalParticles');
if (particles) {
  for (let index = 0; index < 24; index += 1) {
    const dot = document.createElement('i');
    dot.style.setProperty('--x', `${Math.random() * 100}%`);
    dot.style.setProperty('--y', `${Math.random() * 100}%`);
    dot.style.setProperty('--d', `${1.8 + Math.random() * 2.7}s`);
    dot.style.setProperty('--delay', `${-Math.random() * 4}s`);
    dot.style.setProperty('--size', `${3 + Math.random() * 6}px`);
    particles.append(dot);
  }
}

const mapCard = document.getElementById('mapCard');
mapCard?.addEventListener('pointermove', (event) => {
  const box = mapCard.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width - .5;
  const y = (event.clientY - box.top) / box.height - .5;
  mapCard.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
});
mapCard?.addEventListener('pointerleave', () => mapCard.style.transform = 'perspective(900px) rotateY(0) rotateX(0)');

const copyButton = document.getElementById('copyIp');
const toast = document.getElementById('toast');
copyButton?.addEventListener('click', async () => {
  await navigator.clipboard.writeText('dimaword.falix.me');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

const center = document.getElementById('commandCenter');
const openCenter = document.getElementById('openCommand');
const signalButton = document.getElementById('newSignal');
const missionText = document.getElementById('missionText');
const messages = [
  'У ПІВНІЧНИХ ЗЕМЛЯХ ПОМІЧЕНО СТАРОДАВНІ РУЇНИ. ХТО ПЕРШИМ ЗНАЙДЕ ЇХНІЙ СЕКРЕТ?',
  'ПЕРШИЙ БЛОК НОВОГО СВІТУ ВЖЕ ВСТАНОВЛЕНО. МОЖЛИВО, САМЕ ТИ ПОБУДУЄШ НАСТУПНИЙ.',
  'ПОРТАЛ ФІКСУЄ НОВІ ЕНЕРГЕТИЧНІ СЛІДИ. СХОЖЕ, ПРИГОДА ВЖЕ БЛИЗЬКО.',
  'РЕЄСТР ГЕРОЇВ ПОКИ ПУСТИЙ. ЧИЙ НІК З’ЯВИТЬСЯ В НЬОМУ ПЕРШИМ?'
];
const revealSignal = () => { missionText.textContent = messages[Math.floor(Math.random() * messages.length)]; };
openCenter?.addEventListener('click', () => { center.classList.add('is-open'); center.setAttribute('aria-hidden', 'false'); revealSignal(); });
center?.querySelectorAll('[data-close-command]').forEach((item) => item.addEventListener('click', () => { center.classList.remove('is-open'); center.setAttribute('aria-hidden', 'true'); }));
signalButton?.addEventListener('click', revealSignal);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') center?.classList.remove('is-open'); });

const loreText = document.getElementById('loreText');
document.querySelectorAll('.chapter').forEach((chapter) => {
  chapter.addEventListener('click', () => {
    document.querySelector('.chapter.active')?.classList.remove('active');
    chapter.classList.add('active');
    loreText.textContent = chapter.dataset.lore;
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
