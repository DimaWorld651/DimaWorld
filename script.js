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
document.addEventListener('pointermove', (event) => {
  if (!portal || innerWidth < 801) return;
  const x = (event.clientX / innerWidth - .5) * 16;
  const y = (event.clientY / innerHeight - .5) * 16;
  portal.style.transform = `translate(${x}px, ${y}px)`;
});

const mapCard = document.getElementById('mapCard');
mapCard?.addEventListener('pointermove', (event) => {
  const box = mapCard.getBoundingClientRect();
  const x = (event.clientX - box.left) / box.width - .5;
  const y = (event.clientY - box.top) / box.height - .5;
  mapCard.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
});
mapCard?.addEventListener('pointerleave', () => mapCard.style.transform = 'perspective(900px) rotateY(0) rotateX(0)');
