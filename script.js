// ============================
// Theme toggle
// ============================
const toggleBtn = document.getElementById('theme-toggle');
const applyTheme = (dark) => {
  document.body.classList.toggle('dark', dark);
  toggleBtn.setAttribute('aria-pressed', String(dark));
};

// Respect saved preference if present, otherwise system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(prefersDark);

toggleBtn.addEventListener('click', () => {
  applyTheme(!document.body.classList.contains('dark'));
});

// ============================
// Scroll-spy for tab nav
// ============================
const tabs = document.querySelectorAll('.tab');
const sections = [...tabs].map(tab => document.querySelector(tab.getAttribute('href')));

const setActiveTab = (id) => {
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.tab === id));
};

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveTab(entry.target.id);
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => section && spy.observe(section));

// ============================
// Project card reveal-on-scroll
// ============================
const reveal = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${i * 60}ms`;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('#repo-list .repo-card').forEach(card => reveal.observe(card));

// ============================
// Contact form
// ============================
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const original = button.innerHTML;
  button.innerHTML = '<span class="field-prompt">$</span> message sent ✓';
  form.reset();
  setTimeout(() => { button.innerHTML = original; }, 2500);
});
