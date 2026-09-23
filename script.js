const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll fade-in
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade').forEach(el => io.observe(el));

if (!reduced) {
  // 3D tilt on hero cards (only exist on index)
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        `rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });

  // Sky photo parallax
  const sky = document.querySelector('.sky');
  if (sky) {
    window.addEventListener('mousemove', e => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      sky.style.transform = `translate(${x * -34}px, ${y * -20}px) scale(1.06)`;
    });
  }
}
